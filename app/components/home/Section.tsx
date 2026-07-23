import styles from "./section.module.css";

/**
 * The page's structural unit. Every homepage and About section uses it, which
 * is what makes the vertical rhythm consistent without anyone having to
 * remember the numbers.
 *
 * `eyebrow` is optional and numbered — it gives a long page a spine the eye
 * can follow while scanning, which is the magazine behaviour we want rather
 * than a stack of undifferentiated cards.
 */
export default function Section({
  eyebrow,
  title,
  lede,
  children,
  wide = false,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className={styles.section}>
      <hr className="rule" />
      <div className={`${styles.inner} ${wide ? styles.wide : ""}`}>
        {(eyebrow || title || lede) && (
          <header className={styles.header}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {lede && <p className={styles.lede}>{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
