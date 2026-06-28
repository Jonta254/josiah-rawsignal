"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  {
    cat: "BUILDING",
    color: "#C87B2F",
    items: [
      { title: "This site", note: "Wiring every tool to perfection — 3D, generative, alive" },
      { title: "ElectriMap v2", note: "Offline sync, AR overlays for electrical schematics" },
      { title: "Component library", note: "Custom design system being carved out of raw materials" },
    ],
  },
  {
    cat: "READING",
    color: "#00C8FF",
    items: [
      { title: "Shop Class as Soulcraft", note: "Matthew Crawford — third read, still finding new signals" },
      { title: "The Design of Everyday Things", note: "Norman. The bible stays relevant." },
      { title: "Thinking in Systems", note: "Donella Meadows — loops, delays, leverage points" },
    ],
  },
  {
    cat: "LISTENING",
    color: "#A855F7",
    items: [
      { title: "Nils Frahm — All Melody", note: "Deep work soundtrack, no exceptions" },
      { title: "Field recordings", note: "Rain on corrugated iron, wind through pylons" },
      { title: "Ólafur Arnalds", note: "When the thinking needs to slow down" },
    ],
  },
  {
    cat: "THINKING ABOUT",
    color: "#34D399",
    items: [
      { title: "Generalists in specialist worlds", note: "The case for breadth is stronger than they admit" },
      { title: "Physical making vs digital making", note: "Why they need each other" },
      { title: "Durability as a design principle", note: "What gets built to last and why" },
    ],
  },
  {
    cat: "LEARNING",
    color: "#D4A843",
    items: [
      { title: "Rust", note: "Slowly and with great humility" },
      { title: "3-phase motor control", note: "Variable frequency drives and field-oriented control" },
      { title: "Photography composition", note: "Deliberate framing, not just pointing" },
    ],
  },
  {
    cat: "OUTSIDE",
    color: "#C87B2F",
    items: [
      { title: "Weekly long walks", note: "At least one trail per week — non-negotiable" },
      { title: "Multi-day trail planning", note: "Scouting a proper route for later this year" },
      { title: "Watching weather systems", note: "Cumulus towers on still afternoons" },
    ],
  },
];

function SignalPulse({ color }: { color: string }) {
  return (
    <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}`, animation: "pulse-now 2s infinite", flexShrink: 0, marginTop: 2 }} />
  );
}

export default function Now() {
  const [time, setTime] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    // EKG-style waveform
    ctx.strokeStyle = "#C87B2F";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    let x = 0;
    while (x < W) {
      const y = H / 2 + Math.sin(x * 0.04) * 8 + (Math.random() - 0.5) * 4;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      // random spike
      if (Math.random() < 0.003) {
        ctx.lineTo(x + 2, H / 2 - 30);
        ctx.lineTo(x + 4, H / 2 + 20);
        ctx.lineTo(x + 6, y);
        x += 6;
      }
      x += 1;
    }
    ctx.stroke();
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-now { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        .now-item { border-left: 1px solid rgba(255,255,255,0.06); padding-left: 1.25rem; margin-bottom: 1.25rem; transition: border-color 0.3s; }
        .now-item:hover { border-left-color: var(--item-color, #C87B2F); }
      `}</style>

      <section style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse 60% 50% at 80% 0%,   rgba(52,211,153,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 5%  60%,  rgba(0,220,255,0.05)  0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 100%, rgba(176,64,255,0.04) 0%, transparent 50%),
          linear-gradient(170deg, #030215 0%, #050118 50%, #020110 100%)
        `,
        paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "clamp(4rem,8vw,6rem)",
        position: "relative", overflow: "hidden",
      }}>
        {/* dot grid */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 80% 80% at 30% 30%, black 10%, transparent 75%)",
        }} />

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: "clamp(3rem,6vw,4.5rem)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <SignalPulse color="#34D399" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "#34D399", textTransform: "uppercase" }}>Live status · {time}</span>
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem,14vw,9rem)", lineHeight: 0.88, color: "#F2F4FC", letterSpacing: "0.02em", marginBottom: "1.5rem" }}>NOW</h1>
            <p style={{ fontSize: "clamp(0.9375rem,1.6vw,1.0625rem)", color: "#7880A2", lineHeight: 1.85, maxWidth: 500 }}>
              A living snapshot of what I&apos;m actually doing — not a polished bio. Updated when something real changes.
            </p>
          </div>

          {/* EKG line */}
          <canvas ref={canvasRef} style={{ width: "100%", height: 60, marginBottom: "clamp(2.5rem,5vw,4rem)", display: "block" }} />

          {/* Availability chip */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.5rem 1rem", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 100, background: "rgba(52,211,153,0.04)", marginBottom: "clamp(3rem,6vw,4.5rem)" }}>
            <SignalPulse color="#34D399" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#34D399", letterSpacing: "0.08em" }}>OPEN TO WORK — selective projects, serious problems</span>
          </div>

          {/* Sections */}
          {SECTIONS.map((sec, si) => (
            <div key={sec.cat} style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                <div style={{ width: 24, height: 1, background: sec.color, opacity: 0.6 }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: sec.color, letterSpacing: "0.16em", textTransform: "uppercase" }}>{sec.cat}</span>
              </div>
              {sec.items.map((item) => (
                <div
                  key={item.title}
                  className="now-item"
                  style={{ "--item-color": sec.color } as React.CSSProperties}
                >
                  <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(0.75rem,1.3vw,0.875rem)", fontWeight: 500, color: "#C8CAD8", letterSpacing: "0.04em", marginBottom: 6 }}>{item.title}</p>
                  <p style={{ fontSize: "clamp(0.8rem,1.2vw,0.875rem)", color: "#5A6282", lineHeight: 1.75 }}>{item.note}</p>
                </div>
              ))}
            </div>
          ))}

          {/* Footer */}
          <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em" }}>
                LAST UPDATED · <span style={{ color: "#C87B2F" }}>JUNE 27, 2026</span>
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.12)", marginTop: 4 }}>
                Inspired by{" "}
                <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "underline" }}>nownownow.com</a>
              </p>
            </div>
            <Link href="/contact" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#C87B2F", letterSpacing: "0.1em", textDecoration: "none" }}>
              Work with me →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
