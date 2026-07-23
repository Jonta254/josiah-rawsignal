/**
 * The portfolio's evidence base.
 *
 * Every `url` here returned HTTP 200 when verified against the live deployment
 * and cross-checked against the Vercel account. Nothing in this file is
 * aspirational, and nothing carries a date.
 *
 * Copy is drawn from each product's own description — not invented.
 * See docs/design-system.md §1 for the verification record.
 */

/** One decision, tagged so the case study can group design and engineering. */
export type Decision = {
  kind: "Design" | "Engineering";
  step: string;
  detail: string;
};

/**
 * A full case study for a flagship project.
 *
 * Every field is written to be truthful. "Research" means genuine observation
 * and lived trade experience, never invented user studies. "Results" carries
 * only what a visitor can verify by opening the link: no metrics, no adoption
 * numbers, nothing that cannot be checked.
 */
export type CaseStudy = {
  /** One-line role. No dates, no duration. */
  role: string;
  /** The problem, stated plainly. */
  problem: string;
  /** What a good outcome had to achieve. */
  objective: string;
  /** How the problem was understood before building. Observation, not fiction. */
  research: string;
  /** Design and engineering decisions, grouped by kind in the render. */
  decisions: Decision[];
  /** The honest constraints and what was traded for what. */
  challenges: string;
  /** What shipped and what it does. One click from proof. */
  solution: string;
  /** Only verifiable results. If it cannot be checked, it is not here. */
  results: string;
  /** The retrospective. The highest-trust section on the page. */
  lessons: string;
};

export type Project = {
  slug: string;
  name: string;
  /** What it does, for whom. Never a stack list. */
  outcome: string;
  /** Longer positioning, used on the project page. */
  summary: string;
  url: string;
  /** Shown next to the link — the domain, not the scheme. */
  displayUrl: string;
  /** Public source. Verified against the GitHub account before linking. */
  repo?: string;
  stack: string[];
  /** Flagships lead the page and get full case studies. */
  tier: "flagship" | "supporting";
  shot: {
    desktop: string;
    mobile: string;
    /** Describes the screenshot for anyone who can't see it. */
    alt: string;
  };
  /** Present on flagships. Drives the /portfolio/[slug] case study. */
  study?: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    slug: "apprenticelog",
    name: "ApprenticeLog",
    outcome:
      "Turns a 30-second voice note into a compliant logbook entry, so apprentices stop losing evenings to paperwork.",
    summary:
      "A logbook app built for New Zealand trade apprentices. Record what you did out loud; it becomes a structured, BCITO-compliant entry. Works offline, because job sites do not have signal.",
    url: "https://apprenticelog.nz",
    displayUrl: "apprenticelog.nz",
    repo: "https://github.com/Jonta254/apprentice-log",
    stack: ["Next.js", "TypeScript", "Voice-to-text", "Offline-first", "PWA"],
    tier: "flagship",
    shot: {
      desktop: "/showcase/apprenticelog-desktop.webp",
      mobile: "/showcase/apprenticelog-mobile.webp",
      alt: "ApprenticeLog landing page: a phone showing a record button and a saved logbook entry, over a construction site.",
    },
    study: {
      role: "Sole designer and engineer. Product definition, interface, and build.",
      problem:
        "New Zealand trade apprentices have to keep a logbook for BCITO, and the logging is universally disliked. It happens at the end of a long day, from memory, in a format that fights the person filling it in. The work itself is done well. The record of it is done badly, late, or not at all, and a thin logbook can hold up qualification.",
      objective:
        "Make the record as easy to produce as the work is hard. An apprentice should be able to log a day in under a minute, in a form BCITO accepts as it stands, without a desk, a signal, or a second attempt.",
      research:
        "The research was observation rather than a survey. I looked at how the log actually gets kept: hands full through the day, memory fading by evening, and an official format written for the assessor rather than the apprentice. The existing options were generic note apps that produce nothing submittable, or the paper process the app is meant to replace. The gap was a tool shaped like the job.",
      decisions: [
        {
          kind: "Design",
          step: "One button, because hands are busy",
          detail:
            "The core interaction is a single record button. You say what you did and it becomes a structured entry. Typing on a phone with dusty hands at the end of a shift is the failure case the whole interface is designed around, so the happy path avoids the keyboard entirely.",
        },
        {
          kind: "Design",
          step: "Compliant by construction",
          detail:
            "Entries map to the BCITO structure directly, so the output is something an apprentice can submit as it stands rather than raw text they still have to reformat. The compliance is the product, not a feature bolted on beside it.",
        },
        {
          kind: "Engineering",
          step: "Offline as the default, not a fallback",
          detail:
            "Everything works with no connection and syncs when one returns. A tool that needs a bar of signal on a construction site is a tool that gets abandoned in the first week, so local-first storage came before anything that talked to a server.",
        },
        {
          kind: "Engineering",
          step: "Installable, so it lives on the home screen",
          detail:
            "Built as a progressive web app so it installs like a native app without an app-store gate, launches straight to the record screen, and updates itself. The lowest friction between wanting to log and having logged.",
        },
      ],
      challenges:
        "The honest constraint is compliance I do not own. BCITO can change its format, and the product has to track that or it stops being useful the day it drifts. I traded a faster first release for an entry structure kept in one place, so a format change is an edit rather than a rebuild. The other trade was scope: voice capture that is genuinely reliable mattered more than a wide feature list, so the feature list stayed short on purpose.",
      solution:
        "A voice-to-logbook app live on its own domain, free for NZ apprentices, spanning construction, carpentry, electrical, plumbing and automotive. Record a day out loud, review the structured entry, and keep a running log that works with no signal and installs to the home screen.",
      results:
        "Live and open to anyone at apprenticelog.nz, on a custom domain rather than a preview URL. The full loop, from recording to a structured entry, runs in the browser right now. I am not going to claim adoption numbers I cannot show you. Open it and put it through a day.",
      lessons:
        "The build was the easy part. The lasting lesson was to design around the constraint I do not control from the very start. Keeping the compliance format editable without a redeploy should have been the first decision, not a correction. I learned that the slightly harder way, and it changed how I scope anything that depends on someone else's rules.",
    },
  },
  {
    slug: "electracore",
    name: "ElectraCore",
    outcome:
      "The everyday calculations an electrician reaches for on site, from voltage drop to cable sizing to load analysis, gathered into one place.",
    summary:
      "Circuit calculators, wiring guides, and learning paths for students, engineers, apprentices and trade workers. Built from the job up, by someone who has done the job.",
    url: "https://electracore.vercel.app",
    displayUrl: "electracore.vercel.app",
    repo: "https://github.com/Jonta254/electracore",
    stack: ["Next.js", "TypeScript", "React", "Calculators"],
    tier: "flagship",
    shot: {
      desktop: "/showcase/electracore-desktop.webp",
      mobile: "/showcase/electracore-mobile.webp",
      alt: "ElectraCore landing page: the headline 'Every electrical tool you actually need' above calculator and guide counts.",
    },
    study: {
      role: "Sole designer and engineer. Scope, interface, calculators, and build.",
      problem:
        "The reference tools an electrician needs are scattered. One calculator lives on a forum, a wiring chart in a PDF, the theory in a textbook that assumes you are sitting an exam rather than standing in front of a panel. Nothing pulled the everyday calculations and guides into one place written for the job instead of the classroom.",
      objective:
        "One place an electrician, an apprentice, or a student can reach for the calculation they need and trust the answer. Fast enough to use mid-job, clear enough to learn from, and correct enough that someone would rely on it with a meter in the other hand.",
      research:
        "I did not need to invent the requirements. I have done the trade. The research was cataloguing the calculations I actually reach for and the guides I wished existed, then checking each against how it comes up on site. The comparison set was the scattered tools already out there, which told me the gap was not another single calculator but a coherent set written for the work.",
      decisions: [
        {
          kind: "Design",
          step: "Scope came from the work, not a whiteboard",
          detail:
            "The tools included are the ones actually reached for on site, like voltage drop, cable sizing, and load analysis. Each earns its place by being something I have genuinely needed on a job, not by rounding out a feature list to look complete.",
        },
        {
          kind: "Design",
          step: "The answer first, the reasoning underneath",
          detail:
            "Every calculator gives the number first and the working below it. Someone mid-job needs the result now. Someone learning needs to see how it was reached. The same screen serves both without slowing down either.",
        },
        {
          kind: "Design",
          step: "Learning paths, not a wall of videos",
          detail:
            "The guides run from fundamentals upward so an apprentice has a route through them, rather than a search box over a pile of disconnected articles. Structure is the feature.",
        },
        {
          kind: "Engineering",
          step: "Typed calculation logic, kept honest",
          detail:
            "The calculators are pure, typed functions separated from the interface, so the maths can be reasoned about and corrected on its own. In a tool people trust for real electrical work, a wrong answer is worse than no answer, so correctness sits at the centre rather than the edge.",
        },
      ],
      challenges:
        "The real risk was breadth. The temptation is to keep adding calculators until the tool claims to do everything, which is the fastest way to make it do nothing well. I traded coverage for trust: fewer tools, each one correct and clearly explained, rather than a long menu I could not stand behind. Serving a student and a working electrician on the same screen was the other tension, resolved by leading with the result and letting the reasoning stay one glance away.",
      solution:
        "A platform of circuit calculators, wiring guides, and structured learning paths, live and free for the core tools. It describes itself, accurately, as built by an electrician with real site experience, because it was.",
      results:
        "Live at electracore.vercel.app and open to anyone. Every calculator and guide is there to be used and checked right now. There are no usage figures on this page because I would rather you tested the tools than took my word for a number.",
      lessons:
        "Leaving tools out was the discipline that mattered most, and it was harder than adding them. Next time I would push that further and lead even harder with the three or four calculations that come up every day, treating the rest as depth for the people who go looking. Restraint reads as confidence, and it is usually right.",
    },
  },
  {
    slug: "traildesk",
    name: "TrailDesk",
    outcome:
      "Route maps, gear lists and emergency contacts that still work where there is no signal.",
    summary:
      "Offline-first trip planning for people who take going outside seriously. Everything needed on the trail is available without a connection.",
    url: "https://traildesk.vercel.app",
    displayUrl: "traildesk.vercel.app",
    repo: "https://github.com/Jonta254/traildesk",
    stack: ["Next.js", "Offline-first", "Mapping"],
    tier: "supporting",
    shot: {
      desktop: "/showcase/traildesk-desktop.webp",
      mobile: "/showcase/traildesk-mobile.webp",
      alt: "TrailDesk landing page showing offline trip planning with route mapping and gear checklists.",
    },
  },
  {
    slug: "safesignal",
    name: "SafeSignal",
    outcome:
      "Shares your live location with the people who would need it, and raises the alarm if you stop moving.",
    summary:
      "Real-time location sharing with accident sensing. Built for lone workers and anyone heading out alone.",
    url: "https://safesignal-beta.vercel.app",
    displayUrl: "safesignal-beta.vercel.app",
    repo: "https://github.com/Jonta254/safesignal",
    stack: ["Next.js", "Geolocation", "Real-time"],
    tier: "supporting",
    shot: {
      desktop: "/showcase/safesignal-desktop.webp",
      mobile: "/showcase/safesignal-mobile.webp",
      alt: "SafeSignal landing page showing live location sharing and accident detection.",
    },
  },
  {
    slug: "digilearn",
    name: "DigiLearn",
    outcome:
      "Structured paths through coding, AI, automation, and data science, built around real projects rather than video playlists.",
    summary:
      "A digital-skills platform covering the ground a modern developer actually needs, organised into paths with real outcomes.",
    url: "https://digilearn-five.vercel.app",
    displayUrl: "digilearn-five.vercel.app",
    repo: "https://github.com/Jonta254/digilearn",
    stack: ["Next.js", "TypeScript", "Learning paths"],
    tier: "supporting",
    shot: {
      desktop: "/showcase/digilearn-desktop.webp",
      mobile: "/showcase/digilearn-mobile.webp",
      alt: "DigiLearn landing page showing learning paths across coding, AI and data science.",
    },
  },
];

export const FLAGSHIPS = PROJECTS.filter((p) => p.tier === "flagship");
export const SUPPORTING = PROJECTS.filter((p) => p.tier === "supporting");
