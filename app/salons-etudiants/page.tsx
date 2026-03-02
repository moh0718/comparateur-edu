import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { salonsMock } from "@/data/salons-mock";

export const metadata: Metadata = {
  title: "Salons étudiants en Algérie — SAFEX, Alger, Oran",
  description: "Salons et événements d'orientation pour étudiants en Algérie : SAFEX Alger, salons régionaux. Dates, adresses, conditions d'inscription.",
  keywords: ["salons étudiants Algérie", "SAFEX", "orientation Alger", "salon formation Oran", "événements étudiants"],
  openGraph: {
    title: `Salons étudiants en Algérie | ${SITE_NAME}`,
    url: `${getBaseUrl()}/salons-etudiants`,
  },
  alternates: { canonical: `${getBaseUrl()}/salons-etudiants` },
};

export default function SalonsEtudiantsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Salons étudiants en Algérie
          </h1>
          <p className="mb-8 text-slate-600">
            Événements et salons dédiés à l&apos;orientation, à la formation et à l&apos;emploi. Dates, lieux et conditions d&apos;inscription.
          </p>

          <div className="space-y-6">
            {salonsMock.map((salon) => (
              <article
                key={salon.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{salon.nom}</h2>
                    {salon.lieu && (
                      <p className="mt-1 text-sm text-slate-500">{salon.lieu}{salon.annee ? ` • ${salon.annee}` : ""}</p>
                    )}
                    {salon.description && (
                      <p className="mt-3 text-sm text-slate-700 leading-relaxed">{salon.description}</p>
                    )}
                  </div>
                </div>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  {salon.dates && (
                    <>
                      <dt className="font-medium text-slate-500">Dates</dt>
                      <dd className="text-slate-800">{salon.dates}</dd>
                    </>
                  )}
                  {salon.adresse && (
                    <>
                      <dt className="font-medium text-slate-500">Adresse</dt>
                      <dd className="text-slate-800">{salon.adresse}</dd>
                    </>
                  )}
                  {salon.conditions_inscription && (
                    <>
                      <dt className="font-medium text-slate-500">Inscription</dt>
                      <dd className="text-slate-800">{salon.conditions_inscription}</dd>
                    </>
                  )}
                </dl>
                {salon.site_web && (
                  <p className="mt-3">
                    <a
                      href={salon.site_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand hover:underline"
                    >
                      Site officiel →
                    </a>
                  </p>
                )}
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Liste mise à jour à partir de sources publiques (sites officiels, SAFEX, etc.). Pour les dates exactes, consultez les organisateurs. Voir aussi les{" "}
            <Link href={ROUTES.fichesMetiers} className="text-brand hover:underline">
              fiches métiers
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
