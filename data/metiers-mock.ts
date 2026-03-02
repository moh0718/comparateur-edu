/**
 * Fiches métiers — type et export unique pour le site.
 * Données réelles dans metiers-data.ts (une seule source pour SEO et generateStaticParams).
 */

export interface FicheMetier {
  id: string;
  slug: string;
  titre: string;
  /** Secteur / domaine (Médecine et Santé, Ingénierie, etc.) */
  domaine?: string;
  description?: string;
  missions?: string[];
  challenges?: string[];
  diplomes_requis?: string[];
  /** Fourchette ou texte libre — estimations marché algérien, indicatif */
  salaires?: string;
  perspectives_evolution?: string[];
  competences_qualites?: string[];
}

import { METIERS_DATA } from "./metiers-data";

/** Liste complète des fiches métiers (source : metiers-data.ts). */
export const metiersMock: FicheMetier[] = METIERS_DATA;
