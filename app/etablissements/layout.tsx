import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION_META, getBaseUrl, titleWithGeo } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleWithGeo("Annuaire établissements — Écoles et universités"),
  description: SITE_DESCRIPTION_META,
  keywords: ["écoles Alger", "écoles Blida", "universités Algérie", "formations pro", "comparateur gratuit", "filtres dynamiques"],
  openGraph: {
    title: titleWithGeo("Annuaire établissements — Écoles et universités"),
    description: SITE_DESCRIPTION_META,
    url: `${getBaseUrl()}/etablissements`,
  },
  alternates: { canonical: `${getBaseUrl()}/etablissements` },
};

export default function EtablissementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
