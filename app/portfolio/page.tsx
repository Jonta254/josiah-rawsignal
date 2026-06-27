import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects by Josiah — field tools, web apps, design systems, and more.",
};

const PROJECTS = [
  { slug: "electrimap",      title: "ElectriMap",      status: "concept", year: "2025", category: "Mobile App", color: "var(--signal-electrical)", tagClass: "tag-copper", desc: "A mobile circuit diagramming tool built for electricians on-site. Offline-first, schematic-aware, fast, and honest.", tools: ["React Native", "TypeScript", "SQLite", "Offline-first"] },
  { slug: "terrain-journal", title: "Terrain Journal", status: "concept", year: "2025", category: "Web App",    color: "var(--signal-design)",     tagClass: "tag-violet", desc: "GPS outdoor journaling with map trail overlays and location-aware photo capture.", tools: ["Next.js", "Mapbox", "Supabase", "PWA"] },
  { slug: "rawpanel",        title: "RawPanel UI",     status: "wip",     year: "2026", category: "Design System", color: "var(--signal-design)",  tagClass: "tag-violet", desc: "An open design system for craftspeople who code. Warm, honest, anti-template.", tools: ["Figma", "Storybook", "Tailwind", "Tokens"] },
];

export default function PortfolioPage() {
  return (
    <>
      <section style={{ minHeight: "50vh", display: "flex", alignItems: "flex-end", position: "relative", background: "var(--void)", padding: "clamp(6rem,12vw,9rem) clamp(1.25rem,4vw,2rem) clamp(3rem,6vw,5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Reveal className="reveal">
            <div className="section-tag">Work</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
              THINGS<br />I&apos;VE <span className="text-copper">BUILT</span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize: "clamp(1rem,1.8vw,1.1rem)", lineHeight: 1.75, color: "var(--stone)", maxWidth: 560, marginTop: 24 }}>
              A collection of work across mobile, web, and design — tools for people who make things with their hands and their heads.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,360px), 1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} className="reveal-scale" delay={i * 80}>
                <Link href={`/portfolio/${p.slug}`} style={{ display: "block", height: "100%" }}>
                  <div className="project-card-inner" style={{ background: "var(--carbon)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden", height: "100%", transition: "border-color 300ms, transform 300ms cubic-bezier(0.25,1,0.5,1)" }}>
                    {/* Visual */}
                    <div style={{ height: 220, background: "var(--smoke)", position: "relative", overflow: "hidden" }}>
                      <svg viewBox="0 0 400 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <radialGradient id={`pg-${i}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={p.color} stopOpacity="0.18"/>
                            <stop offset="100%" stopColor={p.color} stopOpacity="0"/>
                          </radialGradient>
                        </defs>
                        <rect width="400" height="220" fill={`url(#pg-${i})`}/>
                        <circle cx="200" cy="110" r="75" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.25"/>
                        <circle cx="200" cy="110" r="40" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.15"/>
                        <line x1="0" y1="110" x2="400" y2="110" stroke={p.color} strokeWidth="0.4" opacity="0.12" strokeDasharray="4 8"/>
                        <line x1="200" y1="0" x2="200" y2="220" stroke={p.color} strokeWidth="0.4" opacity="0.12" strokeDasharray="4 8"/>
                        <text x="200" y="130" textAnchor="middle" fontFamily="Orbitron" fontSize="72" fill={p.color} opacity="0.04" fontWeight="700">{p.title[0]}</text>
                      </svg>
                      <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8, alignItems: "center" }}>
                        <span className={`tag ${p.tagClass}`}>{p.category}</span>
                        <span className={`status status-${p.status}`}>{p.status}</span>
                      </div>
                      <div style={{ position: "absolute", bottom: 16, right: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, opacity: 0.4 }}>{p.year}</div>
                    </div>
                    <div style={{ padding: "clamp(1.25rem,3vw,1.75rem)" }}>
                      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(1rem,2vw,1.15rem)", color: "var(--chalk)", marginBottom: 10, fontWeight: 600 }}>{p.title}</h2>
                      <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--stone)", marginBottom: 16 }}>{p.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                        {p.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color }}>View Case Study →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Placeholder cards */}
          <Reveal className="reveal" style={{ marginTop: 24 }}>
            <div style={{ background: "var(--carbon)", border: "1px dashed rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(2rem,4vw,3rem)", textAlign: "center" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--mist)", letterSpacing: "0.1em", marginBottom: 12 }}>MORE PROJECTS IN PROGRESS</p>
              <p style={{ fontSize: "0.875rem", color: "var(--mist)" }}>Circuit Planner · Field Notes App · Portfolio OS</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
