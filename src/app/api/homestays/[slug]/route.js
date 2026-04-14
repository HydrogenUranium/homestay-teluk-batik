import { NextResponse } from "next/server";
import { getHomestayContent } from "@/lib/data/provider";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const homestays = await getHomestayContent();
  const homestay = homestays.find((item) => item.slug === slug);

  if (!homestay) {
    return NextResponse.json({ message: "Homestay not found" }, { status: 404 });
  }
  return NextResponse.json({ homestay });
}
