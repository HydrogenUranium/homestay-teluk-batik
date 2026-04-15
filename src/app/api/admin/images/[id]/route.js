import { NextResponse } from "next/server";
import { assertAdmin } from "../../guard";
import { deleteImage } from "@/lib/data/provider";

export async function DELETE(request, { params }) {
  const auth = await assertAdmin();
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const { id } = await params;
    const homestaySlug = request.nextUrl.searchParams.get("homestaySlug");
    if (!homestaySlug) {
      return NextResponse.json({ message: "homestaySlug is required." }, { status: 400 });
    }

    await deleteImage({ homestaySlug, imageId: id }, { accessToken: auth.supabaseAccessToken });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Failed to delete image." }, { status: 400 });
  }
}
