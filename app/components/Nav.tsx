"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
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
        style={{
          backdropFilter: "blur(12px)",
          background: scrolled ? "rgba(26,18,8,0.92)" : "rgba(26,18,8,0.7)",
          borderBottom: scrolled ? "1px solid rgba(184,115,51,0.3)" : "1px solid transparent",
          transition: "background 300ms, border-color 300ms",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="font-bebas text-2xl tracking-widest" style={{ color: "var(--color-chalk)" }}>
              JOSIAH
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-copper)" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link text-sm font-medium"
                style={{ color: "var(--color-stone)" }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: "var(--color-stone)", color: "var(--color-stone)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "◑"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            style={{ color: "var(--color-chalk)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
          style={{
            background: "rgba(13,11,7,0.97)",
            backgroundImage: "url('/images/hero.jpg')",
            backgroundSize: "cover",
            backgroundBlendMode: "overlay",
          }}
        >
          <button
            className="absolute top-5 right-6"
            style={{ color: "var(--color-chalk)" }}
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>
          <div className="flex flex-col items-center gap-8">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-bebas text-5xl tracking-widest"
                style={{
                  color: "var(--color-chalk)",
                  animationDelay: `${i * 80}ms`,
                  animation: "flipIn 0.4s ease forwards",
                }}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleTheme(); setOpen(false); }}
              className="font-mono text-xs mt-4"
              style={{ color: "var(--color-stone)" }}
            >
              {theme === "dark" ? "[ light mode ]" : "[ dark mode ]"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
