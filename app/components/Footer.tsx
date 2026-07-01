"use client";
import Link from "next/link";

const NAV = [
  { href: "/about",     label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog",      label: "Writing" },
  { href: "/now",       label: "Now" },
  { href: "/contact",   label: "Contact" },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/josiah", icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
    </svg>
  )},
  { label: "LinkedIn",  href: "https://linkedin.com/in/josiah", icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
    </svg>
  )},
  { label: "X / Twitter", href: "https://x.com/josiah", icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}>
      <path d="M11.99 8.47L18.82 0.5h-1.62L11.27 7.4 6.33 0.5H0.5l7.16 10.22L0.5 19.5h1.62l6.26-7.15 5.29 7.15H19.5L11.99 8.47zM9.21 11.38l-.73-1.02L2.68 1.7h2.47l4.65 6.62.73 1.02 6.04 8.61h-2.47L9.21 11.38z"/>
    </svg>
  )},
  { label: "Email", href: "mailto:josiah@rawsignal.dev", icon: (
    <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 16, height: 16 }}>
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
    </svg>
  )},
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--void)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2rem) 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 15, fontWeight: 700, color: "#EAEDF2", letterSpacing: "0.08em", marginBottom: 8 }}>
              BRIAN
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(200,123,47,0.5)", letterSpacing: "0.2em", marginBottom: 16 }}>
              RAW SIGNAL
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.9rem", color: "var(--mist)", lineHeight: 1.68, maxWidth: 270 }}>
              &ldquo;I wire things — circuits, code, and the connections that matter most.&rdquo;
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mist)", textTransform: "uppercase", marginBottom: 20 }}>
              NAVIGATE
            </h3>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: "0.875rem", color: "var(--stone)", transition: "color 160ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--chalk)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--stone)")}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mist)", textTransform: "uppercase", marginBottom: 20 }}>
              CONNECT
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "var(--stone)", transition: "color 160ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--chalk)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--stone)")}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "var(--mist)", textTransform: "uppercase", marginBottom: 20 }}>
              STATUS
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div className="signal-dot" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--emerald)" }}>
                Available
              </span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--mist)", lineHeight: 1.68 }}>
              Open to the right opportunity — freelance, full-time, or something entirely its own.
            </p>
            <a href="mailto:josiah@rawsignal.dev" className="btn btn-primary" style={{ marginTop: 20, padding: "0.6rem 1.2rem", fontSize: "0.8rem" }}>
              Get in Touch
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--mist)", letterSpacing: "0.05em" }}>
            © 2026 Josiah. Built by Josiah · Raw Signal
          </p>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald)", boxShadow: "0 0 6px var(--emerald)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--mist)", letterSpacing: "0.1em" }}>RAWSIGNAL OS v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
