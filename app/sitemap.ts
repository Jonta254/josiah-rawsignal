import { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PROJECTS } from "@/content/projects";
import { POSTS } from "@/content/blog";

/* Derived from the real content, not a hand-maintained list — so it can never
   drift out of sync with the pages that actually exist (the previous version
   listed three portfolio slugs that had no page). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date().toISOString();

  const statics: MetadataRoute.Sitemap = (
    [
      { url: base, changeFrequency: "weekly", priority: 1.0 },
      { url: `${base}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${base}/about`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/now`, changeFrequency: "weekly", priority: 0.6 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    ] as const
  ).map((e) => ({ ...e, lastModified: now }));

  const projects: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...statics, ...projects, ...posts];
}
