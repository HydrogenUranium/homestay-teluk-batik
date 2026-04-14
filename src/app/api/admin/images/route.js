import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdmin } from "../guard";
import { uploadImage } from "@/lib/data/provider";

const uploadSchema = z.object({
  homestaySlug: z.string().min(1),
  altText: z.string().optional(),
});

export async function POST(request) {
  const auth = await assertAdmin();
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const formData = await request.formData();
    const values = uploadSchema.parse({
      homestaySlug: formData.get("homestaySlug"),
      altText: formData.get("altText") || "",
    });

    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Image file is required." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const image = await uploadImage({
      homestaySlug: values.homestaySlug,
      altText: values.altText,
      fileBuffer: Buffer.from(arrayBuffer),
      originalName: file.name,
      contentType: file.type || "image/jpeg",
    });

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Failed to upload image." }, { status: 400 });
  }
}
