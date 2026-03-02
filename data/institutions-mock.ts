/**
 * Données fictives d'établissements pour le développement.
 * En production : chargement depuis Supabase (table institutions, is_active = true).
 */

export type DataConfidence = "high" | "medium" | "low";
export type ScrapingPriority = "high" | "medium" | "low";
export type InstitutionCategory =
  | "Superieur"
  | "Langues"
  | "Formation Pro"
  | "General"
  | "Sante"
  | "Prescolaire";

export interface Institution {
  id: string;
  name: string;
  slug: string;
  commune?: string | null;
  wilaya?: string | null;
  category?: InstitutionCategory | null;
  description?: string | null;
  website_url?: string | null;
  address?: string | null;
  phone?: string | null;
  opening_hours?: string | null;
  annual_cost_range?: string | null;
  languages?: string[] | null;
  rating?: number | null;
  reviews_count?: number | null;
  data_confidence?: DataConfidence | null;
  is_active?: boolean;
  is_partner?: boolean;
  is_verified?: boolean;
  partner_whatsapp?: string | null;
  logo_url?: string | null;
  points_forts?: string[] | null;
  points_faibles?: string[] | null;
  mesrs_recognized?: boolean | null;
  bac_required?: boolean | null;
  has_internat?: boolean | null;
  has_transport?: boolean | null;
  level_general?: string[] | null;
  instagram_username?: string | null;
  programmes?: string | null;
   /** Priorité de scraping (pour orchestrer Google Places, crawling, etc.). */
   scraping_priority?: ScrapingPriority | null;
   /** Coordonnées géographiques (latitude/longitude) dérivées de Google Places. */
   latitude?: number | null;
   longitude?: number | null;
   /** Adresse formatée et horaires tels que renvoyés par Google Places (facultatif si déjà mappé). */
   google_place_formatted_address?: string | null;
   google_place_opening_hours?: string | null;
   /** Identifiant Google Places pour rafraîchir les données plus tard. */
   google_place_id?: string | null;
}

export const institutionsMock: Institution[] = [
  {
    id: "1",
    name: "École Supérieure de Commerce Alger",
    slug: "ecole-superieure-commerce-alger",
    commune: "Alger",
    wilaya: "Alger",
    category: "Superieur",
    description: "Formation en commerce et management reconnue.",
    annual_cost_range: "200 000 - 450 000 DA",
    languages: ["FR", "EN"],
    data_confidence: "high",
    is_partner: true,
    is_verified: true,
    points_forts: ["Réseau entreprises", "Stages garantis"],
    logo_url: null,
    mesrs_recognized: true,
    bac_required: true,
  },
  {
    id: "2",
    name: "Campus Langues Blida",
    slug: "campus-langues-blida",
    commune: "Blida",
    wilaya: "Blida",
    category: "Langues",
    annual_cost_range: "80 000 - 150 000 DA",
    languages: ["FR", "AR", "Bilingue"],
    data_confidence: "medium",
    is_partner: false,
    is_verified: false,
    points_forts: ["Anglais, français, arabe", "Préparation TOEFL"],
  },
  {
    id: "3",
    name: "Lycée Privé Les Glycines",
    slug: "lycee-prive-les-glycines",
    commune: "Tipaza",
    wilaya: "Tipaza",
    category: "General",
    level_general: ["Lycee"],
    annual_cost_range: "150 000 - 280 000 DA",
    languages: ["FR"],
    data_confidence: "high",
    is_partner: true,
    is_verified: true,
    points_forts: ["Taux réussite bac élevé", "Internat"],
    has_internat: true,
    has_transport: true,
  },
  {
    id: "4",
    name: "Institut Formation Pro Boumerdès",
    slug: "institut-formation-pro-boumerdes",
    commune: "Boumerdès",
    wilaya: "Boumerdès",
    category: "Formation Pro",
    annual_cost_range: "100 000 - 220 000 DA",
    languages: ["FR"],
    data_confidence: "medium",
    is_partner: false,
    points_forts: ["Certifications reconnues", "Partenariats entreprises"],
  },
  {
    id: "5",
    name: "École Maternelle Les Petits Génies",
    slug: "ecole-maternelle-petits-genies",
    commune: "Alger",
    wilaya: "Alger",
    category: "Prescolaire",
    level_general: ["Maternelle"],
    annual_cost_range: "60 000 - 120 000 DA",
    languages: ["FR", "AR", "Bilingue"],
    data_confidence: "low",
    is_partner: false,
    points_forts: ["Éveil bilingue", "Activités créatives"],
  },
  {
    id: "6",
    name: "Institut Santé Alger",
    slug: "institut-sante-alger",
    commune: "Alger",
    wilaya: "Alger",
    category: "Sante",
    annual_cost_range: "300 000 - 600 000 DA",
    languages: ["FR"],
    data_confidence: "high",
    is_partner: true,
    is_verified: true,
    mesrs_recognized: true,
    points_forts: ["Formations paramédicales", "Stages en cliniques"],
  },
];
