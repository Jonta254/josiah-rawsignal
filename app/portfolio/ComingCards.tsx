"use client";
import Reveal from "../components/RevealWrapper";

interface ComingItem {
  title: string; sub: string; tagline: string; desc: string;
  color: string; tag: string; href: string; status: string;
}

export default function ComingCards({ items }: { items: ComingItem[] }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))", gap:"clamp(1rem,2vw,1.5rem)", alignItems:"stretch" }}>
      {items.map((c, i) => (
        <Reveal key={c.title} className="reveal-scale" delay={i * 80}>
          <a href={c.href} target="_blank" rel="noopener" style={{ textDecoration:"none", color:"inherit", display:"block", height:"100%" }}>
            <div
              style={{
                padding:"clamp(1.5rem,3vw,2rem)",
                background:"rgba(255,255,255,0.016)",
                border:"1px solid rgba(255,255,255,0.07)",
                borderTop:`2px solid ${c.color}40`,
                borderRadius:16,
                position:"relative", overflow:"hidden",
                display:"flex", flexDirection:"column", gap:16,
                height:"100%", cursor:"pointer",
                transition:"border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${c.color}50`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.transform = "none";
              }}
            >
              <div aria-hidden="true" style={{ position:"absolute", top:0, left:0, right:0, height:80, background:`radial-gradient(ellipse 80% 100% at 50% 0%, ${c.color}10 0%, transparent 100%)`, pointerEvents:"none" }} />

              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:`${c.color}60`, letterSpacing:"0.2em" }}>0{i+1}</span>
                    <div style={{ width:16, height:1, background:`${c.color}40` }} />
                  </div>
                  <p style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.3rem,2.5vw,1.65rem)", letterSpacing:"0.04em", color:"rgba(255,255,255,0.82)", lineHeight:1 }}>{c.title}</p>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.625rem", color:`${c.color}80`, letterSpacing:"0.12em", textTransform:"uppercase", marginTop:5 }}>{c.sub}</p>
                </div>
                <a href={c.href} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} style={{
                  fontFamily:"'JetBrains Mono',monospace", fontSize:"0.5rem",
                  color:c.color, letterSpacing:"0.16em",
                  padding:"3px 9px", borderRadius:100,
                  border:`1px solid ${c.color}50`,
                  background:`${c.color}15`,
                  flexShrink:0, marginTop:2,
                  textDecoration:"none", cursor:"pointer",
                }}>{c.status}</a>
              </div>

              <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"clamp(0.8125rem,1.4vw,0.9375rem)", color:"rgba(255,255,255,0.48)", lineHeight:1.6 }}>{c.tagline}</p>

              <div style={{ height:1, background:`linear-gradient(to right, ${c.color}30, transparent)` }} />

              <p style={{ fontSize:"0.8125rem", color:"rgba(255,255,255,0.28)", lineHeight:1.78, flex:1 }}>{c.desc}</p>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.5625rem", color:"rgba(255,255,255,0.18)", letterSpacing:"0.12em" }}>{c.tag}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.5625rem", color:c.color, letterSpacing:"0.1em" }}>Open →</span>
              </div>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
