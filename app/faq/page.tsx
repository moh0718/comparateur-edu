"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";
import { FAQ_ITEMS } from "./faq-items";

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <section
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-labelledby={`faq-q-${item.id}`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2
            id={`faq-q-${item.id}`}
            className="flex items-center gap-2 text-base font-bold text-slate-900 sm:text-lg"
          >
            {item.question}
            <span className="shrink-0 text-lg" aria-hidden>{item.emoji}</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {item.preview}
          </p>
          {isOpen && (
            <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-700">
              {item.full}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="mt-2 shrink-0 self-start text-xs font-medium text-slate-700 underline hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 sm:mt-0"
          aria-expanded={isOpen}
          aria-controls={`faq-a-${item.id}`}
          id={`faq-toggle-${item.id}`}
        >
          {isOpen ? "Voir moins" : "Voir plus"}
        </button>
      </div>
      <div id={`faq-a-${item.id}`} role="region" aria-labelledby={`faq-toggle-${item.id}`} className="sr-only">
        {isOpen ? item.full : null}
      </div>
    </section>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-5 py-8 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            FAQ — Comparateur d&apos;établissements en Algérie
          </h1>
          <p className="mt-3 text-center text-sm text-slate-600 sm:text-base">
            Tout ce que vous devez savoir sur kompar - edu, l&apos;annuaire et le formulaire d&apos;orientation.
          </p>

          <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5" role="list">
            {FAQ_ITEMS.map((item) => (
              <div key={item.id} role="listitem">
                <FaqItem
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:mt-12">
            <Button asChild variant="primary" size="lg" className="w-full rounded-full sm:w-auto">
              <Link href={LEAD_FORM_HREF}>
                Lancer le formulaire d&apos;orientation
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
