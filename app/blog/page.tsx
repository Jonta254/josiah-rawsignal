import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Writing",
  description: "Thinking out loud — articles on building, designing, and living from Josiah.",
};

const POSTS = [
  { slug: "wiring-panel-architecture", date: "Jun 2026", cat: "Electrical", catColor: "var(--signal-electrical)", title: "What wiring a panel taught me about architecture", excerpt: "Every circuit is a module. Every breaker is a boundary. The mental model transfers more than you'd think." },
  { slug: "design-second-language",    date: "May 2026", cat: "Design",     catColor: "var(--signal-design)",     title: "Design as a second language", excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading." },
];

const COMING = [
  "Why field tools need fewer features",
  "The difference between clean code and honest code",
  "What nature teaches about systems",
  "On being a generalist in a world of specialists",
];

export default function BlogPage() {
  return (
    <>
      <section style={{ minHeight: "50vh", display: "flex", alignItems: "flex-end", background: "var(--void)", padding: "clamp(6rem,12vw,9rem) clamp(1.25rem,4vw,2rem) clamp(3rem,6vw,5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Reveal className="reveal">
            <div className="section-tag">Writing</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
              THINKING<br /><span className="text-connect">OUT LOUD</span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize: "clamp(1rem,1.8vw,1.1rem)", lineHeight: 1.75, color: "var(--stone)", maxWidth: 520, marginTop: 24 }}>
              Occasional notes on building, designing, and living. From someone who works with both circuits and code.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.5rem)", marginBottom: "clamp(3rem,6vw,5rem)" }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className="reveal" delay={i * 80}>
                <Link href={`/blog/${post.slug}`} style={{ display: "block" }}>
                  <article className="blog-article-grid" style={{ background: "var(--carbon)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "clamp(1.5rem,3vw,2.5rem)", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                        <span className="tag" style={{ borderColor: `${post.catColor}30`, color: post.catColor, background: `${post.catColor}0D` }}>{post.cat}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--mist)" }}>{post.date}</span>
                      </div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "var(--chalk)", lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h2>
                      <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--stone)" }}>{post.excerpt}</p>
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: "var(--mist)", flexShrink: 0 }}>→</div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Coming soon */}
          <Reveal className="reveal">
            <div style={{ background: "var(--carbon)", border: "1px dashed rgba(255,255,255,0.07)", borderRadius: 20, padding: "clamp(1.5rem,3vw,2rem)" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--mist)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Coming soon</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {COMING.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--mist)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`@media(max-width:600px){.blog-article-grid{grid-template-columns:1fr !important}}`}</style>
    </>
  );
}
