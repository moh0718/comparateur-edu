import { getBankRatesEnrichmentBySlug } from "@/lib/bank-rates";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const map = await getBankRatesEnrichmentBySlug();
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
