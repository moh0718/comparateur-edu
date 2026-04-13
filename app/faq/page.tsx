"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
    question: "Qu'est-ce que kompar - edu ?",
    emoji: "🎓",
    preview:
      "Portail indépendant d'orientation scolaire et professionnelle en Algérie : annuaire des établissements privés (Alger, Blida, Tipaza, Boumerdès), comparateur gratuit, fiches métiers et accompagnement personnalisé.",
    full:
      "Portail indépendant d'orientation scolaire et professionnelle en Algérie : annuaire des établissements privés (Alger, Blida, Tipaza, Boumerdès), comparateur gratuit, fiches métiers et accompagnement personnalisé. Notre objectif est de centraliser les informations sur les écoles, universités et formations pour simplifier votre prise de décision, sans remplacer les conseils officiels des établissements ni ceux des services d'orientation publics.",
  },
  {
    id: "2",
    question: "Comment fonctionne le comparateur ?",
    emoji: "⚡",
    preview:
      "Vous répondez à quelques questions sur votre situation (wilaya, niveau, budget, critères) et le comparateur vous propose les 5 établissements les plus adaptés à votre profil.",
    full:
      "Vous répondez à quelques questions sur votre situation (wilaya, niveau, budget, critères) et le comparateur vous propose les 5 établissements les plus adaptés à votre profil. Les résultats sont envoyés sur WhatsApp avec un résumé de vos réponses. Vous pouvez aussi consulter l'annuaire et utiliser les filtres pour explorer par vous-même (catégorie, wilaya, langue d'enseignement, MESRS, etc.).",
  },
  {
    id: "3",
    question: "Quels établissements sont répertoriés ?",
    emoji: "🏫",
    preview:
      "Écoles privées, universités et grandes écoles, centres de langues, formations professionnelles, établissements de santé et crèches/maternelles dans les wilayas d'Alger, Blida, Tipaza et Boumerdès.",
    full:
      "Écoles privées, universités et grandes écoles, centres de langues, formations professionnelles, établissements de santé et crèches/maternelles dans les wilayas d'Alger, Blida, Tipaza et Boumerdès. Nous couvrons également des établissements publics à titre informatif. L'annuaire est alimenté automatiquement à partir de sources publiques (Google Maps, sites officiels, réseaux sociaux) et mis à jour régulièrement.",
  },
  {
    id: "4",
    question: "Est-ce que les informations sont à jour ?",
    emoji: "🕒",
    preview:
      "L'annuaire est mis à jour automatiquement chaque semaine via un crawler qui agrège les données depuis les sites officiels, Google Maps et les réseaux sociaux.",
    full:
      "L'annuaire est mis à jour automatiquement chaque semaine via un crawler qui agrège les données depuis les sites officiels, Google Maps et les réseaux sociaux. Les frais d'inscription, horaires et programmes peuvent toutefois évoluer côté établissements. Nous indiquons un indice de confiance (haute / moyenne / basse) sur chaque fiche. Vérifiez toujours les détails directement auprès de l'établissement avant toute décision.",
  },
  {
    id: "5",
    question: "Que signifie la reconnaissance MESRS ?",
    emoji: "📜",
    preview:
      "Le MESRS (Ministère de l'Enseignement Supérieur et de la Recherche Scientifique) accrédite certains établissements privés. Un diplôme délivré par un établissement reconnu MESRS a une valeur officielle en Algérie.",
    full:
      "Le MESRS (Ministère de l'Enseignement Supérieur et de la Recherche Scientifique) accrédite certains établissements privés. Un diplôme délivré par un établissement reconnu MESRS a une valeur officielle en Algérie et est généralement requis pour les concours de la fonction publique. Nous indiquons cet attribut sur chaque fiche établissement lorsque l'information est disponible. En cas de doute, vérifiez auprès de l'établissement ou sur le site officiel du MESRS.",
  },
  {
    id: "6",
    question: "Le service est-il gratuit ?",
    emoji: "💰",
    preview:
      "Oui, entièrement gratuit pour les élèves, étudiants et parents. Nous ne percevons aucune commission sur les inscriptions.",
    full:
      "Oui, entièrement gratuit pour les élèves, étudiants et parents. Nous ne percevons aucune commission sur les inscriptions. Notre modèle repose sur des partenariats avec des établissements qui souhaitent améliorer leur visibilité (fiche vérifiée, mise en avant). Cela ne biaise pas les recommandations : le comparateur reste objectif et basé uniquement sur la correspondance avec votre profil.",
  },
  {
    id: "7",
    question: "Mes données personnelles sont-elles sécurisées ?",
    emoji: "🔒",
    preview:
      "Aucune donnée personnelle n'est stockée sur le site. Le formulaire d'orientation fonctionne uniquement via WhatsApp, avec votre consentement explicite.",
    full:
      "Aucune donnée personnelle n'est stockée sur le site ni dans aucune base de données. Le formulaire d'orientation fonctionne uniquement via WhatsApp : votre navigateur prépare le message, vous choisissez de l'envoyer ou non. Nous ne conservons pas votre nom, email ni numéro de téléphone. Une copie du message peut être envoyée à l'équipe kompar - edu uniquement à des fins de suivi de la demande.",
  },
  {
    id: "8",
    question: "Dois-je fournir toutes mes informations personnelles ?",
    emoji: "👤",
    preview:
      "Non. Seuls la wilaya, le type de formation et quelques critères sont nécessaires pour les recommandations. Nom et email sont optionnels.",
    full:
      "Non. Seuls la wilaya, le type de formation et quelques critères (budget, langue, MESRS, etc.) sont nécessaires pour obtenir des recommandations pertinentes. Le nom et l'email sont optionnels et servent uniquement à personnaliser le message WhatsApp. Vous pouvez aussi consulter l'annuaire complet sans remplir aucun formulaire.",
  },
  {
    id: "9",
    question: "Comment puis-je signaler une erreur sur une fiche ?",
    emoji: "✉️",
    preview:
      "Contactez-nous via la page Contact ou directement par email. Nous mettons à jour les fiches manuellement en cas d'erreur signalée.",
    full:
      "Contactez-nous via la page Contact ou directement par email. Indiquez le nom de l'établissement et la correction souhaitée. Nous mettons à jour les fiches manuellement en priorité pour les erreurs signalées. Les établissements peuvent aussi nous contacter pour revendiquer leur fiche et maintenir leurs informations à jour.",
  },
  {
    id: "10",
    question: "Qui peut utiliser kompar - edu ?",
    emoji: "👥",
    preview:
      "Toute personne concernée par l'orientation scolaire ou professionnelle en Algérie : élèves, étudiants, parents, ou professionnels en reconversion.",
    full:
      "Toute personne concernée par l'orientation scolaire ou professionnelle en Algérie : élèves du primaire au lycée, étudiants post-bac, parents cherchant une école pour leurs enfants, ou professionnels en reconversion cherchant une formation. Le comparateur couvre toutes les catégories : préscolaire, général, supérieur, langues, formation pro et santé.",
  },
  {
    id: "11",
    question: "Puis-je contacter directement les établissements ?",
    emoji: "📞",
    preview:
      "Oui. Chaque fiche établissement affiche les coordonnées disponibles : adresse, téléphone, site web, email et réseaux sociaux.",
    full:
      "Oui. Chaque fiche établissement affiche les coordonnées disponibles : adresse avec lien Google Maps, téléphone, site web, email de contact, page Facebook et compte Instagram. Pour les établissements sans coordonnées publiques, le formulaire d'orientation kompar - edu permet de les contacter via notre équipe.",
  },
  {
    id: "12",
    question: "Pourquoi remplir le formulaire d'orientation ?",
    emoji: "📝",
    preview:
      "Pour recevoir une sélection personnalisée de 3 à 5 établissements adaptés à votre profil, wilaya, budget et critères, directement sur WhatsApp.",
    full:
      "Pour recevoir une sélection personnalisée de 3 à 5 établissements adaptés à votre profil, wilaya, budget et critères, directement sur WhatsApp. Sans ces informations, il est difficile de cibler les établissements qui vous correspondent vraiment parmi les centaines référencés. C'est gratuit, sans engagement et prend moins de 2 minutes.",
  },
  {
    id: "13",
    question: "Je ne trouve pas ma question ici — que faire ?",
    emoji: "💬",
    preview:
      "Contactez-nous via la page Contact. Nous répondons à toutes les questions liées à l'orientation scolaire et à l'utilisation du comparateur.",
    full:
      "Contactez-nous via la page Contact ou directement par email. Nous répondons à toutes les questions liées à l'orientation scolaire, à l'utilisation du comparateur et aux établissements référencés. Si vous êtes un établissement souhaitant apparaître ou mettre à jour votre fiche, vous pouvez également nous écrire.",
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
