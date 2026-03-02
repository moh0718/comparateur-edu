/**
 * SEO & GEO — Comparateur Edu.
 * Positionnement : comparateur gratuit = agrégateur d'informations = tiers de confiance.
 * Décision simplifiée (pas de vente de "rêve") — formulaire = échange de valeur.
 */

export const SITE_NAME = "Comparateur Edu";

export const SITE_DESCRIPTION =
  "Comparateur gratuit d'établissements en Algérie. Agrégateur d'informations vérifiées : tableaux comparatifs, filtres dynamiques, décision simplifiée. Alger, Blida, Tipaza, Boumerdès.";

/** Mots-clés SEO : positionnement + géo (wilayas, Algérie). */
export const SITE_KEYWORDS = [
  "comparateur gratuit écoles Algérie",
  "comparateur établissements Alger",
  "orientation scolaire Alger",
  "écoles privées Alger",
  "écoles privées Blida",
  "universités Alger",
  "formations pro Algérie",
  "MESRS reconnaissance diplômes",
  "annuaire écoles Algerie",
  "décision orientation scolaire",
  "Comparateur Edu",
];

/** Wilayas ciblées pour GEO. */
export const GEO_WILAYAS = ["Alger", "Blida", "Tipaza", "Boumerdès"] as const;

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://comparateur-edu.vercel.app";
}

export function absoluteUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

/** Génère un titre SEO avec wilaya optionnelle (GEO). */
export function titleWithGeo(baseTitle: string, wilaya?: string): string {
  if (wilaya) return `${baseTitle} à ${wilaya} | ${SITE_NAME}`;
  return `${baseTitle} en Algérie | ${SITE_NAME}`;
}
