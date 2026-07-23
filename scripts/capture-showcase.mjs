/**
 * Capture real screenshots of every live product for the portfolio showcase.
 *
 * Drives the locally-installed Chrome via puppeteer-core (no browser download).
 * Captures each app at desktop and mobile, at 2x DPR, into public/showcase/.
 *
 *   node scripts/capture-showcase.mjs            # all apps
 *   node scripts/capture-showcase.mjs electracore
 *
 * These are captured from the live deployments, so they can be refreshed any
 * time a product changes — and they can never be accused of being mockups.
 */
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

/** Canonical URLs — every one verified HTTP 200. See docs/design-system.md §1. */
const APPS = [
  { slug: "electracore",   url: "https://electracore.vercel.app" },
  { slug: "apprenticelog", url: "https://apprenticelog.nz" },
  { slug: "traildesk",     url: "https://traildesk.vercel.app" },
  { slug: "digilearn",     url: "https://digilearn-five.vercel.app" },
  { slug: "safesignal",    url: "https://safesignal-beta.vercel.app" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false },
  { name: "mobile",  width: 390,  height: 844, deviceScaleFactor: 2, isMobile: true  },
];

const OUT_DIR = path.join(process.cwd(), "public", "showcase");

const findChrome = () => {
  const found = CHROME_CANDIDATES.find((p) => p && existsSync(p));
  if (!found) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");
  return found;
};

async function capture(browser, app, vp) {
  const page = await browser.newPage();
  try {
    await page.setViewport(vp);
    await page.goto(app.url, { waitUntil: "networkidle2", timeout: 60_000 });

    // Let entrance animations settle so we capture the resting state, not a
    // half-faded frame. Then freeze anything still looping.
    await new Promise((r) => setTimeout(r, 2500));
    await page.addStyleTag({
      content: `*,*::before,*::after{animation-play-state:paused!important;
        transition:none!important;caret-color:transparent!important}`,
    });

    // Dismiss anything that would sit on top of the shot.
    await page.evaluate(() => {
      const KILL = /cookie|consent|gdpr|banner|toast|newsletter/i;
      document.querySelectorAll("body *").forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.position !== "fixed" && cs.position !== "sticky") return;
        const id = `${el.id} ${el.className}`;
        if (typeof el.className === "string" && KILL.test(id)) el.remove();
      });
      window.scrollTo(0, 0);
    });

    // PNG straight from Chrome, then WebP for shipping — the raw PNGs run
    // 0.5–1.8MB each and would blow the §13 page-weight budget on their own.
    const png = await page.screenshot({ type: "png" });
    const out = path.join(OUT_DIR, `${app.slug}-${vp.name}.webp`);
    await sharp(png).webp({ quality: 82, effort: 6 }).toFile(out);

    const kb = (await sharp(out).metadata()).size / 1024;
    console.log(`  ✓ ${vp.name.padEnd(7)} ${app.slug}-${vp.name}.webp  ${kb.toFixed(0)}KB`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${vp.name.padEnd(7)} ${app.slug}: ${err.message}`);
    return false;
  } finally {
    await page.close();
  }
}

const only = process.argv[2];
const targets = only ? APPS.filter((a) => a.slug === only) : APPS;
if (!targets.length) {
  console.error(`Unknown app "${only}". Known: ${APPS.map((a) => a.slug).join(", ")}`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || findChrome(),
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

let ok = 0;
let failed = 0;
for (const app of targets) {
  console.log(`\n${app.slug} — ${app.url}`);
  for (const vp of VIEWPORTS) {
    if (await capture(browser, app, vp)) ok++;
    else failed++;
  }
}
await browser.close();

console.log(`\n${ok} captured, ${failed} failed → public/showcase/`);
process.exit(failed ? 1 : 0);
