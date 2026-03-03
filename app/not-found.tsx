import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5">
      <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
        Page introuvable
      </h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-green-600 px-5 py-2 text-sm font-semibold text-emerald-50 hover:bg-green-700"
        >
          Accueil
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-green-600 bg-transparent px-5 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
        >
          Blog
        </Link>
      </div>
    </div>
  );
}
