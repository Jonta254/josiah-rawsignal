import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav             from "./components/Nav";
import Footer          from "./components/Footer";
import Cursor          from "./components/Cursor";
import EasterEgg       from "./components/EasterEgg";
import ClientShell     from "./components/ClientShell";
import ReadingProgress from "./components/ReadingProgress";
import CommandPalette  from "./components/CommandPalette";
import AmbientSound    from "./components/AmbientSound";
import PageBackground  from "./components/PageBackground";
import SmoothScroll    from "./components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://josiah-rawsignal.vercel.app"),
  title: {
    default:  "Josiah — Electrician · Developer · Designer",
    template: "%s | Josiah — Raw Signal",
  },
  description:
    "Josiah Raw is an electrician, full-stack developer, and 3D web designer building field-ready digital systems with a live human signal.",
  keywords: ["electrician", "developer", "designer", "portfolio", "UI/UX", "Next.js"],
  openGraph: {
    type: "website", locale: "en_US",
    url: "https://josiah-rawsignal.vercel.app",
    siteName: "Josiah — Raw Signal",
    images: [{ url: "/images/rawsignal-hero.png", width: 1200, height: 630, alt: "Josiah — Raw Signal" }],
  },
  twitter: { card: "summary_large_image", creator: "@josiah" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* the name is SIAH. you found it. email me. */}
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          {/* Fixed / overlay layers */}
          <ClientShell />
          <Cursor />
          <EasterEgg />
          <ReadingProgress />
          <CommandPalette />
          <AmbientSound />
          <PageBackground />

          {/* Page chrome */}
          <Nav />
          <main id="main-content" className="flex-1" style={{ position: "relative", zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
