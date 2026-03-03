import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { ROUTES } from "@/lib/navigation";
import { searchMetiers } from "@/data/metiers-data";

const PER_PAGE = 12;

type PageProps = {
  searchParams: Promise<{ q?: string; secteur?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const title = q?.trim()
    ? `Résultats pour « ${q.trim()} » — Fiches métiers`
    : "Recherche — Fiches métiers";
  const url = `${getBaseUrl()}/fiches-metiers/recherche${q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`;
  return {
    title: `${title} | ${SITE_NAME}`,
    description: q?.trim()
      ? `Métiers correspondant à votre recherche : ${q.trim()}. Orientation et débouchés en Algérie.`
      : "Recherchez un métier par mot-clé. Fiches métiers pour l'orientation en Algérie.",
    openGraph: { title: `${title} | ${SITE_NAME}`, url },
    alternates: { canonical: url },
    robots: q?.trim() ? undefined : { index: false },
  };
}

export default async function FichesMetiersRecherchePage({ searchParams }: PageProps) {
  const { q = "", secteur, page: pageParam } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim();
  const page = Math.max(1, parseInt(typeof pageParam === "string" ? pageParam : "1", 10) || 1);
  const sect = typeof secteur === "string" ? secteur : undefined;

  const all = searchMetiers(query, sect);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const results = all.slice(start, start + PER_PAGE);

  const baseSearch = new URLSearchParams();
  if (query) baseSearch.set("q", query);
  if (sect) baseSearch.set("secteur", sect);
  const searchQuery = baseSearch.toString();
  const href = (p: number) =>
    p <= 1
      ? `/fiches-metiers/recherche${searchQuery ? `?${searchQuery}` : ""}`
      : `/fiches-metiers/recherche?${searchQuery}${searchQuery ? "&" : ""}page=${p}`;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 text-sm text-slate-600">
            <Link href={ROUTES.fichesMetiers} className="hover:text-brand">
              ← Fiches métiers
            </Link>
          </nav>

          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {query ? `Résultats pour « ${query} »` : "Recherche"}
          </h1>
          {query && (
            <p className="mt-2 text-slate-600">
              {total} métier{total !== 1 ? "s" : ""} trouvé{total !== 1 ? "s" : ""}.
            </p>
          )}

          {results.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-600">
                Aucun métier ne correspond à votre recherche.
              </p>
              <Link
                href={ROUTES.fichesMetiers}
                className="mt-4 inline-block font-medium text-brand hover:underline"
              >
                Voir toutes les fiches métiers
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-8 space-y-4">
                {results.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/fiches-metiers/${m.slug}`}
                      className="block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:border-slate-300 hover:shadow-card-hover"
                    >
                      <span className="text-xs font-medium text-brand">{m.domaine}</span>
                      <h2 className="mt-1 font-semibold text-slate-900">{m.titre}</h2>
                      {m.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{m.description}</p>
                      )}
                      <span className="mt-3 inline-block text-sm font-medium text-brand">
                        Voir la fiche →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav
                  className="mt-10 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Pagination"
                >
                  <Link
                    href={href(currentPage - 1)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      currentPage <= 1
                        ? "pointer-events-none border-slate-200 text-slate-400"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Précédent
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={href(p)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                        p === currentPage
                          ? "border-brand bg-brand text-emerald-50"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  <Link
                    href={href(currentPage + 1)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                      currentPage >= totalPages
                        ? "pointer-events-none border-slate-200 text-slate-400"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Suivant
                  </Link>
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
