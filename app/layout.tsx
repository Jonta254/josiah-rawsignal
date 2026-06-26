import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import EasterEgg from "./components/EasterEgg";
import IntroScreen from "./components/IntroScreen";
import ParticleCanvas from "./components/ParticleCanvas";

export const metadata: Metadata = {
  title: {
    default: "Josiah — Electrician · Developer · Designer",
    template: "%s | Josiah",
  },
  description:
    "Josiah is a multi-disciplinary builder — electrician, full-stack developer, and designer. He wires circuits, ships code, and designs experiences.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://josiah.dev",
    siteName: "Josiah — Raw Signal",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Josiah" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@josiah",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* viewport configuration */}
      {/* theme: raw-signal */}
      {/* the name is SIAH. you found it. now email me. */}
      {/* performance: prefers-reduced-motion respected */}
      {/* analytics: privacy-first, plausible.io */}
      <body className="min-h-screen flex flex-col antialiased">
        <IntroScreen />
        <Cursor />
        <ParticleCanvas />
        <EasterEgg />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
