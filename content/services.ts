/**
 * What I can be hired to do.
 *
 * Every entry that carries an `example` points at something real and live.
 * Where there is no shippable example yet, `example` is omitted rather than
 * filled with a placeholder — an empty slot is honest; a fake one is not.
 *
 * Thumbnails reuse the real product screenshots in /public/showcase.
 */

export type Service = {
  num: string;
  title: string;
  body: string;
  deliverables: string[];
  example?: {
    label: string;
    href: string;
    /** Real screenshot from /public/showcase. */
    shot: string;
    alt: string;
  };
};

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Business web applications",
    body: "Multi-feature platforms with real logic behind them: calculators, dashboards, user accounts, billing, and admin. The kind of tool a business runs on rather than markets with.",
    deliverables: ["Full-stack build", "Auth & accounts", "Dashboards", "Admin tooling", "Payments"],
    example: {
      label: "ElectraCore",
      href: "https://electracore.vercel.app",
      shot: "/showcase/electracore-desktop.webp",
      alt: "ElectraCore, an electrical calculation platform with guides and learning paths.",
    },
  },
  {
    num: "02",
    title: "Mobile & offline-first apps",
    body: "Installable apps that keep working with no connection: local-first storage, background sync, and interfaces usable one-handed, in gloves, in bad light.",
    deliverables: ["PWA", "Offline storage", "Sync", "Geolocation", "Push"],
    example: {
      label: "ApprenticeLog",
      href: "https://apprenticelog.nz",
      // Desktop capture, like every other thumbnail — the mobile shot is a
      // different aspect ratio and crops badly against the shared 16:10.
      shot: "/showcase/apprenticelog-desktop.webp",
      alt: "ApprenticeLog, voice recording turned into a compliant logbook entry.",
    },
  },
  {
    num: "03",
    title: "Full-stack engineering",
    body: "React and Next.js on the front, typed APIs and data on the back. Auth, databases, payments, and third-party integrations wired up and tested. Joining an existing codebase or starting a clean one.",
    deliverables: ["React / Next.js", "TypeScript", "APIs & databases", "Auth & payments", "Testing"],
    example: {
      label: "TrailDesk",
      href: "https://traildesk.vercel.app",
      shot: "/showcase/traildesk-desktop.webp",
      alt: "TrailDesk, an offline-first trip planning interface.",
    },
  },
  {
    num: "04",
    title: "E-commerce & online stores",
    body: "Storefronts that are quick to browse and simple to buy from, with checkout, payments, inventory, and orders handled properly. The parts a customer never notices, built to hold up under real use.",
    deliverables: ["Storefront", "Cart & checkout", "Payments", "Inventory", "Orders"],
    // Offered on request. No live example is featured here yet, so it is not
    // dressed up as one.
  },
  {
    num: "05",
    title: "Marketing sites & landing pages",
    body: "Pages built to convert and to load instantly. Copy, layout, and motion decided together, so the page reads as one thing rather than a template with content poured in.",
    deliverables: ["Landing pages", "Copy & layout", "SEO", "Analytics", "A/B ready"],
    example: {
      label: "DigiLearn",
      href: "https://digilearn-five.vercel.app",
      shot: "/showcase/digilearn-desktop.webp",
      alt: "DigiLearn, a learning platform landing page.",
    },
  },
  {
    num: "06",
    title: "Design systems & UI",
    body: "Tokens, components, and the documentation that keeps them honest. Colour, type, spacing and motion decided once, so the tenth screen costs less to build than the first.",
    deliverables: ["Design tokens", "Component library", "Figma", "Documentation", "Dark mode"],
    example: {
      label: "SafeSignal",
      href: "https://safesignal-beta.vercel.app",
      shot: "/showcase/safesignal-desktop.webp",
      alt: "SafeSignal, a location-sharing interface built on a consistent component set.",
    },
  },
  {
    num: "07",
    title: "Brand & visual identity",
    body: "Logos, wordmarks, and the marketing assets around them, from social templates to app icons to store graphics, drawn to work at every size they will actually appear at.",
    deliverables: ["Logo & wordmark", "App icons", "Social templates", "Store assets", "Brand guide"],
    // No example yet — see docs. Deliberately left empty rather than borrowed.
  },
];
