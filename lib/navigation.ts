/**
 * Routes et URLs de navigation du site.
 * Centraliser ici pour menus dynamiques, footer et CTA.
 *
 * LEAD_FORM_HREF : peut être surchargé via NEXT_PUBLIC_LEAD_FORM_HREF (ex. en .env ou Vercel).
 * Sinon par défaut : /recommandation/1 (formulaire recommandation sur le site).
 */

/** Page du formulaire orientation (recommandation école). Défaut /orientation/1. */
export const LEAD_FORM_HREF =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_LEAD_FORM_HREF) || "/orientation/1";

/** Routes des pages principales (pour header, footer, sitemap). */
export const ROUTES = {
  home: "/",
  /** Écoles Maternelle → Lycée */
  ecoles: "/etablissements?categorie=General",
  /** Universités, Licence, Master, Grandes Écoles */
  universites: "/etablissements?categorie=Superieur",
  /** Formations Pro (BTS, Langues, etc.) */
  formationsPro: "/etablissements?categorie=Formation Pro",
  etablissements: "/etablissements",
  comparer: "/comparer",
  orientation: "/orientation/1",
  orientationConfirmation: "/orientation/merci",
  /** Fiches métiers (description, missions, salaires, débouchés) */
  fichesMetiers: "/fiches-metiers",
  /** Salons étudiants & événements orientation en Algérie */
  salonsEtudiants: "/salons-etudiants",
  /** Le Mag' — Blog & conseils SEO */
  blog: "/blog",
  /** Classements internationaux des universités algériennes */
  rankings: "/rankings",
  contact: "/contact",
  contactConfirmation: "/contact/confirmation",
  faq: "/faq",
  mentionsLegales: "/mentions-legales",
  conditionsGenerales: "/conditions-generales",
} as const;
