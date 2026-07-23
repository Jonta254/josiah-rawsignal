import Link from "next/link";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";
import styles from "./hero.module.css";

/**
 * The hero. Server-rendered text, with no canvas, orb, or boot sequence.
 *
 * The memorability comes from the claim itself rather than an effect. Almost
 * nobody else can honestly say they came to software from inside a wall. The
 * one visual gesture is a hairline underline that ties the sentence together,
 * drawn in CSS.
 *
 * Nothing here animates before first paint, and nothing blocks the content.
 * A hiring manager's first five seconds are the most expensive on the site.
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.kicker}>{SITE.availability}</p>

      <h1 className={styles.headline}>
        I build software for people who
        <br className={styles.br} />
        <span className={styles.emphasis}> work with their hands</span>.
      </h1>

      <p className={styles.lede}>
        {SITE.role}. I design and build web and mobile apps, online stores, and
        the marketing and brand around them. I came to this from the electrical
        trade, where I learned the only standard that matters. It works, or it
        does not.
      </p>

      <div className={styles.actions}>
        <Link href="/portfolio" className={styles.primary}>
          See the work
          <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
        <Link href="/about" className={styles.secondary}>
          How I work
        </Link>
      </div>

      {/* Proof, above the fold. The claim above is a sentence. This is the
          evidence: five products a visitor can open before scrolling once. */}
      <div className={styles.proof}>
        <span className={styles.proofLabel}>In production</span>
        <ul className={styles.proofList}>
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <a
                className={styles.proofLink}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.name}
                <span className="sr-only"> opens in a new tab</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
