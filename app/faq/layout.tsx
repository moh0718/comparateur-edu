import type { Metadata } from "next";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ - Comparateur bancaire Algérie",
  description:
    "Questions fréquentes sur Kompar - Banque : comment ça marche, qui peut utiliser le site, sécurité des données, mise en relation avec les banques en Algérie.",
  openGraph: {
    title: `FAQ | ${SITE_NAME}`,
    description: "Réponses aux questions fréquentes sur notre comparateur de banques algériennes.",
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
