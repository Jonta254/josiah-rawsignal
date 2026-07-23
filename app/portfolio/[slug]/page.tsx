import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserFrame, PhoneFrame } from "../../components/showcase/BrowserFrame";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";
import styles from "./study.module.css";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.outcome,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: { title: project.name, description: project.outcome, type: "article" },
  };
}

/** Groups the case study's decisions into a labelled, numbered block. */
function DecisionBlock({
  label,
  items,
}: {
  label: string;
  items: { step: string; detail: string }[];
}) {
  if (!items.length) return null;
  return (
    <section className={styles.block}>
      <h2 className={styles.blockLabel}>{label}</h2>
      <ol className={styles.steps}>
        {items.map((a, i) => (
          <li key={i} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>{a.step}</h3>
              <p className={styles.stepDetail}>{a.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);
  const s = project.study;
  const design = s?.decisions.filter((d) => d.kind === "Design") ?? [];
  const engineering = s?.decisions.filter((d) => d.kind === "Engineering") ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.outcome,
    url: project.url,
    ...(project.repo ? { codeRepository: project.repo } : {}),
    author: { "@type": "Person", name: SITE.fullName },
  };

  return (
    <article className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className={styles.header}>
        <Link href="/portfolio" className={styles.back}>
          <span aria-hidden="true">←</span> Work
        </Link>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.summary}>{project.summary}</p>

        <dl className={styles.facts}>
          {s && (
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Role</dt>
              <dd className={styles.factValue}>{s.role}</dd>
            </div>
          )}
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Stack</dt>
            <dd className={styles.factValue}>{project.stack.join(", ")}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Live</dt>
            <dd className={styles.factValue}>
              <a
                className={styles.factLink}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.displayUrl}
              </a>
            </dd>
          </div>
          {project.repo && (
            <div className={styles.fact}>
              <dt className={styles.factLabel}>Source</dt>
              <dd className={styles.factValue}>
                <a
                  className={styles.factLink}
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.repo.replace("https://github.com/", "")}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      {/* ── Lead image ─────────────────────────────────────────── */}
      <div className={styles.lead}>
        <div className={styles.leadMedia}>
          <BrowserFrame
            src={project.shot.desktop}
            alt={project.shot.alt}
            url={project.displayUrl}
            priority
          />
          <PhoneFrame src={project.shot.mobile} priority />
        </div>
      </div>

      {/* ── Case study body ────────────────────────────────────── */}
      {s ? (
        <div className={styles.body}>
          <section className={styles.block}>
            <h2 className={styles.blockLabel}>The problem</h2>
            <p className={styles.blockLede}>{s.problem}</p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>The objective</h2>
            <p className={styles.blockLede}>{s.objective}</p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>Research</h2>
            <p className={styles.blockLede}>{s.research}</p>
          </section>

          <DecisionBlock label="Design decisions" items={design} />
          <DecisionBlock label="Engineering decisions" items={engineering} />

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>Challenges and tradeoffs</h2>
            <p className={styles.blockLede}>{s.challenges}</p>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>The solution</h2>
            <p className={styles.blockLede}>{s.solution}</p>
            <ul className={styles.techList}>
              {project.stack.map((t) => (
                <li key={t} className={styles.tech}>{t}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <a
                className={styles.openCta}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {project.name}
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
              {project.repo && (
                <a
                  className={styles.openCtaGhost}
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the source
                </a>
              )}
            </div>
          </section>

          <section className={styles.block}>
            <h2 className={styles.blockLabel}>Results</h2>
            <p className={styles.blockLede}>{s.results}</p>
          </section>

          <section className={`${styles.block} ${styles.retro}`}>
            <h2 className={styles.blockLabel}>Lessons learned</h2>
            <p className={styles.blockLede}>{s.lessons}</p>
          </section>
        </div>
      ) : (
        <div className={styles.body}>
          <section className={styles.block}>
            <h2 className={styles.blockLabel}>About</h2>
            <p className={styles.blockLede}>{project.summary}</p>
            <ul className={styles.techList}>
              {project.stack.map((t) => (
                <li key={t} className={styles.tech}>{t}</li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <a
                className={styles.openCta}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {project.name}
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
              {project.repo && (
                <a
                  className={styles.openCtaGhost}
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the source
                </a>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── More work ──────────────────────────────────────────── */}
      <nav className={styles.more} aria-label="More work">
        <h2 className={styles.moreTitle}>More work</h2>
        <ul className={styles.moreList}>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/portfolio/${o.slug}`} className={styles.moreLink}>
                <span className={styles.moreName}>{o.name}</span>
                <span className={styles.moreOutcome}>{o.outcome}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
