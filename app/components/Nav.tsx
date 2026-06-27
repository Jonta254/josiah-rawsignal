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
          background: scrolled ? "rgba(9,9,11,0.94)" : "rgba(9,9,11,0.4)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          transition: "background 300ms ease, border-color 300ms ease",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2rem)", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg viewBox="0 0 28 28" fill="none" style={{ width: 26, height: 26, flexShrink: 0 }}>
              <rect x="1" y="1" width="26" height="26" rx="5" stroke="rgba(200,123,47,0.4)" strokeWidth="1"/>
              <circle cx="14" cy="14" r="4" stroke="#C87B2F" strokeWidth="1.5"/>
              <line x1="14" y1="2" x2="14" y2="8" stroke="#C87B2F" strokeWidth="1" opacity="0.6"/>
              <line x1="14" y1="20" x2="14" y2="26" stroke="#C87B2F" strokeWidth="1" opacity="0.6"/>
              <line x1="2" y1="14" x2="8" y2="14" stroke="#C87B2F" strokeWidth="1" opacity="0.6"/>
              <line x1="20" y1="14" x2="26" y2="14" stroke="#C87B2F" strokeWidth="1" opacity="0.6"/>
            </svg>
            <div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, fontWeight: 600, color: "#EAEDF2", letterSpacing: "0.06em", lineHeight: 1.2 }}>JOSIAH</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(200,123,47,0.6)", letterSpacing: "0.15em", lineHeight: 1.2 }}>RAW SIGNAL</div>
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
            © 2026 JOSIAH · RAW SIGNAL
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
