"use client";
import { useState } from "react";
import Reveal from "../components/RevealWrapper";

function FloatField({
  type = "text", name, label, value, rows,
  onChange, required, placeholder,
}: {
  type?: string; name: string; label: string; value: string;
  rows?: number; onChange: (v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const isTextarea = !!rows;

  return (
    <div className={`float-field-wrap${isTextarea ? " textarea" : ""}${focused ? " active" : ""}${filled ? " filled" : ""}`}>
      <label htmlFor={name}>{label}</label>
      {isTextarea ? (
        <textarea
          id={name} name={name} rows={rows} required={required}
          className="float-field-input" value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ minHeight: 140 }}
        />
      ) : (
        <input
          id={name} name={name} type={type} required={required}
          className="float-field-input" value={value}
          placeholder={focused ? (placeholder || "") : ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
}

export default function ContactPage() {
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setError("");
    try {
      const res  = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{
        minHeight:"62vh", display:"flex", alignItems:"flex-end",
        position:"relative", overflow:"hidden",
        background:`
          radial-gradient(ellipse 60% 55% at 70% 0%,   rgba(255,136,32,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 5%  75%,  rgba(0,220,255,0.07)  0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 90% 70%,  rgba(52,211,153,0.05) 0%, transparent 50%),
          linear-gradient(165deg, #030215 0%, #060118 50%, #020110 100%)
        `,
        padding:"clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none", backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"36px 36px", maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 80%)" }} />
        <div aria-hidden="true" style={{ position:"absolute",bottom:0,left:0,right:0,height:"38%", background:"linear-gradient(to top,rgba(3,2,21,0.96) 0%,transparent 100%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <Reveal className="reveal">
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.22em", color:"#FF8820", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ display:"inline-block", width:28, height:1, background:"linear-gradient(to right,#FF8820,transparent)" }} />
              SIGNAL.CONTACT
            </div>
            <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3.5rem,11vw,10rem)", lineHeight:0.86, letterSpacing:"0.01em", color:"#F2F4FC" }}>
              LET&apos;S<br />
              <span style={{ background:"linear-gradient(90deg,#FF8820,#FFD060)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>TALK.</span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize:"clamp(0.9375rem,1.6vw,1.0625rem)", lineHeight:1.85, color:"#7880A2", maxWidth:500, marginTop:24 }}>
              Open to freelance projects, full-time roles, and the occasional conversation about something genuinely interesting. If you are building something honest, I want to hear about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Form + Info ──────────────────────────────────────── */}
      <section style={{
        background:`
          radial-gradient(ellipse 55% 45% at 80% 0%, rgba(255,136,32,0.06) 0%,transparent 55%),
          radial-gradient(ellipse 45% 35% at 5% 60%, rgba(0,220,255,0.05) 0%,transparent 50%),
          #04050E
        `,
        padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position:"relative",
      }}>
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1, background:"linear-gradient(to right,transparent,rgba(255,136,32,0.22) 40%,rgba(255,136,32,0.4) 50%,rgba(255,136,32,0.22) 60%,transparent)" }} />

        <div style={{ maxWidth:1280, margin:"0 auto" }} className="contact-grid">

          {/* Left — info */}
          <Reveal className="reveal-left">
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"clamp(1.5rem,3vw,2.25rem)", color:"#E8EAF4", marginBottom:20, lineHeight:1.4 }}>
              Think alongside me.
            </h2>
            <p style={{ fontSize:"clamp(0.875rem,1.4vw,0.9375rem)", color:"#7880A2", lineHeight:1.9, marginBottom:40 }}>
              I am available for the right opportunity — a freelance project, a full-time role, or a conversation about something you are building with real intent. I care about the work far more than the title.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:28, marginBottom:44 }}>
              {[
                { label:"Email",  value:"josiah@rawsignal.dev", href:"mailto:josiah@rawsignal.dev" },
                { label:"GitHub", value:"github.com/Jonta254",  href:"https://github.com/Jonta254" },
              ].map((c) => (
                <div key={c.label}>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.22em", color:"#303450", textTransform:"uppercase", marginBottom:6 }}>{c.label}</p>
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:"clamp(0.875rem,1.4vw,0.9375rem)", color:"#8890B0", transition:"color 180ms" }}
                    onMouseEnter={(e)=>(e.currentTarget.style.color="#FF8820")}
                    onMouseLeave={(e)=>(e.currentTarget.style.color="#8890B0")}
                  >{c.value}</a>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:10, position:"relative" }}>
              <span style={{ position:"relative", display:"inline-block", width:8, height:8, flexShrink:0 }}>
                <span style={{ position:"absolute",inset:0, borderRadius:"50%", background:"#34D399", animation:"contactPulse 2s ease-in-out infinite" }} />
                <span style={{ position:"absolute",inset:0, borderRadius:"50%", background:"#34D399", animation:"pulseRing 2s ease-in-out infinite" }} />
              </span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#34D399", letterSpacing:"0.12em" }}>
                Available for work
              </span>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal className="reveal-right">
            {sent ? (
              <div style={{ background:"rgba(8,10,20,0.9)", borderRadius:20, padding:"clamp(2.5rem,5vw,3.5rem)", border:"1px solid rgba(52,211,153,0.18)", textAlign:"center", backdropFilter:"blur(14px)" }}>
                <div style={{ width:56,height:56, borderRadius:"50%", background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.2)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 28px" }}>
                  <svg viewBox="0 0 20 20" fill="#34D399" style={{ width:22, height:22 }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.25rem", color:"#F2F4FC", marginBottom:12, letterSpacing:"0.04em" }}>Message sent.</h3>
                <p style={{ fontSize:"0.9rem", color:"#7880A2", lineHeight:1.75 }}>I will get back to you within a couple of days. Thank you for reaching out.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }} className="form-row">
                  <FloatField name="name" label="Your Name" value={form.name} onChange={(v)=>setForm({...form,name:v})} required />
                  <FloatField name="email" type="email" label="Email Address" value={form.email} onChange={(v)=>setForm({...form,email:v})} required />
                </div>
                <FloatField name="message" label="Your Message" value={form.message} rows={6} onChange={(v)=>setForm({...form,message:v})} required placeholder="What are you building?" />

                {error && (
                  <p style={{ color:"#FF6060", fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>{"⚠"} {error}</p>
                )}

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap", paddingTop:4 }}>
                  <p style={{ fontSize:"0.8rem", color:"#303450", lineHeight:1.65, maxWidth:280 }}>
                    Your message is sent directly to my inbox. I read everything.
                  </p>
                  <button type="submit" disabled={sending} className="btn btn-primary" style={{ opacity:sending?0.65:1, flexShrink:0 }}>
                    {sending ? "Sending…" : "Send Message"}
                    {!sending && (
                      <svg viewBox="0 0 16 16" fill="currentColor" style={{ width:12, height:12 }}>
                        <path d="M1.5 1.5l13 6.5-13 6.5V9.5l9-3-9-3V1.5z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <style>{`
        @media(max-width:500px){.form-row{grid-template-columns:1fr !important}}
        @keyframes contactPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(0.85)}}
      `}</style>
    </>
  );
}
