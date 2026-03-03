import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";
import { metiersMock } from "@/data/metiers-mock";
import { getAllMetiers } from "@/data/metiers-data";
import { DISCLAIMER_SALAIRES_METIERS } from "@/data/metiers-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllMetiers().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const metier = metiersMock.find((m) => m.slug === slug);
  if (!metier) return { title: "Métier introuvable" };
  const title = `${metier.titre} — Fiche métier`;
  const url = `${getBaseUrl()}/fiches-metiers/${slug}`;
  return {
    title,
    description: metier.description ?? `Fiche métier : ${metier.titre}. Missions, diplômes, salaires, perspectives.`,
    openGraph: { title: `${title} | ${SITE_NAME}`, url },
    alternates: { canonical: url },
  };
}

export default async function FicheMetierPage({ params }: PageProps) {
  const { slug } = await params;
  const m = metiersMock.find((metier) => metier.slug === slug);
  if (!m) notFound();

  const baseUrl = getBaseUrl();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Fiches métiers", item: `${baseUrl}/fiches-metiers` },
      { "@type": "ListItem", position: 3, name: m.titre, item: `${baseUrl}/fiches-metiers/${slug}` },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <main className="flex-1 px-5 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 text-sm text-slate-600">
            <Link href={ROUTES.fichesMetiers} className="hover:text-brand">
              ← Fiches métiers
            </Link>
          </nav>

          <header className="mb-8">
            {m.domaine && (
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                {m.domaine}
              </span>
            )}
            <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">{m.titre}</h1>
          </header>

          <div className="space-y-8">
            {m.description && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Description</h2>
                <p className="text-slate-700 leading-relaxed">{m.description}</p>
              </section>
            )}

            {m.missions && m.missions.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Missions</h2>
                <ul className="list-inside list-disc space-y-1 text-slate-700">
                  {m.missions.map((mission) => (
                    <li key={mission}>{mission}</li>
                  ))}
                </ul>
              </section>
            )}

            {m.challenges && m.challenges.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Défis / Challenges</h2>
                <ul className="list-inside list-disc space-y-1 text-slate-700">
                  {m.challenges.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            )}

            {m.diplomes_requis && m.diplomes_requis.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Diplômes requis</h2>
                <ul className="list-inside list-disc space-y-1 text-slate-700">
                  {m.diplomes_requis.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {m.salaires && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Salaires (estimations)</h2>
                <p className="text-slate-700">{m.salaires}</p>
                <p className="mt-3 text-xs text-slate-500 italic">
                  {DISCLAIMER_SALAIRES_METIERS}
                </p>
              </section>
            )}

            {m.perspectives_evolution && m.perspectives_evolution.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Perspectives d&apos;évolution</h2>
                <ul className="list-inside list-disc space-y-1 text-slate-700">
                  {m.perspectives_evolution.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
            )}

            {m.competences_qualites && m.competences_qualites.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Compétences et qualités requises</h2>
                <ul className="list-inside list-disc space-y-1 text-slate-700">
                  {m.competences_qualites.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={ROUTES.fichesMetiers}
              className="rounded-full border-2 border-brand bg-transparent px-5 py-2.5 text-sm font-medium text-brand hover:bg-brand/5"
            >
              Toutes les fiches métiers
            </Link>
            <Link
              href={LEAD_FORM_HREF}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-emerald-50 hover:bg-brand-dark"
            >
              Trouver mon École
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
