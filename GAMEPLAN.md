# Gameplan: MLCS 599 CYOA (Canvas + GitHub Pages)

Concise phased plan for **Russia at the Crossroads**. Canonical constraints and inventories: **`.github/copilot-instructions.md`**, **`HOSTING-AND-INTEGRATION.md`**, **`canvas-interactive-demos/PENDING-TASKS.md`**, **`DEMOS-AND-LLM-REPORT.md`**.

---

## Product stance

- **Canvas:** compliant entry (paste fragment → **new tab**); optional iframe if you add it; assume embed quirks and unreliable `localStorage` when iframed.
- **Full play:** same **GitHub Pages** URL opened in a **new tab/window**; default for readability, co-op layout, and any feature that needs space or storage.
- **Ship:** static files only; **no API keys or tokens** in anything students load (`js/`, Pages, Canvas RCE).

---

## Phase 0; Ship path (1–2 focused sessions)

| Task | Detail | Done when |
|------|--------|-----------|
| **Commit & push** | `Final/` matches `main` and deploys to GitHub Pages. | Clean `git status`; live site matches repo. |
| **Canvas fragment** | `canvas-rce-embed-fragment.html`: **full-width new-tab hero** to Pages game (no default iframe). Optional: add your own iframe + height per `HOSTING-AND-INTEGRATION.md`. | Acceptable in RCE; link works in Student View. |
| **LMS self-test** | Run `canvas-interactive-demos/demos/canvas-self-test.html` (or equivalent) **inside the target Canvas** once. | Quirks noted in `HOSTING-AND-INTEGRATION.md` or fragment comments. |

---

## Phase 1: Reliability & docs (low risk)

| Task | Detail | Done when |
|------|--------|-----------|
| **Degradation** | Document iframe vs new-tab: `sessionStorage`, run ID, co-op; behave sensibly when storage fails. | Short subsection in `HOSTING-AND-INTEGRATION.md` / README if needed. |
| **Structure map** | After any **scene / crisis / epilogue** edit: spot-check `cyoa-structure-map.html` vs `game-scenes.js` / `EPILOGUE_TWELVE`. | §C in `PENDING-TASKS.md` records last full sync; bump it when you change structure. |

---

## Phase 2: Gameplay (pick one track for the term)

**Track A: Mechanics**

| Task | Detail | Done when |
|------|--------|-----------|
| **Point-budget pilot** | Wire `realm-triangle-budget.html` pattern to **one** high-stakes scene; gate with existing **co-op** flow where possible; show spend + unlock choices after commit. | **Done:** `resolve_endings` + co-op tools on; pool is **3 / 5 / 8** from the same winter totals as `pickCrisisEvent` (`getRealmBudgetPoolPoints`). Extend to other scenes only if playtests ask. |

**Track B: Narrative / copy**

| Task | Detail | Done when |
|------|--------|-----------|
| **Read-along pass** | `PENDING-TASKS.md` §B: glosses tied to assigned editions (`SOURCES.md`); trim filler. | Scoped checklist closed (full or “scenes X–Y”). |
| **Epilogue / winter** | `EPILOGUE_TWELVE` voice and winter echo consistency. | Targeted edits + one pass per `pathId`. |

*Recommendation:* one of **A** or **B** unless two owners.

---

## Phase 2b: GitHub LLM + character images for dialogue (author pipeline)

**Goal:** Optional **portraits or scene illustrations** next to named dialogue / salon voices, **without** calling models from the student bundle.

**Reality check (from `DEMOS-AND-LLM-REPORT.md`):** GitHub Models **chat** (e.g. Grok art-direction) is usable locally; **image HTTP** on `models.github.ai` has **404’d in practice**. Plan for **text outputs** (prompts, alt text, consistency notes) as the reliable part; **pixels** come from human-approved export (see below).

**Author-only stack (already in repo):**

- `tools/dev_server.py` + `Final/llm-lab.html`; `POST /api/art-direct`; token stays in **`.env`** (`GITHUB_TOKEN`), never in shipped JS.
- `tools/grok_cyoa_image_demo.py`, `tools/cyoa_llm_core.py`; CLI / shared prompts for period-appropriate art briefs.

**Suggested workflow**

1. **Character bible (LLM-assisted):** for each recurring voice (salon members, historical figures as dramatis personae), run the lab or CLI to produce: **short bio blurb**, **visual prompt paragraph**, **alt text**, **era/costume guardrails** (no modern anachronisms). Human edits every line.
2. **Image generation (off critical path):** use whichever **author-side** tool actually returns pixels (manual illustration, campus-approved gen tool, or experimental preview paths documented in `grok_cyoa_image_demo.py`). Treat Pollinations / demos as **preview-only** unless policy allows production use.
3. **Commit static assets:** save **WebP or PNG** under something like `Final/assets/characters/` (or extend existing image maps in `game-config.js`). **Credit line** in `scene-bg-source` pattern or a small `IMAGE_CREDITS.md` if needed.
4. **Wire the game (static):** **`SCENE_DIALOGUE_PORTRAITS`** in **`game-config.js`** (per `sceneId`: `src`, `alt`, `caption`, optional `creditHref`). **`updateSceneDialoguePortrait()`** in **`game-app.js`** fills **`#sceneDialoguePortrait`** between title and body. **`prefers-reduced-motion: reduce`** skips entrance animation; every image has **`alt`**.
5. **Scope v1:** pilot **2–4 characters × 1 pose** (or one illustration per **beat**, not per line). Avoid combinatorial explosion.

**Done when**

- **Shipped Mar 2026:** dialogue portraits on **`intro`**, **`salon_pushkin`**, major **path / crisis / event** beats (Chaadaev, Pushkin, Aksakov, Benckendorff, Nicholas I; all Commons); see **`IMAGE_CREDITS.md`**.
- README or `DEMOS-AND-LLM-REPORT.md` notes that **LLM generates briefs locally**; **Pages serves only static files** (portraits are **not** model-generated at runtime).

**Explicit non-goals for v1**

- No **runtime** image generation in the browser.
- No **copyrighted** reference uploads into the repo; prompts describe style, not “copy this painting.”

---

## Phase 3: Polish (no new rules)

| Task | Detail | Done when |
|------|--------|-----------|
| **Icons** | Extend choice-row SVG pattern to **inventory** / glossary (`icons-showcase.html`). | **Done Mar 2026:** `ITEM_ICONS` + `GLOSSARY_ICON_BY_KEY`, `wireGlossaryIcons`, Terms button book mark; sidebar + modal OK. |
| **Optional query presets** | e.g. `?classMode=1` for default co-op or teaching UI; only if one URL must differ for Canvas vs open play. | Documented in README; default unchanged without param. |

---

## Phase 3b: Deepen shipped mechanics (optional; design + narrative)

Use when you **like the UI** but want **more meaning** (tension, crisis, achievements, path deltas), not a new framework.

| Direction | Detail | Canonical notes |
|-----------|--------|-----------------|
| **Achievement + inventory flash** | More rare `ACH_TOAST` beats; optional stronger visual ping on new item; avoid spam in a longer run. | `BACKLOG.md` → *Author direction* |
| **Tension spread** | Stakes: copy line, co-op prompt, soft explainer, or (carefully) crisis weighting, `updateSalometry` / `data-tension` already exist. | same |
| **Path-weighted deltas** | Audit scenes; keyboard/focus parity; glossary inside `details`. | same |
| **Crisis card + randomness + length** | Crisis **preview** before roll; **additional** light random events mid-run; **longer** arc via real branches (map first in `cyoa-structure-map.html`). | same |

---

## Phase 4: Course ops (parallel)

| Task | Detail | Done when |
|------|--------|-----------|
| **Instructor page** | Optional static `teaching-notes.html` (repo link, not RCE): embed snippet, new-tab rule, `?scene=` pointer. | Linked from README or repo wiki. |
| **LLM hygiene** | `.env` gitignored; `llm-lab.html` clearly **local-only** on Pages (404 API is OK). | Matches `DEMOS-AND-LLM-REPORT.md` §4–5. |

---

## Success criteria (term)

- Play works from **Canvas** and **new tab** without firefighting.
- **One** substantive upgrade: **point budget** *or* **§B narrative slice** *or* **Phase 2b pilot** (character image + wiring), documented in **`PENDING-TASKS.md`** where relevant.
- Repo, Pages, and Canvas fragment stay **in sync** after Phase 0.

---

## Suggested order

1. Phase 0 → Phase 1.  
2. Phase 2 **Track A or B**.  
3. **Phase 2b** in parallel or right after Phase 0 if art ownership is clear (does not require Track A/B to finish).  
4. Phase 3 → **Phase 3b** (optional: deepen tension / crisis / achievements / deltas per `BACKLOG.md`) → Phase 4 as bandwidth allows.

---

## Progress tracker (living)

Use this to see **what is done in-repo** vs **what you still do in Canvas / git**. Update checkboxes when you close items.

| Phase | Item | Status |
|-------|------|--------|
| **0** | **`canvas-rce-embed-fragment.html`** new-tab hero | Done in repo |
| **0** | **Commit & push** `Final/` → branch that deploys Pages | Instructor / maintainer (not automatic here) |
| **0** | **LMS self-test:** run `canvas-interactive-demos/demos/canvas-self-test.html` inside **your** Canvas; note quirks | Instructor (see **HOSTING-AND-INTEGRATION.md** §1 “Phase 0 checklist”) |
| **1** | **Degradation docs:** iframe / `sessionStorage` / co-op / run ID | Done (**HOSTING-AND-INTEGRATION.md** §1; **README** pointer) |
| **1** | **Structure map** vs `game-scenes.js` / `EPILOGUE_TWELVE` | Done Mar 2026 (**PENDING-TASKS** §C) |
| **2** | **Track A** point budget on `resolve_endings` | Shipped (co-op tools on) |
| **2** | **Track B** read-along + epilogue / winter pass | Shipped per **PENDING-TASKS** §B |
| **2b** | Character portrait pilot (static asset + wiring) | **Done Mar 2026:** paths, crises, events in **`SCENE_DIALOGUE_PORTRAITS`**; **`IMAGE_CREDITS.md`** |
| **3** | Icons → inventory / glossary | **Done** (inventory chips + glossary `data-gloss-icon` + Terms button mark) |
| **3** | Query presets (e.g. `?classMode=`) | Optional |
| **4** | **`teaching-notes.html`** | Shipped |
| **4** | **LLM hygiene** (`.env`, lab local-only) | Documented (**DEMOS-AND-LLM-REPORT.md**) |

**Next in order after you reopen the course page:** finish **Phase 0** rows you control (push + Canvas self-test notes). More faces: add **`sceneId`** keys to **`SCENE_DIALOGUE_PORTRAITS`** (e.g. mediator beats, `event_flood_echo`) or host under **`assets/characters/`**.

---

*Living document; adjust dates and owners in commit messages when this file changes.*
