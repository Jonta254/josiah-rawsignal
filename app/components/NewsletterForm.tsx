"use client";
export default function NewsletterForm() {
  return (
    <form className="flex max-w-sm mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-2 text-sm rounded border outline-none"
        style={{ background: "rgba(26,18,8,0.7)", border: "1px solid rgba(184,115,51,0.3)", color: "var(--color-chalk)" }}
      />
      <button type="submit" className="btn-copper px-4 py-2 text-sm rounded">
        <span>Subscribe</span>
      </button>
    </form>
  );
}
