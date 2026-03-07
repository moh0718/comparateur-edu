import { NextResponse } from "next/server";

/**
 * Sert le fichier de validation Google Search Console (méthode "Fichier HTML").
 * Contenu exact attendu par Google : à définir dans la variable d'environnement
 * GOOGLE_SITE_VERIFICATION_FILE_CONTENT (copier-coller le contenu du fichier
 * téléchargé depuis la Search Console, sans modifier ni le nom ni le contenu).
 */
const FALLBACK = `<!DOCTYPE html>
<html>
<head>
<meta name="google-site-verification" content="google48a9bad5586aa6d8"/>
</head>
<body></body>
</html>`;

export async function GET() {
  const content =
    process.env.GOOGLE_SITE_VERIFICATION_FILE_CONTENT?.trim() || FALLBACK;
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
