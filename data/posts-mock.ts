export type PostCategory =
  | "Guides pratiques"
  | "Tarifs & inscriptions"
  | "Vie pratique"
  | "Orientation"
  | "Documents & démarches"
  | "Écoles privées";

export type PostSource = "manual" | "auto";

export type ContentSection = {
  icon: string;
  title: string;
  content: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  date: string;
  imageUrl: string;
  /** Texte brut (paragraphes séparés par \n\n). Utilisé si contentSections est absent. */
  content: string;
  /** Source : manuel (rédaction) ou auto (généré par script). */
  source: PostSource;
  /** Auteur affiché (optionnel). */
  author?: string;
  /** Tags / catégories affichés en pills (optionnel). */
  tags?: string[];
  /** Sections structurées (titre + icône + contenu). Si présent, utilisé à la place de content. */
  contentSections?: ContentSection[];
  /** Slugs d'articles similaires (optionnel). Si présent, utilisé pour la section "Articles similaires". */
  relatedSlugs?: string[];
};

import { educationPosts } from "./posts-education";

/** Liste des articles du blog — éducation privée Alger. */
export const posts: Post[] = educationPosts;

