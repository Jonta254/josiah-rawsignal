import Link from "next/link";
import type { Metadata } from "next";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "This page doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>No signal here.</h1>
      <p className={styles.body}>
        The page you&rsquo;re looking for doesn&rsquo;t exist, or it moved
        without leaving a wire behind.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primary}>
          Back home
        </Link>
        <Link href="/portfolio" className={styles.secondary}>
          See the work
        </Link>
      </div>
    </div>
  );
}
