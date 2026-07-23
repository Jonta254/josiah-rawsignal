import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/site/PageHeader";
import { POSTS } from "@/content/blog";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on the overlap between the electrical trade and building software: architecture, design, and the discipline both demand.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the overlap."
        lede="A few pieces on what the trade taught me about software, and what software taught me back."
      />

      <ol className={styles.list}>
        {POSTS.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className={styles.item}>
              <div className={styles.meta}>
                <span className={styles.topic}>{post.topic}</span>
                <span className={styles.time}>{post.readingTime}</span>
              </div>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <span className={styles.cta}>
                Read
                <span className={styles.arrow} aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
