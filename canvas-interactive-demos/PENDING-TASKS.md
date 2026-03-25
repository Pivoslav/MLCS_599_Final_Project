# Pending tasks (MLCS 599 CYOA + demos)

Checklist of work **not** done yet—merge into the **game bundle** (`index.html` + `css/`, `js/`), narrative, course ops. Update this file as items close.

**Suggested next implementation (code):** §B **Read alongside** pass (content-heavy), or **`GAMEPLAN.md` Phase 2b** (LLM-assisted character briefs + static portraits). **Suggested next ops:** §D Canvas fragment refresh + §F smoke tests.

---

## A. Merge demos into the shipped game (bundle)

- [x] **Icons** — Choice rows use **dice / branch** inline SVGs + `title` / meter hints; optional polish: inventory rows, glossary headers (see `demos/icons-showcase.html`).
- [x] **Toast + achievements** — `pushToast`, achievement map, reduced-motion handling for toast stack.
- [x] **Path-weighted delta preview** — Effect summaries on **`.choice-btn`** via `title` (and pedagogy `details`); wired to real `pathId` / `commitChoice`.
- [x] **Pedagogy hint** — `details.choice-pedagogy` under choices.
- [x] **Crisis / winter transparency** — Collapsible die explanation + table in crisis recap; aligned with `pickCrisisEvent`.
- [x] **Breadcrumb + tension** — `#salometry`, spread, `data-tension="high"`. Lab: `mechanic-breadcrumb-tension.html`.
- [x] **Co-op timer + ballot + stance** — Sidebar panel (enable checkbox, timer, ballot, reveal, stance, apply majority); `prefers-reduced-motion` on toasts/co-op-adjacent CSS.
- [x] **Debrief compare + epilogue branch peek** — Post-run `details` + read-only `<dialog>` (backdrop click closes); no `state` mutation.
- [x] **URL `?scene=`** — `applySceneFromQuery` in `game-app.js`; allowed ids = keys of `scenes` in `game-scenes.js` (see README).
- [x] **Copy summary** — Run summary includes **Course: MLCS-599** and **Run ID** (`sessionStorage`).
- [x] **Coupled sliders (optional)** — Epilogue **Debrief toy: coupled realm sliders** (labeled; does not replace saved meters).
- [x] **Point budget (pilot)** — **`resolve_endings`** when **co-op tools** are on: spend **30** shared points across Order / Reform / People (cap 100), then framing choices appear (`REALM_BUDGET_POOL_POINTS` in `game-app.js`). Solo or co-op off: unchanged. Pattern: `realm-triangle-budget.html`.

## B. Narrative & primary-text quality (from `js/game-app.js` BACKLOG comment)

- [ ] **Read alongside pass** — Text-grounded glosses; remove ornamental filler; crosswalk to McNally & Tempest + Arndt (library editions).
- [ ] **EPILOGUE_TWELVE** — Continue in-scene salon voice tuning; winter echo per event.
- [ ] **Scene imagery** — Diversify `SCENE_IMAGES` / rails where scenes reuse art; keep period-appropriate picks.
- [x] **Optional palette** — `SCENE_COLOR_SCHEME` entries for `event_flood_echo` (frost) and `event_censor` (ember); more scenes can be keyed as moods lock.

## C. Authoring & structure docs

- [ ] **`cyoa-structure-map.html`** — Re-sync after any `scenes` / crisis / epilogue edits (spot-check §7 vs `EPILOGUE_TWELVE`).
- [x] **`HOSTING-AND-INTEGRATION.md`** — Prototype table + notes refreshed for merged mechanics.

## D. Course / LMS operations

- [ ] **Canvas Page** — Paste updated `canvas-rce-embed-fragment.html` after iframe height tweaks; confirm link + iframe in target course.
- [ ] **Module item** — External URL to GitHub Pages if instructor prefers over custom Page.
- [ ] **Accessibility** — Spot-check WCAG AA on new UI after merges (focus, contrast, live regions).

## E. Repository / legal (optional)

- [ ] **Git history** — If a full-text PDF ever landed in old commits, purge history (BFG / git-filter-repo) per policy—only if required.
- [x] **`LICENSE`** — MIT `LICENSE` in `Final/` for redistribution terms (adjust copyright line if your institution requires it).

## F. Testing

- [ ] **Playthrough smoke** — One run per path after each mechanical merge.
- [ ] **Mobile / narrow** — Sidebar + choice layout on small viewports (`.app-main` stacks ≤900px).
- [ ] **GitHub Pages** — Verify all new demo links from hub after each push.

---

When a section completes, move bullets to a “Done” appendix or delete them—keep this file honest for the next contributor.

---

## Done (shipped or superseded)

- **Breadcrumb + realm spread** — Live in `index.html` / `css/game.css` and `js/game-app.js`; View Transitions + GSAP stagger where supported.
- **Demo merges (§A)** — Toasts, crisis table, co-op panel + seats, epilogue debrief + peek, `?scene=`, choice icons/hints, realm debrief sliders, run summary, **point budget on `resolve_endings` (co-op on)** — see `js/game-app.js`, `css/game.css`, `index.html`.
- **Three-player layout** — **Three seat cards** above the choice column when co-op gating is on (speak order + per-seat vote + sidebar timer / reveal / apply).
