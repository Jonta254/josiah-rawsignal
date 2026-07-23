import Link from "next/link";
import Hero from "./components/home/Hero";
import Section from "./components/home/Section";
import Services from "./components/home/Services";
import { FlagshipCard, SupportingGrid } from "./components/showcase/ProjectShowcase";
import { FLAGSHIPS, SUPPORTING, PROJECTS } from "@/content/projects";
import { PRINCIPLES } from "@/content/sequence";
import { SITE, SOCIAL } from "@/content/site";
import styles from "./home.module.css";

/* Person + WebSite structured data. Drives the name-search result and the
   knowledge panel (docs/design-system.md §15). Only verifiable facts —
   the same discipline as the visible copy. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: SITE.fullName,
      alternateName: SITE.name,
      url: SITE.url,
      email: `mailto:${SITE.email}`,
      jobTitle: "Frontend engineer and product designer",
      description: SITE.positioning,
      sameAs: SOCIAL.map((s) => s.href),
      knowsAbout: ["Frontend engineering", "Product design", "Offline-first applications", "Design systems"],
      makesOffer: PROJECTS.map((p) => ({
        "@type": "CreativeWork",
        name: p.name,
        url: p.url,
      })),
    },
    {
      "@type": "WebSite",
      name: `${SITE.name} ${SITE.brand}`,
      url: SITE.url,
    },
  ],
};

/**
 * Homepage. A server component end to end — zero client JavaScript ships for
 * anything on this page except the nav's scroll sentinel.
 *
 * Order is the argument:
 *   hero       → what he does, in one sentence
 *   work       → proof, immediately, before any claim about himself
 *   principles → how he works, once the work has earned the attention
 *   craft      → what he can be hired for
 *
 * Proof precedes personality deliberately. A visitor deciding whether to keep
 * reading wants evidence first; the biography only becomes interesting after
 * they have decided the work is good.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />

      <Section
        eyebrow="Selected work"
        title="Products in production."
        lede="Five applications across trade tools, safety, and learning. Each link opens the running product."
        wide
      >
        <div className={styles.flagships}>
          {FLAGSHIPS.map((p, i) => (
            <FlagshipCard key={p.slug} project={p} priority={i === 0} />
          ))}
        </div>

        <div className={styles.supporting}>
          <SupportingGrid projects={SUPPORTING} />
        </div>

        <Link href="/portfolio" className={styles.more}>
          All work
          <span className={styles.arrow} aria-hidden="true">→</span>
        </Link>
      </Section>

      <Section eyebrow="How I work" title="Four rules, learned the expensive way.">
        <ul className={styles.principles}>
          {PRINCIPLES.map((p) => (
            <li key={p.title} className={styles.principle}>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleBody}>{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Services"
        title="What I can be hired to do."
        lede="Six areas, one standard. Each links to a build you can open."
        wide
      >
        <Services />
      </Section>
    </>
  );
}
