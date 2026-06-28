import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://josiah-rawsignal.vercel.app/sitemap.xml",
    host: "https://josiah-rawsignal.vercel.app",
  };
}
