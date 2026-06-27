"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const ITEMS = [
  { group: "Navigate", label: "Home",          href: "/",          icon: "⚡" },
  { group: "Navigate", label: "About",         href: "/about",     icon: "👤" },
  { group: "Navigate", label: "Work",          href: "/portfolio", icon: "🔧" },
  { group: "Navigate", label: "Writing",       href: "/blog",      icon: "✍️" },
  { group: "Navigate", label: "Now",           href: "/now",       icon: "📡" },
  { group: "Navigate", label: "Contact",       href: "/contact",   icon: "→" },
  { group: "Projects", label: "ElectriMap",    href: "/portfolio/electrimap",      icon: "⚡" },
  { group: "Projects", label: "Terrain Journal",href: "/portfolio/terrain-journal", icon: "🌿" },
  { group: "Projects", label: "RawPanel UI",   href: "/portfolio/rawpanel",        icon: "◻" },
  { group: "Writing",  label: "Wiring a panel taught me about architecture", href: "/blog/wiring-panel-architecture", icon: "📝" },
  { group: "Writing",  label: "Design as a second language",                 href: "/blog/design-second-language",    icon: "📝" },
  { group: "Actions",  label: "Email Josiah",  href: "mailto:josiah@rawsignal.dev", icon: "✉" },
  { group: "Actions",  label: "GitHub Profile",href: "https://github.com/Jonta254",  icon: "⑂" },
];

export default function CommandPalette() {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const [cursor, setCursor]   = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router   = useRouter();

  const close = useCallback(() => { setOpen(false); setQuery(""); setCursor(0); }, []);

  const filtered = query.trim() === ""
    ? ITEMS
    : ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()) || i.group.toLowerCase().includes(query.toLowerCase()));

  const go = useCallback((href: string) => {
    close();
    if (href.startsWith("http") || href.startsWith("mailto")) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  }, [close, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
      if (e.key === "Enter" && filtered[cursor]) go(filtered[cursor].href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, cursor, filtered, go]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { setCursor(0); }, [query]);

  if (!open) return null;

  const groups = [...new Set(filtered.map((i) => i.group))];

  return (
    <div
      onClick={close}
      style={{
        position: "fixed", inset: 0, zIndex: 99990,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "clamp(80px, 15vh, 160px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(600px, 92vw)",
          background: "#0F1012",
          border: "1px solid rgba(200,123,47,0.3)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px rgba(200,123,47,0.08)",
        }}
      >
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14, flexShrink: 0, color: "rgba(200,123,47,0.6)" }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4"/>
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, writing…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
              color: "#EAEDF2", letterSpacing: "0.02em",
            }}
          />
          <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "2px 6px", letterSpacing: "0.06em", flexShrink: 0 }}>ESC</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 380, overflowY: "auto", padding: "8px 0" }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px 0", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
              No results for "{query}"
            </div>
          )}
          {groups.map((group) => (
            <div key={group}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.18em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", padding: "8px 18px 4px" }}>
                {group}
              </div>
              {filtered.filter((i) => i.group === group).map((item) => {
                const idx = filtered.indexOf(item);
                const active = idx === cursor;
                return (
                  <button
                    key={item.href}
                    onClick={() => go(item.href)}
                    onMouseEnter={() => setCursor(idx)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      width: "100%", padding: "9px 18px",
                      background: active ? "rgba(200,123,47,0.1)" : "transparent",
                      border: "none", cursor: "pointer",
                      borderLeft: active ? "2px solid #C87B2F" : "2px solid transparent",
                      transition: "background 120ms",
                    }}
                  >
                    <span style={{ fontSize: 13, width: 20, textAlign: "center", flexShrink: 0, opacity: 0.7 }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: active ? "#EAEDF2" : "rgba(255,255,255,0.55)", flex: 1, textAlign: "left", lineHeight: 1.4 }}>
                      {item.label}
                    </span>
                    {active && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(200,123,47,0.6)", letterSpacing: "0.1em" }}>ENTER</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 18px", display: "flex", gap: 16 }}>
          {[["↑↓", "navigate"], ["↵", "open"], ["esc", "close"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <kbd style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "2px 6px" }}>{k}</kbd>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>{v}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(200,123,47,0.4)", letterSpacing: "0.1em" }}>
            ⌘K to toggle
          </div>
        </div>
      </div>
    </div>
  );
}
