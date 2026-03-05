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
  {
    id: "3",
    slug: "algerian-student-fair-2026",
    nom: "Algerian Student Fair",
    description: "Événement majeur pour l'orientation post-bac et la poursuite d'études supérieures.",
    dates: "2 - 3 Mai 2026",
    adresse: "Palais de la Culture, Alger",
    lieu: "Alger",
    conditions_inscription: "Gratuite (pré-inscription en ligne conseillée).",
    annee: 2026,
  },
  {
    id: "4",
    slug: "worldview-education-fair-2026",
    nom: "Worldview Education Fair",
    description: "Focus sur le recrutement international, les universités étrangères et les bourses d'études.",
    dates: "22 Avril 2026",
    adresse: "Alger (Hôtel à confirmer)",
    lieu: "Alger",
    conditions_inscription: "Inscription en ligne via le site officiel.",
    annee: 2026,
  },
  {
    id: "5",
    slug: "algeria-education-fair-2026",
    nom: "Algeria Education Fair",
    description: "Idéal pour les inscriptions de dernière minute et les orientations juste après les résultats du Bac.",
    dates: "1er Août 2026",
    adresse: "Hôtel Holiday Inn, Cheraga, Alger",
    lieu: "Alger",
    conditions_inscription: "Entrée libre.",
    annee: 2026,
  },
  {
    id: "6",
    slug: "the-student-show-reup-2026",
    nom: "The Student Show (ReUp)",
    description: "Le plus grand rassemblement étudiant post-résultats du Baccalauréat.",
    dates: "Juillet 2026",
    adresse: "Alger, Oran et Constantine",
    lieu: "National",
    conditions_inscription: "Gratuite.",
    annee: 2026,
  },
  {
    id: "7",
    slug: "hec-job-fair-ex-inc-2026",
    nom: "HEC Job Fair (Ex-INC)",
    description: "Carrefour de l'emploi et de l'entrepreneuriat organisé par la grande école HEC Alger.",
    dates: "Mai 2026",
    adresse: "Pôle Universitaire de Koléa, Tipaza",
    lieu: "Koléa",
    conditions_inscription: "Ouvert aux étudiants et jeunes diplômés.",
    annee: 2026,
  },
  {
    id: "8",
    slug: "journees-portes-ouvertes-universites-publiques-2026",
    nom: "Journées Portes Ouvertes (Universités Publiques)",
    description: "Présentation des filières LMD, moyennes minimales et procédures d'inscription Progrès.",
    dates: "Fin juin / Début juillet 2026",
    adresse: "USTHB, Alger 1, 2, 3 et écoles nationales (ENP, ESI, ENS)",
    lieu: "National",
    conditions_inscription: "Entrée libre.",
    annee: 2026,
  },
];
