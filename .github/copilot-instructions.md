# Copilot context — Russia at the Crossroads (MLCS 599)

Treat this file as the **canonical briefing** for this repository. Prefer it over generic CYOA or React patterns.

## Use for your project objectives

- **Course outcomes, Canvas delivery, and narrative quality are not moved by this file.** It does not run in the browser and students never see it.
- **It only helps** when a contributor uses **GitHub Copilot** (or similar) **in this repo**: fewer off-pattern suggestions (wrong stack, wrong stat names, citation slips).
- **Safe to ignore** if you edit without Copilot; delete the file if you prefer zero extra noise.

## Status (game bundle vs demos)

- Most mechanic merges listed in **`canvas-interactive-demos/PENDING-TASKS.md`** §A are **already implemented** in **`js/game-app.js`**, **`css/game.css`**, **`index.html`**. Before adding a “new” feature, read the live code; the optional **point-budget** pilot is still **not** wired in the bundle.

## What this is

- **Course artifact:** Interactive historical CYOA about Chaadaev’s *First Philosophical Letter* and Pushkin’s *The Bronze Horseman* (1830s Russian thought).
- **Audience:** University students; often **three-player co-op** (fixed roles **Order**, **Reform**, **People**) on **one screen**; may ship inside **Canvas** (iframe / external link) or **GitHub Pages**.
- **Tone:** Serious, historically grounded; **no** anachronistic meme voice. Salon is a **dramatization** of the letter’s epistolary form.

## Non-negotiables (game logic & copy)

- **Realm meters:** `order`, `reform`, `people` — integers **0–100**, shown in UI as **Order / Reform / People** (exact words).
- **Path IDs:** `west` | `slav` | `statist` | `med` (Westernizing / Slavophile / statist / mediator). Do not rename casually; `cyoa-structure-map.html` and saves depend on them.
- **Primary text:** Do **not** paste full copyrighted editions into the repo. Citations and edition pointers live in **`SOURCES.md`**. Paraphrase or short fair-use quotations only in narrative.
- **`prefers-reduced-motion`:** Any new animation or transition must respect reduced motion (pattern exists in **`css/game.css`**).

## Repository layout (post-refactor)

- **`index.html`** — Shell + glossary markup; links **`css/game.css`**, **`js/game-config.js`**, **`js/game-scenes.js`**, **`js/game-app.js`** (order matters).
- **`js/game-scenes.js`** — `scenes` object: narrative nodes, choices, effects. Primary **content** surface for story edits.
- **`js/game-app.js`** — State, rendering, crisis / epilogue logic (`EPILOGUE_TWELVE`, `pickCrisisEvent`, etc.). Primary **mechanics** surface.
- **`js/game-config.js`** — Images, ambient keys, inventory labels, static tables.
- **`canvas-interactive-demos/`** — **Vanilla** prototypes for UI/mechanics **before** merging into the game; no framework; no CDN. Hub: `canvas-interactive-demos/index.html`. Backlog: **`canvas-interactive-demos/PENDING-TASKS.md`**.
- **`HOSTING-AND-INTEGRATION.md`** — Canvas, GitHub Pages, iframe sizing, merge roadmap.
- **`co-op-cyoa-mechanics-report.html`** — Design report (effort vs payoff, co-op patterns).

## Implementation rules

- **Small diffs:** Change only what the task requires. Do not refactor unrelated code or rename public scene keys without an explicit migration plan.
- **Match existing style:** Naming, string style, and DOM patterns should match surrounding `game-app.js` / `game-scenes.js`.
- **New co-op UI:** Should be **optional** (e.g. gated on co-op mode or instructor flag) so solo play stays simple.
- **Canvas / LMS:** Do not assume `localStorage`, full-screen iframe, or Course Files upload. Prefer **degrading gracefully**. Demos use relative paths and inline or local CSS.
- **Accessibility:** Visible focus, `label` / `aria-*` for controls, do not convey meaning by color alone.

## When suggesting features

- Check **`PENDING-TASKS.md`** and **`HOSTING-AND-INTEGRATION.md`** for agreed direction before inventing parallel systems.
- Prefer **porting** a proven pattern from `canvas-interactive-demos/demos/` over greenfield UI.
- For **multiplayer mechanics**, see **`co-op-cyoa-mechanics-report.html`** for effort vs learning payoff and phased rollout.

## Do not

- Add **npm build steps** as a requirement for students or instructors unless explicitly requested.
- Embed **third-party CDNs** in shipped course-facing files without documenting risk (Canvas / mixed content).
- Replace the three-realm model with unrelated stats without labeling an experimental fork.
- Remove or rewrite **SOURCES.md** / citation discipline without explicit author request.

---

*This is repository guidance for GitHub Copilot. It is not a security credential. For Model Context Protocol (MCP) servers, reuse the same facts in server instructions or resource docs so tools and chat share one truth.*
