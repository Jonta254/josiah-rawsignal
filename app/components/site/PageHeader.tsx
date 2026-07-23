import styles from "./page-header.module.css";

/**
 * The standard top-of-page header for interior pages (Writing, Now, Contact,
 * case studies). One component so the entrance rhythm is identical everywhere
 * and no page reinvents the eyebrow/title/lede stack.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {lede && <p className={styles.lede}>{lede}</p>}
      {children}
    </header>
  );
}
