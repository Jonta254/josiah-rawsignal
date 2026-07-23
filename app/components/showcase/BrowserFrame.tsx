import Image from "next/image";
import styles from "./showcase.module.css";

/**
 * Presents a real screenshot inside minimal browser chrome.
 *
 * Flat by design — one border, one radius, no gloss, no perspective, no 3D
 * tilt. The frame's job is to say "this is a running product", then get out of
 * the way. The screenshot is the marketing; the chrome is punctuation.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i /><i /><i />
        </span>
        {/* Decorative: the real, focusable link lives on the card itself. */}
        <span className={styles.chromeUrl} aria-hidden="true">
          {url}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 760px"
        priority={priority}
        className={styles.shot}
      />
    </div>
  );
}

/**
 * The mobile capture, overlapped against the desktop frame.
 *
 * Purely presentational — it repeats what the desktop shot already shows, so
 * it is hidden from assistive tech rather than announced twice.
 */
export function PhoneFrame({ src, priority = false }: { src: string; priority?: boolean }) {
  return (
    <div className={styles.phone} aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={390}
        height={844}
        sizes="180px"
        priority={priority}
        className={styles.phoneShot}
      />
    </div>
  );
}
