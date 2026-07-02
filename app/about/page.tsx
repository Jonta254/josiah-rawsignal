"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CircuitBackground = dynamic(() => import("./CircuitBackground"), { ssr: false });

/* ── constants ──────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];


/* ── data ───────────────────────────────────────────────────────── */
const ROLES = [
  {
    id: "electrician", num: "01", icon: "⚡",
    title: "The Electrician",
    color: "#F0C030",
    body: "Before I ever wrote a line of code, I was inside walls — tracing faults by feel, reading current by instinct. The trade taught me that physical systems do not negotiate: they work, or they do not. That absolute honesty reshaped how I think about everything I build.",
    skills: ["Conduit & cable","Panel design","Fault diagnosis","Schematic reading","Safety protocols"],
  },
  {
    id: "developer", num: "02", icon: "◈",
    title: "The Developer",
    color: "#00DFFF",
    body: "Full-stack by necessity, frontend by genuine love. I build tools for people who work with their hands and interfaces for those who think with their heads. Every line of code serves a real problem — not a résumé bullet, not a trend.",
    skills: ["Frontend development","React / Next.js","TypeScript","Backend & APIs","Responsive UI"],
  },
  {
    id: "designer", num: "03", icon: "◉",
    title: "The Designer",
    color: "#B040FF",
    body: "Figma-native and motion-aware. Obsessed with the space between things — the margins, the rhythm, the precise moment an interface becomes genuinely honest. Design is not what it looks like. It is what it does and whether it respects the person using it.",
    skills: ["UI/UX design","Figma","Design systems","Typography","Motion design"],
  },
  {
    id: "explorer", num: "04", icon: "◎",
    title: "The Explorer",
    color: "#00FF88",
    body: "The outdoors is not a hobby — it is infrastructure for clear thought. Hiking taught me patience. Navigation taught me systems thinking. Complete disconnection revealed what actually matters the moment I return.",
    skills: ["Orientation & navigation","Trail journaling","Photography","Environmental reading","Systems thinking"],
  },
  {
    id: "human", num: "05", icon: "○",
    title: "The Human",
    color: "#F2F4FC",
    body: "Curious without arrogance. Honest without cruelty. Present. I aim to be the kind of person whose work you trust before you have read a single line of it — because trust is never granted. It is built by showing up, consistently and well.",
    skills: ["Clear communication","Patience","Precision","Problem solving","Honest collaboration"],
  },
];

const TIMELINE = [
  { year: "2016", label: "First electrical apprenticeship — learning to read fault conditions by feel and intuition" },
  { year: "2018", label: "Qualified as a commercial and residential electrician; confidence in complex panel work" },
  { year: "2020", label: "Began teaching myself to code during a quieter season in the field" },
  { year: "2021", label: "First web project shipped — a tool built for a trade business, solving a real problem" },
  { year: "2022", label: "Moved deliberately into design — Figma, design systems, motion, and typography" },
  { year: "2023", label: "Released first open-source design system, used by other craftspeople who code" },
  { year: "2024", label: "Freelancing simultaneously across electrical, development, and design disciplines" },
  { year: "2026", label: "Building Raw Signal — a platform as precise and honest as the work it represents" },
];

const VALUES = [
  { title: "Precision over speed",  desc: "Do it right. Then do it fast. Never the other way around — shortcuts compound.", color: "#F0C030" },
  { title: "Honest craft",          desc: "The detail no one ever notices is still worth getting exactly right. That discipline is what separates lasting work from forgettable work.", color: "#00DFFF" },
  { title: "Systems thinking",      desc: "Everything connects. Understanding the whole reshapes your understanding of any single part.", color: "#B040FF" },
  { title: "Calibrated humility",   desc: "I do not know everything. I do know how to figure things out rigorously. That combination is more valuable than either alone.", color: "#00FF88" },
  { title: "Nature as infrastructure", desc: "The clearest thinking happens well away from a screen. The outdoors is not leisure — it is maintenance.", color: "#FF8820" },
  { title: "Human-first design",    desc: "Every tool should feel as though it was made specifically for the person holding it — not for the portfolio of the person who built it.", color: "#F2F4FC" },
];

/* ── Hero letters ────────────────────────────────────────────────── */
const HERO_LETTERS = [
  { ch: "B", delay: 0.10, floatDur: 3.2, floatDelay: 1.2, shimmerDur: 3.8, glintDur: 5.0,
    grad: "linear-gradient(110deg,#C85000 0%,#FF8820 22%,#FFD060 46%,#FF9830 68%,#CC5800 100%)",
    glowRgb: "255,136,32", glintColor: "rgba(255,220,140,0.88)" },
  { ch: "R", delay: 0.22, floatDur: 2.8, floatDelay: 1.4, shimmerDur: 4.2, glintDur: 6.5,
    grad: "linear-gradient(110deg,#0090CC 0%,#00CFFF 22%,#90F4FF 46%,#00D8FF 68%,#0095CC 100%)",
    glowRgb: "0,210,255", glintColor: "rgba(160,248,255,0.88)" },
  { ch: "I", delay: 0.34, floatDur: 3.6, floatDelay: 1.6, shimmerDur: 3.5, glintDur: 4.8,
    grad: "linear-gradient(110deg,#7010C0 0%,#B040FF 22%,#E0A0FF 46%,#C050FF 68%,#7515C5 100%)",
    glowRgb: "176,64,255", glintColor: "rgba(225,160,255,0.88)" },
  { ch: "A", delay: 0.46, floatDur: 2.6, floatDelay: 1.3, shimmerDur: 4.8, glintDur: 7.0,
    grad: "linear-gradient(110deg,#009050 0%,#00EE80 22%,#90FFD0 46%,#00EE80 68%,#009050 100%)",
    glowRgb: "0,238,128", glintColor: "rgba(160,255,210,0.88)" },
  { ch: "N", delay: 0.58, floatDur: 3.0, floatDelay: 1.5, shimmerDur: 4.0, glintDur: 5.5,
    grad: "linear-gradient(110deg,#CC8000 0%,#FFB800 22%,#FFE880 46%,#FFB800 68%,#CC8000 100%)",
    glowRgb: "255,184,0", glintColor: "rgba(255,238,140,0.88)" },
];

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -60, filter: "blur(18px)" },
  visible: (d: number) => ({
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { delay: d, duration: 0.9, ease: EASE },
  }),
};

/* ── RoleCard ────────────────────────────────────────────────────── */
function RoleCard({ r, i, active, onSelect }: {
  r: typeof ROLES[0]; i: number; active: boolean; onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
      onClick={onSelect}
      style={{
        background: active
          ? `linear-gradient(135deg,${r.color}0A 0%,rgba(9,11,22,0.95) 100%)`
          : "rgba(8,10,20,0.75)",
        border: `1px solid ${active ? r.color + "35" : "rgba(255,255,255,0.055)"}`,
        borderLeft: `3px solid ${active ? r.color : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18,
        padding: "clamp(1.25rem,2.5vw,1.875rem) clamp(1.25rem,2.5vw,1.875rem)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "border-color 0.28s, background 0.28s, box-shadow 0.28s",
        boxShadow: active
          ? `0 0 0 1px ${r.color}20, 0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)`
          : "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {active && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(118deg,transparent 25%,${r.color}0D 50%,transparent 75%)`,
          animation: "roleShimmer 3s ease-in-out infinite",
        }} />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: active ? 16 : 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg,${r.color}1A 0%,${r.color}0A 100%)`,
          border: `1px solid ${r.color}2A`,
          fontSize: 17, color: r.color,
          flexShrink: 0, transition: "box-shadow 0.28s",
          boxShadow: active ? `0 0 14px ${r.color}30` : "none",
        }}>{r.icon}</div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5,
            color: active ? r.color : "rgba(255,255,255,0.3)",
            letterSpacing: "0.18em", marginBottom: 3, transition: "color 0.28s",
          }}>
            SIGNAL.{r.num}
          </div>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.1rem,2.4vw,1.5rem)",
            color: active ? "#F2F4FC" : "rgba(242,244,252,0.72)",
            letterSpacing: "0.04em", lineHeight: 1,
            transition: "color 0.28s",
          }}>
            {r.title}
          </h3>
        </div>

        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: r.color,
          boxShadow: active ? `0 0 12px ${r.color}, 0 0 24px ${r.color}60` : "none",
          opacity: active ? 1 : 0.2,
          transition: "opacity 0.28s, box-shadow 0.28s",
          flexShrink: 0,
        }} />
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.36, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontSize: "clamp(0.875rem,1.4vw,0.9375rem)",
              lineHeight: 1.85, color: "#7880A2",
              marginBottom: 18, maxWidth: 600,
            }}>
              {r.body}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {r.skills.map((s) => (
                <span key={s} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: "0.07em",
                  padding: "4px 12px", borderRadius: 100,
                  background: `${r.color}10`, color: r.color,
                  border: `1px solid ${r.color}22`,
                }}>{s}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p style={{
          fontSize: "0.8rem", color: "#404868", lineHeight: 1.65,
          marginTop: 8, paddingLeft: 54,
        }}>
          {r.body.slice(0, 72)}…
        </p>
      )}
    </motion.div>
  );
}

/* ── Timeline ────────────────────────────────────────────────────── */
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const COLORS = ["#FF8820","#00DFFF","#B040FF","#00FF88","#F0C030","#FF8820","#00DFFF","#B040FF"];

  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 28 }}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 1,
          background: "linear-gradient(to bottom,#FF8820,#00DFFF 40%,#B040FF 75%,#00FF88)",
          transformOrigin: "top",
        }}
      />
      {TIMELINE.map((t, i) => (
        <motion.div
          key={t.year}
          initial={{ opacity: 0, x: -18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
          style={{ display: "flex", gap: 24, paddingBottom: 36, position: "relative", alignItems: "flex-start" }}
        >
          <div style={{
            position: "absolute", left: -34, top: 6,
            width: 12, height: 12, borderRadius: "50%",
            background: COLORS[i],
            boxShadow: `0 0 0 3px ${COLORS[i]}25, 0 0 12px ${COLORS[i]}60`,
          }} />
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: COLORS[i], minWidth: 36, paddingTop: 2,
            letterSpacing: "0.06em", fontWeight: 500,
          }}>{t.year}</div>
          <p style={{
            fontSize: "clamp(0.875rem,1.4vw,0.9375rem)",
            color: "#7880A2", lineHeight: 1.7,
          }}>{t.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        /* rich deep-space base */
        background: `
          radial-gradient(ellipse 80% 70% at 65% 0%,   rgba(20,10,60,0.95) 0%,  transparent 65%),
          radial-gradient(ellipse 60% 50% at 10% 80%,  rgba(0,40,80,0.70) 0%,   transparent 60%),
          radial-gradient(ellipse 45% 35% at 85% 65%,  rgba(60,10,120,0.50) 0%, transparent 55%),
          linear-gradient(170deg,#030215 0%,#060320 35%,#020110 65%,#010108 100%)
        `,
        padding: "clamp(7rem,14vw,11rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        <CircuitBackground />

        {/* atmospheric layers */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          {/* copper top-right bloom */}
          <div style={{ position: "absolute", top: "-8%", right: "-4%", width: "42vw", height: "42vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,136,32,0.14) 0%,transparent 65%)", filter: "blur(1px)" }} />
          {/* cyan bottom-left */}
          <div style={{ position: "absolute", bottom: "-5%", left: "-8%", width: "38vw", height: "38vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,220,255,0.10) 0%,transparent 65%)", filter: "blur(1px)" }} />
          {/* violet center-right */}
          <div style={{ position: "absolute", top: "35%", right: "22%", width: "22vw", height: "22vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(176,64,255,0.09) 0%,transparent 68%)" }} />
          {/* subtle dot grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 80%)",
          }} />
          {/* bottom fade */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(1,1,8,0.95) 0%, transparent 100%)" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          {/* eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: "0.22em", color: "#FF8820",
              marginBottom: 28, display: "flex", alignItems: "center", gap: 12,
            }}
          >
            <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(to right,#FF8820,#FFB84080)" }} />
            SIGNAL.PROFILE / BRIAN
            <span style={{ display: "inline-block", width: 16, height: 1, background: "rgba(255,136,32,0.3)" }} />
          </motion.div>

          {/* BRIAN letters */}
          <div style={{
            perspective: "1400px",
            marginBottom: 28,
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
          }}>
            {HERO_LETTERS.map(({ ch, delay, floatDur, floatDelay, shimmerDur, glintDur, grad, glowRgb, glintColor }) => (
              <motion.span
                key={ch + delay}
                custom={delay}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
              >
                <motion.span
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: floatDur, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    display: "inline-block",
                    position: "relative",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(5.5rem,18vw,17rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.82,
                    background: grad,
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: `diamondShimmer ${shimmerDur}s linear infinite ${floatDelay * 0.6}s`,
                    filter: `drop-shadow(0 0 22px rgba(${glowRgb},0.88)) drop-shadow(0 0 55px rgba(${glowRgb},0.42))`,
                  }}
                >
                  {ch}
                  <span aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(110deg, transparent 20%, ${glintColor} 50%, transparent 80%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: `diamondGlint ${glintDur}s ease-in-out infinite ${floatDelay + 0.5}s`,
                    pointerEvents: "none",
                  }}>{ch}</span>
                </motion.span>
              </motion.span>
            ))}
          </div>

          {/* subheadline + body copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
          >
            <p style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.5rem,4vw,3.2rem)",
              letterSpacing: "0.07em",
              color: "rgba(242,244,252,0.6)",
              lineHeight: 1.08,
              marginBottom: 20,
            }}>
              MANY SIGNALS.&nbsp;&nbsp;
              <span style={{
                background: "linear-gradient(90deg,#FF8820,#FFD060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                ONE PERSON.
              </span>
            </p>

            <p style={{
              fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)",
              lineHeight: 1.9,
              color: "#7880A2",
              maxWidth: 540,
              marginBottom: 36,
              fontWeight: 400,
              letterSpacing: "0.006em",
            }}>
              An electrician who writes code. A developer who reasons in systems. An explorer who creates things that endure.
              This is not a collection of separate skills — it is one coherent way of thinking, brought to bear across every domain.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary" style={{ fontSize: 13 }}>Get in Touch</Link>
              <Link href="/portfolio" className="btn btn-ghost" style={{ fontSize: 13 }}>See the Work</Link>
            </div>
          </motion.div>
        </div>

        {/* CSS keyframe for role card shimmer */}
        <style>{`
          @keyframes roleShimmer {
            0%,100% { opacity: 0.4; transform: translateX(-20px); }
            50%      { opacity: 1;   transform: translateX(20px);  }
          }
        `}</style>
      </section>

      {/* ── FIVE FREQUENCIES ─────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 70% 50% at 90% 0%,   rgba(0,220,255,0.06) 0%,transparent 60%),
          radial-gradient(ellipse 50% 40% at 10% 100%, rgba(176,64,255,0.06) 0%,transparent 60%),
          #04050E
        `,
        padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,5vw,3rem)",
        position: "relative", overflow: "hidden",
      }}>
        {/* subtle grid */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "linear-gradient(rgba(100,130,220,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(100,130,220,0.028) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* section header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.22em", color: "#00DFFF",
              marginBottom: 14, display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "linear-gradient(to right,#00DFFF,transparent)" }} />
              01 — IDENTITY
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem,7vw,5.5rem)",
              lineHeight: 0.88, color: "#F2F4FC",
              letterSpacing: "0.03em",
              marginBottom: 12,
            }}>
              THE FIVE<br />FREQUENCIES
            </h2>
            <p style={{
              fontSize: "0.875rem", color: "#404868",
              letterSpacing: "0.04em",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              Click any signal to expand
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ROLES.map((r, i) => (
              <RoleCard
                key={r.id}
                r={r}
                i={i}
                active={activeRole === i}
                onSelect={() => setActiveRole(activeRole === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 55% 60% at 50% 50%, rgba(176,64,255,0.065) 0%,transparent 65%),
          radial-gradient(ellipse 40% 30% at 90% 90%, rgba(0,220,255,0.04)  0%,transparent 55%),
          #010108
        `,
        padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,5vw,3rem)",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative wide line */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(to right,transparent,rgba(176,64,255,0.2) 30%,rgba(176,64,255,0.4) 50%,rgba(176,64,255,0.2) 70%,transparent)",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.22em", color: "#B040FF",
              marginBottom: 14, display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "linear-gradient(to right,#B040FF,transparent)" }} />
              02 — CORE VALUES
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem,7vw,5.5rem)",
              lineHeight: 0.88, color: "#F2F4FC",
              letterSpacing: "0.03em",
            }}>
              WHAT I<br />STAND ON
            </h2>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
            gap: 14,
          }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                style={{
                  background: "rgba(8,10,20,0.85)",
                  borderRadius: 16, padding: "clamp(1.375rem,2.5vw,1.875rem)",
                  border: "1px solid rgba(255,255,255,0.052)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  cursor: "default",
                  position: "relative", overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                  transition: "box-shadow 0.28s",
                }}
              >
                {/* color accent corner */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: 60, height: 60,
                  background: `radial-gradient(circle at top right,${v.color}18 0%,transparent 70%)`,
                  borderRadius: "0 16px 0 0",
                }} />
                <div style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: v.color,
                  marginBottom: 16,
                  boxShadow: `0 0 10px ${v.color}80`,
                }} />
                <h3 style={{
                  fontSize: "clamp(0.875rem,1.3vw,0.9375rem)",
                  fontWeight: 600, color: "#E8EAF4",
                  marginBottom: 10, letterSpacing: "0.01em", lineHeight: 1.3,
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontSize: "clamp(0.8125rem,1.2vw,0.875rem)",
                  lineHeight: 1.8, color: "#5A6282",
                }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,220,255,0.05) 0%,transparent 60%),
          radial-gradient(ellipse 40% 40% at 80% 30%, rgba(0,255,136,0.04) 0%,transparent 55%),
          #04050E
        `,
        padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,5vw,3rem)",
      }}>
        {/* top divider */}
        <div aria-hidden="true" style={{
          maxWidth: 1280, margin: "0 auto",
          borderTop: "1px solid rgba(0,220,255,0.08)",
          marginBottom: "clamp(3rem,6vw,5rem)",
        }} />

        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.22em", color: "#00FF88",
              marginBottom: 14, display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "linear-gradient(to right,#00FF88,transparent)" }} />
              03 — THE PATH
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem,7vw,5.5rem)",
              lineHeight: 0.88, color: "#F2F4FC",
              letterSpacing: "0.03em",
              marginBottom: 12,
            }}>
              TIMELINE
            </h2>
            <p style={{
              fontSize: "clamp(0.875rem,1.4vw,0.9375rem)",
              color: "#404868", lineHeight: 1.7, maxWidth: 400,
            }}>
              From inside walls to building the web — ten years of signals.
            </p>
          </motion.div>

          <Timeline />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,136,32,0.12) 0%,transparent 65%),
          radial-gradient(ellipse 50% 50% at 20% 0%,   rgba(176,64,255,0.06) 0%,transparent 60%),
          #010108
        `,
        padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* copper glow rule */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(to right,transparent,rgba(255,136,32,0.3) 40%,rgba(255,136,32,0.5) 50%,rgba(255,136,32,0.3) 60%,transparent)",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto" }}
        >
          <p style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1.6rem,3.2vw,2.6rem)",
            color: "#FF8820", marginBottom: 14, lineHeight: 1.3,
          }}>
            Want to build something together?
          </p>
          <p style={{
            fontSize: "clamp(0.9rem,1.4vw,1rem)",
            color: "#7880A2", marginBottom: 40,
            lineHeight: 1.8, letterSpacing: "0.005em",
          }}>
            I&rsquo;m available for freelance and full-time opportunities. Electrical, dev, or design — let&rsquo;s talk.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link href="/portfolio" className="btn btn-ghost">View My Work</Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
