# Gameplan — MLCS 599 CYOA (Canvas + GitHub Pages)

Concise phased plan for **Russia at the Crossroads**. Canonical constraints and inventories: **`.github/copilot-instructions.md`**, **`HOSTING-AND-INTEGRATION.md`**, **`canvas-interactive-demos/PENDING-TASKS.md`**, **`DEMOS-AND-LLM-REPORT.md`**.

---

## Product stance

- **Canvas:** compliant entry (iframe + paste fragment); assume embed quirks and unreliable `localStorage`.
- **Full play:** same **GitHub Pages** URL opened in a **new tab/window** — default for readability, co-op layout, and any feature that needs space or storage.
- **Ship:** static files only; **no API keys or tokens** in anything students load (`js/`, Pages, Canvas RCE).

---

## Phase 0 — Ship path (1–2 focused sessions)

| Task | Detail | Done when |
|------|--------|-----------|
| **Commit & push** | `Final/` matches `main` and deploys to GitHub Pages. | Clean `git status`; live site matches repo. |
| **Canvas fragment** | `canvas-rce-embed-fragment.html`: iframe `src` = Pages game; **prominent “Open in new tab”** to the same URL; **height** tuned (e.g. 900–1000px) in a real Canvas preview. | Acceptable in RCE; link works. |
| **LMS self-test** | Run `canvas-interactive-demos/demos/canvas-self-test.html` (or equivalent) **inside the target Canvas** once. | Quirks noted in `HOSTING-AND-INTEGRATION.md` or fragment comments. |

---

## Phase 1 — Reliability & docs (low risk)

| Task | Detail | Done when |
|------|--------|-----------|
| **Degradation** | Document iframe vs new-tab: `sessionStorage`, run ID, co-op — behave sensibly when storage fails. | Short subsection in `HOSTING-AND-INTEGRATION.md` / README if needed. |
| **Structure map** | After any **scene / crisis / epilogue** edit: spot-check `cyoa-structure-map.html` vs `game-scenes.js` / `EPILOGUE_TWELVE`. | Map accurate or dated caveat in §C of `PENDING-TASKS.md`. |

---

## Phase 2 — Gameplay (pick one track for the term)

**Track A — Mechanics**

| Task | Detail | Done when |
|------|--------|-----------|
| **Point-budget pilot** | Wire `realm-triangle-budget.html` pattern to **one** high-stakes scene; gate with existing **co-op** flow where possible; show spend + unlock choices after commit. | One scene works; `PENDING-TASKS.md` §A updated. |

**Track B — Narrative / copy**

| Task | Detail | Done when |
|------|--------|-----------|
| **Read-along pass** | `PENDING-TASKS.md` §B: glosses tied to assigned editions (`SOURCES.md`); trim filler. | Scoped checklist closed (full or “scenes X–Y”). |
| **Epilogue / winter** | `EPILOGUE_TWELVE` voice and winter echo consistency. | Targeted edits + one pass per `pathId`. |

*Recommendation:* one of **A** or **B** unless two owners.

---

## Phase 2b — GitHub LLM + character images for dialogue (author pipeline)

**Goal:** Optional **portraits or scene illustrations** next to named dialogue / salon voices, **without** calling models from the student bundle.

**Reality check (from `DEMOS-AND-LLM-REPORT.md`):** GitHub Models **chat** (e.g. Grok art-direction) is usable locally; **image HTTP** on `models.github.ai` has **404’d in practice**. Plan for **text outputs** (prompts, alt text, consistency notes) as the reliable part; **pixels** come from human-approved export (see below).

**Author-only stack (already in repo):**

- `tools/dev_server.py` + `Final/llm-lab.html` — `POST /api/art-direct`; token stays in **`.env`** (`GITHUB_TOKEN`), never in shipped JS.
- `tools/grok_cyoa_image_demo.py`, `tools/cyoa_llm_core.py` — CLI / shared prompts for period-appropriate art briefs.

**Suggested workflow**

1. **Character bible (LLM-assisted)** — For each recurring voice (salon members, historical figures as dramatis personae), run the lab or CLI to produce: **short bio blurb**, **visual prompt paragraph**, **alt text**, **era/costume guardrails** (no modern anachronisms). Human edits every line.
2. **Image generation (off critical path)** — Use whichever **author-side** tool actually returns pixels (manual illustration, campus-approved gen tool, or experimental preview paths documented in `grok_cyoa_image_demo.py`). Treat Pollinations / demos as **preview-only** unless policy allows production use.
3. **Commit static assets** — Save **WebP or PNG** under something like `Final/assets/characters/` (or extend existing image maps in `game-config.js`). **Credit line** in `scene-bg-source` pattern or a small `IMAGE_CREDITS.md` if needed.
4. **Wire the game (static)** — Extend **`game-config.js`** with a map `CHARACTER_PORTRAITS` or per-`sceneId` optional `dialogueImage: { src, alt, caption }`. In **`game-app.js`**, render a compact **figure** beside or above dialogue when the current scene declares a speaker/image key. Respect **`prefers-reduced-motion`** (no gratuitous entrance on portrait); **no meaning by color alone**; **alt** required.
5. **Scope v1** — Pilot **2–4 characters × 1 pose** (or one illustration per **beat**, not per line). Avoid combinatorial explosion.

**Done when**

- At least **one** dialogue-heavy scene shows a **committed** image with **alt text** and passes a quick a11y glance.
- README or `DEMOS-AND-LLM-REPORT.md` notes that **LLM generates briefs locally**; **Pages serves only static files**.

**Explicit non-goals for v1**

- No **runtime** image generation in the browser.
- No **copyrighted** reference uploads into the repo; prompts describe style, not “copy this painting.”

---

## Phase 3 — Polish (no new rules)

| Task | Detail | Done when |
|------|--------|-----------|
| **Icons** | Extend choice-row SVG pattern to **inventory** / glossary (`icons-showcase.html`). | No sidebar/modal breakage. |
| **Optional query presets** | e.g. `?classMode=1` for default co-op or teaching UI — only if one URL must differ for Canvas vs open play. | Documented in README; default unchanged without param. |

---

## Phase 4 — Course ops (parallel)

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
4. Phase 3–4 as bandwidth allows.

---

*Living document; adjust dates and owners in commit messages when this file changes.*
