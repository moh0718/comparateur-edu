import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez kompar - edu pour toute question sur l'orientation, les établissements ou les fiches métiers en Algérie. Réponse rapide.",
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description: "Contactez-nous pour toute question ou remarque.",
    url: `${getBaseUrl()}/contact`,
  },
  alternates: { canonical: `${getBaseUrl()}/contact` },
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value as Lang | undefined;
  const lang: Lang = langCookie === "ar" ? "ar" : "fr";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 py-8 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-lg rounded-2xl bg-white p-5 shadow-sm sm:p-6 md:p-8">
            <h1 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
              {t(lang, "contact.title")}
            </h1>
            <p className="mt-2 text-center text-sm text-slate-600 sm:text-base">
              Une question spécifique ? Notre équipe est là pour vous.
            </p>

            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
