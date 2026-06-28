import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Writing",
  description: "Thinking out loud — articles on building, designing, and living from Brian.",
};

const POSTS = [
  {
    slug: "wiring-panel-architecture",
    date: "Jun 2026", cat: "Electrical", catColor: "#F0C030",
    title: "What wiring a panel taught me about architecture",
    excerpt: "Every circuit is a module. Every breaker is a boundary. The mental model transfers more than you'd think.",
    readTime: "6 min read",
  },
  {
    slug: "design-second-language",
    date: "May 2026", cat: "Design", catColor: "#B040FF",
    title: "Design as a second language",
    excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading.",
    readTime: "5 min read",
  },
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
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "55vh",
        display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 65% 55% at 75% 0%,   rgba(176,64,255,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45% at 10% 80%,  rgba(0,220,255,0.07)  0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 90% 70%,  rgba(255,136,32,0.06) 0%, transparent 50%),
          linear-gradient(170deg, #030215 0%, #050118 50%, #020110 100%)
        `,
        padding: "clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(3rem,6vw,5rem)",
      }}>
        {/* dot grid overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 80%)",
        }} />
        {/* bottom fade */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(3,2,21,0.95) 0%, transparent 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Reveal className="reveal">
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.22em", color: "#B040FF",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "linear-gradient(to right,#B040FF,transparent)" }} />
              SIGNAL.WRITING
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem,10vw,9rem)",
              lineHeight: 0.88, letterSpacing: "0.02em",
              color: "#F2F4FC", marginBottom: 0,
            }}>
              THINKING<br />
              <span style={{
                background: "linear-gradient(90deg,#B040FF,#00DFFF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                OUT LOUD
              </span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{
              fontSize: "clamp(0.9375rem,1.6vw,1.0625rem)",
              lineHeight: 1.85, color: "#7880A2",
              maxWidth: 500, marginTop: 24,
            }}>
              Occasional notes on building, designing, and living — from someone who works with both circuits and code.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 50% 40% at 80% 0%,  rgba(176,64,255,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 10% 60%, rgba(0,220,255,0.04)  0%, transparent 50%),
          #04050E
        `,
        padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position: "relative",
      }}>
        {/* violet divider rule */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "5%", right: "5%", height: 1,
          background: "linear-gradient(to right, transparent, rgba(176,64,255,0.25) 40%, rgba(176,64,255,0.45) 50%, rgba(176,64,255,0.25) 60%, transparent)",
        }} />

        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* Published posts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: "clamp(3rem,6vw,5rem)" }}>
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className="reveal" delay={i * 80}>
                <Link href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none" }}>
                  <article className="post-card" style={{
                    background: "rgba(8,10,20,0.85)",
                    border: "1px solid rgba(255,255,255,0.055)",
                    borderLeft: `3px solid ${post.catColor}`,
                    borderRadius: 18,
                    padding: "clamp(1.5rem,3vw,2.25rem)",
                    display: "grid", gridTemplateColumns: "1fr auto",
                    gap: 24, alignItems: "center",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
                    "--hover-color": `${post.catColor}50`,
                    "--hover-glow": `0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${post.catColor}18`,
                  } as React.CSSProperties}
                  >
                    <div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                          letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 100,
                          background: `${post.catColor}14`, color: post.catColor,
                          border: `1px solid ${post.catColor}28`,
                        }}>{post.cat}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#404868", letterSpacing: "0.06em" }}>{post.date}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#303450", letterSpacing: "0.06em" }}>{post.readTime}</span>
                      </div>
                      <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(1.1rem,2.2vw,1.4rem)",
                        color: "#E8EAF4", lineHeight: 1.4, marginBottom: 10, fontWeight: 600,
                      }}>{post.title}</h2>
                      <p style={{ fontSize: "clamp(0.8125rem,1.2vw,0.875rem)", lineHeight: 1.8, color: "#5A6282" }}>{post.excerpt}</p>
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 18, color: post.catColor,
                      opacity: 0.5, flexShrink: 0,
                      transition: "opacity 0.2s, transform 0.2s",
                    }}>→</div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Coming soon */}
          <Reveal className="reveal">
            <div style={{
              background: "rgba(8,10,20,0.6)",
              border: "1px dashed rgba(255,255,255,0.07)",
              borderRadius: 18, padding: "clamp(1.5rem,3vw,2.25rem)",
              backdropFilter: "blur(8px)",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: "#303450", letterSpacing: "0.18em", textTransform: "uppercase",
                marginBottom: 18,
              }}>Coming soon</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {COMING.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
                    <span style={{ fontSize: "clamp(0.8125rem,1.2vw,0.875rem)", color: "#404868", lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .post-card { transition: border-color 0.28s, box-shadow 0.28s, transform 0.28s; }
        .post-card:hover { border-color: var(--hover-color) !important; box-shadow: var(--hover-glow) !important; transform: translateY(-2px); }
        @media(max-width:560px){article{grid-template-columns:1fr !important}}
      `}</style>
    </>
  );
}
