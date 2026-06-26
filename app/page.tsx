"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CopperWire from "./components/CopperWire";
import Reveal from "./components/RevealWrapper";

const ROLES = ["Electrician", "Developer", "Designer", "Explorer", "Human"];

const BELIEFS = [
  {
    num: "01",
    title: "Every system is connected",
    body: "Whether it's a circuit, a codebase, or a conversation — nothing works in isolation. Understanding the whole changes how you work on any single part.",
  },
  {
    num: "02",
    title: "Craft is the respect you pay to the work",
    body: "Speed without care is just noise. The detail no one sees is still worth getting right. The standard you hold in private becomes the standard you deliver in public.",
  },
  {
    num: "03",
    title: "The outdoors is the reset button",
    body: "Some problems can only be solved by stepping away from them. Nature has a way of dissolving the noise and returning you to what actually matters.",
  },
];

const WORK = [
  {
    title: "ElectriMap",
    tags: ["App Design", "Development"],
    desc: "A mobile tool for electricians to diagram circuits on-site.",
    slug: "electrimap",
  },
  {
    title: "Terrain Journal",
    tags: ["Web Design"],
    desc: "A minimal digital journal for outdoor adventures.",
    slug: "terrain-journal",
  },
  {
    title: "RawPanel UI",
    tags: ["Design System"],
    desc: "An open design system built for craftspeople who code.",
    slug: "rawpanel",
  },
];

const POSTS = [
  {
    title: "What wiring a panel taught me about architecture",
    tag: "⚡ Electrical",
    tagColor: "var(--color-wire)",
    date: "June 2026",
    excerpt:
      "There's a moment when you're looking at a breaker panel that feels exactly like looking at a complex codebase. The mental model transfers.",
    slug: "wiring-panel-architecture",
  },
  {
    title: "Design as a second language",
    tag: "🎨 Design",
    tagColor: "var(--color-ember)",
    date: "May 2026",
    excerpt:
      "Learning to design after years of writing code was like learning to speak after years of only reading. The grammar was already there.",
    slug: "design-second-language",
  },
];

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "var(--color-void)" }}
      >
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full hero-photo">
            <Image
              src="/images/hero.jpg"
              alt="Josiah in nature"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0" style={{ background: "rgba(13,11,7,0.82)" }} />
        </div>

        <div className="absolute inset-0 z-[2] pointer-events-none">
          <CopperWire
            viewBox="0 0 1440 900"
            d="M-10,700 Q200,400 400,500 Q600,600 720,460 Q840,320 1000,400 Q1200,480 1440,350"
            className="h-full"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="mb-4">
            <span
              className="font-mono text-sm px-3 py-1 border rounded-full"
              style={{
                borderColor: "var(--color-copper)",
                color: "var(--color-copper)",
                opacity: roleVisible ? 1 : 0,
                transition: "opacity 250ms ease",
              }}
            >
              ⚡ {ROLES[roleIdx]}
            </span>
          </div>

          <h1
            className="font-bebas leading-none mb-4"
            style={{ fontSize: "clamp(5rem,14vw,11rem)", color: "var(--color-chalk)" }}
          >
            JOSIAH
          </h1>

          <p
            className="font-playfair italic max-w-xl mb-10"
            style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "var(--color-stone)" }}
          >
            I wire things — circuits, code, and connections.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            {[
              { href: "/portfolio", label: "View My Work" },
              { href: "/blog",      label: "Read My Blog" },
              { href: "/contact",   label: "Say Hello" },
            ].map((cta) => (
              <Link key={cta.href} href={cta.href} className="btn-copper px-6 py-3 text-sm font-medium tracking-wide rounded">
                <span>{cta.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: "⚡", label: "Electrician", color: "var(--color-wire)"  },
              { icon: "💻", label: "Developer",   color: "var(--color-sky)"   },
              { icon: "🎨", label: "Designer",    color: "var(--color-ember)" },
              { icon: "🌿", label: "Explorer",    color: "var(--color-moss)"  },
              { icon: "🧠", label: "Human",       color: "var(--color-stone)" },
            ].map((b) => (
              <span
                key={b.label}
                className="font-mono text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${b.color}50`, color: b.color, background: `${b.color}12` }}
              >
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>

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

      {/* ── IDENTITY STRIPS ──────────────────────────────── */}
      <section style={{ background: "var(--color-earth)" }} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="reveal mb-16">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Identity</p>
            <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>MANY THINGS, ONE PERSON</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Electrician", emoji: "⚡", color: "var(--color-wire)",   quote: "Every wire has a purpose." },
              { label: "Developer",   emoji: "💻", color: "var(--color-sky)",    quote: "Code is electricity for ideas." },
              { label: "Designer",    emoji: "🎨", color: "var(--color-ember)",  quote: "Design is how it works." },
              { label: "Explorer",    emoji: "🌿", color: "var(--color-moss)",   quote: "Walk until clarity comes." },
              { label: "Human",       emoji: "🧠", color: "var(--color-stone)",  quote: "Being alive is the point." },
            ].map((strip, i) => (
              <Reveal key={strip.label} className="reveal" delay={i * 80}>
                <div
                  className="relative h-72 md:h-80 rounded overflow-hidden group cursor-pointer photo-panel"
                  style={{ border: `1px solid ${strip.color}30` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,11,7,0.5)" }}>
                    <span className="text-6xl opacity-20">{strip.emoji}</span>
                  </div>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,11,7,0.95) 30%, transparent)" }} />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-bebas text-xl" style={{ color: strip.color }}>{strip.emoji} {strip.label}</p>
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

      {/* ── THREE BELIEFS ────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-void)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="reveal mb-16 text-center">
            <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>THREE THINGS I BELIEVE</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {BELIEFS.map((b, i) => (
              <Reveal key={b.num} className="reveal face-card rounded p-8" delay={i * 120}
                style={{ background: "rgba(26,18,8,0.6)", border: "1px solid rgba(184,115,51,0.15)" } as React.CSSProperties}
              >
                <p className="font-bebas mb-4" style={{ fontSize: "5rem", color: "rgba(184,115,51,0.15)", lineHeight: 1 }}>{b.num}</p>
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

      {/* ── FEATURED WORK ────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <Reveal className="reveal">
              <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Selected Work</p>
              <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>THINGS I&apos;VE BUILT</h2>
            </Reveal>
            <Link href="/portfolio" className="font-mono text-sm hidden md:block" style={{ color: "var(--color-copper)" }}>
              See All Work →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {WORK.map((w, i) => (
              <Reveal key={w.slug} className="reveal-scale" delay={i * 80}>
                <Link href={`/portfolio/${w.slug}`} className="block card-hover rounded overflow-hidden" style={{ border: "1px solid rgba(184,115,51,0.15)" }}>
                  <div className="relative h-52 overflow-hidden" style={{ background: "rgba(13,11,7,0.8)" }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bebas text-8xl opacity-5" style={{ color: "var(--color-copper)" }}>{w.tags[0]}</span>
                    </div>
                  </div>
                  <div className="p-5" style={{ background: "rgba(13,11,7,0.4)" }}>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {w.tags.map((t) => (
                        <span key={t} className="font-mono text-xs" style={{ color: "var(--color-copper)" }}>{t}</span>
                      ))}
                    </div>
                    <h3 className="font-bebas text-2xl mb-1" style={{ color: "var(--color-chalk)" }}>{w.title}</h3>
                    <p className="text-sm" style={{ color: "var(--color-stone)" }}>{w.desc}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BLOG ────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-void)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="reveal mb-12">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// From the Blog</p>
            <h2 className="font-bebas text-6xl md:text-7xl" style={{ color: "var(--color-chalk)" }}>THINKING OUT LOUD</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className="block card-hover rounded overflow-hidden group" style={{ border: "1px solid rgba(184,115,51,0.15)" }}>
                  <div className="relative h-48 overflow-hidden flex items-center justify-center" style={{ background: "rgba(13,11,7,0.8)" }}>
                    <span className="font-bebas text-9xl opacity-5" style={{ color: "var(--color-copper)" }}>✦</span>
                  </div>
                  <div className="p-6" style={{ background: "rgba(26,18,8,0.6)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${post.tagColor}20`, color: post.tagColor }}>{post.tag}</span>
                      <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{post.date}</span>
                    </div>
                    <h3 className="font-playfair italic text-xl mb-3" style={{ color: "var(--color-chalk)" }}>{post.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>{post.excerpt}</p>
                    <p className="font-mono text-xs mt-4" style={{ color: "var(--color-copper)" }}>Read →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO STRIP ──────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-earth)" }}>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Reveal className="reveal">
            <h2 className="font-bebas leading-none mb-8" style={{ fontSize: "clamp(3rem,10vw,7rem)", color: "var(--color-chalk)" }}>
              BUILD. CONNECT. GROW. REPEAT.
            </h2>
          </Reveal>
          <Reveal className="reveal" delay={200}>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "var(--color-stone)" }}>
              I believe the best life is built at the intersection of doing physical things with your hands and creating digital things with your mind.
              I am not trying to specialise into a corner. I am trying to understand how everything connects.
            </p>
          </Reveal>
          <Reveal className="reveal mt-8" delay={400}>
            <Link href="/about" className="btn-copper px-8 py-4 text-sm font-medium tracking-wide rounded inline-block">
              <span>Read My Story</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-void)" }}>
        <div className="max-w-xl mx-auto px-6 text-center">
          <CopperWire viewBox="0 0 400 80" d="M0,40 Q100,10 200,40 Q300,70 400,40" className="mb-8 opacity-60" />
          <Reveal className="reveal">
            <p className="font-caveat text-2xl mb-2" style={{ color: "var(--color-copper)" }}>Think alongside me.</p>
            <p className="text-sm mb-8" style={{ color: "var(--color-stone)" }}>
              Occasional writing on building, designing, and living. No spam. Ever.
            </p>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-sm rounded border outline-none"
                style={{ background: "rgba(26,18,8,0.6)", border: "1px solid rgba(184,115,51,0.3)", color: "var(--color-chalk)" }}
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
