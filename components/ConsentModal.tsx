"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

type ConsentValue = {
  whatsapp: boolean;
  analytics: boolean;
  version: number;
  ts: number;
};

const STORAGE_KEY = "ce_privacy_consent_v1";
const CURRENT_VERSION = 1;

export function ConsentModal() {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    setHydrated(true);
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) {
        setOpen(true);
        return;
      }
      const parsed = JSON.parse(raw) as ConsentValue | null;
      if (!parsed || parsed.version !== CURRENT_VERSION) {
        setOpen(true);
        return;
      }
      setWhatsapp(parsed.whatsapp);
      setAnalytics(parsed.analytics);
      setOpen(false);
    } catch {
      setOpen(true);
    }
  }, []);

  const persist = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore storage failures
    }
  };

  const handleAcceptAll = () => {
    const value: ConsentValue = {
      whatsapp: true,
      analytics: true,
      version: CURRENT_VERSION,
      ts: Date.now(),
    };
    persist(value);
    setWhatsapp(true);
    setAnalytics(true);
    setOpen(false);
  };

  const handleSaveChoice = (accept: boolean) => {
    const value: ConsentValue = {
      whatsapp: accept ? whatsapp : false,
      analytics: accept ? analytics : false,
      version: CURRENT_VERSION,
      ts: Date.now(),
    };
    persist(value);
    setWhatsapp(value.whatsapp);
    setAnalytics(value.analytics);
    setOpen(false);
  };

  if (!hydrated || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      {/* Le scroll de la page reste possible, mais tous les clics sont capturés par cet overlay. */}
      <div className="pointer-events-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-4 flex items-start gap-3">
          <div className="mt-1 h-9 w-9 shrink-0 rounded-2xl bg-emerald-100 text-center text-xl leading-9 text-emerald-600">
            ☑️
          </div>
          <div>
            <h2 id="consent-title" className="text-base font-semibold text-slate-900 sm:text-lg">
              Vos préférences de confidentialité
            </h2>
            <p id="consent-description" className="mt-2 text-sm text-slate-600 leading-relaxed">
              Nous utilisons <span className="font-medium text-slate-800">WhatsApp</span> pour vous recontacter si vous
              le demandez, et des outils statistiques (comme Vercel Analytics ou équivalents) pour comprendre comment
              le site est utilisé. Ces mesures sont <span className="font-medium">anonymisées</span> et ne contiennent
              pas vos données personnelles. Aucun cookie publicitaire tiers n&apos;est utilisé.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              checked={whatsapp}
              onChange={(e) => setWhatsapp(e.target.checked)}
            />
            <div className="text-sm text-slate-700">
              <div className="font-medium text-slate-900">Contact par WhatsApp</div>
              <p className="mt-0.5 text-xs text-slate-600">
                Autoriser Comparateur Edu à vous recontacter sur WhatsApp au sujet de votre projet d&apos;orientation ou
                de comparaison d&apos;établissements. Vous pourrez toujours nous demander d&apos;arrêter.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <div className="text-sm text-slate-700">
              <div className="font-medium text-slate-900">Mesure d&apos;audience anonyme</div>
              <p className="mt-0.5 text-xs text-slate-600">
                Nous utilisons des statistiques agrégées pour améliorer le site (pages vues, clics). Aucune donnée
                personnelle ni traceur publicitaire n&apos;est exploité.
              </p>
            </div>
          </label>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Vous pouvez en savoir plus dans nos{" "}
          <Link
            href={ROUTES.conditionsGenerales}
            className="font-medium text-emerald-700 underline-offset-2 hover:underline"
          >
            conditions générales et politique de confidentialité
          </Link>
          .
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={() => handleSaveChoice(false)}
            className="w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
          >
            Continuer sans accepter
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}

