"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { AdSlotSkyscraper } from "@/components/AdSlot";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts-mock";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

const POSTS_PER_PAGE = 7;

export default function BlogPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const currentSlice = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const heroPost = currentSlice[0];
  const secondaryPosts = currentSlice.slice(1);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 pb-16 pt-8 md:pb-24 md:pt-12">
        <div className="mx-auto flex max-w-[1920px] justify-center gap-0 px-5 sm:px-6 md:px-8">
          <AdSlotSkyscraper />
          <div className="min-w-0 flex-1 max-w-6xl space-y-8 md:space-y-10">
          {/* Hero article */}
          {heroPost && (
            <article className="overflow-hidden rounded-3xl bg-white shadow-soft">
              <div className="relative w-full pt-[35%] sm:pt-[32%] md:pt-[30%]">
                <Image
                  src={heroPost.imageUrl}
                  alt={heroPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 72rem"
                />
              </div>
              <div className="space-y-3 px-5 py-5 text-center sm:px-8 sm:py-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {heroPost.category} •{" "}
                  <time dateTime={heroPost.date}>
                    {new Date(heroPost.date).toLocaleDateString("fr-FR")}
                  </time>
                </p>
                <h1 className="text-lg font-semibold text-slate-900 sm:text-xl md:text-2xl">
                  {heroPost.title}
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
                  {heroPost.excerpt}
                </p>
                <div className="mt-2 flex justify-center">
                  <Button asChild variant="secondary" size="lg">
                    <Link href={`/blog/${heroPost.slug}`}>
                      Lire l&apos;article &rarr;
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          )}

          {/* Grille d'articles secondaires */}
          <section
            aria-label="Articles de blog"
            className="grid gap-5 md:grid-cols-3"
          >
            {secondaryPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft"
              >
                <Link href={`/blog/${post.slug}`} className="relative block w-full pt-[56.25%]">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
                  <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                    {post.category}
                  </span>
                  <h2 className="mt-2 text-sm font-semibold text-slate-900 sm:text-base">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600 sm:text-sm">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-[11px] text-slate-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("fr-FR")}
                    </time>
                  </p>
                  <div className="mt-auto pt-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-800 sm:text-sm"
                    >
                      Lire &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Pagination numérotée */}
          <nav
            aria-label="Pagination des articles du blog"
            className="flex items-center justify-center gap-2 pt-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label="Page précédente"
            >
              Précédent
            </Button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === page;
              return (
                <Button
                  key={pageNumber}
                  type="button"
                  variant={isActive ? "primary" : "ghost"}
                  size="sm"
                  className="h-9 w-9 rounded-full p-0 text-xs"
                  onClick={() => goToPage(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNumber}
                </Button>
              );
            })}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label="Page suivante"
            >
              Suivant
            </Button>
          </nav>

          {/* CTA formulaire orientation */}
          <section
            aria-label="Trouver mon école"
            className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-6 py-7 text-center sm:px-8"
          >
            <h2 className="text-base font-semibold text-emerald-900 sm:text-lg">
              Passer de la théorie à l&apos;action : trouvez votre école idéale
            </h2>
            <p className="mt-2 text-sm text-emerald-900/80 sm:text-base">
              Après la lecture des articles, répondez à quelques questions et{" "}
              <span className="font-semibold">recevez une recommandation personnalisée</span> d&apos;établissements privés en
              Algérie.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button asChild variant="primary" size="lg" className="rounded-full px-8">
                <Link href={LEAD_FORM_HREF}>Lancer le formulaire</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-full px-8">
                <Link href={ROUTES.etablissements}>Voir l&apos;annuaire</Link>
              </Button>
            </div>
          </section>
          </div>
          <AdSlotSkyscraper />
        </div>
      </main>

      <Footer />
    </div>
  );
}

