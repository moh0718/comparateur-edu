import type { Metadata } from "next";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Le Mag' — Guides écoles privées Alger",
  description:
    "Guides tarifs, inscriptions, cantine, ramassage scolaire, bac et programmes internationaux. Conseils pour choisir son école privée à Alger et en Algérie.",
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
