import type { Metadata } from "next";
import Link from "next/link";
import Section from "../components/home/Section";
import { SEQUENCE } from "@/content/sequence";
import { SITE } from "@/content/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "How I got from electrical work to building software, and the standard I carried across. No credentials claimed. The work is open, so judge that instead.",
  alternates: { canonical: "/about" },
};

/**
 * About. Server component, no client JavaScript.
 *
 * Written to avoid the two failure modes of portfolio biographies: the
 * inflated claim ("passionate about crafting delightful experiences") and the
 * CV recital. What's left is a short, specific, checkable story — plus an
 * honest statement of what is *not* being claimed, which is unusual enough to
 * function as a credibility signal in its own right.
 *
 * No dates anywhere. Progression is carried by the Sequence's numbering.
 */
export default function AboutPage() {
  return (
    <>
      <header className={styles.hero}>
        <p className={styles.kicker}>About</p>
        <h1 className={styles.headline}>
          I learned to build things that <em>have to work</em>.
        </h1>
        <p className={styles.lede}>
          Most of what I know about software I learned somewhere else first, in
          walls and ceiling cavities, on jobs where a mistake is not a bug
          report. That background is the whole reason my work looks the way it
          does.
        </p>
      </header>

      <Section eyebrow="The sequence" title="How the work got here.">
        <ol className={styles.sequence}>
          {SEQUENCE.map((c) => (
            <li key={c.num} className={styles.chapter}>
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.num}>{c.num}</span>
                <span className={styles.node} />
              </div>
              <div className={styles.chapterBody}>
                <h3 className={styles.chapterTitle}>{c.title}</h3>
                <p className={styles.chapterText}>{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Standard" title="The work is the evidence.">
        <div className={styles.plain}>
          <p>
            Five products are live and open to anyone. This site is built to the
            same standard: fast, keyboard-operable, and legible on the cheapest
            phone in the room.
          </p>
          <p>Both are there to be tested rather than taken on trust.</p>
        </div>
      </Section>

      <Section eyebrow="Working together" title="Where I am most useful.">
        <div className={styles.plain}>
          <p>
            Projects with an awkward real constraint: no connection, bad light,
            gloves on, an old device, a user mid-task who cannot stop to read.
            I build for the failure case first.
          </p>
          <p>
            I work best where design and engineering are one conversation. I
            decide type, spacing and motion once, then apply them everywhere.
          </p>
          <p className={styles.close}>
            {SITE.availability}. If that fits something you are working on,{" "}
            <Link className={styles.inline} href="/contact">
              say hello
            </Link>{" "}
            or read{" "}
            <Link className={styles.inline} href="/portfolio">
              the work
            </Link>{" "}
            first.
          </p>
        </div>
      </Section>
    </>
  );
}
