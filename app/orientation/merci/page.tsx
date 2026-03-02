import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Merci",
  description: "Votre demande d'orientation a bien été prise en compte.",
  openGraph: {
    title: `Merci | ${SITE_NAME}`,
    url: `${getBaseUrl()}/orientation/merci`,
  },
  robots: { index: false, follow: true },
};

export default function OrientationMerciPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex flex-1 items-center justify-center px-5 py-12 md:py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-soft md:p-10">
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl"
            aria-hidden
          >
            ✓
          </div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            Merci !
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            WhatsApp s&apos;est ouvert avec un résumé de vos réponses. Envoyez le message pour recevoir vos recommandations d&apos;établissements. Nous vous répondrons dans les plus brefs délais.
          </p>
          <p className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-xs font-medium text-emerald-800">
            Aucune donnée personnelle n&apos;est stockée sur ce site ni dans aucune base de données.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="primary" size="lg" className="rounded-full">
              <Link href={ROUTES.etablissements}>Voir l&apos;annuaire</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full">
              <Link href={ROUTES.home}>Retour à l&apos;accueil</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
