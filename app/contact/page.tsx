"use client";
import { useState } from "react";
import Reveal from "../components/RevealWrapper";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "55vh",
        display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 60% 55% at 70% 0%,   rgba(255,136,32,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 5%  75%,  rgba(0,220,255,0.07)  0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 90% 70%,  rgba(52,211,153,0.05) 0%, transparent 50%),
          linear-gradient(165deg, #030215 0%, #060118 50%, #020110 100%)
        `,
        padding: "clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(3rem,6vw,5rem)",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 80%)",
        }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(3,2,21,0.95) 0%, transparent 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Reveal className="reveal">
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              letterSpacing: "0.22em", color: "#FF8820",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "linear-gradient(to right,#FF8820,transparent)" }} />
              SIGNAL.CONTACT
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.5rem,10vw,9rem)",
              lineHeight: 0.88, letterSpacing: "0.02em",
              color: "#F2F4FC", marginBottom: 0,
            }}>
              LET&apos;S<br />
              <span style={{
                background: "linear-gradient(90deg,#FF8820,#FFD060)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                TALK.
              </span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{
              fontSize: "clamp(0.9375rem,1.6vw,1.0625rem)",
              lineHeight: 1.85, color: "#7880A2",
              maxWidth: 500, marginTop: 24,
            }}>
              Open to freelance projects, full-time roles, and the occasional interesting conversation. If you&rsquo;re building something honest, I want to hear about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Form + info ──────────────────────────────────────────── */}
      <section style={{
        background: `
          radial-gradient(ellipse 55% 45% at 80% 0%,  rgba(255,136,32,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 45% 35% at 5%  60%, rgba(0,220,255,0.05)  0%, transparent 50%),
          #04050E
        `,
        padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position: "relative",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "5%", right: "5%", height: 1,
          background: "linear-gradient(to right, transparent, rgba(255,136,32,0.22) 40%, rgba(255,136,32,0.4) 50%, rgba(255,136,32,0.22) 60%, transparent)",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="contact-grid">
          {/* Left: info */}
          <Reveal className="reveal-left">
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem,3vw,2.25rem)",
              color: "#E8EAF4", marginBottom: 20, lineHeight: 1.4,
            }}>
              Think alongside me.
            </h2>
            <p style={{
              fontSize: "clamp(0.875rem,1.4vw,0.9375rem)",
              color: "#7880A2", lineHeight: 1.85, marginBottom: 40,
            }}>
              I&rsquo;m available for the right opportunity — whether that&rsquo;s a freelance project, a full-time role, or a conversation about something you&rsquo;re building. I care about the work more than the title.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
              {[
                { label: "Email",    value: "josiah@rawsignal.dev",     href: "mailto:josiah@rawsignal.dev" },
                { label: "GitHub",   value: "github.com/Jonta254",      href: "https://github.com/Jonta254" },
                { label: "LinkedIn", value: "linkedin.com/in/josiah",   href: "https://linkedin.com/in/josiah" },
              ].map((c) => (
                <div key={c.label}>
                  <p style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                    letterSpacing: "0.18em", color: "#303450", textTransform: "uppercase", marginBottom: 6,
                  }}>{c.label}</p>
                  <a
                    href={c.href}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "clamp(0.875rem,1.4vw,0.9375rem)", color: "#8890B0", transition: "color 160ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FF8820")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8890B0")}
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#34D399", flexShrink: 0,
                boxShadow: "0 0 0 3px rgba(52,211,153,0.2), 0 0 10px rgba(52,211,153,0.5)",
                animation: "contactPulse 2s ease-in-out infinite",
              }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#34D399", letterSpacing: "0.12em" }}>
                Available for work
              </span>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal className="reveal-right">
            {sent ? (
              <div style={{
                background: "rgba(8,10,20,0.9)",
                borderRadius: 20, padding: "clamp(2rem,4vw,3rem)",
                border: "1px solid rgba(52,211,153,0.2)",
                textAlign: "center",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <svg viewBox="0 0 20 20" fill="#34D399" style={{ width: 20, height: 20 }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#F2F4FC", marginBottom: 10, letterSpacing: "0.04em" }}>
                  Message sent.
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#7880A2", lineHeight: 1.7 }}>
                  I&rsquo;ll get back to you within a couple of days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{
                  background: "rgba(8,10,20,0.9)",
                  borderRadius: 20, padding: "clamp(1.5rem,3vw,2.5rem)",
                  border: "1px solid rgba(255,255,255,0.055)",
                  display: "flex", flexDirection: "column", gap: 20,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                  <div>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "#404868", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                    <input type="text" required placeholder="Your name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "#404868", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                    <input type="email" required placeholder="you@example.com" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "#404868", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea required rows={5} placeholder="What are you building?" className="field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                  Send Message
                  <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 13, height: 13 }}>
                    <path d="M1.5 1.5l13 6.5-13 6.5V9.5l9-3-9-3V1.5z"/>
                  </svg>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <style>{`
        @media(max-width:500px){.form-row{grid-template-columns:1fr !important}}
        @keyframes contactPulse{0%,100%{box-shadow:0 0 0 3px rgba(52,211,153,0.2),0 0 10px rgba(52,211,153,0.4)}50%{box-shadow:0 0 0 6px rgba(52,211,153,0.1),0 0 20px rgba(52,211,153,0.6)}}
      `}</style>
    </>
  );
}
