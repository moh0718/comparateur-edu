import type { Metadata } from "next";
import { SITE_NAME, SITE_KEYWORDS, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Le Mag' — Guides écoles privées Alger",
  description:
    "Guides tarifs, inscriptions, cantine, ramassage scolaire, bac et programmes internationaux. Conseils pour choisir son école privée à Alger et en Algérie.",
  keywords: [
    "blog orientation scolaire Algérie",
    "guides écoles privées Alger",
    "inscription école privée Alger",
    "cantine et transport scolaire Algérie",
    "frais de scolarité Algérie",
    ...SITE_KEYWORDS,
  ],
  openGraph: {
    title: `Le Mag' | ${SITE_NAME}`,
    description: "Guides et conseils pour les familles : écoles privées, tarifs, inscriptions, orientation.",
    url: `${getBaseUrl()}/blog`,
  },
  alternates: { canonical: `${getBaseUrl()}/blog` },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
