import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const PROJECTS: Record<string, {
  title: string; tagline: string; role: string; timeline: string;
  tools: string[]; status: string; accent: string; accentRgb: string;
  image: string; liveUrl?: string;
  challenge: string; approach: { step: string; detail: string }[];
  outcome: string; prev?: string; next?: string;
}> = {
  electracore: {
    title: "ElectraCore",
    tagline: "The complete electrical platform for students, engineers, and trade workers.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["Next.js", "TypeScript", "React", "PWA", "Figma", "Offline-first"],
    status: "Live",
    accent: "#F0C030",
    accentRgb: "240,192,48",
    image: "/images/work-1.jpg",
    liveUrl: "https://electracore.vercel.app",
    challenge: "Students, apprentices, engineers, and electricians all need electrical reference tools — but the existing options are either too narrow (one calculator), too expensive (professional software), or written for the textbook rather than the job site. 8 years of field work made the gaps obvious: no single place for calculations, guides, and practical knowledge that works offline and actually makes sense.",
    approach: [
      { step: "Platform scope from real problems", detail: "Built around the six problems that come up every day on site: instant calculations (Ohm's law, voltage drop, cable sizing, LED resistors, power factor), wiring connection guides with colour codes and diagrams, structured learning from fundamentals to advanced protection theory, load analysis for design, project cost estimation, and job billing. Not a whiteboard exercise — a list from the field." },
      { step: "Calculators that show their working", detail: "Every calculator displays the formula being applied and explains the result in plain language. A student learning Ohm's law sees the same tool a working electrician trusts on site — with the formula visible, not hidden." },
      { step: "Accessible by default, Pro for depth", detail: "Core calculators and guides are free and open — no account required. Learning paths, calculation history, PDF export, and the full guide library sit behind a Pro subscription at $15/mo. The platform has to prove its value before asking for payment." },
    ],
    outcome: "Platform live at electracore.vercel.app. 8 working calculators (Ohm's law, power, voltage drop, resistors, LED resistor, power factor, cable sizing, voltage divider), 15 wiring guides across 5 categories, and 5 structured learning paths with 40+ topics. Monetisation: Free for core tools, Pro ($15/mo), Business ($45/mo) for team billing and client portal.",
    prev: "rawpanel",
    next: "terrain-journal",
  },
  electrimap: {
    title: "ElectriMap",
    tagline: "The electrical platform built by an electrician, for electricians.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["React Native", "TypeScript", "SQLite", "PWA", "Figma", "Offline-first"],
    status: "In Progress",
    accent: "#F0C030",
    accentRgb: "240,192,48",
    image: "/images/work-1.jpg",
    challenge: "Electricians lack a single tool that covers the full job lifecycle — from reading a schematic on-site to billing the client when it's done. Existing solutions are either desktop-only, paper-based, or built by people who have never touched a wire. The gap is real: 8 years of field work confirmed it.",
    approach: [
      { step: "Platform scope from the field", detail: "Designed around six core needs proven by real work: circuit diagramming, load and cable calculations, wiring connection guides, material cost estimation, project mapping, and client billing. Not features from a whiteboard — problems from a job site." },
      { step: "Learning as a monetisation layer", detail: "Built a structured electrical training module covering residential, commercial, and electronic wiring. Practical scenarios, code-referenced guides, and certification-path tracking — priced as a Pro subscription. Real knowledge, not YouTube repackaged." },
      { step: "Offline-first, always", detail: "SQLite for local storage, background sync when a connection appears. Every feature works in a basement, a conduit trench, or a rural site with no signal. The tool has to be trusted before it can be paid for." },
    ],
    outcome: "Core platform architecture defined. Circuit diagramming, connection guides, and cost estimation features scoped and in active development. Learning module designed and ready for content. Monetisation model: free tier for diagramming, Pro ($15/mo) for calculations and learning, Business ($45/mo) for team billing and client portal.",
    prev: "rawpanel",
    next: "terrain-journal",
  },
  "terrain-journal": {
    title: "Terrain Journal",
    tagline: "Your trail, documented exactly as it happened.",
    role: "Designer + Developer",
    timeline: "6 weeks · 2025",
    tools: ["Next.js", "Mapbox GL", "Supabase", "Vercel"],
    status: "Concept",
    accent: "#34D399",
    accentRgb: "52,211,153",
    image: "/images/work-2.jpg",
    challenge: "Most outdoor journaling apps are either too lightweight (Instagram) or too data-heavy (Strava/Garmin). There was space for something that captured the texture of an experience — not just the metrics.",
    approach: [
      { step: "Content before interface", detail: "Started with a content-first approach: what does a trail journal entry actually contain? Route, conditions, mood, notes, photos, a moment of reflection. The UI was designed around those content types, not the other way around." },
      { step: "Route as content", detail: "Used Mapbox GL for interactive route visualisation — users trace their actual path rather than logging a distance. Photos attach to GPS coordinates and appear on the map." },
      { step: "Writing-first editor", detail: "Kept the writing experience minimal. The editor is a single long-form text area. No formatting toolbar. No distraction. Just the blank page and what actually happened." },
    ],
    outcome: "Concept designed from the perspective of someone who actually uses trails. Writing-first approach, GPS photo attachment, and content-led structure validated as the core interactions to build toward.",
    prev: "electracore",
    next: "rawpanel",
  },
  rawpanel: {
    title: "RawPanel UI",
    tagline: "A design system that respects the builder.",
    role: "Design System Author",
    timeline: "Ongoing · 2026",
    tools: ["Figma", "Storybook", "React", "TypeScript", "Design Tokens"],
    status: "In Progress",
    accent: "#B040FF",
    accentRgb: "176,64,255",
    image: "/images/work-3.jpg",
    challenge: "Every project I started required rebuilding the same set of components. Most available design systems are too opinionated or too bare. I wanted something warm and craftsperson-like — honest rather than polished, built from real project pain rather than theoretical best practices.",
    approach: [
      { step: "Principles before components", detail: "Started in Figma with a design language rather than a component library — establishing the visual principles first. Warm tones, honest borders, no shadows that don't serve a purpose." },
      { step: "Documentation as design", detail: "Building components in Storybook to document every variant and state before touching production code. The documentation is part of the design, not an afterthought." },
      { step: "API clarity as craft", detail: "Designing the component API to be obvious without reading the docs. If you have to look something up to do the obvious thing, the API is wrong. That is a design failure, not a documentation problem." },
    ],
    outcome: "Core token system and component primitives actively in use across personal projects. Design language stabilising toward a first open release. Built to solve real problems from real projects — not to look good in a README.",
    prev: "terrain-journal",
    next: "electrimap",
  },
  digilearn: {
    title: "DigiLearn",
    tagline: "100+ free courses for the AI era — from web dev to data science, ethics, healthcare, and public policy.",
    role: "Product Designer + Full-Stack Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["Next.js 16", "TypeScript", "React 19", "Tailwind CSS", "Vercel"],
    status: "Live",
    accent: "#0284C7",
    accentRgb: "2,132,199",
    image: "/images/work-2.jpg",
    liveUrl: "https://digilearn.vercel.app",
    challenge: "The tools most people need to thrive in an AI-driven economy are locked behind $500 Udemy courses, confusing YouTube rabbit holes, or platforms that assume you already have a degree. People in emerging markets, career changers, and self-taught builders need a single place that covers everything — and is actually free.",
    approach: [
      { step: "Breadth with real depth", detail: "Built out 12 course categories covering AI tools, web development, data science, databases, cybersecurity, AI ethics, fintech, healthcare technology, and civic/public policy. Every category has 5–10 structured courses, not just titles with no content." },
      { step: "Career-path framing", detail: "Courses are mapped to real outcomes — finance, healthcare, technology, public policy. A student learning SQL knows whether they're heading toward data analysis at a bank or open data work for a government agency." },
      { step: "Free by default, no dark patterns", detail: "The platform is fully free with no paywalls, no forced signups, no countdown timers. The goal is reach first, credibility second. Monetisation through certification and team plans is the long-term direction." },
    ],
    outcome: "Platform live with 100+ courses across 12 categories including new tracks for AI Ethics, Databases (SQL through vector DBs), Finance & Fintech (Python quant trading, blockchain), Healthcare IT, and Policy & Civic Tech. All free to access. Filterable by topic, level, and free/paid toggle.",
    prev: "electrimap",
    next: "humanchain",
  },
  humanchain: {
    title: "HumanChain",
    tagline: "A verified human network inside World App — wisdom, stories, marketplace, and identity in 9 tabs.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2026",
    tools: ["Next.js 16", "TypeScript", "World MiniKit", "World ID", "pnpm"],
    status: "Live",
    accent: "#00D4FF",
    accentRgb: "0,212,255",
    image: "/images/work-2.jpg",
    challenge: "Social platforms are full of bots, misinformation, and anonymous bad actors. World App's World ID proves a user is a unique human — but no one had built a full social product on top of that primitive. HumanChain is the attempt: a genuine human network where every post, marketplace listing, and answer comes from a verified real person.",
    approach: [
      { step: "Nine tabs, one coherent product", detail: "Home (wisdom feed), Ask (Q&A from verified humans), Chains (group posts and chains of thought), Stories (photo moments), Culture (community highlights), Marketplace (local peer-to-peer commerce), Me (profile and identity), Settings, and Safety Center. Each tab is a complete product surface, not a wireframe." },
      { step: "World ID as the foundation", detail: "World ID verification is the first step before posting, buying, or answering. Not as a barrier — as a differentiator. The value proposition is that every piece of content comes from a real human." },
      { step: "Streaks, points, and community accountability", detail: "Daily check-in streaks, chain score, and contribution points create lightweight gamification without toxicity. The Safety Center gives the community tools to flag and moderate content without a centralized trust-and-safety team." },
    ],
    outcome: "Full 9-tab World App mini app in production. Human verification via World ID. Marketplace with local listing and WLD/USDC payment via World Pay. Stories feed, wisdom Q&A, chain posts, and culture tab. AI guide sheet for onboarding. Notification permission system. Referral sharing. Running inside World App on iOS and Android.",
    prev: "digilearn",
    next: "tcash",
  },
  tcash: {
    title: "Tcash",
    tagline: "Instant WLD/USDC → KES M-Pesa exchange inside World App — bridge crypto to mobile money in seconds.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["React", "Vite", "World MiniKit", "World ID", "M-Pesa API", "Vercel"],
    status: "Live",
    accent: "#00C97A",
    accentRgb: "0,201,122",
    image: "/images/work-3.jpg",
    liveUrl: "https://world-t-mpesa.vercel.app",
    challenge: "Millions of people hold WLD and USDC in World App but have no easy on-ramp to local mobile money — the payment rail that actually works for everyday transactions in East Africa. Banks don't support crypto. P2P exchanges are slow and manual. The gap: a verified, instant bridge between World wallet and M-Pesa KES.",
    approach: [
      { step: "World ID as trust infrastructure", detail: "Every exchange is tied to a World ID-verified account. No KYC documents required — the World orb verification serves as proof of unique human identity, which is sufficient for the transaction limits we operate within." },
      { step: "Four-screen mini app", detail: "Dashboard (rates, wallet balance, recent orders), Wallet (portfolio across WLD/USDC/KES), Trade (buy KES with WLD/USDC, sell KES for crypto), and History. Deliberately minimal — the exchange flow is 3 taps from launch to confirmation." },
      { step: "Live rate feeds and settlement tracking", detail: "Market rates pulled from live APIs with a configurable spread. Order status updates through pending → paid → completed with push notification support via World App notifications. Failed and cancelled states handled gracefully with retry flows." },
    ],
    outcome: "Mini app live at world-t-mpesa.vercel.app. Buy KES with WLD or USDC, sell KES back to crypto. Live exchange rates with spread. M-Pesa STK push payment initiation. Order history with status tracking. Dark/light theme. World App notification permission integration. Referral system with shareable invite links.",
    prev: "humanchain",
    next: "electracore",
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS[slug];
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.tagline };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS[slug];

  if (!p) {
    return (
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--void)", gap: 20 }}>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "5rem", color: "var(--chalk)" }}>Not Found</h1>
        <Link href="/portfolio" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--copper)", letterSpacing: "0.1em" }}>← Back to Work</Link>
      </section>
    );
  }

  return (
    <>
      <style>{`
        .cs-approach-item { transition: padding-left 0.3s ease; }
        .cs-approach-item:hover { padding-left: 8px; }
        .cs-back-link { transition: color 180ms, gap 180ms; }
        .cs-back-link:hover { color: var(--chalk) !important; }
        .cs-nav-link { transition: opacity 180ms, transform 180ms; }
        .cs-nav-link:hover { opacity: 1 !important; transform: translateX(4px); }
        .cs-nav-link-prev:hover { transform: translateX(-4px) !important; }
        .tool-tag { transition: background 180ms, border-color 180ms; }
        .tool-tag:hover { background: rgba(${p.accentRgb},0.12) !important; border-color: rgba(${p.accentRgb},0.4) !important; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "72vh", display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 60% 55% at 80% 0%,   rgba(${p.accentRgb},0.12) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45% at 5%  75%,  rgba(${p.accentRgb},0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 100%, rgba(0,0,0,0.3) 0%, transparent 50%),
          linear-gradient(165deg, #030215 0%, #04010F 50%, #020108 100%)
        `,
        padding: "clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        {/* Dot grid */}
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize:"36px 36px",
          maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)" }} />
        {/* Bottom fade */}
        <div aria-hidden="true" style={{ position:"absolute",bottom:0,left:0,right:0,height:"40%",
          background:"linear-gradient(to top,rgba(3,2,21,0.96) 0%,transparent 100%)", pointerEvents:"none" }} />

        {/* Accent line */}
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1,
          background:`linear-gradient(to right,transparent,rgba(${p.accentRgb},0.3) 40%,rgba(${p.accentRgb},0.55) 50%,rgba(${p.accentRgb},0.3) 60%,transparent)` }} />

        <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          {/* Back */}
          <Link href="/portfolio" className="cs-back-link" style={{
            display:"inline-flex", alignItems:"center", gap:8, marginBottom:32,
            fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.14em",
            color:"rgba(255,255,255,0.35)", textDecoration:"none",
          }}>
            ← BACK TO WORK
          </Link>

          {/* Eyebrow */}
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.22em",
            color:p.accent, marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ display:"inline-block", width:28, height:1,
              background:`linear-gradient(to right,${p.accent},transparent)` }} />
            CASE STUDY · {p.status.toUpperCase()}
          </div>

          {/* Title */}
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(3.5rem,12vw,10rem)", lineHeight:0.86,
            letterSpacing:"0.01em", color:"#F2F4FC", marginBottom:16 }}>
            {p.title}
          </h1>

          {/* Tagline */}
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
            fontSize:"clamp(1rem,2.2vw,1.35rem)", color:"rgba(255,255,255,0.55)",
            maxWidth:540, lineHeight:1.55, marginBottom: p.liveUrl ? 24 : 40 }}>
            {p.tagline}
          </p>

          {/* Live link */}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" style={{
              display:"inline-flex", alignItems:"center", gap:8, marginBottom:24,
              fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.12em",
              color:p.accent, textDecoration:"none",
              border:`1px solid rgba(${p.accentRgb},0.4)`, borderRadius:100,
              padding:"6px 16px", background:`rgba(${p.accentRgb},0.08)`,
              transition:"background 0.2s",
            }}>
              ↗ VIEW LIVE APP
            </a>
          )}

          {/* Meta bar */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(1.5rem,3vw,3rem)",
            padding:"clamp(1.25rem,2.5vw,1.75rem) clamp(1.5rem,3vw,2rem)",
            background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:16, backdropFilter:"blur(16px)" }}>
            {[
              { label: "Role",     value: p.role     },
              { label: "Timeline", value: p.timeline },
              { label: "Status",   value: p.status   },
            ].map((m) => (
              <div key={m.label}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                  letterSpacing:"0.18em", color:"rgba(255,255,255,0.25)",
                  textTransform:"uppercase", marginBottom:6 }}>{m.label}</p>
                <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(0.7rem,1.2vw,0.8125rem)",
                  color:"rgba(255,255,255,0.7)", fontWeight:500, letterSpacing:"0.04em" }}>{m.value}</p>
              </div>
            ))}
            <div>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.18em", color:"rgba(255,255,255,0.25)",
                textTransform:"uppercase", marginBottom:8 }}>Tools</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {p.tools.map((t) => (
                  <span key={t} className="tool-tag" style={{
                    fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                    letterSpacing:"0.07em", padding:"3px 10px", borderRadius:100,
                    background:`rgba(${p.accentRgb},0.07)`, color:p.accent,
                    border:`1px solid rgba(${p.accentRgb},0.22)`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <article style={{
        background:`
          radial-gradient(ellipse 55% 45% at 90% 0%, rgba(${p.accentRgb},0.05) 0%,transparent 55%),
          radial-gradient(ellipse 40% 35% at 5% 60%, rgba(${p.accentRgb},0.03) 0%,transparent 50%),
          #04050E
        `,
        padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position:"relative",
      }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* Challenge */}
          <section style={{ marginBottom:"clamp(3rem,7vw,6rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <span style={{ display:"inline-block", width:1.5, height:28, background:p.accent, borderRadius:1 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                letterSpacing:"0.22em", color:p.accent, textTransform:"uppercase" }}>
                The Challenge
              </span>
            </div>
            <p style={{ fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(1.05rem,2vw,1.25rem)", lineHeight:1.85,
              color:"rgba(255,255,255,0.65)", maxWidth:"70ch" }}>
              {p.challenge}
            </p>
          </section>

          {/* Divider */}
          <div style={{ height:1, marginBottom:"clamp(3rem,7vw,6rem)",
            background:`linear-gradient(to right,transparent,rgba(${p.accentRgb},0.18) 40%,rgba(${p.accentRgb},0.32) 50%,rgba(${p.accentRgb},0.18) 60%,transparent)` }} />

          {/* Project visual */}
          <section style={{ marginBottom:"clamp(3rem,7vw,6rem)" }}>
            <div style={{ position:"relative", height:"clamp(220px,35vw,380px)", borderRadius:20, overflow:"hidden", border:`1px solid rgba(${p.accentRgb},0.18)` }}>
              <Image src={p.image} alt={`${p.title} preview`} fill style={{ objectFit:"cover", opacity:0.72 }} sizes="(max-width:860px) 100vw, 860px" />
              <div aria-hidden="true" style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,rgba(${p.accentRgb},0.20) 0%,transparent 55%)` }} />
              <div aria-hidden="true" style={{ position:"absolute", bottom:0, left:0, right:0, height:"55%", background:"linear-gradient(to top,rgba(3,2,21,0.65) 0%,transparent 100%)" }} />
            </div>
          </section>

          {/* Approach */}
          <section style={{ marginBottom:"clamp(3rem,7vw,6rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
              <span style={{ display:"inline-block", width:1.5, height:28, background:p.accent, borderRadius:1 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                letterSpacing:"0.22em", color:p.accent, textTransform:"uppercase" }}>
                My Approach
              </span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {p.approach.map((a, i) => (
                <div key={a.step} className="cs-approach-item" style={{
                  display:"grid", gridTemplateColumns:"28px 1fr",
                  gap:"0 clamp(1.25rem,3vw,2rem)",
                  padding:"clamp(1.25rem,2.5vw,1.75rem) 0",
                  borderBottom:"1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{ paddingTop:4 }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif",
                      fontSize:"clamp(1.5rem,2.5vw,2rem)", lineHeight:1,
                      color:`rgba(${p.accentRgb},0.25)` }}>
                      0{i+1}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily:"'Orbitron',sans-serif",
                      fontSize:"clamp(0.7rem,1.2vw,0.8125rem)", fontWeight:500,
                      letterSpacing:"0.08em", color:"rgba(255,255,255,0.6)",
                      marginBottom:10 }}>{a.step}</h3>
                    <p style={{ fontSize:"clamp(0.875rem,1.4vw,0.9375rem)", lineHeight:1.85,
                      color:"rgba(255,255,255,0.4)" }}>{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outcome */}
          <section style={{
            padding:"clamp(1.75rem,4vw,2.5rem) clamp(1.75rem,4vw,2.5rem)",
            background:`rgba(${p.accentRgb},0.04)`,
            border:`1px solid rgba(${p.accentRgb},0.16)`,
            borderRadius:16,
            borderLeft:`3px solid ${p.accent}`,
          }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
              letterSpacing:"0.22em", color:p.accent, textTransform:"uppercase",
              marginBottom:16 }}>The Outcome</p>
            <blockquote style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
              fontSize:"clamp(1rem,2vw,1.2rem)", color:"rgba(255,255,255,0.7)",
              lineHeight:1.7, margin:0 }}>
              {p.outcome}
            </blockquote>
          </section>
        </div>
      </article>

      {/* ── Prev / Next ───────────────────────────────────────────── */}
      <nav style={{
        background:"#02010A",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        padding:"clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,3rem)",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>

          {p.prev ? (
            <Link href={`/portfolio/${p.prev}`} className="cs-nav-link cs-nav-link-prev" style={{
              display:"flex", flexDirection:"column", gap:6, textDecoration:"none",
              opacity:0.5,
            }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.18em", color:"rgba(255,255,255,0.4)" }}>← PREVIOUS</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.25rem,2.5vw,1.75rem)",
                color:"var(--chalk)" }}>
                {PROJECTS[p.prev]?.title ?? "Previous"}
              </span>
            </Link>
          ) : <div />}

          <Link href="/portfolio" className="cs-all-work" style={{ fontFamily:"'JetBrains Mono',monospace",
            fontSize:10, letterSpacing:"0.18em", color:"rgba(255,255,255,0.3)",
            textDecoration:"none" }}>
            ALL WORK
          </Link>
          <style>{`.cs-all-work:hover{color:var(--copper)!important;}`}</style>

          {p.next ? (
            <Link href={`/portfolio/${p.next}`} className="cs-nav-link" style={{
              display:"flex", flexDirection:"column", gap:6, textDecoration:"none",
              opacity:0.5, alignItems:"flex-end",
            }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.18em", color:"rgba(255,255,255,0.4)" }}>NEXT →</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.25rem,2.5vw,1.75rem)",
                color:"var(--chalk)" }}>
                {PROJECTS[p.next]?.title ?? "Next"}
              </span>
            </Link>
          ) : <div />}
        </div>
      </nav>
    </>
  );
}
