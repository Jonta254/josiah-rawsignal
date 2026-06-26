"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/about",     label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog",      label: "Blog" },
  { href: "/now",       label: "Now" },
  { href: "/contact",   label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) { setTheme(saved); document.documentElement.setAttribute("data-theme", saved); }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass scrolled" : "nav-glass"}`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-orbitron text-lg tracking-widest" style={{ color: "var(--color-chalk)" }}>
              JOSIAH
            </span>
            <span className="pulse-dot" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link font-rajdhani text-sm font-medium tracking-wider uppercase"
                style={{ color: "var(--color-stone)" }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded border transition-all hover:border-copper"
              style={{ borderColor: "rgba(184,115,51,0.3)", color: "var(--color-stone)", fontSize: "14px" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "◑"}
            </button>
            <Link
              href="/contact"
              className="btn-neon cut-corner px-4 py-1.5 text-xs font-rajdhani tracking-widest uppercase"
            >
              <span>Hire Me</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden" style={{ color: "var(--color-chalk)" }} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden scan-lines"
          style={{ background: "rgba(13,11,7,0.97)" }}
        >
          {/* Geo shapes in bg */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice">
            <polygon points="200,50 350,200 50,200" fill="none" stroke="rgba(0,255,255,0.06)" strokeWidth="1" />
            <circle cx="320" cy="500" r="80" fill="none" stroke="rgba(127,90,240,0.08)" strokeWidth="1" />
            <rect x="20" y="400" width="80" height="80" fill="none" stroke="rgba(184,115,51,0.08)" strokeWidth="1" transform="rotate(30,60,440)" />
          </svg>

          <button className="absolute top-5 right-6" style={{ color: "var(--color-chalk)" }} onClick={() => setOpen(false)}>
            <X size={28} />
          </button>

          <div className="flex flex-col items-center gap-8">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-orbitron text-3xl tracking-widest uppercase"
                style={{
                  color: "var(--color-chalk)",
                  animation: `flipIn 0.4s ease forwards ${i * 80}ms`,
                }}
              >
                {l.label}
              </Link>
            ))}
            <button onClick={() => { toggleTheme(); setOpen(false); }} className="font-mono text-xs mt-4" style={{ color: "var(--color-stone)" }}>
              {theme === "dark" ? "[ light mode ]" : "[ dark mode ]"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
