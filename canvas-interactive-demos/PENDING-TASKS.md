# Pending tasks (MLCS 599 CYOA + demos)

Checklist of work **not** done yet—merge into the **game bundle** (`index.html` + `css/`, `js/`), narrative, course ops. Update this file as items close.

---

## A. Merge demos into the shipped game (bundle)

- [ ] **Icons** — Lift SVGs from `demos/icons-showcase.html` into choice rows, inventory, glossary; add `aria-label` / `title`.
- [ ] **Toast + achievements** — Pattern from `mechanic-achievement-flash.html` + `interactive-widgets.html`; hook rare `sceneId` / inventory combos.
- [ ] **Path-weighted delta preview** — On choice focus/hover, show effects (from `mechanic-path-deltas-and-hints.html`); wire to real `pathId` and choice handlers.
- [ ] **Pedagogy hint** — Optional `details` under high-stakes choices; copy style from path-deltas demo.
- [ ] **Crisis / winter transparency** — Eligibility preview + `details` die table (`mechanic-winter-crisis-lab.html`); align text with real `pickCrisisEvent` tables.
- [x] **Breadcrumb + tension** — **Done in production:** header `#salometry`, `updateSalometry()`, spread = max − min meters, `html[data-tension="high"]` when spread ≥ 40, `prefers-reduced-motion` respected. Lab page: `mechanic-breadcrumb-tension.html` (vanilla only; no GSAP).
- [ ] **Co-op timer + ballot + stance** — gated controls for 3-player mode (`mechanic-co-op-timer-ballot.html`); respect reduced motion.
- [ ] **Debrief thesis picker + epilogue compare** — Post-run UI (`mechanic-debrief-epilogues.html`); read-only branch peek must not mutate `state`.
- [ ] **URL `?scene=`** — Parse query in `index.html`, jump or highlight (`mechanic-url-and-summary.html`); document allowed keys in README.
- [ ] **Copy summary** — Align with game’s existing copy; add course code / run id if instructors want (`mechanic-url-and-summary.html`).
- [ ] **Coupled sliders (optional)** — Only as labeled “debrief lab,” not replacing canonical meters (`realm-balance-slider.html`).
- [ ] **Point budget (optional)** — One pilot scene (`realm-triangle-budget.html`).

## B. Narrative & primary-text quality (from `js/game-app.js` BACKLOG comment)

- [ ] **Read alongside pass** — Text-grounded glosses; remove ornamental filler; crosswalk to McNally & Tempest + Arndt (library editions).
- [ ] **EPILOGUE_TWELVE** — Continue in-scene salon voice tuning; winter echo per event.
- [ ] **Scene imagery** — Diversify `SCENE_IMAGES` / rails where scenes reuse art; keep period-appropriate picks.
- [ ] **Optional palette** — `SCENE_COLOR_SCHEME` or per-`data-scene-id` tweaks once moods are locked.

## C. Authoring & structure docs

- [ ] **`cyoa-structure-map.html`** — Sync with any `scenes` / crisis / epilogue edits after merges.
- [ ] **`HOSTING-AND-INTEGRATION.md`** — Refresh prototype table if demo filenames or merge order change.

## D. Course / LMS operations

- [ ] **Canvas Page** — Paste updated `canvas-rce-embed-fragment.html` after iframe height tweaks; confirm link + iframe in target course.
- [ ] **Module item** — External URL to GitHub Pages if instructor prefers over custom Page.
- [ ] **Accessibility** — Spot-check WCAG AA on new UI after merges (focus, contrast, live regions).

## E. Repository / legal (optional)

- [ ] **Git history** — If a full-text PDF ever landed in old commits, purge history (BFG / git-filter-repo) per policy—only if required.
- [ ] **LICENSE** — Add explicit license file if course requires redistribution terms.

## F. Testing

- [ ] **Playthrough smoke** — One run per path after each mechanical merge.
- [ ] **Mobile / narrow** — Sidebar + choice layout on small viewports.
- [ ] **GitHub Pages** — Verify all new demo links from hub after each push.

---

When a section completes, move bullets to a “Done” appendix or delete them—keep this file honest for the next contributor.

---

## Done (shipped or superseded)

- **Breadcrumb + realm spread** — Live in `index.html` / `css/game.css` (`.salometry`, `.scene-crumb`, `.tension-*`) and `js/game-app.js` (`updateSalometry`, `animateChoiceButtonsIfNeeded`). Scene changes also use the **View Transitions API** where supported; **GSAP** (jsDelivr) staggers choice buttons only—demos intentionally stay CDN-free for Canvas paste tests.
