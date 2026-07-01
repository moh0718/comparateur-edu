import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION_META } from "@/lib/seo";

// Image d'aperçu par défaut (partages WhatsApp / Facebook / X, résultats sociaux).
export const runtime = "edge";
export const alt = `${SITE_NAME} — Orientation et établissements en Algérie`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 8 }}>🎓</div>
        <div style={{ fontSize: 76, fontWeight: 800, color: "white", lineHeight: 1.1 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 32, color: "#e0e7ff", marginTop: 24, maxWidth: 900 }}>
          {SITE_DESCRIPTION_META}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            fontWeight: 600,
            color: "#1e1b4b",
            background: "white",
            padding: "12px 28px",
            borderRadius: 999,
          }}
        >
          Orientation & établissements 🇩🇿
        </div>
      </div>
    ),
    { ...size }
  );
}
