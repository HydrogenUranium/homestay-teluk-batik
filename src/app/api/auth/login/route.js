import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_COOKIE_NAME, createSessionToken } from "@/lib/auth/session";

function getAuthMode() {
  return process.env.AUTH_PROVIDER || "local";
}

async function loginWithSupabase(username, password) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase auth is not configured.");
  }
  const client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  const { data, error } = await client.auth.signInWithPassword({
    email: username,
    password,
  });
  if (error || !data.user) {
    throw new Error("Invalid admin credentials.");
  }
  return { id: data.user.id, username: data.user.email || username, provider: "supabase" };
}

async function loginWithLocal(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin12345";
  if (username !== expectedUsername || password !== expectedPassword) {
    throw new Error("Invalid admin credentials.");
  }
  return { id: "local-admin", username, provider: "local" };
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
    }

    const user =
      getAuthMode() === "supabase"
        ? await loginWithSupabase(username, password)
        : await loginWithLocal(username, password);

    const token = await createSessionToken({
      sub: user.id,
      username: user.username,
      provider: user.provider,
      role: "admin",
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message || "Failed to login." }, { status: 401 });
  }
}
