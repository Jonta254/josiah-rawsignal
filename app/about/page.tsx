"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const CircuitBackground = dynamic(() => import("./CircuitBackground"), { ssr: false });

/* ── data ──────────────────────────────────────────────────── */
const ROLES = [
  {
    id: "electrician", num: "01", icon: "⚡",
    title: "The Electrician",
    color: "#F0C030",
    body: "Before I wrote a line of code I was inside walls, tracing faults by feel. The trade taught me that physical systems don't lie — they either work or they don't. That honesty changed the way I think about everything.",
    skills: ["Conduit & cable installation","Panel design & installation","Fault diagnosis","Schematic reading","Safety protocols"],
  },
  {
    id: "developer", num: "02", icon: "◈",
    title: "The Developer",
    color: "#00DFFF",
    body: "Full-stack by necessity, frontend by love. I build tools for people who work with their hands and interfaces for people who think with their heads. Always in service of a real problem, never a résumé.",
    skills: ["Frontend development","React / Next.js","TypeScript","Backend & APIs","Responsive UI"],
  },
  {
    id: "designer", num: "03", icon: "◉",
    title: "The Designer",
    color: "#B040FF",
    body: "Figma-native. Motion-aware. Obsessed with the space between things — the margins, the rhythm, the moment an interface becomes honest. Design is not how it looks. It's how it works and whether it respects the person using it.",
    skills: ["UI/UX design","Figma","Design systems","Typography","Motion design"],
  },
  {
    id: "explorer", num: "04", icon: "◎",
    title: "The Explorer",
    color: "#00FF88",
    body: "The outdoors is not a hobby. It's infrastructure. Hiking taught me patience. Navigation taught me systems thinking. Being disconnected taught me what actually matters when I reconnect.",
    skills: ["Orientation & navigation","Trail journaling","Photography","Environmental reading","Systems thinking"],
  },
  {
    id: "human", num: "05", icon: "○",
    title: "The Human",
    color: "#F2F4FC",
    body: "Curious without arrogance. Honest without cruelty. Present. I try to be the kind of person whose work you can trust before you've read a single line of it — because trust is earned by how you show up.",
    skills: ["Clear communication","Patience","Precision","Problem solving","Honest collaboration"],
  },
];

const TIMELINE = [
  { year: "2016", label: "First electrical apprenticeship" },
  { year: "2018", label: "Qualified electrician — commercial & residential" },
  { year: "2020", label: "Started teaching myself to code" },
  { year: "2021", label: "First web project shipped for a trade business" },
  { year: "2022", label: "Moved into design — Figma, systems, motion" },
  { year: "2023", label: "First open source design system released" },
  { year: "2024", label: "Freelancing across electrical, dev, and design" },
  { year: "2026", label: "Building Raw Signal — this is where I am now" },
];

const VALUES = [
  { title: "Precision over speed",  desc: "Do it right. Then do it fast. Never the other way around." },
  { title: "Honest craft",          desc: "The detail no one sees is still worth getting right." },
  { title: "Systems thinking",      desc: "Everything is connected. Understanding the whole changes any single part." },
  { title: "Humility",              desc: "I don't know everything. I know how to figure things out. That's better." },
  { title: "Nature as reset",       desc: "The best thinking happens away from a screen." },
  { title: "Human-first design",    desc: "Tools should feel like they were made for the person, not the portfolio." },
];

/* ── Hero letters ────────────────────────────────────────────── */
const HERO_LETTERS = [
  { ch: "B", delay: 0.10, floatDur: 3.2, floatDelay: 1.2 },
  { ch: "R", delay: 0.22, floatDur: 2.8, floatDelay: 1.4 },
  { ch: "I", delay: 0.34, floatDur: 3.6, floatDelay: 1.6 },
  { ch: "A", delay: 0.46, floatDur: 2.6, floatDelay: 1.3 },
  { ch: "N", delay: 0.58, floatDur: 3.0, floatDelay: 1.5 },
];

/* silver → bright white → silver → steel-blue silver gradient */
const DIAMOND_GRADIENT =
  "linear-gradient(105deg, #8898BB 0%, #BCC8E8 12%, #E8EFFF 24%, #FFFFFF 32%, #D0DAEE 40%, #A0AECB 50%, #C8D4F0 58%, #FFFFFF 68%, #E0E8FF 76%, #9AAAC8 88%, #BCC8E8 100%)";

const DIAMOND_GLOW = "0 0 40px rgba(180,200,255,0.35), 0 0 80px rgba(160,180,255,0.18), 0 2px 0 rgba(255,255,255,0.15)";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -70, filter: "blur(20px)" },
  visible: (d: number) => ({
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { delay: d, duration: 0.85, ease: EASE },
  }),
};

/* ── Role card ───────────────────────────────────────────────── */
function RoleCard({ r, i, active, onSelect }: {
  r: typeof ROLES[0]; i: number; active: boolean; onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
      onClick={onSelect}
      style={{
        background: active ? `${r.color}08` : "rgba(9,11,22,0.7)",
        border: `1px solid ${active ? r.color + "40" : "rgba(255,255,255,0.05)"}`,
        borderLeft: `3px solid ${active ? r.color : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16,
        padding: "clamp(1.25rem,2.5vw,1.75rem)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
        boxShadow: active ? `0 0 32px ${r.color}18, 0 4px 24px rgba(0,0,0,0.5)` : "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* shimmer on active */}
      {active && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(120deg, transparent 30%, ${r.color}10 50%, transparent 70%)`,
          animation: "shimmerSweep 2.5s ease-in-out infinite",
        }} />
      )}

      {/* header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
          background: `${r.color}18`, border: `1px solid ${r.color}30`,
          fontSize: 18, color: r.color, fontFamily: "'JetBrains Mono', monospace",
          flexShrink: 0,
        }}>{r.icon}</div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: r.color, letterSpacing: "0.15em", marginBottom: 2 }}>
            SIG.{r.num}
          </div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.1rem,2.2vw,1.45rem)", color: "#F2F4FC", letterSpacing: "0.04em" }}>
            {r.title}
          </h3>
        </div>
        <div style={{ marginLeft: "auto", opacity: active ? 1 : 0.3, transition: "opacity 0.3s" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.38, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#8890B0", marginBottom: 16 }}>{r.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {r.skills.map((s) => (
                <span key={s} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: "0.08em",
                  padding: "3px 10px", borderRadius: 100,
                  background: `${r.color}14`, color: r.color,
                  border: `1px solid ${r.color}25`,
                }}>{s}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p style={{ fontSize: "0.8rem", color: "#50587A", lineHeight: 1.6 }}>
          {r.body.slice(0, 70)}…
        </p>
      )}
    </motion.div>
  );
}

/* ── Timeline ────────────────────────────────────────────────── */
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 32 }}>
      {/* animated vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 1,
          background: "linear-gradient(to bottom, #FF8820, #00DFFF, #B040FF)",
          transformOrigin: "top",
        }}
      />
      {TIMELINE.map((t, i) => (
        <motion.div
          key={t.year}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: EASE }}
          style={{ display: "flex", gap: 28, paddingBottom: 32, position: "relative", alignItems: "flex-start" }}
        >
          {/* dot */}
          <div style={{
            position: "absolute", left: -36, top: 4,
            width: 10, height: 10, borderRadius: "50%",
            background: i % 2 === 0 ? "#FF8820" : "#00DFFF",
            boxShadow: `0 0 10px ${i % 2 === 0 ? "#FF8820" : "#00DFFF"}`,
          }} />
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            color: i % 2 === 0 ? "#FF8820" : "#00DFFF",
            minWidth: 36, paddingTop: 2, letterSpacing: "0.05em",
          }}>{t.year}</div>
          <p style={{ fontSize: "0.9375rem", color: "#8890B0", lineHeight: 1.6 }}>{t.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #02020F 0%, #050820 40%, #010108 100%)",
        padding: "clamp(6rem,12vw,10rem) clamp(1.25rem,4vw,2rem) clamp(4rem,7vw,6rem)",
      }}>
        <CircuitBackground />

        {/* colour atmosphere */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, #FF882018 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "0", left: "-10%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle, #00DFFF10 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "30%", right: "20%", width: "20vw", height: "20vw", borderRadius: "50%", background: "radial-gradient(circle, #B040FF0C 0%, transparent 70%)" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          {/* label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#FF8820", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#FF8820" }} />
            SIGNAL.PROFILE / BRIAN
          </motion.div>

          {/* BRIAN letters — silver / diamond */}
          <div style={{ perspective: "1200px", marginBottom: 16, lineHeight: 0.82 }}>
            {HERO_LETTERS.map(({ ch, delay, floatDur, floatDelay }) => (
              /* outer: entrance animation */
              <motion.span
                key={ch + delay}
                custom={delay}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
              >
                {/* inner: continuous diamond float */}
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
                    /* diamond gradient text */
                    background: DIAMOND_GRADIENT,
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    /* sweep shimmer */
                    animation: `diamondShimmer ${3.5 + Math.random() * 1.5}s linear infinite ${floatDelay * 0.6}s`,
                    /* glow */
                    filter: "drop-shadow(0 0 18px rgba(180,200,255,0.45)) drop-shadow(0 0 4px rgba(255,255,255,0.6))",
                    textShadow: DIAMOND_GLOW,
                  }}
                >
                  {ch}
                  {/* glint streak */}
                  <span aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.9) 50%, transparent 70%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: `diamondGlint ${4 + Math.random() * 3}s ease-in-out infinite ${floatDelay + 0.5}s`,
                    pointerEvents: "none",
                  }} aria-hidden="true">{ch}</span>
                </motion.span>
              </motion.span>
            ))}
          </div>

          {/* tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
          >
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.6rem,4.5vw,3.5rem)",
              letterSpacing: "0.06em",
              color: "rgba(242,244,252,0.65)",
              lineHeight: 1.05,
              marginBottom: 24,
            }}>
              MANY SIGNALS.&nbsp;&nbsp;<span style={{ color: "#FF8820" }}>ONE PERSON.</span>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem,1.6vw,1.1rem)", lineHeight: 1.8, color: "#8890B0", maxWidth: 540, marginBottom: 36 }}>
              An electrician who codes. A developer who designs. An explorer who builds.
              Not a portfolio of skills — a single way of thinking applied across different domains.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary" style={{ fontSize: 13 }}>Get in Touch</Link>
              <Link href="/portfolio" className="btn btn-ghost" style={{ fontSize: 13 }}>See the Work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FIVE SIGNALS ─────────────────────────────────────── */}
      <section style={{ background: "#05060E", padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,4vw,2rem)", position: "relative", overflow: "hidden" }}>
        {/* subtle grid overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "linear-gradient(rgba(80,100,180,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(80,100,180,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#00DFFF", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "#00DFFF" }} />
              01 — IDENTITY
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.9, color: "#F2F4FC", letterSpacing: "0.04em" }}>
              THE FIVE<br />FREQUENCIES
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#50587A", marginTop: 12 }}>Click any signal to expand</p>
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

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section style={{
        background: "#010108",
        padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,4vw,2rem)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "60vw", height: "60vw", borderRadius: "50%", pointerEvents: "none",
          background: "radial-gradient(circle, #B040FF07 0%, transparent 65%)",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#B040FF", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "#B040FF" }} />
              02 — CORE VALUES
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.9, color: "#F2F4FC", letterSpacing: "0.04em" }}>
              WHAT I<br />STAND ON
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14 }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(176,64,255,0.14), 0 0 0 1px rgba(176,64,255,0.18)" }}
                style={{
                  background: "rgba(9,11,22,0.8)",
                  borderRadius: 14, padding: "clamp(1.25rem,2.5vw,1.75rem)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  cursor: "default",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B040FF", marginBottom: 14, boxShadow: "0 0 8px #B040FF" }} />
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#F2F4FC", marginBottom: 8, letterSpacing: "0.01em" }}>{v.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "#8890B0" }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section style={{ background: "#05060E", padding: "clamp(5rem,9vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#00FF88", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "#00FF88" }} />
              03 — TIMELINE
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.9, color: "#F2F4FC", letterSpacing: "0.04em" }}>
              THE PATH
            </h2>
          </motion.div>
          <Timeline />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{
        background: "#010108",
        padding: "clamp(5rem,9vw,7rem) clamp(1.25rem,4vw,2rem)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 100%, #FF882010 0%, transparent 70%)",
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem,3vw,2.5rem)", color: "#FF8820", marginBottom: 12 }}>
            Want to build something together?
          </p>
          <p style={{ fontSize: "0.9375rem", color: "#8890B0", marginBottom: 36, maxWidth: 400, margin: "0 auto 36px" }}>
            I&rsquo;m available for freelance and full-time opportunities. Let&rsquo;s talk.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link href="/portfolio" className="btn btn-ghost">View My Work</Link>
            <a href="/images/josiah-cv.pdf" className="btn btn-signal">Download CV</a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
