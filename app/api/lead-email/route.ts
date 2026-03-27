import { NextRequest } from "next/server";

/**
 * Envoie une copie du lead par email à l'administrateur.
 * Utilise Resend si configuré, sinon simule l'envoi.
 */
const ADMIN_EMAIL = "hello.team.locus@outlook.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { message, subject = "Nouveau Lead — Kompar Edu" } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message requis" }), { status: 400 });
    }

    console.log(`[Lead Email] Envoi vers ${ADMIN_EMAIL}...`);

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Kompar Edu <onboarding@resend.dev>", // À changer par un domaine vérifié si possible
          to: ADMIN_EMAIL,
          subject: subject,
          text: message,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("[Lead Email] Erreur Resend:", err);
        return new Response(JSON.stringify({ error: "Erreur lors de l'envoi de l'email" }), { status: 500 });
      }
    } else {
      console.warn("[Lead Email] RESEND_API_KEY non configurée. Email simulé en console.");
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[Lead Email] Erreur serveur:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}
