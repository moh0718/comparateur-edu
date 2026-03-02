import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { AdSlotSkyscraper } from "@/components/AdSlot";
import { Button } from "@/components/ui/button";
import {
  posts,
  type Post,
  type ContentSection
} from "@/data/posts-mock";
import { SITE_NAME, getBaseUrl } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post)
    return { title: "Article introuvable", robots: { index: false, follow: true } };
  const url = `${getBaseUrl()}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      siteName: SITE_NAME,
      images: post.imageUrl ? [{ url: post.imageUrl.startsWith("http") ? post.imageUrl : `${getBaseUrl()}${post.imageUrl.startsWith("/") ? "" : "/"}${post.imageUrl}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: { canonical: url },
  };
}

function getRelatedPosts(current: Post, limit: number): Post[] {
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    const related: Post[] = [];
    for (const slug of current.relatedSlugs) {
      const p = posts.find((x) => x.slug === slug);
      if (p && p.slug !== current.slug) related.push(p);
      if (related.length >= limit) break;
    }
    return related;
  }
  const others = posts.filter((p) => p.slug !== current.slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Rend un paragraphe en transformant [texte](url) en liens. */
function renderParagraphWithLinks(text: string, keyPrefix: string) {
  const parts: (string | React.ReactElement)[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let k = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const href = match[2];
    const label = match[1];
    parts.push(
      href.startsWith("/") ? (
        <Link key={`${keyPrefix}-${k++}`} href={href} className="font-medium text-brand hover:underline">
          {label}
        </Link>
      ) : (
        <a key={`${keyPrefix}-${k++}`} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand hover:underline">
          {label}
        </a>
      )
    );
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

function isTableBlock(lines: string[]): boolean {
  if (lines.length < 2) return false;
  const withPipe = lines.filter((l) => l.includes("|"));
  return withPipe.length >= 2;
}

function parseTable(block: string): { headers: string[]; rows: string[][] } {
  const lines = block.trim().split("\n").filter((l) => l.trim());
  const rows: string[][] = [];
  for (const line of lines) {
    if (/^[\s|\-]+$/.test(line)) continue; // séparateur markdown
    const cells = line.split("|").map((c) => c.trim()).filter((c) => c !== "");
    if (cells.length) rows.push(cells);
  }
  const headers = rows[0] ?? [];
  const dataRows = rows.slice(1);
  return { headers, rows: dataRows };
}

function renderSectionContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    const lines = trimmed.split("\n");
    const hasList = lines.some(
      (l) =>
        /^[•\-]\s/.test(l) ||
        /^✅\s/.test(l) ||
        /^❌\s/.test(l) ||
        /^⚠️\s/.test(l) ||
        /^\d+\.\s/.test(l)
    );
    if (hasList) {
      return (
        <ul key={i} className="mb-4 list-none space-y-1 pl-0 text-sm text-slate-700">
          {lines.map((line, j) => {
            const bullet = /^([•\-]|✅|❌|⚠️|\d+\.)\s/.exec(line);
            const text = bullet ? line.slice(bullet[0].length) : line;
            if (!text) return null;
            return (
              <li key={j} className="flex items-start gap-2">
                {bullet && (
                  <span className="mt-0.5 shrink-0 text-base" aria-hidden>
                    {bullet[1]}
                  </span>
                )}
                <span>{renderParagraphWithLinks(text, `li-${i}-${j}`)}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    if (isTableBlock(lines)) {
      const { headers, rows } = parseTable(trimmed);
      return (
        <div key={i} className="mb-6 overflow-x-auto">
          <table className="w-full min-w-[280px] border-collapse text-sm text-slate-700">
            <thead>
              <tr>
                {headers.map((h, j) => (
                  <th key={j} className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-slate-200 px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <p key={i} className="mb-4 text-sm leading-relaxed text-slate-700">
        {renderParagraphWithLinks(trimmed, `p-${i}`)}
      </p>
    );
  });
}

function ArticleContent({ post }: { post: Post }) {
  const fullContent =
    post.contentSections && post.contentSections.length > 0
      ? post.contentSections.map((s) => s.content).join("\n\n")
      : post.content;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <div className="prose prose-sm max-w-none text-slate-800 prose-p:mb-4">
        {renderSectionContent(fullContent)}
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <main className="flex flex-1 items-center justify-center px-5 py-20">
          <p className="text-sm text-slate-600">
            Article introuvable. Retournez à la{" "}
            <Link href="/blog" className="text-green-700 underline">
              liste des articles
            </Link>
            .
          </p>
        </main>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const baseUrl = getBaseUrl();
  const shareUrl = `${baseUrl.replace(/\/$/, "")}/blog/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareText = encodeURIComponent(post.excerpt);

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
    image: post.imageUrl?.startsWith("http") ? post.imageUrl : `${baseUrl}${post.imageUrl?.startsWith("/") ? "" : "/"}${post.imageUrl}`,
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <Header />

      <main className="flex-1 pb-16 pt-0 md:pb-24 md:pt-0">
        <div className="mx-auto flex max-w-[1920px] justify-center gap-0 px-5 sm:px-6 md:px-8">
          <AdSlotSkyscraper />
          <div className="min-w-0 flex-1 max-w-6xl">
        {/* Hero article */}
        <section className="relative w-full">
          <div className="relative h-[280px] w-full sm:h-[320px] md:h-[380px]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 72rem"
            />
            <div className="absolute inset-0 bg-slate-900/50" />
            <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 sm:px-6 md:max-w-6xl md:px-8 md:mx-auto">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200">
                <time dateTime={post.date}>{formattedDate}</time>
                {post.source === "auto" && (
                  <span className="ml-2 rounded-full bg-slate-600/80 px-2 py-0.5 text-[10px] text-slate-200">
                    Article automatique
                  </span>
                )}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-5 pt-5 sm:px-6 sm:pt-6 md:px-8">
            <h1 className="text-xl font-extrabold leading-snug text-slate-900 sm:text-2xl md:text-3xl">
              {post.title}
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Contenu principal */}
        <div className="mx-auto mt-8 max-w-6xl px-5 sm:px-6 md:px-8">
          <ArticleContent post={post} />

          {/* Partage social — liens fonctionnels */}
          <section
            aria-label="Partager l'article"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <span className="text-xs font-semibold text-slate-500">
              Partager :
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2] text-white transition-opacity hover:opacity-90"
              aria-label="Partager sur Facebook"
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white transition-opacity hover:opacity-90"
              aria-label="Partager sur X (Twitter)"
            >
              <span className="text-sm font-bold">𝕏</span>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2] text-white transition-opacity hover:opacity-90"
              aria-label="Partager sur LinkedIn"
            >
              <span className="text-sm font-bold">in</span>
            </a>
            <a
              href={`mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${encodeURIComponent(shareUrl)}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-600 text-white transition-opacity hover:opacity-90"
              aria-label="Partager par email"
            >
              <span className="text-sm">✉</span>
            </a>
          </section>

          {/* Retour au blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-green-600 bg-transparent px-5 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
            >
              ← Retour au blog
            </Link>
          </div>

          {/* Articles similaires */}
          {relatedPosts.length > 0 && (
            <section
              aria-labelledby="articles-similaires"
              className="mt-12 space-y-4"
            >
              <h2
                id="articles-similaires"
                className="text-lg font-semibold text-slate-900 md:text-xl"
              >
                Articles similaires
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA comparateur */}
          <section
            aria-label="Appel à l'action"
            className="mt-12 rounded-2xl bg-brand/10 px-5 py-8 text-center sm:px-8"
          >
            <p className="text-sm text-slate-700 sm:text-base">
              Utilisez notre comparateur gratuit pour filtrer les établissements par tarif, commune et services — et prenez votre décision en toute sérénité.
            </p>
            <div className="mt-4">
              <Button asChild variant="primary" size="lg">
                <Link href={LEAD_FORM_HREF}>Trouver mon école</Link>
              </Button>
            </div>
          </section>
        </div>
          </div>
          <AdSlotSkyscraper />
        </div>
      </main>

      <Footer />
    </div>
  );
}
