import type { Metadata } from "next";
import Link from "next/link";
import CopperWire from "../components/CopperWire";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Blog",
  description: "Josiah thinking out loud — on building, designing, nature, and life.",
};

const CATEGORIES = [
  { label: "⚡ Electrical", color: "var(--color-wire)" },
  { label: "💻 Code",       color: "var(--color-sky)" },
  { label: "🎨 Design",     color: "var(--color-ember)" },
  { label: "🌿 Nature",     color: "var(--color-moss)" },
  { label: "🧠 Philosophy", color: "#7C6ECC" },
  { label: "🔧 Craft",      color: "var(--color-stone)" },
];

const POSTS = [
  {
    slug: "wiring-panel-architecture",
    title: "What wiring a panel taught me about architecture",
    tag: "⚡ Electrical",
    tagColor: "var(--color-wire)",
    date: "June 18, 2026",
    readTime: "7 min read",
    excerpt: "There's a moment when you're looking at a breaker panel that feels exactly like looking at a complex codebase. Every circuit is a module. Every breaker is a boundary. The mental model transfers more than you'd think.",
    featured: true,
  },
  {
    slug: "design-second-language",
    title: "Design as a second language",
    tag: "🎨 Design",
    tagColor: "var(--color-ember)",
    date: "May 30, 2026",
    readTime: "5 min read",
    excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading. The grammar was already there. I just needed to learn how to use my mouth.",
    featured: false,
  },
  {
    slug: "the-case-for-going-outside",
    title: "The case for going outside (it's not what you think)",
    tag: "🌿 Nature",
    tagColor: "var(--color-moss)",
    date: "May 12, 2026",
    readTime: "4 min read",
    excerpt: "I'm not going to tell you that hiking makes you more productive. I'm going to tell you that it makes you care less about productivity in a way that paradoxically makes you better at it.",
    featured: false,
  },
  {
    slug: "on-finishing-things",
    title: "On finishing things",
    tag: "🧠 Philosophy",
    tagColor: "#7C6ECC",
    date: "April 22, 2026",
    readTime: "6 min read",
    excerpt: "The graveyard of unfinished projects is the most honest place on the internet. Everyone has one. Here's what I've learned about actually seeing things through.",
    featured: false,
  },
  {
    slug: "tools-i-actually-use",
    title: "Tools I actually use (and why)",
    tag: "🔧 Craft",
    tagColor: "var(--color-stone)",
    date: "April 8, 2026",
    readTime: "8 min read",
    excerpt: "Not a 'setup tour.' Just an honest accounting of what I reach for and why, six years into building things across trades.",
    featured: false,
  },
];

const [featured, ...rest] = POSTS;

export default function Blog() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 relative" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 300" d="M0,200 Q360,80 720,200 Q1080,320 1440,200" className="h-full opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Writing</p>
            <h1 className="font-bebas leading-none mb-4" style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "var(--color-chalk)" }}>
              THINKING OUT LOUD
            </h1>
            <p className="font-playfair italic text-xl" style={{ color: "var(--color-stone)" }}>
              On building, designing, living, and paying attention.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category pills */}
      <div className="py-6 border-b" style={{ background: "var(--color-earth)", borderColor: "rgba(184,115,51,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <span
              key={c.label}
              className="font-mono text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-all hover:opacity-80"
              style={{ borderColor: `${c.color}40`, color: c.color, background: `${c.color}12` }}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>

      <section className="py-24" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured */}
          <Reveal className="reveal mb-16">
            <Link href={`/blog/${featured.slug}`} className="block card-hover group">
              <div className="grid md:grid-cols-2 gap-8 p-8 rounded" style={{ background: "rgba(13,11,7,0.6)", border: "1px solid rgba(184,115,51,0.2)" }}>
                <div className="relative h-64 md:h-auto rounded overflow-hidden flex items-center justify-center" style={{ background: "rgba(13,11,7,0.5)" }}>
                  <span className="font-bebas" style={{ fontSize: "8rem", color: "rgba(184,115,51,0.08)" }}>★</span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${featured.tagColor}20`, color: featured.tagColor }}>{featured.tag}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{featured.date}</span>
                    <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{featured.readTime}</span>
                  </div>
                  <h2 className="font-playfair italic text-3xl mb-4" style={{ color: "var(--color-chalk)" }}>{featured.title}</h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-stone)" }}>{featured.excerpt}</p>
                  <span className="font-mono text-sm" style={{ color: "var(--color-copper)" }}>Read →</span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.slug} className={i % 2 === 0 ? "reveal-left" : "reveal-right"} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className="block card-hover group rounded overflow-hidden h-full" style={{ border: "1px solid rgba(184,115,51,0.15)" }}>
                  <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: "rgba(13,11,7,0.8)" }}>
                    <span className="font-bebas text-8xl opacity-5" style={{ color: post.tagColor }}>✦</span>
                  </div>
                  <div className="p-5 flex flex-col h-full" style={{ background: "rgba(26,18,8,0.4)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${post.tagColor}20`, color: post.tagColor }}>{post.tag}</span>
                    </div>
                    <h3 className="font-playfair italic text-lg mb-2" style={{ color: "var(--color-chalk)" }}>{post.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-stone)" }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{post.date}</span>
                      <span className="font-mono text-xs" style={{ color: "var(--color-copper)" }}>Read →</span>
                    </div>
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
