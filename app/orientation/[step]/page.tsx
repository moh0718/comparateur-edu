"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  TOTAL_STEPS,
  getOrientationStepConfig,
  getNextOrientationStep,
  getPrevOrientationStep,
  buildOrientationWhatsAppMessage,
  type OrientationAnswers,
} from "@/lib/orientation-steps";
import { sortInstitutionsByMatch } from "@/lib/matching";
import { institutionsMock } from "@/data/institutions-mock";
import { InstitutionCard } from "@/components/InstitutionCard";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

const ORIENTATION_SESSION_KEY = "orientation-started";
const ORIENTATION_ANSWERS_KEY = "orientation-answers";
const RESULT_STEP = 6;

function loadAnswers(): OrientationAnswers {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ORIENTATION_ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers: OrientationAnswers) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ORIENTATION_ANSWERS_KEY, JSON.stringify(answers));
}

function useStepFromParams(): number {
  const pathname = usePathname();
  const match = pathname?.match(/\/orientation\/(\d+)/);
  const step = match ? parseInt(match[1], 10) : 1;
  return step >= 1 && step <= RESULT_STEP ? step : 1;
}

function answersToMatch(answers: OrientationAnswers) {
  const critere = answers.critere || answers.q4;
  return {
    wilaya: answers.wilaya || answers.q1,
    category: answers.category || answers.q2,
    budget: answers.budget || answers.q3,
    langue: answers.langue || answers.q5,
    internat: critere === "internat" ? "oui" : undefined,
    transport: critere === "transport" ? "oui" : undefined,
    bacRequis: critere === "bac_non_requis" ? "non" : undefined,
  };
}

export default function OrientationStepPage() {
  const router = useRouter();
  const currentStep = useStepFromParams();
  const [answers, setAnswers] = useState<OrientationAnswers>({});
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const quitModalCancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (currentStep > 1 && currentStep < RESULT_STEP && !sessionStorage.getItem(ORIENTATION_SESSION_KEY)) {
      router.replace("/orientation/1");
    }
  }, [currentStep, router]);

  const config = currentStep <= TOTAL_STEPS ? getOrientationStepConfig(currentStep) : null;
  const isResult = currentStep === RESULT_STEP;

  const answerKeys: Record<number, string> = {
    1: "wilaya",
    2: "category",
    3: "budget",
    4: "critere",
    5: "langue",
  };
  const currentKey = answerKeys[currentStep as keyof typeof answerKeys];
  const currentValue = currentKey ? answers[currentKey] ?? answers[`q${currentStep}`] : undefined;

  const handleAnswer = (value: string) => {
    if (typeof window !== "undefined") sessionStorage.setItem(ORIENTATION_SESSION_KEY, "1");
    const key = currentKey || `q${currentStep}`;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    const next = currentStep === TOTAL_STEPS ? RESULT_STEP : getNextOrientationStep(currentStep) ?? currentStep + 1;
    router.push(`/orientation/${next}`);
  };

  const handlePrev = () => {
    const prev = currentStep === RESULT_STEP ? TOTAL_STEPS : getPrevOrientationStep(currentStep);
    if (prev) router.push(`/orientation/${prev}`);
  };

  const progressPercent = (Math.min(currentStep, TOTAL_STEPS) / TOTAL_STEPS) * 100;

  if (currentStep < 1 || currentStep > RESULT_STEP) {
    router.replace("/orientation/1");
    return null;
  }

  if (!hydrated && currentStep > 1) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4 sm:px-5">
          <Link href={ROUTES.home} className="flex items-center gap-2" aria-label="kompar - edu accueil">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white text-sm">
              🎓
            </div>
            <span className="text-sm font-semibold text-slate-900">kompar - edu</span>
          </Link>
          <button
            type="button"
            onClick={() => setShowQuitModal(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Quitter le formulaire"
          >
            ×
          </button>
        </div>
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={RESULT_STEP}
          />
        </div>
        <p className="py-1.5 text-center text-xs font-medium text-slate-500">
          Étape {Math.min(currentStep, TOTAL_STEPS)} / {TOTAL_STEPS}
        </p>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-5 sm:py-10">
        <div className="mx-auto max-w-xl">
          {isResult ? (
            <OrientationResultStep answers={answers} onPrev={handlePrev} />
          ) : config ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {currentStep === 1 && (
                <p className="mb-4 text-center text-sm font-medium text-green-600">
                  Décision simplifiée en quelques questions — échange de valeur, recommandation personnalisée.
                </p>
              )}
              {config.title && (
                <p className="text-center text-sm font-bold uppercase tracking-wide text-slate-600">{config.title}</p>
              )}
              <h1 className="mt-2 text-center text-lg font-bold text-slate-900 sm:text-xl">{config.question}</h1>
              {config.inputType === "radio" ? (
                <div className="mt-6 space-y-2 sm:mt-8 sm:space-y-3" role="radiogroup" aria-label={config.question}>
                  {config.options.map((opt) => {
                    const isSelected = currentValue === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleAnswer(opt.value)}
                        className={`flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors ${
                          isSelected ? "border-green-200 bg-green-50/70" : "border-transparent bg-slate-50/50 hover:bg-slate-100/50"
                        }`}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        {opt.icon && <span className="text-2xl" aria-hidden>{opt.icon}</span>}
                        <span className="flex-1 text-sm font-medium text-slate-900">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 grid gap-3 sm:mt-8">
                  {config.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleAnswer(opt.value)}
                      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-4 text-left transition-colors hover:border-green-200 hover:bg-green-50/50"
                    >
                      {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                      <span className="font-medium text-slate-900">{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="mt-6 w-full text-sm font-medium text-slate-500 underline hover:text-slate-700"
                >
                  Précédent
                </button>
              )}
            </div>
          ) : null}
        </div>
      </main>

      <Footer variant="bordered" />

      {showQuitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Quitter le formulaire ?</h2>
            <p className="mt-2 text-sm text-slate-600">Vos réponses ne seront pas enregistrées.</p>
            <div className="mt-6 flex gap-3">
              <button
                ref={quitModalCancelRef}
                type="button"
                onClick={() => setShowQuitModal(false)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem(ORIENTATION_SESSION_KEY);
                  sessionStorage.removeItem(ORIENTATION_ANSWERS_KEY);
                  router.push(ROUTES.home);
                }}
                className="flex-1 rounded-xl bg-red-100 py-2.5 text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrientationResultStep({ answers, onPrev }: { answers: OrientationAnswers; onPrev: () => void }) {
  const router = useRouter();
  const matchParams = answersToMatch(answers);
  const recommended = sortInstitutionsByMatch(institutionsMock.filter((i) => i.is_active !== false), matchParams).slice(0, 5);
  const [whatsapp, setWhatsapp] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 8) {
      setError("Numéro invalide (au moins 8 chiffres).");
      return;
    }
    setSending(true);
    try {
      const message = buildOrientationWhatsAppMessage(answers, digits);
      const res = await fetch("/api/whatsapp-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
        router.push(ROUTES.orientationConfirmation);
      } else {
        setError(data.error || "Impossible d'ouvrir WhatsApp.");
      }
    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">Vos recommandations</h1>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-700">
          Voici des établissements qui correspondent à votre profil. Cliquez sur &quot;Voir la fiche&quot; pour plus de détails.
        </p>
        <ul className="mt-4 space-y-4">
          {recommended.map((inst) => (
            <li key={inst.id}>
              <InstitutionCard institution={inst} />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-900">Recevez cette sélection sur WhatsApp</p>
        <form onSubmit={handleSend} className="mt-4 space-y-4">
          <div>
            <label htmlFor="orientation-wa" className="mb-1 block text-sm text-slate-700">Numéro WhatsApp</label>
            <input
              id="orientation-wa"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Ex. 055 12 34 56"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={sending || !waNumber}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-4 text-white hover:bg-green-700 disabled:opacity-50"
          >
            <span className="text-xl">💬</span>
            {sending ? "Envoi…" : "Recevoir sur WhatsApp"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">
          En cliquant sur ce bouton, WhatsApp va s&apos;ouvrir avec un resume de vos reponses. Vous restez libre d&apos;envoyer ou non ce message. Aucune donnee n&apos;est enregistree sur nos serveurs.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button type="button" onClick={onPrev} className="text-sm font-medium text-slate-500 underline hover:text-slate-700">
          Précédent
        </button>
        <Link href={ROUTES.etablissements} className="text-sm font-medium text-green-600 hover:underline">
          Voir tout l&apos;annuaire
        </Link>
      </div>
    </div>
  );
}
