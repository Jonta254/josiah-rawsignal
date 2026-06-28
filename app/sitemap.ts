import { MetadataRoute } from "next";

const BASE = "https://josiah-rawsignal.vercel.app";

const BLOG_SLUGS = [
  "wiring-panel-architecture",
  "design-second-language",
];

const PORTFOLIO_SLUGS = [
  "electrimap",
  "terrain-journal",
  "rawpanel",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const statics: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/portfolio`,     lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/now`,           lastModified: now, changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE}/contact`,       lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO_SLUGS.map((slug) => ({
    url: `${BASE}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...statics, ...blogPages, ...portfolioPages];
}
