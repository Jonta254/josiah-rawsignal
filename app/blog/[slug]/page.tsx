import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/content/blog";
import { SITE } from "@/content/site";
import styles from "./post.module.css";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: SITE.fullName },
    publisher: { "@type": "Person", name: SITE.fullName },
    url: `${SITE.url}/blog/${post.slug}`,
    timeRequired: post.readingTime,
  };

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.head}>
        <Link href="/blog" className={styles.back}>
          <span aria-hidden="true">←</span> Writing
        </Link>
        <div className={styles.meta}>
          <span className={styles.topic}>{post.topic}</span>
          <span className={styles.time}>{post.readingTime}</span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.note}>{post.note}</p>
      </div>

      <div className={styles.prose}>
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {others.length > 0 && (
        <aside className={styles.related}>
          <h2 className={styles.relatedTitle}>Keep reading</h2>
          <ul className={styles.relatedList}>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/blog/${o.slug}`} className={styles.relatedLink}>
                  <span className={styles.relatedTopic}>{o.topic}</span>
                  <span className={styles.relatedName}>{o.title}</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
