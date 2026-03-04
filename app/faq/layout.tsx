import type { Metadata } from "next";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ — Kompar Edu",
  description:
    "Questions fréquentes sur kompar - edu : fonctionnement du comparateur d'établissements scolaires publics et privés en Algérie, données utilisées, confidentialité et contact.",
  openGraph: {
    title: `FAQ | ${SITE_NAME}`,
    description:
      "Réponses aux questions fréquentes sur le comparateur d'écoles, universités et formations en Algérie.",
    url: `${getBaseUrl()}/faq`,
  },
  alternates: { canonical: `${getBaseUrl()}/faq` },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
