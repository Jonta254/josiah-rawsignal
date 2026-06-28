import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Signal Lost",
  description: "This page doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #08001A 0%, #050012 50%, #010006 100%)",
        fontFamily: "'JetBrains Mono', monospace",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      {/* Glitch number */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <span
          style={{
            fontSize: "clamp(6rem, 20vw, 14rem)",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(105deg,#7A8BAA 0%,#B0BEDD 15%,#DDE5F8 30%,#FFFFFF 45%,#C8D4EE 60%,#96A6C4 80%,#B4C0DC 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 40px rgba(180,210,255,0.3))",
            display: "block",
            animation: "glitch 4s ease-in-out infinite",
          }}
        >
          404
        </span>
      </div>

      <p
        style={{
          fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
          color: "rgba(0,223,255,0.7)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        SIGNAL LOST
      </p>

      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          color: "rgba(200,212,238,0.55)",
          maxWidth: 420,
          lineHeight: 1.7,
          marginBottom: 48,
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist — or it moved without leaving a wire behind.
      </p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            padding: "12px 28px",
            border: "1px solid rgba(0,223,255,0.35)",
            borderRadius: 4,
            color: "#00DFFF",
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          ← Back Home
        </Link>
        <Link
          href="/portfolio"
          style={{
            padding: "12px 28px",
            border: "1px solid rgba(180,115,51,0.35)",
            borderRadius: 4,
            color: "rgba(184,115,51,0.9)",
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          View Work
        </Link>
      </div>

      <style>{`
        @keyframes glitch {
          0%,90%,100% { transform: translate(0); }
          92% { transform: translate(-3px, 1px); filter: drop-shadow(3px 0 rgba(255,0,100,0.4)) drop-shadow(0 0 40px rgba(180,210,255,0.3)); }
          94% { transform: translate(3px, -1px); filter: drop-shadow(-3px 0 rgba(0,223,255,0.4)) drop-shadow(0 0 40px rgba(180,210,255,0.3)); }
          96% { transform: translate(0); }
        }
      `}</style>
    </main>
  );
}
