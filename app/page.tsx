"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "./components/MagneticButton";
import TypeWriter from "./components/TypeWriter";
import Signature from "./components/Signature";

const HeroOrb   = dynamic(() => import("./components/SignalOrb"),  { ssr: false });
const HeroScene = dynamic(() => import("./components/HeroScene"), { ssr: false });

/* ─── Parallax ────────────────────────────────────────────────── */
function useParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.parentElement!.getBoundingClientRect();
      el.style.transform = `translateY(${-rect.top * speed}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

/* ─── Reveal ──────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const delayRef = useRef(delay);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const d = delayRef.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "none"; }, d);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Counter ─────────────────────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const start = performance.now();
        const dur = 1500;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          setN(Math.round((1 - Math.pow(1 - t, 3)) * end));
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

/* ─── Accent word ─────────────────────────────────────────────── */
function Accent({ word, idx, color = "var(--copper)", size = "clamp(4rem,14vw,11rem)" }: {
  word: string; idx: number; color?: string; size?: string;
}) {
  return (
    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size, lineHeight: 0.88, letterSpacing: "0.01em", display: "inline-block" }}>
      {word.split("").map((ch, i) => (
        <span key={i} style={{ color: i === idx ? color : "var(--chalk)" }}>{ch}</span>
      ))}
    </span>
  );
}

/* ─── Work data ───────────────────────────────────────────────── */
const WORK = [
  { slug: "electrimap",      word: "FIELD",   idx: 1, title: "ElectriMap",     sub: "Mobile circuit diagramming for electricians. Offline-first.",     year: "2025", cat: "Mobile App",    color: "#D4A843" },
  { slug: "terrain-journal", word: "TERRAIN", idx: 0, title: "Terrain Journal", sub: "GPS outdoor journaling with trail overlays and photo pins.",       year: "2025", cat: "Web App",       color: "#34D399" },
  { slug: "rawpanel",        word: "SYSTEM",  idx: 3, title: "RawPanel UI",     sub: "An open design system for craftspeople who code.",                 year: "2026", cat: "Design System", color: "#A855F7" },
];

const BELIEFS = [
  { n: "01", t: "Every system is connected",            body: "Whether it's a circuit, a codebase, or a conversation — nothing works in isolation.", accent: "var(--copper)" },
  { n: "02", t: "Craft is the respect you pay to work", body: "Speed without care is noise. The detail no one sees is still worth getting right.",    accent: "#00C8FF" },
  { n: "03", t: "The outdoors is the reset button",     body: "Some problems can only be solved by stepping away from them.",                          accent: "#34D399" },
];

const POSTS = [
  { slug: "wiring-panel-architecture", cat: "Electrical", date: "Jun 2026", title: "What wiring a panel taught me about architecture", color: "#D4A843" },
  { slug: "design-second-language",    cat: "Design",     date: "May 2026", title: "Design as a second language",                      color: "#A855F7" },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const parallax1 = useParallax(0.18);
  const parallax2 = useParallax(0.12);
  const r1 = useReveal(0), r2 = useReveal(80);
  const r3 = useReveal(0), r4 = useReveal(0), r5 = useReveal(0), r6 = useReveal(0);
  const [mounted, setMounted] = useState(false);
  const [ghRepos, setGhRepos] = useState<number | null>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { scrollY.current = window.scrollY; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    // GitHub live repo count
    fetch("https://api.github.com/users/Jonta254")
      .then((r) => r.json())
      .then((d) => { if (d.public_repos) setGhRepos(d.public_repos); })
      .catch(() => {});
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* ══════════════════ HERO ══════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#020208" }}>

        {/* ── 3D deep-space background scene ── */}
        {mounted && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <HeroScene scrollY={scrollY} mouse={mouse} />
          </div>
        )}

        {/* ── Subtle radial vignette over 3D scene ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(2,2,8,0.55) 100%)" }} />

        {/* ── Photo texture — very dim, grounds the scene ── */}
        <div ref={parallax1} style={{ position: "absolute", inset: "-15%", zIndex: 1, pointerEvents: "none", opacity: 0.1, mixBlendMode: "luminosity" }}>
          <Image src="/images/hero.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />
        </div>

        {/* ── Bottom fade to page ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(2,2,8,0.85) 80%, #020208 100%)" }} />

        {/* ── Left text fade ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(2,2,8,0.6) 0%, rgba(2,2,8,0.2) 40%, transparent 65%)" }} />

        {/* ── 3D orb — desktop right side ── */}
        {mounted && (
          <div className="hero-orb-wrap" style={{ position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)", width: "52vw", height: "80vh", zIndex: 3, pointerEvents: "none" }}>
            <HeroOrb mouse={mouse} scrollY={scrollY} fov={44} distance={5} glowIntensity={2.2} />
          </div>
        )}

        {/* Available badge */}
        <div style={{ position: "absolute", top: "clamp(5rem,10vw,7rem)", left: "clamp(1.25rem,4vw,2.5rem)", zIndex: 5, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", animation: "sig-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>
            Available for work
          </span>
        </div>

        {/* Hero content — responsive via .hero-content class */}
        <div className="hero-content" style={{ position: "relative", zIndex: 5, padding: "0 clamp(1.25rem,4vw,2.5rem) clamp(2.5rem,5vw,4.5rem)" }}>

          <h1 style={{ margin: 0, lineHeight: 0.85, marginBottom: "clamp(1rem,2.5vw,1.75rem)" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.5rem,20vw,20rem)", letterSpacing: "0.01em", display: "block" }}>
              <span style={{ color: "var(--chalk)" }}>JOS</span>
              <span style={{ color: "var(--copper)" }}>I</span>
              <span style={{ color: "var(--chalk)" }}>AH</span>
            </span>
          </h1>

          <div style={{ width: "clamp(60px,8vw,120px)", height: 1, background: "rgba(255,255,255,0.2)", marginBottom: "clamp(1rem,2vw,1.5rem)" }} />

          <div className="hero-bottom">
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,2.2vw,1.45rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.5, maxWidth: 460, marginBottom: 14 }}>
                I wire things — circuits, code, and connections.
              </p>
              {mounted && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.3vw,12px)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>→</span>
                  <TypeWriter
                    words={["Electrician.", "Developer.", "Designer.", "Explorer.", "Human."]}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.3vw,12px)", color: "var(--copper)", letterSpacing: "0.1em" }}
                  />
                </div>
              )}
            </div>
            <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <MagneticButton as="a" href="/portfolio" className="btn btn-primary" style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>View Work</MagneticButton>
              <MagneticButton as="a" href="/about"     className="btn btn-ghost"   style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>My Story</MagneticButton>
            </div>
          </div>
        </div>

        <style>{`@keyframes sig-pulse{0%,100%{box-shadow:0 0 8px #34D399}50%{box-shadow:0 0 18px #34D399,0 0 32px rgba(52,211,153,0.4)}}`}</style>
      </section>

      {/* ══════════════════ TICKER ════════════════════════════════ */}
      <div style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", padding: "14px 0" }} aria-hidden="true">
        <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>
          {[...Array(3)].fill(["Electrician","Developer","Designer","Explorer","Human","Builder","Thinker","Raw Signal"]).flat().map((w, i) => (
            <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.85rem,2vw,1.1rem)", letterSpacing: "0.15em", paddingRight: "clamp(1.25rem,3vw,2.5rem)", color: i % 5 === 2 ? "var(--copper)" : "rgba(255,255,255,0.18)" }}>
              {w}
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee{to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* ══════════════════ STATS ═════════════════════════════════ */}
      <section style={{ background: "#0A0A0B", padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-grid">
            {[
              { n: 8,   suf: "+",  label: "Years in the trade",    live: false },
              { n: ghRepos ?? 40, suf: ghRepos ? "" : "+", label: ghRepos ? "GitHub repos" : "Projects shipped", live: !!ghRepos },
              { n: 100, suf: "s",  label: "Trails walked",          live: false },
              { n: 5,   suf: "",   label: "Disciplines mastered",   live: false },
            ].map((s) => (
              <div key={s.label} style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", paddingLeft: "clamp(1rem,3vw,2rem)" }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 1, color: "var(--chalk)", marginBottom: 6, display: "flex", alignItems: "baseline", gap: 8 }}>
                  <Counter end={s.n} suffix={s.suf} />
                  {s.live && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "#34D399", letterSpacing: "0.12em", paddingBottom: 4 }}>LIVE</span>}
                </div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHO IS ════════════════════════════════ */}
      <section style={{ background: "#000", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="who-grid">
            <div ref={r1} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 24 }}>// 001 — Signal</p>
              <div style={{ marginBottom: 28 }}>
                <Accent word="WHO" idx={1} size="clamp(3.5rem,13vw,11rem)" />
                <br />
                <Accent word="IS"  idx={0} size="clamp(3.5rem,13vw,11rem)" color="var(--copper)" />
              </div>
              <p style={{ fontSize: "clamp(0.9rem,1.6vw,1.1rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", maxWidth: 440, marginBottom: 32 }}>
                An electrician who codes. A developer who designs. An explorer who builds. Not a portfolio of skills — a single way of thinking applied across different domains.
              </p>
              <Link href="/about" className="btn btn-ghost" style={{ fontSize: 12 }}>Read the full story →</Link>
            </div>

            <div ref={r2} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1) 80ms" }}>
              {[
                { num: "01", title: "The Electrician", color: "#D4A843" },
                { num: "02", title: "The Developer",   color: "#00C8FF" },
                { num: "03", title: "The Designer",    color: "#A855F7" },
                { num: "04", title: "The Explorer",    color: "#34D399" },
                { num: "05", title: "The Human",       color: "rgba(255,255,255,0.55)" },
              ].map((r) => (
                <Link key={r.num} href={`/about#${r.title.toLowerCase().replace("the ","")}`}
                  style={{ display: "flex", alignItems: "center", gap: 20, padding: "clamp(0.875rem,2vw,1.25rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "32px")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "20px")}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: r.color, letterSpacing: "0.1em", minWidth: 28 }}>{r.num}</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", letterSpacing: "0.04em", color: "var(--chalk)", flex: 1 }}>{r.title}</span>
                  <div style={{ width: 20, height: 1, background: r.color, opacity: 0.45, flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ WORK ══════════════════════════════════ */}
      <section style={{ background: "#000" }}>
        <div style={{ padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem) clamp(1.5rem,4vw,3rem)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div ref={r3} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>// 002 — Work</p>
              <Accent word="BUILT." idx={3} size="clamp(3rem,12vw,9rem)" />
            </div>
            <MagneticButton as="a" href="/portfolio" className="btn btn-ghost" style={{ fontSize: 12 }}>All projects →</MagneticButton>
          </div>
        </div>

        {/* ── Horizontal film-reel scroll ── */}
        <div
          style={{
            overflowX: "auto", overflowY: "hidden",
            display: "flex", gap: 0,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
          className="hide-scrollbar"
        >
          {WORK.map((p, i) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              style={{
                display: "block", textDecoration: "none", flexShrink: 0,
                width: "min(85vw, 760px)", height: "clamp(300px,52vw,580px)",
                scrollSnapAlign: "start", position: "relative", overflow: "hidden",
                borderRight: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => { const img = e.currentTarget.querySelector(".proj-img") as HTMLElement; if (img) img.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { const img = e.currentTarget.querySelector(".proj-img") as HTMLElement; if (img) img.style.transform = "scale(1)"; }}
            >
              {/* Background art */}
              <div className="proj-img" style={{ position: "absolute", inset: 0, transition: "transform 700ms cubic-bezier(0.25,1,0.5,1)" }}>
                <svg viewBox="0 0 760 580" style={{ width: "100%", height: "100%", position: "absolute" }} preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id={`pg-${i}`} cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor={p.color} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={p.color} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="760" height="580" fill="#060606" />
                  <rect width="760" height="580" fill={`url(#pg-${i})`} />
                  {Array.from({ length: 8 }, (_, j) => <line key={`v${j}`} x1={j*110} y1="0" x2={j*110} y2="580" stroke={p.color} strokeWidth="0.3" opacity="0.06" />)}
                  {Array.from({ length: 6 }, (_, j) => <line key={`h${j}`} x1="0" y1={j*100} x2="760" y2={j*100} stroke={p.color} strokeWidth="0.3" opacity="0.06" />)}
                  <circle cx="380" cy="290" r="160" fill="none" stroke={p.color} strokeWidth="0.6" opacity="0.12" />
                  <circle cx="380" cy="290" r="80"  fill="none" stroke={p.color} strokeWidth="0.4" opacity="0.08" />
                  <text x="380" y="340" textAnchor="middle" fontFamily="Bebas Neue" fontSize="160" fill={p.color} opacity="0.03" letterSpacing="8">{p.title.toUpperCase()}</text>
                </svg>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.18) 100%)" }} />
              </div>
              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.25rem,3vw,2rem) clamp(1.5rem,4vw,2.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>0{i+1}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>{p.cat}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>{p.year}</span>
                </div>
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <Accent word={p.word} idx={p.idx} color={p.color} size="clamp(2.5rem,8vw,6.5rem)" />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.7rem,1.5vw,0.9rem)", color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.06em", marginBottom: 6 }}>{p.title}</h2>
                      <p style={{ fontSize: "clamp(0.75rem,1.3vw,0.875rem)", color: "rgba(255,255,255,0.25)", maxWidth: 360 }}>{p.sub}</p>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: "0.1em", flexShrink: 0 }}>View →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* End cap */}
          <Link href="/portfolio" style={{ display: "flex", flexShrink: 0, width: "min(50vw, 320px)", height: "clamp(300px,52vw,580px)", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: "#060606", borderRight: "none", textDecoration: "none", scrollSnapAlign: "start" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em" }}>MORE WORK</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--copper)", letterSpacing: "0.1em" }}>View all →</span>
          </Link>
        </div>
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
      </section>

      {/* ══════════════════ BELIEFS ═══════════════════════════════ */}
      <section style={{ background: "#000", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={r4} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(3rem,7vw,6rem)" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>// 003 — Beliefs</p>
            <Accent word="SIGNAL." idx={5} size="clamp(3rem,12vw,9rem)" color="var(--copper)" />
          </div>
          <div className="beliefs-grid">
            {BELIEFS.map((b) => (
              <div key={b.n} style={{ borderTop: `1px solid ${b.accent}28`, paddingTop: "clamp(1.25rem,3vw,2rem)" }}>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2.5rem,5vw,4.5rem)", color: b.accent, opacity: 0.08, lineHeight: 1, marginBottom: 12, fontWeight: 700 }}>{b.n}</div>
                <div style={{ width: 24, height: 1, background: b.accent, marginBottom: 18, opacity: 0.55 }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,2vw,1.2rem)", color: "var(--chalk)", lineHeight: 1.45, marginBottom: 12 }}>{b.t}</h3>
                <p style={{ fontSize: "clamp(0.8rem,1.3vw,0.9rem)", color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WRITING ═══════════════════════════════ */}
      <section style={{ background: "#0A0A0B", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div ref={r5} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(2.5rem,7vw,6rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>// 004 — Writing</p>
              <Accent word="WORDS." idx={0} size="clamp(3rem,12vw,9rem)" color="#A855F7" />
            </div>
            <Link href="/blog" className="btn btn-ghost" style={{ fontSize: 12 }}>All writing →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {POSTS.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,3vw,2.5rem)", padding: "clamp(1.25rem,3vw,2rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "clamp(1.5rem,4vw,3.5rem)")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "clamp(1rem,3vw,2.5rem)")}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", minWidth: 24, flexShrink: 0 }}>0{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: post.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.cat}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.95rem,2.5vw,1.45rem)", color: "var(--chalk)", lineHeight: 1.35 }}>{post.title}</h3>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.18)", flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MANIFESTO ═════════════════════════════ */}
      <section style={{ background: "#000", position: "relative", overflow: "hidden", padding: "clamp(4rem,12vw,10rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div ref={parallax2} style={{ position: "absolute", inset: "-15%", zIndex: 0, opacity: 0.07 }}>
          <Image src="/images/about.jpg" alt="" fill style={{ objectFit: "cover" }} sizes="100vw" />
        </div>
        <div ref={r6} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.9s cubic-bezier(0.25,1,0.5,1)", position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 28 }}>// 005 — Manifesto</p>
          <div style={{ marginBottom: 40 }}>
            {[
              { text: "BUILD.", accent: null, dim: false },
              { text: "CONN",   accent: null, dim: false },
              { text: "ECT.",   accent: { i: 0, c: "#00C8FF" }, dim: false },
              { text: "GROW.",  accent: null, dim: true },
              { text: "REPEAT.", accent: null, dim: false },
            ].map((line, i) => (
              <div key={i} style={{ lineHeight: 0.88, overflow: "hidden", marginBottom: 4 }}>
                <span className="manifesto-xl">
                  {line.accent
                    ? line.text.split("").map((ch, ci) => (
                        <span key={ci} style={{ color: ci === line.accent!.i ? line.accent!.c : "var(--chalk)" }}>{ch}</span>
                      ))
                    : <span style={{ color: line.dim ? "rgba(255,255,255,0.1)" : "var(--chalk)" }}>{line.text}</span>
                  }
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "clamp(1.5rem,4vw,2.5rem)", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: "clamp(0.875rem,1.6vw,1.1rem)", color: "rgba(255,255,255,0.38)", maxWidth: 480, lineHeight: 1.75, marginBottom: "1.5rem" }}>
                The best work happens where physical systems, digital tools, and human attention meet. I build at that intersection.
              </p>
              <Signature color="#C87B2F" width={240} />
            </div>
            <MagneticButton as="a" href="/contact" className="btn btn-primary">Start a conversation</MagneticButton>
          </div>
        </div>
      </section>

      {/* ══════════════════ NEWSLETTER ════════════════════════════ */}
      <section className="safe-bottom" style={{ background: "#0A0A0B", padding: "clamp(3.5rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "var(--copper)", marginBottom: 8 }}>Think alongside me.</p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.32)", marginBottom: 28, lineHeight: 1.7 }}>Occasional writing on building, designing, and living. No spam. Ever.</p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com" required
              style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#EAEDF2", fontFamily: "'Inter',sans-serif", fontSize: "0.9375rem", padding: "0.875rem 1.125rem", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(200,123,47,0.4)")}
              onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
