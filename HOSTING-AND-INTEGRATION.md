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
- **Do** use a **short wrapper** (inline styles, headings, callouts) plus either:
  - an **`iframe`** whose `src` is the **GitHub Pages** URL, or
  - an **`iframe`** whose `src` is a Canvas **Files** `…/preview` URL (when you have upload rights, same pattern as DSC interactive HTML).
- **Always** include a prominent **“Open in new tab”** link to the same URL. Some institutions **block third-party iframes** while still allowing **external links**; the game remains playable.
- **Paste source:** `canvas-rce-embed-fragment.html` — copy the outer `<div>…</div>` into **Page → Edit → HTML View**.

### Iframe size (common complaint: “windows a bit small”)

- Default **`height`** in the fragment is a balance; **increase** the numeric `height` on each `<iframe>` (e.g. **900–1000** for the game, **700+** for demos) until it feels right in your course layout.
- **`min-height` on the iframe** helps when the RCE wraps the frame oddly; students can still use **new tab** for full viewport.
- Canvas **content column width** is fixed; true “full screen” inside the LMS is rare—**new tab** is the reliable fix.

### `canvas-interactive-demos` self-test (LMS quirks)

- Prefer **`<input type="button">`** and **link fallbacks** where hosts strip `<button>`.
- **`localStorage`** may fail in embedded contexts; treat **graceful degradation** as success (in-memory / session-only state).
- **`window.onerror`:** filter extension noise when attributing failures to the page.

### Public repository hygiene

- Removed from **`main`:** full primary-text dumps (PDF/txt poem and letter extracts), internal alignment notes, PDF tooling scripts—**copyright and clutter** reasons. Citations remain in **`SOURCES.md`**.

### Motion stack (shipped game, optional CDN)

- **View Transitions API** (`document.startViewTransition`): cross-fades the main scene column where the browser supports it (e.g. Chromium, Safari 18+). Unsupported browsers run the same paint with no transition.
- **GSAP 3** (pinned on **jsDelivr** in `index.html`): light **stagger** on choice buttons after each scene paint. If the CDN is blocked, the game still runs; only the entrance motion is skipped.
- **`prefers-reduced-motion: reduce`:** turns off View Transition animations, GSAP staggers, and the CSS transitions on the realm-spread bar (tension strip). Realm column meters still update; reduced-motion also clears their height transition in CSS.

---

## 2. Long-term goal: integrate prototype tools into the game bundle (`index.html` + `js/`, `css/`)

The folder **`canvas-interactive-demos/`** holds **vanilla** patterns meant to be **merged** into the main game later. Integration should:

- Reuse existing **`state.stats`** (`order`, `reform`, `people`, 0–100) and **`pathId`** (`west` | `slav` | `statist` | `med`).
- Keep **`prefers-reduced-motion`** behavior consistent with the main CSS.
- Namespace new classes (e.g. `.demo-` → rename to match game conventions) to avoid collisions.
- **`canvas-interactive-demos/`** pages: keep **self-contained** (no extra CDNs) when possible so authors can paste snippets into picky LMS HTML views. The **shipped game** may load **GSAP** from jsDelivr for motion (see §1 “Motion stack”); that is intentional and degrades gracefully if blocked.

### Prototype → game mapping (short)

| Prototype (`demos/`) | Idea in the live game | Touch points (mainly `js/game-app.js`, styles in `css/game.css`) |
|----------------------|------------------------|------------------------------|
| `realm-balance-slider.html` | Optional “tension” or debrief toy: **coupled** realm sliders (toy math, not replacing independent meters unless labeled). | Sidebar lab / instructor mode; or post-run debrief panel. |
| `realm-triangle-budget.html` | **Co-op budget:** spend N points before a hard choice; forces negotiation. | Before major forks; gate choice until “committed.” |
| `icons-showcase.html` | **Stroke icons** for paths, events, inventory, Read alongside. | Inline SVG near titles, choice rows, glossary. |
| `interactive-widgets.html` | **Native `<dialog>`** for confirmations; **toast** for rare achievements; **details/summary** for optional glossary chunks; **stance checkbox** before a pivotal choice. | Choice confirmation, achievement after rare branches, collapsible panels. |
| `canvas-self-test.html` | Not for players—**support** checklist when embedding. | N/A (keep as separate file for authors). |
| `mechanic-winter-crisis-lab.html` | Crisis threshold **preview** + **die table** in `details`. | Before winter roll; align copy with real crisis tables. |
| `mechanic-path-deltas-and-hints.html` | **Path-weighted** deltas + optional **why it matters** gloss. | Choice UI: focus/hover + `details` under choices. |
| `mechanic-breadcrumb-tension.html` | **Breadcrumb** + **tension** = max(stat) − min(stat). | **Shipped:** `#salometry` in `index.html`, styles in `css/game.css`, `updateSalometry()` in `js/game-app.js`; high spread → `data-tension="high"`. Demo remains a vanilla lab. |
| `mechanic-co-op-timer-ballot.html` | **Timer**, **secret ballot** reveal, **stance** checkbox. | `state.coopMode` UI branch in `game-app.js`. |
| `mechanic-debrief-epilogues.html` | **Thesis picker**, **compare** epilogues, **branch peek** `dialog`. | Post-`EPILOGUE_TWELVE`; read-only, no state mutation. |
| `mechanic-achievement-flash.html` | **Toast** + **inventory icon** flash. | Rare scene/token hooks. |
| `mechanic-url-and-summary.html` | **`?scene=`** banner + **copy summary** pattern. | Router + existing copy summary. |

**Backlog checklist:** `canvas-interactive-demos/PENDING-TASKS.md` (itemized merge + narrative + LMS tasks).

### Suggested implementation order (when you start coding)

1. **Icons** — low risk, high polish; copy SVG snippets into scenes/choices with `aria-label` / `title`.
2. **Toast + achievement hooks** — fire on rare `sceneId` / inventory combos; respect reduced motion.
3. **Stance / commit checkbox** — one high-stakes scene (e.g. winter crisis or final framing) as a pilot.
4. **Point budget mini-game** — co-op only UI path; wire to one scene first.
5. **Coupled sliders** — clearly labeled experimental debrief, not the canonical stat model.

### Mechanics brainstorm (spice, teaching, replay)

- **Crisis preview card:** before the winter roll, show **plain-language** thresholds (“If Reform is high, event X is likelier”) without spoiling prose—teaches probability as argument.
- **Path-weighted delta preview:** on hover/focus of a choice, show **path-specific** stat effects (the game already varies by path in places; surfacing it trains “same words, different institutions”).
- **Turn / scene breadcrumb** in the header strip (**shipped** as `#salometry`; `interactive-widgets.html` keeps a static stub for widget patterns only).
- **“Commit to a stance”** before the final framing choice—forces the three co-op roles to speak once more.
- **Non-destructive replay:** “View other branch” as read-only text snippet (no stat mutation)—reduces FOMO for one-shot class sessions.
- **Copy-to-clipboard** enhancements: already present; add **short URL** or **run code** for forum posts if desired.
- **Tension meter:** derived signal (e.g. distance between highest and lowest realm) driving one line of salon color or ambient line—optional, subtle.

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
| `canvas-rce-embed-fragment.html` | Paste into Canvas Page HTML view |
| `canvas-interactive-demos/` | Prototypes before merge; hub lists all demos + **PENDING-TASKS.md** |
| `README.md` | Teaching notes + short embed pointer |
| `SOURCES.md` | Editions and citations |
| `HOSTING-AND-INTEGRATION.md` | This document |

**Deploy note:** GitHub Pages and any **iframe `src`** must keep **`index.html`, `css/`, and `js/`** together at the same base URL. Relative paths (`css/game.css`, `js/…`) assume that layout.

**Optional later:** a small build step could concatenate bundles again for a single-file mirror; the iframe workflow does not require it.
