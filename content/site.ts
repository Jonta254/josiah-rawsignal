/**
 * Site-wide facts and navigation.
 *
 * Single source for anything that appears in more than one place: name,
 * contact, nav, social. Changing a link here changes it everywhere.
 *
 * Nothing here carries a date, a qualification, or a claim that cannot be
 * verified by opening a link.
 */

export const SITE = {
  /** Display name used in the wordmark and headings. */
  name: "Josiah",
  /** Full name for schema.org, the CV, and off-site profiles. */
  fullName: "Brian Josiah",
  brand: "Raw Signal",
  /** Primary role. Broad enough to carry the full range of work, precise
   *  enough to stay honest: these are real capabilities, not a wish list. */
  role: "Product designer and full-stack engineer",
  /** The services offered, phrased for a search result and a share card. */
  services:
    "web and mobile apps, online stores, marketing sites, design systems, and brand identities",
  /** One line, plain, no metaphor. The signature headline. */
  positioning: "I build software for people who work with their hands.",
  /** Deliberately no city. See docs/design-system.md §11. */
  availability: "Available for remote work across timezones",
  email: "josiah@rawsignal.dev",
  url: "https://josiah-rawsignal.vercel.app",
} as const;

export const NAV = [
  { href: "/portfolio", label: "Work" },
  { href: "/about",     label: "About" },
  { href: "/blog",      label: "Writing" },
  { href: "/now",       label: "Now" },
] as const;

export const SOCIAL = [
  { href: "https://github.com/Jonta254", label: "GitHub" },
] as const;
