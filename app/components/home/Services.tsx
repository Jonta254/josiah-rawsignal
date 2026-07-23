import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import styles from "./services.module.css";

/**
 * What I can be hired to do.
 *
 * Editorial rows rather than a card grid — each row carries a number, the
 * service, what it includes, and a route to something real that demonstrates
 * it. The thumbnail is a genuine product screenshot, not an illustration.
 *
 * A service with no shippable example shows no example link. That asymmetry is
 * intentional and is the honest version of a capabilities list.
 */
export default function Services() {
  return (
    <ol className={styles.list}>
      {SERVICES.map((s) => {
        const external = s.example?.href.startsWith("http");

        return (
          <li key={s.num} className={styles.row}>
            <div className={styles.head}>
              <span className={styles.num} aria-hidden="true">{s.num}</span>
              <h3 className={styles.title}>{s.title}</h3>
            </div>

            <div className={styles.body}>
              <p className={styles.text}>{s.body}</p>
              <ul className={styles.deliverables}>
                {s.deliverables.map((d) => (
                  <li key={d} className={styles.deliverable}>{d}</li>
                ))}
              </ul>
            </div>

            {s.example ? (
              <div className={styles.example}>
                <Link
                  href={s.example.href}
                  className={styles.exampleLink}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span className={styles.thumb}>
                    <Image
                      src={s.example.shot}
                      alt={s.example.alt}
                      width={480}
                      height={300}
                      sizes="220px"
                      className={styles.thumbImg}
                    />
                  </span>
                  <span className={styles.exampleMeta}>
                    <span className={styles.exampleLabel}>{s.example.label}</span>
                    <span className={styles.exampleCta}>See it</span>
                  </span>
                  {external && (
                    <span className="sr-only"> opens in a new tab</span>
                  )}
                </Link>
              </div>
            ) : (
              <div className={styles.example}>
                <p className={styles.noExample}>
                  Samples on request.
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
