import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufB, bufB);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization") ?? "";
  const expected = REVALIDATION_SECRET ? `Bearer ${REVALIDATION_SECRET}` : "";

  if (!expected || !safeCompare(authHeader, expected)) {
    return new Response(
      JSON.stringify({ error: "Accès refusé" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/comparer");
  revalidatePath("/etablissements");

  return Response.json({ revalidated: true });
}
