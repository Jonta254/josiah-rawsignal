import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import { NOW } from "@/content/now";
import styles from "./now.module.css";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What has my attention at the moment: what I am building, reading, learning, and thinking about.",
  alternates: { canonical: "/now" },
};

export default function NowPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Now"
        title="What has my attention."
        lede="Not a status feed, just a snapshot of where the focus sits right now. Borrowed, with thanks, from Derek Sivers."
      />

      <div className={styles.grid}>
        {NOW.map((group) => (
          <section key={group.label} className={styles.group}>
            <h2 className={styles.groupLabel}>{group.label}</h2>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item.title} className={styles.item}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemNote}>{item.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={styles.foot}>
        <Link href="/portfolio" className={styles.footLink}>
          See the work
          <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
