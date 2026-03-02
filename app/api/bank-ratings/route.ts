import { getBankRatingsBySlug } from "@/lib/bank-ratings";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const map = await getBankRatingsBySlug();
    return NextResponse.json(map);
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }
}
