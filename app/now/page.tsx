"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  {
    cat: "BUILDING", color: "#FF8820",
    items: [
      { title: "This site",          note: "Wiring every tool to perfection — 3D, generative, alive" },
      { title: "ElectriMap v2",       note: "Offline sync and AR overlays for electrical schematics" },
      { title: "Component library",   note: "A custom design system carved from real project materials" },
    ],
  },
  {
    cat: "READING", color: "#00C8FF",
    items: [
      { title: "Shop Class as Soulcraft", note: "Matthew Crawford — third read, still finding new signals" },
      { title: "The Design of Everyday Things", note: "Norman. The bible stays relevant regardless of decade." },
      { title: "Thinking in Systems", note: "Donella Meadows — loops, delays, and leverage points" },
    ],
  },
  {
    cat: "LISTENING", color: "#A855F7",
    items: [
      { title: "Nils Frahm — All Melody", note: "Deep work soundtrack, without exception" },
      { title: "Field recordings", note: "Rain on corrugated iron. Wind through pylons." },
      { title: "Ólafur Arnalds",  note: "When the thinking needs to slow to a useful pace" },
    ],
  },
  {
    cat: "THINKING ABOUT", color: "#34D399",
    items: [
      { title: "Generalists in specialist worlds", note: "The case for breadth is stronger than most will admit" },
      { title: "Physical vs digital making",       note: "Why they need each other — and always have" },
      { title: "Durability as a design principle", note: "What gets built to last, and exactly why" },
    ],
  },
  {
    cat: "LEARNING", color: "#D4A843",
    items: [
      { title: "Rust",                       note: "Slowly and with great, necessary humility" },
      { title: "3-phase motor control",      note: "Variable frequency drives and field-oriented control" },
      { title: "Photography composition",    note: "Deliberate framing — not just pointing the lens" },
    ],
  },
  {
    cat: "OUTSIDE", color: "#FF8820",
    items: [
      { title: "Weekly long walks",       note: "At least one trail per week — genuinely non-negotiable" },
      { title: "Multi-day trail planning",note: "Scouting a proper route for later this year" },
      { title: "Watching weather systems",note: "Cumulus towers building on still afternoons" },
    ],
  },
];

export default function Now() {
  const [time, setTime] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ekgAnim   = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Animated EKG waveform ────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth * window.devicePixelRatio;
    const H = 64 * window.devicePixelRatio;
    canvas.width  = W; canvas.height = H;
    canvas.style.width  = `${canvas.offsetWidth}px`;
    canvas.style.height = "64px";

    let offset = 0;

    const drawEkg = () => {
      ctx.clearRect(0, 0, W, H);
      const cy = H / 2;
      const step = W / 300;

      ctx.beginPath();
      ctx.strokeStyle = "#FF8820";
      ctx.lineWidth = 1.5 * window.devicePixelRatio;
      ctx.globalAlpha = 0.6;
      ctx.shadowColor = "#FF8820";
      ctx.shadowBlur  = 6;

      for (let i = 0; i <= 300; i++) {
        const x = i * step;
        const phase = (i + offset) % 300;
        let y = cy;

        if (phase % 80 === 0) {
          // QRS spike
          y = cy - H * 0.55;
        } else if (phase % 80 === 1) {
          y = cy + H * 0.25;
        } else if (phase % 80 === 2) {
          y = cy;
        } else {
          y = cy + Math.sin((phase * 0.08)) * H * 0.06;
        }

        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glowing dot at current position
      const dotX = (offset % 300) * step;
      ctx.beginPath();
      ctx.arc(dotX, cy, 3 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = "#FF8820";
      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 12;
      ctx.fill();

      offset = (offset + 1) % 300;
      ekgAnim.current = requestAnimationFrame(drawEkg);
    };

    ekgAnim.current = requestAnimationFrame(drawEkg);
    return () => cancelAnimationFrame(ekgAnim.current);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-now{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.7)}}
        .now-item:hover .now-item-note { color: #7880A2; }
      `}</style>

      <section style={{
        minHeight:"100vh",
        background:`
          radial-gradient(ellipse 60% 50% at 80% 0%,   rgba(52,211,153,0.07) 0%,transparent 60%),
          radial-gradient(ellipse 50% 40% at 5%  60%,  rgba(0,220,255,0.05)  0%,transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 100%, rgba(176,64,255,0.04) 0%,transparent 50%),
          linear-gradient(170deg, #030215 0%, #050118 50%, #020110 100%)
        `,
        paddingTop:"clamp(6rem,12vw,9rem)",
        paddingBottom:"clamp(4rem,8vw,6rem)",
        position:"relative", overflow:"hidden",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize:"36px 36px", maskImage:"radial-gradient(ellipse 80% 80% at 30% 30%,black 10%,transparent 75%)" }} />

        <div style={{ maxWidth:760, margin:"0 auto", padding:"0 clamp(1.25rem,4vw,2.5rem)", position:"relative", zIndex:1 }}>

          {/* Header */}
          <div style={{ marginBottom:"clamp(2.5rem,5vw,4rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <span style={{ position:"relative", width:7, height:7, display:"inline-block" }}>
                <span style={{ position:"absolute",inset:0,borderRadius:"50%",background:"#34D399", animation:"pulse-now 2s infinite" }} />
              </span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.18em", color:"#34D399", textTransform:"uppercase" }}>
                Live status · {time || "—"}
              </span>
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(4.5rem,16vw,10rem)", lineHeight:0.86, color:"#F2F4FC", letterSpacing:"0.01em", marginBottom:"1.5rem" }}>
              NOW
            </h1>
            <p style={{ fontSize:"clamp(0.9375rem,1.6vw,1.0625rem)", color:"#7880A2", lineHeight:1.85, maxWidth:480 }}>
              A living snapshot of what I am actually doing right now — not a polished bio. Updated whenever something real changes.
            </p>
          </div>

          {/* Animated EKG */}
          <canvas ref={canvasRef} style={{ width:"100%", height:64, marginBottom:"clamp(2rem,4vw,3rem)", display:"block", borderRadius:4 }} />

          {/* Availability */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"0.625rem 1.125rem", border:"1px solid rgba(52,211,153,0.22)", borderRadius:100, background:"rgba(52,211,153,0.04)", marginBottom:"clamp(3rem,6vw,5rem)" }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#34D399",flexShrink:0, boxShadow:"0 0 8px #34D399", animation:"pulse-now 2s infinite" }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#34D399", letterSpacing:"0.10em" }}>
              OPEN TO WORK — selective projects, serious problems only
            </span>
          </div>

          {/* Sections */}
          {SECTIONS.map((sec) => (
            <div key={sec.cat} style={{ marginBottom:"clamp(2.5rem,5vw,4rem)" }}>
              <div className="now-section-label" style={{ "--now-c": sec.color } as React.CSSProperties}>
                <span style={{ display:"inline-block", width:18, height:1.5, background:sec.color, borderRadius:1, opacity:0.7 }} />
                <span style={{ color:sec.color, fontSize:9, letterSpacing:"0.22em" }}>{sec.cat}</span>
              </div>
              {sec.items.map((item) => (
                <div key={item.title} className="now-item">
                  <div>
                    <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(0.75rem,1.3vw,0.8125rem)", fontWeight:500, color:"#C8CAD8", letterSpacing:"0.04em", marginBottom:5 }}>{item.title}</p>
                    <p className="now-item-note" style={{ fontSize:"clamp(0.8rem,1.2vw,0.875rem)", color:"#5A6282", lineHeight:1.75, transition:"color 0.3s ease" }}>{item.note}</p>
                  </div>
                  <span style={{ display:"inline-block", width:4, height:4, borderRadius:"50%", background:sec.color, opacity:0.45, flexShrink:0, marginTop:8 }} />
                </div>
              ))}
            </div>
          ))}

          {/* Footer */}
          <div style={{ paddingTop:"2.5rem", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
            <div>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.16)", letterSpacing:"0.10em" }}>
                LAST UPDATED · <span style={{ color:"#C87B2F" }}>JUNE 27, 2026</span>
              </p>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.10)", marginTop:4 }}>
                Inspired by{" "}
                <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.22)", textDecoration:"underline" }}>nownownow.com</a>
              </p>
            </div>
            <Link href="/contact" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#FF8820", letterSpacing:"0.10em", textDecoration:"none", transition:"opacity 0.2s" }}>
              Work with me →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
