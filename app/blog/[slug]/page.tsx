import type { Metadata } from "next";
import Link from "next/link";
import CopperWire from "../../components/CopperWire";
import ReadingProgress from "../../components/ReadingProgress";
import NewsletterForm from "../../components/NewsletterForm";

const POSTS: Record<string, {
  title: string; tag: string; tagColor: string; date: string; readTime: string;
  author: string; authorNote: string; body: string[];
  related: { slug: string; title: string }[];
}> = {
  "wiring-panel-architecture": {
    title: "What wiring a panel taught me about architecture",
    tag: "⚡ Electrical", tagColor: "var(--color-wire)",
    date: "June 18, 2026", readTime: "7 min read", author: "Josiah",
    authorNote: "I wrote this after spending three hours retracing a fault in a distribution board that looked exactly like a circular dependency. I had to laugh.",
    body: [
      "There's a moment — and if you've worked with complex systems of any kind you'll recognise it — when you stare at something and realise you're not looking at one problem but at a record of every decision ever made about it. A breaker panel does this to me. And so does a legacy codebase.",
      "Both are accumulations of intent. The person who wired this panel had reasons. The developer who structured this module had reasons. The question — the same question in both cases — is whether those reasons are still visible, still legible, still *right*.",
      "In electrical work, we call a bad installation a 'rats nest' — a tangle of wire with no discernible logic, where things work but nobody can tell you why, and nobody's sure what will happen if you change one thing. Software engineers call this technical debt. The name changes. The texture of the frustration does not.",
      "What the trade taught me is this: the quality of an installation is measured not by whether it works on the day it's finished, but by whether someone can understand it, maintain it, and extend it safely years later. Every wire labelled. Every circuit protected. Every join accessible.",
      "Good architecture — in code, in buildings, in electrical systems — is fundamentally an act of communication with the future. You are writing a message to someone you'll never meet who will need to trust your work. That shifts how you think about the shortcuts.",
      "The mental model transfers more directly than I expected. When I started coding seriously, I found that I already understood separation of concerns — I'd just been calling them circuits. I understood fault isolation — I'd been calling it a fuse. I understood the difference between a patch and a repair.",
      "The deeper lesson is about respect for the system. A good electrician never assumes. They test. They verify. They document. They leave the installation better than they found it. That's not a skill. That's a disposition. And it's the most transferable thing I own.",
    ],
    related: [
      { slug: "design-second-language", title: "Design as a second language" },
      { slug: "on-finishing-things",    title: "On finishing things" },
    ],
  },
  "design-second-language": {
    title: "Design as a second language",
    tag: "🎨 Design", tagColor: "var(--color-ember)",
    date: "May 30, 2026", readTime: "5 min read", author: "Josiah",
    authorNote: "I wrote this after re-reading my first Figma file. I have archived it for everyone's protection.",
    body: [
      "When you learn a language as an adult, there's a specific frustration that children are spared: you know what you want to say, but you don't have the words. You have the thought fully formed, and it dissolves at the point of articulation.",
      "That is exactly what learning design felt like coming from code. I could look at a beautiful interface and understand it — intellectually, structurally. I could feel what was working. I just couldn't make it myself. The gap between what I could perceive and what I could produce was humbling.",
      "The breakthrough came when I stopped trying to learn design and started trying to learn to *see*. The design came after. First I had to understand why things looked the way they looked. Why that particular shade of grey felt 'off'. Why that button placement felt wrong. Why that much whitespace felt generous rather than empty.",
      "Code has taught me that systems have logic — they follow rules, and the rules are discoverable. Design has the same quality. The rules are less explicit but equally real. Once you start to feel them, you start to use them. And then you start to break them on purpose.",
      "The thing that made it click: I realised an electrical schematic is one of the most carefully designed objects in the world. Not beautiful in the conventional sense, but every line, every symbol, every annotation is there for a reason. Nothing is arbitrary. Every convention serves legibility. That is design.",
      "I was already a designer. I just hadn't known what to call it.",
    ],
    related: [
      { slug: "wiring-panel-architecture", title: "What wiring a panel taught me about architecture" },
      { slug: "tools-i-actually-use",       title: "Tools I actually use (and why)" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.body[0].slice(0, 155) };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return (
      <section className="pt-32 pb-24 min-h-screen max-w-3xl mx-auto px-6" style={{ background: "var(--color-void)" }}>
        <h1 className="font-bebas text-5xl mb-4" style={{ color: "var(--color-chalk)" }}>Post not found</h1>
        <Link href="/blog" style={{ color: "var(--color-copper)" }}>← Back to blog</Link>
      </section>
    );
  }

  return (
    <>
      <ReadingProgress />
      {/* Hero */}
      <section className="pt-32 pb-16 relative" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 400" d="M0,200 Q360,80 720,200 Q1080,320 1440,200" className="h-full opacity-30" />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Link href="/blog" className="font-mono text-xs mb-8 block" style={{ color: "var(--color-stone)" }}>
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ background: `${post.tagColor}20`, color: post.tagColor }}>
              {post.tag}
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{post.date}</span>
            <span className="font-mono text-xs" style={{ color: "var(--color-stone)" }}>{post.readTime}</span>
          </div>
          <h1 className="font-playfair italic mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: "var(--color-chalk)" }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <article className="py-16" style={{ background: "var(--color-earth)" }}>
        <div className="max-w-3xl mx-auto px-6">
          {post.body.map((para, i) => (
            <p
              key={i}
              className={`leading-relaxed mb-6 text-base md:text-lg ${i === 0 ? "drop-cap" : ""}`}
              style={{ color: "var(--color-stone)", maxWidth: "68ch" }}
            >
              {para}
            </p>
          ))}

          {/* Author note */}
          <div className="mt-16 pt-8 border-t" style={{ borderColor: "rgba(184,115,51,0.2)" }}>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// What I was thinking about when I wrote this</p>
            <p className="font-caveat text-xl" style={{ color: "var(--color-stone)" }}>&ldquo;{post.authorNote}&rdquo;</p>
            <p className="font-mono text-xs mt-2" style={{ color: "var(--color-stone)" }}>— {post.author}</p>
          </div>
        </div>
      </article>

      {/* Related + Newsletter */}
      <section className="py-16" style={{ background: "var(--color-void)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs mb-6" style={{ color: "var(--color-copper)" }}>// Read next</p>
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {post.related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`}
                className="block p-5 rounded glass-card transition-all"
                style={{ color: "var(--color-chalk)" }}
              >
                <p className="font-playfair italic">{r.title}</p>
                <p className="font-mono text-xs mt-2" style={{ color: "var(--color-copper)" }}>Read →</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="font-caveat text-2xl mb-2" style={{ color: "var(--color-copper)" }}>Think alongside me.</p>
            <p className="text-sm mb-6" style={{ color: "var(--color-stone)" }}>No spam. Just occasional writing.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
