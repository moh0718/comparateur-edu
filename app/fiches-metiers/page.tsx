import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";
import { metiersMock } from "@/data/metiers-mock";
import { SECTEURS } from "@/data/metiers-data";
import { SearchMetiers } from "@/components/fiches-metiers/SearchMetiers";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Fiches métiers — Orientation et débouchés en Algérie",
  description:
    "Fiches métiers pour l'orientation en Algérie : description, missions, diplômes requis, salaires indicatifs et perspectives. Santé, ingénierie, informatique, droit, commerce et plus.",
  keywords: [
    "fiches métiers",
    "orientation Algérie",
    "métiers Alger",
    "débouchés formation",
    "salaires métiers Algérie",
  ],
  openGraph: {
    title: `Fiches métiers | ${SITE_NAME}`,
    url: `${getBaseUrl()}/fiches-metiers`,
  },
  alternates: { canonical: `${getBaseUrl()}/fiches-metiers` },
};

export default function FichesMetiersPage() {
  const bySecteur = SECTEURS.map((nom) => ({
    nom,
    metiers: metiersMock.filter((m) => m.domaine === nom),
  })).filter((s) => s.metiers.length > 0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Hero + recherche */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 to-white px-5 py-14 sm:px-6 md:px-8 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.12),transparent)]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Fiches métiers
            </h1>
            <p className="mt-4 text-lg text-slate-600 sm:text-xl">
              Découvrez les métiers, formations et salaires indicatifs pour vous orienter en Algérie.
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base">
              L&apos;école passe, le métier reste. Faites le bon choix.
            </p>
            <div className="mt-10">
              <SearchMetiers metiers={metiersMock} />
            </div>
          </div>
        </section>

        {/* Objectif de la section — bloc plus compact pour laisser voir la liste */}
        <section className="border-t border-slate-200/80 bg-white px-5 py-7 sm:px-6 md:px-8 md:py-9">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Pourquoi cette section ?
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed sm:text-base">
              Parce que choisir son métier ne se limite pas à choisir une école. Cette section vous aide à comprendre la réalité de chaque profession&nbsp;: le quotidien du métier, la formation recommandée (avec les établissements algériens quand c&apos;est possible), les salaires moyens, le potentiel freelance et les perspectives d&apos;évolution. Les chiffres donnés sont indicatifs et peuvent varier selon la wilaya, l&apos;employeur, l&apos;expérience et le statut (salarié ou indépendant).
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="primary" size="md" className="rounded-full px-6">
                <Link href={LEAD_FORM_HREF}>Trouver mon École</Link>
              </Button>
              <Button asChild variant="secondary" size="md" className="rounded-full px-6">
                <Link href={ROUTES.etablissements}>Voir l&apos;annuaire des établissements</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Grille par secteur */}
        <section className="px-5 py-10 sm:px-6 md:px-8 md:py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Par secteur
            </h2>
            <div className="space-y-12">
              {bySecteur.map(({ nom, metiers }) => (
                <div key={nom}>
                  <h3 className="mb-4 text-lg font-semibold text-slate-800">
                    {nom}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {metiers.map((m) => (
                      <Link
                        key={m.id}
                        href={`/fiches-metiers/${m.slug}`}
                        className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:border-slate-300 hover:shadow-card-hover"
                      >
                        <h4 className="font-semibold text-slate-900">{m.titre}</h4>
                        {m.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                            {m.description}
                          </p>
                        )}
                        <span className="mt-3 inline-block text-sm font-medium text-brand">
                          Voir la fiche →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-5 py-8 sm:px-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm text-slate-500">
              Utilisez la barre de recherche pour trouver un métier par mot-clé, ou parcourez par secteur. Consultez aussi les{" "}
              <Link href={ROUTES.salonsEtudiants} className="text-brand hover:underline">
                salons étudiants en Algérie
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
