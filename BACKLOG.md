# Backlog: ideas, overhauls, and later work

Items here are **not** committed to the current teaching term. They come from design discussion, **`DEMOS-AND-LLM-REPORT.md` §6**, and **`GAMEPLAN.md`** phases 3–4. For **what we are doing next in order**, see **`canvas-interactive-demos/PENDING-TASKS.md`** (execution queue).

---

## Mechanics (optional / future)

### Author direction: deepen shipped systems (not greenfield)

These are **already in the bundle**. The work is **meaning**, **density**, and **pacing**, not re-proving the UI pattern.

- **Achievement toast + inventory icon flash** (`pushToast`, `ACH_TOAST`, `flushNewAchievementsToasts`, inventory SVG chips). **Like:** keep as the “reward loop” for pedagogy. **Next:** expand `ACH_TOAST` keys for more rare beats (path × event × inventory intersections); optional short **CSS accent** on the new inventory row when a toast fires (flash is subtle today: tune duration / reduced-motion). Avoid achievement spam in a longer run: tier **silent** checks vs **toast** checks.
- **Path-weighted choice deltas** (`.choice-btn` `title` + `.choice-pedagogy` `details`). **Like:** keep foregrounding “same verb, different institutions.” **Next:** ensure **keyboard/focus** users get the same hint (e.g. `aria-describedby` or visible “Effect” chip); add **glossary links** inside `details` where one term unlocks the delta; audit scenes where effects are flat so path contrast shows up.
- **Tension spread (max − min meters).** **Current ship:** internal math still drives **achievements** (`salon_wide_split`, `aligned_benches`); header **no longer** foregrounds spread as a bar. **Author stance:** spread only becomes *dramatically* interesting if tied to **new random encounter beats** (e.g. spy run-ins, courier mishaps) and a **real fail track** (e.g. conditions that push toward **exile** or another hard closure), not cosmetic meter copy alone. Until that arc exists, **do not** resurrect spread-as-decoration; prototype in **`canvas-interactive-demos/`** first, map new nodes in **`cyoa-structure-map.html`**, then merge.
- **Winter crisis + “crisis card”** (`pickCrisisEvent`, `crisisRollExplanationHtml`, `event_*`, misfits). **Like:** probability-as-argument. **Constraint:** one winter cluster can feel like the only “random” beat unless the **adventure is longer** or **other stochastic beats** exist. **Next:** (a) **Crisis preview card** before `commitChoice` into the roll: plain-language **threshold bands** (“If total ≥ 7, you lean toward scandal X on your path”), *teaching* without replacing the table. (b) **More random events:** lightweight **d6 or weighted table** on 2–3 **non-winter** scenes (postal delay, salon visitor, censor rumor) with *short* branches that rejoin; keeps “fortuna” from being a one-off. (c) **Length:** new nodes should add **decision count** and **path-specific texture**, not filler; map in `cyoa-structure-map.html` before writing. (d) Optional **second crisis-shaped beat** late arc (lower amplitude than winter) only if structure supports it.

- **Point budget elsewhere:** same pattern as `resolve_endings`, only if playtests ask (`getRealmBudgetPoolPoints`).
- **Saved runs:** JSON import/export for branch comparison (extends copy summary).
- **State strip UI:** chips for `pathId`, scars, walkouts, `crisisMisfit`, inventory (debrief without devtools).
- **NPC stance memory:** last position per character per scene (co-op + narrative glue).

## Narrative & pedagogy

- **EPILOGUE_TWELVE** deep pass: voice, winter echo per event (see §B in PENDING-TASKS when scheduled).
- **Scene imagery:** diversify `SCENE_IMAGES` / rails (`PENDING-TASKS` §B).
- **Branch peek as graded prompt:** students justify the path not taken using peek text only.
- **Genre one-pager:** Letter I as epistle vs salon dramatization (instructor PDF).
- **Statist fork clarity:** `beat_statist_machine` ending same-room tone (map audit).

## LLM & art (author-side)

- **Phase 2b:** character bibles, static portraits, `CHARACTER_PORTRAITS` in `game-config` (`GAMEPLAN.md`).
- **Variant scene blurbs:** instructor-only fork; never auto-ship without human review.
- **Canon vs lab:** two mental products: citable static CYOA vs LLM-assisted lab build.

## Course / ops

- **Git history purge:** **not pursuing** unless policy requires; see `PENDING-TASKS` §E.
- **`?classMode=` URL preset:** **deferred:** avoid extra query-surface area while the bundle stays lean; **`session_format`** + **`?coop=`** already cover co-op defaults. Reopen only if LMS workflows need a single instructor link.

## Maintenance

- **Handoff blocks:** keep `DEMOS-AND-LLM-REPORT.md` §7 aligned with shipped mechanics after each merge.
- **Mermaid / map:** regenerate large diagrams in `cyoa-structure-map.html` only when structure changes materially.
