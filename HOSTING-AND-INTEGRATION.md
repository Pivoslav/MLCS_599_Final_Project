# Hosting, Canvas, and future game integrations

This file is the **project memory** for how we ship the CYOA and how we plan to fold prototype UI into `index.html`. It lives on **`main`** so GitHub and collaborators see it without digging through chat.

---

## 1. What we learned (hosting & Canvas)

### GitHub Pages (primary when Course Files are locked)

- **Live game:** [https://pivoslav.github.io/MLCS_599_Final_Project/](https://pivoslav.github.io/MLCS_599_Final_Project/)
- **Demos hub:** [https://pivoslav.github.io/MLCS_599_Final_Project/canvas-interactive-demos/](https://pivoslav.github.io/MLCS_599_Final_Project/canvas-interactive-demos/)
- **Setup:** Repository **Settings → Pages → Deploy from branch `main`, folder `/ (root)`** so `index.html` is the site root.
- **Why:** In some courses, the designer role **cannot upload to Canvas Files**; external HTTPS hosting avoids that entirely.

### Canvas Pages (Rich Content Editor, HTML view)

- **Do not** paste the full `index.html` into the RCE. Canvas **sanitizes** HTML and often **strips `<script>`**, which breaks the game.
- **Default paste:** `canvas-rce-embed-fragment.html`; a **full-width hero** with a single **“Open game in new tab”** control (no iframe). The CYOA needs horizontal space for realm meters, co-op seats, and text; a narrow Canvas column + small iframe was a poor fit.
- **Optional:** If you still want an in-page embed, add your own `<iframe src="https://…GitHub Pages…/" …>` below the link and tune **`height`** / **`min-height`** (often **900–1100px**). Prefer **Canvas Files `…/preview`** or GitHub Pages as `src`. Many schools **block** third-party iframes; the new-tab link remains the reliable path.
- **Paste:** copy the outer `<div>…</div>` from `canvas-rce-embed-fragment.html` into **Page → Edit → HTML View**.

### Canvas Page checklist (instructor)

1. **Course → Pages → + Page** (or edit an existing module page).
2. **Title** e.g. “Russia at the Crossroads (game)”.
3. **Edit** → open the **HTML / raw code** editor (Canvas labels vary: “HTML Editor,” “</>,” or “Switch to raw HTML editor”).
4. Paste the **entire** contents of **`canvas-rce-embed-fragment.html`** (one outer `<div>…</div>` wrapper).
5. **Save** (and **Publish** when ready).
6. **Student View** (or an incognito window): confirm the **Open game in new tab** control and the plain URL both reach the live game.
7. Optional: add the page to a **Module** as a “Page” item, or create a **Module → External URL** item pointing at the same GitHub Pages root if you prefer not to use the RCE at all.
8. **External URL module item (instructor):** In **Modules → + → External URL**, paste the **GitHub Pages** game URL (or your course’s public Canvas Page URL if students can open it without login). Enable **Load in New Tab** (recommended). Title it like the assignment syllabus. Use this when you want zero RCE paste and a single link in the module outline.

See also **`teaching-notes.html`** (short TA summary with links to this file and the fragment).

### Phase 0 checklist (instructor; do before term stress)

Do these **in order** once your GitHub Pages URL (or substitute host) is live:

1. **Deploy parity:** confirm the **same** `index.html`, `css/`, and `js/` you tested locally are what Pages serves (hard refresh; bump `?v=` on assets in `index.html` if students see stale script).
2. **Canvas Page:** paste **`canvas-rce-embed-fragment.html`**. **Student View:** open the game in a **new tab**; play one choice and go back.
3. **LMS self-test:** host or paste **`canvas-interactive-demos/demos/canvas-self-test.html`** inside **your** Canvas (RCE HTML view, or upload to **Files** and link **`/preview`** if your school allows). Run the on-page checks; note whether **`localStorage`** throws, whether `<button>` vs `<input type="button">` matters, and any console errors that are **not** browser extensions. Append a one-line note at the bottom of this section or in your course wiki: *“Canvas self-test YYYY-MM-DD: …”* so future you knows the environment.

The **shipped game** does not require storage for core play; **`getRunId()`** falls back when **`sessionStorage`** is blocked (run summary may show **`R-local`**). Co-op is still best in a **full tab**, not a narrow iframe.

### Optional iframe (if you add one yourself)

- Canvas **content column width** is fixed; the shipped fragment no longer includes an iframe so students default to a **full browser tab**.
- If you paste an iframe: set **`width="100%"`**, **`height`** around **900–1100**, and optionally **`min-height`** in inline CSS; keep a **new-tab** link as fallback when iframes are blocked.

### `canvas-interactive-demos` self-test (LMS quirks)

- Prefer **`<input type="button">`** and **link fallbacks** where hosts strip `<button>`.
- **`localStorage`** may fail in embedded contexts; treat **graceful degradation** as success (in-memory / session-only state).
- **`window.onerror`:** filter extension noise when attributing failures to the page.

### Shipped game: iframe vs new tab (storage, co-op, run summary)

- **`sessionStorage`:** Some LMS embeds block or partition storage for third-party iframes. **`getRunId()`** in `js/game-app.js` falls back to **`R-local`** in the copied run summary when storage throws; gameplay is unchanged. **Co-op gating** defaults **on**; the flag is **`mlcs599_coop_tools_enabled`** (`1` / `0`). If storage throws, the UI still defaults to co-op on for that session. Share **`?coop=0`** (or `off`) for links that should open with co-op off.
- **Co-op:** The three-seat ballot is **intended for a full tab**; the Canvas fragment sends students there by default (`canvas-rce-embed-fragment.html`).
- **Phased delivery:** **`GAMEPLAN.md`** (Canvas + Pages + optional LLM-assisted art pipeline).

### Public repository hygiene

- Removed from **`main`:** full primary-text dumps (PDF/txt poem and letter extracts), internal alignment notes, PDF tooling scripts, **copyright and clutter** reasons. Citations remain in **`SOURCES.md`**.

### Motion stack (shipped game, optional CDN)

- **View Transitions API** (`document.startViewTransition`): cross-fades the main scene column where the browser supports it (e.g. Chromium, Safari 18+). Unsupported browsers run the same paint with no transition.
- **GSAP 3** (pinned on **jsDelivr** in `index.html`): light **stagger** on choice buttons after each scene paint. If the CDN is blocked, the game still runs; only the entrance motion is skipped.
- **`prefers-reduced-motion: reduce`:** turns off View Transition animations, GSAP staggers, and the CSS transitions on the realm-spread bar (tension strip). Realm column meters still update; reduced-motion also clears their height transition in CSS. The same flag **disables** optional header **Ambient** sound (`js/game-ambient-audio.js`).

### Optional ambient audio (no CDN, no files)

- **`game-ambient-audio.js`:** Web Audio API only (oscillators + short noise loops). **Opt-in** via **Ambient** toggle; preference in **`sessionStorage`** (`mlcs599_ambient_enabled`). Crossfades when **`data-ambient`** changes (from **`SCENE_AMBIENT`** in `game-config.js`). Not for strict autoplay policies: first user interaction may be needed before the context unsuspends in some browsers.

---

## 2. Long-term goal: integrate prototype tools into the game bundle (`index.html` + `js/`, `css/`)

The folder **`canvas-interactive-demos/`** holds **vanilla** patterns meant to be **merged** into the main game later. Integration should:

- Reuse existing **`state.stats`** (`order`, `reform`, `people`, 0–100) and **`pathId`** (`west` | `slav` | `statist` | `med`).
- Keep **`prefers-reduced-motion`** behavior consistent with the main CSS.
- Namespace new classes (e.g. `.demo-` → rename to match game conventions) to avoid collisions.
- **`canvas-interactive-demos/`** pages: keep **self-contained** (no extra CDNs) when possible so authors can paste snippets into picky LMS HTML views. **Exception:** `open-toolkit-showcase.html` intentionally loads Mermaid, Three.js, and `model-viewer` from CDNs for GitHub Pages / open-web experiments. The **shipped game** may load **GSAP** from jsDelivr for motion (see §1 “Motion stack”); that is intentional and degrades gracefully if blocked.

### Prototype → game mapping (short)

Most rows below are **merged** in the bundle; demos stay as vanilla labs for Canvas paste tests.

| Prototype (`demos/`) | Idea in the live game | Touch points (mainly `js/game-app.js`, styles in `css/game.css`) |
|----------------------|------------------------|------------------------------|
| `realm-balance-slider.html` | **Shipped (epilogue):** coupled realm sliders labeled as debrief toy only. | `resolveEndingText` → `.realm-debrief-lab`; `wireRealmDebriefSliders`. |
| `realm-triangle-budget.html` | **Shipped (pilot):** co-op-gated budget on **`resolve_endings`** before final framing choices (`getRealmBudgetPoolPoints`: 3/5/8 from winter die total). | `mountResolveEndingsRealmBudget` in `js/game-app.js`; flag `coopRealmBudgetBeforeChoices` on scene. |
| `icons-showcase.html` | **Shipped:** choice-row **dice / branch** SVGs; **inventory** chips + **Terms** glossary rows use the same stroke vocabulary (`INV_SVG`, `GLOSSARY_ICON_BY_KEY` in `game-config.js`; `wireGlossaryIcons` in `game-app.js`). | `renderInventory`, `.glossary-dl dt[data-gloss-icon]`, `#glossaryBtn` book mark. |
| `interactive-widgets.html` | **Toast**, `<dialog>` peek, **details/summary**, stance pattern. | `#toastRegion`, `#debriefPeekDlg`, co-op stance checkbox. |
| `canvas-self-test.html` | Not for players, **support** checklist when embedding. | N/A (keep as separate file for authors). |
| `mechanic-winter-crisis-lab.html` | **Shipped:** crisis recap + collapsible die table. | `crisisRollExplanationHtml`, `buildCrisisRecap`. |
| `mechanic-path-deltas-and-hints.html` | **Shipped:** meter hints on choices + pedagogy `details`. | `.choice-btn` `title`, `.choice-pedagogy`. |
| `mechanic-breadcrumb-tension.html` | **Shipped:** breadcrumb + tension spread. | `#salometry`, `updateSalometry()`, `data-tension="high"`. |
| `mechanic-co-op-timer-ballot.html` | **Shipped:** story-column co-op card (gating + timer), **three seat cards**, choice buttons, reveal/stance/apply **under** the buttons (bar parks in `#coopToolsActionBarDock` when `#choices` is cleared). | `wireCoopTools`, `#coopMainBallotWrap`, `#coopToolsActionBar`, `state.coopToolsEnabled`. |
| `mechanic-debrief-epilogues.html` | **Shipped:** compare three framings + read-only branch peek. | Epilogue HTML in `resolveEndingText`; `PEEK_TEXT`. |
| `mechanic-achievement-flash.html` | **Shipped:** achievement toasts after checks. | `pushToast`, `ACH_TOAST`, `flushNewAchievementsToasts`. |
| `mechanic-url-and-summary.html` | **Shipped:** `?scene=` deep link + run summary (course + run id). | `applySceneFromQuery`, `buildRunSummary`, `getRunId`. |
| `open-toolkit-showcase.html` | **Lab only:** Mermaid diagrams, embedded **ASCII STL** (Three.js), `model-viewer` GLB slot, Web Audio, link hub (Commons / Archive / IIIF / print sites), GitHub workflow ideas. | N/A; optional author-facing; pair with `SOURCES.md` for rights. |

**Backlog checklist:** `canvas-interactive-demos/PENDING-TASKS.md` (itemized merge + narrative + LMS tasks).

### Suggested implementation order (when you start coding)

1. **Icons:** low risk, high polish; copy SVG snippets into scenes/choices with `aria-label` / `title`.
2. **Toast + achievement hooks:** fire on rare `sceneId` / inventory combos; respect reduced motion.
3. **Stance / commit checkbox:** one high-stakes scene (e.g. winter crisis or final framing) as a pilot.
4. **Point budget mini-game:** co-op-only UI path; wire to one scene first.
5. **Coupled sliders:** clearly labeled experimental debrief, not the canonical stat model.

### Mechanics brainstorm (spice, teaching, replay)

- **Crisis preview card:** before the winter roll, show **plain-language** thresholds (“If Reform is high, event X is likelier”) without spoiling prose, teaches probability as argument.
- **Path-weighted delta preview:** on hover/focus of a choice, show **path-specific** stat effects (the game already varies by path in places; surfacing it trains “same words, different institutions”).
- **Turn / scene breadcrumb** in the header strip (**shipped** as `#salometry`; `interactive-widgets.html` keeps a static stub for widget patterns only).
- **“Commit to a stance”** before the final framing choice, forces the three co-op roles to speak once more.
- **Non-destructive replay:** “View other branch” as read-only text snippet (no stat mutation), reduces FOMO for one-shot class sessions.
- **Copy-to-clipboard** enhancements: already present; add **short URL** or **run code** for forum posts if desired.
- **Tension meter:** derived signal (e.g. distance between highest and lowest realm) driving one line of salon color or ambient line, optional, subtle.

Use **`cyoa-structure-map.html`** and the **`BACKLOG`** comment above `EPILOGUE_TWELVE` in **`js/game-app.js`** when scheduling narrative + mechanic passes together.

---

## 3. Files quick reference

| File | Role |
|------|------|
| `index.html` | Shipped game shell (markup + glossary); loads CSS/JS below |
| `css/game.css` | All game styles |
| `js/game-config.js` | Inventory labels, scene image maps, ambient keys, `RESOLVE_PATH_LEAD` |
| `js/game-scenes.js` | `scenes` object (all narrative nodes and choices) |
| `js/game-app.js` | State, rendering, crisis logic, epilogues (`EPILOGUE_TWELVE`), UI wiring |
| `canvas-rce-embed-fragment.html` | Paste into Canvas Page HTML view; **new-tab** hero (no default iframe) |
| `canvas-interactive-demos/` | Prototypes before merge; hub lists all demos + **PENDING-TASKS.md** |
| `README.md` | Teaching notes + short embed pointer |
| `LICENSE` | MIT (course redistribution; adjust copyright if required) |
| `SOURCES.md` | Editions and citations |
| `IMAGE_CREDITS.md` | Wikimedia dialogue portraits + scene art pointer |
| `HOSTING-AND-INTEGRATION.md` | This document |
| `GAMEPLAN.md` | Phased ship plan (Canvas fragment, ops, optional character-art pipeline) |
| `BACKLOG.md` | Ideas / overhauls (not on `PENDING-TASKS` execution queue) |
| `teaching-notes.html` | Instructor page: Canvas paste, new tab, `?scene=`, doc links |
| `DEMOS-AND-LLM-REPORT.md` | Demos + local LLM tooling inventory |

**Deploy note:** GitHub Pages and any **iframe `src`** must keep **`index.html`, `css/`, and `js/`** together at the same base URL. Relative paths (`css/game.css`, `js/…`) assume that layout.

**Optional later:** a small build step could concatenate bundles again for a single-file mirror; the iframe workflow does not require it.
