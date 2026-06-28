import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      // Dev/preview: log and pretend it worked
      console.log("[contact] RESEND_API_KEY or CONTACT_EMAIL not set — message not sent.", { name, email });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Raw Signal Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:monospace;max-width:560px;margin:0 auto;padding:32px;background:#0A0A12;color:#C8D4EE;border:1px solid rgba(0,223,255,0.15);border-radius:6px;">
          <h2 style="color:#00DFFF;letter-spacing:0.15em;font-size:13px;text-transform:uppercase;margin:0 0 24px;">Raw Signal — New Contact</h2>
          <p style="margin:0 0 8px;font-size:13px;color:#7880A2;">FROM</p>
          <p style="margin:0 0 24px;font-size:16px;">${name} &lt;${email}&gt;</p>
          <p style="margin:0 0 8px;font-size:13px;color:#7880A2;">MESSAGE</p>
          <p style="margin:0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
