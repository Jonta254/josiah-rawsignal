import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:    "Raw Signal <onboarding@resend.dev>",
      to:      process.env.CONTACT_EMAIL,
      subject: `New subscriber: ${escHtml(email)}`,
      html: `
        <div style="font-family:monospace;max-width:480px;margin:0 auto;padding:28px;background:#0A0A12;color:#C8D4EE;border:1px solid rgba(176,64,255,0.15);border-radius:6px;">
          <h2 style="color:#B040FF;letter-spacing:0.15em;font-size:13px;text-transform:uppercase;margin:0 0 20px;">
            Raw Signal — New Subscriber
          </h2>
          <p style="margin:0;font-size:15px;">${escHtml(email)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed. Please try again." }, { status: 500 });
  }
}
