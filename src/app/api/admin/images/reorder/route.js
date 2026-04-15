import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "../../guard";
import { reorderImages } from "@/lib/data/provider";

const payloadSchema = z.object({
  homestaySlug: z.string().min(1),
  imageIds: z.array(z.string()).min(1),
});

export async function POST(request) {
  const auth = await assertAdmin();
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const payload = payloadSchema.parse(await request.json());
    await reorderImages(payload, { accessToken: auth.supabaseAccessToken });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Failed to reorder images." }, { status: 400 });
  }
}
