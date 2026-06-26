import type { Metadata } from "next";
import Link from "next/link";
import CopperWire from "../components/CopperWire";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Work",
  description: "Things Josiah has built, wired, designed, and shipped.",
};

const CATEGORIES = ["All", "Web Design", "App Design", "Development", "Electrical", "Personal Projects"];

const PROJECTS = [
  {
    slug: "electrimap",
    title: "ElectriMap",
    category: "App Design",
    tags: ["App Design", "Development"],
    desc: "A mobile-first tool for electricians to diagram circuits and track jobs on-site. Built because no good tool existed.",
    status: "Shipped",
    year: "2023",
  },
  {
    slug: "terrain-journal",
    title: "Terrain Journal",
    category: "Web Design",
    tags: ["Web Design", "Development"],
    desc: "A minimal digital journal for outdoor adventures. Focus on simplicity and offline capability.",
    status: "Shipped",
    year: "2023",
  },
  {
    slug: "rawpanel",
    title: "RawPanel UI",
    category: "Personal Projects",
    tags: ["Design System", "Development"],
    desc: "An open design system built for craftspeople who code. Warm palette, honest components.",
    status: "In Progress",
    year: "2024",
  },
  {
    slug: "circuit-planner",
    title: "Circuit Planner",
    category: "Electrical",
    tags: ["Electrical", "Development"],
    desc: "A web tool for planning residential and light commercial electrical layouts.",
    status: "Shipped",
    year: "2022",
  },
  {
    slug: "field-notes-app",
    title: "Field Notes App",
    category: "App Design",
    tags: ["App Design", "Development"],
    desc: "Voice and photo capture for tradesperson notes. Exports to PDF invoices.",
    status: "Shipped",
    year: "2024",
  },
  {
    slug: "portfolio-os",
    title: "Portfolio OS",
    category: "Web Design",
    tags: ["Web Design"],
    desc: "An OS-inspired portfolio UI concept. Fully interactive, drag-and-drop.",
    status: "Concept",
    year: "2024",
  },
];

export default function Portfolio() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 relative" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 300" d="M0,150 Q360,50 720,150 Q1080,250 1440,150" className="h-full opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Selected Work</p>
            <h1 className="font-bebas leading-none mb-4" style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "var(--color-chalk)" }}>WORK</h1>
            <p className="font-playfair italic text-xl" style={{ color: "var(--color-stone)" }}>
              Things I&apos;ve built, wired, designed, and shipped.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 py-4 border-b" style={{ background: "rgba(13,11,7,0.9)", borderColor: "rgba(184,115,51,0.15)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-4 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors"
              style={{ borderColor: "rgba(184,115,51,0.3)", color: "var(--color-stone)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="py-24" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.slug} className="reveal-scale" delay={i * 60}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="block card-hover rounded overflow-hidden group"
                  style={{ border: "1px solid rgba(184,115,51,0.15)" }}
                >
                  {/* Image area */}
                  <div
                    className="relative h-56 overflow-hidden flex items-center justify-center"
                    style={{ background: "rgba(13,11,7,0.8)" }}
                  >
                    <span className="font-bebas text-9xl opacity-5" style={{ color: "var(--color-copper)" }}>
                      {p.title[0]}
                    </span>
                    <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-mono text-xs px-3 py-1 rounded" style={{ background: "var(--color-copper)", color: "var(--color-void)" }}>
                        View Case Study →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5" style={{ background: "rgba(13,11,7,0.4)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="font-mono text-xs" style={{ color: "var(--color-copper)" }}>{t}</span>
                        ))}
                      </div>
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: p.status === "Shipped" ? "rgba(74,124,89,0.2)" : "rgba(184,115,51,0.2)",
                          color: p.status === "Shipped" ? "var(--color-moss)" : "var(--color-wire)",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <h2 className="font-bebas text-2xl mb-1" style={{ color: "var(--color-chalk)" }}>{p.title}</h2>
                    <p className="text-sm" style={{ color: "var(--color-stone)" }}>{p.desc}</p>
                    <p className="font-mono text-xs mt-3" style={{ color: "var(--color-stone)" }}>{p.year}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
