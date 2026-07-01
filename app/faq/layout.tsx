import type { Metadata } from "next";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { FAQ_ITEMS } from "./faq-items";

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

// Données structurées FAQPage : résultats enrichis Google + citations par les
// moteurs de réponse IA (ChatGPT, Perplexity…).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.full || item.preview },
  })),
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
