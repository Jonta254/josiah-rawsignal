/**
 * A "now" page — what has my attention at the moment.
 *
 * Deliberately not a status feed and not dated. It exists to give a returning
 * visitor a reason to come back and to show a working mind, not to log activity.
 */

export type NowGroup = {
  label: string;
  items: { title: string; note: string }[];
};

export const NOW: NowGroup[] = [
  {
    label: "Building",
    items: [
      { title: "This site", note: "Rebuilding it from first principles on a single design system." },
      { title: "ElectraCore", note: "Extending the calculator set with the tools that come up most on site." },
      { title: "A component library", note: "Carving the shared pieces out of real project work rather than a blank Figma file." },
    ],
  },
  {
    label: "Reading",
    items: [
      { title: "Shop Class as Soulcraft", note: "Matthew Crawford. On the value of work you can see the result of." },
      { title: "The Design of Everyday Things", note: "Norman. Still the clearest thinking on why things frustrate us." },
      { title: "Thinking in Systems", note: "Donella Meadows. Loops, delays, and leverage points." },
    ],
  },
  {
    label: "Learning",
    items: [
      { title: "Rust", note: "Slowly, and with the humility it demands." },
      { title: "Motor control", note: "Variable-frequency drives and field-oriented control." },
      { title: "Composition", note: "Deliberate framing, not just pointing the lens." },
    ],
  },
  {
    label: "Thinking about",
    items: [
      { title: "Generalists in specialist worlds", note: "The case for breadth is stronger than most will admit." },
      { title: "Physical vs digital making", note: "Why they need each other, and always have." },
      { title: "Durability as a design principle", note: "What gets built to last, and exactly why." },
    ],
  },
];
