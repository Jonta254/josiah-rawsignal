import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Brian — field tools, web apps, design systems, and more.",
};

const PROJECTS = [
  {
    slug: "electrimap",
    title: "ElectriMap",
    status: "concept", year: "2025",
    category: "Mobile App",
    color: "#F0C030",
    tagClass: "tag-copper",
    desc: "A mobile circuit diagramming tool built for electricians on-site. Offline-first, schematic-aware, fast, and honest.",
    tools: ["React Native", "TypeScript", "SQLite", "Offline-first"],
  },
  {
    slug: "terrain-journal",
    title: "Terrain Journal",
    status: "concept", year: "2025",
    category: "Web App",
    color: "#34D399",
    tagClass: "tag-emerald",
    desc: "GPS outdoor journaling with map trail overlays and location-aware photo capture. Built for people who actually go outside.",
    tools: ["Next.js", "Mapbox", "Supabase", "PWA"],
  },
  {
    slug: "rawpanel",
    title: "RawPanel UI",
    status: "wip", year: "2026",
    category: "Design System",
    color: "#B040FF",
    tagClass: "tag-violet",
    desc: "An open design system for craftspeople who code. Warm, honest, anti-template. Built from real project pain.",
    tools: ["Figma", "Storybook", "Tailwind", "Design Tokens"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "55vh",
        display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 65% 55% at 80% 0%,   rgba(0,220,255,0.09)  0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 10% 70%,  rgba(52,211,153,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 100%, rgba(176,64,255,0.06) 0%, transparent 50%),
          linear-gradient(165deg, #030215 0%, #040118 50%, #020110 100%)
        `,
        padding: "clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(3rem,6vw,5rem)",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 80%)",
        }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(3,2,21,0.95) 0%, transparent 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Reveal className="reveal">
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.22em", color: "#00DFFF",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "linear-gradient(to right,#00DFFF,transparent)" }} />
              SIGNAL.WORK
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem,10vw,9rem)",
              lineHeight: 0.88, letterSpacing: "0.02em",
              color: "#F2F4FC", marginBottom: 0,
            }}>
              THINGS I&apos;VE<br />
              <span style={{
                background: "linear-gradient(90deg,#00DFFF,#34D399)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                BUILT.
              </span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{
              fontSize: "clamp(0.9375rem,1.6vw,1.0625rem)",
              lineHeight: 1.85, color: "#7880A2",
              maxWidth: 520, marginTop: 24,
            }}>
              Tools for people who work with their hands and interfaces for people who think with their heads. Always in service of a real problem.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 55% 45% at 85% 0%,  rgba(0,220,255,0.06)  0%, transparent 55%),
          radial-gradient(ellipse 45% 35% at 5%  60%, rgba(52,211,153,0.05) 0%, transparent 50%),
          #04050E
        `,
        padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position: "relative",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "5%", right: "5%", height: 1,
          background: "linear-gradient(to right, transparent, rgba(0,220,255,0.22) 40%, rgba(0,220,255,0.4) 50%, rgba(0,220,255,0.22) 60%, transparent)",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(1rem,2vw,1.5rem)",
          }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} className="reveal-scale" delay={i * 80}>
                <Link href={`/portfolio/${p.slug}`} style={{ display: "block", height: "100%", textDecoration: "none" }}>
                  <div className="project-card" style={{
                    background: "rgba(8,10,20,0.9)",
                    border: "1px solid rgba(255,255,255,0.055)",
                    borderRadius: 20, overflow: "hidden",
                    height: "100%",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                    "--hover-color": `${p.color}35`,
                    "--hover-glow": `0 12px 48px rgba(0,0,0,0.7), 0 0 0 1px ${p.color}18`,
                  } as React.CSSProperties}
                  >
                    {/* Visual panel */}
                    <div style={{ height: 210, background: "rgba(5,6,16,0.95)", position: "relative", overflow: "hidden" }}>
                      <svg viewBox="0 0 400 210" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <radialGradient id={`pg-${i}`} cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor={p.color} stopOpacity="0.16"/>
                            <stop offset="100%" stopColor={p.color} stopOpacity="0"/>
                          </radialGradient>
                          <radialGradient id={`pg2-${i}`} cx="80%" cy="20%" r="40%">
                            <stop offset="0%" stopColor={p.color} stopOpacity="0.08"/>
                            <stop offset="100%" stopColor={p.color} stopOpacity="0"/>
                          </radialGradient>
                        </defs>
                        <rect width="400" height="210" fill={`url(#pg-${i})`}/>
                        <rect width="400" height="210" fill={`url(#pg2-${i})`}/>
                        {/* grid lines */}
                        {[70, 140, 210, 280, 350].map((x) => (
                          <line key={x} x1={x} y1="0" x2={x} y2="210" stroke={p.color} strokeWidth="0.4" opacity="0.08"/>
                        ))}
                        {[52.5, 105, 157.5].map((y) => (
                          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={p.color} strokeWidth="0.4" opacity="0.08"/>
                        ))}
                        <circle cx="200" cy="105" r="65" fill="none" stroke={p.color} strokeWidth="0.6" opacity="0.18"/>
                        <circle cx="200" cy="105" r="35" fill="none" stroke={p.color} strokeWidth="0.6" opacity="0.10"/>
                        <text x="200" y="132" textAnchor="middle" fontFamily="Orbitron" fontSize="80" fill={p.color} opacity="0.04" fontWeight="700">{p.title[0]}</text>
                      </svg>
                      <div style={{ position: "absolute", top: 14, left: 14, display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em",
                          padding: "3px 10px", borderRadius: 100,
                          background: `${p.color}14`, color: p.color, border: `1px solid ${p.color}28`,
                        }}>{p.category}</span>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.1em",
                          padding: "2px 8px", borderRadius: 100, textTransform: "uppercase",
                          background: p.status === "wip" ? "rgba(176,64,255,0.12)" : "rgba(212,168,67,0.1)",
                          color: p.status === "wip" ? "#B040FF" : "#D4A843",
                          border: `1px solid ${p.status === "wip" ? "rgba(176,64,255,0.25)" : "rgba(212,168,67,0.2)"}`,
                        }}>{p.status === "wip" ? "In progress" : "Concept"}</span>
                      </div>
                      <div style={{
                        position: "absolute", bottom: 14, right: 14,
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, opacity: 0.35,
                      }}>{p.year}</div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "clamp(1.25rem,2.5vw,1.75rem)" }}>
                      <h2 style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "clamp(0.9375rem,1.8vw,1.1rem)",
                        color: "#E8EAF4", marginBottom: 10, fontWeight: 600, letterSpacing: "0.04em",
                      }}>{p.title}</h2>
                      <p style={{
                        fontSize: "clamp(0.8125rem,1.2vw,0.875rem)",
                        lineHeight: 1.8, color: "#5A6282", marginBottom: 18,
                      }}>{p.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                        {p.tools.map((t) => (
                          <span key={t} style={{
                            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                            letterSpacing: "0.07em", padding: "3px 10px", borderRadius: 100,
                            background: "rgba(255,255,255,0.03)", color: "#404868",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}>{t}</span>
                        ))}
                      </div>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                        color: p.color, letterSpacing: "0.06em",
                      }}>View Case Study →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* More coming */}
          <Reveal className="reveal" style={{ marginTop: 24 }}>
            <div style={{
              background: "rgba(8,10,20,0.6)",
              border: "1px dashed rgba(255,255,255,0.07)",
              borderRadius: 20, padding: "clamp(1.75rem,3.5vw,2.5rem)",
              textAlign: "center",
              backdropFilter: "blur(8px)",
            }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#303450", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>
                More projects in progress
              </p>
              <p style={{ fontSize: "clamp(0.8125rem,1.2vw,0.875rem)", color: "#404868", lineHeight: 1.7 }}>
                Circuit Planner · Field Notes App · Portfolio OS · Signal Dashboard
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`
        .project-card { transition: border-color 0.28s, box-shadow 0.28s, transform 0.28s; }
        .project-card:hover { border-color: var(--hover-color) !important; box-shadow: var(--hover-glow) !important; transform: translateY(-4px); }
      `}</style>
    </>
  );
}
