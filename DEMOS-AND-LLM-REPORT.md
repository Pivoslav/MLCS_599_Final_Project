# Demos & tooling inventory — needs, costs, and design leverage (MLCS 599)

Single reference for **what exists**, **what it requires**, **what it consumes** (player / author / API), and **what it could change** about gameplay or how we frame the project. Last aligned with `canvas-interactive-demos/PENDING-TASKS.md` and `HOSTING-AND-INTEGRATION.md`.

---

## 1. Executive summary

| Layer | Role |
|-------|------|
| **Shipped game** | `index.html` + `css/game.css` + `js/game-*.js` — primary student experience. |
| **Demos hub** | `canvas-interactive-demos/` — vanilla, CDN-free labs; most mechanic ideas are **already merged** into the bundle; hub remains for Canvas paste tests and teaching. |
| **Author / LMS** | `canvas-rce-embed-fragment.html`, `canvas-self-test.html`, `HOSTING-AND-INTEGRATION.md`. |
| **Design narrative** | `co-op-cyoa-mechanics-report.html`, `cyoa-structure-map.html`. |
| **LLM (local only)** | Repo-root `tools/` + `Final/llm-lab.html` — **not** on GitHub Pages; token in `.env`; `python tools/dev_server.py`. |

**Largest unmerged gameplay knob:** **point budget** (`realm-triangle-budget.html`) — still optional in §A of `PENDING-TASKS.md`. **Largest content pass:** Read-along / primary-text quality (§B).

---

## 2. Canvas-interactive-demos — mechanic brainstorm pages

All live under `canvas-interactive-demos/demos/`. **Needs:** modern browser; open via static server or GitHub Pages (relative paths to `assets/demo-common.css`). **Take (players):** a few minutes each; no accounts. **Take (authors):** embed via iframe or link per `HOSTING-AND-INTEGRATION.md`.

| Demo | What it needs | What it takes | Shipped in bundle? | Gameplay / rethink opportunities |
|------|----------------|---------------|--------------------|-----------------------------------|
| **mechanic-winter-crisis-lab.html** | Same as hub | Low; read + click expand | **Yes** — crisis recap + die table | Deeper **pre-roll transparency** (threshold cards); tie oral debrief to “why this event” without spoiling prose. |
| **mechanic-path-deltas-and-hints.html** | Same | Low | **Yes** — choice `title` + pedagogy `details` | **Per-path tooltips** on more scenes; glossary links inside `details`; instructor “compare paths” slide from same UI. |
| **mechanic-breadcrumb-tension.html** | Same | Glance load | **Yes** — `#salometry` | Use **tension** to unlock **one line** of salon color or ambient key; optional “high tension” achievement. |
| **mechanic-co-op-timer-ballot.html** | Same | ~30s+ per gated beat | **Yes** — sidebar + three seat cards | **Stricter gating** on one climax scene; **role-only** ballots; export ballot summary to run summary. |
| **mechanic-debrief-epilogues.html** | Same | Medium reading | **Yes** — epilogue compare + peek dialog | **Fourth framing** experiment; peek as **assignable** (“cite the path you didn’t take”). |
| **mechanic-achievement-flash.html** | Same | Toast attention | **Yes** — `pushToast` | More **rare beats** tied to inventory + path; achievement text as **discussion prompts**. |
| **mechanic-url-and-summary.html** | Same | None | **Yes** — `?scene=` + run summary | **QR / short code** for runs; instructor **prefilled** scenes for section groups. |

---

## 3. Canvas-interactive-demos — original UI prototypes

| Demo | What it needs | What it takes | Shipped in bundle? | Gameplay / rethink opportunities |
|------|----------------|---------------|--------------------|-----------------------------------|
| **realm-balance-slider.html** | Same | Toy: redistributes fixed total | **Partial** — epilogue **debrief toy** only (not canonical meters) | Keep **non-canon**; could add “export sliders → forum post” for reflection. |
| **realm-triangle-budget.html** | Same | Co-op negotiation time | **No** — §A still open | **Pilot one scene:** spend budget before a fork; forces **explicit scarcity**; pairs with co-op timer. |
| **icons-showcase.html** | Same | Visual scan | **Partial** — choice-row dice/branch SVGs | Extend to **inventory rows**, glossary; **icon legend** page for TAs. |
| **interactive-widgets.html** | Same | Pattern catalog | Patterns ported | Reference for **new** modals / toasts without framework drift. |
| **canvas-self-test.html** | LMS iframe context | Author time | N/A — support | Run before term; documents **storage / button / SVG** quirks. |

**Hub:** `canvas-interactive-demos/index.html` lists all of the above with short “fun / educational” blurbs.

---

## 4. Python / LLM tooling (repo root `tools/`)

**Not student-facing on Pages.** Requires **Python ≥3.8**, `MLCS_599/.env` with `GITHUB_TOKEN` (PAT with GitHub Models access), and installs from `tools/requirements-github-models.txt` and optionally `tools/requirements-dev-server.txt`.

| Tool | Command / entry | What it needs | What it takes | Opportunities |
|------|------------------|---------------|---------------|----------------|
| **github_models_demo.py** | `python tools/github_models_demo.py` | `.env`, `azure-ai-inference`, `python-dotenv` | One chat round-trip; rate limits | Smoke test token; template for **batch scene tagging** scripts later. |
| **grok_cyoa_image_demo.py** | CLI flags `--kind`, `--brief`, optional `--text-only`, `--pollinations-preview` | Same + disk for `tools/output/` | Grok + optional broken image route | **Authoring pipeline:** JSON `image_prompt` / `alt_text` → human drops into `game-config.js` or asset briefs. |
| **cyoa_llm_core.py** | Imported by CLI + server | Same | N/A | Single place to adjust **art-direct** system prompt for period tone. |
| **dev_server.py** | `python tools/dev_server.py` | Flask stack (`requirements-dev-server.txt`) | Local port **8765** | **UI for non-coders:** `llm-lab.html` calls `POST /api/art-direct` — token never sent to browser. |
| **Final/llm-lab.html** | `http://127.0.0.1:8765/llm-lab.html` | Dev server running | User brief + Grok latency | **Proc-gen art direction** for cut scenes; **not** a replacement for narrative authority without human review. |

**Constraints:** GitHub Models **image** HTTP route has returned **404** in practice; treat **text / prompt** as reliable, **pixels** as external (Pollinations preview is third-party demo only).

**Docs:** `how_to_integrate_model.txt`, `.env.example`, `.gitignore` for `.env` and `tools/output/`.

---

## 5. Other HTML / ops artifacts

| Artifact | Needs | Takes | Opportunities |
|----------|--------|-------|----------------|
| **co-op-cyoa-mechanics-report.html** | Browser | Read time | Phased rollout; **effort vs payoff** when arguing for new co-op features. |
| **cyoa-structure-map.html** | Browser | Maintainer sync | After scene edits, **re-sync** per `PENDING-TASKS.md` §C. |
| **canvas-rce-embed-fragment.html** | Canvas RCE access | Paste + iframe height tune | Primary LMS delivery path. |
| **index.html** → **Art lab** link | Same origin as dev server | Student confusion if clicked on Pages | On static hosting, link may 404 API — acceptable if tooltip / README clarify **local only**. |

---

## 6. Synthesized opportunities (gameplay + “rethink the game”)

**Mechanics (near-term, low regret)**  
- Wire **point budget** once, on a **single** high-stakes choice (co-op path).  
- **Crisis preview card** (plain-language thresholds before roll) — teaches probability as historical argument.  
- **Tension-driven** single line of narration or ambient sound key when `data-tension="high"`.  
- **Ballot export** appended to run summary for forum / LMS submission.

**Pedagogy / structure**  
- **Read-along pass** (§B): less ornamental gloss, tighter tie to assigned editions (`SOURCES.md`).  
- **Branch peek** as **graded prompt**: students justify the path not taken using peek text only.  
- **Deep links** (`?scene=`) for **section breaks** in a 75-minute class.

**LLM (authoring, not canon)**  
- Grok outputs **structured art briefs** → human approves → `SCENE_IMAGES` / credits.  
- Optional **variant scene blurbs** for instructor-only fork (never auto-ship to students without review).  
- **Rethink:** separate **“canon CYOA”** (static, citable) from **“lab build”** (LLM-assisted assets behind dev server).

**Strategic**  
- If co-op is core identity, **solo mode** stays simple; **optional** panels stay gated.  
- If Canvas Files are locked, **GitHub Pages + iframe + new tab** remains the default story — don’t assume a backend in production.

---

## 7. Message for the main-branch agent (copy-paste)

Use this as a single turn or system note for whoever (human or Copilot) owns **`main`** next.

---

**Subject: MLCS 599 — demo inventory, merge status, and next safe moves**

You are working on **Russia at the Crossroads** (MLCS 599 CYOA). Canonical repo facts live in **`Final/.github/copilot-instructions.md`**, **`Final/HOSTING-AND-INTEGRATION.md`**, and **`Final/canvas-interactive-demos/PENDING-TASKS.md`**.

**Demos:** The folder **`Final/canvas-interactive-demos/`** is a **vanilla hub** (CDN-free) for prototypes. **Most mechanic demos listed there are already merged** into **`js/game-app.js`**, **`css/game.css`**, and **`index.html`**. Before proposing a “new” mechanic, grep the live bundle and read **`PENDING-TASKS.md` §A** — the main **optional** gap called out there is **point budget** (`realm-triangle-budget.html`), not yet wired in the shipped game.

**Non-negotiables:** Realms **`order` / `reform` / `people`** (0–100); paths **`west` | `slav` | `statist` | `med`**; respect **`prefers-reduced-motion`**; no full copyrighted primary text in-repo (see **`SOURCES.md`**).

**Hosting:** Students see **static** GitHub Pages and/or **Canvas iframe**; do not assume **`localStorage`**, full-screen iframe, or a secret backend. **`canvas-rce-embed-fragment.html`** is the LMS paste source.

**LLM:** Author-facing only. **`tools/dev_server.py`** + **`Final/llm-lab.html`** + **`.env`** (`GITHUB_TOKEN`) — **local machine**. Never embed tokens in **`js/`** or ship them on Pages. GitHub Models **chat** works for our Grok art-direct flow; **image generations** on `models.github.ai` have been **404** in practice — treat image output as **external** or preview-only. Full inventory: **`Final/DEMOS-AND-LLM-REPORT.md`**.

**Suggested next code task:** Pilot **point budget** in **one** scene (co-op), or **§B** narrative pass if mechanics are frozen for the term.

**Suggested next ops task:** Canvas fragment height pass + **`canvas-self-test.html`** in the target LMS; **`cyoa-structure-map.html`** sync after any structural narrative edit.

---

*End of handoff block.*

---

## 8. File index (quick)

| Path | Purpose |
|------|---------|
| `Final/DEMOS-AND-LLM-REPORT.md` | This document |
| `Final/canvas-interactive-demos/index.html` | Demos hub |
| `Final/canvas-interactive-demos/PENDING-TASKS.md` | Checklist |
| `Final/HOSTING-AND-INTEGRATION.md` | Deploy + merge table |
| `Final/.github/copilot-instructions.md` | Copilot / agent briefing |
| `Final/co-op-cyoa-mechanics-report.html` | Design report |
| `tools/dev_server.py` | Local server + `/api/art-direct` |
| `Final/llm-lab.html` | Browser UI for art-direct (local) |
