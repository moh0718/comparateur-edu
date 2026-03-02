import { NextRequest } from "next/server";

/**
 * Retourne l'URL WhatsApp (wa.me) avec le message fourni.
 * Le numéro peut être défini par NEXT_PUBLIC_WA_NUMBER ou WHATSAPP_NUMBER (serveur).
 * Utilisé par le formulaire de contact et le formulaire de leads.
 */
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WA_NUMBER;

function normalizeNumber(raw: string): string {
  return raw.replace(/\D/g, "").replace(/^0+/, "");
}

export async function POST(request: NextRequest) {
  if (!WHATSAPP_NUMBER || WHATSAPP_NUMBER.length < 8) {
    return new Response(
      JSON.stringify({ error: "Service non configuré" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { message: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Corps invalide" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return new Response(
      JSON.stringify({ error: "Message requis" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const cleanNumber = normalizeNumber(WHATSAPP_NUMBER);
  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return Response.json({ url });
}
