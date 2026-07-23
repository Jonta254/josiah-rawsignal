/**
 * Writing. Content as data — the pages carry no prose of their own.
 *
 * No dates: posts are ordered by array position, newest first, and carry a
 * reading time rather than a publish date (docs/design-system.md §10).
 */

export type Post = {
  slug: string;
  title: string;
  /** One-line standfirst, used in the index and metadata. */
  excerpt: string;
  topic: string;
  readingTime: string;
  /** A short first-person note on why the piece exists. */
  note: string;
  /** Paragraphs. Plain strings — no markup in the data. */
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "wiring-panel-architecture",
    title: "What wiring a panel taught me about architecture",
    excerpt:
      "Every circuit is a module and every breaker is a boundary. The mental model transfers more than you would think, and it moves in both directions.",
    topic: "Craft",
    readingTime: "7 min",
    note: "I wrote this after spending three hours retracing a fault in a distribution board that looked exactly like a circular dependency.",
    body: [
      "There is a moment you will recognise if you have worked with complex systems of any kind. You stare at something and realise you are not looking at one problem but at a record of every decision ever made about it. A breaker panel does this to me. So does a legacy codebase.",
      "Both are accumulations of intent. The person who wired this panel had reasons. The developer who structured this module had reasons. The question, the same question in both cases, is whether those reasons are still visible, still legible, still right.",
      "In electrical work we call a bad installation a rat's nest: a tangle of wire with no discernible logic, where things work but nobody can tell you why, and nobody is sure what will happen if you change one thing. Software engineers call this technical debt. The name changes. The texture of the frustration does not.",
      "What the trade taught me is this: the quality of an installation is measured not by whether it works on the day it is finished, but by whether someone can understand it, maintain it, and extend it safely later. Every wire labelled. Every circuit protected. Every join accessible.",
      "Good architecture, whether in code, in buildings, or in electrical systems, is an act of communication with the future. You are writing a message to someone you will never meet who will need to trust your work. That shifts how you think about the shortcuts.",
      "When I started coding seriously, I found I already understood separation of concerns. I had just been calling them circuits. I understood fault isolation; I had been calling it a fuse. I understood the difference between a patch and a repair.",
      "The deeper lesson is about respect for the system. A good electrician never assumes. They test. They verify. They document. They leave the installation better than they found it. That is not a skill. That is a disposition, and it is the most transferable thing I own.",
    ],
  },
  {
    slug: "design-second-language",
    title: "Design as a second language",
    excerpt:
      "Learning to design after years of writing code was like learning to speak after years of only reading. The grammar was already there. Fluency took practice.",
    topic: "Design",
    readingTime: "5 min",
    note: "I wrote this after re-reading my first Figma file. I have archived it for everyone's protection.",
    body: [
      "When you learn a language as an adult there is a specific frustration that children are spared: you know what you want to say, but you do not have the words. You have the thought fully formed, and it dissolves at the point of articulation.",
      "That is exactly what learning design felt like coming from code. I could look at a good interface and understand it, intellectually and structurally. I could feel what was working. I just could not make it myself. The gap between what I could perceive and what I could produce was humbling.",
      "The breakthrough came when I stopped trying to learn design and started trying to learn to see. The design came after. First I had to understand why things looked the way they looked. Why that particular grey felt off. Why that button placement felt wrong. Why that much whitespace felt generous rather than empty.",
      "Code taught me that systems have logic. They follow rules, and the rules are discoverable. Design has the same quality. The rules are less explicit but equally real. Once you start to feel them, you start to use them. And then you start to break them on purpose.",
      "The thing that made it click: an electrical schematic is one of the most carefully designed objects in the world. Not beautiful in the conventional sense, but every line, every symbol, every annotation is there for a reason. Nothing is arbitrary. Every convention serves legibility. That is design.",
      "I was already a designer. I just had not known what to call it.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
