# Pending tasks (MLCS 599 CYOA + demos)

**Backlog (ideas / overhauls / later):** [`../BACKLOG.md`](../BACKLOG.md)  
**Phased plan:** [`../GAMEPLAN.md`](../GAMEPLAN.md)  
**Demo + LLM inventory:** [`../DEMOS-AND-LLM-REPORT.md`](../DEMOS-AND-LLM-REPORT.md)

This file holds **actionable** work on the **game bundle** (`index.html` + `css/`, `js/`) and **course ops**. Check boxes as you complete items.

**Maintainer direction:** treat the build as a **teaching instrument** (debrief prompts, copy summary, Read alongside, co-op). Add UI or query parameters only when they **earn** their space; trim fat as you go. No separate “class mode” URL layer unless requirements change.

**GAMEPLAN order (ship path first):** see **`../GAMEPLAN.md`** → **Progress tracker** for Phase 0 (deploy + Canvas self-test) through Phase 4. The execution queue below is mostly **bundle** work; Phase 0 **push** and **LMS self-test** live in **`../HOSTING-AND-INTEGRATION.md`** (Phase 0 checklist). **Phase 2b pilot:** dialogue portraits; **`../IMAGE_CREDITS.md`**, `SCENE_DIALOGUE_PORTRAITS` in `game-config.js`.

---

## Execution queue (do in order when chipping away)

1. [x] **Handoff accuracy:** `DEMOS-AND-LLM-REPORT.md` §7 reflects shipped mechanics (point budget, co-op seats).
2. [x] **`cyoa-structure-map.html`:** full maintainer re-sync Mar 2026 vs `game-scenes.js` + `EPILOGUE_TWELVE`; `resolve_endings` row documents realm budget, three-seat ballot, `#coopSeatsContext` beat excerpt.
3. [x] **Co-op ballot → run summary:** last **Reveal votes** line appended to **Copy run summary** when present (`state.lastCoopBallotReveal`).
4. [x] **`teaching-notes.html`:** static TA page: embed fragment, new tab, `?scene=`, links to docs.
5. [x] **Read-along pilot (intro):** edition pointer in first **Read alongside** block (McNally & Tempest; Arndt) per `SOURCES.md`.
6. [x] **Read-along pass (rest of game):** §B below. *Edition/citation guidance lives in syllabus, `README.md`, and `SOURCES.md`, not repeated in every Read alongside panel.*
7. [x] **Canvas course Page:** paste `canvas-rce-embed-fragment.html`; verify link in **your** LMS. *Fragment is new-tab hero (no iframe); confirm in Student View.*
8. [x] **Playthrough smoke:** one run per `pathId` after substantive changes (§F). *Automated graph check: `python tools/verify-scenes.py` (or `node tools/verify-scenes.js`); manual path runs still useful after big edits.*
9. [x] **Mobile / narrow pass:** co-op strip, realm budget panel, sidebar (§F). *Shipped: story-first column order ≤900px, safe-area padding/viewport-fit, realm budget stacks ≤560px, touch targets ≤480px, toasts respect safe area.*
10. [x] **Accessibility spot-check:** focus, contrast, live regions on new UI (§D). *Shipped: skip link → `#title`, `:focus-visible` on controls, copy summary uses `role="status"`.*

---

## A. Merge demos into the shipped game (bundle)

- [x] **Icons:** choice rows: dice/branch SVGs + `title`; **inventory** list + **Terms** modal: per-item / per-term inline SVGs (`game-config.js`); header **Terms** button book mark.
- [x] **Toast + achievements**
- [x] **Path-weighted delta preview:** `.choice-btn` titles + pedagogy `details`
- [x] **Pedagogy hint**
- [x] **Crisis / winter transparency**
- [x] **Breadcrumb (recent scenes):** `#salometry` / `#sceneCrumb`, `updateSalometry()`. *Mar 2026:* header **realm spread bar** removed; **compact O / R / P** values live in header meta; `mechanic-breadcrumb-tension.html` remains a **lab** demo only.
- [x] **Co-op timer + ballot + stance + three seats above choices**
- [x] **Debrief compare + branch peek**
- [x] **URL `?scene=`**
- [x] **Copy summary** (+ Run ID; + optional co-op reveal line)
- [x] **Coupled sliders (epilogue debrief toy)**
- [x] **Point budget pilot:** `resolve_endings` for every run (`getRealmBudgetPoolPoints`: 3/5/8 from winter total); co-op gating is for seat ballots only.

## B. Narrative & primary-text quality

- [x] **Read alongside pass:** in-panel glosses only; no repeated McNally/Arndt boilerplate on each `primaryRead.body`. *(Deeper quote rewrites / EPILOGUE voice remain optional.)*
- [x] **EPILOGUE_TWELVE (baseline):** salon voice; winter block: misfit lead-in + `winterEcho` + path coda (`game-app.js`).
- [ ] **EPILOGUE_TWELVE (parity pass, all 12):** editorial pass on **every** closing: **west / slav / statist / med** × **order / reform / people**; even weight, voice, winter tail, and discussion payoff (not only the most-played paths).
- [x] **Scene imagery:** `SCENE_IMAGES` / rails: diversified centers + `beat_med_bridge` rail swap (`game-config.js`).
- [x] **Optional palette:** `SCENE_COLOR_SCHEME` (`event_flood_echo`, `event_censor`); more scenes optional.

## C. Authoring & structure docs

- [x] **`cyoa-structure-map.html`:** full re-sync when `scenes` / crisis / epilogues change (§7 vs `EPILOGUE_TWELVE`). *Done Mar 2026: titles, §2D heading, implementation refs, scene-key cross-ref (incl. `session_format`), co-op seats context.*
- [x] **`HOSTING-AND-INTEGRATION.md`:** prototype table + iframe notes (living).

## D. Course / LMS operations

- [x] **Canvas Page (authoring pack):** fragment (new-tab), checklist, `teaching-notes.html`. *Confirm link in Student View.*
- [x] **Module item:** external URL path documented in `HOSTING-AND-INTEGRATION.md` §1 checklist item 8.
- [x] **Accessibility (bundle spot-check):** skip link, keyboard focus rings, copy feedback live region (see queue #10). *Full WCAG audit still optional.*

## E. Repository / legal (optional)

- [ ] **Git history purge:** **deferred / not planned** unless policy mandates → see **`../BACKLOG.md`**.

## F. Testing

- [x] **Playthrough smoke (static):** `tools/verify-scenes.py` / `verify-scenes.js` validate `choice.next` targets, `RESOLVE_PATH_LEAD` keys, `SCENE_COLOR_SCHEME` scene ids. *Per-path manual runs still recommended for UX.*
- [x] **Mobile / narrow:** queue #9 (layout + touch targets in CSS; device spot-check still useful).
- [x] **GitHub Pages:** verify demo hub links after each push. *Spot-check: site root + `canvas-interactive-demos/` return 200 (re-verify after major deploys).*

---

## Done (shipped or superseded)

- **Scene breadcrumb + compact meters:** recent scene titles in header; **O / R / P** in header meta (sidebar tall meters and epilogue historiography card removed Mar 2026). View Transitions + GSAP where supported.
- **§A bundle merges:** including co-op seats, point budget on `resolve_endings`, epilogue debrief, `?scene=`, `session_format` co-op preset, etc.
- **`teaching-notes.html`:** TA quick reference (queue #4).
