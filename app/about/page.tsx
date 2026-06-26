import type { Metadata } from "next";
import Link from "next/link";
import CopperWire from "../components/CopperWire";
import Reveal from "../components/RevealWrapper";
import SignalDot from "../components/SignalDot";

export const metadata: Metadata = {
  title: "About",
  description: "Electrician, developer, designer, and human. Josiah is many things — this is all of them.",
};

const FACES = [
  {
    num: "01",
    identity: "THE ELECTRICIAN",
    color: "var(--color-wire)",
    quote: "Every wire has a purpose. Every connection matters.",
    skills: ["Conduit bending", "Panel installations", "Fault diagnosis", "Schematics", "3-phase systems", "Safety protocols"],
    body: [
      "Before I ever wrote a line of code, I was on my hands and knees tracing circuits through walls that hadn't been touched since the '80s. Electrical work taught me something no computer science course could: physical systems have consequences. A wrong connection doesn't give you a runtime error. It gives you smoke, heat, or worse.",
      "The discipline I learned in the field — double-checking your work, respecting the sequence, understanding why not just how — transferred directly to how I build software. I trace bugs the same way I trace faults. I think in systems because I had to, long before I knew what a systems thinker was.",
      "There's also something humbling about working with your hands inside something built before you were born. The wire doesn't care how many Stack Overflow answers you've read. It either works or it doesn't. That honesty shaped everything.",
    ],
  },
  {
    num: "02",
    identity: "THE DEVELOPER",
    color: "var(--color-sky)",
    quote: "Code is just electricity for ideas.",
    skills: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Figma → Code"],
    skillBars: true,
    body: [
      "I came to development sideways — through trying to build tools for electricians that didn't exist. That practical origin means I've never been able to separate 'building software' from 'solving a real problem.' Every project starts with a frustration, a gap, or a system that could work better.",
      "What I love most about code is what I love about wiring: it's a conversation between intention and physics. You write what you mean, and the machine either agrees or tells you exactly where your thinking broke down. That feedback loop is addictive.",
      "The connection between electrical logic and code logic runs deep. Both are about managing flow, handling load, protecting against faults, and building systems that don't fail silently. I find that the mental models transfer more than people expect.",
    ],
    skillData: [
      { name: "JavaScript / TypeScript", pct: 88 },
      { name: "React / Next.js", pct: 85 },
      { name: "HTML / CSS", pct: 92 },
      { name: "Node.js", pct: 78 },
      { name: "Python", pct: 65 },
      { name: "UI/UX Design", pct: 80 },
    ],
  },
  {
    num: "03",
    identity: "THE DESIGNER",
    color: "var(--color-ember)",
    quote: "Design is how it works, not just how it looks.",
    skills: ["Figma", "Design systems", "UI/UX", "Motion design", "Typography", "Colour theory"],
    body: [
      "I came to design the same way I came to code: by needing it. I needed my tools to communicate clearly, so I had to learn how communication worked. I started in Figma by copying things I liked until I understood why they worked. Then I started questioning the originals.",
      "My design philosophy is rooted in function. An electrical schematic is one of the most beautiful designed objects in the world — not because it looks nice, but because every line communicates exactly what it needs to, with no waste. I want to design like that.",
      "The relationship between electrical schematics and UI wireframes is not a metaphor. Both are communication systems for complex systems. Both have to be readable by someone who wasn't there when you drew them. Both are works of precision in service of clarity.",
    ],
  },
  {
    num: "04",
    identity: "THE EXPLORER",
    color: "var(--color-moss)",
    quote: "The best debugger is a long walk outside.",
    skills: ["Trail navigation", "Landscape observation", "Patience", "Getting lost intentionally"],
    body: [
      "I grew up around nature and then spent years slowly drifting away from it as screens and deadlines multiplied. The return was not dramatic — it was a Tuesday afternoon walk that went on longer than planned, and the realisation that I'd solved a problem I'd been stuck on for a week.",
      "Now I treat the outdoors as infrastructure. It's not a reward for getting work done. It's part of how I work. The walk, the climb, the hour sitting by water — these are when my subconscious finishes processing things that my conscious mind got stuck on.",
      "There's something about the scale of natural systems — the patience of geology, the precision of ecology — that recalibrates how I think about the systems I build. My problems get smaller. My thinking gets longer.",
    ],
  },
  {
    num: "05",
    identity: "THE HUMAN",
    color: "var(--color-stone)",
    quote: "The work is the output. Being fully alive is the point.",
    skills: ["Curiosity", "Listening", "Coffee", "Finding the funny in the frustrating"],
    body: [
      "A normal Tuesday looks like this: up early, coffee, one hour of reading before the screen turns on, work until afternoon, then — if I can — some time outside before the evening. I'm trying to build a life where the rhythms support the work, not the other way around.",
      "What I value in people: honesty without cruelty, curiosity without arrogance, a sense of humour that doesn't punch down. I'm most energised by conversations that leave me feeling like I need to go learn something.",
      "What I'm proud of that has nothing to do with screens or tools: the friendships I've kept, the moments I've stayed present for, the times I've said 'I don't know' and meant it.",
    ],
  },
];

const VALUES = [
  { icon: "⚡", title: "Precision", desc: "Vague is the enemy of good. I think clearly, work specifically, and communicate exactly." },
  { icon: "🔗", title: "Connection", desc: "Between ideas, people, systems. I'm drawn to the hidden threads that tie things together." },
  { icon: "🌱", title: "Growth", desc: "I want to be better next year than I am this year. In every dimension, not just the professional ones." },
  { icon: "🏔", title: "Depth", desc: "I'd rather understand one thing fully than skim ten things shallowly. Quality of attention matters." },
  { icon: "🛠", title: "Craft", desc: "The work itself is the practice. How you do anything is how you do everything." },
  { icon: "☀", title: "Honesty", desc: "With myself, with collaborators, in the work. No facades, no performance. Just real." },
];

const TIMELINE = [
  { year: "2016", title: "Picked up my first multimeter", desc: "Started an apprenticeship in electrical work. Didn't know it would shape everything." },
  { year: "2018", title: "Built my first website", desc: "Terrible. I keep a screenshot to stay humble." },
  { year: "2020", title: "First paying client", desc: "A local business, a WordPress site, and a lesson in scope creep." },
  { year: "2021", title: "Got serious about design", desc: "Discovered Figma. Realised the gap between what I could build and what I could imagine was entirely closeable." },
  { year: "2022", title: "First full-stack app shipped", desc: "A tool for electricians. Felt like the two worlds finally talking to each other." },
  { year: "2023", title: "Went deeper into nature", desc: "Spent 3 months hiking on weekends. Came back with clearer thinking and better code." },
  { year: "2024", title: "Freelancing full-time", desc: "Took the leap. The discipline of the trade had prepared me for more than I expected." },
  { year: "2026", title: "Building in public", desc: "This site. Sharing work, thinking, and process with whoever finds it useful." },
];

export default function About() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-32 pb-24 relative" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 500" d="M0,250 Q360,50 720,250 Q1080,450 1440,250" className="h-full opacity-60" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal className="reveal">
              <h1 className="font-bebas leading-none mb-4" style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "var(--color-chalk)" }}>
                I AM MANY THINGS.
              </h1>
              <p className="font-playfair italic text-2xl mb-6" style={{ color: "var(--color-copper)" }}>
                Electrician. Developer. Designer. Dreamer. Human.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-stone)" }}>
                I grew up curious about how things work — which led me into walls chasing circuits before it led me to screens chasing elegant code.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-stone)" }}>
                I don&apos;t fit a single professional category, and I&apos;ve stopped trying to. The electrician in me makes me a better developer. The designer in me makes both better. The person who spends time outdoors makes the whole thing worth doing.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-stone)" }}>
                This page is an attempt to show all of that honestly.{" "}
                <span className="font-caveat text-lg" style={{ color: "var(--color-copper)" }}>
                  There&apos;s also a hidden Easter egg somewhere.
                </span>{" "}
                <SignalDot />
              </p>
            </Reveal>
            <Reveal className="reveal-right">
              <div
                className="relative h-96 rounded overflow-hidden"
                style={{ border: "1px solid rgba(184,115,51,0.2)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,11,7,0.6)" }}>
                  <span className="font-bebas text-9xl opacity-10" style={{ color: "var(--color-copper)" }}>J</span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="font-caveat text-xl" style={{ color: "var(--color-copper)" }}>
                    &ldquo;Every wire has a purpose.&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE FIVE FACES ───────────────────────────────── */}
      {FACES.map((face, fi) => (
        <section
          key={face.num}
          className="py-24"
          style={{ background: fi % 2 === 0 ? "var(--color-earth)" : "var(--color-void)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <Reveal className="reveal mb-12">
              <div className="flex items-baseline gap-6">
                <span className="font-bebas" style={{ fontSize: "5rem", color: "rgba(184,115,51,0.15)", lineHeight: 1 }}>{face.num}</span>
                <h2 className="font-bebas" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", color: face.color }}>{face.identity}</h2>
              </div>
              <div className="h-px mt-4" style={{ background: `${face.color}30` }} />
            </Reveal>

            {/* Content grid */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Photo placeholder */}
              <Reveal className={fi % 2 === 0 ? "reveal-left" : "reveal-right"}>
                <div
                  className="relative h-80 md:h-96 rounded overflow-hidden"
                  style={{ border: `1px solid ${face.color}30` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,11,7,0.7)" }}>
                    <span className="font-bebas text-9xl opacity-10" style={{ color: face.color }}>{face.num}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(13,11,7,0.9), transparent)" }}>
                    <p className="font-caveat text-xl" style={{ color: face.color }}>&ldquo;{face.quote}&rdquo;</p>
                  </div>
                </div>
                <p className="font-mono text-xs mt-3 text-center" style={{ color: "var(--color-stone)" }}>
                  [ Photo of Josiah — {face.identity.toLowerCase()} ]
                </p>
              </Reveal>

              {/* Text + skills */}
              <Reveal className="reveal">
                {face.body.map((para, i) => (
                  <p key={i} className={`text-base leading-relaxed mb-4 ${i === 0 ? "drop-cap" : ""}`} style={{ color: "var(--color-stone)" }}>
                    {para}
                  </p>
                ))}

                {/* Skill bars for Developer */}
                {face.skillBars && face.skillData && (
                  <div className="mt-8 space-y-4">
                    {face.skillData.map((s) => (
                      <div key={s.name}>
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{s.name}</span>
                          <span className="font-mono text-xs" style={{ color: "var(--color-copper)" }}>{s.pct}%</span>
                        </div>
                        <div className="h-1 rounded-full" style={{ background: "rgba(184,115,51,0.15)" }}>
                          <div
                            className="h-full rounded-full skill-bar-fill revealed"
                            style={{ "--target-width": `${s.pct}%`, background: face.color, width: `${s.pct}%` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skill tags */}
                {!face.skillBars && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {face.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-xs px-3 py-1 rounded-full"
                        style={{ background: `${face.color}15`, color: face.color, border: `1px solid ${face.color}30` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── LIFE VISION ──────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 600" d="M0,300 Q360,80 720,300 Q1080,520 1440,300" className="h-full opacity-40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal className="reveal mb-16 text-center">
            <h2 className="font-bebas" style={{ fontSize: "clamp(3rem,8vw,5rem)", color: "var(--color-chalk)" }}>
              HOW I SEE THE WORLD
            </h2>
          </Reveal>

          {[
            {
              heading: "What I believe about work",
              pull: "The work that matters most is the work done when no one is watching.",
              body: "I believe work is a form of respect — for the people who will use what you build, for the craft itself, for your own time. I'd rather take longer and do it properly than ship something that creates problems downstream. This comes directly from the trade: a rushed wire in a wall is a fire waiting to happen.",
            },
            {
              heading: "What I believe about people",
              pull: "Curiosity is the most underrated skill in any room.",
              body: "The best collaborators I've worked with were not always the most technically skilled. They were the ones who asked good questions, admitted when they were wrong, and made everyone around them feel like their input mattered. That's the kind of person I try to be, and the kind of person I want to build with.",
            },
            {
              heading: "What I believe about the natural world",
              pull: "Nature is a teacher that charges nothing and demands presence.",
              body: "There is something in time spent outdoors that no productivity app has ever replicated. The scale recalibrates your sense of problem. The silence gives the subconscious room. I don't think this is mystical — I think it's just the oldest version of what we now call 'taking a break to gain perspective.'",
            },
            {
              heading: "My long-term vision",
              pull: "Build things that outlast the trend.",
              body: "I want to build tools that solve real problems for real people, to design experiences that feel considered and human, and to keep growing — in skill, in depth, in my understanding of what it means to live well. In ten years I want to look back at a body of work that actually helped people, not a portfolio of impressive-looking projects no one used.",
            },
            {
              heading: "How I want to be remembered",
              pull: "He made it look like effort and made effort look like love.",
              body: "I want people to say: he cared. About the work, about the people, about doing things properly. That he could be trusted to take something on and see it through with integrity. That he was fully present when he was there. That's enough. That's actually everything.",
            },
          ].map((section, i) => (
            <Reveal key={section.heading} className="reveal mb-12" delay={i * 100}>
              <h3 className="font-playfair italic text-xl mb-3" style={{ color: "var(--color-copper)" }}>{section.heading}</h3>
              <blockquote className="font-playfair italic text-2xl mb-4 pl-4" style={{ color: "var(--color-chalk)", borderLeft: `2px solid ${i % 2 === 0 ? "var(--color-copper)" : "var(--color-moss)"}` }}>
                {section.pull}
              </blockquote>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-stone)" }}>{section.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="reveal mb-12">
            <h2 className="font-bebas text-6xl" style={{ color: "var(--color-chalk)" }}>WHAT I STAND FOR</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} className="reveal-scale face-card p-6 rounded" delay={i * 80}
                style={{ background: "rgba(13,11,7,0.5)", border: "1px solid rgba(184,115,51,0.15)" } as React.CSSProperties}
              >
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="font-bebas text-2xl mb-2" style={{ color: "var(--color-chalk)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-void)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="reveal mb-12 text-center">
            <h2 className="font-bebas text-6xl" style={{ color: "var(--color-chalk)" }}>HOW I GOT HERE</h2>
          </Reveal>
          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ background: "rgba(184,115,51,0.2)" }} />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={i * 80}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`w-5/12 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <span className="font-mono text-xs" style={{ color: "var(--color-copper)" }}>{t.year}</span>
                    <h3 className="font-bebas text-xl mt-1" style={{ color: "var(--color-chalk)" }}>{t.title}</h3>
                    <p className="text-sm mt-1" style={{ color: "var(--color-stone)" }}>{t.desc}</p>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 timeline-dot w-3 h-3 rounded-full border-2 mt-1" style={{ borderColor: "var(--color-copper)", background: "var(--color-void)" }} />
                  <div className="w-5/12" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS OVERVIEW ──────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="reveal mb-12">
            <h2 className="font-bebas text-6xl" style={{ color: "var(--color-chalk)" }}>SKILLS & TOOLS</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                label: "⚡ Electrical",
                color: "var(--color-wire)",
                skills: [
                  { name: "Conduit & Cable Installation", pct: 92 },
                  { name: "Panel Design & Installation", pct: 88 },
                  { name: "Fault Diagnosis", pct: 85 },
                  { name: "Schematic Reading", pct: 90 },
                ],
              },
              {
                label: "💻 Digital",
                color: "var(--color-sky)",
                skills: [
                  { name: "Frontend Development", pct: 88 },
                  { name: "UI/UX Design", pct: 80 },
                  { name: "Backend & APIs", pct: 75 },
                  { name: "Design Systems", pct: 82 },
                ],
              },
            ].map((col) => (
              <div key={col.label}>
                <h3 className="font-bebas text-2xl mb-8" style={{ color: col.color }}>{col.label}</h3>
                <div className="space-y-5">
                  {col.skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{s.name}</span>
                        <span className="font-mono text-xs" style={{ color: col.color }}>{s.pct}%</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: "rgba(184,115,51,0.15)" }}>
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: col.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CV DOWNLOAD ──────────────────────────────────── */}
      <section className="py-16 text-center" style={{ background: "var(--color-void)" }}>
        <Reveal className="reveal">
          <p className="font-mono text-xs mb-4" style={{ color: "var(--color-stone)" }}>// Want the full picture?</p>
          <a
            href="/josiah-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper px-10 py-4 text-sm font-medium tracking-wide rounded inline-block"
          >
            <span>Download CV (PDF)</span>
          </a>
        </Reveal>
      </section>
    </>
  );
}
