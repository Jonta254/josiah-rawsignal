"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CopperWire from "./components/CopperWire";
import Reveal from "./components/RevealWrapper";
import GeoShapes from "./components/GeoShapes";

const ROLES = ["Electrician", "Developer", "Designer", "Explorer", "Human"];

const BELIEFS = [
  {
    num: "01",
    title: "Every system is connected",
    body: "Whether it's a circuit, a codebase, or a conversation — nothing works in isolation. Understanding the whole changes how you work on any single part.",
    accent: "var(--color-copper)",
  },
  {
    num: "02",
    title: "Craft is the respect you pay to the work",
    body: "Speed without care is just noise. The detail no one sees is still worth getting right. The standard you hold in private becomes the standard you deliver in public.",
    accent: "var(--neon-cyan)",
  },
  {
    num: "03",
    title: "The outdoors is the reset button",
    body: "Some problems can only be solved by stepping away from them. Nature has a way of dissolving the noise and returning you to what actually matters.",
    accent: "var(--color-moss)",
  },
];

const WORK = [
  { title: "ElectriMap", tags: ["App Design", "Development"], desc: "A mobile tool for electricians to diagram circuits on-site.", slug: "electrimap", accent: "var(--geo-teal)" },
  { title: "Terrain Journal", tags: ["Web Design"], desc: "A minimal digital journal for outdoor adventures.", slug: "terrain-journal", accent: "var(--geo-purple)" },
  { title: "RawPanel UI", tags: ["Design System"], desc: "An open design system built for craftspeople who code.", slug: "rawpanel", accent: "var(--color-copper)" },
];

const POSTS = [
  {
    title: "What wiring a panel taught me about architecture",
    tag: "⚡ Electrical", tagColor: "var(--color-wire)",
    date: "June 2026",
    excerpt: "There's a moment looking at a breaker panel that feels exactly like a complex codebase. Every circuit is a module. Every breaker is a boundary.",
    slug: "wiring-panel-architecture",
  },
  {
    title: "Design as a second language",
    tag: "🎨 Design", tagColor: "var(--color-ember)",
    date: "May 2026",
    excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading. The grammar was already there.",
    slug: "design-second-language",
  },
];

const STATS = [
  { label: "Years in the trade", value: "8+" },
  { label: "Projects shipped",   value: "40+" },
  { label: "Lines of code",      value: "∞" },
  { label: "Trails walked",      value: "100s" },
];

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => { setRoleIdx((i) => (i + 1) % ROLES.length); setRoleVisible(true); }, 300);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--color-void)" }}>
        {/* Geometric background shapes */}
        <GeoShapes variant="cyan" />

        {/* Hero photo */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full hero-photo">
            <Image src="/images/hero.jpg" alt="Josiah" fill className="object-cover" priority sizes="100vw" />
          </div>
          <div className="absolute inset-0" style={{ background: "rgba(13,11,7,0.84)" }} />
        </div>

        {/* Copper wire */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <CopperWire viewBox="0 0 1440 900" d="M-10,700 Q200,400 400,500 Q600,600 720,460 Q840,320 1000,400 Q1200,480 1440,350" className="h-full" />
        </div>

        {/* Neon scan lines (subtle) */}
        <div className="absolute inset-0 z-[3] pointer-events-none scan-lines" style={{ opacity: 0.3 }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          {/* Role badge */}
          <div className="mb-5">
            <span
              className="font-rajdhani text-sm px-3 py-1.5 cut-corner uppercase tracking-widest"
              style={{
                border: "1px solid var(--neon-cyan)",
                color: "var(--neon-cyan)",
                background: "rgba(0,255,255,0.06)",
                boxShadow: "0 0 12px rgba(0,255,255,0.15)",
                opacity: roleVisible ? 1 : 0,
                transition: "opacity 250ms ease",
                display: "inline-block",
              }}
            >
              ⚡ {ROLES[roleIdx]}
            </span>
          </div>

          {/* Name with glitch */}
          <h1
            className="font-bebas leading-none mb-2 glitch"
            data-text="JOSIAH"
            style={{ fontSize: "clamp(5rem,14vw,11rem)", color: "var(--color-chalk)" }}
          >
            JOSIAH
          </h1>

          {/* Sub-name with neon */}
          <div className="font-orbitron text-sm tracking-widest mb-6" style={{ color: "var(--color-stone)" }}>
            <span style={{ color: "var(--neon-cyan)" }}>RAW</span>{" "}
            <span style={{ color: "var(--color-copper)" }}>SIGNAL</span>
            <span className="ml-3 font-mono text-xs" style={{ color: "rgba(184,115,51,0.5)" }}>// v2.0</span>
          </div>

          {/* Tagline */}
          <p className="font-playfair italic max-w-xl mb-10" style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "var(--color-stone)" }}>
            I wire things — circuits, code, and connections.
          </p>

          {/* CTAs — three styles, one per design direction */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link href="/portfolio" className="btn-copper px-6 py-3 text-sm font-medium tracking-wide rounded">
              <span>View My Work</span>
            </Link>
            <Link href="/blog" className="btn-neon cut-corner px-6 py-3 text-sm font-rajdhani tracking-wider uppercase">
              <span>Read My Blog</span>
            </Link>
            <Link href="/contact" className="btn-geo px-6 py-3 text-sm font-medium rounded">
              Say Hello
            </Link>
          </div>

          {/* Identity badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: "⚡", label: "Electrician", color: "var(--color-wire)",   bg: "rgba(212,168,67,0.1)"  },
              { icon: "💻", label: "Developer",   color: "var(--neon-cyan)",    bg: "rgba(0,255,255,0.06)"  },
              { icon: "🎨", label: "Designer",    color: "var(--geo-pink)",     bg: "rgba(255,87,127,0.08)" },
              { icon: "🌿", label: "Explorer",    color: "var(--color-moss)",   bg: "rgba(74,124,89,0.1)"   },
              { icon: "🧠", label: "Human",       color: "var(--color-stone)",  bg: "rgba(140,134,121,0.1)" },
            ].map((b) => (
              <span
                key={b.label}
                className="font-mono text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${b.color}50`, color: b.color, background: b.bg }}
              >
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>scroll</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, var(--color-copper), transparent)" }} />
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: "var(--color-void)", marginBottom: "-2px" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px", width: "100%", display: "block" }}>
          <path d="M0,60 Q360,0 720,40 Q1080,80 1440,20 L1440,60 Z" fill="var(--color-earth)" />
          <path d="M0,60 Q360,0 720,40 Q1080,80 1440,20" stroke="var(--color-copper)" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        </svg>
      </div>

      {/* ══ STATS STRIP ══════════════════════════════════════════════════════ */}
      <section className="py-12 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.label} className="reveal text-center glass-card p-6 rounded" delay={i * 80}>
                <p className="font-orbitron text-3xl md:text-4xl mb-1 gradient-text">{s.value}</p>
                <p className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IDENTITY STRIPS ══════════════════════════════════════════════════ */}
      <section style={{ background: "var(--color-earth)" }} className="py-24 relative overflow-hidden">
        <GeoShapes variant="copper" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-16">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Identity</p>
            <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>MANY THINGS,&nbsp;
              <span className="gradient-text-geo">ONE PERSON</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Electrician", emoji: "⚡", color: "var(--color-wire)",  border: "rgba(212,168,67,0.3)", quote: "Every wire has a purpose." },
              { label: "Developer",   emoji: "💻", color: "var(--neon-cyan)",   border: "rgba(0,255,255,0.25)", quote: "Code is electricity for ideas." },
              { label: "Designer",    emoji: "🎨", color: "var(--geo-pink)",    border: "rgba(255,87,127,0.25)",quote: "Design is how it works." },
              { label: "Explorer",    emoji: "🌿", color: "var(--color-moss)",  border: "rgba(74,124,89,0.3)",  quote: "Walk until clarity comes." },
              { label: "Human",       emoji: "🧠", color: "var(--color-stone)", border: "rgba(140,134,121,0.25)",quote: "Being alive is the point." },
            ].map((strip, i) => (
              <Reveal key={strip.label} className="reveal photo-panel" delay={i * 80}>
                <div
                  className="relative h-72 md:h-80 rounded overflow-hidden group cursor-pointer glass-card"
                  style={{ border: `1px solid ${strip.border}` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,11,7,0.3)" }}>
                    <span className="text-7xl opacity-15">{strip.emoji}</span>
                  </div>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,11,7,0.95) 30%, transparent)" }} />
                  {/* Neon top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: strip.color, boxShadow: `0 0 8px ${strip.color}` }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-orbitron text-sm uppercase" style={{ color: strip.color }}>{strip.emoji} {strip.label}</p>
                    <p className="font-caveat text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--color-chalk)" }}>
                      &ldquo;{strip.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ THREE BELIEFS (Glassmorphism cards) ══════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        {/* Neon wire threading */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg viewBox="0 0 1440 600" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,300 Q360,100 720,300 Q1080,500 1440,300" className="copper-path" />
            <path d="M0,300 Q360,100 720,300 Q1080,500 1440,300" className="neon-wire-glow" />
          </svg>
        </div>
        <GeoShapes variant="purple" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-16 text-center">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--neon-cyan)" }}>// Core beliefs</p>
            <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>THREE THINGS I BELIEVE</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.num} className="reveal glass-card rounded-lg p-8" delay={i * 120}>
                <p className="font-orbitron mb-4" style={{ fontSize: "4rem", color: `${b.accent}20`, lineHeight: 1 }}>{b.num}</p>
                <div className="w-8 h-0.5 mb-4" style={{ background: b.accent, boxShadow: `0 0 8px ${b.accent}` }} />
                <h3 className="font-playfair italic text-xl mb-4" style={{ color: "var(--color-chalk)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <div style={{ background: "var(--color-void)" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "60px", width: "100%", display: "block" }}>
          <path d="M0,0 Q360,60 720,20 Q1080,-20 1440,40 L1440,0 Z" fill="var(--color-earth)" />
        </svg>
      </div>

      {/* ══ FEATURED WORK ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <Reveal className="reveal">
              <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Selected Work</p>
              <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>THINGS I&apos;VE BUILT</h2>
            </Reveal>
            <Link href="/portfolio" className="font-orbitron text-xs hidden md:block uppercase tracking-widest" style={{ color: "var(--neon-cyan)" }}>
              See All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {WORK.map((w, i) => (
              <Reveal key={w.slug} className="reveal-scale" delay={i * 80}>
                <Link href={`/portfolio/${w.slug}`} className="block card-hover copper-glow-border rounded-lg overflow-hidden group">
                  {/* Card top — geometric accent */}
                  <div className="relative h-52 overflow-hidden" style={{ background: "rgba(13,11,7,0.9)" }}>
                    <div className="absolute inset-0">
                      <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <polygon points="200,10 390,190 10,190" fill="none" stroke={w.accent} strokeWidth="0.5" opacity="0.3" />
                        <circle cx="200" cy="100" r="60" fill="none" stroke={w.accent} strokeWidth="0.5" opacity="0.2" />
                        <text x="200" y="115" textAnchor="middle" fontFamily="Orbitron" fontSize="60" fill={w.accent} opacity="0.06">{w.title[0]}</text>
                      </svg>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `${w.accent}12` }}
                    >
                      <span className="font-rajdhani text-xs px-3 py-1 uppercase tracking-widest cut-corner"
                        style={{ background: w.accent, color: "var(--color-void)" }}>
                        View Case Study →
                      </span>
                    </div>
                  </div>
                  <div className="p-5 glass-card" style={{ borderTop: `1px solid ${w.accent}30` }}>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {w.tags.map((t) => (
                        <span key={t} className="font-mono text-xs px-2 py-0.5 rounded" style={{ color: w.accent, background: `${w.accent}15` }}>{t}</span>
                      ))}
                    </div>
                    <h3 className="font-orbitron text-lg mb-1 uppercase" style={{ color: "var(--color-chalk)" }}>{w.title}</h3>
                    <p className="text-sm" style={{ color: "var(--color-stone)" }}>{w.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED BLOG ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <GeoShapes variant="cyan" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-12">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--neon-cyan)" }}>// From the Blog</p>
            <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>THINKING OUT LOUD</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden flex items-center justify-center" style={{ background: "rgba(13,11,7,0.6)" }}>
                      {/* Geo accent in blog card */}
                      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <circle cx="200" cy="100" r="70" fill="none" stroke={post.tagColor} strokeWidth="0.5" opacity="0.3" />
                        <circle cx="200" cy="100" r="40" fill="none" stroke={post.tagColor} strokeWidth="0.5" opacity="0.2" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke={post.tagColor} strokeWidth="0.3" opacity="0.2" />
                        <line x1="200" y1="0" x2="200" y2="200" stroke={post.tagColor} strokeWidth="0.3" opacity="0.2" />
                      </svg>
                      <span className="font-orbitron text-7xl opacity-5" style={{ color: post.tagColor }}>✦</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${post.tagColor}20`, color: post.tagColor }}>{post.tag}</span>
                        <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{post.date}</span>
                      </div>
                      <h3 className="font-playfair italic text-xl mb-3 group-hover:text-copper transition-colors" style={{ color: "var(--color-chalk)" }}>{post.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>{post.excerpt}</p>
                      <p className="font-mono text-xs mt-4" style={{ color: "var(--neon-cyan)" }}>Read →</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MANIFESTO ════════════════════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        {/* Neon grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
          <svg viewBox="0 0 1440 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {[...Array(10)].map((_, i) => <line key={`v${i}`} x1={i * 160} y1="0" x2={i * 160} y2="400" stroke="var(--neon-cyan)" strokeWidth="1" />)}
            {[...Array(6)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 80} x2="1440" y2={i * 80} stroke="var(--neon-cyan)" strokeWidth="1" />)}
          </svg>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal className="reveal">
            <h2 className="font-bebas leading-none mb-6" style={{ fontSize: "clamp(3rem,10vw,7rem)", color: "var(--color-chalk)" }}>
              BUILD.{" "}
              <span className="gradient-text">CONNECT.</span>
              {" "}GROW. REPEAT.
            </h2>
          </Reveal>
          <Reveal className="reveal" delay={200}>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-10" style={{ color: "var(--color-stone)" }}>
              I believe the best life is built at the intersection of doing physical things with your hands and creating digital things with your mind.
              Not specialising into a corner — understanding how everything connects.
            </p>
          </Reveal>
          <Reveal className="reveal" delay={400}>
            <Link href="/about" className="btn-copper px-10 py-4 text-sm font-medium tracking-wide rounded inline-block">
              <span>Read My Story</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ NEWSLETTER ═══════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <CopperWire viewBox="0 0 400 80" d="M0,40 Q100,10 200,40 Q300,70 400,40" className="mb-8 opacity-60" />
          <Reveal className="reveal">
            <p className="font-caveat text-3xl mb-2" style={{ color: "var(--color-copper)" }}>Think alongside me.</p>
            <p className="text-sm mb-8" style={{ color: "var(--color-stone)" }}>
              Occasional writing on building, designing, and living. No spam. Ever.
            </p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-sm rounded border outline-none transition-colors focus:border-copper"
                style={{ background: "rgba(26,18,8,0.7)", border: "1px solid rgba(184,115,51,0.3)", color: "var(--color-chalk)" }}
              />
              <button type="submit" className="btn-copper px-5 py-3 text-sm font-medium rounded">
                <span>Subscribe</span>
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
