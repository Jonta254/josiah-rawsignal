import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Brian — field tools, web apps, and design systems.",
};

const PROJECTS = [
  {
    slug: "electrimap",
    num: "01",
    title: "ElectriMap",
    tagline: "Circuit diagramming, reinvented for the field.",
    status: "Concept", year: "2025",
    category: "Mobile App",
    color: "#F0C030",
    colorAlpha: "rgba(240,192,48,0.07)",
    desc: "A mobile circuit diagramming tool built for electricians on-site. Offline-first, schematic-aware, and honest. Built for the person in the wall cavity — not the person at the desk.",
    tools: ["React Native", "TypeScript", "SQLite", "Offline-first"],
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
    desc: "An open design system for craftspeople who code. Warm, honest, anti-template. Built from the pain of real projects — not from theoretical best practices.",
    tools: ["Figma", "Storybook", "Tailwind", "Design Tokens"],
  },
];

const COMING = [
  { title: "Circuit Planner", desc: "Phase load balancing for residential panels" },
  { title: "Field Notes", desc: "Voice-to-schematic for on-site documentation" },
  { title: "Signal Dashboard", desc: "Personal productivity OS" },
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
                    <span className="proj-arrow" style={{ "--pc": p.color } as React.CSSProperties}>
                      View Case Study →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Coming next */}
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem) clamp(4rem,8vw,6rem)" }}>
          <Reveal className="reveal">
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#303450", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"clamp(1.5rem,3vw,2.5rem)" }}>
              In the pipeline
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))", gap:"clamp(1rem,2vw,1.5rem)" }}>
              {COMING.map((c, i) => (
                <Reveal key={c.title} className="reveal-scale" delay={i * 60}>
                  <div style={{ padding:"clamp(1.25rem,2.5vw,1.75rem)", background:"rgba(255,255,255,0.015)", border:"1px dashed rgba(255,255,255,0.07)", borderRadius:16 }}>
                    <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"0.8125rem", color:"rgba(255,255,255,0.25)", fontWeight:500, letterSpacing:"0.04em", marginBottom:8 }}>{c.title}</p>
                    <p style={{ fontSize:"0.8125rem", color:"#303450", lineHeight:1.65 }}>{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
