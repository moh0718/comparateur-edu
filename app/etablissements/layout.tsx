import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, getBaseUrl, titleWithGeo } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleWithGeo("Comparateur d'écoles et établissements"),
  description: SITE_DESCRIPTION,
  keywords: ["écoles Alger", "écoles Blida", "universités Algérie", "formations pro", "comparateur gratuit", "filtres dynamiques"],
  openGraph: {
    title: titleWithGeo("Comparateur d'écoles et établissements"),
    description: SITE_DESCRIPTION,
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
