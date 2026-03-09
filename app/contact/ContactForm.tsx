"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-9 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-100";

function IconUser() {
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+.-]{8,}$/;
const PHONE_DIGITS_MIN = 8;

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= PHONE_DIGITS_MIN;
}

export function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const messageText = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Nom et prénom requis.";
    else if (name.length < 2) errors.name = "Prénom et nom valides requis.";
    if (email && !EMAIL_REGEX.test(email)) errors.email = "Format d’email incorrect.";
    if (!phone) errors.phone = "Numéro WhatsApp obligatoire pour vous recontacter.";
    else if (!PHONE_REGEX.test(phone)) errors.phone = "Format de numéro incorrect.";
    else if (!validatePhone(phone)) errors.phone = "Numéro trop court (au moins 8 chiffres).";
    if (!messageText) errors.message = "Message requis.";
    else if (messageText.length < 10) errors.message = "Veuillez rédiger un message (au moins 10 caractères).";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    const lines = [
      "📩 Contact — Kompar",
      "────────────────────",
      `👤 ${name}`,
      ...(email ? [`📧 ${email}`] : []),
      ...(phone ? [`📱 ${phone}`] : []),
      "────────────────────",
      messageText,
    ];
    const message = lines.join("\n");

    try {
      const res = await fetch("/api/whatsapp-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFieldErrors({ submit: data.error || "Impossible d’ouvrir WhatsApp." });
        return;
      }
      
      // Correction : utiliser un lien direct si window.open est bloqué
      const link = document.createElement("a");
      link.href = data.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      router.push("/contact/confirmation");
    } catch {
      setFieldErrors({ submit: "Une erreur est survenue. Réessayez." });
    } finally {
      setLoading(false);
    }
  };

  const inputErrorClass = "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-100";
  const textareaBase =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-y min-h-[100px]";

  return (
    <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit}>
      {fieldErrors.submit && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {fieldErrors.submit}
        </div>
      )}
      <div className="space-y-1">
        <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
          Nom et prénom <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <IconUser />
          </span>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Ex. Mohamed Benali"
            className={`${inputBase} pl-9 ${fieldErrors.name ? inputErrorClass : ""}`}
            autoComplete="name"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
        </div>
        {fieldErrors.name && (
          <p id="contact-name-error" className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
          Email <span className="text-slate-500">(optionnel)</span>
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <IconMail />
          </span>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="exemple@email.com"
            className={`${inputBase} pl-9 ${fieldErrors.email ? inputErrorClass : ""}`}
            autoComplete="email"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
        </div>
        {fieldErrors.email && (
          <p id="contact-email-error" className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700">
          Numéro WhatsApp <span className="text-red-600">(obligatoire)</span>
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <IconPhone />
          </span>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            placeholder="Ex. 055 12 34 56 ou +213 555 123 456"
            className={`${inputBase} pl-9 ${fieldErrors.phone ? inputErrorClass : ""}`}
            autoComplete="tel"
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
          />
        </div>
        {fieldErrors.phone && (
          <p id="contact-phone-error" className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
          Votre message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Décrivez votre demande en quelques mots (minimum 10 caractères)"
          className={`${textareaBase} ${fieldErrors.message ? inputErrorClass : ""}`}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
        />
        {fieldErrors.message && (
          <p id="contact-message-error" className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full justify-center" disabled={loading}>
        {loading ? "Envoi…" : "Envoyer via WhatsApp"}
      </Button>

      <div className="space-y-2 pt-2">
        <p className="flex items-start gap-2 text-xs text-slate-600">
          <span className="mt-0.5 shrink-0">
            <IconLock />
          </span>
          <span>
            <strong>Aucune donnée personnelle n&apos;est stockée</strong> sur ce site ni dans aucune base de données. WhatsApp s&apos;ouvrira avec vos réponses. Vous restez libre d&apos;envoyer ou non le message.
          </span>
        </p>
      </div>
    </form>
  );
}
