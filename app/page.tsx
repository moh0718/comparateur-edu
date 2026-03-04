import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SITE_NAME, SITE_DESCRIPTION, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Comparateur gratuit — Décision simplifiée | Écoles & universités en Algérie",
  description: SITE_DESCRIPTION,
  keywords: ["comparateur gratuit", "décision simplifiée", "écoles Alger", "orientation Algérie", "Alger", "Blida", "Tipaza", "Boumerdès"],
  openGraph: {
    title: `${SITE_NAME} | Comparateur gratuit — Décision simplifiée en Algérie`,
    description: SITE_DESCRIPTION,
    url: getBaseUrl(),
  },
  alternates: { canonical: getBaseUrl() },
};

const CATEGORIES = [
  { id: "Superieur", label: "Supérieur", icon: "🎓", href: "/etablissements?categorie=Superieur" },
  { id: "Langues", label: "Langues", icon: "🌍", href: "/etablissements?categorie=Langues" },
  { id: "Formation Pro", label: "Formation Pro", icon: "💼", href: "/etablissements?categorie=Formation Pro" },
  { id: "General", label: "Écoles générales", icon: "📚", href: "/etablissements?categorie=General" },
  { id: "Sante", label: "Santé", icon: "🏥", href: "/etablissements?categorie=Sante" },
  { id: "Prescolaire", label: "Préscolaire", icon: "👶", href: "/etablissements?categorie=Prescolaire" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 pb-16 pt-8 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl space-y-10 md:space-y-14">
          {/* 1. Hero — positionnement : comparateur gratuit, décision simplifiée */}
          <section aria-labelledby="hero-title">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="text-center md:text-left">
                <p className="mx-auto mb-2 max-w-xl text-sm font-semibold uppercase tracking-wide text-emerald-600 md:mx-0">
                  Comparateur gratuit · Tiers de confiance
                </p>
                <h1
                  id="hero-title"
                  className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl md:mx-0"
                >
                  Une décision simplifiée pour vos études en Algérie
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-700 sm:text-lg md:mx-0">
                  Agrégateur d&apos;informations vérifiées : tableaux comparatifs, filtres dynamiques. Alger, Blida, Tipaza, Boumerdès.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <Button asChild variant="primary" size="lg" className="rounded-full px-8 shadow-md">
                    <Link href={LEAD_FORM_HREF}>Trouver mon école</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="rounded-full border-2 border-emerald-600 px-8 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900"
                  >
                    <Link href={ROUTES.etablissements}>Comparer les établissements</Link>
                  </Button>
                </div>
              </div>

              {/* Visuel comparateur pour ajouter du peps */}
              <div className="hidden justify-end md:flex">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-200 via-sky-200 to-amber-100 blur-2xl" aria-hidden />
                  <div className="relative overflow-hidden rounded-3xl bg-white/90 p-5 shadow-xl ring-1 ring-slate-200">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        <span aria-hidden>📊</span>
                        Comparaison en un coup d&apos;œil
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Alger · Blida · Tipaza
                      </span>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-[1.2fr,0.8fr,0.8fr] gap-2 rounded-2xl bg-slate-50 p-3">
                        <span className="text-[11px] font-semibold text-slate-700">École A</span>
                        <span className="text-[11px] text-slate-600">+ Validation MESRS</span>
                        <span className="text-[11px] font-semibold text-emerald-700">✓ Recommandée</span>
                      </div>
                      <div className="grid grid-cols-[1.2fr,0.8fr,0.8fr] gap-2 rounded-2xl bg-slate-900 p-3 text-[11px] text-slate-100">
                        <span className="font-semibold">École B</span>
                        <span className="text-slate-300">Langues &amp; double diplôme</span>
                        <span className="font-semibold text-emerald-300">Meilleur rapport qualité/prix</span>
                      </div>
                      <div className="grid grid-cols-[1.2fr,0.8fr,0.8fr] gap-2 rounded-2xl bg-slate-50 p-3">
                        <span className="text-[11px] font-semibold text-slate-700">École C</span>
                        <span className="text-[11px] text-slate-600">Forte employabilité</span>
                        <span className="text-[11px] font-semibold text-amber-700">À explorer</span>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] text-slate-500">
                      Visuel illustratif. Les recommandations finales sont personnalisées selon votre profil.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Barre de recherche rapide */}
          <section aria-label="Recherche rapide" className="rounded-2xl bg-white p-4 shadow-card md:p-5">
            <form action={ROUTES.etablissements} method="get" className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                name="q"
                placeholder="Nom d'établissement..."
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                aria-label="Recherche par nom"
              />
              <select
                name="categorie"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
                aria-label="Catégorie"
              >
                <option value="">Catégorie</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <select
                name="wilaya"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
                aria-label="Wilaya"
              >
                <option value="">Wilaya</option>
                <option value="Alger">Alger</option>
                <option value="Blida">Blida</option>
                <option value="Tipaza">Tipaza</option>
                <option value="Boumerdès">Boumerdès</option>
              </select>
              <Button type="submit" variant="primary" className="rounded-xl">
                Rechercher
              </Button>
            </form>
          </section>

          {/* 3. Catégories chips */}
          <section aria-labelledby="categories-title">
            <h2 id="categories-title" className="sr-only">
              Catégories d&apos;établissements
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={c.href}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"
                >
                  <span aria-hidden>{c.icon}</span>
                  {c.label}
                </Link>
              ))}
            </div>
          </section>

          {/* 4. Pourquoi nous — tiers de confiance, décision simplifiée, échange valeur */}
          <section
            id="pourquoi"
            aria-labelledby="pourquoi-title"
            className="rounded-2xl bg-white p-6 shadow-card md:p-8"
          >
            <h2 id="pourquoi-title" className="mb-6 text-center font-display text-xl font-semibold text-slate-900 md:text-2xl">
              Pourquoi kompar - edu ?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-slate-700">
              On ne vend pas le rêve : on vous aide à <strong>simplifier votre décision</strong>. Le formulaire d&apos;orientation est l&apos;échange valeur/information pour mériter une recommandation personnalisée.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <article className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                  ✓
                </div>
                <h3 className="font-semibold text-slate-900">Agrégateur d&apos;informations</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Données vérifiées (sites officiels, Google Maps). Pas d&apos;annuaire statique : tableaux comparatifs et filtres dynamiques.
                </p>
              </article>
              <article className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                  ⚖️
                </div>
                <h3 className="font-semibold text-slate-900">Comparatif transparent</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Comparez côte à côte : coût, reconnaissance MESRS, langues, options. Outils de simulation pour affiner votre choix.
                </p>
              </article>
              <article className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                  💬
                </div>
                <h3 className="font-semibold text-slate-900">Décision simplifiée</h3>
                <p className="mt-1 text-sm text-slate-700">
                  Quelques questions → recommandations personnalisées. Échange de valeur : vous donnez vos critères, on vous oriente. Gratuit.
                </p>
              </article>
            </div>
          </section>

          {/* 5. CTA — formulaire = passage obligé pour la décision simplifiée */}
          <section
            aria-labelledby="cta-title"
            className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-10 text-center text-emerald-50 shadow-card md:px-10 md:py-12"
          >
            <h2 id="cta-title" className="font-display text-xl font-semibold md:text-2xl">
              Décision simplifiée : trouvez votre école en quelques clics
            </h2>
            <p className="mt-2 text-emerald-50">
              Le formulaire est le passage pour mériter une recommandation personnalisée. Échange valeur/information, pas de contrainte.
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-6 rounded-full border-2 border-white bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href={LEAD_FORM_HREF}>Trouver mon école</Link>
            </Button>
          </section>

          {/* 6. Visuels — donner de la chaleur humaine */}
          <section
            aria-labelledby="visuels-title"
            className="rounded-2xl bg-white p-6 shadow-card md:p-8"
          >
            <h2
              id="visuels-title"
              className="mb-4 text-center font-display text-xl font-semibold text-slate-900 md:text-2xl"
            >
              L&apos;éducation privée, en images
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-slate-600">
              Un aperçu concret des situations que nous aidons à éclairer&nbsp;: parents en recherche
              d&apos;une école, étudiants en supérieur, vie au sein d&apos;un établissement.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src="/images/parents-orientation.jpg"
                  alt="Parents échangeant avec un conseiller pour choisir une école"
                  className="h-40 w-full object-cover md:h-48"
                />
                <figcaption className="px-4 py-3 text-xs text-slate-700">
                  <span className="font-semibold">Savoir où inscrire son enfant. Enfin.</span>{" "}
                  Plus de décisions prises dans le flou.
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src="/images/etudiants-superieur.jpg"
                  alt="Étudiants en enseignement supérieur en amphi"
                  className="h-40 w-full object-cover md:h-48"
                />
                <figcaption className="px-4 py-3 text-xs text-slate-700">
                  <span className="font-semibold">Choisir sa filière. Pas la subir.</span>{" "}
                  Débouchés, salaires, avis réels — tout est là.
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src="/images/vie-etablissement.jpg"
                  alt="Vue chaleureuse d'un établissement avec élèves"
                  className="h-40 w-full object-cover md:h-48"
                />
                <figcaption className="px-4 py-3 text-xs text-slate-700">
                  <span className="font-semibold">Être vu par les bons profils.</span>{" "}
                  Les étudiants qui vous cherchent vous trouveront.
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
