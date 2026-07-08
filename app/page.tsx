"use client";import Link from "next/link";import Image from "next/image";import dynamic from "next/dynamic";import { useEffect, useRef, useState } from "react";import MagneticButton from "./components/MagneticButton";import TypeWriter from "./components/TypeWriter";import Signature from "./components/Signature";import SignalCockpit from "./components/SignalCockpit";import ScrambleText from "./components/ScrambleText";import ErrorBoundary from "./components/ErrorBoundary";const HeroOrb              = dynamic(() => import("./components/SignalOrb"),          { ssr: false });const HeroScene            = dynamic(() => import("./components/HeroScene"),          { ssr: false });const ConstellationCanvas  = dynamic(() => import("./components/ConstellationCanvas"),{ ssr: false });function isMobile() {  if (typeof navigator === "undefined") return false;  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);}/* â”€â”€â”€ In-view boolean â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function useInView(threshold = 0.12) {  const ref = useRef<HTMLDivElement>(null);  const [visible, setVisible] = useState(false);  useEffect(() => {    const obs = new IntersectionObserver(([e]) => {      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }    }, { threshold });    if (ref.current) obs.observe(ref.current);    return () => obs.disconnect();  }, [threshold]);  return [ref, visible] as const;}/* â”€â”€â”€ Parallax â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function useParallax(speed = 0.25) {  const ref = useRef<HTMLDivElement>(null);  useEffect(() => {    const el = ref.current;    if (!el) return;    const onScroll = () => {      const rect = el.parentElement!.getBoundingClientRect();      el.style.transform = `translateY(${-rect.top * speed}px)`;    };    window.addEventListener("scroll", onScroll, { passive: true });    return () => window.removeEventListener("scroll", onScroll);  }, [speed]);  return ref;}/* â”€â”€â”€ Reveal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function useReveal(delay = 0) {  const ref = useRef<HTMLDivElement>(null);  const delayRef = useRef(delay);  useEffect(() => {    const el = ref.current;    if (!el) return;    const d = delayRef.current;    const obs = new IntersectionObserver(      ([e]) => {        if (e.isIntersecting) {          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "none"; }, d);          obs.disconnect();        }      },      { threshold: 0.08 }    );    obs.observe(el);    return () => obs.disconnect();  }, []);  return ref;}/* â”€â”€â”€ Counter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {  const [n, setN] = useState(0);  const ref = useRef<HTMLSpanElement>(null);  const fired = useRef(false);  useEffect(() => {    const obs = new IntersectionObserver(([e]) => {      if (e.isIntersecting && !fired.current) {        fired.current = true;        const start = performance.now();        const dur = 1500;        const tick = (now: number) => {          const t = Math.min((now - start) / dur, 1);          setN(Math.round((1 - Math.pow(1 - t, 3)) * end));          if (t < 1) requestAnimationFrame(tick);        };        requestAnimationFrame(tick);        obs.disconnect();      }    }, { threshold: 0.5 });    if (ref.current) obs.observe(ref.current);    return () => obs.disconnect();  }, [end]);  return <span ref={ref}>{n}{suffix}</span>;}/* â”€â”€â”€ Brian spectrum letter data — each letter owns a color â”€â”€â”€â”€ */const BRIAN_LETTERS = [  {    ch: "B",    grad: "linear-gradient(160deg,#6878A0 0%,#A8B8D0 30%,#FFFFFF 50%,#B0C0D8 70%,#6878A0 100%)",    glowRgb: "180,195,220", glintColor: "rgba(255,255,255,0.95)",    enterAnim: "letterFromLeft 1.3s cubic-bezier(0.16,1,0.3,1) 0.20s both",    floatDur: 3.2, floatDelay: 0.0, shimmerDelay: "0s",   glintDelay: "5.0s",  },  {    ch: "R",    grad: "linear-gradient(160deg,#6878A0 0%,#A8B8D0 30%,#FFFFFF 50%,#B0C0D8 70%,#6878A0 100%)",    glowRgb: "180,195,220", glintColor: "rgba(255,255,255,0.95)",    enterAnim: "letterRise 1.1s cubic-bezier(0.16,1,0.3,1) 0.40s both",    floatDur: 2.8, floatDelay: 0.4, shimmerDelay: "0.7s", glintDelay: "6.5s",  },  {    ch: "I",    grad: "linear-gradient(160deg,#6878A0 0%,#A8B8D0 30%,#FFFFFF 50%,#B0C0D8 70%,#6878A0 100%)",    glowRgb: "180,195,220", glintColor: "rgba(255,255,255,0.95)",    enterAnim: "letterFlash 1.0s cubic-bezier(0.16,1,0.3,1) 0.60s both",    floatDur: 3.6, floatDelay: 0.2, shimmerDelay: "1.4s", glintDelay: "4.8s",  },  {    ch: "A",    grad: "linear-gradient(160deg,#6878A0 0%,#A8B8D0 30%,#FFFFFF 50%,#B0C0D8 70%,#6878A0 100%)",    glowRgb: "180,195,220", glintColor: "rgba(255,255,255,0.95)",    enterAnim: "letterFromRight 1.2s cubic-bezier(0.16,1,0.3,1) 0.80s both",    floatDur: 3.0, floatDelay: 0.6, shimmerDelay: "2.1s", glintDelay: "7.2s",  },  {    ch: "N",    grad: "linear-gradient(160deg,#6878A0 0%,#A8B8D0 30%,#FFFFFF 50%,#B0C0D8 70%,#6878A0 100%)",    glowRgb: "180,195,220", glintColor: "rgba(255,255,255,0.95)",    enterAnim: "letterRise 1.1s cubic-bezier(0.16,1,0.3,1) 1.00s both",    floatDur: 2.6, floatDelay: 0.8, shimmerDelay: "2.8s", glintDelay: "5.8s",  },];function BrianName() {  return (    <div style={{ perspective: "1800px", display: "inline-flex", lineHeight: 0.82, position: "relative", gap: "0.005em" }}>      {BRIAN_LETTERS.map(({ ch, enterAnim, floatDur, floatDelay, shimmerDelay, glintDelay, grad, glowRgb, glintColor }, i) => (        <span          key={i}          style={{            fontFamily: "'Bebas Neue', sans-serif",            fontSize: "clamp(5rem,21vw,21rem)",            letterSpacing: "-0.025em",            lineHeight: 0.82,            display: "inline-block",            position: "relative",            animation: `${enterAnim}, heroFloat ${floatDur}s ease-in-out ${floatDelay}s infinite`,            transformOrigin: "center bottom",            willChange: "transform, opacity",          }}        >          {/* Per-letter color gradient */}          <span style={{            background: grad,            backgroundSize: "300% 100%",            WebkitBackgroundClip: "text",            WebkitTextFillColor: "transparent",            backgroundClip: "text",            filter: `drop-shadow(0 0 22px rgba(${glowRgb},0.88)) drop-shadow(0 0 55px rgba(${glowRgb},0.42))`,            animation: `heroDiamondShimmer 4.5s ease-in-out ${shimmerDelay} infinite`,            display: "block",          }}>{ch}</span>          {/* Colored glint flash */}          <span aria-hidden="true" style={{            position: "absolute", inset: 0,            background: `linear-gradient(110deg, transparent 20%, ${glintColor} 50%, transparent 80%)`,            WebkitBackgroundClip: "text",            WebkitTextFillColor: "transparent",            backgroundClip: "text",            animation: `heroGlint 7s ease-in-out ${glintDelay} infinite`,            pointerEvents: "none",          }}>{ch}</span>          {/* Ambient color aura behind letter */}          <span aria-hidden="true" style={{            position: "absolute", inset: "-14% -10%",            background: `radial-gradient(ellipse 85% 75% at 50% 58%, rgba(${glowRgb},0.22) 0%, transparent 68%)`,            filter: "blur(18px)", pointerEvents: "none", zIndex: -1,          }} />        </span>      ))}    </div>  );}/* â”€â”€â”€ 5-color spectrum bar matching each letter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function NameSpectrum() {  return (    <div style={{ display: "flex", width: "clamp(100px,15vw,260px)", height: 3, borderRadius: 3, overflow: "hidden", marginBottom: "clamp(0.75rem,1.4vw,1.1rem)" }}>      {BRIAN_LETTERS.map(({ glowRgb }, i) => (        <div key={i} style={{ flex: 1, height: "100%", background: `rgb(${glowRgb})`, opacity: i === 2 ? 0.85 : 0.72 }} />      ))}    </div>  );}/* â”€â”€â”€ Section floating orbs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function SectionOrbs({ orbs }: { orbs: { x: string; y: string; w: string; color: string; blur: number; op: number; dur?: number; delay?: number }[] }) {  return (    <>      {orbs.map((o, i) => (        <div key={i} aria-hidden="true" style={{          position: "absolute", left: o.x, top: o.y,          width: o.w, height: o.w, borderRadius: "50%",          background: o.color, filter: `blur(${o.blur}px)`,          opacity: o.op, pointerEvents: "none", zIndex: 0,          animation: `${i % 2 === 0 ? "floatOrb" : "floatOrbB"} ${o.dur ?? 9}s ease-in-out ${o.delay ?? 0}s infinite`,        }} />      ))}    </>  );}/* â”€â”€â”€ Manifesto stagger word â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function ManifestoStagger({ lines }: { lines: { text: string; color?: string; dim?: boolean }[] }) {  const [ref, visible] = useInView(0.1);  const allWords = lines.map((l) => ({ ...l, words: l.text.split(" ") }));  let globalIdx = 0;  return (    <div ref={ref}>      {allWords.map((line, li) => (        <div key={li} style={{ lineHeight: 0.88, marginBottom: 6 }}>          <span className="manifesto-xl">            {line.words.map((word) => {              const idx = globalIdx++;              return (                <span                  key={idx}                  className={`manifesto-word${visible ? " in" : ""}`}                  style={{                    transitionDelay: `${idx * 80}ms`,                    color: line.dim ? "rgba(255,255,255,0.1)" : (line.color ?? "var(--chalk)"),                    marginRight: "0.18em",                  }}                >                  {word}                </span>              );            })}          </span>        </div>      ))}    </div>  );}/* â”€â”€â”€ Accent word â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */function Accent({ word, idx, color = "var(--copper)", size = "clamp(4rem,14vw,11rem)" }: {  word: string; idx: number; color?: string; size?: string;}) {  return (    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: size, lineHeight: 0.88, letterSpacing: "0.01em", display: "inline-block" }}>      {word.split("").map((ch, i) => (        <span key={i} style={{ color: i === idx ? color : "var(--chalk)" }}>{ch}</span>      ))}    </span>  );}/* â”€â”€â”€ Work data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */const WORK = [  { slug: "electracore",    word: "FIELD", idx: 1, title: "ElectraCore",   sub: "Circuit tools, electrical learning, load calculations, connection guides, cost estimates, and job billing — one platform, built from 8 years on the tools.", year: "2025", cat: "Web App",          color: "#D4A843", liveUrl: "https://electracore.vercel.app" },  { slug: "digilearn",      word: "LEARN", idx: 0, title: "DigiLearn",     sub: "100+ free courses for the AI era — web dev, data science, machine learning, databases, ethics, fintech, healthcare IT, and public policy. All free.", year: "2026", cat: "EdTech Platform",  color: "#0284C7", liveUrl: "https://digilearn.vercel.app" },  { slug: "traildesk",      word: "TRAIL", idx: 2, title: "TrailDesk",     sub: "Offline-first trail journaling with GPS, smart gear checklists, emergency contacts, and a full trip archive. Built for people who go outside.", year: "2026", cat: "Outdoor App",      color: "#34D399", liveUrl: "https://traildesk.vercel.app" },  { slug: "safesignal",     word: "SAFE",  idx: 3, title: "SafeSignal",    sub: "Lone worker safety platform for trade and field workers. Dead-man check-ins, GPS location, escalating alerts, and compliance export.", year: "2026", cat: "Safety Platform",  color: "#FF6B35", liveUrl: "https://safesignal.vercel.app" },  { slug: "apprentice-log", word: "CRAFT", idx: 4, title: "ApprenticeLog", sub: "Digital logbook for trade apprentices. Hours logging, skill sign-offs, supervisor portal, and compliance PDF export.", year: "2026", cat: "Trade Platform",   color: "#00C8FF", liveUrl: "https://apprentice-log.vercel.app" },];const BELIEFS = [  { n: "01", t: "Every system is connected",             body: "Whether it is a circuit, a codebase, or a conversation — nothing works in isolation. Understanding one teaches you something true about all the rest.", accent: "var(--copper)" },  { n: "02", t: "Craft is the respect you pay to work",  body: "Speed without care is noise. The detail no one notices is still worth getting exactly right. That discipline is what separates good work from great work.", accent: "#00C8FF" },  { n: "03", t: "The outdoors is the only real reset",   body: "Some problems cannot be solved at a desk. The clearest thinking happens when you have stepped fully away — and that clarity carries back into everything.", accent: "#34D399" },];const POSTS = [  { slug: "wiring-panel-architecture", cat: "Electrical", date: "Jun 2026", title: "What wiring a panel taught me about architecture", color: "#D4A843" },  { slug: "design-second-language",    cat: "Design",     date: "May 2026", title: "Design as a second language",                      color: "#A855F7" },];function TechSvg({ name }: { name: string }) {
  const s: React.CSSProperties = { display:"block" };
  if (name === "React") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22" fill="none"><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2" fill="#61DAFB"/></svg>);
  if (name === "TypeScript") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><rect x="2" y="2" width="28" height="28" rx="4" fill="#3178C6"/><path d="M9 16h7M12.5 16v7" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M18 22c0 0 1 2.5 3.5 2.5S25 23 25 21c0-2-2-2.5-3.5-3S19 16.5 19 15c0-1 .8-2.5 3-2.5s3 1.5 3 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>);
  if (name === "Next.js") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><circle cx="16" cy="16" r="14" fill="white"/><path d="M11 22V10l13 15.5H20L11 15v7z" fill="#000"/></svg>);
  if (name === "Node.js") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><path d="M16 2L4 9v14l12 7 12-7V9z" fill="#539E43"/><path d="M16 2L4 9v14l12 7 12-7V9z" fill="none" stroke="#3c7a30" strokeWidth="0.5"/><text x="9" y="20" fontSize="8.5" fontWeight="700" fill="white" fontFamily="Arial,sans-serif">node</text></svg>);
  if (name === "Python") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><path d="M16 3C11 3 9 5 9 8v3h7v1H7C4.5 12 3 13.5 3 16s1.5 4 4 4h2v-3c0-3 2.5-5 7-5s7 2 7 5v2h2c2.5 0 4-1.5 4-4s-1.5-4-4-4h-2V8c0-3-2-5-7-5z" fill="#3776AB"/><path d="M16 29C21 29 23 27 23 24v-3h-7v-1h9c2.5 0 4-1.5 4-4s-1.5-4-4-4h-2v3c0 3-2.5 5-7 5s-7-2-7-5v-2H7c-2.5 0-4 1.5-4 4s1.5 4 4 4h2v3c0 3 2 5 7 5z" fill="#FFD43B"/><circle cx="13" cy="7" r="1.5" fill="white"/><circle cx="19" cy="25" r="1.5" fill="white"/></svg>);
  if (name === "Figma") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><rect x="6" y="2" width="9" height="9" rx="4.5" fill="#F24E1E"/><rect x="6" y="11" width="9" height="10" rx="4.5" fill="#FF7262"/><rect x="6" y="21" width="9" height="9" rx="4.5" fill="#0ACF83"/><rect x="15" y="2" width="9" height="9" rx="4.5" fill="#A259FF"/><circle cx="19.5" cy="16" r="4.5" fill="#1ABCFE"/></svg>);
  if (name === "Three.js") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22" fill="none"><polygon points="16,2 29,25 3,25" stroke="#049EF4" strokeWidth="1.5" fill="rgba(4,158,244,0.1)"/><polygon points="16,8 24,22 8,22" stroke="#049EF4" strokeWidth="1" fill="rgba(4,158,244,0.15)"/><polygon points="16,14 21,22 11,22" fill="#049EF4" fillOpacity="0.5"/></svg>);
  if (name === "Tailwind") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22" fill="none"><path d="M8 14c1-4.5 3.5-6.5 7-6.5 5 0 5.5 3.75 8 4.5 2 .6 4-.5 5-3C27 13.5 24.5 15.5 21 15.5c-5 0-5.5-3.75-8-4.5C11.2 10.5 9.5 11.5 8 14z" fill="#06B6D4"/><path d="M1 22c1-4.5 3.5-6.5 7-6.5 5 0 5.5 3.75 8 4.5 2 .6 4-.5 5-3C20 21.5 17.5 23.5 14 23.5c-5 0-5.5-3.75-8-4.5C4.2 18.5 2.5 19.5 1 22z" fill="#06B6D4" fillOpacity="0.65"/></svg>);
  if (name === "PostgreSQL") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><ellipse cx="16" cy="13" rx="10" ry="8" fill="#336791"/><ellipse cx="22" cy="9" rx="5" ry="6" fill="#336791" stroke="#1a4a70" strokeWidth="1"/><path d="M16 21v7" stroke="#336791" strokeWidth="2.5" strokeLinecap="round"/><text x="10.5" y="16" fontSize="8" fontWeight="800" fill="white" fontFamily="Arial,sans-serif">PG</text></svg>);
  if (name === "Vercel") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><polygon points="16,3 30,29 2,29" fill="white"/></svg>);
  if (name === "GitHub") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><circle cx="16" cy="16" r="14" fill="white"/><path d="M16 5C10.5 5 6 9.5 6 15c0 4.4 2.9 8.2 6.9 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1 .6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 1.6-.5 3.3-.5 5 0 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5C23.1 23.2 26 19.4 26 15c0-5.5-4.5-10-10-10z" fill="#24292E"/></svg>);
  if (name === "Electrical") return (<svg style={s} viewBox="0 0 32 32" width="22" height="22"><polygon points="19,2 9,18 16,18 13,30 23,14 16,14" fill="#FFD600" stroke="#FF8820" strokeWidth="0.8" strokeLinejoin="round"/></svg>);
  return <span style={{ fontSize:"0.8rem", color:"white", fontWeight:700 }}>{name[0]}</span>;
}
const TECH_STACK = [  { name: "React",       label: "Frontend" },  { name: "TypeScript",  label: "Language" },  { name: "Next.js",     label: "Framework" },  { name: "Node.js",     label: "Backend" },  { name: "Python",      label: "Scripting" },  { name: "Figma",       label: "Design" },  { name: "Three.js",    label: "3D Web" },  { name: "Tailwind",    label: "Styling" },  { name: "PostgreSQL",  label: "Database" },  { name: "Vercel",      label: "Deploy" },  { name: "GitHub",      label: "Version Control" },  { name: "Electrical",  label: "Trade" },];/* â”€â”€â”€ Showcase collage (AI-generated images via Higgsfield) â”€â”€â”€â”€â”€ *//* ─── What I Can Create — realistic UI screenshot showcase ───── */
/* hex → "r,g,b" for inline SVG rgba() */
function hexToRgbStr(hex: string) {
  const h = hex.replace("#","");
  return `${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)}`;
}
/* backward compat alias used by legacy mockup functions */
const rgb = hexToRgbStr;

/* ── Browser-chrome frame for showcase cards ─────────────────── */
function ShowBrowserFrame({ color, url, children }: { color: string; url: string; children: React.ReactNode }) {
  const r = hexToRgbStr(color);
  return (
    <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%", display:"block" }}>
      <rect width="900" height="520" rx="12" fill="#0A0A14"/>
      <rect width="900" height="40" rx="12" fill="#13131F"/>
      <rect y="12" width="900" height="28" fill="#13131F"/>
      <circle cx="22" cy="20" r="5.5" fill="#FF5F57"/>
      <circle cx="40" cy="20" r="5.5" fill="#FEBC2E"/>
      <circle cx="58" cy="20" r="5.5" fill="#28C840"/>
      <rect x="80" y="8" width="640" height="24" rx="8" fill={`rgba(${r},0.07)`} stroke={`rgba(${r},0.18)`} strokeWidth="1"/>
      <circle cx="97" cy="20" r="5" fill="none" stroke={`rgba(${r},0.4)`} strokeWidth="1.2"/>
      <line x1="101" y1="24" x2="104" y2="27" stroke={`rgba(${r},0.4)`} strokeWidth="1.2"/>
      <text x="112" y="24.5" fontFamily="monospace" fontSize="10" fill={`rgba(${r},0.7)`}>{url}</text>
      <text x="736" y="25" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.2)">&#8635;</text>
      <text x="754" y="25" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.12)">&#9733;</text>
      <rect x="772" y="8" width="118" height="24" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <text x="786" y="24" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.15)">&#8943;</text>
      <rect x="0" y="40" width="900" height="480" fill="#07070F"/>
      {children}
    </svg>
  );
}

function ElectraCorePreview() {
  return (
    <>
      <rect x="0" y="40" width="900" height="48" fill="#0D0D18"/>
      <text x="20" y="71" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#D4A843">ElectraCore</text>
      {["Calculate","Guides","Learn","Load Analysis"].map((t,i)=>(
        <text key={t} x={160+i*110} y="71" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">{t}</text>
      ))}
      <rect x="750" y="54" width="130" height="26" rx="7" fill="#D4A843"/>
      <text x="768" y="71" fontFamily="monospace" fontSize="11" fill="#07070F" fontWeight="700">Open Calculator</text>
      <rect x="0" y="88" width="200" height="432" fill="#0C0C1A"/>
      {[
        {label:"Voltage Drop",active:true},
        {label:"Ohm's Law",active:false},
        {label:"Cable Sizing",active:false},
        {label:"Load Analysis",active:false},
        {label:"LED Resistor",active:false},
        {label:"Battery Calc",active:false},
        {label:"Power Factor",active:false},
      ].map((item,i)=>(
        <g key={i}>
          <rect x="8" y={100+i*50} width="184" height="40" rx="8" fill={item.active?"rgba(212,168,67,0.12)":"transparent"}/>
          {item.active && <rect x="8" y={100+i*50} width="3" height="40" rx="1.5" fill="#D4A843"/>}
          <text x="24" y={125+i*50} fontFamily="monospace" fontSize="11" fill={item.active?"#D4A843":"rgba(255,255,255,0.3)"}>{item.label}</text>
        </g>
      ))}
      <text x="220" y="115" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">VOLTAGE DROP CALCULATOR  BS 7671 COMPLIANT</text>
      <rect x="210" y="120" width="680" height="1" fill="rgba(212,168,67,0.15)"/>
      {[
        {label:"Supply Voltage (V)",val:"230",unit:"V"},
        {label:"Design Current (A)",val:"16",unit:"A"},
        {label:"Cable Length (m)",val:"28",unit:"m"},
        {label:"Cable CSA (mm2)",val:"2.5",unit:"mm2"},
      ].map(({label,val,unit},i)=>(
        <g key={i}>
          <text x="225" y={155+i*58} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.4)">{label}</text>
          <rect x="225" y={161+i*58} width="240" height="34" rx="8" fill="rgba(212,168,67,0.05)" stroke="rgba(212,168,67,0.2)" strokeWidth="1"/>
          <text x="238" y={182+i*58} fontFamily="monospace" fontSize="14" fill="#F2F4FC">{val}</text>
          <text x="450" y={182+i*58} fontFamily="monospace" fontSize="10" fill="rgba(212,168,67,0.5)">{unit}</text>
        </g>
      ))}
      <rect x="520" y="130" width="360" height="320" rx="14" fill="rgba(212,168,67,0.04)" stroke="rgba(212,168,67,0.18)" strokeWidth="1"/>
      <text x="540" y="162" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="2">CALCULATED RESULT</text>
      <rect x="520" y="170" width="360" height="1" fill="rgba(212,168,67,0.1)"/>
      <text x="540" y="230" fontFamily="monospace" fontSize="52" fontWeight="900" fill="#D4A843">3.2</text>
      <text x="640" y="230" fontFamily="monospace" fontSize="18" fill="rgba(212,168,67,0.6)">V drop</text>
      <text x="540" y="252" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.28)">1.39% of 230V supply</text>
      <rect x="540" y="268" width="90" height="26" rx="8" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.35)" strokeWidth="1"/>
      <text x="556" y="285" fontFamily="monospace" fontSize="11" fill="#34D399">SAFE</text>
      <rect x="540" y="315" width="300" height="1" fill="rgba(255,255,255,0.05)"/>
      <text x="540" y="338" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.2)">Formula: Vd = (2 x L x I x R) / 1000</text>
      <rect x="540" y="348" width="300" height="32" rx="7" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
      <text x="552" y="367" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.35)">= (2 x 28 x 16 x 0.00741) / 1000</text>
      <text x="540" y="400" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.25)">BS 7671 limit (lighting): 3%  Margin: 1.61%</text>
      <rect x="540" y="415" width="300" height="26" rx="8" fill="#D4A843"/>
      <text x="596" y="432" fontFamily="monospace" fontSize="11" fill="#07070F" fontWeight="700">Recalculate</text>
    </>
  );
}

function DigiLearnPreview() {
  return (
    <>
      <rect x="0" y="40" width="900" height="50" fill="#0C1422"/>
      <text x="22" y="72" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#0284C7">DigiLearn</text>
      {["Courses","Tracks","Community","For Teams"].map((t,i)=>(
        <text key={t} x={140+i*100} y="72" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.35)">{t}</text>
      ))}
      <rect x="768" y="55" width="112" height="26" rx="7" fill="#0284C7"/>
      <text x="784" y="72" fontFamily="monospace" fontSize="11" fill="white" fontWeight="700">Enrol Free</text>
      <rect x="0" y="90" width="900" height="80" fill="rgba(2,132,199,0.05)"/>
      <text x="22" y="125" fontFamily="monospace" fontSize="20" fontWeight="900" fill="#F2F4FC">100+ Free Courses for the AI Era</text>
      <text x="22" y="148" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.3)">Web Dev  Data Science  AI Ethics  Healthcare IT  Fintech  Public Policy</text>
      {["All","AI Tools","Data Science","Web Dev","Ethics","Healthcare","Fintech"].map((t,i)=>(
        <g key={t}>
          <rect x={22+i*114} y="185" width="106" height="24" rx="12" fill={i===0?"#0284C7":"rgba(255,255,255,0.04)"} stroke={i===0?"#0284C7":"rgba(255,255,255,0.08)"} strokeWidth="1"/>
          <text x={32+i*114} y="201" fontFamily="monospace" fontSize="9.5" fill={i===0?"#fff":"rgba(255,255,255,0.4)"}>{t}</text>
        </g>
      ))}
      {[
        {x:22,title:"Python for Data Science",tag:"Data Science",lvl:"Beginner",col:"#0284C7",prog:68,students:"4,820"},
        {x:316,title:"Machine Learning Fundamentals",tag:"ML / AI",lvl:"Intermediate",col:"#7C3AED",prog:34,students:"3,140"},
        {x:610,title:"AI Ethics & Governance",tag:"Ethics",lvl:"All Levels",col:"#EA580C",prog:0,students:"2,670"},
      ].map((c)=>(
        <g key={c.x}>
          <rect x={c.x} y="224" width="280" height="240" rx="12" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          <rect x={c.x} y="224" width="280" height="80" rx="12" fill={`rgba(${hexToRgbStr(c.col)},0.1)`}/>
          <rect x={c.x} y="288" width="280" height="16" fill={`rgba(${hexToRgbStr(c.col)},0.1)`}/>
          <text x={c.x+14} y="325" fontFamily="monospace" fontSize="11.5" fontWeight="700" fill="#F2F4FC">{c.title}</text>
          <rect x={c.x+14} y="334" width="70" height="17" rx="8.5" fill={`rgba(${hexToRgbStr(c.col)},0.15)`}/>
          <text x={c.x+19} y="346" fontFamily="monospace" fontSize="8.5" fill={c.col}>{c.tag}</text>
          <text x={c.x+14} y="374" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)">{c.lvl}  Students: {c.students}  FREE</text>
          <rect x={c.x+14} y="386" width="252" height="3" rx="1.5" fill="rgba(255,255,255,0.07)"/>
          {c.prog > 0 && <rect x={c.x+14} y="386" width={252*c.prog/100} height="3" rx="1.5" fill={c.col}/>}
          {c.prog > 0 && <text x={c.x+14} y="406" fontFamily="monospace" fontSize="8.5" fill={c.col}>{c.prog}% complete</text>}
          <rect x={c.x+14} y="430" width="252" height="26" rx="8" fill={`rgba(${hexToRgbStr(c.col)},0.12)`} stroke={`rgba(${hexToRgbStr(c.col)},0.3)`} strokeWidth="1"/>
          <text x={c.x+90} y="447" fontFamily="monospace" fontSize="10" fill={c.col} fontWeight="700">Start Learning</text>
        </g>
      ))}
    </>
  );
}

function TrailDeskPreview() {
  return (
    <>
      <rect x="0" y="40" width="210" height="480" fill="#060C0A"/>
      <text x="16" y="75" fontFamily="monospace" fontSize="14" fontWeight="700" fill="#34D399">TrailDesk</text>
      {[
        {label:"My Trips",active:true},
        {label:"Plan Route",active:false},
        {label:"Gear Lists",active:false},
        {label:"Emergency",active:false},
        {label:"Offline Maps",active:false},
      ].map((item,i)=>(
        <g key={i}>
          <rect x="8" y={98+i*52} width="194" height="42" rx="8" fill={item.active?"rgba(52,211,153,0.10)":"transparent"}/>
          {item.active && <rect x="8" y={98+i*52} width="3" height="42" rx="1.5" fill="#34D399"/>}
          <text x="24" y={124+i*52} fontFamily="monospace" fontSize="11" fill={item.active?"#34D399":"rgba(255,255,255,0.28)"}>{item.label}</text>
        </g>
      ))}
      <rect x="10" y="420" width="190" height="72" rx="10" fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.15)" strokeWidth="1"/>
      <circle cx="26" cy="440" r="5" fill="#34D399"/>
      <text x="36" y="444" fontFamily="monospace" fontSize="9.5" fill="#34D399">GPS ACTIVE</text>
      <text x="12" y="464" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.25)">50+ offline regions ready</text>
      <text x="12" y="481" fontFamily="monospace" fontSize="8.5" fill="rgba(52,211,153,0.5)">Synced 3 min ago</text>
      <rect x="210" y="40" width="690" height="480" fill="#0A1210"/>
      {[0,1,2,3,4].map(i=>(
        <line key={"h"+i} x1="210" y1={100+i*80} x2="900" y2={100+i*80} stroke="rgba(52,211,153,0.05)" strokeWidth="1"/>
      ))}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={"v"+i} x1={310+i*90} y1="40" x2={310+i*90} y2="520" stroke="rgba(52,211,153,0.05)" strokeWidth="1"/>
      ))}
      <path d="M230 470 Q340 420 430 375 Q510 330 570 280 Q630 228 690 190 Q750 152 830 135" fill="none" stroke="rgba(52,211,153,0.13)" strokeWidth="2"/>
      <path d="M230 490 Q350 445 450 400 Q530 355 590 305 Q650 252 710 215 Q770 178 855 160" fill="none" stroke="rgba(52,211,153,0.09)" strokeWidth="1.5"/>
      <path d="M268 468 L332 428 L412 388 L472 346 L532 296 L592 252 L652 212 L712 175 L772 152 L844 140" fill="none" stroke="#34D399" strokeWidth="3.5" strokeDasharray="9,5" strokeLinecap="round"/>
      {[{x:268,y:468,l:"Start - Lake Te Anau"},{x:532,y:296,l:"Mackinnon Pass 1,154m"},{x:844,y:140,l:"Milford Sound"}].map(({x,y,l},i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill="#34D399" opacity="0.9"/>
          <circle cx={x} cy={y} r="16" fill="#34D399" opacity="0.15"/>
          <rect x={x+18} y={y-13} width={l.length*6.2+16} height="22" rx="6" fill="rgba(6,12,10,0.9)" stroke="rgba(52,211,153,0.2)" strokeWidth="0.8"/>
          <text x={x+26} y={y+2} fontFamily="monospace" fontSize="9.5" fill="#34D399">{l}</text>
        </g>
      ))}
      <circle cx="592" cy="252" r="6" fill="#FCD34D"/>
      <circle cx="592" cy="252" r="14" fill="rgba(252,211,77,0.15)"/>
      <rect x="620" y="358" width="265" height="148" rx="12" fill="rgba(6,12,10,0.92)" stroke="rgba(52,211,153,0.2)" strokeWidth="1"/>
      <text x="638" y="380" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="2">MILFORD TRACK - DAY 3</text>
      {[{l:"Distance",v:"19.4 km"},{l:"Elevation",v:"+1,154 m"},{l:"Duration",v:"7h 20m"},{l:"Conditions",v:"Clear"}].map(({l,v},i)=>(
        <g key={l}>
          <text x="638" y={402+i*22} fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.28)">{l}</text>
          <text x="782" y={402+i*22} fontFamily="monospace" fontSize="9.5" fill="#34D399" textAnchor="end">{v}</text>
        </g>
      ))}
      <rect x="636" y="484" width="230" height="6" rx="3" fill="rgba(52,211,153,0.1)"/>
      <rect x="636" y="484" width="138" height="6" rx="3" fill="#34D399"/>
      <text x="638" y="504" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.3)">Day 3 of 4 complete</text>
    </>
  );
}

function SafeSignalPreview() {
  return (
    <>
      <rect x="0" y="40" width="900" height="54" fill="#0C0608"/>
      <text x="22" y="73" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#FF6B35">SafeSignal</text>
      <rect x="756" y="52" width="128" height="28" rx="8" fill="rgba(255,107,53,0.12)" stroke="rgba(255,107,53,0.35)" strokeWidth="1"/>
      <text x="776" y="70" fontFamily="monospace" fontSize="10.5" fill="#FF6B35">Start Session</text>
      <rect x="0" y="94" width="900" height="44" fill="#08030A"/>
      {[{l:"Active Workers",v:"6",c:"#34D399"},{l:"Late Check-ins",v:"1",c:"#FEBC2E"},{l:"Alert Running",v:"0",c:"rgba(255,255,255,0.2)"},{l:"Last Check-in",v:"2m ago",c:"rgba(255,255,255,0.5)"}].map(({l,v,c},i)=>(
        <g key={i}>
          <text x={28+i*220} y="112" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)">{l}</text>
          <text x={28+i*220} y="128" fontFamily="monospace" fontSize="12" fill={c} fontWeight="700">{v}</text>
        </g>
      ))}
      {[
        {name:"James Okeke",job:"Electrician",last:"2m",status:"OK"},
        {name:"Sarah Chen",job:"Plumber",last:"8m",status:"OK"},
        {name:"Mike Torres",job:"HVAC Tech",last:"47m",status:"LATE"},
        {name:"Priya Nair",job:"Site Foreman",last:"12m",status:"OK"},
        {name:"Dan Muriuki",job:"Scaffolder",last:"5m",status:"OK"},
        {name:"Amy Park",job:"Inspector",last:"19m",status:"OK"},
      ].map((w,i)=>{
        const col = i%3, row = Math.floor(i/3);
        const x = 22+col*290, y = 155+row*148;
        const sc = w.status==="OK"?"#34D399":"#FEBC2E";
        return (
          <g key={i}>
            <rect x={x} y={y} width="272" height="132" rx="12" fill="rgba(255,255,255,0.02)" stroke={w.status==="LATE"?"rgba(254,188,46,0.25)":"rgba(255,255,255,0.06)"} strokeWidth="1"/>
            <circle cx={x+24} cy={y+24} r="18" fill={`rgba(${hexToRgbStr(sc)},0.12)`} stroke={`rgba(${hexToRgbStr(sc)},0.25)`} strokeWidth="1"/>
            <text x={x+24} y={y+30} fontFamily="monospace" fontSize="16" textAnchor="middle" fill={sc}>{w.name[0]}</text>
            <text x={x+50} y={y+20} fontFamily="monospace" fontSize="11.5" fontWeight="700" fill="#F2F4FC">{w.name}</text>
            <text x={x+50} y={y+35} fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)">{w.job}</text>
            <rect x={x+150} y={y+10} width={w.status==="LATE"?54:44} height="20" rx="10" fill={`rgba(${hexToRgbStr(sc)},0.12)`} stroke={`rgba(${hexToRgbStr(sc)},0.3)`} strokeWidth="0.8"/>
            <text x={x+158} y={y+24} fontFamily="monospace" fontSize="9" fill={sc}>{w.status}</text>
            <rect x={x+12} y={y+52} width="248" height="1" fill="rgba(255,255,255,0.05)"/>
            <text x={x+12} y={y+72} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.25)">Last check-in: {w.last} ago</text>
            <rect x={x+12} y={y+82} width="248" height="6" rx="3" fill="rgba(255,255,255,0.05)"/>
            <rect x={x+12} y={y+82} width={w.status==="OK"?220:80} height="6" rx="3" fill={sc} opacity="0.5"/>
            <text x={x+12} y={y+108} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.2)">GPS: -1.286, 36.817 - Session active</text>
          </g>
        );
      })}
    </>
  );
}

function ApprenticeLogPreview() {
  return (
    <>
      <rect x="0" y="40" width="900" height="52" fill="#05080F"/>
      <text x="22" y="72" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#00C8FF">ApprenticeLog</text>
      {["Log Hours","Dashboard","Supervisor","Export PDF"].map((t,i)=>(
        <text key={t} x={200+i*120} y="72" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.3)">{t}</text>
      ))}
      <rect x="768" y="54" width="112" height="26" rx="7" fill="#00C8FF"/>
      <text x="784" y="71" fontFamily="monospace" fontSize="11" fill="#050C14" fontWeight="900">Log Hours</text>
      <rect x="0" y="92" width="260" height="428" fill="#060A10"/>
      <text x="20" y="122" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">PROGRESS OVERVIEW</text>
      <circle cx="130" cy="220" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14"/>
      <circle cx="130" cy="220" r="80" fill="none" stroke="#00C8FF" strokeWidth="14"
        strokeDasharray="353 511" strokeLinecap="round"
        style={{transform:"rotate(-90deg)",transformOrigin:"130px 220px"}}/>
      <text x="130" y="210" fontFamily="monospace" fontSize="22" fontWeight="900" fill="#00C8FF" textAnchor="middle">68%</text>
      <text x="130" y="230" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" textAnchor="middle">2,184 / 3,200 hrs</text>
      <text x="130" y="248" fontFamily="monospace" fontSize="9" fill="rgba(0,200,255,0.5)" textAnchor="middle">Electrical Trade</text>
      {[
        {l:"This Week",v:"42h",c:"#00C8FF"},
        {l:"Sign-offs",v:"28/40",c:"#34D399"},
        {l:"Rating",v:"4.8/5",c:"#F0A500"},
      ].map(({l,v,c},i)=>(
        <g key={i}>
          <rect x="16" y={325+i*46} width="228" height="36" rx="8" fill="rgba(255,255,255,0.025)"/>
          <text x="30" y={347+i*46} fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)">{l}</text>
          <text x="200" y={347+i*46} fontFamily="monospace" fontSize="11" fill={c} textAnchor="end" fontWeight="700">{v}</text>
        </g>
      ))}
      <text x="278" y="116" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="2">RECENT LOG ENTRIES</text>
      <rect x="270" y="122" width="616" height="1" fill="rgba(0,200,255,0.1)"/>
      {[
        {date:"02 Jul 2026",task:"Consumer unit installation - domestic rewire",site:"14 Maputo Lane",hours:"8.5h",status:"Signed"},
        {date:"01 Jul 2026",task:"Ring final circuit testing and certification",site:"Commercial Block C",hours:"7.0h",status:"Signed"},
        {date:"30 Jun 2026",task:"Three-phase motor starter wiring",site:"Factory Unit 7",hours:"9.0h",status:"Pending"},
        {date:"29 Jun 2026",task:"Inspection and Testing - EICR report",site:"Riverside Apartments",hours:"8.0h",status:"Signed"},
        {date:"28 Jun 2026",task:"Bathroom zone wiring - zones 1 and 2",site:"45 Kenyatta Ave",hours:"6.5h",status:"Signed"},
      ].map((e,i)=>{
        const sc = e.status==="Signed"?"#34D399":"#F0A500";
        return (
          <g key={i}>
            <rect x="270" y={140+i*72} width="616" height="62" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.055)" strokeWidth="1"/>
            <rect x="270" y={140+i*72} width="4" height="62" rx="2" fill={sc} opacity="0.7"/>
            <text x="286" y={158+i*72} fontFamily="monospace" fontSize="10.5" fontWeight="700" fill="#F2F4FC">{e.task}</text>
            <text x="286" y={174+i*72} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.28)">{e.site}  {e.hours}  {e.date}</text>
            <rect x="766" y={148+i*72} width={e.status==="Signed"?74:60} height="22" rx="11" fill={`rgba(${hexToRgbStr(sc)},0.1)`} stroke={`rgba(${hexToRgbStr(sc)},0.3)`} strokeWidth="0.8"/>
            <text x={e.status==="Signed"?772:774} y={163+i*72} fontFamily="monospace" fontSize="9.5" fill={sc}>{e.status==="Signed"?"Signed":"Pending"}</text>
          </g>
        );
      })}
    </>
  );
}

function ForexProPreview() {
  return (
    <>
      <rect x="0" y="40" width="900" height="52" fill="#080E14"/>
      <text x="22" y="72" fontFamily="monospace" fontSize="15" fontWeight="700" fill="#4ADE80">ForexPro</text>
      {["Markets","Positions","Orders","Analysis","News"].map((t,i)=>(
        <text key={t} x={140+i*100} y="72" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.3)">{t}</text>
      ))}
      <rect x="740" y="54" width="56" height="24" rx="6" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.3)" strokeWidth="1"/>
      <text x="754" y="70" fontFamily="monospace" fontSize="10" fill="#4ADE80">Live</text>
      <circle cx="748" cy="66" r="3.5" fill="#4ADE80"/>
      <rect x="806" y="54" width="80" height="24" rx="7" fill="#4ADE80"/>
      <text x="822" y="70" fontFamily="monospace" fontSize="10" fill="#080E14" fontWeight="700">Trade</text>
      <rect x="0" y="92" width="900" height="36" fill="#05090D"/>
      {[
        {pair:"EUR/USD",bid:"1.0847",ch:"+0.0023",up:true},
        {pair:"GBP/USD",bid:"1.2641",ch:"-0.0019",up:false},
        {pair:"USD/JPY",bid:"157.84",ch:"+0.45",up:true},
        {pair:"XAU/USD",bid:"2,312",ch:"+8.40",up:true},
      ].map(({pair,bid,ch,up},i)=>(
        <g key={i}>
          <text x={22+i*220} y="106" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.45)">{pair}</text>
          <text x={100+i*220} y="106" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#F2F4FC">{bid}</text>
          <text x={160+i*220} y="106" fontFamily="monospace" fontSize="9.5" fill={up?"#4ADE80":"#EF4444"}>{ch}</text>
        </g>
      ))}
      <rect x="0" y="128" width="620" height="250" fill="#05090D"/>
      <text x="18" y="150" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="1">EUR/USD  H1  1.0847</text>
      {[0,1,2,3,4].map(i=>(<line key={i} x1="0" y1={168+i*38} x2="620" y2={168+i*38} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>))}
      {[
        {x:28,o:65,c:55,h:70,l:50,bull:false},
        {x:56,o:55,c:68,h:72,l:52,bull:true},
        {x:84,o:68,c:62,h:74,l:58,bull:false},
        {x:112,o:62,c:74,h:78,l:58,bull:true},
        {x:140,o:74,c:85,h:90,l:70,bull:true},
        {x:168,o:85,c:78,h:88,l:74,bull:false},
        {x:196,o:78,c:88,h:94,l:75,bull:true},
        {x:224,o:88,c:82,h:92,l:78,bull:false},
        {x:252,o:82,c:95,h:100,l:80,bull:true},
        {x:280,o:95,c:90,h:102,l:86,bull:false},
        {x:308,o:90,c:104,h:108,l:88,bull:true},
        {x:336,o:104,c:98,h:108,l:95,bull:false},
        {x:364,o:98,c:112,h:116,l:96,bull:true},
        {x:392,o:112,c:108,h:116,l:104,bull:false},
        {x:420,o:108,c:120,h:124,l:106,bull:true},
        {x:448,o:120,c:118,h:126,l:114,bull:false},
        {x:476,o:118,c:130,h:134,l:116,bull:true},
        {x:504,o:130,c:125,h:134,l:122,bull:false},
        {x:532,o:125,c:136,h:140,l:122,bull:true},
        {x:560,o:136,c:132,h:140,l:128,bull:false},
      ].map((cd,i)=>{
        const sy = (v: number) => 320 - v * 1.3;
        const col = cd.bull?"#4ADE80":"#EF4444";
        return (
          <g key={i}>
            <line x1={cd.x+8} y1={sy(cd.h)} x2={cd.x+8} y2={sy(cd.l)} stroke={col} strokeWidth="1.2" opacity="0.7"/>
            <rect x={cd.x+2} y={sy(Math.max(cd.o,cd.c))} width="12" height={Math.max(2,Math.abs(sy(cd.o)-sy(cd.c)))} rx="1" fill={col} opacity="0.85"/>
          </g>
        );
      })}
      <polyline points="32,302 88,290 144,278 200,266 256,248 312,235 368,218 424,202 480,184 536,170 592,155" fill="none" stroke="#F0A500" strokeWidth="1.5" opacity="0.7" strokeDasharray="5,3"/>
      <rect x="620" y="128" width="280" height="250" fill="#05090D" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <text x="636" y="150" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)" letterSpacing="1.5">OPEN POSITIONS</text>
      {[
        {pair:"EUR/USD",type:"BUY",size:"0.50",pnl:"+$124.80",c:"#4ADE80"},
        {pair:"GBP/USD",type:"SELL",size:"0.25",pnl:"-$38.20",c:"#EF4444"},
        {pair:"XAU/USD",type:"BUY",size:"0.10",pnl:"+$84.00",c:"#4ADE80"},
      ].map(({pair,type,size,pnl,c},i)=>(
        <g key={i}>
          <rect x="626" y={168+i*60} width="268" height="50" rx="8" fill="rgba(255,255,255,0.02)"/>
          <rect x="626" y={168+i*60} width="3" height="50" rx="1.5" fill={c} opacity="0.8"/>
          <text x="638" y={187+i*60} fontFamily="monospace" fontSize="11" fontWeight="700" fill="#F2F4FC">{pair}</text>
          <rect x="638" y={194+i*60} width={type==="BUY"?34:38} height="15" rx="7.5" fill={c==="#4ADE80"?"rgba(74,222,128,0.12)":"rgba(239,68,68,0.12)"} stroke={`rgba(${hexToRgbStr(c)},0.3)`} strokeWidth="0.8"/>
          <text x="648" y={205+i*60} fontFamily="monospace" fontSize="8" fill={c}>{type}</text>
          <text x="698" y={205+i*60} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)">{size} lots</text>
          <text x="840" y={190+i*60} fontFamily="monospace" fontSize="12" fill={c} textAnchor="end" fontWeight="700">{pnl}</text>
        </g>
      ))}
      <rect x="626" y="352" width="268" height="22" rx="6" fill="rgba(74,222,128,0.06)"/>
      <text x="638" y="366" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.3)">Net P&amp;L today</text>
      <text x="882" y="366" fontFamily="monospace" fontSize="11" fill="#4ADE80" textAnchor="end" fontWeight="700">+$170.60</text>
      <rect x="0" y="378" width="620" height="102" fill="#05090D" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <text x="18" y="400" fontFamily="monospace" fontSize="9.5" fill="rgba(255,255,255,0.3)" letterSpacing="1">QUICK ORDER  EUR/USD</text>
      {["Lot Size","Stop Loss","Take Profit"].map((l,i)=>(
        <g key={i}>
          <text x={18+i*196} y="425" fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.25)">{l}</text>
          <rect x={18+i*196} y="430" width="178" height="28" rx="7" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
          <text x={30+i*196} y="449" fontFamily="monospace" fontSize="11" fill="rgba(255,255,255,0.6)">{["0.50","1.0782","1.0924"][i]}</text>
        </g>
      ))}
      <rect x="18" y="460" width="292" height="32" rx="9" fill="#4ADE80"/>
      <text x="128" y="481" fontFamily="monospace" fontSize="13" fill="#080E14" fontWeight="900" textAnchor="middle">BUY  1.0847</text>
      <rect x="322" y="460" width="280" height="32" rx="9" fill="#EF4444"/>
      <text x="462" y="481" fontFamily="monospace" fontSize="13" fill="white" fontWeight="900" textAnchor="middle">SELL  1.0849</text>
    </>
  );
}

/* ── SVG UI Mockups ─────────────────────────────── */
function WebsiteMockup({ c }: { c: string }) {
  const r = rgb(c);
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#07070F" />
      <rect width="320" height="24" fill="#0E0E1C" />
      <circle cx="12" cy="12" r="3.5" fill="#FF5F57" opacity=".75" />
      <circle cx="22" cy="12" r="3.5" fill="#FEBC2E" opacity=".75" />
      <circle cx="32" cy="12" r="3.5" fill="#28C840" opacity=".75" />
      <rect x="48" y="6" width="180" height="12" rx="6" fill="rgba(255,255,255,.04)" stroke={`rgba(${r},.25)`} strokeWidth=".7" />
      <text x="56" y="14.5" fontSize="6.5" fill={c} opacity=".8" fontFamily="monospace">josiah.dev</text>
      <rect y="24" width="320" height="26" fill="#0A0A14" />
      <rect x="12" y="33" width="38" height="8" rx="4" fill={c} opacity=".9" />
      <rect x="174" y="35" width="24" height="5" rx="2.5" fill="rgba(255,255,255,.15)" />
      <rect x="205" y="35" width="24" height="5" rx="2.5" fill="rgba(255,255,255,.15)" />
      <rect x="236" y="35" width="24" height="5" rx="2.5" fill="rgba(255,255,255,.15)" />
      <rect x="280" y="30" width="30" height="14" rx="7" fill={c} opacity=".9" />
      <rect y="50" width="320" height="100" fill="#070710" />
      <rect x="12" y="64" width="136" height="14" rx="3.5" fill="rgba(255,255,255,.88)" />
      <rect x="12" y="84" width="98" height="14" rx="3.5" fill="rgba(255,255,255,.88)" />
      <rect x="12" y="106" width="152" height="5" rx="2.5" fill="rgba(255,255,255,.18)" />
      <rect x="12" y="116" width="122" height="5" rx="2.5" fill="rgba(255,255,255,.12)" />
      <rect x="12" y="130" width="62" height="17" rx="8.5" fill={c} />
      <rect x="82" y="130" width="62" height="17" rx="8.5" fill="rgba(255,255,255,.05)" stroke={`rgba(${r},.4)`} strokeWidth="1" />
      <rect x="196" y="58" width="112" height="84" rx="10" fill={`rgba(${r},.06)`} stroke={`rgba(${r},.16)`} strokeWidth=".8" />
      <circle cx="252" cy="100" r="28" fill={`rgba(${r},.1)`} />
      <circle cx="252" cy="100" r="16" fill={`rgba(${r},.18)`} />
      <circle cx="252" cy="100" r="7" fill={c} opacity=".65" />
      {([0,1,2,3] as const).map(i => {
        const a = i * Math.PI / 2;
        return <line key={i} x1={252+Math.cos(a)*18} y1={100+Math.sin(a)*18} x2={252+Math.cos(a)*26} y2={100+Math.sin(a)*26} stroke={c} strokeWidth="1.2" opacity=".45" />;
      })}
      <rect y="150" width="320" height="40" fill="#09091A" />
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={14+i*96} y="160" width="40" height="5" rx="2.5" fill="rgba(255,255,255,.08)" />
          <rect x={14+i*96} y="170" width="60" height="4" rx="2" fill="rgba(255,255,255,.04)" />
          <rect x={14+i*96} y="179" width="50" height="4" rx="2" fill="rgba(255,255,255,.03)" />
        </g>
      ))}
    </svg>
  );
}

function DashboardMockup({ c }: { c: string }) {
  const r = rgb(c);
  const bars = [45,62,38,75,88,54,70,92,66,48,80,95];
  const trend = "71,162 90,150 109,158 128,140 147,125 166,148 185,134 204,110 223,138 242,154 261,122 280,106";
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#07070F" />
      <rect width="46" height="190" fill="#0C0C1A" />
      {[20,52,84,116,148].map((y,i) => (
        <g key={y}>
          <rect x="11" y={y} width="24" height="24" rx="7" fill={i===0 ? `rgba(${r},.18)` : "rgba(255,255,255,.035)"} />
          <rect x="15" y={y+8} width="16" height="3" rx="1.5" fill={i===0 ? c : "rgba(255,255,255,.18)"} />
          <rect x="15" y={y+13} width="10" height="2.5" rx="1.25" fill={i===0 ? c : "rgba(255,255,255,.1)"} opacity=".6" />
        </g>
      ))}
      <rect x="0" y="20" width="3" height="24" rx="1.5" fill={c} />
      <rect x="46" y="0" width="274" height="20" fill="#0D0D1C" />
      <rect x="54" y="6" width="80" height="8" rx="4" fill="rgba(255,255,255,.055)" />
      <circle cx="294" cy="10" r="7" fill={`rgba(${r},.22)`} />
      <circle cx="278" cy="10" r="7" fill="rgba(255,255,255,.04)" />
      {([
        { x:54,  val:"8,241", lbl:"Total Users", d:"+12%" },
        { x:148, val:"$4.8k", lbl:"Revenue",     d:"+8%"  },
        { x:242, val:"98.2%", lbl:"Uptime",       d:"↑ 0.3%" },
      ] as const).map(({ x, val, lbl, d }) => (
        <g key={x}>
          <rect x={x} y="26" width="86" height="50" rx="8" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.065)" strokeWidth=".8" />
          <text x={x+10} y="46" fontSize="13" fontWeight="700" fill="rgba(255,255,255,.85)" fontFamily="'Orbitron',sans-serif">{val}</text>
          <text x={x+10} y="58" fontSize="7" fill="rgba(255,255,255,.28)" fontFamily="monospace">{lbl}</text>
          <rect x={x+10} y="64" width="30" height="7" rx="3.5" fill={`rgba(${r},.16)`} />
          <text x={x+14} y="69.5" fontSize="5.5" fill={c} fontFamily="monospace">{d}</text>
        </g>
      ))}
      <rect x="54" y="84" width="258" height="96" rx="8" fill="rgba(255,255,255,.018)" stroke="rgba(255,255,255,.055)" strokeWidth=".8" />
      <text x="64" y="97" fontSize="7" fill="rgba(255,255,255,.22)" fontFamily="monospace" letterSpacing="1">TRAFFIC · 30 DAYS</text>
      {bars.map((h,i) => (
        <rect key={i} x={66+i*19} y={170-h*.62} width="10" height={h*.62} rx="3" fill={i===11 ? c : `rgba(${r},.32)`} opacity={.45+i*.04} />
      ))}
      <line x1="60" y1="170" x2="308" y2="170" stroke="rgba(255,255,255,.055)" strokeWidth=".8" />
      <line x1="60" y1="145" x2="308" y2="145" stroke="rgba(255,255,255,.03)" strokeWidth=".5" />
      <line x1="60" y1="120" x2="308" y2="120" stroke="rgba(255,255,255,.025)" strokeWidth=".5" />
      <polyline points={trend} fill="none" stroke={c} strokeWidth="1.5" opacity=".5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileMockup({ c }: { c: string }) {
  const r = rgb(c);
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#07070F" />
      <circle cx="60" cy="95" r="60" fill={`rgba(${r},.04)`} />
      <circle cx="260" cy="95" r="60" fill={`rgba(${r},.04)`} />
      <rect x="104" y="8" width="112" height="174" rx="20" fill="#0E0E1E" stroke="rgba(255,255,255,.13)" strokeWidth="1.5" />
      <rect x="102" y="52" width="3" height="18" rx="1.5" fill="rgba(255,255,255,.16)" />
      <rect x="102" y="76" width="3" height="28" rx="1.5" fill="rgba(255,255,255,.16)" />
      <rect x="215" y="60" width="3" height="24" rx="1.5" fill="rgba(255,255,255,.16)" />
      <rect x="108" y="14" width="104" height="162" rx="16" fill="#080812" />
      <rect x="108" y="14" width="104" height="22" rx="16" fill="#0E0E1E" />
      <rect x="108" y="27" width="104" height="9" fill="#0E0E1E" />
      <text x="116" y="25" fontSize="6" fill="rgba(255,255,255,.5)" fontFamily="monospace">9:41</text>
      <text x="192" y="25" fontSize="6" fill="rgba(255,255,255,.4)" fontFamily="monospace">●●●</text>
      <rect x="143" y="16" width="34" height="10" rx="5" fill="#050508" />
      <rect x="108" y="36" width="104" height="24" fill="#0C0C1C" />
      <text x="160" y="51" fontSize="9" fill="rgba(255,255,255,.8)" fontFamily="'Bebas Neue',sans-serif" textAnchor="middle" letterSpacing="1">DASHBOARD</text>
      <rect x="114" y="64" width="92" height="36" rx="9" fill={`rgba(${r},.14)`} stroke={`rgba(${r},.28)`} strokeWidth=".8" />
      <rect x="120" y="70" width="46" height="6" rx="3" fill="rgba(255,255,255,.6)" />
      <rect x="120" y="80" width="32" height="4.5" rx="2.25" fill="rgba(255,255,255,.25)" />
      <circle cx="192" cy="82" r="11" fill={`rgba(${r},.28)`} />
      <text x="192" y="86" textAnchor="middle" fontSize="10" fill={c}>✓</text>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="114" y={106+i*22} width="92" height="18" rx="6" fill="rgba(255,255,255,.028)" stroke="rgba(255,255,255,.06)" strokeWidth=".7" />
          <circle cx="124" cy={106+i*22+9} r="5" fill={i===0 ? c : "rgba(255,255,255,.1)"} opacity={i===0 ? .9 : 1} />
          <rect x="134" y={106+i*22+5} width={[42,34,50][i]} height="4" rx="2" fill={i===0 ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.18)"} />
          <rect x="134" y={106+i*22+11} width={[28,42,22][i]} height="3" rx="1.5" fill="rgba(255,255,255,.1)" />
        </g>
      ))}
      <rect x="108" y="158" width="104" height="18" fill="#0E0E1E" />
      {["⌂","◈","⊕","◉"].map((ic,i) => (
        <text key={i} x={120+i*24} y="170" fontSize="9" fill={i===0 ? c : "rgba(255,255,255,.28)"} textAnchor="middle">{ic}</text>
      ))}
      <rect x="143" y="174" width="34" height="3" rx="1.5" fill="rgba(255,255,255,.22)" />
    </svg>
  );
}

function SocialMockup({ c }: { c: string }) {
  const r = rgb(c);
  const posts = [
    { x:10,  y:50,  likes:"4.2k", cmt:"186" },
    { x:166, y:50,  likes:"9.8k", cmt:"432" },
    { x:10,  y:120, likes:"2.1k", cmt:"94"  },
    { x:166, y:120, likes:"6.3k", cmt:"278" },
  ];
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#07070F" />
      <rect width="320" height="26" fill="#0E0E1C" />
      <text x="14" y="17.5" fontSize="10" fill="rgba(255,255,255,.8)" fontFamily="'Bebas Neue',sans-serif" letterSpacing="2">CONTENT STUDIO</text>
      <rect x="220" y="7" width="52" height="12" rx="6" fill={`rgba(${r},.18)`} stroke={`rgba(${r},.38)`} strokeWidth=".8" />
      <text x="246" y="15.5" fontSize="7" fill={c} textAnchor="middle" fontFamily="monospace">Schedule</text>
      <circle cx="294" cy="13" r="10" fill="rgba(255,255,255,.04)" />
      <text x="294" y="17" textAnchor="middle" fontSize="11" fill={c}>+</text>
      <rect y="26" width="320" height="20" fill="#0A0A15" />
      {["Instagram","TikTok","X","LinkedIn"].map((t,i) => (
        <g key={t}>
          <text x={14+i*78} y="39" fontSize="7.5" fill={i===0 ? c : "rgba(255,255,255,.22)"} fontFamily="monospace">{t}</text>
          {i===0 && <line x1="14" y1="45.5" x2={14+t.length*4.5} y2="45.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" />}
        </g>
      ))}
      {posts.map(({ x, y, likes, cmt }, i) => (
        <g key={i}>
          <rect x={x} y={y} width="144" height="65" rx="8" fill={`rgba(${r},${i===1?.2:.12})`} stroke={`rgba(${r},.18)`} strokeWidth=".8" />
          <rect x={x+4} y={y+4} width="58" height="57" rx="6" fill={`rgba(${r},.14)`} />
          <circle cx={x+33} cy={y+32} r="15" fill={`rgba(${r},.28)`} />
          <circle cx={x+33} cy={y+32} r="7" fill={c} opacity=".55" />
          <rect x={x+68} y={y+10} width="68" height="6" rx="3" fill="rgba(255,255,255,.5)" />
          <rect x={x+68} y={y+20} width="54" height="4.5" rx="2.25" fill="rgba(255,255,255,.2)" />
          <rect x={x+68} y={y+28} width="60" height="4" rx="2" fill="rgba(255,255,255,.12)" />
          <rect x={x+68} y={y+46} width="34" height="11" rx="5.5" fill="rgba(255,255,255,.055)" />
          <text x={x+72} y={x+54.5 > 0 ? y+54.5 : y+54} fontSize="6.5" fill={c} fontFamily="monospace">♥ {likes}</text>
          <rect x={x+106} y={y+46} width="32" height="11" rx="5.5" fill="rgba(255,255,255,.055)" />
          <text x={x+110} y={y+54.5} fontSize="6.5" fill="rgba(255,255,255,.38)" fontFamily="monospace">💬 {cmt}</text>
        </g>
      ))}
    </svg>
  );
}

function BrandingMockup({ c }: { c: string }) {
  const r = rgb(c);
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#07070F" />
      <rect width="134" height="190" fill="#0C0C1A" />
      <circle cx="67" cy="72" r="40" fill={`rgba(${r},.07)`} stroke={`rgba(${r},.18)`} strokeWidth=".8" />
      <polygon points="67,36 95,58 83,90 51,90 39,58" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round" opacity=".85" />
      <polygon points="67,46 86,62 78,84 56,84 48,62" fill={`rgba(${r},.14)`} />
      <circle cx="67" cy="68" r="7" fill={c} opacity=".9" />
      <line x1="67" y1="42" x2="67" y2="96" stroke={c} strokeWidth=".9" opacity=".3" />
      <line x1="38" y1="68" x2="96" y2="68" stroke={c} strokeWidth=".9" opacity=".3" />
      <text x="67" y="120" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,.85)" fontFamily="'Bebas Neue',sans-serif" letterSpacing="3">JONTAWORLD</text>
      <text x="67" y="133" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,.3)" fontFamily="monospace" letterSpacing="2">CREATIVE STUDIO</text>
      {[c,"#00DFFF","#B040FF","#F2F4FC","#1A1A2E"].map((col,i) => (
        <rect key={col} x={14+i*22} y="150" width="18" height="18" rx="5" fill={col} />
      ))}
      <text x="67" y="181" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,.2)" fontFamily="monospace">PALETTE · 2026</text>
      <rect x="142" y="10" width="170" height="170" rx="8" fill="rgba(255,255,255,.018)" stroke="rgba(255,255,255,.048)" strokeWidth=".8" />
      <text x="152" y="30" fontSize="7" fill="rgba(255,255,255,.22)" fontFamily="monospace" letterSpacing="2">TYPE · SYSTEM</text>
      <text x="152" y="54" fontSize="24" fill="rgba(255,255,255,.82)" fontFamily="'Bebas Neue',sans-serif" letterSpacing="1">Aa Bb Cc</text>
      <text x="152" y="69" fontSize="11" fill="rgba(255,255,255,.38)" fontFamily="'Playfair Display',serif" fontStyle="italic">The quick brown fox</text>
      <rect x="152" y="76" width="152" height=".7" fill="rgba(255,255,255,.06)" />
      <text x="152" y="90" fontSize="7" fill="rgba(255,255,255,.18)" fontFamily="monospace" letterSpacing="1">USAGE · GUIDE</text>
      {["H1 — Bebas Neue 96pt","H2 — Bebas Neue 48pt","Body — Inter 16pt","Mono — JetBrains 12pt"].map((t,i) => (
        <g key={t}>
          <circle cx="157" cy={99+i*17} r="2.5" fill={i===0 ? c : "rgba(255,255,255,.1)"} />
          <text x="164" y={103+i*17} fontSize="7.5" fill="rgba(255,255,255,.35)" fontFamily="monospace">{t}</text>
        </g>
      ))}
      <rect x="152" y="168" width="154" height="9" rx="4.5" fill={`rgba(${r},.1)`} />
      <text x="156" y="174.5" fontSize="7" fill={c} fontFamily="monospace" letterSpacing="1">RAW SIGNAL · IDENTITY</text>
    </svg>
  );
}

function StoreMockup({ c }: { c: string }) {
  const r = rgb(c);
  const products = [
    { x:10,  name:"Wireless Pro X", price:"$129", stars:5, badge:"New"  },
    { x:114, name:"TrailGear Pack", price:"$89",  stars:4, badge:"Sale" },
    { x:218, name:"Signal Lamp",    price:"$64",  stars:5, badge:null   },
  ];
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#07070F" />
      <rect width="320" height="26" fill="#0E0E1C" />
      <rect x="10" y="8" width="34" height="10" rx="5" fill={c} opacity=".9" />
      <rect x="76" y="8" width="138" height="10" rx="5" fill="rgba(255,255,255,.045)" stroke="rgba(255,255,255,.09)" strokeWidth=".7" />
      <text x="82" y="15.5" fontSize="6.5" fill="rgba(255,255,255,.22)" fontFamily="monospace">Search products…</text>
      <rect x="274" y="7" width="36" height="12" rx="6" fill={`rgba(${r},.18)`} stroke={`rgba(${r},.38)`} strokeWidth=".8" />
      <text x="292" y="15.5" textAnchor="middle" fontSize="7" fill={c} fontFamily="monospace">Cart 3</text>
      <rect y="26" width="320" height="22" fill="#0A0A14" />
      {["All","New In","Electronics","Apparel","Deals"].map((t,i) => (
        <g key={t}>
          <rect x={10+i*62} y="31.5" width={t.length*5+14} height="11" rx="5.5" fill={i===0 ? c : "rgba(255,255,255,.05)"} />
          <text x={17+i*62} y="39.5" fontSize="6.5" fill={i===0 ? "#fff" : "rgba(255,255,255,.32)"} fontFamily="monospace">{t}</text>
        </g>
      ))}
      {products.map(({ x, name, price, stars, badge }) => (
        <g key={x}>
          <rect x={x} y="52" width="96" height="134" rx="10" fill="rgba(255,255,255,.022)" stroke="rgba(255,255,255,.065)" strokeWidth=".8" />
          <rect x={x+4} y="56" width="88" height="70" rx="7" fill={`rgba(${r},.07)`} />
          <circle cx={x+48} cy="91" r="22" fill={`rgba(${r},.14)`} />
          <circle cx={x+48} cy="91" r="11" fill={`rgba(${r},.24)`} />
          <circle cx={x+48} cy="91" r="5" fill={c} opacity=".7" />
          {badge && (
            <>
              <rect x={x+6} y="58" width={badge.length*5.2+10} height="12" rx="4" fill={badge==="New" ? c : "#FF6B35"} />
              <text x={x+9} y="66.5" fontSize="6.5" fill="#fff" fontFamily="monospace">{badge}</text>
            </>
          )}
          <rect x={x+6} y="132" width={name.length*3.8} height="5" rx="2.5" fill="rgba(255,255,255,.5)" />
          <text x={x+6} y="148" fontSize="7.5" fill={c} fontFamily="monospace">{"★".repeat(stars)}{"☆".repeat(5-stars)}</text>
          <text x={x+6} y="162" fontSize="11" fontWeight="700" fill="rgba(255,255,255,.88)" fontFamily="'Orbitron',sans-serif">{price}</text>
          <rect x={x+6} y="165" width="84" height="17" rx="8.5" fill={c} opacity=".9" />
          <text x={x+48} y="176.5" textAnchor="middle" fontSize="7.5" fill="#fff" fontFamily="monospace">Add to Cart</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Service icon SVGs (replaces emojis) ────────────────── */
function SvcIcon({ id, color: c }: { id: string; color: string }) {
  const s: React.CSSProperties = { display:"block", width:20, height:20 };
  if (id==="webapps") return (
    <svg style={s} viewBox="0 0 20 20" fill="none">
      <rect x="1" y="2.5" width="18" height="15" rx="3" stroke={c} strokeWidth="1.35" />
      <rect x="1" y="6" width="18" height=".8" fill={c} opacity=".45" />
      <circle cx="3.8" cy="4.25" r=".9" fill={c} opacity=".7" />
      <circle cx="6.6" cy="4.25" r=".9" fill={c} opacity=".5" />
      <rect x="3.5" y="9" width="5.5" height="5.5" rx="1.5" fill={c} opacity=".28" />
      <rect x="11" y="9" width="6.5" height="2.5" rx="1.25" fill={c} opacity=".38" />
      <rect x="11" y="12.5" width="4.5" height="2" rx="1" fill={c} opacity=".22" />
    </svg>
  );
  if (id==="miniapps") return (
    <svg style={s} viewBox="0 0 20 20" fill="none">
      <rect x="5.5" y="1" width="9" height="18" rx="3" stroke={c} strokeWidth="1.35" />
      <rect x="8.5" y="2.2" width="3" height=".9" rx=".45" fill={c} opacity=".55" />
      <rect x="7.5" y="15.5" width="5" height=".9" rx=".45" fill={c} opacity=".45" />
      <circle cx="10" cy="9.5" r="2.8" fill={c} opacity=".28" />
      <circle cx="10" cy="9.5" r="1.2" fill={c} opacity=".75" />
    </svg>
  );
  if (id==="stores") return (
    <svg style={s} viewBox="0 0 20 20" fill="none">
      <path d="M2 4.5h16l-1.5 7.5H3.5L2 4.5z" stroke={c} strokeWidth="1.35" strokeLinejoin="round" />
      <path d="M3.5 12 2.5 17h15l-1-5" stroke={c} strokeWidth="1.2" strokeLinejoin="round" opacity=".6" />
      <circle cx="7.5" cy="18.5" r="1.3" fill={c} opacity=".8" />
      <circle cx="14.5" cy="18.5" r="1.3" fill={c} opacity=".8" />
      <path d="M7.5 4.5 6 1M12.5 4.5 14 1" stroke={c} strokeWidth="1.1" strokeLinecap="round" opacity=".4" />
    </svg>
  );
  if (id==="brand") return (
    <svg style={s} viewBox="0 0 20 20" fill="none">
      <polygon points="10,1.5 17.5,7 15,18 5,18 2.5,7" stroke={c} strokeWidth="1.35" strokeLinejoin="round" />
      <circle cx="10" cy="10.5" r="2.5" fill={c} opacity=".45" />
      <circle cx="10" cy="10.5" r="1" fill={c} />
    </svg>
  );
  if (id==="forex") return (
    <svg style={s} viewBox="0 0 20 20" fill="none">
      {[{x:2,h:5,y:9},{x:5.5,h:9,y:5},{x:9,h:3.5,y:10.5},{x:12.5,h:12,y:2},{x:16,h:7,y:7}].map(({ x, h, y },i) => (
        <g key={x}>
          <rect x={x} y={y} width="1.8" height={h} rx=".9" fill={c} opacity={.28+i*.13} />
          <line x1={x-.8} y1={y+h*.38} x2={x} y2={y+h*.38} stroke={c} strokeWidth=".9" opacity=".7" />
          <line x1={x+1.8} y1={y+h*.62} x2={x+2.6} y2={y+h*.62} stroke={c} strokeWidth=".9" opacity=".7" />
        </g>
      ))}
      <line x1="1" y1="19" x2="19" y2="19" stroke={c} strokeWidth=".7" opacity=".28" />
    </svg>
  );
  if (id==="apis") return (
    <svg style={s} viewBox="0 0 20 20" fill="none">
      <circle cx="4.5" cy="10" r="3.2" stroke={c} strokeWidth="1.35" />
      <circle cx="15.5" cy="10" r="3.2" stroke={c} strokeWidth="1.35" />
      <line x1="7.7" y1="10" x2="12.3" y2="10" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="6.5" x2="10" y2="4" stroke={c} strokeWidth="1.1" strokeLinecap="round" opacity=".45" />
      <line x1="10" y1="13.5" x2="10" y2="16" stroke={c} strokeWidth="1.1" strokeLinecap="round" opacity=".45" />
    </svg>
  );
  return null;
}

/* ── App-specific UI preview mockups ────────────────────── */
function SafeSignalMockup({ c }: { c: string }) {
  const r = rgb(c);
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#050A0F" />
      <rect width="320" height="26" fill="#080F16" />
      <path d="M12 5.5 L20 7.5 L20 14 C20 17.5 16 20 16 20 C16 20 12 17.5 12 14 Z" stroke={c} strokeWidth="1.1" fill={`rgba(${r},.14)`} />
      <path d="M14 13 L15.2 14.5 L18 11.5" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <text x="28" y="16" fontSize="7.5" fill="rgba(255,255,255,.75)" fontFamily="monospace" letterSpacing="2.5">SAFESIGNAL</text>
      <rect x="248" y="6.5" width="60" height="13" rx="6.5" fill={`rgba(${r},.12)`} stroke={`rgba(${r},.4)`} strokeWidth=".75" />
      <circle cx="258" cy="13" r="3" fill={c} opacity=".9" />
      <text x="265" y="16.5" fontSize="6" fill={c} fontFamily="monospace" letterSpacing="1.5">ACTIVE</text>
      <circle cx="102" cy="108" r="52" fill={`rgba(${r},.03)`} stroke="rgba(255,255,255,.05)" strokeWidth="1" />
      <circle cx="102" cy="108" r="44" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="9" />
      <circle cx="102" cy="108" r="44" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" strokeDasharray="195 82" transform="rotate(-90 102 108)" opacity=".92" />
      <text x="102" y="102" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,.92)" fontFamily="monospace" fontWeight="700">45:00</text>
      <text x="102" y="118" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,.32)" fontFamily="monospace" letterSpacing="2.5">TIME LEFT</text>
      <rect x="60" y="155" width="84" height="19" rx="9.5" fill={c} opacity=".92" />
      <text x="102" y="167.5" textAnchor="middle" fontSize="7" fill="#fff" fontFamily="monospace" letterSpacing="1.5">CHECK IN NOW</text>
      <rect x="172" y="35" width="136" height="146" rx="10" fill="#080F16" stroke="rgba(255,255,255,.055)" strokeWidth=".75" />
      <text x="182" y="52" fontSize="6.5" fill="rgba(255,255,255,.25)" fontFamily="monospace" letterSpacing="2">WORKER STATUS</text>
      {([
        { name:"M. Webb",     site:"Plant Room B",  col:"#4ADE80", st:"active"  },
        { name:"S. Okafor",   site:"Rooftop — A",   col:"#FF4444", st:"overdue" },
        { name:"D. Mitchell", site:"Boiler Room",   col:"#4ADE80", st:"safe"    },
        { name:"P. Nambiar",  site:"Substation 3B", col:"#4ADE80", st:"active"  },
      ] as const).map(({ name, site, col, st }, i) => (
        <g key={name}>
          <rect x="180" y={60+i*28} width="120" height="20" rx="6" fill="rgba(255,255,255,.022)" stroke="rgba(255,255,255,.05)" strokeWidth=".7" />
          <circle cx="189" cy={70+i*28} r="3.5" fill={col} />
          <text x="197" y={68+i*28} fontSize="6.5" fill="rgba(255,255,255,.72)" fontFamily="monospace">{name}</text>
          <text x="197" y={77+i*28} fontSize="5.5" fill="rgba(255,255,255,.28)" fontFamily="monospace">{site}</text>
          <text x="295" y={71+i*28} textAnchor="end" fontSize="5.5" fill={col} fontFamily="monospace">{st}</text>
        </g>
      ))}
      <text x="182" y="176" fontSize="5.5" fill={`rgba(${r},.4)`} fontFamily="monospace">📍 -1.292° N, 36.821° E</text>
    </svg>
  );
}

function TrailDeskMockup({ c }: { c: string }) {
  const r = rgb(c);
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#050E09" />
      <rect width="320" height="26" fill="#070F0A" />
      <path d="M13 20 L13 10 L17 14 L21 7 L21 20" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="7" r="2" fill={c} opacity=".9" />
      <text x="30" y="16" fontSize="7.5" fill="rgba(255,255,255,.72)" fontFamily="monospace" letterSpacing="2.5">TRAILDESK</text>
      <rect x="248" y="7" width="60" height="12" rx="6" fill={`rgba(${r},.12)`} stroke={`rgba(${r},.38)`} strokeWidth=".75" />
      <text x="278" y="15" textAnchor="middle" fontSize="6" fill={c} fontFamily="monospace" letterSpacing="1">ACTIVE TRIP</text>
      <rect x="0" y="26" width="320" height="106" fill="#040C07" />
      {([50,68,86,104,118,130] as const).map((ry,i) => (
        <ellipse key={ry} cx="160" cy={ry} rx={120-i*8} ry={28-i*3} stroke={`rgba(52,211,153,0.${8-i})`} strokeWidth=".6" fill="none" />
      ))}
      {Array.from({length:9},(_,i)=>(
        <line key={i} x1={30+i*32} y1="26" x2={30+i*32} y2="132" stroke={`rgba(${r},.04)`} strokeWidth=".5" />
      ))}
      {([40,60,80,100,120] as const).map(gy=>(
        <line key={gy} x1="0" y1={gy} x2="320" y2={gy} stroke={`rgba(${r},.04)`} strokeWidth=".5" />
      ))}
      <polyline points="42,120 78,92 114,105 155,72 195,80 232,58 275,65" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" opacity=".85" />
      {([{x:42,y:120,n:"S"},{x:155,y:72,n:"2"},{x:232,y:58,n:"3"},{x:275,y:65,n:"E"}] as const).map(({x,y,n})=>(
        <g key={n}>
          <circle cx={x} cy={y} r="7" fill={`rgba(${r},.18)`} stroke={c} strokeWidth="1.2" />
          <text x={x} y={y+3.5} textAnchor="middle" fontSize="6.5" fill={c} fontFamily="monospace" fontWeight="700">{n}</text>
        </g>
      ))}
      <circle cx="195" cy="80" r="5" fill={c} opacity=".95" />
      <circle cx="195" cy="80" r="9" stroke={c} strokeWidth="1" opacity=".4" />
      <rect x="0" y="132" width="320" height="58" fill="#070F0A" />
      <line x1="0" y1="132" x2="320" y2="132" stroke={`rgba(${r},.22)`} strokeWidth=".8" />
      <text x="16" y="150" fontSize="6" fill="rgba(255,255,255,.28)" fontFamily="monospace" letterSpacing="2">TRIP STATS</text>
      {([
        {label:"Distance", val:"12.4 km", x:16},
        {label:"Elevation", val:"680 m",  x:114},
        {label:"Duration",  val:"3h 22m", x:200},
        {label:"GPS Pts",   val:"1,420",  x:274},
      ] as const).map(({label,val,x})=>(
        <g key={label}>
          <text x={x} y={168} fontSize="12" fontWeight="700" fill={c} fontFamily="monospace">{val}</text>
          <text x={x} y={178} fontSize="5.5" fill="rgba(255,255,255,.3)" fontFamily="monospace" letterSpacing="1">{label.toUpperCase()}</text>
        </g>
      ))}
    </svg>
  );
}

function DigiLearnMockup({ c }: { c: string }) {
  const r = rgb(c);
  const courses = [
    { title:"React & Next.js",     cat:"WEB DEV",  pct:72, rating:"4.9" },
    { title:"Machine Learning",    cat:"AI / ML",  pct:38, rating:"4.8" },
    { title:"Python Fundamentals", cat:"BACKEND",  pct:55, rating:"4.7" },
    { title:"Ethical Hacking",     cat:"SECURITY", pct:20, rating:"4.9" },
  ];
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#0A1628" />
      <rect width="320" height="26" fill="#0D1C35" />
      <rect x="10" y="8" width="28" height="10" rx="5" fill={c} opacity=".9" />
      <text x="14" y="15.5" fontSize="6.5" fill="#050E1E" fontFamily="monospace" fontWeight="700">DIGI</text>
      <text x="44" y="16" fontSize="7.5" fill="rgba(255,255,255,.72)" fontFamily="monospace" letterSpacing="2">DIGILEARN</text>
      <rect x="214" y="7" width="42" height="12" rx="6" fill={`rgba(${r},.12)`} stroke={`rgba(${r},.35)`} strokeWidth=".75" />
      <text x="235" y="15.5" textAnchor="middle" fontSize="6" fill={c} fontFamily="monospace">100+ Free</text>
      <rect x="260" y="7" width="46" height="12" rx="6" fill={c} opacity=".9" />
      <text x="283" y="15.5" textAnchor="middle" fontSize="6.5" fill="#050E1E" fontFamily="monospace" fontWeight="700">Browse →</text>
      {courses.map(({ title, cat, pct, rating }, i) => {
        const cx = i % 2 === 0 ? 10 : 168;
        const cy = i < 2 ? 34 : 116;
        return (
          <g key={title}>
            <rect x={cx} y={cy} width="142" height="76" rx="8" fill="#0E1F38" stroke={`rgba(${r},.12)`} strokeWidth=".75" />
            <rect x={cx} y={cy} width="142" height="26" rx="8" fill={`rgba(${r},.1)`} />
            <rect x={cx+6} y={cy+8} width={cat.length*5+8} height="10" rx="5" fill={`rgba(${r},.25)`} />
            <text x={cx+10} y={cy+15.5} fontSize="5.5" fill={c} fontFamily="monospace" letterSpacing="1">{cat}</text>
            <text x={cx+6} y={cy+40} fontSize="7" fill="rgba(255,255,255,.82)" fontFamily="sans-serif">{title}</text>
            <text x={cx+6} y={cy+53} fontSize="5.5" fill={`rgba(${r},.7)`} fontFamily="monospace">★ {rating}</text>
            <rect x={cx+6} y={cy+60} width="130" height="4" rx="2" fill="rgba(255,255,255,.07)" />
            <rect x={cx+6} y={cy+60} width={130*pct/100} height="4" rx="2" fill={c} opacity=".75" />
            <text x={cx+138} y={cy+64} textAnchor="end" fontSize="5" fill={`rgba(${r},.6)`} fontFamily="monospace">{pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

function ElectraCoreMockup({ c }: { c: string }) {
  const r = rgb(c);
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#070810" />
      <rect width="320" height="26" fill="#0B0C1A" />
      <polygon points="16,20 12,10 19,10 15,16 22,16 14,24" fill={c} opacity=".9" />
      <text x="30" y="16" fontSize="7.5" fill="rgba(255,255,255,.72)" fontFamily="monospace" letterSpacing="2">ELECTRACORE</text>
      <rect x="238" y="7" width="70" height="12" rx="6" fill={`rgba(${r},.12)`} stroke={`rgba(${r},.35)`} strokeWidth=".75" />
      <text x="273" y="15.5" textAnchor="middle" fontSize="6" fill={c} fontFamily="monospace" letterSpacing=".5">Pro Calculator</text>
      <rect x="10" y="34" width="176" height="148" rx="10" fill="#0B0C1A" stroke="rgba(255,255,255,.055)" strokeWidth=".75" />
      <text x="20" y="51" fontSize="7" fill={`rgba(${r},.7)`} fontFamily="monospace" letterSpacing="2">VOLTAGE CALCULATOR</text>
      {([
        { label:"Voltage (V)",  val:"230",  unit:"V" },
        { label:"Current (A)",  val:"20",   unit:"A" },
        { label:"Power Factor", val:"0.95", unit:""  },
      ] as const).map(({ label, val, unit }, i) => (
        <g key={label}>
          <text x="20" y={68+i*32} fontSize="6" fill="rgba(255,255,255,.38)" fontFamily="monospace">{label}</text>
          <rect x="20" y={72+i*32} width="156" height="18" rx="5" fill="rgba(255,255,255,.04)" stroke={`rgba(${r},.2)`} strokeWidth=".75" />
          <text x="30" y={84+i*32} fontSize="9" fill="rgba(255,255,255,.82)" fontFamily="monospace" fontWeight="700">{val}</text>
          {unit ? <text x="160" y={84+i*32} textAnchor="end" fontSize="7" fill={`rgba(${r},.55)`} fontFamily="monospace">{unit}</text> : null}
        </g>
      ))}
      <rect x="20" y="157" width="156" height="18" rx="5" fill={`rgba(${r},.12)`} stroke={c} strokeWidth=".75" />
      <text x="28" y="169" fontSize="9" fill={c} fontFamily="monospace" fontWeight="700">P = 4.37 kW</text>
      <rect x="198" y="34" width="112" height="148" rx="10" fill="#0B0C1A" stroke="rgba(255,255,255,.055)" strokeWidth=".75" />
      <text x="208" y="51" fontSize="6.5" fill="rgba(255,255,255,.25)" fontFamily="monospace" letterSpacing="1">CIRCUIT</text>
      <line x1="218" y1="100" x2="228" y2="100" stroke={c} strokeWidth="1.3" opacity=".7" />
      <circle cx="224" cy="100" r="8" fill="none" stroke={c} strokeWidth="1.2" opacity=".6" />
      <text x="224" y="103.5" textAnchor="middle" fontSize="7" fill={c} opacity=".9" fontFamily="monospace">∿</text>
      <line x1="232" y1="100" x2="248" y2="100" stroke={c} strokeWidth="1.3" opacity=".7" />
      <path d="M248,100 L252,94 L256,106 L260,94 L264,106 L268,94 L272,100" stroke={c} strokeWidth="1.2" fill="none" opacity=".75" />
      <line x1="272" y1="100" x2="285" y2="100" stroke={c} strokeWidth="1.3" opacity=".7" />
      <rect x="285" y="92" width="10" height="16" rx="2" fill="none" stroke={c} strokeWidth="1.2" opacity=".65" />
      <line x1="295" y1="92" x2="295" y2="76" stroke={c} strokeWidth="1.2" opacity=".5" />
      <line x1="224" y1="92" x2="224" y2="76" stroke={c} strokeWidth="1.2" opacity=".5" />
      <line x1="224" y1="76" x2="295" y2="76" stroke={c} strokeWidth="1.2" opacity=".5" />
      <text x="259" y="72" textAnchor="middle" fontSize="7" fill={`rgba(${r},.6)`} fontFamily="monospace">230V</text>
      <text x="277" y="90" textAnchor="middle" fontSize="6" fill={`rgba(${r},.5)`} fontFamily="monospace">20Ω</text>
      {(["Ohm","Load","3Ø","Cost"] as const).map((t,i) => (
        <g key={t}>
          <rect x={208+i*24} y="145" width="20" height="20" rx="5" fill={`rgba(${r},.1)`} stroke={`rgba(${r},.22)`} strokeWidth=".7" />
          <text x={218+i*24} y="157.5" textAnchor="middle" fontSize="5.5" fill={`rgba(${r},.65)`} fontFamily="monospace">{t}</text>
        </g>
      ))}
    </svg>
  );
}

function ApprenticeLogMockup({ c }: { c: string }) {
  const r = rgb(c);
  const logs = [
    { task:"Cable install — conduit Level 3", hrs:"6.5h", status:"signed"  },
    { task:"Switchboard wiring — main DB",    hrs:"4.0h", status:"signed"  },
    { task:"Testing & tagging appliances",    hrs:"3.5h", status:"pending" },
    { task:"Motor circuit — 3 phase setup",   hrs:"5.0h", status:"pending" },
  ];
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#050C14" />
      <rect width="320" height="26" fill="#080F18" />
      <path d="M12 22 L18 8 L24 22 M14 18 H22" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="32" y="16" fontSize="7.5" fill="rgba(255,255,255,.72)" fontFamily="monospace" letterSpacing="2">APPRENTICELOG</text>
      <rect x="240" y="7" width="68" height="12" rx="6" fill={c} opacity=".88" />
      <text x="274" y="15.5" textAnchor="middle" fontSize="6" fill="#050C14" fontFamily="monospace" fontWeight="700">Export PDF →</text>
      <rect x="10" y="34" width="300" height="28" rx="8" fill="#080F18" stroke="rgba(255,255,255,.055)" strokeWidth=".75" />
      <text x="20" y="48" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,.82)" fontFamily="monospace">2,184h</text>
      <text x="82" y="47.5" fontSize="6" fill="rgba(255,255,255,.3)" fontFamily="monospace">of 3,200h · 68% complete</text>
      <rect x="20" y="52" width="280" height="5" rx="2.5" fill="rgba(255,255,255,.06)" />
      <rect x="20" y="52" width="190" height="5" rx="2.5" fill={c} opacity=".8" />
      {logs.map(({ task, hrs, status }, i) => (
        <g key={task}>
          <rect x="10" y={72+i*27} width="300" height="22" rx="6" fill={i%2===0?"rgba(255,255,255,.02)":"#050C14"} stroke="rgba(255,255,255,.04)" strokeWidth=".7" />
          <text x="18" y={86+i*27} fontSize="6.5" fill="rgba(255,255,255,.62)" fontFamily="monospace">{task}</text>
          <text x="222" y={86+i*27} fontSize="7" fill={`rgba(${r},.7)`} fontFamily="monospace" fontWeight="700">{hrs}</text>
          <rect x="247" y={75+i*27} width={status==="signed"?42:46} height="12" rx="6" fill={status==="signed"?"rgba(74,222,128,.12)":"rgba(251,191,36,.1)"} stroke={status==="signed"?"rgba(74,222,128,.4)":"rgba(251,191,36,.3)"} strokeWidth=".7" />
          <text x={status==="signed"?268:270} y={83+i*27} textAnchor="middle" fontSize="5.5" fill={status==="signed"?"#4ADE80":"#FBBf24"} fontFamily="monospace">{status==="signed"?"✓ Signed":"⏳ Pending"}</text>
        </g>
      ))}
    </svg>
  );
}

function ForexProMockup({ c }: { c: string }) {
  const r = rgb(c);
  const candles = [
    { o:110, cl:105, h:114, l:102, bear:true  },
    { o:105, cl:115, h:118, l:103, bear:false },
    { o:115, cl:108, h:119, l:105, bear:true  },
    { o:108, cl:122, h:124, l:106, bear:false },
    { o:122, cl:118, h:126, l:116, bear:true  },
    { o:118, cl:130, h:132, l:116, bear:false },
    { o:130, cl:126, h:134, l:123, bear:true  },
    { o:126, cl:138, h:140, l:124, bear:false },
  ];
  const scaleY = (v: number) => 130 - (v - 100) * 2.2;
  return (
    <svg viewBox="0 0 320 190" fill="none" style={{ width:"100%", display:"block" }}>
      <rect width="320" height="190" rx="10" fill="#040F08" />
      <rect width="320" height="26" fill="#060F0A" />
      <text x="14" y="16" fontSize="7.5" fill="rgba(255,255,255,.72)" fontFamily="monospace" letterSpacing="2">FOREXPRO</text>
      <rect x="168" y="7" width="58" height="12" rx="6" fill={`rgba(${r},.12)`} stroke={`rgba(${r},.35)`} strokeWidth=".75" />
      <text x="197" y="15.5" textAnchor="middle" fontSize="6" fill={c} fontFamily="monospace">EUR/USD</text>
      <rect x="234" y="7" width="74" height="12" rx="6" fill={`rgba(${r},.12)`} stroke={`rgba(${r},.35)`} strokeWidth=".75" />
      <text x="271" y="15.5" textAnchor="middle" fontSize="7.5" fill={c} fontFamily="monospace" fontWeight="700">1.0847 ↑</text>
      <rect x="0" y="26" width="320" height="110" fill="#050E08" />
      {([40,60,80,100,120] as const).map(gy => (
        <line key={gy} x1="0" y1={gy} x2="320" y2={gy} stroke="rgba(255,255,255,.035)" strokeWidth=".5" />
      ))}
      {([{y:40,p:"1.0870"},{y:70,p:"1.0855"},{y:100,p:"1.0840"},{y:125,p:"1.0825"}] as const).map(({ y, p }) => (
        <text key={p} x="266" y={y+4} fontSize="5.5" fill="rgba(255,255,255,.22)" fontFamily="monospace">{p}</text>
      ))}
      {candles.map(({ o, cl, h, l, bear }, i) => {
        const x = 22 + i * 32;
        const oY = scaleY(o); const cY = scaleY(cl); const hY = scaleY(h); const lY = scaleY(l);
        const col = bear ? "#FF4444" : c;
        const top = Math.min(oY, cY); const bot = Math.max(oY, cY);
        return (
          <g key={i}>
            <line x1={x+6} y1={hY} x2={x+6} y2={lY} stroke={col} strokeWidth="1" opacity=".7" />
            <rect x={x} y={top} width="12" height={Math.max(bot-top,2)} rx="1.5" fill={col} opacity={bear ? ".7" : ".85"} />
          </g>
        );
      })}
      <polyline points="28,113 60,107 92,104 124,97 156,85 188,77 220,68 252,60" stroke={c} strokeWidth="1.2" fill="none" opacity=".55" strokeDasharray="3 2" />
      <rect x="0" y="136" width="320" height="54" fill="#060F0A" />
      <line x1="0" y1="136" x2="320" y2="136" stroke={`rgba(${r},.2)`} strokeWidth=".8" />
      <text x="14" y="152" fontSize="13" fontWeight="700" fill={c} fontFamily="monospace">+2.4%</text>
      <text x="14" y="165" fontSize="5.5" fill="rgba(255,255,255,.28)" fontFamily="monospace">P&amp;L TODAY</text>
      {(["BUY","SELL"] as const).map((label, i) => (
        <g key={label}>
          <rect x={166+i*78} y="139" width="68" height="44" rx="8" fill={i===0 ? c : "#FF4444"} opacity={i===0 ? ".9" : ".85"} />
          <text x={200+i*78} y="158" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="monospace">{label}</text>
          <text x={200+i*78} y="172" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,.7)" fontFamily="monospace">{i===0 ? "1.0848" : "1.0846"}</text>
        </g>
      ))}
      <text x="14" y="183" fontSize="5" fill="rgba(255,255,255,.15)" fontFamily="monospace">Spread: 0.2 pips · Leverage: 1:100</text>
    </svg>
  );
}

/* ── Showcase card shell ─────────────────────────────────── */
function ShowcaseCard({
  num, title, sub, color, href, tag, children
}: {
  num: string; title: string; sub: string; color: string; href?: string; tag: string; children: React.ReactNode
}) {
  const [hov, setHov] = useState(false);
  const r = hexToRgbStr(color);
  const inner = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: "hidden", background: "#06060F",
        border: `1px solid ${hov ? `rgba(${r},.4)` : "rgba(255,255,255,.06)"}`,
        boxShadow: hov
          ? `0 0 0 1px rgba(${r},.18), 0 24px 64px rgba(0,0,0,.8), 0 0 48px rgba(${r},.12)`
          : "0 8px 32px rgba(0,0,0,.6)",
        transform: hov ? "translateY(-6px) scale(1.01)" : "none",
        transition: "transform .35s cubic-bezier(.25,1,.5,1), border-color .25s, box-shadow .35s",
        display: "flex", flexDirection: "column", height: "100%",
        cursor: href ? "pointer" : "default",
        position: "relative" as const,
      }}
    >
      <div style={{
        position: "relative",
        borderBottom: `1px solid rgba(${r},.12)`,
        overflow: "hidden",
        flex: 1,
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(to right, transparent, rgba(${r},.6) 40%, rgba(${r},.6) 60%, transparent)`,
          zIndex: 2,
          opacity: hov ? 1 : 0.5,
          transition: "opacity .3s",
        }}/>
        {children}
        {href && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: `rgba(0,0,0,${hov ? ".45" : "0"})`,
            transition: "background .3s",
            zIndex: 3,
          }}>
            {hov && (
              <span style={{
                background: color, color: "#060610", fontWeight: 900, fontSize: "0.9rem",
                letterSpacing: "0.08em", padding: "0.65rem 1.75rem", borderRadius: 50,
                boxShadow: `0 8px 24px rgba(${r},.4)`,
              }}>
                Open App
              </span>
            )}
          </div>
        )}
      </div>
      <div style={{
        padding: "12px 16px 14px",
        background: "#08080F",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: `1px solid rgba(255,255,255,.05)`,
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", letterSpacing: ".06em", color: "rgba(255,255,255,.9)" }}>{title}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: color, background: `rgba(${r},.1)`, border: `1px solid rgba(${r},.3)`, borderRadius: 100, padding: "1px 7px", letterSpacing: ".12em" }}>{tag}</span>
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,.28)", lineHeight: 1.4, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0, paddingLeft: 12 }}>
          {href && <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", color: color, letterSpacing: ".14em", padding: "2px 8px", border: `1px solid rgba(${r},.35)`, borderRadius: 20 }}>LIVE</span>}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: `rgba(${r},.5)`, letterSpacing: ".16em" }}>{num}</span>
        </div>
      </div>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener" style={{ textDecoration: "none", display: "block", height: "100%" }}>{inner}</a>;
  return <div style={{ height: "100%" }}>{inner}</div>;
}

function ShowcaseCollage() {
  const apps = [
    { num:"01", title:"SafeSignal",    sub:"Lone worker safety — GPS check-ins, escalating alerts, compliance export",    color:"#FF6B35", href:"https://safesignal.vercel.app",     tag:"Safety",     Preview: <SafeSignalPreview />    },
    { num:"02", title:"TrailDesk",     sub:"Offline trail journaling with GPS, gear lists and emergency contacts",         color:"#34D399", href:"https://traildesk.vercel.app",      tag:"Outdoor",    Preview: <TrailDeskPreview />     },
    { num:"03", title:"DigiLearn",     sub:"100+ free courses for the AI era — web dev, ML, security and more",           color:"#0284C7", href:"https://digilearn.vercel.app",      tag:"EdTech",     Preview: <DigiLearnPreview />     },
    { num:"04", title:"ElectraCore",   sub:"Electrical calculators, load analysis, wiring guides and job billing",        color:"#D4A843", href:"https://electracore.vercel.app",    tag:"Web App",    Preview: <ElectraCorePreview />   },
    { num:"05", title:"ApprenticeLog", sub:"Digital trade logbook — hours logging, sign-offs and PDF export",             color:"#00C8FF", href:"https://apprentice-log.vercel.app", tag:"Trade",      Preview: <ApprenticeLogPreview /> },
    { num:"06", title:"ForexPro",      sub:"Broker-grade trading platform with live feeds, positions and analysis",        color:"#4ADE80", href:"https://fxprorise.org",             tag:"Fintech",    Preview: <ForexProPreview />      },
  ] as const;

  return (
    <div style={{ display: "grid", gap: 16, paddingBottom: 40 }}>
      {/* Row 1: Large featured + 2 stacked */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ aspectRatio: "16/9" }}>
          <ShowcaseCard num={apps[0].num} title={apps[0].title} sub={apps[0].sub} color={apps[0].color} href={apps[0].href} tag={apps[0].tag}>
            <ShowBrowserFrame color={apps[0].color} url="safesignal.vercel.app/dashboard">
              <SafeSignalPreview />
            </ShowBrowserFrame>
          </ShowcaseCard>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {([apps[1], apps[2]] as const).map((app) => (
            <ShowcaseCard key={app.num} num={app.num} title={app.title} sub={app.sub} color={app.color} href={app.href} tag={app.tag}>
              <ShowBrowserFrame color={app.color} url={app.href.replace("https://","")}>
                {app.Preview}
              </ShowBrowserFrame>
            </ShowcaseCard>
          ))}
        </div>
      </div>
      {/* Row 2: 3 equal */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {([apps[3], apps[4], apps[5]] as const).map((app) => (
          <ShowcaseCard key={app.num} num={app.num} title={app.title} sub={app.sub} color={app.color} href={app.href} tag={app.tag}>
            <ShowBrowserFrame color={app.color} url={app.href.replace("https://","")}>
              {app.Preview}
            </ShowBrowserFrame>
          </ShowcaseCard>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [  { id:"webapps",  title:"Web Applications",    desc:"Full-stack SaaS, dashboards, and tools — from database to polished UI.", color:"#00DFFF", examples:[{ label:"ElectraCore", href:"https://electracore.vercel.app" },{ label:"DigiLearn", href:"https://digilearn-five.vercel.app" }] },  { id:"miniapps", title:"Mini Apps",             desc:"World App and Telegram mini apps. Verified-human gates, wallet actions, real-time payments.", color:"#B040FF", examples:[{ label:"Tcash (coming)", href:"#" },{ label:"HumanChain (coming)", href:"#" }] },  { id:"stores",   title:"Online Stores",         desc:"Shopify and custom e-commerce — product listings, cart, checkout, and payment flows.", color:"#F59E0B", examples:[{ label:"Custom builds", href:"#contact" }] },  { id:"brand",    title:"Brand and Design",      desc:"Logo suites, social templates, pitch decks, and full brand identity packages.", color:"#FF8820", examples:[{ label:"View showcase", href:"#showcase" }] },  { id:"forex",    title:"Forex Platforms",       desc:"Trading dashboards, live feed integrations, broker-grade UX for financial products.", color:"#34D399", examples:[{ label:"ForexPro", href:"https://fxprorise.org" }] },  { id:"apis",     title:"APIs and Integrations", desc:"M-Pesa, Stripe, World ID, Supabase, OpenAI — connecting the pieces your product needs.", color:"#00DFFF", examples:[{ label:"Tcash payments", href:"#" }] },];

export default function Home() {  const parallax1 = useParallax(0.18);  const parallax2 = useParallax(0.12);  const [s1ref, s1visible] = useInView();  const [s2ref, s2visible] = useInView();  const [s3ref, s3visible] = useInView();  const [s4ref, s4visible] = useInView();  const [s5ref, s5visible] = useInView();  const r1 = useReveal(0), r2 = useReveal(80);  const r3 = useReveal(0), r4 = useReveal(0), r5 = useReveal(0), r6 = useReveal(0);  const r7 = useReveal(0), r8 = useReveal(0);  const [mounted, setMounted] = useState(false);  const [ghRepos, setGhRepos] = useState<number | null>(null);  const mouse       = useRef({ x: 0, y: 0 });  const scrollY     = useRef(0);  const progressRef = useRef<HTMLDivElement>(null);  useEffect(() => {    /* eslint-disable-next-line react-hooks/set-state-in-effect */    setMounted(true);    const onMouse = (e: MouseEvent) => {      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;    };    const onScroll = () => {      scrollY.current = window.scrollY;      if (progressRef.current) {        const total = document.documentElement.scrollHeight - window.innerHeight;        progressRef.current.style.transform = `scaleX(${Math.min(window.scrollY / total, 1)})`;      }    };    window.addEventListener("mousemove", onMouse);    window.addEventListener("scroll", onScroll, { passive: true });    fetch("https://api.github.com/users/Jonta254")      .then((r) => r.json())      .then((d) => { if (d.public_repos) setGhRepos(d.public_repos); })      .catch(() => {});    return () => {      window.removeEventListener("mousemove", onMouse);      window.removeEventListener("scroll", onScroll);    };  }, []);  return (    <>      {/* Scroll progress */}      <div ref={progressRef} className="scroll-progress-bar" />      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• HERO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ position: "relative", minHeight: "100svh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(160deg, #08001A 0%, #050012 35%, #020008 70%, #010006 100%)" }}>        {/* â”€â”€ 3D deep-space background scene â”€â”€ */}        {mounted && !isMobile() && (          <ErrorBoundary>            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>              <HeroScene scrollY={scrollY} mouse={mouse} />            </div>          </ErrorBoundary>        )}        {/* â”€â”€ Moving aurora mesh — always visible â”€â”€ */}        <div className="hero-aurora" style={{ zIndex: 1 }} />        {/* â”€â”€ Secondary breathing glow layer â”€â”€ */}        <div aria-hidden="true" style={{          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",          background: "radial-gradient(ellipse 60% 40% at 20% 90%, rgba(255,80,0,0.10) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 90% 20%, rgba(0,200,255,0.08) 0%, transparent 50%)",          animation: "heroBreathe 8s ease-in-out infinite",        }} />        {/* â”€â”€ CSS atmosphere layers â”€â”€ */}        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",          background: "radial-gradient(ellipse 75% 90% at 15% 65%, rgba(255,100,10,0.18) 0%, transparent 65%)" }} />        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",          background: "radial-gradient(ellipse 55% 70% at 85% 50%, rgba(0,180,255,0.12) 0%, transparent 60%)" }} />        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",          background: "radial-gradient(ellipse 45% 55% at 50% 0%, rgba(140,40,255,0.10) 0%, transparent 55%)" }} />        {/* â”€â”€ Dot grid â”€â”€ */}        <div className="dot-grid" style={{ zIndex: 2, opacity: 0.5 }} />        {/* â”€â”€ Subtle radial vignette over 3D scene â”€â”€ */}        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 25%, rgba(2,0,8,0.50) 100%)" }} />        {/* â”€â”€ Photo texture — very dim, grounds the scene â”€â”€ */}        <div ref={parallax1} style={{ position: "absolute", inset: "-15%", zIndex: 2, pointerEvents: "none", opacity: 0.07, mixBlendMode: "luminosity" }}>          <Image src="/images/rawsignal-hero.png" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} priority sizes="100vw" />        </div>        {/* â”€â”€ Bottom fade to page â”€â”€ */}        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",          background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(5,0,16,0.88) 80%, #060010 100%)" }} />        {/* â”€â”€ Left text fade â”€â”€ */}        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",          background: "linear-gradient(to right, rgba(5,0,14,0.65) 0%, rgba(5,0,14,0.20) 40%, transparent 65%)" }} />        {/* â”€â”€ 3D orb — desktop right side â”€â”€ */}        {mounted && !isMobile() && (          <ErrorBoundary>            <div className="hero-orb-wrap" style={{ position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)", width: "52vw", height: "80vh", zIndex: 4, pointerEvents: "none" }}>              <HeroOrb mouse={mouse} scrollY={scrollY} fov={44} distance={5} glowIntensity={2.2} />            </div>          </ErrorBoundary>        )}        {/* Available badge — glass pill */}        <div style={{ position: "absolute", top: "clamp(5rem,10vw,7rem)", left: "clamp(1.25rem,4vw,2.5rem)", zIndex: 6, display: "flex", alignItems: "center", gap: 8, background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.22)", borderRadius: 100, padding: "5px 14px 5px 8px", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D399", animation: "sig-pulse 2s ease-in-out infinite", flexShrink: 0 }} />          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(8px,1.1vw,10px)", letterSpacing: "0.18em", color: "#34D399", textTransform: "uppercase", whiteSpace: "nowrap" }}>            Available for work          </span>        </div>        {/* â”€â”€ Top-right corner bracket â”€â”€ */}        <div aria-hidden="true" style={{ position: "absolute", top: "clamp(4.5rem,9vw,6.5rem)", right: "clamp(1rem,3vw,2rem)", zIndex: 6, width: 36, height: 36, borderTop: "1px solid rgba(255,255,255,0.12)", borderRight: "1px solid rgba(255,255,255,0.12)", pointerEvents: "none" }} />        {/* â”€â”€ Bottom-left corner bracket â”€â”€ */}        <div aria-hidden="true" style={{ position: "absolute", bottom: "clamp(1.5rem,3vw,3rem)", left: "clamp(1.25rem,4vw,2.5rem)", zIndex: 6, width: 28, height: 28, borderBottom: "1px solid rgba(255,136,32,0.30)", borderLeft: "1px solid rgba(255,136,32,0.30)", pointerEvents: "none" }} />        {/* Hero content — responsive via .hero-content class */}        <div className="hero-content" style={{ position: "relative", zIndex: 6, padding: "0 clamp(1.25rem,4vw,2.5rem) clamp(2.5rem,5vw,4.5rem)" }}>          <h1 style={{ margin: 0, lineHeight: 0.82 }}>            <BrianName />          </h1>          <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginTop:"0.75rem", marginBottom:"clamp(0.75rem,1.5vw,1.2rem)", flexWrap:"wrap" }}>            <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:"clamp(0.85rem,1.8vw,1.1rem)", color:"rgba(255,255,255,0.42)", letterSpacing:"0.06em" }}>Brian Josiah</span>            <span style={{ color:"rgba(255,255,255,0.18)", fontSize:"0.85rem", fontWeight:300 }}>·</span>            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(0.72rem,1.4vw,0.88rem)", color:"rgba(255,136,32,0.58)", letterSpacing:"0.14em", textTransform:"uppercase" }}>JontAWorld</span>          </div>        <div className="hero-bottom">            <div>              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,2.2vw,1.4rem)", color: "rgba(255,255,255,0.68)", lineHeight: 1.65, width: "min(500px, calc(100vw - 2.5rem))", maxWidth: "100%", marginBottom: 14, overflowWrap: "break-word" }}>                Electrician turned developer — building products that work in the real world.              </p>              {mounted && (                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.2vw,11px)", color: "rgba(255,255,255,0.22)", letterSpacing: "0.08em" }}>â†’</span>                  <TypeWriter                    words={["Electrician.", "Developer.", "3D Web.", "Designer.", "Human."]}                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px,1.2vw,11px)", color: "var(--copper)", letterSpacing: "0.12em" }}                  />                </div>              )}            </div>            <div className="hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>              <MagneticButton as="a" href="/portfolio" className="btn btn-primary" style={{ fontSize: "clamp(11px,1.2vw,13px)", letterSpacing: "0.12em" }}>Enter Portfolio</MagneticButton>              <MagneticButton as="a" href="/about"     className="btn btn-ghost"   style={{ fontSize: "clamp(11px,1.2vw,13px)" }}>Read Signal</MagneticButton>            </div>          </div>        </div>        <style>{`          @keyframes sig-pulse{            0%,100%{box-shadow:0 0 7px #34D399; transform:scale(1);}            50%{box-shadow:0 0 20px #34D399,0 0 36px rgba(52,211,153,0.35); transform:scale(1.25);}          }          @keyframes heroFloat{0%,100%{transform:translateY(0px)}50%{transform:translateY(-10px)}}          @keyframes heroDiamondShimmer{0%{background-position:200% 0}50%{background-position:0% 0}100%{background-position:-200% 0}}          @keyframes heroGlint{0%,78%,100%{opacity:0;transform:scaleX(0.2) translateX(-80%)}84%{opacity:1;transform:scaleX(1) translateX(0)}90%{opacity:0;transform:scaleX(0.2) translateX(80%)}}          @keyframes heroBreathe{0%,100%{opacity:0.7;transform:scale(1)}50%{opacity:1;transform:scale(1.02)}}        `}</style>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TICKER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <div style={{ background: "linear-gradient(to right, #06000E, #040009, #06000E)", borderTop: "1px solid rgba(255,184,0,0.08)", overflow: "hidden", padding: "14px 0" }} aria-hidden="true">        <div style={{ display: "flex", animation: "marquee 28s linear infinite", width: "max-content" }}>          {[...Array(3)].fill(["Electrician","Developer","3D Web","Designer","Explorer","Human","Builder","Raw Signal"]).flat().map((w, i) => (            <span key={i} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(0.85rem,2vw,1.1rem)", letterSpacing: "0.15em", paddingRight: "clamp(1.25rem,3vw,2.5rem)", color: i % 5 === 2 ? "var(--copper)" : "rgba(255,255,255,0.18)" }}>              {w}            </span>          ))}        </div>        <style>{`@keyframes marquee{to{transform:translateX(-33.333%)}}`}</style>      </div>      <SignalCockpit />      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• STATS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ background: "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(255,136,32,0.08) 0%, transparent 60%), #080012", padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)", position: "relative", overflow: "hidden" }}>        <SectionOrbs orbs={[          { x: "70%", y: "-20%", w: "40vw", color: "rgba(255,136,32,0.12)", blur: 90, op: 1, dur: 11 },          { x: "-10%", y: "30%", w: "30vw", color: "rgba(255,184,0,0.08)", blur: 70, op: 1, dur: 14, delay: 3 },        ]} />        <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,18vw,14rem)", color: "transparent", WebkitTextStroke: "1px rgba(255,136,32,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>STAT</div>        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>          <div className="stats-grid">            {[              { n: 1,   suf: "+",  label: "Year on site",          live: false },              { n: ghRepos ?? 40, suf: ghRepos ? "" : "+", label: ghRepos ? "GitHub repos" : "Projects shipped", live: !!ghRepos },              { n: 100, suf: "s",  label: "Trails walked",          live: false },              { n: 5,   suf: "",   label: "Disciplines mastered",   live: false },            ].map((s) => (              <div key={s.label} className="stat-card">                <div className="stat-number">                  <Counter end={s.n} suffix={s.suf} />                  {s.live && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#34D399", letterSpacing:"0.12em", paddingBottom:4 }}>LIVE</span>}                </div>                <p className="stat-label">{s.label}</p>              </div>            ))}          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• THE STACK â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,180,255,0.06) 0%, transparent 60%), #070010",        padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,4vw,2.5rem)",        borderTop: "1px solid rgba(0,180,255,0.06)",        position: "relative", overflow: "hidden",      }}>        <div style={{ position: "absolute", right: "-1%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,18vw,14rem)", color: "transparent", WebkitTextStroke: "1px rgba(0,180,255,0.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>STACK</div>        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>          <div ref={r7} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(2.5rem,6vw,4.5rem)" }}>            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>              // Skills Â· Tools Â· Disciplines            </p>            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,12vw,9rem)", lineHeight: 0.88, letterSpacing: "0.01em", margin: 0 }}>              <span style={{ color: "var(--chalk)" }}>THE </span>              <span style={{ color: "var(--cyan)" }}>STACK</span>            </h2>          </div>          <div className="tech-grid">            {TECH_STACK.map(t => (                <div key={t.name} className="tech-card">                  <div style={{ width:44, height:44, borderRadius:"10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>                    <TechSvg name={t.name} />                  </div>                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", fontWeight:600, color:"var(--chalk)", lineHeight:1.2, marginTop:4 }}>{t.name}</p>                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.62rem", color:"var(--stone)", letterSpacing:"0.05em" }}>{t.label}</p>                </div>              ))}          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• SERVICES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section id="services" style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(255,136,32,0.07) 0%, transparent 55%), #060010", padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,136,32,0.07)", position: "relative", overflow: "hidden" }}>        <SectionOrbs orbs={[          { x: "80%",  y: "-15%", w: "40vw", color: "rgba(255,136,32,0.09)",  blur: 90, op: 1, dur: 12 },          { x: "-10%", y: "50%",  w: "30vw", color: "rgba(0,180,255,0.06)",   blur: 80, op: 1, dur: 15, delay: 4 },          { x: "50%",  y: "80%",  w: "25vw", color: "rgba(176,64,255,0.05)",  blur: 70, op: 1, dur: 18, delay: 7 },        ]} />        <div style={{ position: "absolute", right: "-1%", top: "10%", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,18vw,14rem)", color: "transparent", WebkitTextStroke: "1px rgba(255,136,32,0.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>BUILD</div>        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>          {/* Heading */}          <div ref={r8} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(2.5rem,6vw,5rem)" }}>            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase" }}>                // What I Build              </p>              <span className="jonta-badge" style={{ fontSize: "clamp(0.55rem,1vw,0.72rem)" }}>JontAWorld Services</span>            </div>            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,12vw,9rem)", lineHeight: 0.88, letterSpacing: "0.01em", margin: 0, marginBottom: "1rem" }}>              <span style={{ color: "var(--chalk)" }}>SERVICES</span>              <span style={{ color: "var(--copper)", display: "inline", marginLeft: "0.08em" }}>.</span>            </h2>            <p style={{ fontSize: "clamp(0.875rem,1.5vw,1rem)", color: "rgba(255,255,255,0.38)", maxWidth: 560, lineHeight: 1.8 }}>              From concept to live product. I build everything below — solo or alongside your team — with Claude AI as my co-pilot.            </p>          </div>          <ShowcaseCollage />          {/* Services grid */}          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="svc-row">
                <span className="svc-num">0{i + 1}</span>
                <div>
                  <div className="svc-title">{s.title}</div>
                  <p className="svc-desc">{s.desc}</p>
                  {s.examples.length > 0 && (
                    <div className="svc-links-row">
                      {s.examples.map(ex => (
                        <a key={ex.label} href={ex.href} target={ex.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="svc-link">{ex.label} ↗</a>
                      ))}
                    </div>
                  )}
                </div>
                <span className="svc-icon" aria-hidden="true"><SvcIcon id={s.id} color={s.color} /></span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16, marginTop:"clamp(2.5rem,5vw,4rem)", paddingTop:"clamp(1.5rem,3vw,2rem)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <h3 style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"clamp(1rem,2vw,1.25rem)", color:"rgba(255,255,255,0.85)", marginBottom:6 }}>Have a project in mind?</h3>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", color:"rgba(255,255,255,0.32)", letterSpacing:"0.02em" }}>Let&apos;s build it — fast, clean, and to last.</p>
            </div>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize:"clamp(11px,1.2vw,13px)", letterSpacing:"0.12em" }}>Start a project →</Link>
          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• WHO IS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(176,64,255,0.10) 0%, transparent 55%), #060010", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", overflow: "hidden", position: "relative" }}>        {/* Interactive constellation — desktop only, too heavy for mobile */}        {mounted && !isMobile() && <ConstellationCanvas color="#B040FF" nodeCount={60} connectDist={120} />}        <SectionOrbs orbs={[          { x: "-15%", y: "10%", w: "50vw", color: "rgba(176,64,255,0.10)", blur: 100, op: 1, dur: 12 },          { x: "60%",  y: "50%", w: "35vw", color: "rgba(0,200,255,0.07)", blur: 80, op: 1, dur: 16, delay: 4 },        ]} />        <div style={{ position: "absolute", right: "-2%", bottom: "5%", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(8rem,24vw,20rem)", color: "transparent", WebkitTextStroke: "1px rgba(176,64,255,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1, letterSpacing: "-0.05em" }}>WHO</div>        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>          <div className="who-grid">            <div ref={r1} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)" }}>              <div ref={s1ref}>                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 24 }}>                  <ScrambleText text="// 001 — Signal" trigger={s1visible} delay={200} />                </p>              </div>              <div style={{ marginBottom: 28 }}>                <Accent word="WHO" idx={1} size="clamp(3.5rem,13vw,11rem)" />                <br />                <Accent word="IS"  idx={0} size="clamp(3.5rem,13vw,11rem)" color="var(--copper)" />              </div>              <p style={{ fontSize: "clamp(0.9rem,1.6vw,1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,0.45)", maxWidth: 460, marginBottom: 32 }}>                An electrician who writes code. A developer who thinks in systems. An explorer who builds things that last. Not a portfolio of skills — a single discipline of thought applied across every domain.              </p>              <Link href="/about" className="btn btn-ghost" style={{ fontSize: 12 }}>Read the full story â†’</Link>            </div>            <div ref={r2} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1) 80ms" }}>              {[                { num: "01", title: "The Electrician", color: "#D4A843" },                { num: "02", title: "The Developer",   color: "#00C8FF" },                { num: "03", title: "The Designer",    color: "#A855F7" },                { num: "04", title: "The Explorer",    color: "#34D399" },                { num: "05", title: "The Human",       color: "rgba(255,255,255,0.55)" },              ].map((r) => (                <Link key={r.num} href={`/about#${r.title.toLowerCase().replace("the ","")}`}                  style={{ display: "flex", alignItems: "center", gap: 20, padding: "clamp(0.875rem,2vw,1.25rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}                  onMouseEnter={(e) => (e.currentTarget.style.gap = "32px")}                  onMouseLeave={(e) => (e.currentTarget.style.gap = "20px")}                >                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: r.color, letterSpacing: "0.1em", minWidth: 28 }}>{r.num}</span>                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem,3vw,2rem)", letterSpacing: "0.04em", color: "var(--chalk)", flex: 1 }}>{r.title}</span>                  <div style={{ width: 20, height: 1, background: r.color, opacity: 0.45, flexShrink: 0 }} />                </Link>              ))}            </div>          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• WORK â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ background: "#050010", position: "relative", overflow: "hidden" }}>        <SectionOrbs orbs={[          { x: "50%",  y: "-10%", w: "45vw", color: "rgba(0,200,255,0.09)", blur: 100, op: 1, dur: 13 },          { x: "80%",  y: "40%",  w: "30vw", color: "rgba(0,255,136,0.06)", blur: 80, op: 1, dur: 17, delay: 5 },          { x: "-5%",  y: "60%",  w: "25vw", color: "rgba(255,136,32,0.07)", blur: 70, op: 1, dur: 11, delay: 2 },        ]} />        <div style={{ padding: "clamp(3rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem) clamp(1.5rem,4vw,3rem)", borderTop: "1px solid rgba(0,200,255,0.08)", position: "relative", zIndex: 1 }}>          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>            <div ref={r3} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)" }}>              <div ref={s2ref}>                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>                  <ScrambleText text="// 002 — Work" trigger={s2visible} delay={100} />                </p>              </div>              <Accent word="BUILT." idx={3} size="clamp(3rem,12vw,9rem)" />            </div>            <MagneticButton as="a" href="/portfolio" className="btn btn-ghost" style={{ fontSize: 12 }}>All projects â†’</MagneticButton>          </div>        </div>        {/* â”€â”€ Horizontal film-reel scroll â”€â”€ */}        <div          style={{            overflowX: "auto", overflowY: "hidden",            display: "flex", gap: 0,            scrollSnapType: "x mandatory",            WebkitOverflowScrolling: "touch",            scrollbarWidth: "none",            borderTop: "1px solid rgba(255,255,255,0.04)",          }}          className="hide-scrollbar"        >          {WORK.map((p, i) => (            <Link              key={p.slug}              href={`/portfolio/${p.slug}`}              className="card-3d card-shimmer-wrap"              style={{                display: "block", textDecoration: "none", flexShrink: 0,                width: "min(85vw, 760px)", height: "clamp(300px,52vw,580px)",                scrollSnapAlign: "start", position: "relative", overflow: "hidden",                borderRight: "1px solid rgba(255,255,255,0.04)",              }}              onMouseMove={(e) => {                const el = e.currentTarget;                const rect = el.getBoundingClientRect();                const x = (e.clientX - rect.left) / rect.width - 0.5;                const y = (e.clientY - rect.top)  / rect.height - 0.5;                el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) scale(1.015)`;                const img = el.querySelector(".proj-img") as HTMLElement;                if (img) img.style.transform = `scale(1.05) translate(${x * -8}px, ${y * -5}px)`;              }}              onMouseLeave={(e) => {                e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";                const img = e.currentTarget.querySelector(".proj-img") as HTMLElement;                if (img) img.style.transform = "scale(1)";              }}            >              {/* Background art */}              <div className="proj-img" style={{ position: "absolute", inset: 0, transition: "transform 700ms cubic-bezier(0.25,1,0.5,1)" }}>                <svg viewBox="0 0 760 580" style={{ width: "100%", height: "100%", position: "absolute" }} preserveAspectRatio="xMidYMid slice">                  <defs>                    <radialGradient id={`pg-${i}`} cx="50%" cy="50%" r="60%">                      <stop offset="0%" stopColor={p.color} stopOpacity="0.2" />                      <stop offset="100%" stopColor={p.color} stopOpacity="0" />                    </radialGradient>                  </defs>                  <rect width="760" height="580" fill="#060010" />                  <rect width="760" height="580" fill={`url(#pg-${i})`} />                  {Array.from({ length: 8 }, (_, j) => <line key={`v${j}`} x1={j*110} y1="0" x2={j*110} y2="580" stroke={p.color} strokeWidth="0.3" opacity="0.06" />)}                  {Array.from({ length: 6 }, (_, j) => <line key={`h${j}`} x1="0" y1={j*100} x2="760" y2={j*100} stroke={p.color} strokeWidth="0.3" opacity="0.06" />)}                  <circle cx="380" cy="290" r="160" fill="none" stroke={p.color} strokeWidth="0.6" opacity="0.12" />                  <circle cx="380" cy="290" r="80"  fill="none" stroke={p.color} strokeWidth="0.4" opacity="0.08" />                  <text x="380" y="340" textAnchor="middle" fontFamily="Bebas Neue" fontSize="160" fill={p.color} opacity="0.03" letterSpacing="8">{p.title.toUpperCase()}</text>                </svg>                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(4,0,14,0.94) 0%, rgba(4,0,14,0.50) 60%, rgba(4,0,14,0.12) 100%)" }} />              </div>              {/* Content */}              <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(1.25rem,3vw,2rem) clamp(1.5rem,4vw,2.5rem)" }}>                <div style={{ display: "flex", justifyContent: "space-between" }}>                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)" }}>0{i+1}</span>                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>{p.cat}</span>                  </div>                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>{p.year}</span>                </div>                <div>                  <div style={{ marginBottom: 12 }}>                    <Accent word={p.word} idx={p.idx} color={p.color} size="clamp(2.5rem,8vw,6.5rem)" />                  </div>                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>                    <div>                      <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.7rem,1.5vw,0.9rem)", color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.06em", marginBottom: 6 }}>{p.title}</h2>                      <p style={{ fontSize: "clamp(0.75rem,1.3vw,0.875rem)", color: "rgba(255,255,255,0.25)", maxWidth: 360 }}>{p.sub}</p>                    </div>                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: "0.1em", flexShrink: 0 }}>View â†’</span>                  </div>                </div>              </div>            </Link>          ))}          {/* End cap */}          <Link href="/portfolio" style={{ display: "flex", flexShrink: 0, width: "min(50vw, 320px)", height: "clamp(300px,52vw,580px)", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: "#060010", borderRight: "none", textDecoration: "none", scrollSnapAlign: "start" }}>            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em" }}>MORE WORK</span>            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--copper)", letterSpacing: "0.1em" }}>View all â†’</span>          </Link>        </div>        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• BELIEFS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,223,255,0.07) 0%, transparent 60%), #060012", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(0,223,255,0.07)", position: "relative", overflow: "hidden" }}>        <SectionOrbs orbs={[          { x: "60%",  y: "10%",  w: "40vw", color: "rgba(0,223,255,0.08)", blur: 90, op: 1, dur: 14 },          { x: "-10%", y: "50%",  w: "35vw", color: "rgba(0,136,255,0.07)", blur: 80, op: 1, dur: 18, delay: 6 },        ]} />        <div style={{ position: "absolute", left: "-2%", top: "10%", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,18vw,14rem)", color: "transparent", WebkitTextStroke: "1px rgba(0,223,255,0.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>SIGNAL</div>        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>          <div ref={r4} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(3rem,7vw,6rem)" }}>            <div ref={s3ref}>              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>                <ScrambleText text="// 003 — Beliefs" trigger={s3visible} delay={150} />              </p>            </div>            <Accent word="SIGNAL." idx={5} size="clamp(3rem,12vw,9rem)" color="var(--copper)" />          </div>          <div className="beliefs-grid">            {BELIEFS.map((b) => (              <div key={b.n} style={{ borderTop: `1px solid ${b.accent}28`, paddingTop: "clamp(1.25rem,3vw,2rem)", position: "relative" }}>                {/* Accent corner accent */}                <div aria-hidden="true" style={{ position: "absolute", top: -1, left: 0, width: 24, height: 3, background: b.accent, borderRadius: "0 0 2px 0", opacity: 0.7 }} />                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,6vw,5.5rem)", color: b.accent, opacity: 0.07, lineHeight: 1, marginBottom: 10 }}>{b.n}</div>                <div style={{ width: 20, height: 1, background: b.accent, marginBottom: 16, opacity: 0.55 }} />                <h3 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(0.95rem,2vw,1.15rem)", color: "var(--chalk)", lineHeight: 1.5, marginBottom: 12 }}>{b.t}</h3>                <p style={{ fontSize: "clamp(0.8rem,1.3vw,0.875rem)", color: "rgba(255,255,255,0.38)", lineHeight: 1.82, maxWidth: "100%" }}>{b.body}</p>              </div>            ))}          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• WRITING â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ background: "radial-gradient(ellipse 55% 75% at 100% 50%, rgba(168,85,247,0.10) 0%, transparent 55%), #060010", padding: "clamp(4rem,10vw,9rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(168,85,247,0.08)", position: "relative", overflow: "hidden" }}>        <SectionOrbs orbs={[          { x: "80%", y: "5%",   w: "40vw", color: "rgba(168,85,247,0.10)", blur: 90, op: 1, dur: 13 },          { x: "20%", y: "55%",  w: "28vw", color: "rgba(80,20,180,0.08)", blur: 70, op: 1, dur: 17, delay: 4 },        ]} />        <div style={{ maxWidth: 1280, margin: "0 auto" }}>          <div ref={r5} style={{ opacity: 0, transform: "translateY(24px)", transition: "all 0.85s cubic-bezier(0.25,1,0.5,1)", marginBottom: "clamp(2.5rem,7vw,6rem)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>            <div>              <div ref={s4ref}>                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 16 }}>                  <ScrambleText text="// 004 — Writing" trigger={s4visible} delay={100} />                </p>              </div>              <Accent word="WORDS." idx={0} size="clamp(3rem,12vw,9rem)" color="#A855F7" />            </div>            <Link href="/blog" className="btn btn-ghost" style={{ fontSize: 12 }}>All writing â†’</Link>          </div>          <div style={{ display: "flex", flexDirection: "column" }}>            {POSTS.map((post, i) => (              <Link key={post.slug} href={`/blog/${post.slug}`}                style={{ display: "flex", alignItems: "center", gap: "clamp(1rem,3vw,2.5rem)", padding: "clamp(1.25rem,3vw,2rem) 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none", transition: "gap 300ms" }}                onMouseEnter={(e) => (e.currentTarget.style.gap = "clamp(1.5rem,4vw,3.5rem)")}                onMouseLeave={(e) => (e.currentTarget.style.gap = "clamp(1rem,3vw,2.5rem)")}              >                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", minWidth: 24, flexShrink: 0 }}>0{i + 1}</span>                <div style={{ flex: 1, minWidth: 0 }}>                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: post.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.cat}</span>                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)" }}>{post.date}</span>                  </div>                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.95rem,2.5vw,1.45rem)", color: "var(--chalk)", lineHeight: 1.35 }}>{post.title}</h3>                </div>                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "rgba(255,255,255,0.18)", flexShrink: 0 }}>â†’</span>              </Link>            ))}          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• MANIFESTO â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,100,0,0.10) 0%, transparent 65%), #050010", position: "relative", overflow: "hidden", padding: "clamp(4rem,12vw,10rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(255,136,32,0.12)" }}>        <SectionOrbs orbs={[          { x: "50%",  y: "-20%", w: "50vw", color: "rgba(255,80,0,0.10)", blur: 110, op: 1, dur: 10 },          { x: "-10%", y: "30%",  w: "40vw", color: "rgba(255,184,0,0.08)", blur: 90, op: 1, dur: 15, delay: 3 },          { x: "70%",  y: "60%",  w: "30vw", color: "rgba(255,40,0,0.07)", blur: 80, op: 1, dur: 13, delay: 6 },        ]} />        <div ref={parallax2} style={{ position: "absolute", inset: "-15%", zIndex: 0, opacity: 0.07 }}>          <Image src="/images/rawsignal-hero.png" alt="" fill style={{ objectFit: "cover" }} sizes="100vw" />        </div>        <div ref={r6} style={{ opacity: 0, transform: "translateY(32px)", transition: "all 0.9s cubic-bezier(0.25,1,0.5,1)", position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto" }}>          <div ref={s5ref}>            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "var(--copper)", textTransform: "uppercase", marginBottom: 28 }}>              <ScrambleText text="// 005 — Manifesto" trigger={s5visible} delay={200} />            </p>          </div>          <div style={{ marginBottom: "clamp(2rem,5vw,4rem)" }}>            <ManifestoStagger lines={[              { text: "BUILD." },              { text: "CONNECT.", color: "#00C8FF" },              { text: "GROW.",    dim: true },              { text: "REPEAT." },            ]} />          </div>          {/* Divider */}          <div style={{ width: "clamp(60px,10vw,140px)", height: 1, background: "linear-gradient(to right,rgba(255,136,32,0.5),transparent)", marginBottom: "clamp(1.5rem,3vw,2.5rem)" }} />          <div style={{ display: "flex", gap: "clamp(1.5rem,5vw,3rem)", alignItems: "flex-start", flexWrap: "wrap" }}>            <div style={{ flex: 1, minWidth: 260 }}>              <p style={{ fontSize: "clamp(0.875rem,1.6vw,1.08rem)", color: "rgba(255,255,255,0.38)", maxWidth: 500, lineHeight: 1.88, marginBottom: "1.75rem" }}>                The finest work emerges where physical systems, digital precision, and human intention converge. I build at that exact intersection — where the signal is honest enough to be trusted and refined enough to ship with confidence.              </p>              <Signature color="#C87B2F" width={240} />            </div>            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>              <MagneticButton as="a" href="/contact" className="btn btn-primary">Start a conversation</MagneticButton>              <Link href="/portfolio" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textDecoration: "none", transition: "color 200ms" }}                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--copper)")}                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}              >                Or explore the work â†’              </Link>            </div>          </div>        </div>      </section>      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NEWSLETTER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}      <section className="safe-bottom" style={{ background: "#06000F", padding: "clamp(3.5rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)", borderTop: "1px solid rgba(0,255,136,0.07)", position: "relative", overflow: "hidden" }}>        <SectionOrbs orbs={[          { x: "70%", y: "0%",  w: "35vw", color: "rgba(0,255,136,0.08)", blur: 90, op: 1, dur: 12 },          { x: "10%", y: "50%", w: "25vw", color: "rgba(0,180,255,0.06)", blur: 70, op: 1, dur: 16, delay: 4 },        ]} />        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 }}>          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>            <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem,4vw,2.5rem)", color: "var(--copper)" }}>Think alongside me.</p>            <span className="jonta-badge">JontAWorld</span>          </div>          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.32)", marginBottom: 28, lineHeight: 1.78 }}>            Occasional writing on building, designing, and living with intention — by Brian Josiah. Infrequent. Honest. Never noise.          </p>          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>            <input type="email" placeholder="your@email.com" required              style={{ flex: 1, minWidth: 200, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#EAEDF2", fontFamily: "'Inter',sans-serif", fontSize: "0.9375rem", padding: "0.875rem 1.125rem", outline: "none" }}              onFocus={(e) => (e.target.style.borderColor = "rgba(200,123,47,0.4)")}              onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}            />            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>Subscribe</button>          </form>        </div>      </section>    </>  );}