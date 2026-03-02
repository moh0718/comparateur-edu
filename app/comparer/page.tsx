"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareTable } from "@/components/CompareTable";
import { Button } from "@/components/ui/button";
import { institutionsMock } from "@/data/institutions-mock";
import type { Institution } from "@/data/institutions-mock";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

const MAX_SELECT = 3;

export default function ComparerPage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const options = useMemo(() => {
    const list = institutionsMock.filter((i) => i.is_active !== false);
    if (!search.trim()) return list;
    const q = search.trim().toLowerCase();
    return list.filter((i) => i.name.toLowerCase().includes(q) || i.commune?.toLowerCase().includes(q));
  }, [search]);

  const selected = useMemo(
    () => institutionsMock.filter((i) => selectedSlugs.includes(i.slug)),
    [selectedSlugs]
  );

  const add = (slug: string) => {
    if (selectedSlugs.includes(slug) || selectedSlugs.length >= MAX_SELECT) return;
    setSelectedSlugs((prev) => [...prev, slug]);
  };

  const remove = (slug: string) => setSelectedSlugs((prev) => prev.filter((s) => s !== slug));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 pb-16 pt-8 sm:px-6 md:px-8 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
            Comparer les établissements
          </h1>
          <p className="mb-8 text-slate-600">
            Sélectionnez 2 ou 3 établissements pour afficher le tableau comparatif.
          </p>

          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <label htmlFor="comparer-search" className="mb-2 block text-sm font-medium text-slate-700">
              Rechercher un établissement à ajouter
            </label>
            <input
              id="comparer-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom ou commune..."
              className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {options.slice(0, 12).map((inst) => (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => add(inst.slug)}
                  disabled={selectedSlugs.includes(inst.slug) || selectedSlugs.length >= MAX_SELECT}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-green-50 hover:border-green-200 disabled:opacity-50"
                >
                  + {inst.name}
                </button>
              ))}
            </div>
          </div>

          {selected.length > 0 && (
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium text-slate-700">Établissements sélectionnés</p>
              <div className="flex flex-wrap gap-2">
                {selected.map((inst) => (
                  <span
                    key={inst.id}
                    className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800"
                  >
                    {inst.name}
                    <button
                      type="button"
                      onClick={() => remove(inst.slug)}
                      className="rounded-full p-0.5 hover:bg-green-200"
                      aria-label={`Retirer ${inst.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.length >= 2 ? (
            <CompareTable institutions={selected} className="mb-10" />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center text-slate-600">
              Sélectionnez au moins 2 établissements pour afficher le comparatif.
            </div>
          )}

          <div className="flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href={LEAD_FORM_HREF}>Me faire recommander une école selon mon profil</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
