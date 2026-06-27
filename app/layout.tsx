import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import EasterEgg from "./components/EasterEgg";
import ClientShell from "./components/ClientShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://josiah-rawsignal.vercel.app"),
  title: {
    default: "Josiah — Electrician · Developer · Designer",
    template: "%s | Josiah — Raw Signal",
  },
  description:
    "Josiah is a multi-disciplinary builder — electrician, full-stack developer, and designer. He wires circuits, ships code, and designs experiences that last.",
  keywords: ["electrician", "developer", "designer", "portfolio", "UI/UX", "Next.js"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://josiah-rawsignal.vercel.app",
    siteName: "Josiah — Raw Signal",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Josiah — Raw Signal" }],
  },
  twitter: { card: "summary_large_image", creator: "@josiah" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* the name is SIAH. you found it. email me. */}
      <body className="min-h-screen flex flex-col antialiased" style={{ cursor: "none" }}>
        <ClientShell />
        <Cursor />
        <EasterEgg />
        <Nav />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
