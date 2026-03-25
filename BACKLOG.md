# Backlog — ideas, overhauls, and later work

Items here are **not** committed to the current teaching term. They come from design discussion, **`DEMOS-AND-LLM-REPORT.md` §6**, and **`GAMEPLAN.md`** phases 3–4. For **what we are doing next in order**, see **`canvas-interactive-demos/PENDING-TASKS.md`** (execution queue).

---

## Mechanics (optional / future)

### Author direction — deepen shipped systems (not greenfield)

These are **already in the bundle**; the work is **meaning**, **density**, and **pacing**—not re-proving the UI pattern.

- **Achievement toast + inventory icon flash** (`pushToast`, `ACH_TOAST`, `flushNewAchievementsToasts`, inventory SVG chips) — **Like:** keep as the “reward loop” for pedagogy. **Next:** expand `ACH_TOAST` keys for more rare beats (path × event × inventory intersections); optional short **CSS accent** on the new inventory row when a toast fires (flash is subtle today—tune duration / reduced-motion). Avoid achievement spam in a longer run: tier **silent** checks vs **toast** checks.
- **Path-weighted choice deltas** (`.choice-btn` `title` + `.choice-pedagogy` `details`) — **Like:** keep foregrounding “same verb, different institutions.” **Next:** ensure **keyboard/focus** users get the same hint (e.g. `aria-describedby` or visible “Effect” chip); add **glossary links** inside `details` where one term unlocks the delta; audit scenes where effects are flat so path contrast shows up.
- **Tension spread** (`#salometry`, `updateSalometry()`, `data-tension="high"|"low"`, spread = max − min realms) — **Like:** good *signal*; needs **stakes**. **Next (pick 1–2):** (a) **Copy:** one clause in `renderScene` or ambient line when `high` vs `low` (salon fraying vs consolidated). (b) **Co-op:** Order player reads a **one-line prompt** when spread &gt; threshold (“Reform and People are 35 apart—who speaks for the gap?”). (c) **Soft gate:** only when spread &gt; X, show an extra **details** “Salon temperature” explainer (no hard block unless playtests want it). (d) **Crisis:** higher spread **weights** rumor table or misfit tone (design carefully so it stays teachable, not opaque).
- **Winter crisis + “crisis card”** (`pickCrisisEvent`, `crisisRollExplanationHtml`, `event_*`, misfits) — **Like:** probability-as-argument; **constraint:** one winter cluster can feel like the only “random” beat unless the **adventure is longer** or **other stochastic beats** exist. **Next:** (a) **Crisis preview card** — before `commitChoice` into the roll, plain-language **threshold bands** (“If total ≥ 7, you lean toward scandal X on your path”)—*teaching* without replacing the table. (b) **More random events** — lightweight **d6 or weighted table** on 2–3 **non-winter** scenes (postal delay, salon visitor, censor rumor) with *short* branches that rejoin; keeps “fortuna” from being a one-off. (c) **Length** — new nodes should add **decision count** and **path-specific texture**, not filler; map in `cyoa-structure-map.html` before writing. (d) Optional **second crisis-shaped beat** late arc (lower amplitude than winter) only if structure supports it.

- **Point budget elsewhere** — Same pattern as `resolve_endings`, only if playtests ask (`REALM_BUDGET_POOL_POINTS`).
- **Saved runs** — JSON import/export for branch comparison (extends copy summary).
- **State strip UI** — Chips for `pathId`, scars, walkouts, `crisisMisfit`, inventory (debrief without devtools).
- **NPC stance memory** — Last position per character per scene (co-op + narrative glue).

## Narrative & pedagogy

- **EPILOGUE_TWELVE** deep pass — Voice, winter echo per event (see §B in PENDING-TASKS when scheduled).
- **Scene imagery** — Diversify `SCENE_IMAGES` / rails (`PENDING-TASKS` §B).
- **Branch peek as graded prompt** — Students justify the path not taken using peek text only.
- **Genre one-pager** — Letter I as epistle vs salon dramatization (instructor PDF).
- **Statist fork clarity** — `beat_statist_machine` ending same-room tone (map audit).

## LLM & art (author-side)

- **Phase 2b** — Character bibles, static portraits, `CHARACTER_PORTRAITS` in `game-config` (`GAMEPLAN.md`).
- **Variant scene blurbs** — Instructor-only fork; never auto-ship without human review.
- **Canon vs lab** — Two mental products: citable static CYOA vs LLM-assisted lab build.

## Course / ops

- **Git history purge** — Only if policy requires (e.g. old PDF in history). `PENDING-TASKS` §E.
- **`?classMode=` URL preset** — Teaching defaults vs student open play (`GAMEPLAN` Phase 3).

## Maintenance

- **Handoff blocks** — Keep `DEMOS-AND-LLM-REPORT.md` §7 aligned with shipped mechanics after each merge.
- **Mermaid / map** — Regenerate large diagrams in `cyoa-structure-map.html` only when structure changes materially.
