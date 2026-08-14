import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import { clinic } from "@/data/clinic";
import SmoothScroll from "@/lib/animations/SmoothScroll";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";

/**
 * Type system (loaded self-hosted by next/font, no layout shift):
 *   display → Bricolage Grotesque — editorial grotesque with real character,
 *             carries the huge hero headings.
 *   body    → Inter — neutral, screen-optimised, does the reading work.
 *   mono    → IBM Plex Mono — indices, eyebrows, data labels (editorial precision).
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://carewelldentalexperts.com"; // ← set real domain before launch

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Carewell Dental Experts | Premium Dental Care in Vengara",
    template: "%s | Carewell Dental Experts",
  },
  description:
    "Carewell Dental Experts in Vengara provides comprehensive dental care including root canal treatment, dental implants, orthodontics, cosmetic dentistry, aligners and more.",
  keywords: [
    "dental clinic Vengara",
    "dentist Vengara",
    "root canal Vengara",
    "dental implants Kerala",
    "orthodontics Vengara",
    "cosmetic dentistry",
    "Carewell Dental Experts",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Carewell Dental Experts",
    title: "Carewell Dental Experts | Premium Dental Care in Vengara",
    description:
      "Comprehensive dental care in Vengara — root canal, implants, orthodontics, cosmetic dentistry, aligners and more.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carewell Dental Experts | Premium Dental Care in Vengara",
    description:
      "Comprehensive dental care in Vengara — root canal, implants, orthodontics, cosmetic dentistry and more.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#C6297E", // brand magenta — matches the companion app's manifest theme_color
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on iOS
};

// LocalBusiness + Dentist schema, built from the single source of truth.
// No invented ratings, awards, or review counts.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  url: SITE_URL,
  telephone: `+91${clinic.phonePrimary}`,
  email: clinic.email,
  image: `${SITE_URL}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.line1,
    addressLocality: clinic.address.city,
    addressRegion: clinic.address.region,
    addressCountry: clinic.address.country,
  },
  areaServed: clinic.locality,
  sameAs: [clinic.social.instagram, clinic.social.facebook],
  // Opening hours intentionally omitted until the conflicting times are
  // verified (see data/clinic.ts). Add openingHoursSpecification then.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
