import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth/session";

export async function assertAdmin() {
  const session = await requireAdminSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }
  return { ok: true, session };
}
