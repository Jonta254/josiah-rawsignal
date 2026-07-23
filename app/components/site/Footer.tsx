import Link from "next/link";
import { NAV, SITE, SOCIAL } from "@/content/site";
import styles from "./footer.module.css";

/**
 * Server component — no client JavaScript.
 *
 * Every exit is a designed exit: the footer's job is to make the next action
 * obvious, not to hold a sitemap. Only meaningful navigation, one contact
 * method, and real professional links. No copyright year, per the no-dates
 * rule (docs/design-system.md §10).
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.prompt}>
          <p className={styles.kicker}>Open to work and collaboration</p>
          <h2 className={styles.headline}>
            Have something that needs building properly?
          </h2>
          <a className={styles.email} href={`mailto:${SITE.email}`}>
            {SITE.email}
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>

        <nav className={styles.columns} aria-label="Footer">
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Site</h3>
            <ul className={styles.list}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link className={styles.link} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={styles.link} href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Elsewhere</h3>
            <ul className={styles.list}>
              {SOCIAL.map((item) => (
                <li key={item.href}>
                  <a
                    className={styles.link}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                    <span className="sr-only"> opens in a new tab</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className={styles.base}>
        <span className={styles.wordmark}>
          {SITE.fullName}{" "}
          <span className={styles.brand}>{SITE.brand}</span>
        </span>
        <span className={styles.availability}>{SITE.availability}</span>
      </div>
    </footer>
  );
}
