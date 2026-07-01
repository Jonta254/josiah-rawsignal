import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_NAME    = 120;
const MAX_EMAIL   = 254;
const MAX_MESSAGE = 4000;
const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitise(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name    = sanitise(body.name,    MAX_NAME);
    const email   = sanitise(body.email,   MAX_EMAIL);
    const message = sanitise(body.message, MAX_MESSAGE);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Message is too short." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      console.log("[contact] env not set — message not sent.", { name, email });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from:    "Raw Signal Contact <onboarding@resend.dev>",
      to:      process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${escHtml(name)}`,
      html: `
        <div style="font-family:monospace;max-width:560px;margin:0 auto;padding:32px;background:#0A0A12;color:#C8D4EE;border:1px solid rgba(0,223,255,0.15);border-radius:6px;">
          <h2 style="color:#00DFFF;letter-spacing:0.15em;font-size:13px;text-transform:uppercase;margin:0 0 24px;">
            Raw Signal — New Contact
          </h2>
          <p style="margin:0 0 6px;font-size:11px;color:#7880A2;letter-spacing:0.12em;text-transform:uppercase;">FROM</p>
          <p style="margin:0 0 24px;font-size:15px;">${escHtml(name)} &lt;${escHtml(email)}&gt;</p>
          <p style="margin:0 0 6px;font-size:11px;color:#7880A2;letter-spacing:0.12em;text-transform:uppercase;">MESSAGE</p>
          <p style="margin:0;font-size:14px;line-height:1.75;white-space:pre-wrap;color:#C8D4EE;">${escHtml(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
