import type { Metadata } from "next";
import Reveal from "../components/RevealWrapper";
import Link from "next/link";
import SignalDot from "../components/SignalDot";

export const metadata: Metadata = {
  title: "About",
  description: "Josiah is a multi-disciplinary builder — electrician, developer, designer, explorer, and human.",
};

const ROLES = [
  { id: "electrician", num: "01", title: "The Electrician", color: "var(--signal-electrical)", body: "Before I wrote a line of code I was inside walls, tracing faults by feel. Years on commercial and residential sites. The trade taught me that physical systems don't lie — they either work or they don't. That honesty changed the way I think about everything.", skills: ["Conduit & cable installation", "Panel design & installation", "Fault diagnosis", "Schematic reading", "Safety protocols"] },
  { id: "developer",   num: "02", title: "The Developer",   color: "var(--signal-dev)",         body: "Full-stack by necessity, frontend by love. I build tools for people who work with their hands and interfaces for people who think with their heads. React, Next.js, TypeScript — but always in service of a real problem, not a résumé.", skills: ["Frontend development", "React / Next.js", "TypeScript", "Backend & APIs", "Responsive UI"] },
  { id: "designer",    num: "03", title: "The Designer",    color: "var(--signal-design)",       body: "Figma-native. Motion-aware. Obsessed with the space between things — the margins, the rhythm, the moment an interface becomes honest. Design is not how it looks. It's how it works, how it feels, and whether it respects the person using it.", skills: ["UI/UX design", "Figma", "Design systems", "Typography", "Motion design"] },
  { id: "explorer",    num: "04", title: "The Explorer",    color: "var(--signal-nature)",       body: "The outdoors is not a hobby. It's infrastructure. Hiking taught me patience. Navigation taught me systems thinking. Being disconnected taught me what actually matters when I reconnect.", skills: ["Orientation & navigation", "Trail journaling", "Photography", "Environmental reading", "Systems thinking"] },
  { id: "human",       num: "05", title: "The Human",       color: "var(--signal-human)",        body: "Curious without arrogance. Honest without cruelty. Present. I try to be the kind of person whose work you can trust before you've read a single line of it — because trust is earned by how you show up, not what you say about yourself.", skills: ["Clear communication", "Patience", "Precision", "Problem solving", "Honest collaboration"] },
];

const TIMELINE = [
  { year: "2016", label: "First electrical apprenticeship" },
  { year: "2018", label: "Qualified electrician, commercial & residential" },
  { year: "2020", label: "Started teaching myself to code" },
  { year: "2021", label: "First web project shipped for a trade business" },
  { year: "2022", label: "Moved into design — Figma, systems, motion" },
  { year: "2023", label: "First open source design system released" },
  { year: "2024", label: "Freelancing across electrical, dev, and design" },
  { year: "2026", label: "Building Raw Signal — this is where I am now" },
];

const VALUES = [
  { title: "Precision over speed", desc: "Do it right. Then do it fast. Never the other way around." },
  { title: "Honest craft", desc: "The detail no one sees is still worth getting right." },
  { title: "Systems thinking", desc: "Everything is connected. Understanding the whole changes how you work on any single part." },
  { title: "Humility", desc: "I don't know everything. I know how to figure things out. That's better." },
  { title: "Nature as reset", desc: "The best thinking happens away from a screen." },
  { title: "Human-first design", desc: "Tools should feel like they were made for the person, not for the portfolio." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "flex-end", position: "relative", background: "var(--void)", padding: "clamp(6rem,12vw,9rem) clamp(1.25rem,4vw,2rem) clamp(3rem,6vw,5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Reveal className="reveal">
            <div className="section-tag">About Josiah</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: 0.9, color: "var(--chalk)", marginBottom: 24 }}>
              MANY<br />SIGNALS,<br /><span className="text-copper">ONE PERSON.</span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize: "clamp(1rem,1.8vw,1.15rem)", lineHeight: 1.75, color: "var(--stone)", maxWidth: 600, marginBottom: 32 }}>
              An electrician who codes. A developer who designs. An explorer who builds. Not a portfolio of skills — a single way of thinking applied across different domains.
            </p>
            <SignalDot />
          </Reveal>
        </div>
      </section>

      {/* Five Roles */}
      <section style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal className="reveal" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="section-tag">01 — Identity</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.9, color: "var(--chalk)" }}>THE FIVE FACES</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.5rem)" }}>
            {ROLES.map((r, i) => (
              <Reveal key={r.id} id={r.id} className="reveal" delay={i * 50}>
                <div style={{ background: "var(--carbon)", borderRadius: 20, padding: "clamp(1.5rem,3vw,2.5rem)", border: "1px solid rgba(255,255,255,0.04)", borderTop: `1px solid ${r.color}20`, display: "grid", gridTemplateColumns: "200px 1fr auto", gap: "clamp(1.5rem,3vw,2.5rem)", alignItems: "start" }}
                  className="about-role-grid"
                >
                  <div>
                    <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", lineHeight: 1, color: r.color, opacity: 0.15, fontWeight: 700, marginBottom: 4 }}>{r.num}</div>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--chalk)" }}>{r.title}</h3>
                  </div>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--stone)" }}>{r.body}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 180 }}>
                    {r.skills.map((s) => (
                      <span key={s} className="tag" style={{ fontSize: 11 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.about-role-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      {/* Values */}
      <section style={{ background: "var(--void)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal className="reveal" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="section-tag">02 — Values</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.9, color: "var(--chalk)" }}>WHAT I STAND ON</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px),1fr))", gap: "clamp(1rem,2vw,1.25rem)" }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="reveal-scale" delay={i * 60}>
                <div style={{ background: "var(--carbon)", borderRadius: 16, padding: "clamp(1.25rem,2.5vw,1.75rem)", border: "1px solid rgba(255,255,255,0.04)", height: "100%" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--chalk)", marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--stone)" }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal className="reveal" style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="section-tag">03 — Timeline</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 0.9, color: "var(--chalk)" }}>THE PATH</h2>
          </Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.06)" }} />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} className="reveal-left" delay={i * 60}>
                <div style={{ display: "flex", gap: 32, paddingLeft: 32, paddingBottom: 32, position: "relative" }}>
                  <div style={{ position: "absolute", left: -4, top: 6, width: 9, height: 9, borderRadius: "50%", background: "var(--copper)", boxShadow: "0 0 8px var(--copper)" }} />
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--copper)", minWidth: 40, paddingTop: 2 }}>{t.year}</div>
                  <p style={{ fontSize: "0.9375rem", color: "var(--stone)", lineHeight: 1.6 }}>{t.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--void)", padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2rem)", textAlign: "center" }}>
        <Reveal className="reveal">
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.5rem,3vw,2.25rem)", color: "var(--copper)", marginBottom: 16 }}>
            Want to build something together?
          </p>
          <p style={{ fontSize: "0.9375rem", color: "var(--stone)", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
            I&rsquo;m available for freelance and full-time opportunities. Let&rsquo;s talk.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link href="/portfolio" className="btn btn-ghost">View My Work</Link>
            <a href="/images/josiah-cv.pdf" className="btn btn-signal">Download CV</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
