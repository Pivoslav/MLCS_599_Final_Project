# Russia at the Crossroads (CYOA): Teaching notes

**Hosting, Canvas embed, iframe sizing, and roadmap for merging demos into the game:** see **[HOSTING-AND-INTEGRATION.md](./HOSTING-AND-INTEGRATION.md)** (on `main` for GitHub and collaborators).

**Presentation:** the shipped game uses the **View Transitions API** for scene changes (where supported), **GSAP** (jsDelivr) for a short choice-button stagger, a **breadcrumb** of recent scene titles, and a **realm spread** bar (max − min meter) in the header. All motion respects **`prefers-reduced-motion`**.

## Coherence of the narrative

The game is built around **one provocation** (Chaadaev’s *First Philosophical Letter*, 1836, in **McNally & Tempest**, *Philosophical Works of Peter Chaadaev*, Springer 1991) and **one literary counterweight** (Pushkin’s *The Bronze Horseman*, **Walter Arndt** translation, 1993—use your library edition for assigned passages). In-game copy tracks Letter I and Arndt’s poem where quoted (e.g. “window to the West,” flood lines, “Bronze Horseman in pursuit,” pauper’s grave; **Yevgeny** in source vs. **Evgeny** in some UI copy; see Terms). The candlelit **salon** is still a **dramatization**: the real Letter I is a long **epistle to “Madame.”** See **Terms** in the footer.

Early scenes state **three recurring questions**:

1. Does Russia belong to “universal” history or stand outside it?
2. Can reform mean **borrowing** without moral hollowness?
3. **Who pays** when the state builds its future (Peter / statue / capital vs. Evgeny / flood)?

Mid-game branches **diverge mechanically and narratively**:

- **Westernizing path** (`reformist` / salon-into-reform): prelude **“Journals and the Third Section,”** then crisis **“The Westernizing Wager.”** Fate rolls favor salon vs. Neva echo vs. censor in a *European-facing* key.
- **Slavophile path** (`distinct` → community): prelude **“Aksakov at the Edge of the Letter”** (Konstantin Aksakov: *narod*, soil, spirit vs. borrowed law; tension with Chaadaev and with Pushkin’s bronze), then crisis **“Soil, Censor, and the Provinces.”** Mid rolls can trigger **provincial gentry** resistance to ministry schools rather than a flood echo.
- **Statist path** (`state` from distinct or from Petersburg): prelude **“Files, Uniforms, and the Letter as Case File,”** then crisis **“The Apparatus Closes Ranks.”** High rolls stress **flood as logistics**, not salon breakthrough.
- **Mediator path**: prelude **“Neither Salon Nor Soil Alone,”** then crisis **“The Bridge Under Strain.”** Mid rolls can trigger **zemstvo vs. ministry** budget clash.

All branches still **echo** the three questions above. They no longer funnel through one identical crisis screen.

The **1837 crisis** (die roll + path-specific event table) is the **aftershock** of the letter in different institutional colors. Randomness fits the mood without every path resolving the same rumor.

The **final framing choice** (Order vs. Reform vs. People) does not pick a “winner” for Russian history; it chooses **which lens** the group uses when telling the story afterward, applies **+5** to that meter, and selects one of **twelve epilogues** (four paths × three framings). See **`cyoa-structure-map.html` §7** for titles and thesis lines.

## Using endings in class

The **sorting** scene before the final framing choice prepends a short recap of the player’s **path** (Westernizing / Slavophile–Aksakov / statist / mediator). Each epilogue includes a **speculative question** plus a **“For class discussion”** box with **3 prompts**. Slavophile paths append an extra **Aksakov vs. Chaadaev** bullet.

**Twelve closings** (path × framing) include, for example: *The Ranks of Civilization*, *The Syllabus and the Censor*, *Evgeny’s Europeans* (Westernizing); *The Vertical Iconostasis*, *Parish Ink, Capital Light*, *The Soil and the Roof* (Slavophile); *The File Outlives the Salon*, *Commissioned Progress*, *Relief Without Receipt* (statist); *The Minister’s Bridge*, *Borrowed Law, Local Accent*, *The Ledger They Share* (mediator). Full copy lives in **`js/game-app.js`** (`EPILOGUE_TWELVE`).

**Suggested activities**

- **Compare endings:** Have students who reached different epilogues pair up and argue whether Chaadaev would have been “satisfied” with each outcome.
- **Primary text tie-in:** Assign short passages from the letter and from Arndt’s *Bronze Horseman* (prologue; Part One flood; Part Two statue and pursuit) and map phrases to Order / Reform / People. Full citations: **`SOURCES.md`**.
- **Stats debrief:** Ask whether the **meters** feel fair as models of nineteenth-century tension, or what they leave out (e.g. church, nationality, economy).
- **Write in voice:** After a run, each student writes one short paragraph **as Chaadaev** reacting to the epilogue they reached (satisfied? scathing? divided?).
- **Redesign a beat:** Pick one choice node and add a footnote to a **real** 1836–37 event or constraint; discuss whether the game’s fork is fair or too clean.

## Three-player co-op mode (class of 3)

One shared screen. **Three fixed roles** align with the game’s meters. Before **every** choice, each player speaks once from their lens. The group decides which option to take (consensus or majority: your call).

| Player | Role | Argue from… |
|--------|------|----------------|
| **1** | **Order** | State survival, ranks, censorship tradeoffs, continuity. The Bronze Horseman as necessary majesty (even when costly). |
| **2** | **Reform** | Law, schools, print, “universal history,” Chaadaev’s program: borrowing that could become real institutions. |
| **3** | **People** | Clerks, flood victims, provincial cost, *narod*’s material life. Evgeny’s side of Pushkin’s poem. |

**Flow**

1. Read the scene aloud (rotate narrator each turn if you like).
2. **Order → Reform → People:** each role gives a 30–60 second take on which option fits their priority (they may disagree with “their” stat effect; argue anyway).
3. Choose as a committee; one person operates the mouse.
4. Before the **winter 1837** fate roll, the **Order** player restates how high or low Order has been and why that might matter for salons, censors, or flood echoes.
5. At **final framing** (Order vs. Reform vs. People), each player advocates for *their* lens. Pick the closing frame **deliberately**: it is a reading of the same history, not a “win.”
6. Debrief using the epilogue’s green discussion box, then ask: *Did any of us feel the game forced our role to lose, or could every role claim a partial victory?*

**Why three players:** The roles mirror the UI stats so the room always voices all three tensions; no one “rides along” silently.

## Optional teaching layers (no code required)

- **Micro-primary-text moments:** Project or hand out 2–4 lines from Chaadaev (borrowing / history) or Pushkin (Peter / flood / Evgeny) **before** a major branch; map diction to the next choice.
- **Name the counterfactual:** When the text mentions zemstvo-style pilots or salons, say aloud: *This is plausible debate in the 1830s; some institutions belong to a later period; we’re staging the argument, not simulating a year-by-year replay.*
- **Historiography nudge at endings:** Tie an epilogue to one secondary reading (e.g. Walicki on Westernizers vs. Slavophiles; see `SOURCES.md`). Ask: *Which interpretation of Russia’s path does this ending privilege?*
- **Concept glossary (prep):** Short definitions for *Teleskop*, Third Section, *sobornost*, Neva flood of 1824, *narod* (handout or slide) so terms don’t block play.
- **Path recap before the roll:** Instructor or **Order** player summarizes: *We’ve favored Reform over People since…* so the d6 feels connected to prior choices, not arbitrary.
- **Post-game reading:** After the run, assign 1–2 pages keyed to ending type (e.g. *Unity Without the Many*: hollow state / Evgeny readings; *Reform in the Teeth*: Westernizers and repression).
- **Named run titles (debrief):** Invent a memorable label for the session (*“The Bronze Bureaucrat,”* *“Soil and Censor”*) from path + highest stat. Useful for comparing if the group replays.
- **Rare-run challenge (replay incentive):** Aim for an unusual combo (e.g. high People + Slavophile path + salon event); discuss whether that outcome is coherent historically.
- **Exportable run summary:** After the epilogue, copy scene flow + final stats + inventory into the forum or a doc for a one-paragraph reflection.

## Scope notes (what we are not adding)

- **No optional *Gypsies* branch** in the CYOA: the game stays anchored on Chaadaev + *The Bronze Horseman*.
- **No “historian mode” toggle** (e.g. hiding stat previews): keep the current UI for clarity and pace.

## In-game teaching tools (game bundle)

- **Terms** (footer): glossary modal for *Teleskop*, Third Section, *sobornost*, *narod*, Neva flood, zemstvo staging, meters.
- **3-player co-op:** collapsible role card in the side panel (Order → Reform → People).
- **Read alongside:** collapsible anchors on (almost) every story scene; after each short quotation, a one-line **gloss** (`.read-gloss` in the panel) names **who and what** (Chaadaev, Pushkin, Stepan, the meters, the next buttons) so players are not left guessing. Glosses use explicit connectives (*that*, *whether*, *while*, and the like). Section cues (prologue, Part One, Part Two), not line numbers. **Epilogues** are in-scene (the four friends close the winter in voice); **session title** above the body still signals which track and framing the run used.
- **Historical staging:** notes on counterfactual compression (e.g. zemstvo language).
- **Before you roll:** path recap and stat context on winter 1837 crisis screens.
- **Rare choice** at sorting: if the library has both Chaadaev and Pushkin and People ≥ 55, a fourth framing option appears (“Evgeny’s chorus”).
- **Epilogue:** session title, Walicki-style historiography nudge, rare “letter + poem + People 60+” insight, **Copy run summary** for forum or reflection.

## Extending beyond Letter I (optional unit)

The Springer volume includes **Letters II–VIII**, ***Apologia of a Madman***, and **fragments** with editors’ commentaries. The CYOA stays **Letter-I-first** for coherence; a second week can assign e.g. *Apologia* (response to the “madness” decree) or Letter VIII alongside a second playthrough. See **`SOURCES.md`** for the edition.

## Embedding in Canvas

Summary: wrapper + **`iframe`** (GitHub Pages or Canvas Files **`/preview`**) + **new-tab link**; never paste the whole game into the RCE. Full walkthrough, iframe sizing, and permissions: **[HOSTING-AND-INTEGRATION.md](./HOSTING-AND-INTEGRATION.md)**. Paste-ready markup: **`canvas-rce-embed-fragment.html`**.

## Files (public repo)

- `co-op-cyoa-mechanics-report.html`: **Visual report** (effort vs payoff chart, flow diagram, per-mechanic bars + learning notes) for multiplayer CYOA ideas.
- `HOSTING-AND-INTEGRATION.md`: **Canvas + GitHub Pages lessons**, iframe sizing tips, public-repo notes, **mechanics/integration roadmap** vs `canvas-interactive-demos/`.
- `index.html` + `css/game.css` + `js/game-config.js`, `js/game-scenes.js`, `js/game-app.js`: shipped game (open `index.html` locally or host the whole `Final/` folder on GitHub Pages).
- `canvas-rce-embed-fragment.html`: paste-ready **HTML fragment** for Canvas **Pages** (GitHub Pages URLs by default; swap for Canvas `/preview` if you have Files upload). Increase `height` on `<iframe>` if the embedded player feels small.
- `SOURCES.md`: citations and editions.
- `cyoa-structure-map.html`: branch map and teaching companion.
- `canvas-interactive-demos/`: optional UI/mechanic prototypes for Canvas; open `canvas-interactive-demos/index.html`. Backlog: `canvas-interactive-demos/PENDING-TASKS.md`.
