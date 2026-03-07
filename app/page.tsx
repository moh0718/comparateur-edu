import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ScrollReveal";
import { SITE_NAME, SITE_DESCRIPTION_META, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Orientation écoles Algérie — Comparateur établissements",
  description: SITE_DESCRIPTION_META,
  keywords: ["comparateur gratuit", "décision simplifiée", "écoles Alger", "orientation Algérie", "Alger", "Blida", "Tipaza", "Boumerdès"],
  openGraph: {
    title: "Orientation écoles Algérie — Comparateur établissements",
    description: SITE_DESCRIPTION_META,
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

export default async function HomePage() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value as Lang | undefined;
  const lang: Lang = langCookie === "ar" ? "ar" : "fr";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 pb-16 pt-8 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl space-y-10 md:space-y-14">
          {/* 1. Hero — texte puis carte en 3D */}
          <section aria-labelledby="hero-title" className="grid items-center gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <ScrollReveal variant="fade-up-strong">
              <div className="text-center md:text-left">
                <p className="mx-auto mb-2 max-w-xl text-sm font-semibold uppercase tracking-wide text-emerald-600 md:mx-0">
                  {t(lang, "home.hero.badge")}
                </p>
                <h1
                  id="hero-title"
                  className="mx-auto max-w-3xl text-balance font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl md:text-5xl md:mx-0"
                >
                  {t(lang, "home.hero.title")}
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-700 sm:text-lg md:mx-0">
                  {t(lang, "home.hero.subtitle")}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                  <Button asChild variant="primary" size="lg" className="rounded-full px-8 shadow-md">
                    <Link href={LEAD_FORM_HREF}>{t(lang, "home.hero.primaryCta")}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="rounded-full border-2 border-emerald-600 px-8 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900"
                  >
                    <Link href={ROUTES.etablissements}>{t(lang, "home.hero.secondaryCta")}</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="card-3d" delay={180}>
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
            </ScrollReveal>
          </section>

          {/* 2. Barre de recherche rapide */}
          <ScrollReveal variant="fade-up-strong" delay={100}>
            <section aria-label={t(lang, "home.search.aria")} className="rounded-2xl bg-white p-4 shadow-card md:p-5">
            <form action={ROUTES.etablissements} method="get" className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                name="q"
                placeholder={t(lang, "home.search.placeholder")}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                aria-label="Recherche par nom"
              />
              <select
                name="categorie"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
                aria-label={t(lang, "home.search.category")}
              >
                <option value="">{t(lang, "home.search.category")}</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <select
                name="wilaya"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none"
                aria-label={t(lang, "home.search.wilaya")}
              >
                <option value="">{t(lang, "home.search.wilaya")}</option>
                <option value="Alger">Alger</option>
                <option value="Blida">Blida</option>
                <option value="Tipaza">Tipaza</option>
                <option value="Boumerdès">Boumerdès</option>
              </select>
              <Button type="submit" variant="primary" className="rounded-xl">
                {t(lang, "home.search.submit")}
              </Button>
            </form>
            </section>
          </ScrollReveal>

          {/* 3. Catégories chips */}
          <ScrollReveal variant="scale" delay={60}>
            <section aria-labelledby="categories-title">
            <h2 id="categories-title" className="sr-only">
              {t(lang, "home.categories.title")}
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
          </ScrollReveal>

          {/* 4. Pourquoi nous — titre + cartes en cascade */}
          <ScrollReveal variant="slide-up-3d">
            <section
              id="pourquoi"
              aria-labelledby="pourquoi-title"
              className="rounded-2xl bg-white p-6 shadow-card md:p-8"
            >
              <h2 id="pourquoi-title" className="mb-6 text-center font-display text-xl font-semibold text-slate-900 md:text-2xl">
                {t(lang, "home.why.title")}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-center text-slate-700">
                {t(lang, "home.why.lead")}
              </p>
              <ScrollRevealStagger className="grid gap-8 md:grid-cols-3" staggerMs={140}>
                <article className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                    ✓
                  </div>
                  <h3 className="font-semibold text-slate-900">Agrégateur d&apos;informations</h3>
                  <p className="mt-1 text-sm text-slate-700">
                    {t(lang, "home.why.card1.text")}
                  </p>
                </article>
                <article className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                    ⚖️
                  </div>
                  <h3 className="font-semibold text-slate-900">Comparatif transparent</h3>
                  <p className="mt-1 text-sm text-slate-700">
                    {t(lang, "home.why.card2.text")}
                  </p>
                </article>
                <article className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                    💬
                  </div>
                  <h3 className="font-semibold text-slate-900">Décision simplifiée</h3>
                  <p className="mt-1 text-sm text-slate-700">
                    {t(lang, "home.why.card3.text")}
                  </p>
                </article>
              </ScrollRevealStagger>
            </section>
          </ScrollReveal>

          {/* 5. CTA — formulaire = passage obligé pour la décision simplifiée */}
          <ScrollReveal variant="card-3d" delay={80}>
            <section
            aria-labelledby="cta-title"
            className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-10 text-center text-emerald-50 shadow-card md:px-10 md:py-12"
          >
            <h2 id="cta-title" className="font-display text-xl font-semibold md:text-2xl">
              {t(lang, "home.cta.title")}
            </h2>
            <p className="mt-2 text-emerald-50">
              {t(lang, "home.cta.text")}
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="mt-6 rounded-full border-2 border-white bg-white/5 px-8 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href={LEAD_FORM_HREF}>{t(lang, "home.cta.button")}</Link>
            </Button>
            </section>
          </ScrollReveal>

          {/* 6. Visuels — titre + images en cascade */}
          <section
            aria-labelledby="visuels-title"
            className="rounded-2xl bg-white p-6 shadow-card md:p-8"
          >
            <ScrollReveal variant="fade-up-strong">
              <h2
                id="visuels-title"
                className="mb-4 text-center font-display text-xl font-semibold text-slate-900 md:text-2xl"
              >
                {t(lang, "home.visuals.title")}
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-slate-600">
                {t(lang, "home.visuals.text")}
              </p>
            </ScrollReveal>
            <ScrollRevealStagger className="grid gap-4 md:grid-cols-3" staggerMs={120}>
              <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src="/images/parents-orientation.jpg"
                  alt="Parents échangeant avec un conseiller pour choisir une école"
                  className="h-40 w-full object-cover md:h-48"
                />
                <figcaption className="px-4 py-3 text-xs text-slate-700">{t(lang, "home.visuals.card1")}</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src="/images/etudiants-superieur.jpg"
                  alt="Étudiants en enseignement supérieur en amphi"
                  className="h-40 w-full object-cover md:h-48"
                />
                <figcaption className="px-4 py-3 text-xs text-slate-700">{t(lang, "home.visuals.card2")}</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                <img
                  src="/images/vie-etablissement.jpg"
                  alt="Vue chaleureuse d'un établissement avec élèves"
                  className="h-40 w-full object-cover md:h-48"
                />
                <figcaption className="px-4 py-3 text-xs text-slate-700">{t(lang, "home.visuals.card3")}</figcaption>
              </figure>
            </ScrollRevealStagger>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
