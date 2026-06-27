"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Reveal from "./components/RevealWrapper";
import TypeWriter from "./components/TypeWriter";
import CountUp from "./components/CountUp";
import TiltCard from "./components/TiltCard";
import MagneticButton from "./components/MagneticButton";
import CircuitBoard from "./components/CircuitBoard";

/* ── Data ───────────────────────────────────────────────────────── */
const IDENTITY = [
  {
    num: "01", title: "The Electrician",
    color: "var(--signal-electrical)", tag: "tag-copper",
    body: "Before I wrote a line of code I was inside walls, tracing faults by feel. The trade taught me that physical systems don't lie — they either work or they don't.",
    note: "How this shapes my work: I approach software the way I approach a panel — with precision, respect for the system, and zero tolerance for loose connections.",
    skills: ["Conduit & cable", "Panel design", "Fault diagnosis", "Schematic reading"],
  },
  {
    num: "02", title: "The Developer",
    color: "var(--signal-dev)", tag: "tag-cyan",
    body: "Full-stack, user-first. I build things people actually use — tools for tradespeople, interfaces for builders, systems that hold up under real conditions.",
    note: "How this shapes my work: I care about the edge cases. I've seen what happens when a system fails on-site. That instinct carries into every codebase I touch.",
    skills: ["React / Next.js", "TypeScript", "Backend & APIs", "Responsive UI"],
  },
  {
    num: "03", title: "The Designer",
    color: "var(--signal-design)", tag: "tag-violet",
    body: "Design-native. Figma-fluent. Motion-aware. I obsess over the space between things — the margins, the rhythm, the moment a UI becomes honest.",
    note: "How this shapes my work: I never separate design and build. The decisions compound. Good design saved in Figma is only halfway done.",
    skills: ["Figma", "UI/UX design", "Design systems", "Motion design"],
  },
  {
    num: "04", title: "The Explorer",
    color: "var(--signal-nature)", tag: "tag-emerald",
    body: "The outdoors is not a hobby — it's infrastructure. Some problems can only be solved by stepping away from them.",
    note: "How this shapes my work: I build patience. I think in systems. I've learned that the best debugging tool is a long walk and an honest question.",
    skills: ["Orientation & navigation", "Trail journaling", "Photography", "Systems thinking"],
  },
  {
    num: "05", title: "The Human",
    color: "var(--signal-human)", tag: "tag",
    body: "Curious without arrogance. Honest without cruelty. Present. I try to be the kind of person whose work you can trust before you've read a single line of it.",
    note: "How this shapes my work: I collaborate, not perform. I ask questions before I give answers. I make things that make sense to people.",
    skills: ["Clear communication", "Patience", "Precision", "Honest collaboration"],
  },
];

const BELIEFS = [
  { num: "01", title: "Every system is connected", color: "var(--copper)", desc: "Whether it's a circuit, a codebase, or a conversation — nothing works in isolation. Understanding the whole changes how you work on any single part." },
  { num: "02", title: "Craft is the respect you pay to the work", color: "var(--cyan)", desc: "Speed without care is noise. The detail no one sees is still worth getting right. The standard you hold in private becomes the standard you deliver in public." },
  { num: "03", title: "The outdoors is the reset button", color: "var(--emerald)", desc: "Some problems can only be solved by stepping away from them. Nature dissolves the noise and returns you to what actually matters." },
];

const PROJECTS = [
  { slug: "electrimap",       title: "ElectriMap",       status: "concept",  year: "2025", tags: ["tag-copper", "tag-cyan"], tagLabels: ["Mobile App", "iOS/Android"], color: "var(--signal-electrical)", desc: "A mobile circuit diagramming tool built for electricians on-site. Offline-first, schematic-aware, and fast.", tools: ["React Native", "TypeScript", "SQLite"] },
  { slug: "terrain-journal",  title: "Terrain Journal",  status: "concept",  year: "2025", tags: ["tag-violet", "tag-emerald"], tagLabels: ["Web App", "GPS"], color: "var(--signal-design)", desc: "GPS outdoor journaling with map trail overlays and location-aware photo capture.", tools: ["Next.js", "Mapbox", "Supabase"] },
  { slug: "rawpanel",         title: "RawPanel UI",      status: "wip",      year: "2026", tags: ["tag-violet"], tagLabels: ["Design System"], color: "var(--signal-design)", desc: "An open design system for craftspeople who code. Warm, honest, anti-template.", tools: ["Figma", "Storybook", "Tailwind"] },
];

const POSTS = [
  { slug: "wiring-panel-architecture", date: "Jun 2026", cat: "Electrical", catColor: "var(--signal-electrical)", title: "What wiring a panel taught me about architecture", excerpt: "Every circuit is a module. Every breaker is a boundary. The mental model transfers more than you'd think." },
  { slug: "design-second-language",    date: "May 2026", cat: "Design",     catColor: "var(--signal-design)",     title: "Design as a second language", excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading." },
];

const CHIPS = ["Electrical Systems", "Web Apps", "UI/UX Design", "Design Systems", "Field Tools", "Human-Centered Products"];

/* ── Animated circuit SVG background ───────────────────────────── */
function HeroCircuit() {
  return (
    <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Grid dots */}
      {[...Array(8)].map((_, r) => [...Array(12)].map((_, c) => (
        <circle key={`${r}-${c}`} cx={c * 120 + 60} cy={r * 120 + 60} r="1" fill="rgba(200,123,47,0.3)" />
      )))}
      {/* Horizontal lines */}
      <path d="M0,180 H400 M500,180 H800 M900,180 H1440" stroke="rgba(200,123,47,0.15)" strokeWidth="0.5"/>
      <path d="M0,540 H600 M700,540 H1440" stroke="rgba(0,200,255,0.1)" strokeWidth="0.5"/>
      <path d="M200,720 H500 M600,720 H900" stroke="rgba(168,85,247,0.08)" strokeWidth="0.5"/>
      {/* Vertical lines */}
      <path d="M360,0 V300 M360,400 V900" stroke="rgba(200,123,47,0.1)" strokeWidth="0.5"/>
      <path d="M1080,0 V200 M1080,350 V900" stroke="rgba(0,200,255,0.08)" strokeWidth="0.5"/>
      {/* Corner markers */}
      {[[360,180],[500,180],[1080,540],[700,540]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="none" stroke={i%2===0 ? "rgba(200,123,47,0.5)" : "rgba(0,200,255,0.4)"} strokeWidth="1"/>
          <circle cx={x} cy={y} r="1" fill={i%2===0 ? "rgba(200,123,47,0.6)" : "rgba(0,200,255,0.5)"}/>
        </g>
      ))}
      {/* Animated pulse path */}
      <path d="M0,300 Q200,300 360,180 Q500,80 720,180 Q900,280 1080,180 Q1260,80 1440,180"
        stroke="rgba(200,123,47,0.3)" strokeWidth="0.8" fill="none" strokeDasharray="6 12"/>
    </svg>
  );
}

/* ── Skill bar ──────────────────────────────────────────────────── */
function SkillBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && fillRef.current) { fillRef.current.classList.add("in-view"); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: "0.875rem", color: "var(--stone)" }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color }}>
          {pct}%
        </span>
      </div>
      <div className="skill-bar-track">
        <div ref={fillRef} className="skill-bar-fill" style={{ background: color, width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ════════════════════════════════ HERO ═════════════════════════ */}
      <section
        aria-label="Hero"
        style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center",
          position: "relative", overflow: "hidden",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,123,47,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 40%, rgba(0,200,255,0.04) 0%, transparent 60%), var(--void)",
        }}
      >
        <HeroCircuit />
        <CircuitBoard />

        {/* Radial glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "min(600px, 80vw)", height: "min(600px, 80vw)", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,123,47,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(6rem,12vw,9rem) clamp(1.25rem,4vw,2rem) clamp(4rem,8vw,6rem)", position: "relative", zIndex: 2, width: "100%" }}>
          {/* Available badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div className="signal-dot" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--emerald)", textTransform: "uppercase" }}>
              Available for the right opportunity
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)",
            lineHeight: 1, letterSpacing: "0.01em",
            color: "var(--chalk)", maxWidth: 900, marginBottom: 28,
          }}>
            I build systems that{" "}
            <span className="text-copper">connect</span>{" "}
            circuits, code, and people.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)", lineHeight: 1.75,
            color: "var(--stone)", maxWidth: 600, marginBottom: 16,
          }}>
            I&rsquo;m Josiah — an electrician, developer, and designer turning hands-on field logic into digital products that feel clear, useful, and alive.
          </p>

          {/* Typewriter */}
          {mounted && (
            <div style={{ marginBottom: 40, height: 28, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--mist)" }}>$ josiah --role</span>
              <TypeWriter
                words={["electrician", "developer", "designer", "explorer", "human"]}
                className=""
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "var(--copper)" }}
              />
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            <MagneticButton as="a" href="/portfolio" className="btn btn-primary">
              <span>View Work</span>
              <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 14, height: 14 }}>
                <path d="M8.293 1.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L12.586 9H2a1 1 0 110-2h10.586L8.293 2.707a1 1 0 010-1.414z"/>
              </svg>
            </MagneticButton>
            <MagneticButton as="a" href="/about" className="btn btn-ghost">
              <span>Read My Story</span>
            </MagneticButton>
            <MagneticButton as="a" href="/images/josiah-cv.pdf" className="btn btn-signal">
              <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 13, height: 13 }}>
                <path d="M8 12l-4-4h2.5V4h3v4H12L8 12zM2 14h12v1.5H2z"/>
              </svg>
              <span>Download CV</span>
            </MagneticButton>
          </div>

          {/* Identity chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CHIPS.map((c) => (
              <span key={c} className="tag">{c}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
          <div style={{ width: 20, height: 32, borderRadius: 10, border: "1px solid rgba(200,123,47,0.3)", display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 2, height: 8, borderRadius: 1, background: "var(--copper)", animation: "scrollY 1.5s ease-in-out infinite" }} />
          </div>
        </div>
        <style>{`@keyframes scrollY{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(8px);opacity:0.3}}`}</style>
      </section>

      {/* ════════════════════════════════ STATS ════════════════════════ */}
      <section aria-label="Stats" style={{ background: "var(--earth)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "clamp(1.5rem,4vw,3rem)" }}>
            {[
              { n: 8,    suf: "+", label: "Years in the trade" },
              { n: 40,   suf: "+", label: "Projects shipped" },
              { n: "∞",  suf: "",  label: "Lines of code" },
              { n: "100",suf: "s", label: "Trails walked" },
            ].map((s, i) => (
              <Reveal key={s.label} className="reveal" delay={i * 80}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>
                    <span className="text-copper">
                      {typeof s.n === "number" ? <CountUp end={s.n} suffix={s.suf} /> : `${s.n}${s.suf}`}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mist)" }}>
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ IDENTITY ═════════════════════ */}
      <section id="identity" aria-label="Identity" style={{ background: "var(--void)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal className="reveal" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="section-tag">001 — Identity</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
              I AM<br /><span className="text-signal">MANY THINGS</span>
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {IDENTITY.map((role, i) => (
              <Reveal key={role.num} className="reveal" delay={i * 60}>
                <TiltCard intensity={4}>
                  <div style={{
                    background: "var(--carbon)", borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.04)",
                    padding: "clamp(1.5rem,3vw,2.5rem)",
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) minmax(0,1.6fr) minmax(0,1fr)",
                    gap: "clamp(1.5rem,3vw,2.5rem)",
                    alignItems: "start",
                    transition: "border-color 300ms",
                    borderTop: `1px solid ${role.color}20`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${role.color}25`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}
                  className="role-card-inner"
                  >
                    {/* Number + title */}
                    <div>
                      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 1, color: role.color, opacity: 0.12, fontWeight: 700, marginBottom: 4 }}>{role.num}</div>
                      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "var(--chalk)", lineHeight: 1 }}>{role.title}</h3>
                    </div>
                    {/* Body */}
                    <div>
                      <p style={{ fontSize: "0.9375rem", lineHeight: 1.75, color: "var(--stone)", marginBottom: 16 }}>{role.body}</p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.875rem", color: role.color, opacity: 0.8 }}>{role.note}</p>
                    </div>
                    {/* Skills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start" }}>
                      {role.skills.map((s) => (
                        <span key={s} className={`tag ${role.tag}`}>{s}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.role-card-inner{grid-template-columns:1fr !important}}`}</style>
      </section>

      {/* ════════════════════════════════ BELIEFS ══════════════════════ */}
      <section aria-label="Beliefs" style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal className="reveal" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="section-tag">002 — Beliefs</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
              THREE THINGS<br />I BELIEVE
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {BELIEFS.map((b, i) => (
              <Reveal key={b.num} className="reveal-scale" delay={i * 100}>
                <TiltCard className="h-full" intensity={6}>
                  <div className="border-spin" style={{ height: "100%" }}>
                    <div style={{ padding: "clamp(1.5rem,3vw,2rem)", height: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(3rem,6vw,5rem)", color: b.color, opacity: 0.1, lineHeight: 1, fontWeight: 700 }}>{b.num}</div>
                      <div style={{ width: 32, height: 1, background: b.color, boxShadow: `0 0 8px ${b.color}` }} />
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2vw,1.25rem)", color: "var(--chalk)", lineHeight: 1.4 }}>{b.title}</h3>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--stone)", flex: 1 }}>{b.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ WORK ═════════════════════════ */}
      <section id="work" aria-label="Featured Work" style={{ background: "var(--void)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <Reveal className="reveal">
              <div className="section-tag">003 — Work</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
                THINGS I&apos;VE<br /><span className="text-copper">BUILT</span>
              </h2>
            </Reveal>
            <MagneticButton as="a" href="/portfolio" className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>
              All Work →
            </MagneticButton>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} className="reveal-scale" delay={i * 80}>
                <TiltCard intensity={7}>
                  <Link href={`/portfolio/${p.slug}`} style={{ display: "block", height: "100%" }}>
                    <div style={{ background: "var(--carbon)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden", height: "100%", transition: "border-color 300ms, transform 300ms cubic-bezier(0.25,1,0.5,1)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.color}30`)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
                    >
                      {/* Visual panel */}
                      <div style={{ height: 200, background: "var(--smoke)", position: "relative", overflow: "hidden" }}>
                        <svg viewBox="0 0 400 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
                          <defs>
                            <radialGradient id={`rg-${i}`} cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor={p.color} stopOpacity="0.15"/>
                              <stop offset="100%" stopColor={p.color} stopOpacity="0"/>
                            </radialGradient>
                          </defs>
                          <rect width="400" height="200" fill={`url(#rg-${i})`}/>
                          <circle cx="200" cy="100" r="65" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.3"/>
                          <circle cx="200" cy="100" r="35" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.2"/>
                          <line x1="0" y1="100" x2="400" y2="100" stroke={p.color} strokeWidth="0.4" opacity="0.15" strokeDasharray="4 8"/>
                          <line x1="200" y1="0" x2="200" y2="200" stroke={p.color} strokeWidth="0.4" opacity="0.15" strokeDasharray="4 8"/>
                          {[[135,65],[265,65],[135,135],[265,135]].map(([x,y],j) => (
                            <rect key={j} x={x-3} y={y-3} width="6" height="6" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.35" transform={`rotate(45 ${x} ${y})`}/>
                          ))}
                          <text x="200" y="115" textAnchor="middle" fontFamily="Orbitron" fontSize="60" fill={p.color} opacity="0.04" fontWeight="700">{p.title.charAt(0)}</text>
                        </svg>
                        {/* Year overlay */}
                        <div style={{ position: "absolute", top: 16, right: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, opacity: 0.5 }}>{p.year}</div>
                      </div>

                      {/* Info */}
                      <div style={{ padding: "clamp(1.25rem,3vw,1.75rem)" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, alignItems: "center" }}>
                          {p.tagLabels.map((t, j) => <span key={t} className={`tag ${p.tags[j] ?? ""}`}>{t}</span>)}
                          <span className={`status status-${p.status}`} style={{ marginLeft: "auto" }}>{p.status}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.9rem,2vw,1.1rem)", color: "var(--chalk)", marginBottom: 10, fontWeight: 600 }}>{p.title}</h3>
                        <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--stone)", marginBottom: 16 }}>{p.desc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {p.tools.map((t) => <span key={t} className="tag">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ WRITING ══════════════════════ */}
      <section aria-label="Writing" style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <Reveal className="reveal">
              <div className="section-tag">004 — Writing</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
                THINKING<br /><span className="text-connect">OUT LOUD</span>
              </h2>
            </Reveal>
            <MagneticButton as="a" href="/blog" className="btn btn-ghost" style={{ fontSize: "0.8rem" }}>
              All Writing →
            </MagneticButton>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} style={{ display: "block", height: "100%" }}>
                  <div style={{ background: "var(--carbon)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, overflow: "hidden", height: "100%", transition: "border-color 300ms, transform 300ms cubic-bezier(0.25,1,0.5,1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "none"; }}
                  >
                    {/* Visual */}
                    <div style={{ height: 160, background: "var(--smoke)", position: "relative", overflow: "hidden" }}>
                      <svg viewBox="0 0 400 160" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
                        <circle cx="200" cy="80" r="55" fill="none" stroke={post.catColor} strokeWidth="0.5" opacity="0.2"/>
                        <line x1="0" y1="80" x2="400" y2="80" stroke={post.catColor} strokeWidth="0.4" opacity="0.12" strokeDasharray="4 8"/>
                      </svg>
                      <div style={{ position: "absolute", top: 16, left: 16 }}>
                        <span className="tag" style={{ borderColor: `${post.catColor}30`, color: post.catColor, background: `${post.catColor}0D` }}>{post.cat}</span>
                      </div>
                    </div>
                    <div style={{ padding: "clamp(1.25rem,3vw,1.75rem)" }}>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--mist)", marginBottom: 10 }}>{post.date}</p>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2vw,1.2rem)", color: "var(--chalk)", lineHeight: 1.45, marginBottom: 10 }}>{post.title}</h3>
                      <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--stone)", marginBottom: 16 }}>{post.excerpt}</p>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--cyan)" }}>Read →</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ SKILLS ═══════════════════════ */}
      <section aria-label="Skills" style={{ background: "var(--void)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal className="reveal" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="section-tag">005 — Skills</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
              WHAT I<br />BRING
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,260px),1fr))", gap: "clamp(1.5rem,3vw,2rem)" }}>
            {[
              { group: "Electrical", color: "var(--signal-electrical)", skills: [{ l: "Conduit & cable", p: 96 }, { l: "Panel design", p: 94 }, { l: "Fault diagnosis", p: 92 }, { l: "Schematic reading", p: 90 }] },
              { group: "Digital", color: "var(--signal-dev)", skills: [{ l: "Frontend dev", p: 88 }, { l: "React / Next.js", p: 85 }, { l: "TypeScript", p: 82 }, { l: "Backend & APIs", p: 76 }] },
              { group: "Design", color: "var(--signal-design)", skills: [{ l: "UI/UX design", p: 82 }, { l: "Figma", p: 88 }, { l: "Design systems", p: 80 }, { l: "Motion design", p: 72 }] },
              { group: "Human", color: "var(--signal-human)", skills: [{ l: "Communication", p: 94 }, { l: "Precision", p: 96 }, { l: "Collaboration", p: 90 }, { l: "Problem solving", p: 88 }] },
            ].map((g, i) => (
              <Reveal key={g.group} className="reveal" delay={i * 80}>
                <div style={{ background: "var(--carbon)", borderRadius: 20, padding: "clamp(1.5rem,3vw,2rem)", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: g.color, marginBottom: 24 }}>{g.group}</h3>
                  {g.skills.map((s) => <SkillBar key={s.l} label={s.l} pct={s.p} color={g.color} />)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ MANIFESTO ════════════════════ */}
      <section aria-label="Manifesto" style={{ background: "var(--earth)", position: "relative", overflow: "hidden", padding: "clamp(5rem,10vw,10rem) clamp(1.25rem,4vw,2rem)" }}>
        <CircuitBoard />
        <div style={{ position: "absolute", inset: 0, background: "rgba(15,16,18,0.85)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
          <Reveal className="reveal" style={{ marginBottom: 16 }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>006 — Manifesto</div>
          </Reveal>
          <Reveal className="reveal">
            <div>
              <div className="manifesto-line">BUILD.</div>
              <div className="manifesto-line"><span className="text-connect">CONNECT.</span></div>
              <div className="manifesto-line">GROW.</div>
              <div className="manifesto-line" style={{ opacity: 0.3 }}>REPEAT.</div>
            </div>
          </Reveal>
          <Reveal className="reveal" delay={200} style={{ marginTop: 40 }}>
            <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75, color: "var(--stone)", maxWidth: 560, margin: "0 auto 40px" }}>
              The best work happens where physical systems, digital tools, and human attention meet. I build at that intersection.
            </p>
            <MagneticButton as="a" href="/contact" className="btn btn-primary">
              Start a conversation
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════ NEWSLETTER ═══════════════════ */}
      <section aria-label="Newsletter" style={{ background: "var(--void)", padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <Reveal className="reveal">
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.75rem,4vw,2.5rem)", color: "var(--copper)", marginBottom: 8 }}>Think alongside me.</p>
            <p style={{ fontSize: "0.9375rem", color: "var(--stone)", marginBottom: 32, lineHeight: 1.7 }}>
              Occasional writing on building, designing, and living. No spam. Ever.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input type="email" placeholder="your@email.com" className="field" style={{ flex: 1, minWidth: 200 }} required />
              <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
