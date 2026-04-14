import { NextResponse } from "next/server";
import { getHomestayContent } from "@/lib/data/provider";

export const dynamic = "force-dynamic";

export async function GET() {
  const homestays = await getHomestayContent();
  return NextResponse.json({ homestays });
}
