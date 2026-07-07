"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setError("");
    try {
      const res  = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed. Try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--emerald)", letterSpacing: "0.08em", textAlign: "center" }}>
        ✓ Noted. I will write when I have something worth saying.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: 380, margin: "0 auto", gap: 10, flexWrap: "wrap" }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={sending}
        style={{
          flex: 1, minWidth: 0, padding: "0.625rem 1rem", fontSize: "0.875rem",
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, color: "var(--chalk)", outline: "none",
          transition: "border-color 180ms",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(176,64,255,0.5)")}
        onBlur={(e)  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      />
      <button
        type="submit"
        disabled={sending}
        className="btn btn-primary"
        style={{ opacity: sending ? 0.65 : 1, fontSize: "0.8rem", padding: "0.625rem 1.2rem", flexShrink: 0 }}
      >
        {sending ? "…" : "Subscribe"}
      </button>
      {error && (
        <p style={{ width: "100%", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "#FF6060", margin: 0 }}>
          {error}
        </p>
      )}
    </form>
  );
}
