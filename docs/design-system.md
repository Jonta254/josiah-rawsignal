# Raw Signal — Design System & Visual Direction

**Step 2 deliverable: visual language, tokens, and component specification. Still no build.**

Version 1.0 · Follows `creative-brief.md` v0.2 (decisions D1–D3).
Every colour value in §3 has a **computed** WCAG contrast ratio, not an asserted one.

---

## 1. Verified project inventory

All URLs checked live (HTTP status + `<title>` + metadata). **This is now the site's primary
evidence base** — under brief §10a, working software the visitor can open replaces the
testimonials and credentials that aren't yet available.

Cross-checked against the **Vercel account itself** (team `brian-josiahs-projects`,
`team_HvRFGu4qflUHLC6AZBOgyViv`) — not just the URLs the repo happened to contain.

### ✅ Canonical URLs — now live in the codebase

All five return **HTTP 200** with the correct product title, verified after the edit.

| Product | Canonical URL | Vercel project | What it is |
|---|---|---|---|
| **ElectraCore** | `electracore.vercel.app` | `electracore` — prod **READY** | Circuit calculators, wiring guides, learning paths, load analysis. Self-described: *"built by an electrician with real site experience."* |
| **ApprenticeLog** | **`apprenticelog.nz`** | `apprentice-log` — prod **READY** | Voice → BCITO logbook entry in 30 seconds. Free for NZ apprentices. |
| **TrailDesk** | `traildesk.vercel.app` | `traildesk` — prod **READY** | Offline-first trip planning: route mapping, gear checklists, emergency contacts. |
| **DigiLearn** | `digilearn-five.vercel.app` | ⚠️ not this team — see P7 | Digital-skills learning platform — code, AI, automation, data science. |
| **SafeSignal** | `safesignal-beta.vercel.app` | ⚠️ not this team — see P7 | Real-time location sharing with accident sensing. |

### ✅ Fixed in this pass

| # | Was | Now |
|---|---|---|
| **P1** | `fxprorise.org` — **DNS did not resolve** (curl `000`); ForexPro was linked from the homepage | **Removed completely.** Showcase entry, `ForexProPreview` (98 lines), `ForexProMockup` (58 lines), the `forex` service-icon branch (12 lines), and the "Forex Platforms" service all deleted. Zero references remain. The bento grid also hardcoded a 6-item layout (`apps[3], apps[4], apps[5]`) and was rewritten to derive from array length. Typecheck clean; dev server returns 200. |
| **P2** | `digilearn.vercel.app` — **someone else's app**, titled *"Digi Learn/Acceuil"*, French-language | Replaced everywhere with `digilearn-five.vercel.app` |
| **P3** | `safesignal.vercel.app` served **"SafeBeacon — Never Adventure Alone"** | Replaced everywhere with `safesignal-beta.vercel.app`, which serves **"SafeSignal"**. Name collision resolved in favour of SafeSignal. |
| **P4** | ApprenticeLog linked as `apprentice-log.vercel.app` | Now `apprenticelog.nz` — the custom domain, and the strongest trust signal in the portfolio |

### 🔴 Still open

| # | Finding | Action |
|---|---|---|
| **P7** | **DigiLearn and SafeSignal are not deployable from this Vercel team.** Both projects' latest *production* deployments show `readyState: ERROR`, and their team aliases (`digilearn-brian-josiahs-projects.vercel.app`, `safesignal-brian-josiahs-projects.vercel.app`) serve a **Vercel login wall**, not the app. The working public URLs (`digilearn-five`, `safesignal-beta`) are aliases on a *different* account. | The links work today, so the site is safe to ship. But these two products are one dashboard change away from going dark, and you can't fix them from this team. Consolidate both under `brian-josiahs-projects` and fix the failing production builds. |
| **P5** | **GitHub profile undermines the site.** Display name `jontAWorld`, bio `🩵😇 cold fLame`, no location, no website link. A recruiter clicking through from a precision-branded portfolio lands on this. | Align: real name, one-line professional bio, link back to the site. Brief §15 — off-site consistency outranks on-site SEO tricks. |
| **P6** | `electracore`, `traildesk`, `digilearn`, and `josiah-rawsignal` repos have **no description** and no homepage URL set. | Add both. Free credibility. Do **not** chase stars. |
| **P8** | `forex-platform` still exists on Vercel and its latest production deploy is **READY** — `forex-platform-mu.vercel.app` serves *"ForexPro — Learn Forex Trading & Trade Live"*. Only the `fxprorise.org` domain is broken. | Removed from the site as instructed. Noted only so the decision is informed: the product itself is alive, and the DNS on `fxprorise.org` is the sole failure. |

### Positioning note

**ElectraCore and ApprenticeLog are the two strongest assets on the site** and are currently
buried among five equals. Both are software built by an electrician *for* electricians —
they are the living proof of the entire "Raw Signal" thesis. ApprenticeLog is the single best
item: real custom domain, specific named audience, a real institutional workflow (BCITO), and
a concrete outcome ("stop wasting time on paperwork").

**Recommendation: rank the portfolio, don't grid it.** Two flagships with full case studies,
three supporting projects in a compact list. Equal weight for unequal work is a hiring-signal
mistake.

---

## 2. Brand concept

> **The workshop, not the spaceship.**

The reference set is the culture of good tools: a machinist's rule, a Braun appliance, a
well-drawn wiring schematic, a Leica. Precision that reads as *warm and human* because it was
made by hand, for someone's hands.

**Materials:** copper, paper, graphite, ink. Not lasers, not neon, not glass.

**Five principles, in priority order:**

1. **Evidence over assertion.** Every claim on screen is one click from proof.
2. **Remove until it breaks.** The last thing removed should hurt.
3. **Warm, not cold.** Precision without warmth reads as corporate. Warmth without precision reads as amateur. The brand lives exactly between them.
4. **Legible at a glance, rewarding on inspection.** Surface simplicity, depth on demand.
5. **Still correct in five years.** No effect that dates the work.

**Explicit non-goals:** futuristic, cyber, terminal-aesthetic, glassmorphic, neon, playful,
"awwwards-style". Every one of these is present in the current build and every one is cut.

---

## 3. Colour system

**Light-first with a fully equal dark mode.** Light backgrounds read as more premium, are
better for long-form reading, and — critically — differentiate from the neon-dark saturation
that makes the current site feel generic.

**One accent only.** Down from five. Copper/oxide: a non-literal callback to electrical work.
Because it is the only accent, it always *means* something — active state, key data, the one
primary action. Colour is never the sole carrier of meaning (WCAG 1.4.1).

### Light mode

| Token | Value | Contrast vs `paper` | Use |
|---|---|---|---|
| `--paper` | `#FBF9F6` | — | Page background |
| `--surface` | `#FFFFFF` | — | Cards, raised panels |
| `--sunken` | `#F2EEE8` | — | Insets, code blocks, table stripes |
| `--ink` | `#17140F` | **17.48** ✅ AAA | Headings, primary text |
| `--body` | `#3D372E` | **11.20** ✅ AAA | Body copy |
| `--muted` | `#6B6459` | **5.56** ✅ AA | Secondary text, captions |
| `--faint` | `#7A7266` | **4.51** ✅ AA | Tertiary text, metadata |
| `--line` | `#DED7CC` | 1.36 — decorative only | Dividers, card borders |
| `--line-strong` | `#8C8478` | **3.51** ✅ AA (non-text) | Input borders, interactive boundaries |
| `--accent` | `#9A4F1B` | **5.70** ✅ AA | Links, active state, primary button fill |
| `--accent-hover` | `#7E3F14` | **8.05** vs surface ✅ | Hover/pressed |

Button check: `--paper` on `--accent` = **5.70** ✅ AA.

### Dark mode

| Token | Value | Contrast vs `paper` | Use |
|---|---|---|---|
| `--paper` | `#12100D` | — | Page background |
| `--surface` | `#1A1713` | — | Cards |
| `--sunken` | `#0C0A08` | — | Insets |
| `--ink` | `#F7F4EF` | **17.31** ✅ AAA | Headings |
| `--body` | `#D2CBC0` | **11.80** ✅ AAA | Body copy |
| `--muted` | `#A69D90` | **7.10** ✅ AAA | Secondary |
| `--faint` | `#9A9184` | **6.11** ✅ AAA | Tertiary |
| `--line` | `#2E2925` | 1.32 — decorative only | Dividers |
| `--line-strong` | `#6F675E` | **3.42** ✅ AA (non-text) | Input borders |
| `--accent` | `#E8925A` | **7.86** ✅ AAA | Links, active state |
| `--accent-hover` | `#F2A870` | **9.02** vs surface ✅ | Hover |

> **Note on how these were produced.** Two candidate tokens failed on first computation —
> light `--faint` at 3.51 (below AA for body text) and dark `--line-strong` at 2.98 (below the
> 3:1 non-text threshold). Both were corrected and re-verified before being written here.
> Nothing in this table is an estimate.

**Comparison to current build:** existing body text `#7880A2` and `#404868` on near-black
sits far below AA at the sizes used — the current site would fail its own CI accessibility
gate under a strict audit. Every token above passes.

**Semantic tokens** (`--success`, `--warning`, `--danger`) are defined only where a state
genuinely exists (form validation). A portfolio does not need a full status palette.

---

## 4. Typography

**Two families. Down from seven.** The seven-family load (Bebas Neue, Inter, JetBrains Mono,
Orbitron, Playfair Display, Rajdhani, Caveat) is both the largest render-blocking cost and the
strongest "generated" tell in the current build.

| Role | Family | Why |
|---|---|---|
| **Display + prose** | A humanist/transitional serif with real character in the italic | Serif at display size reads as considered and timeless; it is also the fastest way to *not* look like every other dev portfolio, which are near-universally geometric sans |
| **UI + interface** | A neutral grotesque | Labels, buttons, nav, tables, metadata |
| **Mono** *(third, restricted)* | One mono | **Only** where it carries information: specs, code, measured values. Never decorative. |

Self-hosted via `next/font`. Variable where available. Target ≤ 3 files preloaded.
**Cut entirely:** Orbitron, Rajdhani, Bebas Neue, Caveat.

### Scale — 1.200 (minor third), 18px base

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 4.5rem)` | 1.02 | −0.02em | Page hero, once per page |
| `--text-h1` | `clamp(2.25rem, 4vw, 3rem)` | 1.08 | −0.015em | |
| `--text-h2` | `clamp(1.75rem, 3vw, 2.25rem)` | 1.15 | −0.01em | Section heads |
| `--text-h3` | `1.5rem` | 1.25 | −0.005em | |
| `--text-lg` | `1.25rem` | 1.6 | 0 | Lede paragraphs |
| `--text-base` | `1.125rem` (18px) | **1.65** | 0 | Body |
| `--text-sm` | `1rem` | 1.55 | 0 | Secondary |
| `--text-xs` | `0.875rem` | 1.45 | 0.01em | Metadata, labels |
| `--text-mono` | `0.9375rem` | 1.6 | 0 | Data only |

**Rules.** Measure capped at **68ch** for prose. One `--text-display` per page. Never
letterspace lowercase body text. Uppercase only for short labels, with +0.08em tracking.
No text over busy imagery.

---

## 5. Space, grid, layout

**8px base.** No ad-hoc values — this is what replaces the thousands of hard-coded inline
pixel values in the current build.

`--space-1: 4px` · `2: 8` · `3: 12` · `4: 16` · `5: 24` · `6: 32` · `7: 48` · `8: 64` ·
`9: 96` · `10: 128` · `11: 160`

**Containers:** `--container-prose: 68ch` · `--container-content: 1120px` · `--container-wide: 1360px`
Gutters: `--space-5` mobile, `--space-7` tablet, `--space-8` desktop.

**Grid:** 12 columns desktop / 8 tablet / 4 mobile. Gap `--space-5`.

**Vertical rhythm:** sections separated by `--space-10` (desktop) / `--space-8` (mobile).
Generous whitespace is the cheapest premium signal available and the current build spends its
budget on effects instead.

**Breakpoints:** `480 · 768 · 1024 · 1280 · 1600`. Mobile-first — brief §7.6: mobile is where
recruiter traffic lands.

---

## 6. Shape, elevation, borders

**Radius — two values only.** `--radius-sm: 6px` (inputs, buttons, tags) ·
`--radius-md: 12px` (cards, images, panels). Nothing else. No pills except tags. No circles
except avatars and status dots.

**Elevation — 3 steps, low opacity, never coloured.** The current build's coloured neon glows
(`0 0 14px {color}30`) are removed entirely.

- `--shadow-0`: none — the default. Most surfaces are defined by border, not shadow.
- `--shadow-1`: `0 1px 2px rgb(0 0 0 / .04), 0 2px 8px rgb(0 0 0 / .04)` — resting card
- `--shadow-2`: `0 2px 4px rgb(0 0 0 / .05), 0 8px 24px rgb(0 0 0 / .07)` — hover, popover
- `--shadow-3`: `0 8px 16px rgb(0 0 0 / .07), 0 24px 56px rgb(0 0 0 / .10)` — modal, palette

In dark mode shadows are near-useless; elevation is carried by `--surface`/`--line` instead.

**Borders:** `1px solid var(--line)` is the default separator. `--line-strong` for anything
interactive. **No `backdrop-filter` anywhere** — it is a significant paint cost on mobile and
the glass look is squarely on the non-goals list.

---

## 7. Motion

Brief §11: motion is punctuation, not content.

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | Colour/opacity on hover |
| `--dur-fast` | 160ms | Buttons, inputs, small state |
| `--dur-base` | 240ms | Cards, disclosure, tabs |
| `--dur-slow` | 400ms | Section entrance, page transition |
| `--ease-out` | `cubic-bezier(.2, .8, .3, 1)` | Entrances — the house curve |
| `--ease-in-out` | `cubic-bezier(.5, 0, .3, 1)` | Position/size changes |

**Ceiling: 400ms.** Nothing longer ships.

**The entrance pattern — one pattern, used everywhere:** `opacity 0→1`, `translateY 12px→0`,
`--dur-slow`, `--ease-out`, once, staggered ≤60ms in groups of ≤4. That is the entire
vocabulary. Consistency reads as intentional; variety reads as undisciplined.

**Never animate:** body text on scroll · anything blocking content · anything looping in the
periphery · anything with sound · `width`/`height`/`top`/`left` (transform and opacity only).

**Reduced motion is a first-class design.** Under `prefers-reduced-motion: reduce`, all
entrance transforms resolve to a plain opacity fade ≤100ms, and all continuous motion stops.
Implemented once at the token layer, so it cannot be forgotten per-component — currently it is
honoured in 3 of ~40 components.

### The one signature moment

Brief §11 allows exactly one. **Recommendation: the circuit-trace section rule.** A 1px
horizontal divider between major sections that draws left→right on first entry, with a single
copper node that settles at the junction. Once per section, 400ms, respects reduced motion,
costs no JavaScript beyond an IntersectionObserver. It carries the electrical concept without
a single neon glow — and it is the kind of restraint that reads as senior.

**Cut from the current build:** `AmbientSound`, `Cursor`, `IntroScreen`, `TerminalBoot`,
`RawSignalIntro`, `SignalIntro`, `ScrambleText`, `MagneticButton`, `TiltCard`,
`ParticleCanvas`, `ConstellationCanvas`, `SignalOrb`, `HeroScene`, `SmoothScroll` (Lenis),
`EasterEgg`, `CopperWire`, `GeoShapes`, `CircuitBoard`, `CircuitBackground`.
This also removes `three`, `@react-three/fiber`, `drei`, and `postprocessing` — the largest
single win against the §13 budget of **<120KB first-load JS**.

---

## 8. Components

**Layer 1 — Primitives:** `Container` · `Stack` · `Grid` · `Text` · `Heading` · `Button` ·
`Link` · `Icon` · `Image` · `Tag` · `Divider` · `VisuallyHidden`

**Layer 2 — Patterns:** `Section` · `PageHeader` · `ProjectCard` · `ProjectHero` ·
`CaseStudyBlock` · `Sequence` (§10) · `SkillGroup` · `ContactBlock` · `Prose` · `Nav` ·
`Footer` · `CommandPalette` (retained — power-user shortcut, never primary nav)

**Layer 3 — Pages:** composition only. Zero bespoke styling.

### Key specs

**Button.** Three variants — `primary` (accent fill), `secondary` (border + transparent),
`ghost` (text only). Sizes `sm`/`md`. Min target **44×44px**. Focus: `2px` accent ring at
`2px` offset. Hover: background/border shift only — **no transform, no magnetism**. Disabled
never relies on colour alone.

**ProjectCard.** The most important component on the site; it carries the evidence.
Structure, in order:
1. Real screenshot or app icon (§9) — `--radius-md`, `--shadow-1`, fixed aspect, dimensions reserved
2. Product name — `--text-h3`
3. One-line outcome — *what it does for whom*, not what it's built with
4. Stack tags — max 4, `--text-xs`
5. **Live link with visible URL** and status — the payload of the entire card

Hover: `--shadow-1` → `--shadow-2`, border → `--line-strong`, 160ms. No lift, no tilt, no glow.
Entire card is one link; the live URL is a nested, separately-focusable link with its own accessible name.

**Input.** `--line-strong` border, `--radius-sm`, 44px min height, real `<label>` always
visible (never placeholder-as-label), errors via `aria-describedby` + icon + text, never colour alone.

---

## 9. Imagery, icons, and the showcase

This is where the site becomes unfakeable — and under brief D2, photographs are the one
confirmed asset.

### Photography (you're supplying these)

Priority order — **on-site working shots outrank studio portraits.** A photograph of Josiah in
a panel, tracing a fault, tools in hand, is direct evidence of the trade background the whole
positioning rests on. A generic desk portrait is not.

Needed: **1** hero/about portrait (environmental, not studio) · **2–4** on-site working shots ·
**1** square headshot for schema, OG, and off-site profiles.

Treatment: natural colour, no heavy filters, no duotone, no neon overlay. `--radius-md`,
`--shadow-1`. AVIF/WebP, explicit dimensions, `sizes` set, real alt text.
**The `identity-*.jpg` stock-feeling set is cut** and replaced by these.

### Product showcase — real screenshots, captured from the live apps

Each of the five verified products gets a **real screenshot of its actual running interface**.
Not a mockup, not an SVG illustration of a browser frame (the current
`BentoGrid`/`ComingCards` approach), not a generated image.

Method: load each canonical URL at 1440×900, capture the primary screen, then again at 390×844
for the mobile frame. Store as `public/showcase/<slug>-desktop.avif` / `-mobile.avif`.
Retina 2×, then compressed. Because these are captured from live deployments, they can be
refreshed whenever a product changes — and they cannot be accused of being aspirational.

**Existing logo assets found:** SafeSignal has a full favicon set
(`favicon-32x32`, `favicon-16x16`, `apple-touch-icon`); ApprenticeLog has `icon.png` (192px),
`apple-icon.png`, and a store `feature-graphic.png`. ElectraCore, TrailDesk, and DigiLearn
need marks. Where a product has no logo, use a **monogram tile** — single letter, brand serif,
`--surface` on `--sunken`, `--radius-sm` — rather than inventing a logo.

Frame treatment: a minimal, flat browser/device chrome — a single `--line` border, a
`--radius-md` corner, no gloss, no perspective, no 3D tilt.

### Icons

One stroke-based family (`lucide-react` is already a dependency — keep it), one weight,
`1.5px` stroke, sizes 16/20/24 only. Used only where an icon beats a word.
**Cut:** the emoji/glyph role markers (`⚡ ◈ ◉ ◎ ○`) — they render inconsistently across
platforms and directly undermine a precision claim.

---

## 10. No dates — the Sequence pattern

**Requirement: no years or dates anywhere on the site.**

The current `TIMELINE` array is year-keyed (`app/about/page.tsx:52-61`) and is removed
outright. But dropping it entirely would lose the trade→code→design trajectory, which is the
most compelling thing about the positioning.

**Replacement: `Sequence` — ordered chapters, no calendar.**

Progression is carried by **order and numbering**, not by time:

> **01 — The trade.** Inside walls, tracing faults by feel. Physical systems don't negotiate.
> **02 — The first tool.** Built software for a trade business, because the job needed it.
> **03 — The craft.** Moved deliberately into design — systems, type, motion.
> **04 — The work now.** Software for people who work with their hands.

This is *stronger* than dates, not a compromise: it removes any invitation to compute years of
experience, keeps the reader on the narrative, and can never go stale. Visually it reuses the
`--space` scale with a `--line` rail and copper nodes — the same language as the signature
section rule (§7).

**Also removed under this rule:** the "Year on site" homepage stat, any "since X" phrasing,
copyright years in the footer, and every year in the About narrative.

**Stats block — replaced, not restyled.** "Trails walked" and "Disciplines mastered" are
unfalsifiable self-assessment presented as data and are cut (brief §1, Challenge 2). If a
numeric block survives at all, it carries only **verifiable** figures — e.g. *5 products
deployed*, each number a link to the thing it counts. A stat that can't be clicked shouldn't
be shown.

---

## 11. Identity, naming, and location

Answering brief **OPEN-4** with a recommendation rather than a question, as requested.

**Name.** Present as **"Josiah"** with **Raw Signal** as the practice/brand — matching the
existing `title` template. One name, used identically on the site, GitHub, LinkedIn, and every
profile. The current GitHub display name `jontAWorld` and bio `🩵😇 cold fLame` break this and
should change (P5).

*Flag, not an assumption:* the Vercel team slug is **`brian-josiahs-projects`** and the local
git author is **Brian**, which suggests the full name may be *Brian Josiah*. The site says only
"Josiah". I have not written a surname anywhere — confirm which you want used publicly and it
goes into the CV, the `Person` schema, and every off-site profile at once. What matters is that
one name is used consistently; a portfolio branded "Josiah" whose deployment URLs and commits
say "Brian" invites a question you don't want a recruiter asking.

**Location.** **Recommendation: don't state a city.** Lead with *"Remote · works across
timezones"* and let the contact section carry a timezone only.

Rationale — and a flag: the evidence points two ways. ApprenticeLog targets **NZ apprentices
and BCITO** (with a `.nz` domain), while the Tcash repo is built around **KES, M-Pesa, and
Airtel** — Kenya. Both are real, and I'm not going to guess which one is home. Omitting the
city is not evasion here; for a remote-first developer it removes a filter that can only
exclude you, and it keeps both markets addressable. Add a city later if you want local work —
it's a one-token change in the content layer. **The one thing that must not happen is the
site implying one location while a linked product implies another.**

**Domain.** `josiah-rawsignal.vercel.app` should become a real custom domain before this is
sent to anyone. ApprenticeLog already demonstrates you know how — a `.vercel.app` on the
portfolio itself, next to a product on `apprenticelog.nz`, is an odd signal.

---

## 12. Mapping onto the existing repo (per D3)

**Keep:** all routes and file structure · `app/api/contact` + `newsletter` · `sitemap.ts` ·
`robots.ts` · `opengraph-image.tsx` · `icon.tsx` · `not-found.tsx` · CI workflow ·
`.lighthouserc.json` (with gates raised per brief §13/§14) · `lucide-react` · `framer-motion`
(reduced to the single entrance pattern) · `CommandPalette` · `ErrorBoundary` · `CountUp`
(only if a verifiable stat survives §10).

**Replace wholesale:** `app/globals.css` (1,997 lines → token layer + reset + prose) ·
every inline `style={{…}}` in `page.tsx` (1,156 lines), `about/page.tsx` (694),
`portfolio/[slug]/page.tsx` (722) · the 19 effect components listed in §7.

**Remove as dependencies:** `three`, `@types/three`, `@react-three/fiber`,
`@react-three/drei`, `@react-three/postprocessing`, `lenis`.

**Convert to Server Components:** homepage, about, portfolio index, and project pages are all
`"use client"` today. Only genuinely interactive leaves keep the directive. This is the
largest single performance win available and it comes free with the rebuild.

**New:** `content/projects.ts` (typed, with the verified canonical URLs from §1) ·
`content/sequence.ts` · `content/skills.ts` · `public/showcase/*` — so content changes never
touch layout again.

---

## 13. Definition of done for Step 3

- Every token in §3–§7 exists in CSS and nothing hard-codes a value outside it
- Lighthouse **≥95 / 100 / ≥95 / 100** (perf / a11y / best-practices / SEO) on mobile, CI-enforced
- First-load JS **< 120KB gzipped**
- Zero dates anywhere in rendered output
- Zero dead links — `fxprorise.org` resolved or gone; `digilearn.vercel.app` never referenced
- Every project card links a URL that returns 200, verified in CI by a link-checker
- Full keyboard pass and a screen-reader pass, done manually, not just scored
- Real photographs in place of every stock and generated image

---

*End of Step 2. Open decisions carried forward: **P3** (SafeSignal vs SafeBeacon — one name),
brief **OPEN-1** (which qualifications are verifiable, stated without dates), and surname for
CV/schema if wanted.*
