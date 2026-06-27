"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./components/MagneticButton";
import TypeWriter from "./components/TypeWriter";

/* ─── Parallax hook ───────────────────────────────────────────── */
function useParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.parentElement!.getBoundingClientRect();
      const offset = -rect.top * speed;
      el.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ─── Scroll reveal ───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "none"; obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Animated counter ────────────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setN(Math.round(ease * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Work data ───────────────────────────────────────────────── */
const WORK = [
  {
    slug: "electrimap",
    word: "FIELD",
    accentIdx: 1,
    title: "ElectriMap",
    sub: "Mobile circuit diagramming for electricians. Offline-first.",
    year: "2025",
    cat: "Mobile App",
    img: "/images/project-electrimap.jpg",
    color: "#D4A843",
  },
  {
    slug: "terrain-journal",
    word: "TERRAIN",
    accentIdx: 0,
    title: "Terrain Journal",
    sub: "GPS outdoor journaling with trail overlays and photo pins.",
    year: "2025",
    cat: "Web App",
    img: "/images/project-terrain.jpg",
    color: "#34D399",
  },
  {
    slug: "rawpanel",
    word: "SYSTEM",
    accentIdx: 3,
    title: "RawPanel UI",
    sub: "An open design system for craftspeople who code.",
    year: "2026",
    cat: "Design System",
    img: "/images/project-rawpanel.jpg",
    color: "#A855F7",
  },
];

/* ─── Section heading with one accent letter ─────────────────── */
function AccentWord({ word, accentIdx, color = "var(--copper)", size = "clamp(5rem,18vw,16rem)" }: { word: string; accentIdx: number; color?: string; size?: string }) {
  return (
    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size, lineHeight: 0.88, letterSpacing: "0.01em", display: "inline-block" }}>
      {word.split("").map((ch, i) => (
        <span key={i} style={{ color: i === accentIdx ? color : "var(--chalk)", transition: "color 400ms" }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const parallax1 = useParallax(0.2);
  const parallax2 = useParallax(0.15);
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal(), r6 = useReveal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#000" }}>

        {/* Full-bleed background image */}
        <div ref={parallax1} style={{ position: "absolute", inset: "-15%", zIndex: 0 }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
          {/* Cinematic vignette */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.95) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
        </div>

        {/* Available badge */}
        <div style={{ position: "absolute", top: "clamp(5.5rem,10vw,7rem)", left: "clamp(1.25rem,4vw,2.5rem)", zIndex: 2, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", animation: "dot-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
            Available for work
          </span>
        </div>

        {/* Huge hero name — bottom-left anchor */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 clamp(1.25rem,4vw,2.5rem) clamp(2.5rem,5vw,4rem)" }}>

          {/* Big name */}
          <h1 style={{ margin: 0, lineHeight: 0.85, marginBottom: "clamp(1rem,2.5vw,2rem)" }}>
            {/* "JOS" normal, "I" copper accent, "AH" normal */}
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.5rem,20vw,20rem)", letterSpacing: "0.01em", display: "block" }}>
              <span style={{ color: "var(--chalk)" }}>JOS</span>
              <span style={{ color: "var(--copper)" }}>I</span>
              <span style={{ color: "var(--chalk)" }}>AH</span>
            </span>
          </h1>

          {/* Divider line */}
          <div style={{ width: "clamp(60px,8vw,120px)", height: 1, background: "rgba(255,255,255,0.2)", marginBottom: "clamp(1rem,2vw,1.5rem)" }} />

          {/* Tagline */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "flex-end", flexWrap: "wrap" }} className="hero-bottom">
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1rem,2.5vw,1.5rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, maxWidth: 480, marginBottom: 16 }}>
                I wire things — circuits, code, and connections.
              </p>
              {mounted && (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.3vw,12px)", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>→</span>
                  <TypeWriter
                    words={["Electrician.", "Developer.", "Designer.", "Explorer.", "Human."]}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.3vw,12px)", color: "var(--copper)", letterSpacing: "0.1em" }}
                  />
                </div>
              )}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
              <MagneticButton as="a" href="/portfolio" className="btn btn-primary" style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>
                View Work
              </MagneticButton>
              <MagneticButton as="a" href="/about" className="btn btn-ghost" style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>
                My Story
              </MagneticButton>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes dot-pulse { 0%,100%{box-shadow:0 0 8px #34D399} 50%{box-shadow:0 0 16px #34D399,0 0 30px rgba(52,211,153,0.4)} }
          @media(max-width:600px){.hero-bottom{grid-template-columns:1fr !important}}
        `}</style>
      </section>

      {/* ══════════════════ TICKER ════════════════ */}
      <div style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", padding: "14px 0" }}>
        <div style={{ display: "flex", animation: "marquee 24s linear infinite", width: "max-content" }}>
          {[...Array(3)].fill(["Electrician", "Developer", "Designer", "Explorer", "Human", "Builder", "Thinker", "Raw Signal"]).flat().map((w, i) => (
            <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.9rem,2vw,1.1rem)", letterSpacing: "0.15em", paddingRight: "clamp(1.5rem,3vw,2.5rem)", color: i % 5 === 2 ? "var(--copper)" : "rgba(255,255,255,0.2)" }}>
              {w}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee{to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* ══════════════════ STAT STRIP ════════════ */}
      <section style={{ background: "#0A0A0B", padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: "clamp(2rem,5vw,4rem)" }}>
          {[
            { n: 8, suf: "+", label: "Years in the trade" },
            { n: 40, suf: "+", label: "Projects shipped" },
            { n: 100, suf: "s", label: "Trails walked" },
            { n: 5, suf: "", label: "Disciplines mastered" },
          ].map((s) => (
            <div key={s.label} style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: "clamp(1.25rem,3vw,2rem)" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 1, color: "var(--chalk)", marginBottom: 6 }}>
                <Counter end={s.n} suffix={s.suf} />
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ WHO ════════════════════ */}
      <section style={{ background: "#000", padding: "clamp(5rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,8vw,8rem)", alignItems: "center" }} className="who-grid">
          <div ref={r1} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.8s cubic-bezier(0.25,1,0.5,1)" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 24 }}>// 001 — Signal</p>
            <div style={{ marginBottom: 32 }}>
              <AccentWord word="WHO" accentIdx={1} size="clamp(4rem,14vw,11rem)" />
              <br />
              <AccentWord word="IS" accentIdx={0} size="clamp(4rem,14vw,11rem)" color="var(--copper)" />
            </div>
            <p style={{ fontSize: "clamp(0.9rem,1.6vw,1.1rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: 440, marginBottom: 32 }}>
              An electrician who codes. A developer who designs. An explorer who builds. Not a portfolio of skills — a single way of thinking applied across different domains.
            </p>
            <Link href="/about" className="btn btn-ghost" style={{ fontSize: 12 }}>Read the full story →</Link>
          </div>

          {/* Identity list */}
          <div ref={r2} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.8s cubic-bezier(0.25,1,0.5,1) 120ms" }}>
            {[
              { num: "01", title: "The Electrician", color: "#D4A843" },
              { num: "02", title: "The Developer",   color: "#00C8FF" },
              { num: "03", title: "The Designer",    color: "#A855F7" },
              { num: "04", title: "The Explorer",    color: "#34D399" },
              { num: "05", title: "The Human",       color: "rgba(255,255,255,0.6)" },
            ].map((r, i) => (
              <Link key={r.num} href={`/about#${r.title.toLowerCase().replace("the ", "")}`}
                style={{ display: "flex", alignItems: "center", gap: 20, padding: "clamp(1rem,2vw,1.25rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "32px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "20px")}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: r.color, letterSpacing: "0.1em", minWidth: 28 }}>{r.num}</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", letterSpacing: "0.04em", color: "var(--chalk)", flex: 1 }}>{r.title}</span>
                <div style={{ width: 24, height: 1, background: r.color, opacity: 0.5 }} />
              </Link>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.who-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      {/* ══════════════════ WORK ═══════════════════ */}
      <section style={{ background: "#000" }}>
        {/* Section header */}
        <div style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem) clamp(2rem,4vw,3rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div ref={r3} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.8s cubic-bezier(0.25,1,0.5,1)" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>// 002 — Work</p>
              <AccentWord word="BUILT." accentIdx={3} size="clamp(3.5rem,12vw,9rem)" />
            </div>
            <MagneticButton as="a" href="/portfolio" className="btn btn-ghost" style={{ fontSize: 12 }}>
              All projects →
            </MagneticButton>
          </div>
        </div>

        {/* Full-bleed project rows */}
        {WORK.map((p, i) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}`} style={{ display: "block", textDecoration: "none" }}>
            <article
              style={{ position: "relative", height: "clamp(300px, 45vw, 580px)", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
              onMouseEnter={(e) => { const img = e.currentTarget.querySelector(".proj-img") as HTMLElement; if (img) img.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { const img = e.currentTarget.querySelector(".proj-img") as HTMLElement; if (img) img.style.transform = "scale(1)"; }}
            >
              {/* Background image */}
              <div className="proj-img" style={{ position: "absolute", inset: 0, transition: "transform 600ms cubic-bezier(0.25,1,0.5,1)" }}>
                {/* SVG placeholder — replace with real project images */}
                <svg viewBox="0 0 1440 580" style={{ width: "100%", height: "100%", position: "absolute" }} preserveAspectRatio="xMidYMid slice">
                  <rect width="1440" height="580" fill="#0A0A0B" />
                  <circle cx="720" cy="290" r="200" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.12" />
                  <circle cx="720" cy="290" r="100" fill="none" stroke={p.color} strokeWidth="0.5" opacity="0.08" />
                  <line x1="0" y1="290" x2="1440" y2="290" stroke={p.color} strokeWidth="0.4" opacity="0.06" strokeDasharray="4 12" />
                  <line x1="720" y1="0" x2="720" y2="580" stroke={p.color} strokeWidth="0.4" opacity="0.06" strokeDasharray="4 12" />
                  <text x="720" y="340" textAnchor="middle" fontFamily="Bebas Neue" fontSize="160" fill={p.color} opacity="0.03" letterSpacing="8">{p.title.toUpperCase()}</text>
                </svg>
                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${i % 2 === 0 ? "to right" : "to left"}, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)` }} />
              </div>

              {/* Text content */}
              <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.5rem,3vw,2.5rem) clamp(1.25rem,4vw,2.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)" }}>0{i + 1}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: p.color, textTransform: "uppercase" }}>{p.cat}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{p.year}</span>
                </div>

                <div>
                  {/* Massive project word */}
                  <div style={{ marginBottom: 12 }}>
                    <AccentWord word={p.word} accentIdx={p.accentIdx} color={p.color} size="clamp(3.5rem,10vw,7.5rem)" />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
                    <div>
                      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.8rem,1.5vw,1rem)", color: "rgba(255,255,255,0.6)", fontWeight: 500, letterSpacing: "0.06em", marginBottom: 6 }}>{p.title}</h2>
                      <p style={{ fontSize: "clamp(0.8rem,1.3vw,0.9375rem)", color: "rgba(255,255,255,0.3)", maxWidth: 400 }}>{p.sub}</p>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: "0.1em", flexShrink: 0 }}>View case study →</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>

      {/* ══════════════════ BELIEFS ════════════════ */}
      <section style={{ background: "#000", padding: "clamp(5rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={r4} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.8s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(3rem,7vw,6rem)" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>// 003 — Beliefs</p>
            <AccentWord word="SIGNAL." accentIdx={5} size="clamp(3.5rem,12vw,9rem)" color="var(--copper)" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(1.5rem,3vw,2.5rem)" }} className="beliefs-grid">
            {[
              { n: "01", t: "Every system is connected", body: "Whether it's a circuit, a codebase, or a conversation — nothing works in isolation.", accent: "var(--copper)" },
              { n: "02", t: "Craft is the respect you pay to the work", body: "Speed without care is noise. The detail no one sees is still worth getting right.", accent: "#00C8FF" },
              { n: "03", t: "The outdoors is the reset button", body: "Some problems can only be solved by stepping away from them.", accent: "#34D399" },
            ].map((b) => (
              <div key={b.n} style={{ borderTop: `1px solid ${b.accent}30`, paddingTop: "clamp(1.5rem,3vw,2rem)" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(3rem,6vw,5rem)", color: b.accent, opacity: 0.1, lineHeight: 1, marginBottom: 12, fontWeight: 700 }}>{b.n}</div>
                <div style={{ width: 24, height: 1, background: b.accent, marginBottom: 20, opacity: 0.6 }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1rem,2vw,1.2rem)", color: "var(--chalk)", lineHeight: 1.45, marginBottom: 12 }}>{b.t}</h3>
                <p style={{ fontSize: "clamp(0.8rem,1.3vw,0.9rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.75 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.beliefs-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      {/* ══════════════════ WRITING ════════════════ */}
      <section style={{ background: "#0A0A0B", padding: "clamp(5rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={r5} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.8s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(3rem,7vw,6rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>// 004 — Writing</p>
              <AccentWord word="WORDS." accentIdx={0} size="clamp(3.5rem,12vw,9rem)" color="#A855F7" />
            </div>
            <Link href="/blog" className="btn btn-ghost" style={{ fontSize: 12 }}>All writing →</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { slug: "wiring-panel-architecture", cat: "Electrical", date: "Jun 2026", title: "What wiring a panel taught me about architecture", color: "#D4A843" },
              { slug: "design-second-language",    cat: "Design",     date: "May 2026", title: "Design as a second language",                      color: "#A855F7" },
            ].map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,3vw,2.5rem)", padding: "clamp(1.25rem,3vw,2rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "clamp(1.5rem,4vw,3.5rem)")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "clamp(1rem,3vw,2.5rem)")}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", minWidth: 28 }}>0{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: post.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.cat}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2.5vw,1.5rem)", color: "var(--chalk)", lineHeight: 1.35 }}>{post.title}</h3>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.2)", flexShrink: 0, transition: "color 200ms" }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MANIFESTO ══════════════ */}
      <section style={{ background: "#000", position: "relative", overflow: "hidden", padding: "clamp(5rem,12vw,10rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        {/* Background image parallax */}
        <div ref={parallax2} style={{ position: "absolute", inset: "-15%", zIndex: 0, opacity: 0.08 }}>
          <Image src="/images/about.jpg" alt="" fill style={{ objectFit: "cover" }} sizes="100vw" />
        </div>

        <div ref={r6} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.9s cubic-bezier(0.25,1,0.5,1)", position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 32 }}>// 005 — Manifesto</p>
          <div style={{ marginBottom: 48 }}>
            {["BUILD.", "CONN", "ECT.", "GROW.", "REPEAT."].map((line, i) => {
              // Split "CONNECT." across two lines — "CONN" and "ECT." with accent on "C" of ECT
              const isAccentLine = line === "ECT.";
              const isAccentWord = line === "CONN";
              return (
                <div key={i} style={{ lineHeight: 0.88, overflow: "hidden", marginBottom: 4 }}>
                  {isAccentLine ? (
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem,18vw,15rem)", letterSpacing: "0.01em" }}>
                      <span style={{ color: "var(--cyan)" }}>E</span>
                      <span style={{ color: "var(--chalk)" }}>CT.</span>
                    </span>
                  ) : isAccentWord ? (
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem,18vw,15rem)", letterSpacing: "0.01em" }}>
                      <span style={{ color: "var(--chalk)" }}>CONN</span>
                    </span>
                  ) : (
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(5rem,18vw,15rem)",
                      letterSpacing: "0.01em",
                      color: i === 3 ? "rgba(255,255,255,0.12)" : "var(--chalk)",
                    }}>
                      {line}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
            <p style={{ fontSize: "clamp(0.9rem,1.6vw,1.1rem)", color: "rgba(255,255,255,0.4)", maxWidth: 480, lineHeight: 1.75 }}>
              The best work happens where physical systems, digital tools, and human attention meet. I build at that intersection.
            </p>
            <MagneticButton as="a" href="/contact" className="btn btn-primary">
              Start a conversation
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ═════════════ */}
      <section style={{ background: "#0A0A0B", padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.75rem,4vw,2.5rem)", color: "var(--copper)", marginBottom: 8 }}>Think alongside me.</p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.7 }}>
            Occasional writing on building, designing, and living. No spam. Ever.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" required
              style={{ flex: 1, minWidth: 220, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#EAEDF2", fontFamily: "'Inter',sans-serif", fontSize: "0.9375rem", padding: "0.875rem 1.125rem", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(200,123,47,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
