import type { Metadata } from "next";
import Link from "next/link";
import CopperWire from "../../components/CopperWire";
import GeoShapes from "../../components/GeoShapes";

const PROJECTS: Record<string, {
  title: string; role: string; timeline: string; tools: string[]; status: string;
  accent: string; challenge: string; approach: string[]; outcome: string;
  prev?: string; next?: string;
}> = {
  electrimap: {
    title: "ElectriMap",
    role: "Product Designer + Developer",
    timeline: "3 months · 2023",
    tools: ["React Native", "Figma", "Node.js", "SQLite"],
    status: "Shipped · App Store",
    accent: "var(--geo-teal)",
    challenge: "Electricians on job sites need to document circuit layouts quickly, but existing tools are either paper-based or desktop software that doesn't work offline. A solution needed to be fast, offline-first, and intuitive enough to use in a hard hat.",
    approach: [
      "Spent two weeks shadowing electricians on job sites to understand the real workflow — what information they needed to capture, when, and in what conditions (often one hand occupied, wearing gloves, in low light).",
      "Designed a gesture-first interface where common actions — adding a circuit, marking a fault, snapping a photo — required minimal taps. The app feels like it was built by someone who's actually held a wire nut.",
      "Built with React Native for cross-platform reach, SQLite for offline storage, and a sync layer that uploads documentation when a connection becomes available. No connection required at the point of capture.",
    ],
    outcome: "Used by 200+ electricians within three months of launch. Average session length: 4 minutes — fast enough to use between tasks. App Store rating: 4.7/5.",
    prev: "rawpanel",
    next: "terrain-journal",
  },
  "terrain-journal": {
    title: "Terrain Journal",
    role: "Designer + Developer",
    timeline: "6 weeks · 2023",
    tools: ["Next.js", "Tailwind CSS", "Mapbox GL", "Vercel"],
    status: "Shipped · Web",
    accent: "var(--color-moss)",
    challenge: "Most outdoor journaling apps are either too lightweight (Instagram) or too data-heavy (Strava/Garmin). There was space for something that captured the texture of an experience — not just the metrics.",
    approach: [
      "Started with a content-first approach: what does a trail journal entry actually contain? Route, conditions, mood, notes, photos, moment of reflection. Designed the UI around those content types, not the other way around.",
      "Used Mapbox GL for interactive route visualisation — users can trace their actual path rather than just logging a distance. Photos attach to GPS coordinates and appear on the map.",
      "Kept the writing experience minimal and distraction-free. The editor is a single long-form text area. No formatting toolbar. Just you and the blank page.",
    ],
    outcome: "750 registered users, 90-day retention at 42%. Featured in two outdoor publication newsletters.",
    prev: "electrimap",
    next: "rawpanel",
  },
  rawpanel: {
    title: "RawPanel UI",
    role: "Design System Author",
    timeline: "Ongoing · 2024",
    tools: ["Figma", "Storybook", "React", "TypeScript", "CSS Custom Properties"],
    status: "In Progress · Open Source",
    accent: "var(--color-copper)",
    challenge: "Every project I started required rebuilding the same set of components: buttons, cards, inputs, navbars. Most available design systems are either too opinionated (Material, Ant Design) or too bare (Headless UI). I wanted something warm and craftsperson-like.",
    approach: [
      "Started in Figma with a design language rather than components — establishing the visual principles first. Warm tones, honest borders, no shadows that don't serve a purpose.",
      "Built components in Storybook to document every variant and state before touching production code. The documentation is part of the design.",
      "Published as an open-source npm package. The API is designed to be obvious without reading the docs — if you have to look something up to do the obvious thing, the API is wrong.",
    ],
    outcome: "Used in 8 personal projects. 120 GitHub stars in the first month. First external contributor in week three.",
    prev: "terrain-journal",
    next: "electrimap",
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS[slug];
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.challenge.slice(0, 155) };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS[slug];

  if (!p) {
    return (
      <section className="pt-32 pb-24 min-h-screen max-w-4xl mx-auto px-6" style={{ background: "var(--color-void)" }}>
        <h1 className="font-bebas text-5xl mb-4" style={{ color: "var(--color-chalk)" }}>Project not found</h1>
        <Link href="/portfolio" style={{ color: "var(--color-copper)" }}>← Back to Work</Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "var(--color-void)" }}>
        <GeoShapes variant="cyan" />
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 500" d="M0,250 Q360,80 720,250 Q1080,420 1440,250" className="h-full opacity-30" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link href="/portfolio" className="font-mono text-xs mb-8 block" style={{ color: "var(--color-stone)" }}>← Back to Work</Link>
          <h1
            className="font-bebas leading-none mb-6"
            style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "var(--color-chalk)" }}
          >
            {p.title}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap gap-6 p-6 rounded glass-card" style={{ borderLeft: `3px solid ${p.accent}` }}>
            {[
              { label: "Role",     value: p.role     },
              { label: "Timeline", value: p.timeline },
              { label: "Status",   value: p.status   },
            ].map((m) => (
              <div key={m.label}>
                <p className="font-mono text-xs mb-1" style={{ color: "var(--color-stone)" }}>{m.label}</p>
                <p className="font-rajdhani text-sm font-medium" style={{ color: "var(--color-chalk)" }}>{m.value}</p>
              </div>
            ))}
            <div>
              <p className="font-mono text-xs mb-1" style={{ color: "var(--color-stone)" }}>Tools</p>
              <div className="flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{ background: `${p.accent}20`, color: p.accent }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study content */}
      <article style={{ background: "var(--color-earth)" }} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Challenge */}
          <section className="mb-16">
            <p className="font-orbitron text-xs uppercase tracking-widest mb-4" style={{ color: p.accent }}>The Challenge</p>
            <p className="text-lg leading-relaxed drop-cap" style={{ color: "var(--color-stone)", maxWidth: "70ch" }}>{p.challenge}</p>
          </section>

          {/* Approach */}
          <section className="mb-16">
            <p className="font-orbitron text-xs uppercase tracking-widest mb-8" style={{ color: p.accent }}>My Approach</p>
            <div className="space-y-8">
              {p.approach.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full font-orbitron text-xs"
                      style={{ background: `${p.accent}20`, color: p.accent, border: `1px solid ${p.accent}40` }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-base leading-relaxed pt-1" style={{ color: "var(--color-stone)" }}>{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Visual placeholder */}
          <section className="mb-16">
            <div className="relative h-72 rounded-lg overflow-hidden glass-card flex items-center justify-center"
              style={{ border: `1px solid ${p.accent}30` }}>
              <div className="absolute inset-0">
                <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect x="0" y="0" width="800" height="300" fill="rgba(13,11,7,0.5)" />
                  <circle cx="400" cy="150" r="100" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.3" />
                  <polygon points="400,50 550,200 250,200" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.2" />
                  <text x="400" y="165" textAnchor="middle" fontFamily="Orbitron" fontSize="48" fill={p.accent} opacity="0.08">
                    {p.title[0]}
                  </text>
                </svg>
              </div>
              <p className="relative font-mono text-xs" style={{ color: "var(--color-stone)" }}>
                [ Project visuals — {p.title} ]
              </p>
            </div>
          </section>

          {/* Outcome */}
          <section>
            <p className="font-orbitron text-xs uppercase tracking-widest mb-4" style={{ color: p.accent }}>The Outcome</p>
            <blockquote className="text-xl font-playfair italic pl-4" style={{ color: "var(--color-chalk)", borderLeft: `2px solid ${p.accent}` }}>
              {p.outcome}
            </blockquote>
          </section>
        </div>
      </article>

      {/* Prev / Next nav */}
      <nav className="py-12" style={{ background: "var(--color-void)", borderTop: "1px solid rgba(184,115,51,0.15)" }}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between">
          {p.prev ? (
            <Link href={`/portfolio/${p.prev}`} className="group flex items-center gap-3">
              <span style={{ color: "var(--color-stone)" }}>←</span>
              <span className="font-mono text-xs group-hover:text-copper transition-colors" style={{ color: "var(--color-stone)" }}>
                Previous Project
              </span>
            </Link>
          ) : <div />}
          {p.next ? (
            <Link href={`/portfolio/${p.next}`} className="group flex items-center gap-3">
              <span className="font-mono text-xs group-hover:text-copper transition-colors" style={{ color: "var(--color-stone)" }}>
                Next Project
              </span>
              <span style={{ color: "var(--color-stone)" }}>→</span>
            </Link>
          ) : <div />}
        </div>
      </nav>
    </>
  );
}
