import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import { SITE_NAME, SITE_DESCRIPTION, SITE_DESCRIPTION_META, SITE_KEYWORDS, getBaseUrl } from "@/lib/seo";
import "./globals.css";
import { ConsentModal } from "@/components/ConsentModal";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import type { Lang } from "@/lib/i18n";

const baseUrl = getBaseUrl();

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `Orientation écoles Algérie — ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION_META,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: baseUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: SITE_NAME,
    title: `Orientation écoles Algérie — ${SITE_NAME}`,
    description: SITE_DESCRIPTION_META,
  },
  twitter: {
    card: "summary_large_image",
    title: `Orientation écoles Algérie — ${SITE_NAME}`,
    description: SITE_DESCRIPTION_META,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: baseUrl },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: baseUrl,
  description: SITE_DESCRIPTION,
  inLanguage: "fr",
  areaServed: {
    "@type": "Country",
    name: "Algeria",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: baseUrl,
  description: SITE_DESCRIPTION,
  inLanguage: "fr",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/etablissements?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value as Lang | undefined;
  const currentLang: Lang = langCookie === "ar" ? "ar" : "fr";
  const dir = currentLang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={currentLang} dir={dir} className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <head>
        <meta name="google-site-verification" content="kNlcCknVK4f1uxCM1P9Ad-9f89lXf70qRgKggIfmPCE" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
      </head>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <I18nProvider initialLang={currentLang}>
          <ConsentModal />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}


