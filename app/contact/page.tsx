import type { Metadata } from "next";
import { SITE, SOCIAL } from "@/content/site";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about freelance projects, full-time roles, or anything worth building. Email, GitHub, and a contact form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {/* ── Left: the pitch (static, server-rendered) ───────────── */}
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Contact</p>
          <h1 className={styles.title}>Let&rsquo;s talk.</h1>
          <p className={styles.lede}>
            Open to freelance projects, full-time roles, and the occasional
            conversation about something genuinely interesting. If you are
            building something worth building, I&rsquo;d like to hear about it.
          </p>

          <dl className={styles.direct}>
            <div className={styles.directRow}>
              <dt className={styles.directLabel}>Email</dt>
              <dd className={styles.emailValue}>
                <a className={styles.directLink} href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
                <CopyEmail value={SITE.email} />
              </dd>
            </div>
            {SOCIAL.map((s) => (
              <div key={s.href} className={styles.directRow}>
                <dt className={styles.directLabel}>{s.label}</dt>
                <dd>
                  <a
                    className={styles.directLink}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.href.replace("https://", "")}
                  </a>
                </dd>
              </div>
            ))}
            <div className={styles.directRow}>
              <dt className={styles.directLabel}>Where</dt>
              <dd className={styles.directPlain}>{SITE.availability}</dd>
            </div>
          </dl>
        </div>

        {/* ── Right: the form (client island) ─────────────────────── */}
        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
