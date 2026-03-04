import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RankingsClient } from "@/components/rankings/RankingsClient";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rankings — universités algériennes | " + SITE_NAME,
  description:
    "Vue claire et honnête des classements internationaux des universités algériennes (QS, THE, Webometrics, SCImago...). Classements 2024–2026, explications et limites.",
  openGraph: {
    title: `Rankings | ${SITE_NAME}`,
    description:
      "Classements internationaux des universités publiques et grandes écoles algériennes. QS Arab, THE Arab, Webometrics, SCImago, QS Sustainability, AD Scientific Index, U.S. News.",
    url: `${getBaseUrl()}/rankings`,
  },
  alternates: { canonical: `${getBaseUrl()}/rankings` },
};

export default function RankingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-5 pb-16 pt-8 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <RankingsClient />
      </main>
      <Footer />
    </div>
  );
}

