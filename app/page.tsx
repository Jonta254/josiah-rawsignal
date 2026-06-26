"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CopperWire from "./components/CopperWire";
import Reveal from "./components/RevealWrapper";
import GeoShapes from "./components/GeoShapes";
import CircuitBoard from "./components/CircuitBoard";
import TypeWriter from "./components/TypeWriter";
import CountUp from "./components/CountUp";
import TiltCard from "./components/TiltCard";
import BentoGrid from "./components/BentoGrid";
import TerminalBlock from "./components/TerminalBlock";
import MagneticButton from "./components/MagneticButton";

/* ── data ─────────────────────────────────────────────────────────────────── */
const BELIEFS = [
  { num: "01", title: "Every system is connected", body: "Whether it's a circuit, a codebase, or a conversation — nothing works in isolation. Understanding the whole changes how you work on any single part.", accent: "var(--color-copper)" },
  { num: "02", title: "Craft is the respect you pay to the work", body: "Speed without care is just noise. The detail no one sees is still worth getting right. The standard you hold in private becomes the standard you deliver in public.", accent: "var(--neon-cyan)" },
  { num: "03", title: "The outdoors is the reset button", body: "Some problems can only be solved by stepping away from them. Nature has a way of dissolving the noise and returning you to what actually matters.", accent: "var(--color-moss)" },
];

const WORK = [
  { title: "ElectriMap", tags: ["App Design", "Dev"], desc: "Mobile circuit diagramming for electricians. Offline-first. Built because nothing else existed.", slug: "electrimap", accent: "var(--geo-teal)", num: "01" },
  { title: "Terrain Journal", tags: ["Web Design"], desc: "Minimal outdoor journaling with GPS trail overlays and location-aware photo capture.", slug: "terrain-journal", accent: "var(--geo-purple)", num: "02" },
  { title: "RawPanel UI", tags: ["Design System"], desc: "Open design system for craftspeople who code. Warm, honest, anti-template.", slug: "rawpanel", accent: "var(--color-copper)", num: "03" },
];

const POSTS = [
  { title: "What wiring a panel taught me about architecture", tag: "⚡ Electrical", tagColor: "var(--color-wire)", date: "Jun 2026", excerpt: "Every circuit is a module. Every breaker is a boundary. The mental model transfers more than you'd think.", slug: "wiring-panel-architecture" },
  { title: "Design as a second language", tag: "🎨 Design", tagColor: "var(--color-ember)", date: "May 2026", excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading.", slug: "design-second-language" },
];

const TICKER_ITEMS = ["Electrician", "Developer", "Designer", "Explorer", "Human", "Builder", "Thinker", "Raw Signal"];

const STATS = [
  { label: "Years in the trade",   value: 8,    suffix: "+" },
  { label: "Projects shipped",     value: 40,   suffix: "+" },
  { label: "Lines of code",        value: "∞",  suffix: "" },
  { label: "Trails walked",        value: "100", suffix: "s" },
];

/* ─────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--color-void)" }}>
        {/* Animated circuit board */}
        <CircuitBoard />

        {/* Geo shapes */}
        <GeoShapes variant="cyan" />

        {/* Hero photo layer */}
        <div className="absolute inset-0 z-[1]">
          <div className="relative w-full h-full hero-photo">
            <Image src="/images/hero.jpg" alt="Josiah" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,11,7,0.92) 0%, rgba(13,11,7,0.75) 100%)" }} />
        </div>

        {/* Copper wire */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <CopperWire viewBox="0 0 1440 900" d="M-10,750 Q300,350 500,520 Q700,690 900,420 Q1100,150 1440,380" className="h-full" />
        </div>

        {/* Scan-line overlay */}
        <div className="absolute inset-0 z-[3] pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",
        }} />

        {/* ── Hero content ── */}
        <div className="relative z-[4] max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">

          {/* Status badge */}
          <div className="flex items-center gap-3 mb-8">
            <span className="pulse-dot" />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--neon-cyan)" }}>
              Available for the right opportunity
            </span>
          </div>

          {/* Name — holographic */}
          <h1
            className="font-bebas leading-none mb-1 holographic glitch"
            data-text="JOSIAH"
            style={{ fontSize: "clamp(5rem,16vw,13rem)" }}
          >
            JOSIAH
          </h1>

          {/* Raw Signal label */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-orbitron text-xs tracking-[0.4em] uppercase" style={{ color: "var(--color-stone)" }}>
              RAW · SIGNAL
            </span>
            <span className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(90deg, var(--color-copper), transparent)" }} />
            <span className="font-mono text-xs" style={{ color: "rgba(184,115,51,0.4)" }}>v2.0.26</span>
          </div>

          {/* Typewriter role */}
          {mounted && (
            <div className="mb-8">
              <span className="font-rajdhani text-xl font-medium" style={{ color: "var(--color-stone)" }}>
                I am a{" "}
              </span>
              <TypeWriter
                words={["circuit-bending electrician.", "full-stack developer.", "UI/UX designer.", "nature-obsessed human.", "raw signal."]}
                className="font-rajdhani text-xl font-semibold"
                style={{ color: "var(--neon-cyan)", textShadow: "0 0 20px rgba(0,255,255,0.4)" }}
              />
            </div>
          )}

          {/* Tagline */}
          <p className="font-playfair italic max-w-lg mb-12" style={{ fontSize: "clamp(1rem,2vw,1.35rem)", color: "var(--color-stone)", lineHeight: 1.7 }}>
            I wire things — circuits, code, and connections.
          </p>

          {/* CTAs — three styles */}
          <div className="flex flex-wrap gap-4 mb-14">
            <MagneticButton as="a" href="/portfolio" className="btn-copper px-7 py-3.5 text-sm font-medium tracking-wide rounded inline-block">
              <span>View My Work</span>
            </MagneticButton>
            <MagneticButton as="a" href="/blog" className="btn-holographic px-7 py-3.5 text-sm font-rajdhani tracking-wider uppercase rounded inline-block">
              <span>Read My Blog</span>
            </MagneticButton>
            <MagneticButton as="a" href="/contact" className="btn-neon cut-corner px-7 py-3.5 text-sm font-rajdhani tracking-wider uppercase inline-block">
              <span>Say Hello</span>
            </MagneticButton>
          </div>

          {/* Identity badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: "⚡", label: "Electrician", color: "var(--color-wire)" },
              { icon: "💻", label: "Developer",   color: "var(--neon-cyan)" },
              { icon: "🎨", label: "Designer",    color: "var(--geo-pink)" },
              { icon: "🌿", label: "Explorer",    color: "var(--color-moss)" },
              { icon: "🧠", label: "Human",       color: "var(--color-stone)" },
            ].map((b) => (
              <span key={b.label} className="font-mono text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${b.color}40`, color: b.color, background: `${b.color}0D` }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2">
          <div className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5" style={{ borderColor: "rgba(184,115,51,0.4)" }}>
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--color-copper)", animation: "scrollDot 1.5s ease-in-out infinite" }} />
          </div>
        </div>
        <style>{`@keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:0.3} }`}</style>
      </section>

      {/* ══ TICKER STRIP ══════════════════════════════════════════════════════ */}
      <div className="overflow-hidden py-3 border-y" style={{ background: "rgba(13,11,7,0.95)", borderColor: "rgba(184,115,51,0.15)" }}>
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-text" style={{ color: i % 3 === 0 ? "var(--color-copper)" : i % 3 === 1 ? "var(--neon-cyan)" : "var(--color-stone)" }}>
              {item} <span style={{ color: "rgba(184,115,51,0.3)", margin: "0 8px" }}>//</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ STATS ═════════════════════════════════════════════════════════════ */}
      <section className="py-16 relative" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} className="reveal" delay={i * 80}>
                <div className="glass-card p-6 rounded-xl text-center group hover:border-copper transition-colors"
                  style={{ borderColor: "rgba(184,115,51,0.12)" }}>
                  <p className="font-orbitron text-4xl md:text-5xl mb-2 holographic">
                    {typeof s.value === "number"
                      ? <CountUp end={s.value} suffix={s.suffix} />
                      : `${s.value}${s.suffix}`}
                  </p>
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--color-stone)" }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BENTO IDENTITY GRID ═══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 600" d="M0,300 Q360,80 720,300 Q1080,520 1440,300" className="h-full opacity-25" />
        </div>
        <GeoShapes variant="purple" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-12">
            <p className="section-num mb-2">// 001 — IDENTITY</p>
            <h2 className="font-bebas leading-none" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "var(--color-chalk)" }}>
              MANY THINGS,{" "}
              <span className="holographic">ONE PERSON</span>
            </h2>
          </Reveal>
          <BentoGrid />
        </div>
      </section>

      {/* ══ TERMINAL CLI SECTION ══════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        <GeoShapes variant="cyan" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal className="reveal">
              <p className="section-num mb-2">// 002 — SIGNAL</p>
              <h2 className="font-bebas leading-none mb-6" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: "var(--color-chalk)" }}>
                WHO IS<br />
                <span className="holographic">JOSIAH?</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-stone)" }}>
                A multi-disciplinary builder who exists at the rare intersection of the physical and digital worlds. He reads schematics and writes code. Bends conduit and designs interfaces. Finds clarity outdoors and ships software that lasts.
              </p>
              <Link href="/about" className="btn-copper px-7 py-3.5 text-sm font-medium tracking-wide rounded inline-block">
                <span>Read the full story</span>
              </Link>
            </Reveal>
            <Reveal className="reveal-right">
              <TerminalBlock />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ THREE BELIEFS ═════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
          <svg viewBox="0 0 1440 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={i * 160} y1="0" x2={i * 160} y2="500" stroke="var(--neon-cyan)" strokeWidth="1" />)}
            {[...Array(6)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2="1440" y2={i * 100} stroke="var(--neon-cyan)" strokeWidth="1" />)}
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-12 text-center">
            <p className="section-num mb-2">// 003 — BELIEFS</p>
            <h2 className="font-bebas leading-none" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "var(--color-chalk)" }}>THREE THINGS I BELIEVE</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.num} className="reveal" delay={i * 120}>
                <TiltCard className="h-full">
                  <div className="animated-border h-full">
                    <div className="h-full p-8 rounded-xl flex flex-col" style={{ background: "rgba(13,11,7,0.9)" }}>
                      <p className="font-orbitron mb-3" style={{ fontSize: "3.5rem", color: `${b.accent}18`, lineHeight: 1 }}>{b.num}</p>
                      <div className="w-6 h-px mb-4" style={{ background: b.accent, boxShadow: `0 0 8px ${b.accent}` }} />
                      <h3 className="font-playfair italic text-lg mb-4 flex-1" style={{ color: "var(--color-chalk)" }}>{b.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>{b.body}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED WORK ═════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <Reveal className="reveal">
              <p className="section-num mb-2">// 004 — WORK</p>
              <h2 className="font-bebas leading-none" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "var(--color-chalk)" }}>
                THINGS I&apos;VE{" "}<span className="gradient-text">BUILT</span>
              </h2>
            </Reveal>
            <MagneticButton as="a" href="/portfolio" className="btn-neon cut-corner px-5 py-2 text-xs font-rajdhani tracking-widest uppercase hidden md:inline-block">
              <span>All Work →</span>
            </MagneticButton>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {WORK.map((w, i) => (
              <Reveal key={w.slug} className="reveal-scale" delay={i * 80}>
                <TiltCard intensity={8}>
                  <Link href={`/portfolio/${w.slug}`} className="block group">
                    <div className="rounded-xl overflow-hidden copper-glow-border">
                      {/* Card visual */}
                      <div className="relative h-52 overflow-hidden" style={{ background: "rgba(13,11,7,0.95)" }}>
                        <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                          <polygon points="200,10 390,190 10,190" fill="none" stroke={w.accent} strokeWidth="0.5" opacity="0.25" />
                          <circle cx="200" cy="100" r="55" fill="none" stroke={w.accent} strokeWidth="0.5" opacity="0.18" />
                          <circle cx="200" cy="100" r="25" fill="none" stroke={w.accent} strokeWidth="0.5" opacity="0.12" />
                          {/* Crosshair */}
                          <line x1="170" y1="100" x2="230" y2="100" stroke={w.accent} strokeWidth="0.5" opacity="0.3" />
                          <line x1="200" y1="70"  x2="200" y2="130" stroke={w.accent} strokeWidth="0.5" opacity="0.3" />
                          <text x="200" y="114" textAnchor="middle" fontFamily="Orbitron" fontSize="52" fill={w.accent} opacity="0.05">{w.num}</text>
                        </svg>
                        {/* Hover reveal */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ background: `${w.accent}10`, backdropFilter: "blur(4px)" }}>
                          <span className="font-rajdhani text-xs px-4 py-1.5 uppercase tracking-widest cut-corner"
                            style={{ background: w.accent, color: "var(--color-void)", fontWeight: 600 }}>
                            View Case Study →
                          </span>
                        </div>
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${w.accent}, transparent)`, opacity: 0.5 }} />
                      </div>

                      {/* Card info */}
                      <div className="p-5 glass-card">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-2">
                            {w.tags.map((t) => (
                              <span key={t} className="font-mono text-xs px-2 py-0.5 rounded"
                                style={{ background: `${w.accent}15`, color: w.accent }}>{t}</span>
                            ))}
                          </div>
                          <span className="font-orbitron text-xs opacity-20" style={{ color: w.accent }}>{w.num}</span>
                        </div>
                        <h3 className="font-orbitron text-base uppercase mb-1" style={{ color: "var(--color-chalk)" }}>{w.title}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--color-stone)" }}>{w.desc}</p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED BLOG ═════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <GeoShapes variant="copper" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-12">
            <p className="section-num mb-2">// 005 — WRITING</p>
            <h2 className="font-bebas leading-none" style={{ fontSize: "clamp(3rem,8vw,6rem)", color: "var(--color-chalk)" }}>
              THINKING{" "}<span className="gradient-text-geo">OUT LOUD</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={i * 80}>
                <TiltCard intensity={6} className="h-full">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="glass-card rounded-xl overflow-hidden h-full group">
                      {/* Visual */}
                      <div className="relative h-44 overflow-hidden" style={{ background: "rgba(13,11,7,0.8)" }}>
                        <svg viewBox="0 0 600 180" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                          <circle cx="300" cy="90" r="65" fill="none" stroke={post.tagColor} strokeWidth="0.5" opacity="0.25" />
                          <circle cx="300" cy="90" r="35" fill="none" stroke={post.tagColor} strokeWidth="0.5" opacity="0.15" />
                          <line x1="0" y1="90" x2="600" y2="90" stroke={post.tagColor} strokeWidth="0.4" opacity="0.15" strokeDasharray="4 8" />
                          <line x1="300" y1="0" x2="300" y2="180" stroke={post.tagColor} strokeWidth="0.4" opacity="0.15" strokeDasharray="4 8" />
                        </svg>
                        {/* Tag pill */}
                        <div className="absolute top-4 left-4">
                          <span className="font-mono text-xs px-2 py-1 rounded"
                            style={{ background: `${post.tagColor}20`, color: post.tagColor, border: `1px solid ${post.tagColor}30` }}>
                            {post.tag}
                          </span>
                        </div>
                      </div>
                      {/* Text */}
                      <div className="p-6">
                        <p className="font-mono text-xs mb-3" style={{ color: "var(--color-stone)" }}>{post.date}</p>
                        <h3 className="font-playfair italic text-xl mb-3 group-hover:text-copper transition-colors leading-snug"
                          style={{ color: "var(--color-chalk)" }}>{post.title}</h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-stone)" }}>{post.excerpt}</p>
                        <span className="font-mono text-xs" style={{ color: "var(--neon-cyan)" }}>Read →</span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MANIFESTO ═════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        <CircuitBoard />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal className="reveal mb-4">
            <p className="section-num">// 006 — MANIFESTO</p>
          </Reveal>
          <Reveal className="reveal">
            <h2 className="font-bebas leading-[0.9] mb-10" style={{ fontSize: "clamp(4rem,12vw,9rem)", color: "var(--color-chalk)" }}>
              BUILD.<br />
              <span className="holographic">CONNECT.</span><br />
              GROW.<br />
              <span style={{ color: "var(--color-stone)", opacity: 0.5 }}>REPEAT.</span>
            </h2>
          </Reveal>
          <Reveal className="reveal" delay={200}>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: "var(--color-stone)" }}>
              The best life is built at the intersection of doing physical things with your hands and creating digital things with your mind.
              Not specialising into a corner — understanding how everything connects.
            </p>
          </Reveal>
          <Reveal className="reveal" delay={400}>
            <MagneticButton as="a" href="/about" className="btn-holographic px-10 py-4 text-sm font-medium tracking-widest rounded-full uppercase inline-block">
              <span>Read My Full Story</span>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <CopperWire viewBox="0 0 400 80" d="M0,40 Q100,10 200,40 Q300,70 400,40" className="mb-8 opacity-40" />
          <Reveal className="reveal">
            <p className="font-caveat text-3xl mb-2" style={{ color: "var(--color-copper)" }}>Think alongside me.</p>
            <p className="text-sm mb-8" style={{ color: "var(--color-stone)" }}>
              Occasional writing on building, designing, and living. No spam. Ever.
            </p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex-1 float-label-group">
                <input type="email" placeholder=" " className="neon-input" />
                <label>your@email.com</label>
              </div>
              <MagneticButton as="button" className="btn-copper px-5 py-3 text-sm font-medium rounded whitespace-nowrap">
                <span>Subscribe</span>
              </MagneticButton>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
