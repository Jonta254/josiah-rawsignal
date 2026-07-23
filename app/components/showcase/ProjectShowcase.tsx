import Link from "next/link";
import type { Project } from "@/content/projects";
import { FLAGSHIPS, SUPPORTING } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "./BrowserFrame";
import styles from "./showcase.module.css";

/**
 * The showcase. Server-rendered, with no client JavaScript for any of it.
 *
 * Flagships get a wide, alternating two-column treatment with the mobile
 * capture overlapped, and lead into a full case study. Supporting work sits in
 * a compact grid with a lighter project page. Unequal work gets unequal
 * weight, which is the whole point.
 *
 * Each card carries three distinct links: the project name and the primary CTA
 * go to the internal case study; the live URL opens the running product. They
 * are separate targets, never nested, so keyboard and screen-reader order stays
 * clean.
 */

function LiveLink({ project }: { project: Project }) {
  return (
    <a
      className={styles.live}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.liveDot} aria-hidden="true" />
      <span>{project.displayUrl}</span>
      <span className="sr-only"> opens {project.name} in a new tab</span>
    </a>
  );
}

export function FlagshipCard({ project, priority }: { project: Project; priority: boolean }) {
  const href = `/portfolio/${project.slug}`;
  return (
    <article className={`${styles.card} ${styles.flagship}`}>
      <div className={styles.body}>
        <p className={styles.kicker}>Case study</p>
        <h3 className={styles.name}>
          <Link href={href} className={styles.nameLink}>
            {project.name}
          </Link>
        </h3>
        <p className={styles.outcome}>{project.outcome}</p>
        <ul className={styles.stack}>
          {project.stack.map((s) => (
            <li key={s} className={styles.tag}>{s}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link href={href} className={styles.readCta}>
            Read the case study
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <LiveLink project={project} />
        </div>
      </div>

      <div className={styles.media}>
        <BrowserFrame
          src={project.shot.desktop}
          alt={project.shot.alt}
          url={project.displayUrl}
          priority={priority}
        />
        <PhoneFrame src={project.shot.mobile} priority={priority} />
      </div>
    </article>
  );
}

function SupportingCard({ project }: { project: Project }) {
  const href = `/portfolio/${project.slug}`;
  return (
    <article className={`${styles.card} ${styles.supporting}`}>
      <div className={styles.mediaBlock}>
        <BrowserFrame
          src={project.shot.desktop}
          alt={project.shot.alt}
          url={project.displayUrl}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={href} className={styles.nameLink}>
            {project.name}
          </Link>
        </h3>
        <p className={styles.outcome}>{project.outcome}</p>
        <div className={styles.actions}>
          <Link href={href} className={styles.readCtaSmall}>
            View project
            <span className={styles.arrow} aria-hidden="true">→</span>
          </Link>
          <LiveLink project={project} />
        </div>
      </div>
    </article>
  );
}

export function SupportingGrid({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((p) => (
        <SupportingCard key={p.slug} project={p} />
      ))}
    </div>
  );
}

export function ProjectShowcase() {
  return (
    <>
      <div className={styles.flagshipStack}>
        {FLAGSHIPS.map((p, i) => (
          <FlagshipCard key={p.slug} project={p} priority={i === 0} />
        ))}
      </div>

      <div className={styles.stackGap}>
        <SupportingGrid projects={SUPPORTING} />
      </div>
    </>
  );
}
