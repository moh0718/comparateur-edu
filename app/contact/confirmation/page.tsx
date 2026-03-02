import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Message envoyé",
  description: "Nous avons bien reçu votre message et reviendrons vers vous très rapidement.",
  openGraph: {
    title: `Message envoyé | ${SITE_NAME}`,
    url: `${getBaseUrl()}/contact/confirmation`,
  },
  robots: { index: false, follow: true },
};

export default function ContactConfirmationPage() {
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
            Merci, nous revenons vers vous très vite.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="primary" size="lg" className="rounded-full">
              <Link href={LEAD_FORM_HREF}>Me faire orienter</Link>
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
