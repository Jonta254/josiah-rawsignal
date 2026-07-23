"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./contact.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The only interactive part of the contact page. Isolated as a client island
 * so the surrounding intro and contact details stay server-rendered: less
 * client JavaScript, and the page keeps real metadata.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const nameId = useId();
  const emailId = useId();
  const msgId = useId();
  const errId = useId();

  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // Move focus to the new content when the view changes, so a keyboard user is
  // not stranded on a control that no longer exists (WCAG 2.4.3).
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.success} role="status" ref={successRef} tabIndex={-1}>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h2 className={styles.successTitle}>Message sent.</h2>
        <p className={styles.successBody}>
          Thanks for that. I&rsquo;ll get back to you personally, usually within
          a day or two.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={nameId}>Name</label>
        <input
          id={nameId}
          className={styles.input}
          type="text"
          value={form.name}
          onChange={set("name")}
          required
          autoComplete="name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          className={styles.input}
          type="email"
          value={form.email}
          onChange={set("email")}
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={msgId}>Message</label>
        <textarea
          id={msgId}
          className={`${styles.input} ${styles.textarea}`}
          value={form.message}
          onChange={set("message")}
          required
          rows={6}
          aria-describedby={status === "error" ? errId : undefined}
        />
      </div>

      {status === "error" && (
        <p id={errId} className={styles.error} role="alert" ref={errorRef} tabIndex={-1}>
          {error}
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && (
          <span className={styles.arrow} aria-hidden="true">→</span>
        )}
      </button>
    </form>
  );
}
