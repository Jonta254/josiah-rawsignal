"use client";
import { useState } from "react";
import Reveal from "../components/RevealWrapper";

interface ComingItem {
  title: string; sub: string; tagline: string; desc: string;
  color: string; tag: string; href: string; status: string;
}

/* ── HUD corner-bracket crosshair ──────────────────────────── */
function HudCrosshair({ color }: { color: string }) {
  return (
    <svg
      width="44" height="44" viewBox="0 0 44 44" fill="none"
      aria-hidden="true"
      style={{ position: "absolute", top: 14, right: 14, pointerEvents: "none", opacity: 0.55 }}
    >
      {/* Corner brackets */}
      <path d="M2 10 L2 2 L10 2"  stroke={color} strokeWidth="1.2" />
      <path d="M34 2 L42 2 L42 10" stroke={color} strokeWidth="1.2" />
      <path d="M2 34 L2 42 L10 42"  stroke={color} strokeWidth="1.2" />
      <path d="M34 42 L42 42 L42 34" stroke={color} strokeWidth="1.2" />
      {/* Crosshair */}
      <circle cx="22" cy="22" r="5" stroke={color} strokeWidth="0.8" />
      <line x1="22" y1="14" x2="22" y2="17" stroke={color} strokeWidth="0.8" />
      <line x1="22" y1="27" x2="22" y2="30" stroke={color} strokeWidth="0.8" />
      <line x1="14" y1="22" x2="17" y2="22" stroke={color} strokeWidth="0.8" />
      <line x1="27" y1="22" x2="30" y2="22" stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

/* ── Animated signal bars ──────────────────────────────────── */
function SignalBars({ color, active }: { color: string; active: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 14 }} title="Signal active">
      {([8, 11, 14] as const).map((maxH, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            background: color,
            height: active ? maxH : Math.round(maxH * 0.4),
            opacity: active ? (0.5 + i * 0.22) : 0.2,
            transition: `height 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms, opacity 0.3s ease ${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Parse hex color → r,g,b ints ─────────────────────────── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

export default function ComingCards({ items }: { items: ComingItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
      gap: "clamp(1rem,2vw,1.5rem)",
      alignItems: "stretch",
    }}>
      {items.map((c, i) => {
        const isHov = hovered === i;
        const [r, g, b] = hexToRgb(c.color);
        const rgba = (a: number) => `rgba(${r},${g},${b},${a})`;
        const tags = c.tag.split(" · ");

        return (
          <Reveal key={c.title} className="reveal-scale" delay={i * 80}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
            >
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: "clamp(1.5rem,3vw,2rem)",
                  background: `radial-gradient(ellipse 110% 75% at 0% 0%, ${rgba(isHov ? 0.09 : 0.04)} 0%, transparent 55%), rgba(255,255,255,0.016)`,
                  border: `1px solid ${isHov ? rgba(0.55) : "rgba(255,255,255,0.07)"}`,
                  borderTop: `2px solid ${isHov ? c.color : rgba(0.4)}`,
                  borderRadius: 16,
                  position: "relative", overflow: "hidden",
                  display: "flex", flexDirection: "column", gap: 14,
                  height: "100%", cursor: "pointer",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.32s cubic-bezier(0.25,1,0.5,1), background 0.3s ease",
                  transform: isHov ? "translateY(-4px)" : "none",
                  boxShadow: isHov
                    ? `0 0 0 1px ${rgba(0.22)}, 0 10px 50px ${rgba(0.2)}, 0 2px 20px rgba(0,0,0,0.55)`
                    : "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                {/* Ambient top gradient wash */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 90,
                  background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${rgba(isHov ? 0.14 : 0.06)} 0%, transparent 100%)`,
                  pointerEvents: "none",
                  transition: "background 0.3s",
                }} />

                {/* HUD crosshair — top-right */}
                <HudCrosshair color={c.color} />

                {/* Row 1: index line + glowing status badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 8, color: rgba(0.55),
                      letterSpacing: "0.2em",
                    }}>0{i + 1}</span>
                    <div style={{ width: 16, height: 1, background: rgba(0.35) }} />
                  </div>

                  {/* Status badge — glowing pill */}
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase",
                      color: c.color,
                      padding: "3px 10px", borderRadius: 100,
                      border: `1px solid ${rgba(isHov ? 0.75 : 0.45)}`,
                      background: rgba(isHov ? 0.22 : 0.12),
                      boxShadow: isHov ? `0 0 14px ${rgba(0.45)}, inset 0 0 8px ${rgba(0.1)}` : "none",
                      textDecoration: "none",
                      transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
                    }}
                  >
                    <span style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: c.color,
                      boxShadow: `0 0 6px ${c.color}`,
                      animation: "signalPulse 2s ease-in-out infinite",
                      flexShrink: 0,
                    }} />
                    {c.status}
                  </a>
                </div>

                {/* App title + subtitle */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.75rem,3.5vw,2.25rem)",
                    letterSpacing: "0.04em",
                    color: isHov ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                    lineHeight: 0.95,
                    marginBottom: 7,
                    transition: "color 0.25s",
                  }}>{c.title}</p>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.625rem",
                    color: rgba(0.7),
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}>{c.sub}</p>
                </div>

                {/* Tags — dark pill with colored border */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, position: "relative", zIndex: 1 }}>
                  {tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.5625rem", letterSpacing: "0.09em", textTransform: "uppercase",
                      color: rgba(0.8),
                      padding: "3px 10px", borderRadius: 100,
                      background: rgba(0.06),
                      border: `1px solid ${rgba(0.28)}`,
                    }}>{t}</span>
                  ))}
                </div>

                {/* Tagline */}
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(0.8125rem,1.4vw,0.9375rem)",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.65,
                  position: "relative", zIndex: 1,
                }}>{c.tagline}</p>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: `linear-gradient(to right, ${rgba(isHov ? 0.55 : 0.25)}, transparent)`,
                  transition: "background 0.3s",
                  position: "relative", zIndex: 1,
                }} />

                {/* Description */}
                <p style={{
                  fontSize: "0.8125rem",
                  color: "rgba(255,255,255,0.28)",
                  lineHeight: 1.78,
                  flex: 1,
                  position: "relative", zIndex: 1,
                }}>{c.desc}</p>

                {/* Bottom row: signal bars + sliding arrow link */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  position: "relative", zIndex: 1,
                  paddingTop: 4,
                }}>
                  <SignalBars color={c.color} active={isHov} />
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: isHov ? c.color : "rgba(255,255,255,0.25)",
                    transition: "color 0.25s",
                  }}>
                    Open
                    <span style={{
                      display: "inline-block",
                      transform: isHov ? "translateX(4px)" : "translateX(0)",
                      transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>→</span>
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
