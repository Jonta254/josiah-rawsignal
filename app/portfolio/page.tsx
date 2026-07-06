import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";
import ComingCards from "./ComingCards";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Brian — field tools, web apps, and design systems.",
};

const PROJECTS = [
  {
    slug: "electracore",
    num: "01",
    title: "ElectraCore",
    tagline: "The complete electrical platform for students, engineers, and trade workers.",
    status: "Live", year: "2025",
    category: "Web App",
    color: "#F0C030",
    colorAlpha: "rgba(240,192,48,0.07)",
    image: "/images/work-1.jpg",
    desc: "Calculators, wiring guides, learning paths, load analysis, and job billing — all in one platform built from 8 years on the tools. Free for core tools, Pro for the full library.",
    tools: ["Next.js", "TypeScript", "React", "PWA", "Offline-first"],
    liveUrl: "https://electracore.vercel.app",
  },
  {
    slug: "terrain-journal",
    num: "02",
    title: "Terrain Journal",
    tagline: "Your trail, documented exactly as it happened.",
    status: "Concept", year: "2025",
    category: "Web App",
    color: "#34D399",
    colorAlpha: "rgba(52,211,153,0.07)",
    image: "/images/work-2.jpg",
    desc: "GPS outdoor journaling with map trail overlays and location-aware photo capture. Built for people who actually go outside — not people who talk about going outside.",
    tools: ["Next.js", "Mapbox", "Supabase", "PWA"],
  },
  {
    slug: "rawpanel",
    num: "03",
    title: "RawPanel UI",
    tagline: "A design system that respects the builder.",
    status: "In Progress", year: "2026",
    category: "Design System",
    color: "#B040FF",
    colorAlpha: "rgba(176,64,255,0.07)",
    image: "/images/work-3.jpg",
    desc: "An open design system for craftspeople who code. Warm, honest, anti-template. Built from the pain of real projects — not from theoretical best practices.",
    tools: ["Figma", "Storybook", "Tailwind", "Design Tokens"],
  },
];

const COMING = [
  {
    title: "SafeSignal",
    sub: "Lone Worker Safety Platform",
    tagline: "Because no one should work inside a live panel with nobody knowing where they are.",
    desc: "Automatic dead-man check-ins, escalating emergency alerts, and GPS sharing for trade workers on the job alone. Built for the person in the wall cavity, the roof void, the basement — not the person at a desk.",
    color: "#FF6B35",
    tag: "Mobile · B2B SaaS",
    href: "https://safesignal-beta.vercel.app",
    status: "Live Preview",
  },
  {
    title: "ApprenticeLog",
    sub: "Trade Apprenticeship Logbook",
    tagline: "The digital logbook that trade apprentices actually deserve.",
    desc: "Log hours, track skill sign-offs, and generate compliance reports — replacing the paper books that go missing, the spreadsheets nobody submits, and the process that hasn't changed in forty years.",
    color: "#00C8FF",
    tag: "Web · Institutional SaaS",
    href: "https://apprentice-log-xi.vercel.app",
    status: "Live Preview",
  },
  {
    title: "TrailDesk",
    sub: "Offline Trip Planning",
    tagline: "Trip planning that works when your signal doesn't.",
    desc: "Offline-first route mapping, gear checklists, emergency contacts, and trail archives. For people who take going outside seriously enough to prepare for it.",
    color: "#34D399",
    tag: "Mobile · Consumer",
    href: "https://traildesk.vercel.app",
    status: "Live Preview",
  },
  {
    title: "DevForge",
    sub: "Developer Learning Platform",
    tagline: "From your first line of code to your first job offer.",
    desc: "600+ lessons, 40+ projects, 8 structured learning paths — with working authentication, personalized dashboards, and progress tracking. Built for developers who want to actually ship, not just watch tutorials.",
    color: "#6366F1",
    tag: "Web · EdTech",
    href: "https://devforge-delta.vercel.app",
    status: "Live",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <style>{`
        .proj-row-card { --pc: #FF8820; --proj-color: rgba(255,136,32,0.04); }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: "62vh",
        display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 65% 55% at 80% 0%,   rgba(0,220,255,0.09)  0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 10% 70%,  rgba(52,211,153,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 100%, rgba(176,64,255,0.06) 0%, transparent 50%),
          linear-gradient(165deg, #030215 0%, #040118 50%, #020110 100%)
        `,
        padding: "clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"36px 36px", maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 80%)" }} />
        <div aria-hidden="true" style={{ position:"absolute",bottom:0,left:0,right:0,height:"38%", background:"linear-gradient(to top,rgba(3,2,21,0.96) 0%,transparent 100%)", pointerEvents:"none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Reveal className="reveal">
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.22em", color:"#00DFFF", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ display:"inline-block", width:28, height:1, background:"linear-gradient(to right,#00DFFF,transparent)" }} />
              SIGNAL.WORK / SELECTED PROJECTS
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,11vw,10rem)", lineHeight:0.86, letterSpacing:"0.01em", color:"#F2F4FC", marginBottom:0 }}>
              THINGS<br />
              <span style={{ background:"linear-gradient(90deg,#00DFFF,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                BUILT.
              </span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize:"clamp(0.9375rem,1.6vw,1.0625rem)", lineHeight:1.85, color:"#7880A2", maxWidth:520, marginTop:24 }}>
              Tools for people who work with their hands and interfaces for people who think with their heads. Every project begins with a real problem and ends with something that ships.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Project rows ─────────────────────────────────────── */}
      <section style={{ background:"#04050E", position:"relative" }}>
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1, background:"linear-gradient(to right,transparent,rgba(0,220,255,0.22) 40%,rgba(0,220,255,0.4) 50%,rgba(0,220,255,0.22) 60%,transparent)" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(1rem,2vw,1.5rem) clamp(1.25rem,5vw,3rem)" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} className="reveal" delay={i * 60}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="proj-row-card"
                style={{
                  "--pc": p.color,
                  "--proj-color": p.colorAlpha,
                } as React.CSSProperties}
              >
                {/* Number */}
                <div className="proj-num" style={{ "--webkit-text-stroke-color": p.color } as React.CSSProperties}>
                  {p.num}
                </div>

                {/* Content */}
                <div>
                  {/* Top row */}
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap", marginBottom:10 }}>
                    <div className="proj-name">{p.title}</div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0, paddingTop:8 }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.12em", padding:"3px 10px", borderRadius:100, background:`${p.color}14`, color:p.color, border:`1px solid ${p.color}28`, textTransform:"uppercase" }}>{p.status}</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.18)", letterSpacing:"0.1em" }}>{p.year}</span>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"clamp(0.9rem,1.8vw,1.15rem)", color:"rgba(255,255,255,0.55)", marginBottom:12, lineHeight:1.5 }}>
                    {p.tagline}
                  </p>

                  {/* Description */}
                  <p style={{ fontSize:"clamp(0.8125rem,1.3vw,0.875rem)", lineHeight:1.8, color:"#5A6282", maxWidth:640, marginBottom:16 }}>
                    {p.desc}
                  </p>

                  {/* Footer row */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {p.tools.map((t) => (
                        <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.07em", padding:"3px 10px", borderRadius:100, background:"rgba(255,255,255,0.03)", color:"#404868", border:"1px solid rgba(255,255,255,0.07)" }}>{t}</span>
                      ))}
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.1em", padding:"3px 10px", borderRadius:100, background:"rgba(255,255,255,0.02)", color:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.05)" }}>{p.category}</span>
                    </div>
                    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                      {(p as typeof p & { liveUrl?: string }).liveUrl && (
                        <a href={(p as typeof p & { liveUrl?: string }).liveUrl} target="_blank" rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:p.color, letterSpacing:"0.1em", textDecoration:"none", border:`1px solid ${p.color}40`, padding:"3px 10px", borderRadius:100, background:`${p.color}0A` }}>
                          View Live ↗
                        </a>
                      )}
                      <span className="proj-arrow" style={{ "--pc": p.color } as React.CSSProperties}>
                        View Case Study →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Coming next */}
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,3rem) clamp(4rem,8vw,6rem)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <Reveal className="reveal">
            <div style={{ marginBottom:"clamp(2rem,4vw,3.5rem)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                <div style={{ width:24, height:1, background:"rgba(255,184,0,0.40)" }} />
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"rgba(255,184,0,0.50)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
                  Next in build
                </span>
              </div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2rem,6vw,4.5rem)", lineHeight:0.9, letterSpacing:"0.02em", color:"rgba(255,255,255,0.12)", marginBottom:12 }}>
                WHAT&apos;S COMING
              </h2>
              <p style={{ fontSize:"clamp(0.875rem,1.4vw,0.9375rem)", color:"rgba(255,255,255,0.28)", maxWidth:520, lineHeight:1.75 }}>
                Three products in research and design — each solving a real problem for people who work with their hands and their heads.
              </p>
            </div>
            <ComingCards items={COMING} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
