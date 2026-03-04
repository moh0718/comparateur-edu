export type Lang = "fr" | "ar";

export const DEFAULT_LANG: Lang = "fr";

type Messages = Record<string, string>;

const fr: Messages = {
  "nav.etablissements": "Annuaire établissements",
  "nav.metiersSalons": "Métiers & Salons",
  "nav.blog": "Le Mag'",
  "nav.contact": "Contact",
  "nav.rankings": "Rankings",
  "nav.cta": "Trouver mon École",
};

const ar: Messages = {
  "nav.etablissements": "دليل المؤسسات",
  "nav.metiersSalons": "المهن والصالونات",
  "nav.blog": "المجلة",
  "nav.contact": "اتصال",
  "nav.rankings": "التصنيفات",
  "nav.cta": "ابحث عن مدرستي",
};

const MESSAGES: Record<Lang, Messages> = { fr, ar };

export function t(lang: Lang, key: string): string {
  const dict = MESSAGES[lang] || MESSAGES.fr;
  return dict[key] ?? MESSAGES.fr[key] ?? key;
}

