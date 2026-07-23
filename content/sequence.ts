/**
 * The Sequence — trade → code → craft, with no calendar.
 *
 * Progression is carried by order and numbering, never by dates. See
 * docs/design-system.md §10: this removes any invitation to compute years of
 * experience, and it can never go stale.
 */

export type Chapter = {
  num: string;
  title: string;
  body: string;
};

export const SEQUENCE: Chapter[] = [
  {
    num: "01",
    title: "The trade",
    body: "Electrical work, inside walls, tracing faults by feel. A circuit either carries current or it does not. There is no persuading it, and no partial credit. That standard is the one I still work to.",
  },
  {
    num: "02",
    title: "The first tool",
    body: "The paperwork around the job was worse than the job. So I built something to fix it. That was the first time software solved a problem I had actually stood in, and I have not been interested in building anything else since.",
  },
  {
    num: "03",
    title: "The craft",
    body: "Then design, and deliberately so. Type, spacing, motion, and systems, not decoration. It is the discipline of deciding something once and applying it consistently, which is the same discipline as wiring a panel properly.",
  },
  {
    num: "04",
    title: "The work now",
    body: "Software for people who work with their hands: electricians, apprentices, anyone whose job happens away from a desk and outside of signal. Built to the standard the trade taught me.",
  },
];

/** How I work. Values stated as practice, not as adjectives. */
export const PRINCIPLES = [
  {
    title: "Precision before speed",
    body: "Do it right, then do it fast. The reverse compounds, because shortcuts in a system are interest you pay forever.",
  },
  {
    title: "Constraints are the brief",
    body: "No signal, cold hands, bright sun, a five-year-old Android. Design for the worst realistic condition and the good conditions take care of themselves.",
  },
  {
    title: "Remove until it breaks",
    body: "The last thing removed should hurt. Anything that survives that test has earned its place on the page.",
  },
  {
    title: "Show, do not claim",
    body: "Every product here is live and open to anyone. Judgement should rest on what you can open, not on what I say about it.",
  },
] as const;
