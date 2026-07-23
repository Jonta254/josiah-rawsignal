"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/content/site";
import styles from "./nav.module.css";

/**
 * Sticky, minimal, keyboard-first.
 *
 * The only client state is a boolean for whether the page has scrolled — used
 * to bring in a hairline border and a backdrop once the header stops sitting
 * on empty space. Everything else is CSS.
 *
 * Deliberately no mobile drawer: four links fit on one row at 360px, and a
 * hamburger would add a focus trap, an overlay, and a state machine to solve
 * a problem this site does not have.
 */
export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // A sentinel + IntersectionObserver rather than a scroll listener: no
    // work on the main thread per frame, and nothing to throttle.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
    document.body.prepend(sentinel);

    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    io.observe(sentinel);

    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.inner} aria-label="Primary">
        <Link href="/" className={styles.brand}>
          <span className={styles.brandName}>{SITE.name}</span>
          <span className={styles.brandMark}>{SITE.brand}</span>
        </Link>

        <ul className={styles.links}>
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className={styles.cta}>
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
