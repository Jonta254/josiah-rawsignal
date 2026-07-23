import pup from "puppeteer-core";
const OUT = "C:/Users/ADMIN/AppData/Local/Temp/claude/C--Users-ADMIN-HumanChain/73cfa48e-ddda-4315-97e4-695c81dd0a6a/scratchpad";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const shots = process.argv.slice(2); // "path:scroll:name"
const b = await pup.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });

for (const s of shots) {
  const [route, scroll = "0", name, w = "1440", h = "900"] = s.split("|");
  const p = await b.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text()); });
  await p.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
  if (process.env.DARK) await p.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  await p.goto("http://localhost:3000" + route, { waitUntil: "domcontentloaded", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 2200));
  if (+scroll) { await p.evaluate((y) => window.scrollTo(0, y), +scroll); await new Promise((r) => setTimeout(r, 700)); }
  await p.screenshot({ path: `${OUT}/${name}.png` });
  // Layout shift + a quick a11y sanity pass
  const audit = await p.evaluate(() => {
    const noAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
    const h1 = document.querySelectorAll("h1").length;
    const small = [...document.querySelectorAll("a,button")].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && r.height < 44;
    }).map((e) => (e.textContent || "").trim().slice(0, 28));
    return { noAlt, h1, small: [...new Set(small)].slice(0, 8) };
  });
  console.log(`${route.padEnd(12)} h1=${audit.h1} imgNoAlt=${audit.noAlt} under44=[${audit.small.join(", ")}] errors=${errs.length ? errs.join(" | ") : "none"}`);
  await p.close();
}
await b.close();
