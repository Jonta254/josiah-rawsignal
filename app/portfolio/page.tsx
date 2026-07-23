import type { Metadata } from "next";
import { ProjectShowcase } from "../components/showcase/ProjectShowcase";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live products built for people who work with their hands: electrical tools, trade logbooks, and offline-first field apps. Every one is running, and open to anyone.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Work</h1>
        <p className={styles.lede}>
          Five products, all live. Every link below opens the real thing. No
          mockups, and no screenshots of something that was never finished.
          Open them and judge for yourself.
        </p>
      </header>

      <ProjectShowcase />
    </div>
  );
}
