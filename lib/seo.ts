/**
 * SEO & GEO — kompar - edu.
 * Positionnement : plateforme d'orientation scolaire et professionnelle + comparateur gratuit = agrégateur d'informations = tiers de confiance.
 * Décision simplifiée (pas de vente de "rêve") — recommandations personnalisées envoyées sur WhatsApp, sans stockage de données sur le site.
 */

export const SITE_NAME = "kompar - edu";

export const SITE_DESCRIPTION =
  "Plateforme d'orientation scolaire et professionnelle en Algérie : portail indépendant de référence centralisant fiches métiers, annuaire des établissements et comparateur gratuit d'établissements. Agrégateur d'informations vérifiées pour une décision simplifiée. Alger, Blida, Tipaza, Boumerdès";

/** Version courte pour meta description (≈ 150 caractères, incitation au clic). */
export const SITE_DESCRIPTION_META =
  "Comparateur d'écoles et établissements en Algérie. Annuaire, fiches métiers et orientation personnalisée. Alger, Blida, Tipaza, Boumerdès.";

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
  "kompar - edu",
];

/** Wilayas ciblées pour GEO. */
export const GEO_WILAYAS = ["Alger", "Blida", "Tipaza", "Boumerdès"] as const;

/** URL canonique du site (sitemap, canonical, openGraph). Ne pas surcharger avec une autre valeur. */
const CANONICAL_BASE = "https://comparateur-edu-site.vercel.app";

export function getBaseUrl(): string {
  return CANONICAL_BASE;
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
