import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "../guard";
import { addBlockedDate } from "@/lib/data/provider";

const bodySchema = z.object({
  homestaySlug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request) {
  const auth = await assertAdmin();
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const payload = bodySchema.parse(await request.json());
    const blocked = await addBlockedDate(payload.homestaySlug, payload.date, {
      accessToken: auth.supabaseAccessToken,
    });
    return NextResponse.json({ blocked }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Failed to block date." }, { status: 400 });
  }
}
