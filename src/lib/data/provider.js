import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_BLOCKED_DATES, HOMESTAYS, getHomestayBySlug } from "./homestays";

const localDataPath = path.join(process.cwd(), "src", "db", "local-data.json");

function getPublicUploadDir(slug) {
  return path.join(process.cwd(), "public", "uploads", slug);
}

async function readLocalData() {
  const content = await fs.readFile(localDataPath, "utf-8");
  return JSON.parse(content);
}

async function writeLocalData(data) {
  await fs.writeFile(localDataPath, JSON.stringify(data, null, 2), "utf-8");
}

function getSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function parseJwtRole(token) {
  if (!token || typeof token !== "string") {
    return null;
  }
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));
    return payload?.role || null;
  } catch (_error) {
    return null;
  }
}

function getSupabasePublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getSupabaseUserClient(accessToken) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !accessToken) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

function shouldUseSupabase() {
  return process.env.DATA_PROVIDER === "supabase";
}

function sortByOrder(images) {
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder);
}

function isLikelyRlsError(message) {
  return typeof message === "string" && message.toLowerCase().includes("row-level security policy");
}

function getMutationClients(accessToken) {
  const adminClient = getSupabaseAdminClient();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const serviceRole = parseJwtRole(serviceKey);
  const anonRole = parseJwtRole(anonKey);
  const hasServiceRoleKey = !!serviceKey && serviceRole === "service_role";
  const isServiceKeyActuallyAnon = !!serviceKey && serviceRole === "anon";
  const userClient = getSupabaseUserClient(accessToken);

  if (adminClient && hasServiceRoleKey) {
    return { primaryClient: adminClient, fallbackClient: userClient };
  }
  if (userClient) {
    return { primaryClient: userClient, fallbackClient: null };
  }

  throw new Error(
    isServiceKeyActuallyAnon || anonRole === "anon"
      ? "Supabase write is not configured. SUPABASE_SERVICE_ROLE_KEY is using anon role. Use the real service_role key from Supabase Settings > API, then re-login."
      : "Supabase write is not configured correctly. Set a real SUPABASE_SERVICE_ROLE_KEY (service_role), or re-login and add authenticated write policies.",
  );
}

export async function getHomestayContent() {
  if (shouldUseSupabase()) {
    return getSupabaseHomestayContent();
  }
  return getLocalHomestayContent();
}

async function getLocalHomestayContent() {
  const localData = await readLocalData();

  return HOMESTAYS.map((home) => {
    const localImages = localData.images[home.slug] ?? [];
    const images = localImages.length > 0 ? sortByOrder(localImages) : home.defaultImages;
    const blockedEntries = localData.blockedDates[home.slug] ?? [];

    return {
      ...home,
      images,
      blockedEntries,
      blockedDates: blockedEntries.map((entry) => entry.date),
    };
  });
}

async function getSupabaseHomestayContent() {
  const supabase = getSupabasePublicClient() || getSupabaseAdminClient();
  if (!supabase) {
    throw new Error("Supabase public read is not configured.");
  }
  const slugs = HOMESTAYS.map((home) => home.slug);

  const [{ data: imagesRows }, { data: blockedRows }] = await Promise.all([
    supabase
      .from("homestay_images")
      .select("id, homestay_slug, public_url, alt_text, sort_order")
      .in("homestay_slug", slugs)
      .order("sort_order", { ascending: true }),
    supabase
      .from("homestay_blocked_dates")
      .select("id, homestay_slug, date")
      .in("homestay_slug", slugs)
      .order("date", { ascending: true }),
  ]);

  return HOMESTAYS.map((home) => {
    const images =
      imagesRows
        ?.filter((item) => item.homestay_slug === home.slug)
        .map((item) => ({
          id: item.id,
          src: item.public_url,
          alt: item.alt_text || `${home.name} image`,
          sortOrder: item.sort_order ?? 0,
        })) ?? [];
    const blockedEntries =
      blockedRows
        ?.filter((item) => item.homestay_slug === home.slug)
        .map((item) => ({
          id: item.id,
          date: item.date,
        })) ?? [];

    return {
      ...home,
      images: images.length > 0 ? images : home.defaultImages,
      blockedEntries:
        blockedEntries.length > 0
          ? blockedEntries
          : (DEFAULT_BLOCKED_DATES[home.slug] ?? []).map((date) => ({
              id: `${home.slug}-${date}`,
              date,
            })),
      blockedDates:
        blockedEntries.length > 0
          ? blockedEntries.map((entry) => entry.date)
          : DEFAULT_BLOCKED_DATES[home.slug] ?? [],
    };
  });
}

export async function addBlockedDate(homestaySlug, date, options = {}) {
  if (shouldUseSupabase()) {
    const { primaryClient, fallbackClient } = getMutationClients(options.accessToken);
    const query = (client) =>
      client
        .from("homestay_blocked_dates")
        .insert({ homestay_slug: homestaySlug, date })
        .select("id, date")
        .single();

    let { data, error } = await query(primaryClient);
    if (error && fallbackClient && isLikelyRlsError(error.message)) {
      ({ data, error } = await query(fallbackClient));
    }

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  const localData = await readLocalData();
  const current = localData.blockedDates[homestaySlug] ?? [];
  const id = `${homestaySlug}-${date}`;
  if (!current.some((entry) => entry.date === date)) {
    current.push({ id, date });
  }
  localData.blockedDates[homestaySlug] = current.sort((a, b) => a.date.localeCompare(b.date));
  await writeLocalData(localData);

  return { id, date };
}

export async function removeBlockedDate(homestaySlug, blockedId, options = {}) {
  if (shouldUseSupabase()) {
    const { primaryClient, fallbackClient } = getMutationClients(options.accessToken);
    const query = (client) => client.from("homestay_blocked_dates").delete().eq("id", blockedId);
    let { error } = await query(primaryClient);
    if (error && fallbackClient && isLikelyRlsError(error.message)) {
      ({ error } = await query(fallbackClient));
    }

    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  const localData = await readLocalData();
  localData.blockedDates[homestaySlug] = (localData.blockedDates[homestaySlug] ?? []).filter(
    (entry) => entry.id !== blockedId,
  );
  await writeLocalData(localData);
}

export async function uploadImage(
  { homestaySlug, altText, fileBuffer, originalName, contentType },
  options = {},
) {
  const homestay = getHomestayBySlug(homestaySlug);
  if (!homestay) {
    throw new Error("Invalid homestay slug");
  }

  if (shouldUseSupabase()) {
    const { primaryClient, fallbackClient } = getMutationClients(options.accessToken);
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "homestay_images";
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "-");

    const uploadWithClient = async (client) => {
      const storagePath = `${homestaySlug}/${Date.now()}-${randomUUID()}-${safeName}`;
      const { error: uploadError } = await client.storage
        .from(bucket)
        .upload(storagePath, fileBuffer, { contentType, upsert: false });

      if (uploadError) {
        return { error: uploadError };
      }

      const { data: urlData } = client.storage.from(bucket).getPublicUrl(storagePath);
      const existing = await getHomestayContent();
      const sortOrder = existing.find((item) => item.slug === homestaySlug)?.images.length ?? 0;

      const { data, error } = await client
        .from("homestay_images")
        .insert({
          homestay_slug: homestaySlug,
          storage_path: storagePath,
          public_url: urlData.publicUrl,
          alt_text: altText || `${homestay.name} photo`,
          sort_order: sortOrder,
        })
        .select("id, public_url, alt_text, sort_order")
        .single();
      if (error) {
        await client.storage.from(bucket).remove([storagePath]);
      }
      return { data, error };
    };

    let { data, error } = await uploadWithClient(primaryClient);
    if (error && fallbackClient && isLikelyRlsError(error.message)) {
      ({ data, error } = await uploadWithClient(fallbackClient));
    }

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      src: data.public_url,
      alt: data.alt_text,
      sortOrder: data.sort_order,
    };
  }

  const localData = await readLocalData();
  const uploadDir = getPublicUploadDir(homestaySlug);
  await fs.mkdir(uploadDir, { recursive: true });

  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;
  const absoluteFilePath = path.join(uploadDir, fileName);
  await fs.writeFile(absoluteFilePath, fileBuffer);

  const image = {
    id: randomUUID(),
    src: `/uploads/${homestaySlug}/${fileName}`,
    alt: altText || `${homestay.name} photo`,
    sortOrder: (localData.images[homestaySlug] ?? []).length,
  };

  localData.images[homestaySlug] = [...(localData.images[homestaySlug] ?? []), image];
  await writeLocalData(localData);
  return image;
}

export async function deleteImage({ homestaySlug, imageId }, options = {}) {
  if (shouldUseSupabase()) {
    const { primaryClient, fallbackClient } = getMutationClients(options.accessToken);
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "homestay_images";
    const deleteWithClient = async (client) => {
      const { data: imageRow, error: findError } = await client
        .from("homestay_images")
        .select("id, storage_path")
        .eq("id", imageId)
        .single();

      if (findError) {
        return { error: findError };
      }

      if (imageRow?.storage_path) {
        await client.storage.from(bucket).remove([imageRow.storage_path]);
      }

      const { error } = await client.from("homestay_images").delete().eq("id", imageId);
      return { error };
    };

    let { error } = await deleteWithClient(primaryClient);
    if (error && fallbackClient && isLikelyRlsError(error.message)) {
      ({ error } = await deleteWithClient(fallbackClient));
    }

    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  const localData = await readLocalData();
  const images = localData.images[homestaySlug] ?? [];
  const image = images.find((item) => item.id === imageId);
  if (!image) {
    return;
  }
  localData.images[homestaySlug] = images
    .filter((item) => item.id !== imageId)
    .map((item, index) => ({ ...item, sortOrder: index }));
  await writeLocalData(localData);

  if (image.src.startsWith("/uploads/")) {
    const absolutePath = path.join(process.cwd(), "public", image.src.replace(/^\/+/, ""));
    await fs.rm(absolutePath, { force: true });
  }
}

export async function reorderImages({ homestaySlug, imageIds }, options = {}) {
  if (shouldUseSupabase()) {
    const { primaryClient, fallbackClient } = getMutationClients(options.accessToken);
    const reorderWithClient = async (client) => {
      const results = await Promise.all(
        imageIds.map((id, index) =>
          client
            .from("homestay_images")
            .update({ sort_order: index })
            .eq("id", id)
            .eq("homestay_slug", homestaySlug)
            .select("id")
            .single(),
        ),
      );
      const failed = results.find((item) => item.error);
      if (failed?.error) {
        return { error: failed.error };
      }
      return { error: null };
    };

    let { error } = await reorderWithClient(primaryClient);
    if (error && fallbackClient && isLikelyRlsError(error.message)) {
      ({ error } = await reorderWithClient(fallbackClient));
    }

    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  const localData = await readLocalData();
  const current = localData.images[homestaySlug] ?? [];
  const mapped = imageIds
    .map((id, index) => {
      const image = current.find((item) => item.id === id);
      if (!image) {
        return null;
      }
      return {
        ...image,
        sortOrder: index,
      };
    })
    .filter(Boolean);
  if (mapped.length !== imageIds.length) {
    throw new Error("Only uploaded images can be reordered.");
  }

  localData.images[homestaySlug] = mapped;
  await writeLocalData(localData);
}
