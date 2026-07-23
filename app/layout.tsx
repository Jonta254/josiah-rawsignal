import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import { SITE } from "@/content/site";

/* Two families, plus a mono restricted to data.
   Self-hosted by next/font — no render-blocking request to Google, and no
   layout shift, because the fallback is size-adjusted to match.

   `style: ["normal","italic"]` loads Fraunces' real italic. Without it the
   emphasis type on About and in the writing was a browser-synthesized slant of
   the Roman, which is a different, worse letterform. `opsz` keeps optical
   sizing (letterforms tuned to the size they render at). SOFT and WONK were
   requested but never used in the CSS, so they are dropped. */
const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}, ${SITE.role.toLowerCase()}`,
    // The pipe is the conventional title-tag separator, not prose punctuation.
    template: `%s | ${SITE.name} ${SITE.brand}`,
  },
  description: `${SITE.role}. I design and build complete digital products: ${SITE.services}. Every project shown is live and open to anyone.`,
  keywords: [
    "product designer",
    "full-stack engineer",
    "web application developer",
    "mobile app developer",
    "AI features",
    "Next.js",
    "React",
    "TypeScript",
    "design systems",
    "brand identity",
  ],
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: SITE.url,
    siteName: `${SITE.name} ${SITE.brand}`,
    title: `${SITE.name}, ${SITE.role.toLowerCase()}`,
    description: `Design and engineering for digital products, from web and mobile apps to AI features and brand systems. Every project is live and open to anyone.`,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Home canonical. Each page overrides with its own path, so a URL reached via
  // query strings or an alternate host consolidates to one address.
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
