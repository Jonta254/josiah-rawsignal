# Raw Signal — Creative Brief

**Step 1 deliverable: strategy and brand foundation. No design, no code.**

Version 0.2 · Grounded in an audit of the current `josiah-rawsignal` codebase.
Items marked **[OPEN]** are unresolved questions, not decisions. They must be answered
before Step 2. Nothing in this brief invents a fact about Josiah.

---

## 0a. Decisions locked (v0.2)

**D1 — Audience: serve all four tiers, via one evidence-led homepage and two doors.**
The stated requirement is "all". Resolving this by splitting the homepage between employment
and client messaging would weaken both, so the resolution is structural instead:

- **The top of the homepage is audience-agnostic.** Evidence of shipping — real, working,
  outcome-bearing work — persuades a hiring manager and a client identically. Nothing above
  the fold has to name an audience.
- **Below the proof, two explicit doors:** *Hire me* (CV, roles, stack, availability) and
  *Work with me* (services, process, start a brief). Signposted, not hidden in nav.
- **Peers and recruiters are served by format, not by a third door:** recruiters by a
  one-page downloadable CV and scannable role/stack/location; peers by public code and writing.

This supersedes Challenge 4's "one spearhead" recommendation *for the offer*, but **not for the
craft claim**. The five-identity deck (Electrician / Developer / Designer / Explorer / Human)
still cannot be the top of the funnel — the lead is *what he ships*, with the trade background
as the reason it's good. **[OPEN-2 — resolved]**

**D2 — Asset reality: photographs are confirmed; everything else is unconfirmed.**
Of the four asset classes, only *photographs of Josiah* were confirmed available. Verifiable
credentials, live products with real users, and contactable past clients are all **unconfirmed
as of v0.2** — treated here as absent until evidence is produced.

This is the most consequential fact in the brief. It means §10's Tier A and Tier B are
currently unbuildable, and the trust strategy must be rewritten around what *can* be
demonstrated rather than attested. See §10a. **[OPEN-3 — partially resolved]**

**D4 — No qualifications, no dates. The work is the credential.**
Nothing on the site claims a qualification, certification, licence, or issuing body — and no
year or date appears anywhere (see design-system §10, the `Sequence` pattern). The site shows
*what he does*, demonstrated, and lets the visitor judge.

This closes **OPEN-1** and it removes the brief's single largest risk: there is now nothing
checkable to disprove, because nothing is asserted. It also concentrates the entire burden of
proof onto the five live products and the site's own build quality (§10a) — which is a
harder standard, not an easier one. The About page's existing dated claims ("Qualified as a
commercial and residential electrician", the year-keyed `TIMELINE` array at
`app/about/page.tsx:52-61`) are removed wholesale in Step 3, not rewritten.

Consequence to accept honestly: with no credentials and no testimonials, **a visitor's only
reason to trust is what they can open and use.** That makes P7 (DigiLearn and SafeSignal
deploying from an account that can't rebuild them) a credibility risk, not just an ops
annoyance. Every live link is now load-bearing.

**D3 — Build approach: keep the repo, replace the design layer wholesale.**
Routes, content, API endpoints, CI, sitemap/robots, and OG generation are retained. The token
and component layer is rebuilt from scratch rather than retrofitted. **[OPEN-6 — resolved]**

---

## 0. What I found before writing this

This brief is not written on a blank page. The repo already contains a substantial site,
and the honest starting point is what it currently is:

| Signal | Evidence in repo |
|---|---|
| Identity | "Josiah — Electrician · Developer · Designer", brand name **Raw Signal** (`app/layout.tsx:18`) |
| Positioning | Three-trade hybrid: electrical → full-stack → design (`app/about/page.tsx:14-50`) |
| Visual mode | Dark "deep-space" gradients, five neon accent hues, glow/bloom, glassmorphism |
| Typefaces | **Seven** families loaded: Bebas Neue, Inter, JetBrains Mono, Orbitron, Playfair Display, Rajdhani, Caveat |
| Motion/FX | three.js orb + scene, postprocessing, particle canvas, constellation canvas, circuit board, custom cursor, ambient sound, terminal boot, intro screen, scramble text, magnetic buttons, tilt cards, Lenis smooth scroll, easter egg |
| Projects | ElectraCore, DigiLearn, TrailDesk, SafeSignal, ApprenticeLog — plus Tcash and HumanChain marked "coming" |
| Proof | **Zero testimonials.** Zero named clients. Zero case-study outcomes. |
| Homepage stats | "Year on site", "GitHub repos / Projects shipped", "Trails walked", "Disciplines mastered" |
| Contact | `josiah@rawsignal.dev`, GitHub `Jonta254`; one placeholder `github.com/josiah` link |
| Standards already set | Lighthouse CI gates: a11y ≥ 0.90 (error), perf ≥ 0.85 (warn) — `.lighthouserc.json` |

**This audit produces four challenges to the request itself.** They are in §1.

---

## 1. Four challenges to the brief as given

The instruction was to challenge every recommendation, including the premise. Four things
in the current direction actively work against the stated goal.

### Challenge 1 — The brief's adjectives and the site's execution are in direct conflict

The stated target is *premium, minimal, calm, timeless, elegant*. The current site is
*maximalist, high-stimulus, sci-fi, trend-locked*: neon-on-black, five simultaneous accent
hues, seven typefaces, ambient audio, a boot sequence, a custom cursor, and multiple WebGL
canvases.

Both are valid design directions. They cannot both be this website. Neon-glow-on-black with
Orbitron and terminal motifs is one of the most heavily replicated aesthetics of the last
three years — which means it now reads as *generated*, not *handcrafted*. The brief's own
instruction ("avoid anything that looks AI-generated") points away from the current design,
not toward polishing it.

**Recommendation: keep the concept, discard the costume.** "Raw Signal" — the electrician
who codes, honesty of a system that either works or doesn't — is a genuinely distinctive
positioning that no template can fake. That is the asset. The neon is not the asset; it is
the most replaceable thing on the site. Rebuild the surface around restraint, and the
concept gets *stronger*, because a calm interface is itself evidence of the discipline the
copy claims.

### Challenge 2 — Effects are currently substituting for proof

A hiring manager's decision is driven by *evidence of outcomes*, not by interaction density.
The site currently has an intro screen, ambient sound, and a 3D hero — and not one
testimonial, named client, or measured result. That inversion is the site's biggest
credibility problem, and no amount of visual work fixes it.

Worse, three of the four homepage stats are unfalsifiable or irrelevant to hiring: "Trails
walked", "Disciplines mastered", "Year on site". A recruiter reads "Disciplines mastered: 5"
as self-assessment presented as data. It *lowers* trust. So does a portfolio where flagship
items are labelled "coming".

**Recommendation: proof budget before polish budget.** Step 2 should not begin until the
content in §9/§10 exists in draft. Design is the amplifier; right now there is a weak signal
being amplified.

### Challenge 3 — Unverified biographical claims are an existential risk

The About page asserts a specific, checkable history: apprenticeship 2016, qualified
commercial/residential electrician 2018, "released first open-source design system, used by
other craftspeople who code" (2023), simultaneous freelancing across three disciplines.

If every one of those is true, they are the strongest material on the site and are currently
*under*-used — a certification number, a photo on site, a link to that design system's repo
and its dependents would each be worth more than the entire 3D hero.

If any of them is aspirational, it must be removed before launch. A recruiter who disproves
one claim discards the whole site, and portfolio claims are unusually easy to check
(licensing registries, repo history, package download counts). There is no partial credit
here. **[OPEN-1]**

### Challenge 4 — "Everything I do" is the weakest possible positioning for hiring

The site currently presents five identities of equal weight (Electrician, Developer,
Designer, Explorer, Human) plus five to seven products. Breadth without a lead reads as
*undecided*, and hiring decisions are made against a specific role.

**Recommendation: one spearhead, hybrid as differentiator.** Lead with a single primary
offer. The other disciplines then function as *why he's better at it* rather than as
competing claims. The multi-role card deck can survive as a secondary section — it just
cannot be the top of the funnel. Which discipline leads is **[OPEN-2]** and depends on §3.

---

## 2. Overall vision

> A portfolio that behaves like well-executed infrastructure: quiet, fast, obviously correct,
> and impossible to mistake for anyone else's.

The organising idea is **verified craft**. The through-line from electrical work to software
is not aesthetic (circuits, neon, terminals) — it is *epistemic*: a circuit either carries
current or it doesn't; there is no persuading it. That is the rarest quality in a portfolio
market saturated with claims, and it should govern every decision:

- Where others assert, this site **demonstrates**.
- Where others decorate, this site **removes**.
- Where others chase novelty, this site is **still correct in five years**.

The site should be legible in 20 seconds, rewarding at 5 minutes, and quotable afterward —
a visitor should be able to describe it to a colleague in one sentence.

**Success condition:** a visitor with hiring authority leaves able to state, unprompted,
what Josiah does and one specific piece of evidence for it.

---

## 3. Target audience

Ranked. Design conflicts resolve in favour of the higher tier.

**Tier 1 — Hiring managers and technical leads.**
Skim-first, evidence-driven, 30–90 seconds on first visit, likely on desktop, often
mid-comparison against 6–20 other candidates. They want: can this person ship, will they
need supervision, do they communicate clearly. They are actively *hostile to friction* —
an intro animation before content is a bounce risk with this group specifically.

**Tier 2 — Recruiters and sourcers.**
Non-technical, keyword-matching, need a downloadable CV and a copy-pasteable summary within
seconds. Often on mobile. They will not read prose. They need scannable role/stack/location.

**Tier 3 — Prospective clients (SMEs, trade businesses, agencies).**
Care about outcome, reliability, and price signal. Need to see a comparable problem solved
and an unambiguous way to start a conversation.

**Tier 4 — Peers, collaborators, and the open-source community.**
Drive amplification and inbound. Reward depth: real write-ups, real repos, real opinions.

The **[OPEN-2]** decision — employment vs client work as primary — determines whether Tier 1
or Tier 3 leads. The design system in §8 must serve both, but the homepage cannot.

---

## 4. Visitor goals

What each visitor is actually trying to do, and the design obligation it creates:

| Visitor goal | Obligation on the site |
|---|---|
| "Tell me what you do in five seconds." | One-sentence, jargon-free positioning above the fold. No animation gate. |
| "Prove you can do it." | Evidence-first work cards: problem → what he built → measurable result. |
| "Are you real?" | Real photograph, real location, real name, verifiable credentials, live links. |
| "Are you at my level?" | Depth available on demand — case studies, code, decisions and trade-offs. |
| "Will you be easy to work with?" | Writing quality, clarity, honest scoping, stated availability. |
| "How do I reach you?" | Contact reachable from every screen; response-time expectation stated. |
| "Can I forward this?" | Fast share/OG cards, printable CV, stable deep links per project. |

---

## 5. User journey

Designed for **partial reads**. Assume most visitors see only stages 1–2.

**Stage 1 — Land (0–5s).** Name, discipline, location/availability, one proof anchor.
No intro screen, no audio, no gate. The current `IntroScreen`/`TerminalBoot`/`RawSignalIntro`
sequence should be cut or reduced to a sub-400ms transition — it costs the exact seconds
Tier 1 spends deciding.

**Stage 2 — Scan (5–30s).** Three-to-four flagship work cards, each with an outcome visible
without clicking. Plus one line of hard credibility (credential, named client, or shipped
product with users).

**Stage 3 — Verify (30s–3min).** One case study opened. Structure: context → constraint →
decision → what shipped → what it changed → what he'd do differently. That last section is
the highest-trust move available and almost nobody does it.

**Stage 4 — Assess the person (3–5min).** About, told as a real trajectory: trade → code →
design, and why that combination produces better software for physical-world problems.

**Stage 5 — Act.** Email, CV download, GitHub, LinkedIn. Every exit is a designed exit.

**Stage 6 — Return.** Writing and a "now" page give a reason to come back; a light newsletter
is optional and must never gate content.

---

## 6. Visual identity

Direction to be *designed* in Step 2 — this fixes the strategy it must satisfy.

**Brand personality:** Grounded · Precise · Understated · Warm · Unhurried · Exact.
Explicitly **not**: futuristic, cyber, edgy, playful, corporate.

**Concept: "the workshop, not the spaceship."**
The reference set is the culture of good tools — a Leica, a machinist's rule, a Braun
appliance, a well-drawn wiring schematic, a Swiss timetable. Precision that feels *warm and
human* because it was made by hand for someone's hands. Copper, paper, graphite, ink. Not
lasers.

**Palette strategy.** Reduce from five accents to **one signature accent + one neutral ramp**.
The accent should be a metal-derived copper/oxide tone (a direct, non-literal callback to
electrical work), used sparingly enough that it always means something — active state, key
data, single CTA. Colour must never be the only carrier of meaning (§14). Recommend a
**light-first** design with a genuinely equal dark mode; light backgrounds read as more
premium and more legible for long-form, and dark-only is part of what makes the current site
feel generic.

**Typography.** From seven families to **two, three maximum**: one distinctive text serif or
humanist sans for editorial voice, one neutral sans for UI. Retain a mono *only* where it
carries information (specs, code, data). Drop Orbitron, Rajdhani, Bebas, Caveat entirely —
these are the strongest "generated" tells in the current build. Type scale should be a
deliberate ratio, generous (16–18px body), with measure capped at 65–75 characters.

**Spacing and grid.** One spacing scale, 8px base, no ad-hoc values. A 12-column grid with a
consistent max-width and *large* margins — whitespace is the single cheapest premium signal
and the current build spends it on effects instead.

**Components.** Flat, edge-defined, honest. Borders and background steps instead of glow.
Radius: small and consistent (one or two values). Shadows: a 3-step elevation ramp, low
opacity, never coloured/neon.

**Iconography.** One family, one weight, stroke-based, used only where an icon beats a word.
Remove the emoji and glyph icons currently used as role markers (`⚡ ◈ ◉ ◎ ○`) — they render
inconsistently across platforms and undermine the precision claim.

**Imagery.** This is where the site becomes unfakeable. Priority order:
1. **Real photographs of Josiah working** — on site, in a panel, at a desk. One good portrait
   is worth more than every WebGL canvas in the repo.
2. **Real artefacts** — schematics, boards, sketches, screens of shipping product.
3. **Product screenshots**, real data, in a restrained device frame.
4. Generated/abstract art: **avoid**. It is the primary tell.

The stock-feeling `identity-*.jpg` set should be replaced or cut. **[OPEN-3]**

---

## 7. UX philosophy

1. **Content before chrome.** Nothing animates before the first meaningful paint.
2. **One primary action per screen.** Everything else is subordinate.
3. **Progressive depth.** Skimmable surface, deep on demand. Never force a scroll to get a fact.
4. **Predictable over clever.** Standard nav, real links, working back button, no hijacked scroll.
   *This challenges Lenis smooth-scroll:* it fights native scroll physics, breaks
   `scroll-behavior`, and is a known accessibility irritant. Recommend removal.
5. **Feedback within 100ms** on every interaction; visible focus at all times.
6. **Mobile is not the small version** — it is where most recruiter traffic lands. Design it first.
7. **Never trap the visitor.** No cursor takeover, no autoplaying audio, no modal gates.
   *This challenges `Cursor.tsx` and `AmbientSound.tsx`:* both should go. A custom cursor
   degrades precision for the user in exchange for novelty for the author, and unrequested
   audio is a hard trust break in an office or open-plan environment.
8. **A command palette is fine as a power-user shortcut** — never as the primary nav.

---

## 8. Design system strategy

**Tokens first, in one place.** Colour, type, space, radius, shadow, motion duration and
easing as CSS custom properties, consumed by everything. This directly fixes the current
build's largest maintainability problem: several thousand lines of inline `style={{…}}` with
hard-coded hex values scattered across pages, which makes any global change a manual sweep.

**Layering:**
1. **Tokens** — primitives (`--space-4`, `--accent`, `--ease-out`)
2. **Primitives** — Text, Stack, Grid, Container, Button, Link, Icon, Image
3. **Patterns** — Section, WorkCard, CaseStudy blocks, Timeline, ContactBlock, Prose
4. **Pages** — composition only, no bespoke styling

**Rules.** No inline styles except genuinely dynamic values. No magic numbers. Every
component ships responsive, keyboard-operable, and reduced-motion-aware by construction —
accessibility as a property of the system, not a later audit. Server Components by default;
`"use client"` only where interaction requires it (currently the whole homepage and About
page are client components, which is a large and avoidable cost).

---

## 9. Content strategy

**Voice:** first person, plain, specific, unhurried. Short sentences. Concrete nouns.
No superlatives about himself — let the evidence carry it. The current copy is well-written
but leans aphoristic ("Design is not what it looks like…"); trade roughly half of those lines
for specifics, which persuade harder.

**Required content, in priority order:**

1. **Positioning line** — role + domain + differentiator, ≤ 15 words, no metaphor.
2. **3–4 case studies**, not gallery cards. Each: the problem, the constraint, the decision,
   what shipped, the result, the retrospective. One should be a *failure or a hard trade-off* —
   the strongest available trust signal.
3. **Evidence of use** — live URLs, users, downloads, repo stars, or a client's own words.
   Anything labelled "coming" is cut from the portfolio until it ships. A shipped small thing
   beats an unshipped big thing.
4. **Credentials** — electrical qualification (issuer, year, ideally verifiable), plus any
   certificates. Under-claimed today.
5. **CV** — one page, downloadable PDF, matching the site, always current.
6. **About** — the trade→code trajectory, told once, honestly, with a real photograph.
7. **Contact** — email, expected response time, current availability, location and timezone.
8. **Writing** (optional but high-leverage) — 3–5 real posts about problems he actually solved.
   An empty blog is worse than no blog.

**Cut list:** vanity stats, unshipped projects presented as work, placeholder links
(`github.com/josiah`), the easter-egg comment in `layout.tsx`, and any claim that cannot be
substantiated.

---

## 10. Trust-building strategy

Ranked by how much each moves a hiring decision per unit of effort:

**Tier A — highest impact, must have**
- **Live, working links** to shipped things. Nothing beats a URL that loads.
- **Outcome-bearing case studies** (§9.2).
- **A real photograph.** Anonymity is a trust tax.
- **The site's own performance and accessibility scores** — a portfolio for a frontend
  developer *is* the work sample. This is why §12–14 are strategy, not hygiene.
- **Verifiable credentials** with issuer and year.

**Tier B — strong, obtainable**
- **Testimonials**, attributed with full name, role, company, and photo. Two real ones beat
  ten anonymous. Unattributed testimonials are net-negative. *Action: request from past
  electrical and freelance clients this week — this has the longest lead time of anything in
  the plan.*
- **Public code** — a pinned, well-documented repo the visitor can read.
- **Consistent identity** across GitHub, LinkedIn, and the site: same name, photo, and line.
- **Stated availability and response time.**

**Tier C — supporting**
- Writing, "now" page, uptime, clean 404, correct OG cards on share.

**Explicitly rejected:** fabricated logos, invented metrics, "trusted by" walls without
relationships, counters that inflate, and any AI-generated headshot. Each is a single point
of catastrophic failure if noticed, and they are noticed.

---

## 10a. Trust strategy, revised for D2 (no attestable proof yet)

§10 assumes testimonials, credentials, and shipped products are obtainable. Under D2 none of
that is confirmed, so the strategy has to shift from **attested** trust (someone vouches) to
**demonstrated** trust (the visitor verifies it themselves, on the page, in seconds).

This is a harder mode but not a weak one — for a developer it can be *more* convincing than
testimonials, because it cannot be faked.

**What still works with zero third-party proof:**

1. **The site is the work sample.** For a frontend developer this is the strongest single
   asset available and it costs nothing but rigour. A portfolio that loads in under a second,
   scores 100 on accessibility, works perfectly by keyboard, and is flawless on a cheap
   Android is an unforgeable demonstration of competence. This is why §13 and §14 are
   strategy, not hygiene — under D2 they are the *primary* trust instrument.
2. **Working software the visitor can open right now.** Self-initiated products count fully,
   provided they are (a) actually deployed, (b) actually functional, and (c) honestly labelled
   as personal projects. "I built this because I needed it as an electrician, here it is
   running" is a complete and credible story with no client required.
3. **Readable public code.** One well-documented repo, with a real README, real commit
   history, and honest trade-offs written down. A technical lead will read it, and it answers
   "will they need supervision" better than any testimonial.
4. **Decision write-ups.** Case studies of *his own* projects, structured problem → constraint
   → decision → result → retrospective. The retrospective section is the highest-trust move
   available and requires no external validation at all.
5. **The photographs.** Confirmed available, and now carrying more weight than planned. A real
   person, on a real site, doing real electrical work is direct evidence of the trade
   background that the whole positioning rests on. Prioritise: on-site working shots > desk
   portrait > studio headshot. Under D2 these are Tier A, not Tier B.
6. **Specificity as a proxy for proof.** Detail that only a practitioner would know —
   real cable sizing, real fault-finding narrative, real constraints of the job — signals
   authenticity to anyone in the field. Generic competence claims signal the opposite.

**What must be removed until it can be substantiated:**

- Any testimonial, client logo, or "trusted by" treatment.
- Any metric implying users, downloads, or engagement that isn't real.
- Any credential stated without issuer and year (see OPEN-1 — unresolved and now urgent).
- Anything in the portfolio labelled "coming", or presented as client work when it is not.

**The one-line rule for this phase:** *nothing on the site should assert anything the visitor
cannot verify in one click.* Under D2 that constraint is not a limitation — it is the design
brief.

---

## 11. Motion philosophy

**Motion is punctuation, not content.**

- **Purpose test:** every animation must do one of — orient, confirm, direct attention, or
  express brand in under 400ms. Anything else is cut.
- **Duration:** 120–240ms for UI feedback; 300–500ms for entrances. Nothing above 600ms.
- **Easing:** one house curve for entrances, one for exits. Not per-element bespoke values.
- **Restraint:** at most one animated element per viewport. The current build frequently has
  four or more running simultaneously.
- **Reduced motion is a first-class design, not a fallback.** `prefers-reduced-motion` must
  be honoured everywhere — it is currently respected in only 3 of 40 components.
- **Never animate:** body text on scroll, anything blocking content, anything looping in the
  periphery, anything with sound.

**Cut candidates:** ambient sound, intro/boot screens, custom cursor, scramble text, magnetic
buttons, particle/constellation canvases, tilt cards, Lenis. **Keep candidate:** at most *one*
signature moment — a single, genuinely beautiful, brand-carrying interaction that appears
once. Craft is demonstrated by knowing what to leave out; a site that does one thing
exquisitely reads as more skilled than one that does twelve things adequately.

---

## 12. Technical standards

- **Next.js App Router, Server Components by default.** Client components only at interaction
  leaves. This is the single biggest available performance win over the current build.
- **Zero heavy client dependencies on first load.** three.js + @react-three/fiber + drei +
  postprocessing is a very large payload for decoration; if any 3D survives, it is
  lazy-loaded, viewport-triggered, and never blocks LCP. Recommend removing it entirely.
- **Type-safe throughout**, strict TypeScript, no `any` in app code.
- **Content as data**, not JSX. Projects/timeline/testimonials in typed structured files so
  content changes never require touching layout.
- **Self-hosted fonts** via `next/font` — remove the render-blocking Google Fonts requests
  and the seven-family load.
- **Security:** CSP + security headers, no secrets client-side, rate-limited and validated
  contact/newsletter endpoints, spam protection without CAPTCHA where possible.
- **Testing/CI:** keep the existing Lighthouse CI gate and raise it (§13); add lint, typecheck,
  and a link-checker to the pipeline; preview deploys per PR.
- **Analytics:** privacy-respecting, no consent banner needed if possible.

---

## 13. Performance goals

Budgets, enforced in CI — a frontend portfolio that loads slowly has already answered the
interview question.

| Metric | Target | Notes |
|---|---|---|
| LCP | < 1.5s (mobile 4G) | Hero must be text or a static optimised image |
| INP | < 200ms | |
| CLS | < 0.05 | Reserve space for all media |
| TTFB | < 300ms | Static/ISR where possible |
| JS on first load | **< 120KB gzipped** | The hard constraint that forces the §11 cut list |
| Total page weight | < 800KB typical | |
| Lighthouse Performance | **≥ 95 mobile** | Current CI gate is 85 (warn) — raise to error |
| Fonts | ≤ 3 files, preloaded, `swap` | Down from 7 families |

Every image: AVIF/WebP, correct `sizes`, explicit dimensions. Route-level code splitting.
Failing a budget fails the build.

---

## 14. Accessibility standards

**Target: WCAG 2.2 AA, with AAA on body-text contrast.** Non-negotiable — and strategically
useful, since accessibility *is* the "detail-oriented and professional" claim, demonstrated
rather than asserted.

- Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI boundaries. **The current palette almost
  certainly fails this**: `#7880A2` and `#404868` body text on near-black backgrounds are
  below threshold at the sizes used. This alone would fail the repo's own CI gate on a
  strict audit.
- Full keyboard operability, logical tab order, visible high-contrast focus rings, skip link
  (a `#main-content` target already exists — keep it, make the link visible on focus).
- Semantic HTML and correct landmarks. One `h1` per page, ordered headings.
- Real alt text; decorative imagery `aria-hidden`.
- `prefers-reduced-motion` honoured across every component, not three.
- Forms: real labels, errors linked via `aria-describedby`, announced status, never
  colour-only validation.
- Touch targets ≥ 44×44px.
- Verified with keyboard-only and screen-reader passes (NVDA/VoiceOver), not just automated
  scores. Raise the CI accessibility gate from 0.90 to **1.00**.

---

## 15. SEO strategy

- **Primary query intent:** the name ("Josiah …" — surname/handle to confirm, **[OPEN-4]**),
  plus role + location terms, plus the distinctive "electrician who builds software" angle,
  which has almost no competition and is the realistic organic win.
- Server-rendered content on every route; nothing meaningful behind client-only rendering.
- Unique `title`/`description` per page; `%s | Josiah` template is already correct.
- **Structured data:** `Person`, `WebSite`, `BreadcrumbList`, `CreativeWork` per project,
  `Article` for posts. This drives the knowledge-panel/name-search result.
- Per-page OG/Twitter images generated from real content (the existing `opengraph-image.tsx`
  is the right pattern).
- Canonicals, `sitemap.ts`, `robots.ts` — already present, keep and extend.
- Clean, stable, human-readable slugs. Never break a URL that has been shared.
- **Off-site consistency matters more than on-site tricks:** GitHub, LinkedIn, and any
  directory profile should carry the same name, photo, headline, and link back. That's what
  makes a name search resolve cleanly.
- Real content beats optimisation. Three genuine write-ups outrank any amount of meta tuning.

---

## 16. Success metrics

The site is a conversion instrument. Measure it as one.

**Primary (the only ones that really count)**
- Qualified inbound contacts per month — interviews, briefs, or offers.
- Contact-form / email-click conversion rate. *Target: ≥ 3% of sessions.*
- CV downloads per session.

**Secondary (leading indicators)**
- Bounce rate on `/`. *Target: < 45%.*
- Case-study open rate from homepage. *Target: ≥ 30%.*
- Median scroll depth on a case study. *Target: ≥ 70%.*
- Return-visitor share. *Target: ≥ 15%.*

**Quality gates (pass/fail, in CI)**
- Lighthouse ≥ 95 / 100 / 95 / 100 (perf / a11y / best-practices / SEO), mobile.
- Core Web Vitals all green in field data.
- Zero broken links, zero placeholder content, zero unverifiable claims.

**Qualitative — the real test**
Show the site to five people in the target audience for 30 seconds each, then ask what he
does and whether they'd contact him. If they can't answer the first question, no metric
above matters. Run this *before* Step 2 ships, using the current site as the baseline.

---

## Open questions — must be answered before Step 2

| # | Status | Question | Why it changes the design |
|---|---|---|---|
| **OPEN-1** | ✅ Resolved | Which biographical claims are verifiable? | See **D4** — none are claimed. No qualifications, no certifications, no dates. The work carries the proof. |
| **OPEN-2** | ✅ Resolved | Primary outcome and lead discipline. | See **D1** — all audiences, one evidence-led homepage, two doors. |
| **OPEN-3** | 🟡 Partially resolved | What real assets exist? | Photographs confirmed (**D2**). Credentials, live products, and testimonial-willing clients unconfirmed → treated as absent; trust strategy rewritten in §10a. |
| **OPEN-4** | 🟡 Answered with a recommendation | Full name, location/timezone, target market? | design-system §11: no city — *"Remote · works across timezones"*. Surname left blank pending confirmation (Vercel team slug says `brian-josiahs-projects`, git author says `Brian`). |
| **OPEN-5** | ✅ Resolved | Which products are deployed and functional? | **All five verified live at 200**, cross-checked against the Vercel account. Canonical URLs are now in the codebase. See design-system §1 — and **P7**, which is the one real risk. |
| **OPEN-6** | ✅ Resolved | Rebuild vs. retrofit. | See **D3** — keep repo, replace design layer wholesale. |

---

*End of Step 1. All blocking questions are resolved; Step 3 (build) is unblocked.
Carried forward, non-blocking: surname for CV/schema (**OPEN-4**), and **P7** — consolidating
DigiLearn and SafeSignal onto the Vercel team that can actually rebuild them.*
