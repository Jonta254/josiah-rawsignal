import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/RevealWrapper";

export const metadata: Metadata = {
  title: "Writing",
  description: "Thinking out loud — articles on building, designing, and living with intention.",
};

const POSTS = [
  {
    slug: "wiring-panel-architecture",
    num: "01",
    date: "Jun 2026", cat: "Electrical", catColor: "#F0C030",
    title: "What wiring a panel taught me about architecture",
    excerpt: "Every circuit is a module. Every breaker is a boundary. The mental model transfers more than you would think — and the lessons move in both directions.",
    readTime: "6 min",
  },
  {
    slug: "design-second-language",
    num: "02",
    date: "May 2026", cat: "Design", catColor: "#B040FF",
    title: "Design as a second language",
    excerpt: "Learning to design after years of writing code was like learning to speak after years of only reading. The grammar was already there. The fluency took practice.",
    readTime: "5 min",
  },
];

const COMING = [
  "Why field tools need fewer features, not more",
  "The difference between clean code and honest code",
  "What nature teaches about systems thinking",
  "On being a generalist in a world of specialists",
  "Precision as a form of respect",
];

export default function BlogPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: "62vh",
        display:"flex", alignItems:"flex-end",
        position:"relative", overflow:"hidden",
        background:`
          radial-gradient(ellipse 65% 55% at 75% 0%,   rgba(176,64,255,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45% at 10% 80%,  rgba(0,220,255,0.07)  0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 90% 70%,  rgba(255,136,32,0.06) 0%, transparent 50%),
          linear-gradient(170deg, #030215 0%, #050118 50%, #020110 100%)
        `,
        padding:"clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"36px 36px", maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 80%)" }} />
        <div aria-hidden="true" style={{ position:"absolute",bottom:0,left:0,right:0,height:"38%", background:"linear-gradient(to top,rgba(3,2,21,0.96) 0%,transparent 100%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <Reveal className="reveal">
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.22em", color:"#B040FF", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ display:"inline-block", width:28, height:1, background:"linear-gradient(to right,#B040FF,transparent)" }} />
              SIGNAL.WRITING
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,11vw,10rem)", lineHeight:0.86, letterSpacing:"0.01em", color:"#F2F4FC" }}>
              THINKING<br />
              <span style={{ background:"linear-gradient(90deg,#B040FF,#00DFFF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>OUT LOUD</span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize:"clamp(0.9375rem,1.6vw,1.0625rem)", lineHeight:1.85, color:"#7880A2", maxWidth:500, marginTop:24 }}>
              Occasional notes on building, designing, and living with intention — from someone who works in both the physical and digital world.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────────── */}
      <section style={{
        background:`
          radial-gradient(ellipse 50% 40% at 80% 0%, rgba(176,64,255,0.06) 0%,transparent 55%),
          radial-gradient(ellipse 40% 30% at 10% 60%,rgba(0,220,255,0.04) 0%,transparent 50%),
          #04050E
        `,
        padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position:"relative",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1, background:"linear-gradient(to right,transparent,rgba(176,64,255,0.25) 40%,rgba(176,64,255,0.45) 50%,rgba(176,64,255,0.25) 60%,transparent)" }} />

        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* Published */}
          <div style={{ marginBottom:"clamp(3.5rem,7vw,6rem)" }}>
            <Reveal className="reveal">
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.18em", color:"#303450", textTransform:"uppercase", marginBottom:"clamp(1.5rem,3vw,2.5rem)", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ display:"inline-block", width:20, height:1, background:"rgba(255,255,255,0.1)" }} />
                Published
              </div>
            </Reveal>

            {POSTS.map((post, i) => (
              <Reveal key={post.slug} className="reveal" delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className="post-article">
                  {/* Number */}
                  <div className="post-num">{post.num}</div>

                  {/* Content */}
                  <div>
                    <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12, flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.12em", padding:"3px 10px", borderRadius:100, background:`${post.catColor}14`, color:post.catColor, border:`1px solid ${post.catColor}28` }}>{post.cat}</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#404868", letterSpacing:"0.06em" }}>{post.date}</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#303450", letterSpacing:"0.06em" }}>{post.readTime} read</span>
                      <span className="post-arrow" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:post.catColor, marginLeft:"auto" }}>→</span>
                    </div>
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.15rem,2.5vw,1.5rem)", color:"#E8EAF4", lineHeight:1.38, marginBottom:10, fontWeight:600 }}>{post.title}</h2>
                    <p style={{ fontSize:"clamp(0.8125rem,1.3vw,0.9rem)", lineHeight:1.82, color:"#5A6282" }}>{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Coming */}
          <Reveal className="reveal">
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.18em", color:"#303450", textTransform:"uppercase", marginBottom:"clamp(1.25rem,2.5vw,2rem)", display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ display:"inline-block", width:20, height:1, background:"rgba(255,255,255,0.1)" }} />
              In the draft queue
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {COMING.map((t, i) => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:16, padding:"clamp(0.875rem,1.75vw,1.25rem) 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.1)", minWidth:24, letterSpacing:"0.1em" }}>0{i+1}</span>
                  <span style={{ fontSize:"clamp(0.8125rem,1.3vw,0.9rem)", color:"#404868", lineHeight:1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
