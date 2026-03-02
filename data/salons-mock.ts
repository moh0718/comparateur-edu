/**
 * Salons étudiants & événements orientation en Algérie.
 * À alimenter par scraping (sites officiels, SAFEX, etc.) + résumé Gemini.
 *
 * Chaque entrée : nom, description, dates, adresse, conditions d'inscription.
 */

export interface SalonEtudiant {
  id: string;
  slug: string;
  nom: string;
  description?: string;
  /** Dates exactes ou période (ex. "15-17 mars 2025") */
  dates?: string;
  adresse?: string;
  lieu?: string;
  /** Conditions d'inscription (gratuit, sur inscription, etc.) */
  conditions_inscription?: string;
  site_web?: string;
  annee?: number;
}

/** Liste indicative — à compléter par scraping + Gemini. */
export const salonsMock: SalonEtudiant[] = [
  {
    id: "1",
    slug: "safex-salon-formation",
    nom: "Salon de la formation et de l'emploi (SAFEX)",
    description: "Événement majeur d'orientation et de recrutement à Alger.",
    dates: "À confirmer (généralement en mars ou avril)",
    adresse: "SAFEX, Pins Maritimes, Alger",
    lieu: "Alger",
    conditions_inscription: "Entrée gratuite ou sur inscription selon années ; vérifier le site officiel.",
    annee: 2025,
  },
  {
    id: "2",
    slug: "salon-etudiant-oran",
    nom: "Salon de l'étudiant — Oran",
    description: "Salon dédié à l'orientation post-bac et aux formations dans la région.",
    dates: "À confirmer",
    lieu: "Oran",
    conditions_inscription: "Généralement gratuit.",
    annee: 2025,
  },
];
