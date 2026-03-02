import { createClient } from "@/lib/supabase/server";

export type BankRatesForFiche = {
  conditions_ouverture: string | null;
  depot_minimum: string | null;
  frais_tenue_compte: string | null;
  frais_retrait_dam: string | null;
  frais_virement: string | null;
  nombre_agences: string | null;
  cartes: string[] | null;
  virements_internationaux: string | null;
  compte_devises: string | null;
  credit_immobilier: string | null;
  credit_auto: string | null;
  type_banque: string | null;
  chequier: string | null;
  points_forts: string[] | null;
  points_faibles: string[] | null;
};

/** Enrichissement pour le tableau comparatif (coût, éligibilité, cartes, etc.) */
export type BankRatesEnrichment = {
  cost: string | null;
  eligibility: string | null;
  cards: string | null;
  accountOpeningDelay: string | null;
  virements_internationaux: string | null;
  compte_devises: string | null;
};

const BANK_RATES_COLUMNS =
  "conditions_ouverture, depot_minimum, frais_tenue_compte, frais_retrait_dam, frais_virement, nombre_agences, cartes, virements_internationaux, compte_devises, credit_immobilier, credit_auto, type_banque, chequier, points_forts, points_faibles";

/**
 * Récupère les données bank_rates pour une fiche banque à partir du slug.
 * Retourne null si pas de donnée ou erreur.
 */
export async function getBankRatesForFiche(
  slug: string
): Promise<BankRatesForFiche | null> {
  const supabase = await createClient();

  const { data: bySlug } = await supabase
    .from("banks")
    .select("id")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();
  let bankId = bySlug?.id;
  if (!bankId) {
    const { data: byId } = await supabase
      .from("banks")
      .select("id")
      .eq("id", slug)
      .limit(1)
      .maybeSingle();
    bankId = byId?.id;
  }
  if (!bankId) return null;

  const { data: row, error } = await supabase
    .from("bank_rates")
    .select(BANK_RATES_COLUMNS)
    .eq("bank_id", bankId)
    .maybeSingle();

  if (error || !row) return null;

  return {
    conditions_ouverture: row.conditions_ouverture ?? null,
    depot_minimum: row.depot_minimum ?? null,
    frais_tenue_compte: row.frais_tenue_compte ?? null,
    frais_retrait_dam: row.frais_retrait_dam ?? null,
    frais_virement: row.frais_virement ?? null,
    nombre_agences: row.nombre_agences ?? null,
    cartes: Array.isArray(row.cartes) ? row.cartes : null,
    virements_internationaux: row.virements_internationaux ?? null,
    compte_devises: row.compte_devises ?? null,
    credit_immobilier: row.credit_immobilier ?? null,
    credit_auto: row.credit_auto ?? null,
    type_banque: row.type_banque ?? null,
    chequier: row.chequier ?? null,
    points_forts: Array.isArray(row.points_forts) ? row.points_forts : null,
    points_faibles: Array.isArray(row.points_faibles) ? row.points_faibles : null,
  };
}

/** Résumé d'éligibilité à partir de conditions_ouverture (max 200 caractères pour le comparatif). */
function eligibilitySummary(conditions: string | null): string | null {
  if (!conditions || !conditions.trim()) return null;
  const trimmed = conditions.replace(/\s+/g, " ").trim();
  return trimmed.length > 200 ? `${trimmed.slice(0, 197)}…` : trimmed;
}

/**
 * Récupère l'enrichissement Supabase pour toutes les banques (slug → coût, éligibilité, cartes, etc.).
 * Utilisé par le comparatif pour remplir les cellules quand les données existent.
 */
export async function getBankRatesEnrichmentBySlug(): Promise<
  Record<string, BankRatesEnrichment>
> {
  const supabase = await createClient();

  const { data: banksRows, error: banksError } = await supabase
    .from("banks")
    .select("id, slug");
  if (banksError || !banksRows?.length) return {};

  const bankIds = banksRows.map((b) => b.id);
  const slugById = Object.fromEntries(
    banksRows.map((b) => [b.id, (b.slug ?? b.id) as string])
  );

  const { data: ratesRows, error: ratesError } = await supabase
    .from("bank_rates")
    .select(
      "bank_id, frais_tenue_compte, conditions_ouverture, cartes, virements_internationaux, compte_devises"
    )
    .in("bank_id", bankIds);

  if (ratesError || !ratesRows?.length) return {};

  const out: Record<string, BankRatesEnrichment> = {};
  for (const r of ratesRows) {
    const slug = slugById[r.bank_id];
    if (!slug) continue;
    const cards =
      Array.isArray(r.cartes) && r.cartes.length
        ? r.cartes.join(", ")
        : null;
    out[slug] = {
      cost: r.frais_tenue_compte ?? null,
      eligibility: eligibilitySummary(r.conditions_ouverture),
      cards,
      accountOpeningDelay: null,
      virements_internationaux: r.virements_internationaux ?? null,
      compte_devises: r.compte_devises ?? null,
    };
  }
  return out;
}
