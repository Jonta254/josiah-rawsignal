"use client";

import { useState } from "react";
import styles from "./contact.module.css";

/**
 * Copies text, preferring the async Clipboard API and falling back to the
 * legacy selection method where it is unavailable (insecure context, older
 * browser, or a Clipboard API that rejects). Returns whether the copy landed.
 */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * A copy-to-clipboard affordance for the email address.
 *
 * mailto links do nothing on a machine with no mail client configured, which
 * is common on desktops. Copying the address is the reliable fallback. The
 * plain, visible address and the mailto link both remain, so nothing is lost
 * if the clipboard API is unavailable.
 */
export default function CopyEmail({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const ok = await writeToClipboard(value);
    // Only confirm on genuine success. If both paths fail (a rare, locked-down
    // context), the button stays silent and the still-visible address and the
    // mailto link remain as fallbacks, so the user is never stuck.
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.copyBtn}
        onClick={copy}
        data-copied={copied || undefined}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
