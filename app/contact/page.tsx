"use client";
import { useState } from "react";
import Reveal from "../components/RevealWrapper";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <>
      <section style={{ minHeight: "50vh", display: "flex", alignItems: "flex-end", background: "var(--void)", padding: "clamp(6rem,12vw,9rem) clamp(1.25rem,4vw,2rem) clamp(3rem,6vw,5rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Reveal className="reveal">
            <div className="section-tag">Contact</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem,10vw,9rem)", lineHeight: 0.9, color: "var(--chalk)" }}>
              LET&apos;S<br /><span className="text-copper">TALK.</span>
            </h1>
          </Reveal>
          <Reveal className="reveal" delay={100}>
            <p style={{ fontSize: "clamp(1rem,1.8vw,1.1rem)", lineHeight: 1.75, color: "var(--stone)", maxWidth: 520, marginTop: 24 }}>
              Open to freelance projects, full-time roles, and the occasional interesting conversation. If you&rsquo;re building something honest, I want to hear about it.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--earth)", padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,4vw,2rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }} className="contact-grid">
          {/* Left info */}
          <Reveal className="reveal-left">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(1.5rem,3vw,2.25rem)", color: "var(--chalk)", marginBottom: 24, lineHeight: 1.4 }}>
              Think alongside me.
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--stone)", lineHeight: 1.75, marginBottom: 40 }}>
              I&rsquo;m available for the right opportunity — whether that&rsquo;s a freelance project, a full-time role, or a conversation about something you&rsquo;re building. I care about the work more than the title.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Email", value: "josiah@rawsignal.dev", href: "mailto:josiah@rawsignal.dev" },
                { label: "GitHub", value: "github.com/josiah", href: "https://github.com/josiah" },
                { label: "LinkedIn", value: "linkedin.com/in/josiah", href: "https://linkedin.com/in/josiah" },
              ].map((c) => (
                <div key={c.label}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--mist)", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</p>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.9375rem", color: "var(--chalk)", transition: "color 160ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--copper)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--chalk)")}
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 10 }}>
              <div className="signal-dot" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--emerald)" }}>Available for work</span>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="reveal-right">
            {sent ? (
              <div style={{ background: "var(--carbon)", borderRadius: 20, padding: "clamp(2rem,4vw,3rem)", border: "1px solid rgba(52,211,153,0.2)", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg viewBox="0 0 20 20" fill="var(--emerald)" style={{ width: 20, height: 20 }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.75rem", color: "var(--chalk)", marginBottom: 8 }}>Message sent.</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--stone)" }}>I&rsquo;ll get back to you within a couple of days.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ background: "var(--carbon)", borderRadius: 20, padding: "clamp(1.5rem,3vw,2.5rem)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                  <div>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--mist)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                    <input type="text" required placeholder="Josiah" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--mist)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                    <input type="email" required placeholder="you@example.com" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--mist)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
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
      <style>{`@media(max-width:500px){.form-row{grid-template-columns:1fr !important}}`}</style>
    </>
  );
}
