"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { LEAD_FORM_HREF, ROUTES } from "@/lib/navigation";

const FAQ_ITEMS: Array<{
  id: string;
  question: string;
  emoji: string;
  preview: string;
  full: string;
}> = [
  {
    id: "1",
    question: "Qu'est-ce que ce site?",
    emoji: "🏠",
    preview: "Notre site est un comparateur bancaire et conseiller marketing qui vous aide à trouver la banque et l'offre qui correspondent le mieux à votre profil et vos besoins.",
    full: "Notre site est un comparateur bancaire et conseiller marketing qui vous aide à trouver la banque et l'offre qui correspondent le mieux à votre profil et vos besoins. Nous centralisons les informations sur les offres des banques algériennes et vous orientons vers les solutions les plus adaptées, sans dispenser de conseil financier personnalisé.",
  },
  {
    id: "2",
    question: "Comment fonctionne le site ?",
    emoji: "⚡",
    preview: "Vous remplissez un formulaire simple et rapide avec quelques informations sur votre situation, vos projets et vos besoins.",
    full: "Vous remplissez un formulaire simple et rapide avec quelques informations sur votre situation, vos projets et vos besoins. À partir de ces éléments, nous établissons un diagnostic et vous transmettons des recommandations personnalisées. Vous pouvez également consulter nos fiches banques et notre comparatif pour explorer les offres par vous-même.",
  },
  {
    id: "3",
    question: "Mon profil est-il compatible avec ce service?",
    emoji: "👨‍💻",
    preview: "Notre service s'adresse à tout le monde : particuliers, étudiants, professionnels, indépendants et auto-entrepreneurs.",
    full: "Notre service s'adresse à tout le monde : particuliers, étudiants, professionnels, indépendants et auto-entrepreneurs. Que vous cherchiez un premier compte, une carte, un crédit ou des services professionnels, nous pouvons vous orienter vers les offres adaptées à votre profil.",
  },
  {
    id: "4",
    question: "Toutes les banques sont-elles présentes sur le site?",
    emoji: "🏦",
    preview: "Nous travaillons avec un large panel de banques en Algérie, publiques et privées, pour vous fournir des informations fiables et pertinentes.",
    full: "Nous travaillons avec un large panel de banques en Algérie, publiques et privées, pour vous fournir des informations fiables et pertinentes. La liste des établissements partenaires et des fiches disponibles peut évoluer. Consultez régulièrement le site pour découvrir les offres à jour.",
  },
  {
    id: "5",
    question: "Est-ce que les informations sont à jour?",
    emoji: "🕒",
    preview: "Nous faisons tout notre possible pour maintenir les informations à jour concernant les banques et leurs offres.",
    full: "Nous faisons tout notre possible pour maintenir les informations à jour concernant les banques et leurs offres. Les conditions (frais, taux, critères) peuvent toutefois changer côté établissements. Nous vous invitons à confirmer les détails directement auprès de la banque choisie avant toute souscription.",
  },
  {
    id: "6",
    question: "Comment gagnez-vous de l'argent?",
    emoji: "💰",
    preview: "Nous travaillons avec nos partenaires bancaires pour vous mettre en relation avec eux si vous souhaitez ouvrir un compte ou utiliser leurs services.",
    full: "Nous travaillons avec nos partenaires bancaires pour vous mettre en relation avec eux si vous souhaitez ouvrir un compte ou utiliser leurs services. Lorsqu'une mise en relation aboutit, nous pouvons être rémunérés par le partenaire. Cela nous permet de maintenir le service gratuit pour vous tout en restant transparents sur notre modèle.",
  },
  {
    id: "7",
    question: "Mes données sont-elles sécurisées ?",
    emoji: "🔒",
    preview: "Vos données sont traitées en Algérie et sont utilisées uniquement pour vous proposer des offres personnalisées.",
    full: "Vos données sont traitées en Algérie et sont utilisées uniquement pour vous proposer des offres personnalisées. Nous ne les revendons pas à des tiers. Notre approche repose sur la minimisation des données et, selon notre politique, les informations de diagnostic ne sont pas conservées durablement sur nos systèmes après la mise en relation.",
  },
  {
    id: "8",
    question: "Dois-je donner toutes mes informations personnelles?",
    emoji: "👤",
    preview: "Nous vous demandons uniquement les informations nécessaires pour vous fournir des recommandations adaptées.",
    full: "Nous vous demandons uniquement les informations nécessaires pour vous fournir des recommandations adaptées (profil, besoins, situation). Les champs obligatoires du formulaire sont limités à ce qui permet d'établir un diagnostic pertinent. Vous pouvez consulter les fiches et le comparatif sans renseigner de données personnelles.",
  },
  {
    id: "9",
    question: "Que faire si je veux changer d'avis ou retirer mes données?",
    emoji: "✉️",
    preview: "Vous pouvez nous contacter à tout moment par WhatsApp ou email pour demander la suppression ou la modification de vos informations.",
    full: "Vous pouvez nous contacter à tout moment par WhatsApp ou email pour demander la suppression ou la modification de vos informations. Nous nous engageons à traiter votre demande dans les délais prévus par la réglementation en vigueur (droit d'accès, de rectification et d'opposition).",
  },
  {
    id: "10",
    question: "Qui peut utiliser ce site?",
    emoji: "👥",
    preview: "Toute personne vivant en Algérie ou ayant un projet bancaire en Algérie peut utiliser notre service.",
    full: "Toute personne vivant en Algérie ou ayant un projet bancaire en Algérie peut utiliser notre service. Le site s'adresse aux particuliers et aux professionnels souhaitant comparer les offres et recevoir des recommandations adaptées à leur situation.",
  },
  {
    id: "11",
    question: "Est-ce que je dois aller en agence après?",
    emoji: "🏢",
    preview: "Non. Vous n'êtes pas obligé de vous déplacer. Notre objectif est de vous donner toutes les informations nécessaires pour prendre une décision informée.",
    full: "Non. Vous n'êtes pas obligé de vous déplacer. Notre objectif est de vous donner toutes les informations nécessaires pour prendre une décision informée. La suite (ouverture de compte, souscription) dépend des processus de chaque banque partenaire ; certaines démarches peuvent se faire en ligne ou par téléphone.",
  },
  {
    id: "12",
    question: "Pourquoi devrais-je remplir le formulaire ?",
    emoji: "📝",
    preview: "Remplir le formulaire vous permet de recevoir des recommandations vraiment adaptées à votre profil et votre situation.",
    full: "Remplir le formulaire vous permet de recevoir des recommandations vraiment adaptées à votre profil et votre situation. Sans ces informations, nous ne pouvons pas cibler les offres qui vous correspondent le mieux. C'est gratuit et sans engagement.",
  },
  {
    id: "13",
    question: "Que faire si je ne trouve pas ma question ici?",
    emoji: "💬",
    preview: "Vous pouvez nous contacter directement via email ou WhatsApp. Nous nous ferons un plaisir de vous répondre et de vous guider selon votre situation.",
    full: "Vous pouvez nous contacter directement via email ou WhatsApp. Nous nous ferons un plaisir de vous répondre et de vous guider selon votre situation. Utilisez la page Contact du site pour nous écrire ou consultez les coordonnées en bas de page.",
  },
];

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
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-6 md:px-8">
          <Link href={ROUTES.home} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-lg text-white">
              <span aria-hidden>🏛️</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                Kompar - Banque
              </span>
              <span className="text-[11px] text-slate-500">
                Comparateur de banques algériennes
              </span>
            </div>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-slate-700 md:flex"
          >
            <Link href={ROUTES.etablissements} className="hover:text-brand">
              Fiches banques
            </Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">
              Comparatif
            </Link>
            <Link href={ROUTES.blog} className="hover:text-brand">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="hover:text-brand">
              Contact
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div
              aria-label="Sélecteur de langue"
              className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-600"
            >
              <span className="rounded-full bg-white px-2 py-0.5 text-slate-900 shadow-sm">
                FR
              </span>
              <span className="px-2 py-0.5 text-slate-400">AR</span>
            </div>
            {/* CTA formulaire lead : modifier LEAD_FORM_HREF dans lib/navigation.ts */}
            <Button asChild variant="primary" size="sm" className="hidden whitespace-nowrap text-xs font-semibold md:inline-flex">
              <Link href={LEAD_FORM_HREF}>Trouver votre banque idéale</Link>
            </Button>
          </div>
        </div>

        <nav
          aria-label="Navigation principale mobile"
          className="border-t border-slate-100 bg-white py-2 text-xs font-medium text-slate-700 md:hidden"
        >
          <div className="mx-auto flex max-w-6xl gap-4 overflow-x-auto whitespace-nowrap px-5 pb-1 sm:px-6 md:px-8">
            <Link href={ROUTES.etablissements} className="hover:text-brand">
              Fiches banques
            </Link>
            <Link href={ROUTES.comparer} className="hover:text-brand">
              Comparatif
            </Link>
            <Link href={ROUTES.blog} className="hover:text-brand">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="hover:text-brand">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-5 py-8 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            FAQ - Comparateur bancaire Algérie
          </h1>

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

          {/* CTA formulaire lead : modifier LEAD_FORM_HREF dans lib/navigation.ts pour pointer vers la page formulaire */}
          <div className="mt-10 flex justify-center sm:mt-12">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <Link href={LEAD_FORM_HREF}>
                Remplir le formulaire et recevoir ma recommandation
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
