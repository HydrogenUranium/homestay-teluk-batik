import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requireAdminSession } from "@/lib/auth/session";
import { SUPABASE_ACCESS_COOKIE_NAME } from "@/lib/auth/session";

export async function assertAdmin() {
  const session = await requireAdminSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }
  const supabaseAccessToken = (await cookies()).get(SUPABASE_ACCESS_COOKIE_NAME)?.value || null;
  return { ok: true, session, supabaseAccessToken };
}
