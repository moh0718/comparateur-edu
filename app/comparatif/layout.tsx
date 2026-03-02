import type { Metadata } from "next";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comparatif des banques",
  description:
    "Comparez en un coup d'œil les frais, cartes, conditions et services des banques algériennes. Filtres par type de carte et type de banque.",
  openGraph: {
    title: `Comparatif des banques | ${SITE_NAME}`,
    description:
      "Comparez les frais, cartes et conditions des banques algériennes. Filtres par type de carte et type de banque.",
    url: `${getBaseUrl()}/comparatif`,
  },
  alternates: { canonical: `${getBaseUrl()}/comparatif` },
};

export default function ComparatifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
