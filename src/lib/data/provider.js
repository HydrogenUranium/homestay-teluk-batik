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

function shouldUseSupabase() {
  return process.env.DATA_PROVIDER === "supabase" && !!getSupabaseAdminClient();
}

function sortByOrder(images) {
  return [...images].sort((a, b) => a.sortOrder - b.sortOrder);
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
  const supabase = getSupabaseAdminClient();
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

export async function addBlockedDate(homestaySlug, date) {
  if (shouldUseSupabase()) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("homestay_blocked_dates")
      .insert({ homestay_slug: homestaySlug, date })
      .select("id, date")
      .single();

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

export async function removeBlockedDate(homestaySlug, blockedId) {
  if (shouldUseSupabase()) {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("homestay_blocked_dates").delete().eq("id", blockedId);
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

export async function uploadImage({ homestaySlug, altText, fileBuffer, originalName, contentType }) {
  const homestay = getHomestayBySlug(homestaySlug);
  if (!homestay) {
    throw new Error("Invalid homestay slug");
  }

  if (shouldUseSupabase()) {
    const supabase = getSupabaseAdminClient();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "homestay-images";
    const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const storagePath = `${homestaySlug}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, { contentType, upsert: false });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(storagePath);
    const existing = await getHomestayContent();
    const sortOrder = existing.find((item) => item.slug === homestaySlug)?.images.length ?? 0;

    const { data, error } = await supabase
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

export async function deleteImage({ homestaySlug, imageId }) {
  if (shouldUseSupabase()) {
    const supabase = getSupabaseAdminClient();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "homestay-images";
    const { data: imageRow, error: findError } = await supabase
      .from("homestay_images")
      .select("id, storage_path")
      .eq("id", imageId)
      .single();

    if (findError) {
      throw new Error(findError.message);
    }

    if (imageRow?.storage_path) {
      await supabase.storage.from(bucket).remove([imageRow.storage_path]);
    }

    const { error } = await supabase.from("homestay_images").delete().eq("id", imageId);
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

export async function reorderImages({ homestaySlug, imageIds }) {
  if (shouldUseSupabase()) {
    const supabase = getSupabaseAdminClient();
    await Promise.all(
      imageIds.map((id, index) =>
        supabase.from("homestay_images").update({ sort_order: index }).eq("id", id),
      ),
    );
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

  localData.images[homestaySlug] = mapped;
  await writeLocalData(localData);
}
