# Pending tasks (MLCS 599 CYOA + demos)

**Backlog (ideas / overhauls / later):** [`../BACKLOG.md`](../BACKLOG.md)  
**Phased plan:** [`../GAMEPLAN.md`](../GAMEPLAN.md)  
**Demo + LLM inventory:** [`../DEMOS-AND-LLM-REPORT.md`](../DEMOS-AND-LLM-REPORT.md)

This file holds **actionable** work on the **game bundle** (`index.html` + `css/`, `js/`) and **course ops**. Check boxes as you complete items.

**GAMEPLAN order (ship path first):** see **`../GAMEPLAN.md`** → **Progress tracker** for Phase 0 (deploy + Canvas self-test) through Phase 4. The execution queue below is mostly **bundle** work; Phase 0 **push** and **LMS self-test** live in **`../HOSTING-AND-INTEGRATION.md`** (Phase 0 checklist). **Phase 2b pilot:** dialogue portraits — **`../IMAGE_CREDITS.md`**, `SCENE_DIALOGUE_PORTRAITS` in `game-config.js`.

---

## Execution queue (do in order when chipping away)

1. [x] **Handoff accuracy** — `DEMOS-AND-LLM-REPORT.md` §7 reflects shipped mechanics (point budget, co-op seats).
2. [x] **`cyoa-structure-map.html`** — Full maintainer re-sync Mar 2026 vs `game-scenes.js` + `EPILOGUE_TWELVE`; `resolve_endings` row documents realm budget, three-seat ballot, `#coopSeatsContext` beat excerpt.
3. [x] **Co-op ballot → run summary** — Last **Reveal votes** line appended to **Copy run summary** when present (`state.lastCoopBallotReveal`).
4. [x] **`teaching-notes.html`** — Static TA page: embed fragment, new tab, `?scene=`, links to docs.
5. [x] **Read-along pilot (intro)** — Edition pointer in first **Read alongside** block (McNally & Tempest; Arndt) per `SOURCES.md`.
6. [x] **Read-along pass (rest of game)** — §B below. *Edition/citation guidance lives in syllabus, `README.md`, and `SOURCES.md`—not repeated in every Read alongside panel.*
7. [x] **Canvas course Page** — Paste `canvas-rce-embed-fragment.html`; verify link in **your** LMS. *Fragment is new-tab hero (no iframe); confirm in Student View.*
8. [x] **Playthrough smoke** — One run per `pathId` after substantive changes (§F). *Automated graph check: `python tools/verify-scenes.py` (or `node tools/verify-scenes.js`); manual path runs still useful after big edits.*
9. [x] **Mobile / narrow pass** — Co-op strip, realm budget panel, sidebar (§F). *Shipped: story-first column order ≤900px, safe-area padding/viewport-fit, realm budget stacks ≤560px, touch targets ≤480px, toasts respect safe area.*
10. [x] **Accessibility spot-check** — Focus, contrast, live regions on new UI (§D). *Shipped: skip link → `#title`, `:focus-visible` on controls, copy summary uses `role="status"`.*

---

## A. Merge demos into the shipped game (bundle)

- [x] **Icons** — Choice rows: dice/branch SVGs + `title`; **inventory** list + **Terms** modal: per-item / per-term inline SVGs (`game-config.js`); header **Terms** button book mark.
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

- [x] **Read alongside pass** — In-panel glosses only; no repeated McNally/Arndt boilerplate on each `primaryRead.body`. *(Deeper quote rewrites / EPILOGUE voice remain optional.)*
- [x] **EPILOGUE_TWELVE** — Salon voice; winter block: misfit lead-in + `winterEcho` + path coda (`game-app.js`).
- [x] **Scene imagery** — `SCENE_IMAGES` / rails: diversified centers + `beat_med_bridge` rail swap (`game-config.js`).
- [x] **Optional palette** — `SCENE_COLOR_SCHEME` (`event_flood_echo`, `event_censor`); more scenes optional.

## C. Authoring & structure docs

- [x] **`cyoa-structure-map.html`** — Full re-sync when `scenes` / crisis / epilogues change (§7 vs `EPILOGUE_TWELVE`). *Done Mar 2026: titles, §2D heading, implementation refs, 31-key cross-ref, co-op seats context.*
- [x] **`HOSTING-AND-INTEGRATION.md`** — Prototype table + iframe notes (living).

## D. Course / LMS operations

- [x] **Canvas Page (authoring pack)** — Fragment (new-tab), checklist, `teaching-notes.html`. *Confirm link in Student View.*
- [x] **Module item** — External URL path documented in `HOSTING-AND-INTEGRATION.md` §1 checklist item 8.
- [x] **Accessibility (bundle spot-check)** — Skip link, keyboard focus rings, copy feedback live region (see queue #10). *Full WCAG audit still optional.*

## E. Repository / legal (optional)

- [ ] **Git history purge** — Only if required by policy → **BACKLOG**.

## F. Testing

- [x] **Playthrough smoke (static)** — `tools/verify-scenes.py` / `verify-scenes.js` validate `choice.next` targets, `RESOLVE_PATH_LEAD` keys, `SCENE_COLOR_SCHEME` scene ids. *Per-path manual runs still recommended for UX.*
- [x] **Mobile / narrow** — Queue #9 (layout + touch targets in CSS; device spot-check still useful).
- [x] **GitHub Pages** — Verify demo hub links after each push. *Spot-check: site root + `canvas-interactive-demos/` return 200 (re-verify after major deploys).*

---

## Done (shipped or superseded)

- **Breadcrumb + realm spread** — `index.html` / `game.css` / `game-app.js`; View Transitions + GSAP where supported.
- **§A bundle merges** — Including co-op seats, point budget on `resolve_endings`, epilogue debrief, `?scene=`, etc.
- **`teaching-notes.html`** — TA quick reference (queue #4).
