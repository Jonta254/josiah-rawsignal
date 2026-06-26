"use client";
import { useState } from "react";
import type { Metadata } from "next";
import CopperWire from "../components/CopperWire";
import Reveal from "../components/RevealWrapper";

const SUBJECTS = [
  "General",
  "Project Inquiry",
  "Collaboration",
  "Just Saying Hi",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-32 pb-24 relative min-h-screen" style={{ background: "var(--color-void)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <CopperWire viewBox="0 0 1440 800" d="M0,400 Q360,150 720,400 Q1080,650 1440,400" className="h-full opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="reveal mb-16">
            <p className="font-mono text-xs mb-2" style={{ color: "var(--color-copper)" }}>// Get in touch</p>
            <h1 className="font-bebas leading-none" style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "var(--color-chalk)" }}>
              LET&apos;S CONNECT
            </h1>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Left — info */}
            <Reveal className="reveal-left">
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-stone)" }}>
                I&apos;m genuinely interested in conversations about building things — physical or digital — and the thinking behind them. If you have a project in mind, a collaboration idea, or you just want to trade notes, reach out.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Response time", value: "Usually within 48 hours" },
                  { label: "Availability", value: "Open to freelance & consulting" },
                  { label: "Email", value: "josiah@rawsignal.dev" },
                  { label: "Location", value: "Remote · Anywhere" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-6">
                    <span className="font-mono text-xs w-32 shrink-0" style={{ color: "var(--color-copper)" }}>{item.label}</span>
                    <span className="text-sm" style={{ color: "var(--color-chalk)" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="font-mono text-xs px-3 py-2 border rounded transition-all hover:rotate-[15deg] hover:border-copper"
                    style={{ borderColor: "rgba(184,115,51,0.3)", color: "var(--color-stone)" }}
                  >
                    {s}
                  </a>
                ))}
              </div>

              {/* Photo */}
              <div
                className="mt-10 relative h-64 rounded overflow-hidden"
                style={{ border: "1px solid rgba(184,115,51,0.2)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,11,7,0.7)" }}>
                  <p className="font-caveat text-2xl" style={{ color: "var(--color-copper)" }}>
                    &ldquo;Say hello.&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal className="reveal-right">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(74,124,89,0.2)", border: "1px solid var(--color-moss)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" className="w-8 h-8">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-bebas text-3xl mb-2" style={{ color: "var(--color-chalk)" }}>Message sent.</h3>
                  <p className="text-sm" style={{ color: "var(--color-stone)" }}>I&apos;ll be in touch within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: "name",    label: "Name",    type: "text",  placeholder: "Your name" },
                    { id: "email",   label: "Email",   type: "email", placeholder: "your@email.com" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="font-mono text-xs block mb-2" style={{ color: "var(--color-copper)" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded border outline-none transition-colors"
                        style={{
                          background: "rgba(26,18,8,0.6)",
                          border: errors[f.id] ? "1px solid var(--color-ember)" : "1px solid rgba(184,115,51,0.3)",
                          color: "var(--color-chalk)",
                        }}
                      />
                      {errors[f.id] && <p className="font-mono text-xs mt-1" style={{ color: "var(--color-ember)" }}>{errors[f.id]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="font-mono text-xs block mb-2" style={{ color: "var(--color-copper)" }}>Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded border outline-none"
                      style={{
                        background: "rgba(26,18,8,0.6)",
                        border: "1px solid rgba(184,115,51,0.3)",
                        color: "var(--color-chalk)",
                      }}
                    >
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-xs block mb-2" style={{ color: "var(--color-copper)" }}>Message</label>
                    <textarea
                      rows={6}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded border outline-none resize-none"
                      style={{
                        background: "rgba(26,18,8,0.6)",
                        border: errors.message ? "1px solid var(--color-ember)" : "1px solid rgba(184,115,51,0.3)",
                        color: "var(--color-chalk)",
                      }}
                    />
                    {errors.message && <p className="font-mono text-xs mt-1" style={{ color: "var(--color-ember)" }}>{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-copper w-full py-4 text-sm font-medium tracking-wide rounded">
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
