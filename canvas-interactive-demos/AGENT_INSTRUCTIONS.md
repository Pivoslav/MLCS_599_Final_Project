# Agent handoff: Canvas-ready interactive demos (MLCS 599 / Chaadaev CYOA)

A **stub** `index.html` hub is present so the folder opens cleanly in a browser; there are **no playable demos** yet. Your job is to **produce** those demos here, following this document end to end (replace or extend the stub hub as you add `demos/*.html`). The parent project is a self-contained choice game: `../index.html` (“Russia at the Crossroads”). You are **not** required to merge your demos into that file unless the course instructor asks for integration later; the primary deliverable is **standalone, Canvas-compatible HTML** (and optional assets) in this folder.

---

## 1. Purpose and audience

### 1.1 What you are building

Construct **small, self-contained demonstrations** of:

1. **Interactive UI elements** that could enhance the main game (buttons, toggles, sliders, collapsible panels, steppers, drag-and-drop prototypes if appropriate, keyboard-accessible controls).
2. **Icons and visual vocabulary** (inline SVG preferred, consistent stroke weight, semantic labels) for Realm meters (Order / Reform / People), inventory tokens, path badges, events, and “read alongside” affordances.
3. **Realm balancing mechanics** and **related gamified interactions**: anything that helps players *feel* tradeoffs between Order, Reform, and People—sliders that enforce a budget, “spend 10 points across three stats,” random crisis cards weighted by path, preview of next-scene thresholds, etc.
4. **Other gamified elements** worth prototyping: achievement toasts, turn counter, “tension” meter, optional mini-commitments before choices, non-destructive replays, copy-to-clipboard summaries (pattern already exists in the main game).

### 1.2 Who consumes this

- **Course staff** evaluating whether to adopt a pattern in the live `index.html`.
- **Students** accessing content through **Canvas** (University of Alberta). Assume **no installation step** and **no local server** for the student; files must work when opened from Canvas’s hosting model (see Section 5).

---

## 2. Source of truth in the repository

Before designing mechanics, **read the real game**:

| File | Why |
|------|-----|
| `../index.html` | Full game: `state.stats.order`, `reform`, `people` (0–100); paths `west`, `slav`, `statist`, `med`; inventory; events; epilogues. |
| `../README.md` | Pedagogical intent, co-op roles, glossary behavior. |
| `../cyoa-structure-map.html` | Structural overview if you need branch topology without parsing all of `index.html`. |
| `../SOURCES.md` | Citations and edition notes. |

**Realm meters:** The sidebar shows three vertical bars and numeric values. Choices apply deltas (see `renderScene` / choice handlers in `index.html`). Your demos should **not** invent conflicting rules unless clearly labeled “experimental variant.”

**Colour / scene framework (for alignment):** The main game sets on `<html>`:

- `data-path` — argument track.
- `data-scene-tone` — salon / crisis / event / sorting / closing / ending.
- `data-scene-id` — stable scene key (e.g. `intro`, `crisis_west`).
- `data-scheme` — optional named palette (`frost`, `ember`); omitted when `default`.

Your demos may reuse similar `data-*` hooks for consistency, or document a mapping table if you use different names.

---

## 3. Deliverables (what to create in this folder)

### 3.1 Required layout

Create at least the following (names can vary slightly if you document the mapping):

```
canvas-interactive-demos/
  AGENT_INSTRUCTIONS.md          (this file — keep or update if you change conventions)
  index.html                     (hub page: links to each demo with short descriptions)
  demos/
    realm-balance-slider.html    (example name — at least one demo for stat tradeoffs)
    realm-triangle-budget.html   (example — allocate fixed points across Order/Reform/People)
    icons-showcase.html          (SVG set + usage notes)
    interactive-widgets.html     (buttons, details/summary, modal pattern without framework deps)
    canvas-self-test.html        (checks described in Section 5.6)
  assets/                        (optional: shared CSS, shared JS, sprite-less icons)
    demo-common.css              (in use: realm colors, focus, reduced motion)
    demo-common.js               (optional — not present; demos use small inline scripts)
```

**Minimum bar:** `index.html` hub + **three** separate demo pages + **one** self-test page.

### 3.2 Each demo page must include

- **Title** and **one-paragraph intent** (what pedagogy or UX question it answers).
- **Works cited** if you quote primary text (Chaadaev, Pushkin)—point to `../SOURCES.md` or full citations.
- **Accessibility:** visible focus styles, `label` / `aria-*` where needed, no “color only” meaning.
- **No third-party frameworks** unless explicitly justified in a `RATIONALE.md` (instructors prefer zip-and-upload simplicity). Vanilla JS + CSS is ideal.

### 3.3 Optional but valuable

- `MERGE_NOTES.md` — how to transplant a pattern into `../index.html` (which functions, which DOM hooks).
- `ICON_INVENTORY.md` — table of icon name, meaning, file or inline snippet, and suggested game use.

---

## 4. Design constraints (game-consistent)

1. **Terminology:** Use **Order**, **Reform**, **People** exactly as in the main game (co-op panel in sidebar).
2. **Ranges:** Default stat range 0–100 unless you label an alternate toy model.
3. **Path names:** Westernizing / Slavophile / statist / mediator — match `state.pathId` values if you simulate path.
4. **Performance:** Demos should run on **aging lab PCs** and **Chrome/Edge/Firefox** current-ish ESR.
5. **Motion:** Respect `prefers-reduced-motion` for any animation (pattern exists in main `index.html`).

---

## 5. Canvas LMS compatibility (University of Alberta and Instructure generally)

Canvas environments differ by institution. Treat the following as **hard requirements** unless you confirm otherwise with the instructor.

### 5.1 How HTML is usually delivered

Common patterns:

1. **Course Files + link:** Upload `index.html` (and assets) to **Canvas → Files**, then link from a **Module** or **Page**. Relative URLs (`assets/foo.css`) must resolve from the folder structure you upload.
2. **Canvas Page (Rich Content Editor):** Often **strips `<script>`** or sanitizes attributes. **Do not rely** on embedding your full app inside the RCE HTML editor. Prefer **uploaded HTML files** opened as a **direct file link** or embedded via **iframe** if policy allows.
3. **Institutional web host:** Some units host `public_html` and link out from Canvas. If so, same rules: relative paths, HTTPS, CORS not needed for static files.

### 5.2 Technical requirements for “Canvas-safe” demos

| Requirement | Detail |
|-------------|--------|
| **Single-folder or explicit relative paths** | Zip preserves internal paths; no absolute `file://` links. |
| **HTTPS only** for any external resource | Mixed content may be blocked when Canvas is HTTPS. Prefer **no external CDNs**; bundle SVG/CSS/JS locally. If you must use a CDN, document the risk. |
| **No dependency on `window.parent`** | Unless building an iframe tool approved by IT; assume standalone page. |
| **No cookies / storage assumptions** | `localStorage` may work in top-level file context but can fail in strict iframe or private mode; **degrade gracefully** (e.g. session-only UI state). |
| **No `eval` / inline `javascript:` URLs** | Policy scanners and CSP may block them. |
| **Charset** | `<meta charset="UTF-8">` in every HTML file; save files as UTF-8. |
| **Viewport** | `<meta name="viewport" content="width=device-width, initial-scale=1">` for phones. |

### 5.3 iframe embedding (if used)

If the course embeds your demo in a Canvas Page via iframe:

- Use **explicit height** or **postMessage** resize only if the parent is under your control (usually not). Prefer **content that scrolls inside the iframe** naturally.
- Avoid `position: fixed` covering the whole viewport unless tested inside Canvas’s iframe (can trap focus).

### 5.4 University of Alberta specifics (verify with instructor)

Policies and integrations change. **Confirm:**

- Whether **Google Analytics** or external fonts are allowed.
- Whether **Files** allows `.html` download vs in-browser render (some configurations force download).
- Whether **Accessibility Services** require **WCAG 2.1 AA** for official course materials (assume **yes** and meet contrast and keyboard requirements).

### 5.5 Copyright and attribution

- Wikimedia / primary texts: follow attribution style in `../SOURCES.md`.
- If you use **SparkNotes-style** *summaries* as *internal working notes*, do not paste copyrighted summary text into shipped HTML; paraphrase or cite originals.

### 5.6 `canvas-self-test.html` checklist

This page should **automate or document** manual checks:

1. Open from the same path relationship you expect in Canvas Files.
2. Load **no console errors** (self-test can list `window.onerror` results).
3. Confirm **one** inline SVG renders; **one** `<button>` is keyboard-activatable.
4. If using `localStorage`, try/catch and show “unavailable” state. **`canvas-self-test.html` treats blocked storage as PASS** (expected in many Canvas/embed contexts), not FAIL.
5. Print **user agent** and **viewport size** for support debugging (optional `<pre>`).

---

## 6. Suggested demo ideas (pick and implement)

### 6.1 Realm balancing

- **Zero-sum slider trio:** moving one stat down moves another up (with rounding rules documented).
- **Crisis card:** random event offers “lose 5 People unless Reform ≥ 60” with a **preview** of eligibility.
- **Path-weighted table:** show how the *same* choice label applies different deltas per `pathId` (mirror or simplify real game logic).

### 6.2 Icons

- Minimal **8×8 / 24×24** grid sheet of strokes: crown / quill / church / bridge / flood / book / gendarme / zemstvo barn.
- **Accessible names:** `aria-label` or visually hidden text.

### 6.3 Gamification

- **Achievement toast** (non-modal) that respects reduced motion.
- **Turn / scene breadcrumb** without Vue/React.
- **“Commit to a stance”** checkbox that only *unlocks* a choice button (pedagogical: force role-play).

---

## 7. Quality bar before you mark the task done

- [ ] Hub `index.html` lists every demo with a one-line description.
- [ ] Every demo is usable **without** a build step (`npm` optional only for your own dev, not for students).
- [ ] All links between hub and demos use **relative** paths.
- [ ] Keyboard navigation works for every control.
- [ ] Color contrast ≥ WCAG AA for default theme (check buttons on backgrounds).
- [ ] `canvas-self-test.html` passes in target browsers.
- [ ] This `AGENT_INSTRUCTIONS.md` updated if you changed folder layout or added CDN exceptions.

---

## 8. Contact surface with the main game (future integration)

If someone later merges your work into `../index.html`:

- Prefer **copy-pasteable** `<svg>` and **namespaced** CSS classes (e.g. `.demo-` prefix in prototypes, then rename to match existing BEM-like patterns in the game).
- Realm math should align with existing `state.stats` mutation style (inspect choice button handlers).
- Scene visuals use `SCENE_IMAGES`, `SCENE_RAIL_IMAGES`, `SCENE_AMBIENT`, `SCENE_COLOR_SCHEME`; document any **new** scene keys in `../README.md`.

---

## 9. Version note

Instructions authored for the **MLCS 599** project folder `Final/canvas-interactive-demos/`. Parent game file: `Final/index.html`.

When in doubt, **prefer boring technology** that a TA can unzip, upload to Canvas Files, and click once.
