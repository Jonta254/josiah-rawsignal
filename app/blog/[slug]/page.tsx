import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "../../components/NewsletterForm";

const POSTS: Record<string, {
  title: string; tag: string; tagColor: string; tagRgb: string;
  date: string; readTime: string; author: string; authorNote: string;
  body: string[]; related: { slug: string; title: string; cat: string }[];
}> = {
  "wiring-panel-architecture": {
    title: "What wiring a panel taught me about architecture",
    tag: "Electrical", tagColor: "#F0C030", tagRgb: "240,192,48",
    date: "June 18, 2026", readTime: "7 min read", author: "Josiah",
    authorNote: "I wrote this after spending three hours retracing a fault in a distribution board that looked exactly like a circular dependency. I had to laugh.",
    body: [
      "There is a moment — and if you have worked with complex systems of any kind you will recognise it — when you stare at something and realise you are not looking at one problem but at a record of every decision ever made about it. A breaker panel does this to me. And so does a legacy codebase.",
      "Both are accumulations of intent. The person who wired this panel had reasons. The developer who structured this module had reasons. The question — the same question in both cases — is whether those reasons are still visible, still legible, still right.",
      "In electrical work, we call a bad installation a rats nest — a tangle of wire with no discernible logic, where things work but nobody can tell you why, and nobody is sure what will happen if you change one thing. Software engineers call this technical debt. The name changes. The texture of the frustration does not.",
      "What the trade taught me is this: the quality of an installation is measured not by whether it works on the day it is finished, but by whether someone can understand it, maintain it, and extend it safely years later. Every wire labelled. Every circuit protected. Every join accessible.",
      "Good architecture — in code, in buildings, in electrical systems — is fundamentally an act of communication with the future. You are writing a message to someone you will never meet who will need to trust your work. That shifts how you think about the shortcuts.",
      "When I started coding seriously, I found that I already understood separation of concerns — I had just been calling them circuits. I understood fault isolation — I had been calling it a fuse. I understood the difference between a patch and a repair.",
      "The deeper lesson is about respect for the system. A good electrician never assumes. They test. They verify. They document. They leave the installation better than they found it. That is not a skill. That is a disposition. And it is the most transferable thing I own.",
    ],
    related: [
      { slug: "design-second-language", title: "Design as a second language", cat: "Design" },
    ],
  },
  "design-second-language": {
    title: "Design as a second language",
    tag: "Design", tagColor: "#B040FF", tagRgb: "176,64,255",
    date: "May 30, 2026", readTime: "5 min read", author: "Josiah",
    authorNote: "I wrote this after re-reading my first Figma file. I have archived it for everyone's protection.",
    body: [
      "When you learn a language as an adult, there is a specific frustration that children are spared: you know what you want to say, but you do not have the words. You have the thought fully formed, and it dissolves at the point of articulation.",
      "That is exactly what learning design felt like coming from code. I could look at a beautiful interface and understand it — intellectually, structurally. I could feel what was working. I just could not make it myself. The gap between what I could perceive and what I could produce was humbling.",
      "The breakthrough came when I stopped trying to learn design and started trying to learn to see. The design came after. First I had to understand why things looked the way they looked. Why that particular shade of grey felt off. Why that button placement felt wrong. Why that much whitespace felt generous rather than empty.",
      "Code has taught me that systems have logic — they follow rules, and the rules are discoverable. Design has the same quality. The rules are less explicit but equally real. Once you start to feel them, you start to use them. And then you start to break them on purpose.",
      "The thing that made it click: I realised an electrical schematic is one of the most carefully designed objects in the world. Not beautiful in the conventional sense, but every line, every symbol, every annotation is there for a reason. Nothing is arbitrary. Every convention serves legibility. That is design.",
      "I was already a designer. I just had not known what to call it.",
    ],
    related: [
      { slug: "wiring-panel-architecture", title: "What wiring a panel taught me about architecture", cat: "Electrical" },
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
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", background:"var(--void)", gap:20 }}>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"5rem", color:"var(--chalk)" }}>Post not found</h1>
        <Link href="/blog" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12,
          color:"var(--copper)", letterSpacing:"0.1em" }}>← Back to Writing</Link>
      </section>
    );
  }

  return (
    <>
      <style>{`
        .blog-back { transition: color 180ms; }
        .blog-back:hover { color: var(--chalk) !important; }
        .blog-para { line-height: 1.92; }
        .blog-related-card { transition: border-color 280ms, background 280ms, transform 280ms; }
        .blog-related-card:hover {
          border-color: rgba(${post.tagRgb},0.35) !important;
          background: rgba(${post.tagRgb},0.04) !important;
          transform: translateY(-2px);
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight:"62vh", display:"flex", alignItems:"flex-end",
        position:"relative", overflow:"hidden",
        background:`
          radial-gradient(ellipse 65% 55% at 80% 0%,   rgba(${post.tagRgb},0.11) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 5%  75%,  rgba(${post.tagRgb},0.06) 0%, transparent 55%),
          linear-gradient(170deg, #030215 0%, #04010F 55%, #020108 100%)
        `,
        padding:"clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize:"36px 36px",
          maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)" }} />
        <div aria-hidden="true" style={{ position:"absolute",bottom:0,left:0,right:0,height:"40%",
          background:"linear-gradient(to top,rgba(3,2,21,0.96) 0%,transparent 100%)", pointerEvents:"none" }} />
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1,
          background:`linear-gradient(to right,transparent,rgba(${post.tagRgb},0.3) 40%,rgba(${post.tagRgb},0.55) 50%,rgba(${post.tagRgb},0.3) 60%,transparent)` }} />

        <div style={{ maxWidth:860, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <Link href="/blog" className="blog-back" style={{
            display:"inline-flex", alignItems:"center", gap:8, marginBottom:36,
            fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.14em",
            color:"rgba(255,255,255,0.3)", textDecoration:"none",
          }}>← BACK TO WRITING</Link>

          {/* Meta */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center", marginBottom:28 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
              letterSpacing:"0.12em", padding:"4px 12px", borderRadius:100,
              background:`rgba(${post.tagRgb},0.10)`, color:post.tagColor,
              border:`1px solid rgba(${post.tagRgb},0.22)` }}>{post.tag}</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
              color:"rgba(255,255,255,0.25)", letterSpacing:"0.06em" }}>{post.date}</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
              color:"rgba(255,255,255,0.18)", letterSpacing:"0.06em" }}>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
            fontSize:"clamp(1.75rem,5vw,3.5rem)", lineHeight:1.2, color:"#E8EAF4",
            fontWeight:600, maxWidth:"22ch" }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <article style={{
        background:"#04050E",
        padding:"clamp(3.5rem,7vw,7rem) clamp(1.25rem,5vw,3rem)",
        position:"relative",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1,
          background:`linear-gradient(to right,transparent,rgba(${post.tagRgb},0.15) 40%,rgba(${post.tagRgb},0.28) 50%,rgba(${post.tagRgb},0.15) 60%,transparent)` }} />

        <div style={{ maxWidth:660, margin:"0 auto" }}>
          {post.body.map((para, i) => (
            <p key={i} className="blog-para" style={{
              fontSize: i === 0 ? "clamp(1.05rem,1.9vw,1.2rem)" : "clamp(0.9375rem,1.6vw,1.0625rem)",
              color: i === 0 ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.48)",
              marginBottom:"clamp(1.25rem,2.5vw,1.75rem)",
              fontFamily: i === 0 ? "'Playfair Display',serif" : "'Inter',sans-serif",
            }}>
              {para}
            </p>
          ))}

          {/* Author note */}
          <div style={{
            marginTop:"clamp(3rem,6vw,5rem)",
            paddingTop:"clamp(1.5rem,3vw,2rem)",
            borderTop:"1px solid rgba(255,255,255,0.06)",
          }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
              letterSpacing:"0.22em", color:post.tagColor, marginBottom:16,
              textTransform:"uppercase" }}>// A note from the author</p>
            <blockquote style={{ fontFamily:"'Caveat',cursive", fontSize:"clamp(1.15rem,2vw,1.4rem)",
              color:"rgba(255,255,255,0.42)", lineHeight:1.65, margin:0 }}>
              &ldquo;{post.authorNote}&rdquo;
            </blockquote>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
              color:"rgba(255,255,255,0.22)", marginTop:12, letterSpacing:"0.08em" }}>
              — {post.author}
            </p>
          </div>
        </div>
      </article>

      {/* ── Related + Newsletter ──────────────────────────────────── */}
      <section style={{
        background:"#02010A",
        borderTop:"1px solid rgba(255,255,255,0.04)",
        padding:"clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)",
      }}>
        <div style={{ maxWidth:660, margin:"0 auto" }}>

          {post.related.length > 0 && (
            <div style={{ marginBottom:"clamp(3rem,6vw,5rem)" }}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.22em", color:"rgba(255,255,255,0.2)",
                textTransform:"uppercase", marginBottom:20 }}>Read next</p>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {post.related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-related-card" style={{
                    display:"block", padding:"clamp(1.25rem,2.5vw,1.75rem)",
                    borderRadius:14, textDecoration:"none",
                    background:"rgba(255,255,255,0.018)",
                    border:"1px solid rgba(255,255,255,0.06)",
                  }}>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                      color:post.tagColor, letterSpacing:"0.14em",
                      marginBottom:8 }}>{r.cat.toUpperCase()}</p>
                    <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
                      fontSize:"clamp(0.95rem,1.8vw,1.1rem)", color:"rgba(255,255,255,0.6)",
                      lineHeight:1.45, marginBottom:12 }}>{r.title}</p>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                      color:post.tagColor, letterSpacing:"0.1em" }}>Read →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div style={{ textAlign:"center" }}>
            <p style={{ fontFamily:"'Caveat',cursive", fontSize:"clamp(1.5rem,3vw,2rem)",
              color:"var(--copper)", marginBottom:8 }}>Think alongside me.</p>
            <p style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.3)",
              lineHeight:1.75, marginBottom:28, maxWidth:"40ch", margin:"0 auto 28px" }}>
              Occasional writing on building, designing, and living with intention.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
