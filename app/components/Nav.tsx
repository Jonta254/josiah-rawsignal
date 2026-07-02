"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "/about",     label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog",      label: "Writing" },
  { href: "/now",       label: "Now" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
          background: scrolled ? "rgba(0,0,0,0.88)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 400ms ease, border-color 400ms ease, backdrop-filter 400ms ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2rem)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11 }} className="nav-logo-wrap">
            <svg viewBox="0 0 32 32" fill="none" style={{ width: 28, height: 28, flexShrink: 0 }}>
              {/* Outer frame */}
              <rect x="1" y="1" width="30" height="30" rx="7" stroke="rgba(200,123,47,0.30)" strokeWidth="1"/>
              {/* Corner accents */}
              <polyline points="1,8 1,1 8,1"  stroke="rgba(200,123,47,0.55)" strokeWidth="1.2" fill="none"/>
              <polyline points="24,1 31,1 31,8" stroke="rgba(200,123,47,0.55)" strokeWidth="1.2" fill="none"/>
              <polyline points="1,24 1,31 8,31" stroke="rgba(200,123,47,0.55)" strokeWidth="1.2" fill="none"/>
              <polyline points="24,31 31,31 31,24" stroke="rgba(200,123,47,0.55)" strokeWidth="1.2" fill="none"/>
              {/* Signal cross */}
              <line x1="16" y1="5" x2="16" y2="11"  stroke="#C87B2F" strokeWidth="1.2" opacity="0.7"/>
              <line x1="16" y1="21" x2="16" y2="27" stroke="#C87B2F" strokeWidth="1.2" opacity="0.7"/>
              <line x1="5"  y1="16" x2="11" y2="16" stroke="#C87B2F" strokeWidth="1.2" opacity="0.7"/>
              <line x1="21" y1="16" x2="27" y2="16" stroke="#C87B2F" strokeWidth="1.2" opacity="0.7"/>
              {/* Center core */}
              <circle cx="16" cy="16" r="4.5" stroke="#C87B2F" strokeWidth="1.2"/>
              <circle cx="16" cy="16" r="2"   fill="#C87B2F"/>
            </svg>
            <div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, fontWeight: 700, color: "#EAEDF2", letterSpacing: "0.08em", lineHeight: 1.15 }}>BRIAN</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8.5, color: "rgba(200,123,47,0.65)", letterSpacing: "0.18em", lineHeight: 1.2 }}>RAW SIGNAL</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`nav-link${pathname.startsWith(l.href) ? " active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/contact" className="btn btn-primary desktop-nav" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
              Hire Me
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "none", flexDirection: "column", gap: 5 }}
            >
              {[0,1,2].map((i) => (
                <span key={i} style={{
                  display: "block", width: 18, height: 1.5, borderRadius: 1,
                  background: open ? (i === 1 ? "transparent" : "#C87B2F") : "rgba(255,255,255,0.7)",
                  transition: "all 300ms",
                  transform: open ? (i === 0 ? "rotate(45deg) translate(3px,4px)" : i === 2 ? "rotate(-45deg) translate(3px,-4px)" : "none") : "none",
                }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${open ? " open" : ""}`} aria-hidden={!open}>
        <div style={{ paddingTop: 80, padding: "80px clamp(1.5rem,6vw,3rem) 2rem", display: "flex", flexDirection: "column", height: "100%" }}>
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
            {LINKS.map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem,10vw,4rem)",
                color: pathname.startsWith(l.href) ? "#C87B2F" : "rgba(234,237,242,0.5)",
                lineHeight: 1.1, display: "block",
                transitionDelay: open ? `${i * 40}ms` : "0ms",
              }}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 32, width: "fit-content" }}>
              Hire Me
            </Link>
          </nav>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(90,96,110,0.5)", letterSpacing: "0.12em", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
            © 2026 BRIAN · RAW SIGNAL
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
