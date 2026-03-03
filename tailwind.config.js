/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "sans-serif"
        ],
        display: [
          "var(--font-display)",
          "\"Playfair Display\"",
          "Georgia",
          "\"Times New Roman\"",
          "serif"
        ]
      },
      colors: {
        // Famille visuelle Kompar / Comparateur Edu : vert confiance + neutres
        brand: {
          DEFAULT: "#16a34a",
          light: "#22c55e",
          dark: "#15803d"
        },
        brandAccent: {
          DEFAULT: "#16a34a"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.12)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: []
};

