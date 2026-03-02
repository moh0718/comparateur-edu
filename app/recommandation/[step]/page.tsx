"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  getStepConfig,
  getNextStep,
  getPrevStep,
  isResultStep,
  isCompareOnlyFlow,
  TOTAL_STEPS,
  buildWhatsAppMessage,
  type FormAnswers,
} from "@/lib/form-steps";
import { Footer } from "@/components/Footer";
import { WILAYAS } from "@/lib/wilayas";
import { computeScore } from "@/lib/scoring";

/** Icône WhatsApp (logo officiel style). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const SESSION_KEY = "recommandation-started";
const ANSWERS_KEY = "recommandation-answers";

function loadAnswers(): FormAnswers {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers: FormAnswers) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

function useStepFromParams(): number {
  const pathname = usePathname();
  const match = pathname?.match(/\/recommandation\/(\d+)/);
  const step = match ? parseInt(match[1], 10) : 1;
  return step >= 1 && step <= TOTAL_STEPS ? step : 1;
}

export default function RecommandationStepPage() {
  const router = useRouter();
  const currentStep = useStepFromParams();
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const quitModalCancelRef = useRef<HTMLButtonElement>(null);
  const quitTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (currentStep > 1 && !sessionStorage.getItem(SESSION_KEY)) {
      router.replace("/recommandation/1");
    }
  }, [currentStep, router]);

  useEffect(() => {
    if (!showQuitModal) return;
    quitModalCancelRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowQuitModal(false);
        requestAnimationFrame(() => quitTriggerRef.current?.focus());
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      requestAnimationFrame(() => quitTriggerRef.current?.focus());
    };
  }, [showQuitModal]);

  const config = getStepConfig(currentStep);
  const isResult = isResultStep(currentStep);
  const compareOnly = isCompareOnlyFlow(answers);

  const handleQuit = () => {
    setShowQuitModal(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(ANSWERS_KEY);
    }
    router.push("/");
  };

  const handleAnswer = (value: string) => {
    if (typeof window !== "undefined") sessionStorage.setItem(SESSION_KEY, "1");
    const key = `q${currentStep}`;
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    const next = getNextStep(currentStep, newAnswers);
    router.push(`/recommandation/${next}`);
  };

  const handlePrev = () => {
    const prev = getPrevStep(currentStep, answers);
    router.push(`/recommandation/${prev}`);
  };

  const progressPercent = (currentStep / TOTAL_STEPS) * 100;

  if (currentStep < 1 || currentStep > TOTAL_STEPS) {
    if (typeof window !== "undefined") router.replace("/recommandation/1");
    return null;
  }

  if (!hydrated && currentStep > 1) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f8f8]">
        <p className="text-slate-500">Chargement…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4 sm:px-5">
          <Link href="/" className="flex items-center gap-2" aria-label="Kompar - Banque accueil">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-white">
              <span className="text-sm" aria-hidden>🏛️</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">Kompar - Banque</span>
          </Link>
          <button
            ref={quitTriggerRef}
            type="button"
            onClick={() => setShowQuitModal(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 outline-none hover:bg-slate-100 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            aria-label="Quitter le formulaire"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
        <div className="h-1 w-full bg-slate-100">
          <div
            className="h-full bg-green-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-label={`Étape ${currentStep} sur ${TOTAL_STEPS}`}
          />
        </div>
        <p className="px-4 py-1.5 text-center text-xs font-medium text-slate-500 sm:px-5">
          Étape {currentStep} / {TOTAL_STEPS}
        </p>
      </header>

      <main className="flex-1 px-4 py-8 sm:px-5 sm:py-10">
        <div className="mx-auto max-w-xl">
          {isResult ? (
            <ResultStep answers={answers} compareOnly={compareOnly} onPrev={handlePrev} />
          ) : config ? (
            <div className="transition-opacity duration-200" key={currentStep}>
              <div
                className={`rounded-xl border border-slate-200 bg-white shadow-sm ${
                  config.spacious ? "p-6 sm:p-8 sm:px-10" : "p-5 sm:p-6 sm:px-8"
                }`}
              >
                {config.title && (
                  <p className="text-center text-sm font-bold uppercase tracking-wide text-slate-600">
                    {config.title}
                  </p>
                )}
                {config.intro && (
                  <p className="text-center text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                    {config.intro}
                  </p>
                )}
                <h1
                  className={`text-center font-bold text-slate-900 ${config.intro ? "mt-3 text-base text-slate-700 sm:mt-4 sm:text-lg" : config.title ? "mt-2 text-lg sm:text-xl" : "text-lg sm:text-xl"}`}
                >
                  {config.question}
                </h1>
                {config.inputType === "radio" ? (
                  <div
                    className={
                      config.spacious ? "mt-8 space-y-4 sm:mt-10 sm:space-y-5" : "mt-6 space-y-2 sm:mt-8 sm:space-y-3"
                    }
                    role="radiogroup"
                    aria-label={config.question}
                  >
                    {config.options.map((opt) => {
                      const isSelected = answers[`q${currentStep}`] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswer(opt.value)}
                          className={`flex w-full items-start gap-4 rounded-xl border text-left transition-colors outline-none hover:border-slate-200 hover:bg-slate-50/50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${
                            config.spacious ? "px-5 py-5 sm:px-6 sm:py-5" : "px-4 py-4"
                          } ${
                            isSelected ? "border-green-200 bg-green-50/70" : "border-transparent bg-slate-50/30"
                          }`}
                          role="radio"
                          aria-checked={isSelected}
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              isSelected
                                ? "border-green-600 bg-green-600"
                                : "border-slate-300 bg-white"
                            }`}
                            aria-hidden
                          >
                            {isSelected && (
                              <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-slate-900">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : config.inputType === "select" ? (
                  <div className="mt-6 space-y-4 sm:mt-8">
                    <div className="relative">
                      <select
                        value={answers[`q${currentStep}`] ?? ""}
                        onChange={(e) => {
                          const key = `q${currentStep}`;
                          const v = e.target.value;
                          const next = { ...answers, [key]: v };
                          setAnswers(next);
                          saveAnswers(next);
                        }}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3.5 pr-10 text-sm text-slate-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 [&>option]:bg-white"
                        aria-label={config.question}
                      >
                      <option value="" disabled>
                        {config.selectPlaceholder ?? "Choisir une option"}
                      </option>
                      {config.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                      </select>
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        aria-hidden
                      >
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const v = answers[`q${currentStep}`];
                        if (v) handleAnswer(v);
                      }}
                      disabled={!answers[`q${currentStep}`]}
                      className="w-full rounded-xl bg-green-600 px-4 py-4 text-center text-sm font-medium text-white shadow-sm transition-colors outline-none hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 active:bg-green-800"
                    >
                      Continuer
                    </button>
                  </div>
                ) : config.options.some((o) => o.icon || o.description || o.image) ? (
                  <div
                    className={`mt-6 grid gap-3 sm:mt-8 sm:gap-4 ${config.options.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                  >
                    {config.options.map((opt) => {
                      const labelVariantClass =
                        opt.variant === "primary"
                          ? "bg-green-600 text-white"
                          : opt.variant === "secondary"
                            ? "bg-slate-800 text-white"
                            : "";
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswer(opt.value)}
                          className="flex w-full flex-col items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors outline-none hover:border-green-300 hover:bg-green-50/30 active:bg-green-50/50 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        >
                          {opt.image ? (
                            <div className="mt-5 flex justify-center p-2">
                              <div className="h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
                                <img
                                  src={opt.image}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                          ) : opt.icon ? (
                            <span
                              className="mb-3 mt-5 text-4xl text-green-600"
                              aria-hidden
                            >
                              {opt.icon}
                            </span>
                          ) : null}
                          <div className="w-full p-4 text-center">
                            {labelVariantClass ? (
                              <span
                                className={`inline-block rounded-lg px-4 py-2.5 text-sm font-semibold ${labelVariantClass}`}
                              >
                                {opt.label}
                              </span>
                            ) : (
                              <span className="text-sm font-bold text-slate-900">{opt.label}</span>
                            )}
                            {opt.description && (
                              <span className="mt-1 block text-xs text-slate-600">{opt.description}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={`mt-6 grid gap-3 sm:mt-8 sm:gap-4 ${config.options.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                  >
                    {config.options.map((opt) => {
                      const base =
                        "w-full rounded-xl px-4 py-4 text-center text-sm font-medium shadow-sm transition-colors";
                      const variantClass =
                        opt.variant === "primary"
                          ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
                          : opt.variant === "secondary"
                            ? "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900"
                            : "border border-slate-200 bg-white text-slate-900 hover:border-green-300 hover:bg-green-50/50 active:bg-green-100";
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleAnswer(opt.value)}
                          className={`${base} ${variantClass} outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {currentStep > 1 && (
                <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-sm font-medium text-slate-500 underline outline-none hover:text-slate-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Précédent
                </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </main>

      <Footer variant="bordered" />

      {showQuitModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quit-modal-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h2 id="quit-modal-title" className="text-lg font-semibold text-slate-900">
              Quitter le formulaire ?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Vos réponses ne seront pas enregistrées.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                ref={quitModalCancelRef}
                type="button"
                onClick={() => setShowQuitModal(false)}
                className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleQuit}
                className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700"
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

function ResultStep({
  answers,
  compareOnly,
  onPrev,
}: {
  answers: FormAnswers;
  compareOnly: boolean;
  onPrev: () => void;
}) {
  return compareOnly ? (
    <CompareOnlyResult answers={answers} onPrev={onPrev} />
  ) : (
    <FinalizeProfileStep answers={answers} onPrev={onPrev} />
  );
}

function CompareOnlyResult({
  answers,
  onPrev,
}: {
  answers: FormAnswers;
  onPrev: () => void;
}) {
  const result = computeScore(answers);
  return (
    <div className="transition-opacity duration-200" key="result-compare">
      <h1 className="text-center text-lg font-bold text-slate-900 sm:text-xl">
        Vos recommandations
      </h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-8 sm:p-8">
        <p className="text-sm leading-relaxed text-slate-700">{result.recommendation}</p>
        <p className="mt-3 text-xs text-slate-500">Score indicatif : {result.score}/100</p>
        {result.suggestedBanks.length > 0 && (
          <ul className="mt-4 space-y-2">
            {result.suggestedBanks.map((name) => (
              <li key={name} className="text-sm font-medium text-slate-800">
                • {name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onPrev}
          className="text-sm font-medium text-slate-500 underline outline-none hover:text-slate-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Précédent
        </button>
      </div>
    </div>
  );
}

function FinalizeProfileStep({
  answers,
  onPrev,
}: {
  answers: FormAnswers;
  onPrev: () => void;
}) {
  const result = computeScore(answers);
  const [nomPrenom, setNomPrenom] = React.useState("");
  const [trancheAge, setTrancheAge] = React.useState("");
  const [wilaya, setWilaya] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const tranchesAge = [
    { value: "18-25", label: "18 - 25 ans" },
    { value: "26-35", label: "26 - 35 ans" },
    { value: "36-45", label: "36 - 45 ans" },
    { value: "46-55", label: "46 - 55 ans" },
    { value: "56+", label: "56 ans et plus" },
  ];

  const [sending, setSending] = React.useState(false);
  const [successSent, setSuccessSent] = React.useState(false);
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessSent(false);
    const nextErrors: Record<string, string> = {};
    if (!nomPrenom.trim()) nextErrors.nomPrenom = "Champ requis.";
    else if (nomPrenom.trim().length < 2) nextErrors.nomPrenom = "Nom et prénom valides requis.";
    if (!trancheAge) nextErrors.trancheAge = "Champ requis.";
    if (!wilaya) nextErrors.wilaya = "Champ requis.";
    if (email.trim() && !EMAIL_REGEX.test(email.trim())) nextErrors.email = "Format d’email incorrect.";
    if (!whatsapp.trim()) nextErrors.whatsapp = "Numéro obligatoire.";
    else {
      const digits = whatsapp.replace(/\D/g, "");
      if (digits.length < 8) nextErrors.whatsapp = "Numéro invalide (au moins 8 chiffres).";
      else if (!/^[\d\s+.-]{8,}$/.test(whatsapp.replace(/\s/g, ""))) nextErrors.whatsapp = "Format de numéro incorrect.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const trancheAgeLabel = tranchesAge.find((t) => t.value === trancheAge)?.label ?? trancheAge;
    const waNumber = whatsapp.trim().replace(/\s/g, "");
    const message = buildWhatsAppMessage(
      answers,
      {
        nomPrenom: nomPrenom.trim(),
        trancheAgeLabel,
        wilaya,
        email: email.trim() || undefined,
        whatsapp: waNumber,
      },
      {
        profile: result.profile,
        cardType: result.cardType,
        suggestedBanks: result.suggestedBanks,
      }
    );

    setSending(true);
    try {
      const res = await fetch("/api/whatsapp-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
        setSuccessSent(true);
      } else {
        setErrors({ submit: data.error || "Impossible d’ouvrir WhatsApp." });
      }
    } catch {
      setErrors({ submit: "Une erreur est survenue. Réessayez." });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-100";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
  const errorClass = "mt-1 text-xs text-red-600";

  return (
    <div className="transition-opacity duration-200" key="result-finalize">
      <h1 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
        Finalisez votre profil
      </h1>

      {successSent && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 text-center sm:mt-8" role="status">
          <p className="text-base font-medium text-green-800 sm:text-lg">Merci !</p>
          <p className="mt-2 text-sm text-green-700">
            Votre message a été préparé. Si WhatsApp ne s’est pas ouvert, vérifiez que l’application est installée sur votre appareil.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-8 sm:p-8 sm:px-10"
      >
        {errors.submit && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {errors.submit}
          </div>
        )}
        <div className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="nom-prenom" className={labelClass}>
              Nom & Prénom
            </label>
            <input
              id="nom-prenom"
              type="text"
              value={nomPrenom}
              onChange={(e) => setNomPrenom(e.target.value)}
              placeholder="Ex. Mohamed Benali"
              className={`${inputClass} ${errors.nomPrenom ? "border-red-300" : ""}`}
            />
            {errors.nomPrenom && <p className={errorClass}>{errors.nomPrenom}</p>}
          </div>

          <div>
            <label htmlFor="tranche-age" className={labelClass}>
              Tranche d&apos;âge
            </label>
            <div className="relative">
              <select
                id="tranche-age"
                value={trancheAge}
                onChange={(e) => setTrancheAge(e.target.value)}
                className={`${inputClass} appearance-none pr-10 ${errors.trancheAge ? "border-red-300" : ""}`}
              >
                <option value="">Choisir une tranche</option>
                {tranchesAge.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            {errors.trancheAge && <p className={errorClass}>{errors.trancheAge}</p>}
          </div>

          <div>
            <label htmlFor="wilaya" className={labelClass}>
              Wilaya
            </label>
            <div className="relative">
              <select
                id="wilaya"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className={`${inputClass} appearance-none pr-10 ${errors.wilaya ? "border-red-300" : ""}`}
              >
                <option value="">Choisir une wilaya</option>
                {WILAYAS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            {errors.wilaya && <p className={errorClass}>{errors.wilaya}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="font-normal text-slate-500">(optionnel)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className={`${inputClass} ${errors.email ? "border-red-300 bg-red-50/50" : ""}`}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="whatsapp" className={labelClass}>
              Numéro WhatsApp <span className="font-normal text-red-600">(obligatoire)</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="0550 12 34 56"
              className={`${inputClass} ${errors.whatsapp ? "border-red-300" : ""}`}
            />
            {errors.whatsapp && <p className={errorClass}>{errors.whatsapp}</p>}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-lg"
            aria-hidden
          >
            <WhatsAppIcon className="h-8 w-8 text-white" />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-4 py-4 text-center text-sm font-semibold text-white shadow-md transition-colors outline-none hover:bg-[#20BD5A] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:bg-[#1DA851] disabled:opacity-70 sm:py-4.5"
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0 text-white" />
            <span>{sending ? "Envoi…" : "Recevez votre proposition sur WhatsApp"}</span>
          </button>
        </div>

        <p className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-center text-xs font-medium text-emerald-800">
          <strong>Aucune donnée personnelle n&apos;est stockée</strong> sur ce site ni dans aucune base de données. WhatsApp s&apos;ouvrira avec un résumé de vos réponses. Vous restez libre d&apos;envoyer ou non le message.
        </p>
      </form>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-medium text-slate-800">Vos recommandations</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{result.recommendation}</p>
        {result.suggestedBanks.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {result.suggestedBanks.map((name) => (
              <li key={name}>• {name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onPrev}
          className="text-sm font-medium text-slate-500 underline outline-none hover:text-slate-700 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Précédent
        </button>
      </div>
    </div>
  );
}
