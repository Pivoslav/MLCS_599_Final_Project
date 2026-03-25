# Pending tasks (MLCS 599 CYOA + demos)

**Backlog (ideas / overhauls / later):** [`../BACKLOG.md`](../BACKLOG.md)  
**Phased plan:** [`../GAMEPLAN.md`](../GAMEPLAN.md)  
**Demo + LLM inventory:** [`../DEMOS-AND-LLM-REPORT.md`](../DEMOS-AND-LLM-REPORT.md)

This file holds **actionable** work on the **game bundle** (`index.html` + `css/`, `js/`) and **course ops**. Check boxes as you complete items.

---

## Execution queue (do in order when chipping away)

1. [x] **Handoff accuracy** — `DEMOS-AND-LLM-REPORT.md` §7 reflects shipped mechanics (point budget, co-op seats).
2. [x] **`cyoa-structure-map.html`** — `resolve_endings` row notes co-op **realm budget** (when tools on) + **three-seat ballot** (see `game-app.js`).
3. [x] **Co-op ballot → run summary** — Last **Reveal votes** line appended to **Copy run summary** when present (`state.lastCoopBallotReveal`).
4. [x] **`teaching-notes.html`** — Static TA page: embed fragment, new tab, `?scene=`, links to docs.
5. [x] **Read-along pilot (intro)** — Edition pointer in first **Read alongside** block (McNally & Tempest; Arndt) per `SOURCES.md`.
6. [ ] **Read-along pass (rest of game)** — §B below; scene-by-scene or scoped batches.
7. [ ] **Canvas course Page** — Paste `canvas-rce-embed-fragment.html`; verify iframe + link in **your** LMS.
8. [ ] **Playthrough smoke** — One run per `pathId` after substantive changes (§F).
9. [ ] **Mobile / narrow pass** — Co-op strip, realm budget panel, sidebar (§F).
10. [ ] **Accessibility spot-check** — Focus, contrast, live regions on new UI (§D).

---

## A. Merge demos into the shipped game (bundle)

- [x] **Icons** — Choice rows: dice/branch SVGs + `title`; optional polish: inventory / glossary (`icons-showcase.html`) → see **BACKLOG** if deferred.
- [x] **Toast + achievements**
- [x] **Path-weighted delta preview** — `.choice-btn` titles + pedagogy `details`
- [x] **Pedagogy hint**
- [x] **Crisis / winter transparency**
- [x] **Breadcrumb + tension**
- [x] **Co-op timer + ballot + stance + three seats above choices**
- [x] **Debrief compare + branch peek**
- [x] **URL `?scene=`**
- [x] **Copy summary** (+ Run ID; + optional co-op reveal line)
- [x] **Coupled sliders (epilogue debrief toy)**
- [x] **Point budget pilot** — `resolve_endings` when co-op tools on (`REALM_BUDGET_POOL_POINTS` = 30)

## B. Narrative & primary-text quality

- [ ] **Read alongside pass** — Full-game gloss pass; library editions (`SOURCES.md`). *(Intro pilot done in queue item 5.)*
- [ ] **EPILOGUE_TWELVE** — Salon voice; winter echo per event.
- [ ] **Scene imagery** — `SCENE_IMAGES` / rails variety.
- [x] **Optional palette** — `SCENE_COLOR_SCHEME` (`event_flood_echo`, `event_censor`); more scenes optional.

## C. Authoring & structure docs

- [ ] **`cyoa-structure-map.html`** — Full re-sync when `scenes` / crisis / epilogues change (§7 vs `EPILOGUE_TWELVE`). *Partial (2025-03): `resolve_endings` row + co-op notes.*
- [x] **`HOSTING-AND-INTEGRATION.md`** — Prototype table + iframe notes (living).

## D. Course / LMS operations

- [ ] **Canvas Page** — Paste fragment; confirm in target course.
- [ ] **Module item** — External URL to Pages if preferred.
- [ ] **Accessibility** — WCAG-style pass (see queue #10).

## E. Repository / legal (optional)

- [ ] **Git history purge** — Only if required by policy → **BACKLOG**.

## F. Testing

- [ ] **Playthrough smoke** — Queue #8.
- [ ] **Mobile / narrow** — Queue #9.
- [ ] **GitHub Pages** — Verify demo hub links after each push.

---

## Done (shipped or superseded)

- **Breadcrumb + realm spread** — `index.html` / `game.css` / `game-app.js`; View Transitions + GSAP where supported.
- **§A bundle merges** — Including co-op seats, point budget on `resolve_endings`, epilogue debrief, `?scene=`, etc.
- **`teaching-notes.html`** — TA quick reference (queue #4).
