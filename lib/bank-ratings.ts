import { createClient } from "@/lib/supabase/server";

export type BankRatings = {
  app_rating_apple: number | null;
  app_rating_google: number | null;
  app_reviews_count: number | null;
};

/**
 * Récupère les notes App Store / Google Play par slug de banque.
 * Données Supabase : banks (id, slug) + bank_rates (bank_id, app_rating_*), fusion en code.
 */
export async function getBankRatingsBySlug(): Promise<
  Record<string, BankRatings>
> {
  const supabase = await createClient();

  const [banksRes, ratesRes] = await Promise.all([
    supabase.from("banks").select("id, slug"),
    supabase.from("bank_rates").select("bank_id, app_rating_apple, app_rating_google, app_reviews_count"),
  ]);

  if (banksRes.error || ratesRes.error) {
    return {};
  }

  const bankIdToSlug: Record<string, string> = {};
  for (const b of banksRes.data ?? []) {
    const slug = b.slug ?? String(b.id);
    bankIdToSlug[String(b.id)] = slug;
  }

  const map: Record<string, BankRatings> = {};
  const rows = ratesRes.data ?? [];
  for (const row of rows) {
    const slug = bankIdToSlug[String(row?.bank_id)];
    if (!slug) continue;
    const apple =
      row != null && typeof (row as { app_rating_apple?: unknown }).app_rating_apple === "number"
        ? (row as { app_rating_apple: number }).app_rating_apple
        : null;
    const google =
      row != null && typeof (row as { app_rating_google?: unknown }).app_rating_google === "number"
        ? (row as { app_rating_google: number }).app_rating_google
        : null;
    const count =
      row != null && typeof (row as { app_reviews_count?: unknown }).app_reviews_count === "number"
        ? (row as { app_reviews_count: number }).app_reviews_count
        : null;
    if (apple !== null || google !== null || (count != null && count > 0)) {
      map[slug] = {
        app_rating_apple: apple,
        app_rating_google: google,
        app_reviews_count: count,
      };
    }
  }
  return map;
}

/**
 * Récupère les notes pour une banque par slug (fiche banque).
 */
export async function getBankRatingsForSlug(
  slug: string
): Promise<BankRatings | null> {
  const map = await getBankRatingsBySlug();
  return map[slug] ?? null;
}
