    function colorSchemeForScene(sceneId) {
      return SCENE_COLOR_SCHEME[sceneId] || "default";
    }

    function sceneToneFromId(sceneId, scene) {
      if (scene && scene.computed) return "ending";
      if (String(sceneId).indexOf("crisis_") === 0) return "crisis";
      if (String(sceneId).indexOf("event_") === 0) return "event";
      if (String(sceneId).indexOf("final_route_") === 0) return "closing";
      if (sceneId === "resolve_endings") return "sorting";
      return "salon";
    }

    function syncAppChrome(sceneId, scene) {
      const root = document.documentElement;
      if (state.pathId) root.setAttribute("data-path", state.pathId);
      else root.removeAttribute("data-path");
      root.setAttribute("data-scene-tone", sceneToneFromId(sceneId, scene));
      root.setAttribute("data-scene-id", sceneId);
      const scheme = colorSchemeForScene(sceneId);
      if (scheme === "default") root.removeAttribute("data-scheme");
      else root.setAttribute("data-scheme", scheme);
    }

    function railVerticalFromBgPos(bgPos) {
      const fallback = "42%";
      if (!bgPos || !String(bgPos).trim()) return fallback;
      const parts = String(bgPos).trim().split(/\s+/).filter(Boolean);
      if (parts.length >= 2) return parts[1];
      return fallback;
    }

    /** Side rails: background image URL (JSON-stringified for CSS) and vertical slice alignment. */
    function setSceneSideRails(urlJson, bgPos) {
      const railL = document.getElementById("sceneRailLeft");
      const railR = document.getElementById("sceneRailRight");
      if (!railL || !railR) return;
      const y = railVerticalFromBgPos(bgPos);
      if (!urlJson) {
        railL.style.backgroundImage = "none";
        railL.style.backgroundPosition = "";
        railR.style.backgroundImage = "none";
        railR.style.backgroundPosition = "";
        railL.classList.remove("is-active");
        railR.classList.remove("is-active");
        return;
      }
      railL.style.backgroundImage = "url(" + urlJson + ")";
      railR.style.backgroundImage = "url(" + urlJson + ")";
      railL.style.backgroundPosition = "0% " + y;
      railR.style.backgroundPosition = "100% " + y;
      railL.classList.add("is-active");
      railR.classList.add("is-active");
    }

    function updateSceneVisuals(sceneId) {
      const contentEl = document.querySelector(".content");
      const bg = document.getElementById("sceneBg");
      const credit = document.getElementById("sceneBgCredit");
      const source = document.getElementById("sceneBgSource");
      const entry = SCENE_IMAGES[sceneId] || SCENE_IMAGES.intro;
      if (contentEl) {
        contentEl.setAttribute("data-ambient", SCENE_AMBIENT[sceneId] || "salon");
      }
      if (!bg || !credit || !source) {
        setSceneSideRails(null);
        return;
      }
      if (!entry || !entry.src) {
        bg.style.backgroundImage = "none";
        bg.style.backgroundPosition = "";
        setSceneSideRails(null);
        source.hidden = true;
        credit.innerHTML = "";
        return;
      }
      /* JSON.stringify so parentheses etc. in URLs cannot break CSS url() parsing */
      const urlJson = JSON.stringify(entry.src);
      bg.style.backgroundImage = "url(" + urlJson + ")";
      bg.style.backgroundPosition = entry.bgPos || "";
      let railPick = SCENE_RAIL_IMAGES[sceneId] || SCENE_RAIL_IMAGES.intro;
      if (!railPick || !railPick.src || railPick.src === entry.src) {
        railPick = SCENE_RAIL_IMAGES.intro;
        if (!railPick || railPick.src === entry.src) {
          railPick = null;
          for (const k of Object.keys(SCENE_RAIL_IMAGES)) {
            const r = SCENE_RAIL_IMAGES[k];
            if (r && r.src && r.src !== entry.src) {
              railPick = r;
              break;
            }
          }
        }
      }
      if (railPick && railPick.src) {
        setSceneSideRails(JSON.stringify(railPick.src), railPick.bgPos || "");
      } else {
        setSceneSideRails(null);
      }
      const link = entry.href
        ? ` <a href="${entry.href}" target="_blank" rel="noopener noreferrer">Wikimedia Commons (license)</a>`
        : "";
      credit.innerHTML = `${entry.credit || ""}${link}.`;
      source.hidden = false;
    }

    /** Path lead-ins for <code>resolve_endings</code> live in <code>game-config.js</code> as <code>RESOLVE_PATH_LEAD</code>. */

    function pickCrisisEvent(total, rawRoll) {
      const p = state.pathId || "west";
      let key;
      if (p === "slav") {
        if (total >= 8) key = "event_salon";
        else if (total >= 5) key = "event_rural_gentry";
        else key = "event_censor";
      } else if (p === "statist") {
        if (total >= 8) key = "event_flood_echo";
        else key = "event_censor";
      } else if (p === "med") {
        if (total >= 8) key = "event_salon";
        else if (total >= 5) key = "event_zemstvo_clash";
        else key = "event_censor";
      } else {
        if (total >= 8) key = "event_salon";
        else if (total >= 5) key = "event_flood_echo";
        else key = "event_censor";
      }

      state.crisisMisfit = false;
      state.crisisMisfitKind = null;

      /* Option 5: “wrong” rumor; high total but snake eyes, or weak total but a 6. Contingency, not a neat parable. */
      if (rawRoll === 1 && total >= 7) {
        state.crisisMisfit = true;
        state.crisisMisfitKind = "snake";
        const snake = { west: "event_zemstvo_clash", slav: "event_flood_echo", statist: "event_salon", med: "event_censor" };
        return snake[p] || key;
      }
      if (rawRoll === 6 && total <= 5) {
        state.crisisMisfit = true;
        state.crisisMisfitKind = "lucky";
        const lucky = { west: "event_salon", slav: "event_salon", statist: "event_flood_echo", med: "event_salon" };
        return lucky[p] || key;
      }
      return key;
    }

    function crisisRollExplanationHtml() {
      const path = state.pathId || "west";
      const bonus = Math.floor(state.stats.order / 25);
      const rules = {
        west: "Total <strong>≥8</strong> → salon breakthrough · <strong>5–7</strong> → Neva flood echo · <strong>≤4</strong> → censor strike.",
        slav: "Total <strong>≥8</strong> → sympathetic salon · <strong>5–7</strong> → provincial gentry resist ministry schools · <strong>≤4</strong> → censor.",
        statist: "Total <strong>≥8</strong> → flood framed as logistics / emergency · <strong>≤7</strong> → censor (no separate mid band in code).",
        med: "Total <strong>≥8</strong> → salon · <strong>5–7</strong> → zemstvo-style pilot vs. ministry · <strong>≤4</strong> → censor."
      };
      return `<details class="crisis-die-table"><summary>Winter roll: how <strong>d6 + Order bonus</strong> maps to rumors</summary>
        <p class="crisis-die-lead">Roll <strong>1d6</strong>, add <strong>${bonus}</strong> (Order ÷ 25, rounded down). The game uses <strong>total</strong> with your path column below. <em>Misfits</em> can override: raw die <strong>1</strong> with total <strong>≥7</strong>, or die <strong>6</strong> with total <strong>≤5</strong>, swap in another path’s scandal.</p>
        <p class="crisis-path-rule"><strong>Your track (${path}):</strong> ${rules[path] || rules.west}</p>
        <table class="crisis-grid" aria-label="Baseline totals by path">
          <thead><tr><th scope="col">Path</th><th scope="col">High (≥8)</th><th scope="col">Mid (5–7)</th><th scope="col">Low (≤4)</th></tr></thead>
          <tbody>
            <tr><td>Westernizing</td><td>Salon</td><td>Neva echo</td><td>Censor</td></tr>
            <tr><td>Slavophile</td><td>Salon</td><td>Rural gentry</td><td>Censor</td></tr>
            <tr><td>Statist</td><td>Flood echo</td><td colspan="2">Censor</td></tr>
            <tr><td>Mediator</td><td>Salon</td><td>Zemstvo clash</td><td>Censor</td></tr>
          </tbody>
        </table>
      </details>`;
    }

    const state = {
      current: "intro",
      steps: 0,
      history: [],
      pathId: null,
      lastEvent: null,
      stats: { order: 50, reform: 50, people: 50 },
      inventory: new Set(),
      achievements: new Set(),
      lastRoll: null,
      sceneApplied: new Set(),
      keepBanner: false,
      finalLean: null,
      finalLeanApplied: null,
      evgenyChorus: false,
      lastRunSummary: "",
      crisisMisfit: false,
      crisisMisfitKind: null,
      runTags: new Set(),
      scars: new Set(),
      walkouts: new Set(),
      coopToolsEnabled: false,
      _coopReveal: false,
      _coopChoicesSnapshot: null,
      realmBudgetCommittedResolveEndings: false,
      realmBudgetDraft: { order: 0, reform: 0, people: 0 },
      _prevSceneForBudget: null,
      lastCoopBallotReveal: ""
    };

    const REALM_BUDGET_POOL_POINTS = 30;

    function isCrisisScene(id) {
      return id === "crisis_west" || id === "crisis_slav" || id === "crisis_statist" || id === "crisis_med";
    }

    function buildCrisisRecap() {
      const path = state.pathId || "west";
      const pathNames = { west: "Westernizing", slav: "Slavophile", statist: "statist", med: "mediator" };
      const O = state.stats.order;
      const R = state.stats.reform;
      const P = state.stats.people;
      const bonus = Math.floor(O / 25);
      let leanHint = "Lowest meter: <strong>People</strong> (green bar). Clerks and flood victims may matter less in gossip than they do in Pushkin’s poem.";
      if (O <= R && O <= P) leanHint = "Lowest meter: <strong>Order</strong> (blue-gray bar). Winter rolls skew toward censor pressure unless the die is kind.";
      else if (R <= O && R <= P) leanHint = "Lowest meter: <strong>Reform</strong> (rose bar). Print and schools are fragile in the winter rumor mill.";
      return `<div class="path-recap" role="note"><strong>Before you roll the winter die</strong> (3-player co-op: the <strong>Order</strong> player summarizes this box aloud first.)<br>Argument track you joined: <strong>${pathNames[path] || path}</strong> · Order ${O} · Reform ${R} · People ${P}<br>Add to the six-sided die: <strong>+${bonus}</strong> (take Order, divide by 25, round down).<br><em>${leanHint}</em></div>${crisisRollExplanationHtml()}`;
    }

    function prependSceneCallbacks(sceneId) {
      let pre = "";
      if (sceneId === "reform_education" && state.runTags.has("intro_pushkin_first")) {
        pre += `<p class="callback-note"><strong>Vera (callback):</strong> We opened with Pushkin’s clerk Yevgeny; do these school-and-law papers ever reach <em>his</em> roof, or only ours?</p>`;
      }
      if (sceneId === "beat_west_print" && state.scars.has("petition_winter")) {
        pre += `<p class="callback-note"><strong>Scar:</strong> The petition detour wasted weeks; Stepan speaks more softly, and the Third Section’s file on the salon is thicker.</p>`;
      }
      if (sceneId.startsWith("event_") && state.crisisMisfit) {
        pre += `<p class="crisis-misfit"><strong>Winter misfit:</strong> The whisper that found you belonged, strictly speaking, to another salon’s weather: double ones when your hand looked strong, or a six slipping in when you had almost no pull. Read it as couriers and grudges crossing wires, not the tale you rehearsed by the lamp.</p>`;
      }
      return pre;
    }

    function appendSceneEnrichment(scene) {
      let html = "";
      if (scene.primaryRead) {
        html += `<details class="primary-read"><summary>${scene.primaryRead.title}</summary><div class="primary-read-body">${sceneBodyHtml(scene.primaryRead.body)}</div></details>`;
      }
      if (scene.counterfactualNote) {
        html += `<p class="counterfactual-note"><strong>Historical staging:</strong> ${scene.counterfactualNote}</p>`;
      }
      return html;
    }

    function buildUnresolvedEpilogue(O, R, P) {
      const path = state.pathId || "west";
      const event = state.lastEvent || "event_censor";
      const lines = [];
      const minV = Math.min(O, R, P);
      if (minV === P && P < 50) {
        lines.push("People stayed weak on the meter; Pushkin’s receipt for drowned rooms went mostly uncollected in this outcome.");
      }
      if (minV === R && R < 50) {
        lines.push("Reform never quite anchored as ‘program’; Chaadaev’s call to relearn mankind’s education still sounds like salon noise.");
      }
      if (path === "west" && event === "event_censor" && !state.crisisMisfit) {
        lines.push("Print never won the hearing Westernizers drafted; censorship closed the season on paper.");
      }
      if (state.crisisMisfit) {
        lines.push("Winter threw a ‘wrong’ rumor across the path you were on; the table improvised without its scripted moral.");
      }
      if (state.walkouts.has("vera")) {
        lines.push("Vera stopped coming after the seizure talk; trust in the room did not fully restitch.");
      }
      if (state.runTags.has("intro_pushkin_first")) {
        lines.push("You opened with literature before locking a program; wisdom or evasion remains disputed.");
      }
      if (!lines.length) {
        lines.push("Chaadaev’s mission question and Pushkin’s ‘who pays’ question still pull in different directions.");
      }
      return `<div class="unresolved-block"><h4>Still open after this session</h4><ul>${lines.map((l) => `<li>${l}</li>`).join("")}</ul></div>`;
    }

    /** Session banner title; keyed by path × framing (twelve endings). */
    function computeRunTitle(endingKey, pathId, O, R, P) {
      const p = pathId || "west";
      const T = {
        west_order: "Ranks of Civilization",
        west_reform: "Syllabus and Censor",
        west_people: "Evgeny’s Europeans",
        slav_order: "Vertical Iconostasis",
        slav_reform: "Parish Ink, Capital Light",
        slav_people: "Soil and Roof",
        statist_order: "File Outlives the Salon",
        statist_reform: "Commissioned Progress",
        statist_people: "Relief Without Receipt",
        med_order: "The Minister’s Bridge",
        med_reform: "Borrowed Law, Local Accent",
        med_people: "The Ledger They Share"
      };
      if (T[endingKey]) return T[endingKey];
      if (O >= 75 && p === "west") return "Salon Firebrand";
      if (P >= 75) return "Neva’s Witnesses";
      return "No Single Verdict";
    }

    function historiographyNudge(endingKey) {
      const H = {
        west_order: "Historiography hook: Nicholas-era administration often framed “progress” as discipline first. Compare that to Westernizer hopes for open debate. Whose archive survives?",
        west_reform: "Historiography hook: censorship and educational expansion under autocracy are paired themes; ask whether institutions “Europeanize” society or only its elite paperwork.",
        west_people: "Historiography hook: social historians stress who benefits from reform rhetoric. Does this People-framed ending put the clerk in the same story as the statute?",
        slav_order: "Historiography hook: Orthodox and statist imaginaries sometimes merged. When does <em>narod</em> language serve the village, and when the ministry?",
        slav_reform: "Historiography hook: selective borrowing without liberal “rights” talk is a real 19th-c. pattern. Trace parallels to parish schools and local elites.",
        slav_people: "Historiography hook: material life vs. idealized village; compare to populist and later narodnik genealogies (without equating eras).",
        statist_order: "Historiography hook: police and file culture as modern statecraft. Does continuity equal legitimacy in the secondary readings you assign for this unit?",
        statist_reform: "Historiography hook: reform “from above” via commissions. Walicki and others ask whether mimicry can thicken into substance.",
        statist_people: "Historiography hook: imperial charity vs. rights. How do historians narrate famine, flood, and mercy rhetoric?",
        med_order: "Historiography hook: center–periphery tension in imperial Russia. The mediator path stages local budgets and schools as “zemstvo-style” pilots in the 1830s (real zemstvo law came later; see Historical staging). Ask whether post-1864 zemstvo historiography still helps students interpret that teaching device.",
        med_reform: "Historiography hook: hybrid institutions. When does a borrowed law become “native” in historical narrative?",
        med_people: "Historiography hook: fiscal accountability to communities. Link this to debates on who counted in the reform coalition."
      };
      return H[endingKey] || H.west_people;
    }

    function formatEpilogueDiscussion(specQ, bullets, path) {
      const aks =
        path === "slav"
          ? `<li><strong>Aksakov vs. Chaadaev:</strong> Does grounding legitimacy in <em>narod</em> and soil answer Chaadaev’s shame about “universal history,” or merely change the subject? Can Slavophile thought protect Evgeny, or only idealize the village?</li>`
          : "";
      const lis = bullets.map((b) => `<li>${b}</li>`).join("");
      return `<h4>Speculative question</h4><p><em>${specQ}</em></p><h4>For class discussion</h4><ul>${lis}${aks}</ul>`;
    }

    /**
     * BACKLOG — priority order (user):
     *
     * (1) Narrative + teaching voice — synthesized pass (do together, in this order):
     *   (a) Foundational notes from vetted plot/theme companions (SparkNotes-caliber or equivalent) plus
     *       McNally & Tempest (Letter I), Arndt (Bronze Horseman), SOURCES.md.
     *   (b) Read alongside + scene glue: replace ornamental glosses with text-grounded lines (what the
     *       passage does, who speaks, concrete link to the branch)—not filler connectives.
     *   (c) EPILOGUE_TWELVE: in-scene salon voice shipped; winter block = optional misfit lead-in,
     *       event-keyed winterEcho, path coda (west | slav | statist | med). Tune with Read pass (b).
     *
     * (2) Scene imagery item 2b: diversify center-panel art where scenes still reuse the same file; keep
     *     period-appropriate picks and rails ≠ center (see SCENE_IMAGES / SCENE_RAIL_IMAGES comments).
     *
     * (3) Icons / chrome polish if still desired.
     *
     * (4) Optional: assign SCENE_COLOR_SCHEME or per-scene :root[data-scene-id] palette tweaks once moods are set.
     */
    /** path × framing (order | reform | people): title, body, speculative Q, discussion bullets. */
    const EPILOGUE_TWELVE = {
      west: {
        order: {
          title: "Ending: The Ranks of Civilization",
          body: `The coals were ash before anyone called the winter finished. <strong>Andrei</strong> had the last steady voice: whatever had crossed the threshold—censor, water, rumor from the north—the version he would carry to well-born cousins was one. Calm files and legible ranks had to eat first; salons could not digest Europe on an empty stomach. <strong>Stepan</strong> turned a Chaadaev copy face-down and said that was the very “cloak” the letter mocked—stationery dignity without breath. <strong>Vera</strong> asked whether Pushkin’s Neva had ever waited on a minister’s signature. <strong>Father Dimitri</strong> scrubbed ink from his cuff and muttered for drowned rooms nobody on the Order side had named aloud.

Still, the story they would tell on the ride home was <strong>Andrei’s</strong>: Russia must survive its teachers before it becomes worthy of them—and if that puts Chaadaev’s shame in the police ledger instead of the schoolhouse, each of them would have to live with which ledger they trusted.`,
          specQ:
            "If stability is the prerequisite Chaadaev doubted, are you proving him wrong, or are you showing that his “cloak” fits the police better than the school?",
          bullets: [
            "Does administrative continuity count as participation in “universal history” if debate never leaves the anteroom?",
            "In <em>The Bronze Horseman</em>, who is the hero of “progress” when the group frames a Westernizing winter through Andrei’s Order lens?",
            "Letter I faults hollow borrowing. Does Order-first reform repeat what Chaadaev feared, or supply the soil that reform needs?"
          ]
        },
        reform: {
          title: "Ending: The Syllabus and the Censor",
          body: `<strong>Stepan</strong> refused to let the night die on talk of fate alone. He laid his palm on the dog-eared proofs they had risked to print and said the winter proved only what Chaadaev already knew: a nation’s “education” lives in law and mother tongue—and the Third Section still owned both doors. <strong>Andrei</strong> warned him not to mistake scraps of permission for a constitution. <strong>Father Dimitri</strong> said that if couriers had brought flood-echo from the north, then reform drafted in Petersburg had once again arrived sodden on someone else’s doorstep. <strong>Vera</strong> kept her counsel, but she did not put out the lamp.

They did not settle it. They agreed, sourly, to close the chapter on <strong>Stepan’s</strong> terms: the moral center of their year would be syllabi, petitions, and the war of ink—not bronze parades—while everyone in the room knew the censor’s light still burned in the next corridor.`,
          specQ: "Can “universal history” be studied in rooms that the censor still owns?",
          bullets: [
            "Were Westernizers right that Russia had to risk instability to join “universal history,” or does Chaadaev exaggerate discontinuity?",
            "When reform runs ahead of Order, is repression inevitable in an autocratic empire, or contingent?",
            "How does Pushkin’s flood complicate faith in rational planning and legal reform?"
          ]
        },
        people: {
          title: "Ending: Evgeny’s Europeans",
          body: `<strong>Father Dimitri</strong> would not bless the parting until the room said “clerk” without flinching. Pushkin’s Yevgeny had haunted their autumn; now the priest made him present: if “Europe” was only statutes and salons, he said, Kolomna could starve in syllogisms. <strong>Vera</strong>—who had opened with French novels—quoted Letter I’s ladder from court down to the owned soul and asked where any syllabus touched it. <strong>Andrei</strong> called the sentiment beautiful and ungovernable. <strong>Stepan</strong>, wiping soot from the shutter, conceded that borrowed institutions mean nothing if flood beds never reach the ledger.

They left with an uneasy pact: the winter they would retell weighted bodies before abstractions—Chaadaev’s mirror held against Pushkin’s pauper grave until someone’s horse changed.`,
          specQ: "Who is “Europe” for if the syllabus never reaches Kolomna?",
          bullets: [
            "Can borrowed institutions become authentic if they improve ordinary lives when you weighted People at the close, or does Chaadaev demand cultural continuity that reform alone cannot supply?",
            "Does Pushkin’s poem obligate the state to care about clerks and flood victims, or only to mourn them in art?",
            "Compare this outcome to the mediator path: is bottom-up legitimacy enough to answer Chaadaev, or must Russia also “matter” on a European stage?"
          ]
        }
      },
      slav: {
        order: {
          title: "Ending: The Vertical Iconostasis",
          body: `Lamplight caught the icons while <strong>Andrei</strong>—an unexpected ally for soil-talk—drew one long stroke: altar, throne, <em>narod</em>, no crack for scandal-mongers. The Slavophile voices warmed until <strong>Vera</strong> asked who spoke for the hamlet when the ministry borrowed the same words. Pages on schism and “miserable Byzantium” still lay open; nobody pretended they answered each other. <strong>Father Dimitri</strong> wondered whether Pushkin’s clerk could live inside a story told as spiritual deference—or whether he would always snag the silk like a burr.

They shelved the doubt for carriage-oaths. Winter, in <strong>Andrei’s</strong> retelling, had shown Holy Russia and good order sharing one tale—whether the tale still had room for correction from below, the road would test.`,
          specQ: "When the state claims to speak for the soil, who is left to correct it from below?",
          bullets: [
            "When does <em>narod</em> language serve the village, and when does it ornament the ministry?",
            "Where do Chaadaev’s charges about borrowed forms land if Order is sacralized as organic?",
            "Does <em>The Bronze Horseman</em>’s clerk fit a Slavophile story told through Order, or does he break the iconostasis?"
          ]
        },
        reform: {
          title: "Ending: Parish Ink, Capital Light",
          body: `<strong>Stepan</strong> surprised them: he took Aksakov’s vocabulary without surrendering ink. Parish schools, stewards the district could name, German verbs in Russian mouths—so long as no one waved a foreign constitution like a relic. <strong>Vera</strong> doubted “selective” stayed selective once Petersburg counted rubles. <strong>Andrei</strong> listened for treason, heard none, and allowed that perhaps “rights” could stay in Latin while silver stayed local. <strong>Father Dimitri</strong> asked when the hybrid hardened into orthodoxy Chaadaev would still peel off as costume.

No answer satisfied. They agreed only that their winter would end on <strong>Stepan’s</strong> picture—parish ink, capital light, argument left honest and unfinished.`,
          specQ: "At what moment does “selective” borrowing become a new orthodoxy Chaadaev would still call hollow?",
          bullets: [
            "Trace parallels to parish schools and local elites. When is hybrid reform substantive vs. symbolic?",
            "Does Chaadaev’s shame about “universal history” apply to Slavophile curricula that borrow technique but refuse rights language?",
            "Can Pushkin’s Petersburg clerk be “European” in a Slavophile reform frame, or must he be rewritten?"
          ]
        },
        people: {
          title: "Ending: The Soil and the Roof",
          body: `<strong>Father Dimitri</strong> made <em>narod</em> a material argument, not embroidery. Clerks who shivered, peasants whose tithe fed someone else’s church silver—if Slavophile love stopped at the village linden, he called it gentry vanity with incense. <strong>Andrei</strong> flinched; throne-and-soil talk had not rehearsed Kolomna. <strong>Vera</strong> translated grief into lines a zemstvo dream might someday fund. <strong>Stepan</strong> quoted Chaadaev on strangers under one roof and asked whether their circle was less strange now.

Pushkin and the letter refused to let the abstract float where someone drowned. They closed on <strong>Father Dimitri’s</strong> frame: soil that mattered had to mean roofs the chronicles skipped—or their Slav year was only a prettier exile from Chaadaev’s shame.`,
          specQ: "Does Slavophile language obligate policy for the capital’s clerk, or only for the imagined village?",
          bullets: [
            "Material life vs. idealized village: where does historiography place the clerk in narodnik genealogies (without equating eras)?",
            "Can soil-based legitimacy answer Evgeny’s fate, or only the gentry’s conscience?",
            "Letter I’s upper-class vices: does a People-first Slavophile reading change how fair Chaadaev sounds?"
          ]
        }
      },
      statist: {
        order: {
          title: "Ending: The File Outlives the Salon",
          body: `The dossier had grown thick enough to shame the brazier. <strong>Andrei’s</strong> circle—statists by habit, never by crown—agreed that what survived winter was stamped, numbered, triplicate. Names fed to the Third Section sat in someone’s throat like stones; others shrugged and said continuity was its own civilization. <strong>Stepan</strong> looked ill; Reform starved faster without air than he liked to admit. <strong>Vera</strong> asked whether “who thinks for Russia?” had been answered a little too neatly by police ink. <strong>Father Dimitri</strong> whispered Evgeny’s name once, then let it vanish into protocol.

Their public story: ranks held; the salon had been a case category; thought, for the moment, lived in margins the chief allowed. Chaadaev’s question waited inside the cover sheet—unread, not gone.`,
          specQ: "Is obedience to process a kind of civilization, or its costume while thought stays rented?",
          bullets: [
            "Police and file culture as modern statecraft. Does continuity equal legitimacy in the secondary readings you assign?",
            "When Order is maximized, who is structurally unprotected? Use Evgeny as a test case.",
            "Does high Order without strong People reproduce Letter I’s pattern of elite vice detached from civic depth?"
          ]
        },
        reform: {
          title: "Ending: Commissioned Progress",
          body: `Europe arrived as memoranda—<strong>Stepan’s</strong> bitter joke landed flat. Commissions, patron letters, reform only where chiefs allowed ribbon and triplicate: that was the harvest they chose to narrate. <strong>Andrei</strong> praised triage; <strong>Vera</strong> named friends who would sign nothing bold again. <strong>Father Dimitri</strong> asked whether mankind’s long “education” could happen only upstairs; his voice thinned when no one answered.

Paperwork could mimic borrowing without depth—Letter I’s curse in fair copy. Still <strong>Stepan’s</strong> closing carried: Russia would change where margins allowed, dignity measured in folders, never faster than a corridor could stomach.`,
          specQ: "If reform lives in triplicate copies, does mankind’s “education” happen, or does paperwork replace it?",
          bullets: [
            "Walicki and others on mimicry from above: when does borrowed form thicken into substance?",
            "Is “managed transformation” moral participation in civilization or bureaucratic borrowing without depth?",
            "Who falls through the cracks when Order and Reform are both respectable on paper?"
          ]
        },
        people: {
          title: "Ending: Relief Without Receipt",
          body: `<strong>Father Dimitri</strong> framed mercy because rights-talk would have split them from their hosts. Flood-year letters, petitions for imperial relief, the throne as father who might soften—he spun winter as grace, not structure. <strong>Andrei</strong> exhaled; mercy read well in patron letters. <strong>Stepan</strong> said quietly that supplication saves no one the law forgets. <strong>Vera</strong> asked who the story rescued—the drowned clerk or only the portrait of a merciful center.

They left the question rustling like sealed paper. Their agreed tale: people had appeared as objects of grace this season; whether grace became justice, the file would not say.`,
          specQ: "When you beg the center for flood victims, who is saved: them, or the story that the throne is merciful?",
          bullets: [
            "Imperial charity vs. rights: how do historians narrate mercy rhetoric after disaster?",
            "Does Pushkin obligate the state to more than symbolic relief?",
            "Can a strong People emphasis coexist with a narrative of grace rather than entitlement, and is that stable?"
          ]
        }
      },
      med: {
        order: {
          title: "Ending: The Minister’s Bridge",
          body: `<strong>Andrei</strong> likened their compromise to a bridge with one stone pier and one of rope: the ministry owned the stone; locals got rope and gratitude. Mediator hopes thinned but did not snap. <strong>Stepan</strong> argued rope could hold if traffic stayed light; <strong>Vera</strong> said traffic never stayed light. <strong>Father Dimitri</strong> prayed for engineers honest enough to weigh both ends in one breath. They had tried to fuse Chaadaev’s borrowed forms with soil-trust; winter had taught them sequencing under veto.

The story <strong>Andrei</strong> set for the road: order first, local voice a concession—honest about power, cruel about equality, perhaps the only span that stood in mud season.`,
          specQ: "If one pier is stone and one is rope, is “compromise” just delayed collapse?",
          bullets: [
            "Imperial center vs. provinces: this scenario borrows zemstvo-era imagery for local pilots before those laws existed. Does scholarship on the real zemstvo period still sharpen discussion of the ministry–local clashes in play?",
            "Is an uneasy equilibrium realistic, or does one value usually dominate?",
            "Which of Chaadaev’s three charges does a mediator Order frame address least well?"
          ]
        },
        reform: {
          title: "Ending: Borrowed Law, Local Accent",
          body: `<strong>Stepan</strong> closed with law translated through provincial mouths—foreign on parchment, Russian in the schoolyard; neither pure import nor sealed autarchy. <strong>Father Dimitri</strong> liked the music; <strong>Vera</strong> asked how many accents a code could bear before chiefs called it chaos. <strong>Andrei</strong> wanted schedules; compromise’s enemy was always impatience. They remembered Letter I on inner progression and laughed without mirth.

Their winter ended on <strong>Stepan’s</strong> bet: hybrid from the first line; borrowed until proven native by lives, not slogans—knowing the moment of proof might belong to whoever held the ink.`,
          specQ: "How long must a law be “borrowed” before it becomes native, and who declares the moment?",
          bullets: [
            "Hybrid institutions: when does narrative call a statute Russian rather than European?",
            "Compare mediator reform to pure Westernizing or statist tracks. Same texts, different closure?",
            "Chaadaev on authentic vs. mimetic institutions: does local accent cure hollow borrowing?"
          ]
        },
        people: {
          title: "Ending: The Ledger They Share",
          body: `<strong>Father Dimitri</strong> made the ledgers kiss—one line for ministry wheat, one for parish rye, a total a hungry eye could read. <strong>Stepan</strong> called it bookkeeping mysticism; <strong>Andrei</strong> called it survival. <strong>Vera</strong> said Chaadaev had named absence, not overlap; Pushkin had named bodies. They agreed to tell winter as material synthesis: not only a rhetorical middle, but budgets clerks and clerics could audit together.

Whether one ledger always became footnote to the other, none would swear; the closing chose hope over schema—the walk home carried two books, one satchel, one argument still breathing.`,
          specQ:
            "Two ledgers, one countryside: must one always become the footnote, or is overlap itself the synthesis Chaadaev could not name?",
          bullets: [
            "Fiscal accountability to communities: who counted in the reform coalition this ending implies?",
            "Does material overlap answer Pushkin’s “who pays” without dissolving Order?",
            "Letter I as salon text vs. spiritual counsel: does genre change how fair the synthesis in this closing sounds?"
          ]
        }
      }
    };

    function buildRunSummary(ep) {
      const path = state.pathId || "west";
      const pathLabels = { west: "Westernizing", slav: "Slavophile", statist: "Statist", med: "Mediator" };
      const visited = state.history.map((id) => (scenes[id] ? scenes[id].title : id)).join(" → ");
      const inv = Array.from(state.inventory).map((id) => ITEMS[id] || id).join("; ") || "(none)";
      const lines = [
        "Russia at the Crossroads (run summary)",
        "────────────────────────────",
        "Course: MLCS-599",
        `Run ID: ${getRunId()}`,
        `Session title: ${ep.runTitle}`,
        `Epilogue: ${ep.title}`,
        `Track: ${pathLabels[path] || path}`,
        `Final: Order ${state.stats.order} · Reform ${state.stats.reform} · People ${state.stats.people}`,
        `Winter event: ${rollOutcomeLabel(state.lastEvent || "event_censor")}`,
        `Winter misfit (wrong rumor): ${state.crisisMisfit ? state.crisisMisfitKind || "yes" : "no"}`,
        `Framing: ${state.finalLeanApplied || "(none)"}`,
        `Evgeny chorus path: ${state.evgenyChorus ? "yes" : "no"}`,
        `Run tags: ${state.runTags.size ? Array.from(state.runTags).join(", ") : "(none)"}`,
        `Scars: ${state.scars.size ? Array.from(state.scars).join(", ") : "(none)"}`,
        `Walkouts: ${state.walkouts.size ? Array.from(state.walkouts).join(", ") : "(none)"}`,
        "",
        "Library: " + inv,
        "",
        "Scenes visited:",
        visited || "(start only)"
      ];
      if (ep.ach && ep.ach.length) lines.push("", "Unlocked: " + ep.ach.join("; "));
      if (state.lastCoopBallotReveal) lines.push("", "Co-op ballot (last reveal): " + state.lastCoopBallotReveal);
      return lines.join("\n");
    }

    function rollOutcomeLabel(key) {
      const labels = {
        event_salon: "Salon breakthrough.",
        event_flood_echo: "Flood echo in the north.",
        event_censor: "Censor strikes.",
        event_rural_gentry: "Provincial gentry resist the ministry plan.",
        event_zemstvo_clash: "Ministry vetoes the local pilot."
      };
      return labels[key] || key;
    }

    const clamp = (n) => Math.max(0, Math.min(100, n));

    function applyEffects(eff) {
      if (!eff) return;
      state.stats.order = clamp(state.stats.order + (eff.order || 0));
      state.stats.reform = clamp(state.stats.reform + (eff.reform || 0));
      state.stats.people = clamp(state.stats.people + (eff.people || 0));
    }

    function addItem(key) {
      if (!key || !ITEMS[key]) return false;
      if (state.inventory.has(key)) return false;
      state.inventory.add(key);
      return true;
    }

    const ACH_TOAST = {
      bronze_reader: "Token: engaged Pushkin’s Petersburg poem.",
      people_champion: "Achievement: People’s advocate (75+).",
      iron_order: "Achievement: High Order (80+).",
      reform_fire: "Achievement: High Reform (80+).",
      lucky_six: "Achievement: Rolled a 6 on fate.",
      aksakov_reader: "Token: Aksakov notes in the satchel.",
      evgeny_framing: "Rare: Evgeny’s chorus framing.",
      evgeny_merged_insight: "Rare: Letter + poem + strong People."
    };

    function pushToast(message) {
      if (!message) return;
      const region = document.getElementById("toastRegion");
      if (!region) return;
      const t = document.createElement("div");
      t.className = "game-toast";
      t.setAttribute("role", "status");
      t.textContent = message;
      region.appendChild(t);
      const ms = prefersReducedMotion() ? 5000 : 3400;
      window.setTimeout(() => {
        t.remove();
      }, ms);
    }

    function flushNewAchievementsToasts() {
      const before = new Set(state.achievements);
      checkAchievements();
      state.achievements.forEach((k) => {
        if (!before.has(k) && ACH_TOAST[k]) pushToast(ACH_TOAST[k]);
      });
    }

    function getRunId() {
      try {
        const k = "chaadaev_run_id";
        let id = sessionStorage.getItem(k);
        if (!id) {
          id = `R-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
          sessionStorage.setItem(k, id);
        }
        return id;
      } catch (e) {
        return "R-local";
      }
    }

    function commitChoice(choice) {
      if (choice.roll) {
        const bonus = Math.floor(state.stats.order / 25);
        const roll = 1 + Math.floor(Math.random() * 6);
        state.lastRoll = roll;
        const total = roll + bonus;
        const nextKey = pickCrisisEvent(total, roll);
        state.lastEvent = nextKey;
        state.history.push(state.current);
        state.current = nextKey;
        state.steps += 1;
        state.keepBanner = true;
        let misfitNote = "";
        if (state.crisisMisfit) {
          misfitNote =
            state.crisisMisfitKind === "snake"
              ? " <em>Winter misfit:</em> double ones on a strong hand: the wrong rumor forced the door anyway."
              : " <em>Winter misfit:</em> a six from nowhere on a thin total: luck rewrote which story stuck.";
        }
        showEventBanner(`<strong>Fate roll:</strong> d6 = ${roll} + Order bonus ${bonus} = <strong>${total}</strong> · ${state.pathId || "west"} track. ${rollOutcomeLabel(nextKey)}.${misfitNote}`);
        flushNewAchievementsToasts();
        statBars();
        renderInventory();
        renderScene();
        return;
      }

      state.history.push(state.current);
      if (choice.path) state.pathId = choice.path;
      if (choice.stateTag) state.runTags.add(choice.stateTag);
      if (choice.walkout) state.walkouts.add(choice.walkout);
      if (choice.scar) state.scars.add(choice.scar);
      if (choice.effects) applyEffects(choice.effects);
      if (choice.item && addItem(choice.item)) pushToast(`Library: ${ITEMS[choice.item].replace(/<[^>]+>/g, "")}`);
      if (choice.item2 && addItem(choice.item2)) pushToast(`Library: ${ITEMS[choice.item2].replace(/<[^>]+>/g, "")}`);
      if (choice.next && String(choice.next).indexOf("final_route") === 0) {
        state.evgenyChorus = choice.evgenyChorus === true;
      }

      let next = choice.next;
      if (next && typeof next === "string" && next.indexOf("crisis_") === 0) {
        state.steps += 1;
        state.current = next;
        statBars();
        renderInventory();
        renderScene();
        return;
      }

      if (next === "ending_computed") {
        const prev = scenes[state.history[state.history.length - 1]];
        if (prev && prev.tag) {
          state.finalLean = prev.tag;
          state.finalLeanApplied = prev.tag;
        }
        state.steps += 1;
        state.current = next;
        statBars();
        renderInventory();
        renderScene();
        return;
      }

      state.current = next;
      state.steps += 1;
      statBars();
      renderInventory();
      renderScene();
    }

    function prefersReducedMotion() {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    (function markMotionAndViewTransitionFlags() {
      const h = document.documentElement;
      if (typeof document.startViewTransition === "function") h.classList.add("vt-capable");
      if (prefersReducedMotion()) h.classList.add("vt-reduced");
    })();

    function skipViewTransition() {
      if (prefersReducedMotion()) return true;
      if (typeof document.startViewTransition !== "function") return true;
      return state.steps === 0 && state.history.length === 0 && state.current === "intro";
    }

    function truncateNavTitle(s, maxLen) {
      const t = String(s || "").replace(/\s+/g, " ").trim();
      if (t.length <= maxLen) return t;
      return t.slice(0, maxLen - 1) + "…";
    }

    function statBars() {
      ["order", "reform", "people"].forEach((k) => {
        const v = state.stats[k];
        const cap = k.charAt(0).toUpperCase() + k.slice(1);
        const barEl = document.getElementById("bar" + cap);
        const valEl = document.getElementById("val" + cap);
        barEl.style.height = v + "%";
        valEl.textContent = String(v);
      });
    }

    function renderInventory() {
      const ul = document.getElementById("inventoryList");
      ul.innerHTML = "";
      if (state.inventory.size === 0) {
        ul.innerHTML = "<li class=\"empty\">Nothing yet.</li>";
        return;
      }
      state.inventory.forEach((id) => {
        const li = document.createElement("li");
        const iconSvg = ITEM_ICONS[id] || INV_SVG.doc;
        li.innerHTML = `<span class="inv-ico" aria-hidden="true">${iconSvg}</span><span>${ITEMS[id]}</span>`;
        ul.appendChild(li);
      });
    }

    function formatEffects(eff) {
      if (!eff) return "";
      const parts = [];
      if (eff.order) parts.push(`Order ${eff.order > 0 ? "+" : ""}${eff.order}`);
      if (eff.reform) parts.push(`Reform ${eff.reform > 0 ? "+" : ""}${eff.reform}`);
      if (eff.people) parts.push(`People ${eff.people > 0 ? "+" : ""}${eff.people}`);
      return parts.join(" · ");
    }

    /** Scene copy may include <em> etc.; must use innerHTML, not textContent. Newlines → <br>. */
    function sceneBodyHtml(raw) {
      if (raw == null || raw === "") return "";
      return String(raw)
        .replace(/\r\n/g, "\n")
        .replace(/\n/g, "<br>");
    }

    function showEventBanner(html) {
      const b = document.getElementById("eventBanner");
      b.innerHTML = html;
      b.classList.add("visible");
    }

    function hideEventBanner() {
      document.getElementById("eventBanner").classList.remove("visible");
    }

    function checkAchievements() {
      if (state.inventory.has("pushkin_bronze")) {
        state.achievements.add("bronze_reader");
      }
      if (state.stats.people >= 75) state.achievements.add("people_champion");
      if (state.stats.order >= 80) state.achievements.add("iron_order");
      if (state.stats.reform >= 80) state.achievements.add("reform_fire");
      if (state.lastRoll === 6) state.achievements.add("lucky_six");
      if (state.inventory.has("aksakov_note")) state.achievements.add("aksakov_reader");
      if (state.evgenyChorus) state.achievements.add("evgeny_framing");
      const P = state.stats.people;
      if (state.inventory.has("chaadaev_letter") && state.inventory.has("pushkin_bronze") && P >= 60) {
        state.achievements.add("evgeny_merged_insight");
      }
    }

    function resolveEndingText() {
      if (state.finalLean === "order") state.stats.order = clamp(state.stats.order + 5);
      if (state.finalLean === "reform") state.stats.reform = clamp(state.stats.reform + 5);
      if (state.finalLean === "people") state.stats.people = clamp(state.stats.people + 5);
      state.finalLean = null;

      const { order: O, reform: R, people: P } = state.stats;
      const path = state.pathId || "west";
      const lean = state.finalLeanApplied || "order";
      const endingKey = `${path}_${lean}`;

      const byPath = EPILOGUE_TWELVE[path] || EPILOGUE_TWELVE.west;
      const pack = byPath[lean] || byPath.order;
      const title = pack.title;
      let body = pack.body;
      const discussion = formatEpilogueDiscussion(pack.specQ, pack.bullets, path);

      const event = state.lastEvent || "event_censor";
      const winterEcho = {
        event_salon:
          "Outside, the wax-and-tea smell of the governor’s hall still clung to someone’s cuff—one sanctioned night when letter and poem had shared a candle, and no one could quite file it away. <strong>Vera</strong> said the breakthrough had felt like air; <strong>Andrei</strong> said air that sweet usually meant someone upstairs had opened a vent on purpose.",
        event_flood_echo:
          "North-country letters had soaked every argument; cold water, they muttered, does not ask which program you defended before it breaks the sill. <strong>Father Dimitri</strong> crossed himself for drowned rooms named only in postscripts; <strong>Stepan</strong> swore the Neva had drafted their metaphors without asking.",
        event_censor:
          "Seals and missing pages sat in the middle of the table like a fifth guest nobody had invited. <strong>Stepan</strong> could still taste ash from proofs pulled mid-phrase; <strong>Andrei</strong> argued continuity required some pages to stay blank, then hated himself a little for saying it aloud.",
        event_rural_gentry:
          "Provincial obstinacy still rattled in <strong>Stepan’s</strong> throat—the ministry’s neat map had torn on a gentry nail. <strong>Vera</strong> translated the resistance into rents and tutors; <strong>Father Dimitri</strong> wondered aloud whose icon corner the decree had skipped.",
        event_zemstvo_clash:
          "The struck pilot fund left a bruise no manifesto could paint over; trust and paper had divorced in daylight. <strong>Andrei</strong> called it triage; <strong>Stepan</strong> called it a lesson in which ledger ate the other when budgets met mercy."
      };
      const pathWinterCoda = {
        west:
          "From the Westernizing bench, Europe still sounded like verdict as much as model—winter had not let them file that habit away.",
        slav:
          "The Slavophile corner kept testing whether soil-talk could still sound humble once it had survived a ministry winter.",
        statist:
          "The filing instinct in the room had won its morning; whether mercy lived in the margin was a question they shelved with the ink.",
        med:
          "Mediator habits died hard—they still heard two ledgers arguing under one roof while the horses were called."
      };
      let winterBlock = "";
      if (state.crisisMisfit) {
        winterBlock +=
          "The room had bet on a different kind of winter; the seal on the courier’s packet did not match the rehearsal—contingency had walked in wearing another track’s coat.\n\n";
      }
      winterBlock +=
        winterEcho[event] || "Winter had left its own punctuation; no two of them quoted it the same way—and each swore the other had misheard the postscript.";
      winterBlock += "\n\n" + (pathWinterCoda[path] || pathWinterCoda.west);
      body += "\n\n" + winterBlock;

      if (state.evgenyChorus) {
        body += `\n\n<strong>Vera</strong> had pressed them to stop treating letter, poem, and clerk as separate files; the circle let her have the last inch of ink—one moral ledger, one winter, no more polite partitions.`;
      }

      let secretHtml = "";
      if (state.inventory.has("chaadaev_letter") && state.inventory.has("pushkin_bronze") && P >= 60) {
        secretHtml = `<div class="secret-insight"><strong>Rare alignment:</strong> Chaadaev and Pushkin both travel in the satchel, and the room has refused to let People stay an afterthought. If “civilization” never touches the clerk’s roof, the bronze rider is threat, not partner—and someone said so aloud before the lamps went out.</div>`;
      }

      const runTitle = computeRunTitle(endingKey, path, O, R, P);
      const historiography = historiographyNudge(endingKey);

      const achBefore = new Set(state.achievements);
      checkAchievements();
      state.achievements.forEach((k) => {
        if (!achBefore.has(k) && ACH_TOAST[k]) pushToast(ACH_TOAST[k]);
      });

      const extras = [];
      if (state.inventory.has("pushkin_bronze")) {
        extras.push(`The <em>Bronze Horseman</em> lesson stays vivid: greatness and grief share one map.`);
      }
      if (state.inventory.has("chaadaev_letter")) {
        extras.push(`Chaadaev's letter remains the cold mirror: borrowed forms, broken continuity, the demand for a moral future.`);
      }
      if (state.inventory.has("aksakov_note")) {
        extras.push(`Aksakov's wager stays in the satchel: <em>narod</em> and soil against borrowed law. Whether that heals or evades Chaadaev remains contested.`);
      }
      if (state.walkouts.has("vera")) {
        extras.push(`Vera’s absence after the seizure debate cost the circle an honest conservative interlocutor. The ending is colder in the corners.`);
      }
      if (state.crisisMisfit) {
        extras.push(`Winter’s messenger arrived with the wrong coat on: history came as contingency, not as the parable the table had rehearsed.`);
      }
      if (state.runTags.has("intro_pushkin_first")) {
        extras.push(`You privileged Pushkin’s clerk early. Prose and policy stayed tangled in one bundle, and sequence mattered.`);
      }
      if (state.scars.has("petition_winter")) {
        extras.push(`The petition detour scarred the autumn: forms ate time the journals could have used.`);
      }

      const unresolvedHtml = buildUnresolvedEpilogue(O, R, P);

      const ach = [];
      if (state.achievements.has("bronze_reader")) ach.push("Engaged Pushkin's Petersburg poem");
      if (state.achievements.has("people_champion")) ach.push("People's advocate (75+)");
      if (state.achievements.has("iron_order")) ach.push("High Order (80+)");
      if (state.achievements.has("reform_fire")) ach.push("High Reform (80+)");
      if (state.achievements.has("lucky_six")) ach.push("Rolled a 6 on fate");
      if (state.achievements.has("aksakov_reader")) ach.push("Engaged Aksakov (Slavophile voice)");
      if (state.achievements.has("evgeny_framing")) ach.push("Evgeny’s chorus framing");
      if (state.achievements.has("evgeny_merged_insight")) ach.push("Letter + poem + strong People (60+)");

      return { title, body, extras, ach, discussion, runTitle, historiography, secretHtml, unresolvedHtml };
    }

    const titleEl = document.getElementById("title");
    const textEl = document.getElementById("text");
    const choicesEl = document.getElementById("choices");

    /** Park the bar in #coopToolsActionBarDock (still in document) so innerHTML never orphans it. */
    function stashCoopActionBarBeforeChoicesWipe() {
      const bar = document.getElementById("coopToolsActionBar");
      const dock = document.getElementById("coopToolsActionBarDock");
      if (bar && dock) dock.appendChild(bar);
    }

    function appendCoopActionBarIntoChoices() {
      const bar = document.getElementById("coopToolsActionBar");
      if (bar && choicesEl) choicesEl.appendChild(bar);
    }

    const sceneIdTextEl = document.getElementById("sceneIdText");
    const stepsTextEl = document.getElementById("stepsText");
    const eraTextEl = document.getElementById("eraText");
    const endingBlock = document.getElementById("endingBlock");
    const sceneCrumbEl = document.getElementById("sceneCrumb");
    const tensionValEl = document.getElementById("tensionVal");
    const tensionFillEl = document.getElementById("tensionFill");

    function updateSalometry() {
      const trail = state.history.slice(-4);
      const ids = trail.concat(state.current);
      const parts = [];
      for (let i = 0; i < ids.length; i += 1) {
        const sid = ids[i];
        const sc = scenes[sid];
        const label = truncateNavTitle(sc && sc.title ? sc.title : sid, 32);
        const isLast = i === ids.length - 1;
        parts.push(`<span class="crumb-chip${isLast ? " is-current" : ""}">${label}</span>`);
        if (!isLast) parts.push('<span class="crumb-sep" aria-hidden="true">→</span>');
      }
      if (sceneCrumbEl) {
        sceneCrumbEl.innerHTML =
          parts.join("") ||
          `<span class="crumb-chip is-current">${truncateNavTitle((scenes[state.current] && scenes[state.current].title) || state.current, 32)}</span>`;
      }
      const { order: O, reform: R, people: P } = state.stats;
      const spread = Math.max(O, R, P) - Math.min(O, R, P);
      if (tensionValEl) tensionValEl.textContent = String(spread);
      if (tensionFillEl) tensionFillEl.style.width = spread + "%";
      document.documentElement.setAttribute("data-tension", spread >= 40 ? "high" : "low");
    }

    function animateChoiceButtonsIfNeeded() {
      if (prefersReducedMotion() || !window.gsap) return;
      const nodes = choicesEl.querySelectorAll(".choice-btn");
      if (!nodes.length) return;
      window.gsap.from(nodes, {
        opacity: 0,
        y: 12,
        stagger: 0.055,
        duration: 0.42,
        ease: "power2.out",
        clearProps: "opacity,transform"
      });
    }

    function stripChoiceLabel(html) {
      return String(html || "")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    function setCoopBallotWrapVisible(show) {
      const wrap = document.getElementById("coopMainBallotWrap");
      if (wrap) wrap.hidden = !show;
    }

    function refreshCoopBallotUI() {
      const mount = document.getElementById("coopBallotMount");
      const discuss = document.getElementById("coopToolsDiscuss");
      const actionBar = document.getElementById("coopToolsActionBar");
      const cb = document.getElementById("coopToolsEnable");
      const sumEl = document.getElementById("coopBallotSummary");
      const stance = document.getElementById("coopStanceOk");
      const applyBtn = document.getElementById("coopApplyMajority");
      if (!mount || !discuss || !actionBar) return;
      const enabled = !!(cb && cb.checked);
      state.coopToolsEnabled = enabled;
      discuss.hidden = !enabled;
      if (!enabled) {
        actionBar.hidden = true;
        mount.innerHTML = "";
        setCoopBallotWrapVisible(false);
        if (sumEl) sumEl.textContent = "";
        return;
      }
      const list = state._coopChoicesSnapshot || [];
      if (!list.length) {
        actionBar.hidden = true;
        mount.innerHTML = "";
        setCoopBallotWrapVisible(false);
        if (sumEl) sumEl.textContent = "";
        return;
      }
      actionBar.hidden = false;
      setCoopBallotWrapVisible(true);
      const roles = [
        {
          id: "coopV1",
          step: "1",
          realm: "Order",
          title: "Player 1 · Order",
          hint: "Speak for ranks, continuity, and ministry logic—not as the sovereign, but for the vertical everyone leans on.",
          mod: "coop-seat--order"
        },
        {
          id: "coopV2",
          step: "2",
          realm: "Reform",
          title: "Player 2 · Reform",
          hint: "Speak for law, schools, print, and Chaadaev’s wager on institutions that could become real.",
          mod: "coop-seat--reform"
        },
        {
          id: "coopV3",
          step: "3",
          realm: "People",
          title: "Player 3 · People",
          hint: "Speak for clerks, flood-side lives, provincial cost, and Evgeny’s side of the poem.",
          mod: "coop-seat--people"
        }
      ];
      let h = '<div class="coop-seats-row" role="group" aria-label="Three-player votes for this beat">';
      roles.forEach((r) => {
        h += `<article class="coop-seat ${r.mod}" aria-labelledby="${r.id}-hd">`;
        h += `<div class="coop-seat-badge"><span class="coop-seat-step">${r.step}</span><span class="coop-seat-realm">${r.realm}</span></div>`;
        h += `<h4 class="coop-seat-title" id="${r.id}-hd">${r.title}</h4>`;
        h += `<p class="coop-seat-hint">${r.hint}</p>`;
        h += `<label class="coop-seat-vote-label" for="${r.id}">Lock your vote</label>`;
        h += `<select id="${r.id}" class="coop-select" autocomplete="off">`;
        h += "<option value=\"\">— choose —</option>";
        list.forEach((ch, i) => {
          const t = stripChoiceLabel(ch.text).slice(0, 56);
          h += `<option value="${i}">${i + 1}. ${t}${t.length >= 56 ? "…" : ""}</option>`;
        });
        h += "</select></article>";
      });
      h += "</div>";
      mount.innerHTML = h;
      mount.onchange = updateCoopApplyGate;
      state._coopReveal = false;
      if (sumEl) sumEl.textContent = "";
      if (stance) stance.checked = false;
      if (applyBtn) applyBtn.disabled = true;
    }

    function coopMajorityChoiceIndex() {
      const v1 = document.getElementById("coopV1");
      const v2 = document.getElementById("coopV2");
      const v3 = document.getElementById("coopV3");
      if (!v1 || !v2 || !v3) return -1;
      if (v1.value === "" || v2.value === "" || v3.value === "") return -1;
      const a = +v1.value;
      const b = +v2.value;
      const c = +v3.value;
      const counts = {};
      [a, b, c].forEach((i) => {
        counts[i] = (counts[i] || 0) + 1;
      });
      let bestI = a;
      let bestN = 0;
      Object.keys(counts).forEach((k) => {
        const kk = +k;
        const n = counts[kk];
        if (n > bestN || (n === bestN && kk < bestI)) {
          bestN = n;
          bestI = kk;
        }
      });
      return bestI;
    }

    function updateCoopApplyGate() {
      const applyBtn = document.getElementById("coopApplyMajority");
      const stance = document.getElementById("coopStanceOk");
      if (!applyBtn || !stance) return;
      const list = state._coopChoicesSnapshot || [];
      const idx = coopMajorityChoiceIndex();
      applyBtn.disabled = !(stance.checked && idx >= 0 && list[idx]);
    }

    function mountChoiceButtons(choicesToRender, icoDice, icoBranch) {
      stashCoopActionBarBeforeChoicesWipe();
      choicesEl.innerHTML = "";
      choicesToRender.forEach((choice) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice-btn";
        const fx = choice.effects ? formatEffects(choice.effects) : "";
        if (fx) button.title = `Meter shift if you choose this: ${fx}`;
        const ico = choice.roll ? icoDice : icoBranch;
        button.innerHTML = choice.roll
          ? `${ico}<span class="choice-btn-main"><span class="main">${choice.text}</span></span>`
          : `${ico}<span class="choice-btn-main"><span class="main">${choice.text}</span>${fx ? `<span class="fx">${fx}</span>` : ""}</span>`;
        button.addEventListener("click", () => {
          if (state.coopToolsEnabled) {
            pushToast("Co-op gating on: each seat votes to match an option below, then Reveal → commit → Apply under the buttons.");
            return;
          }
          commitChoice(choice);
        });
        choicesEl.appendChild(button);
      });
      appendCoopActionBarIntoChoices();
      if (choicesToRender.length > 0 && !(choicesToRender.length === 1 && choicesToRender[0].roll)) {
        const ped = document.createElement("details");
        ped.className = "choice-pedagogy";
        const track = state.pathId ? `<strong>${state.pathId}</strong> (argument track locked)` : "<strong>not locked</strong> until you take a forking choice";
        ped.innerHTML = `<summary>How to read meter lines on choices</summary><p class="choice-pedagogy-body">Numbers show how <strong>Order</strong>, <strong>Reform</strong>, and <strong>People</strong> move—institutional costs, not a hidden “correct” score. Track: ${track}. Hover or focus a button for a plain-language <strong>title</strong> preview.</p>`;
        choicesEl.appendChild(ped);
      }
      state._coopChoicesSnapshot = choicesToRender;
    }

    function mountResolveEndingsRealmBudget(choicesToRender, icoDice, icoBranch) {
      stashCoopActionBarBeforeChoicesWipe();
      choicesEl.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "realm-budget-pilot";
      wrap.setAttribute("role", "region");
      wrap.setAttribute("aria-label", "Shared realm budget before final framing");
      wrap.innerHTML = `<h3 class="realm-budget-title">Co-op beat: spend winter attention</h3>
<p class="realm-budget-lead">With <strong>co-op tools on</strong>, your group shares <strong>${REALM_BUDGET_POOL_POINTS} points</strong> to add across Order, Reform, and People before choosing how to <em>frame</em> the story. Each bar stays capped at 100. Negotiate, spend the full pool, then commit—the three framing choices appear next.</p>
<p class="realm-budget-pool-live" role="status" aria-live="polite"></p>
<div class="realm-budget-rows">
<div class="realm-budget-row" data-key="order"><span class="realm-budget-label order">Order</span><span class="realm-budget-combined"></span><div class="realm-budget-btns"><button type="button" class="ghost realm-budget-minus" aria-label="Remove one budget point from Order">−</button><button type="button" class="ghost realm-budget-plus" aria-label="Add one budget point to Order">+</button></div></div>
<div class="realm-budget-row" data-key="reform"><span class="realm-budget-label reform">Reform</span><span class="realm-budget-combined"></span><div class="realm-budget-btns"><button type="button" class="ghost realm-budget-minus" aria-label="Remove one budget point from Reform">−</button><button type="button" class="ghost realm-budget-plus" aria-label="Add one budget point to Reform">+</button></div></div>
<div class="realm-budget-row" data-key="people"><span class="realm-budget-label people">People</span><span class="realm-budget-combined"></span><div class="realm-budget-btns"><button type="button" class="ghost realm-budget-minus" aria-label="Remove one budget point from People">−</button><button type="button" class="ghost realm-budget-plus" aria-label="Add one budget point to People">+</button></div></div>
</div>
<button type="button" class="primary realm-budget-commit">Commit budget and show framing choices</button>`;
      choicesEl.appendChild(wrap);
      const live = wrap.querySelector(".realm-budget-pool-live");
      function poolUsed() {
        const d = state.realmBudgetDraft;
        return d.order + d.reform + d.people;
      }
      function refreshBudgetUI() {
        const d = state.realmBudgetDraft;
        const left = REALM_BUDGET_POOL_POINTS - poolUsed();
        live.textContent = `Points remaining: ${left} / ${REALM_BUDGET_POOL_POINTS}`;
        wrap.querySelectorAll(".realm-budget-row").forEach((row) => {
          const key = row.getAttribute("data-key");
          const add = d[key];
          const base = state.stats[key];
          row.querySelector(".realm-budget-combined").textContent = `${base} → ${base + add} (+${add})`;
          row.querySelector(".realm-budget-plus").disabled = left <= 0 || base + add >= 100;
          row.querySelector(".realm-budget-minus").disabled = add <= 0;
        });
      }
      function canAddAnywhere() {
        const d = state.realmBudgetDraft;
        return ["order", "reform", "people"].some((k) => state.stats[k] + d[k] < 100);
      }
      wrap.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        if (btn.classList.contains("realm-budget-commit")) {
          const used = poolUsed();
          if (used < REALM_BUDGET_POOL_POINTS && canAddAnywhere()) {
            pushToast(`Spend the full ${REALM_BUDGET_POOL_POINTS} points (use +/− to move weight) before you commit.`);
            return;
          }
          if (used < REALM_BUDGET_POOL_POINTS && !canAddAnywhere()) {
            pushToast("Bars are at or near 100—committing the budget you could place.");
          }
          applyEffects({ order: state.realmBudgetDraft.order, reform: state.realmBudgetDraft.reform, people: state.realmBudgetDraft.people });
          state.realmBudgetCommittedResolveEndings = true;
          showEventBanner("<strong>Budget committed:</strong> " + formatEffects(state.realmBudgetDraft));
          mountChoiceButtons(choicesToRender, icoDice, icoBranch);
          refreshCoopBallotUI();
          statBars();
          renderInventory();
          updateSalometry();
          animateChoiceButtonsIfNeeded();
          return;
        }
        const row = btn.closest(".realm-budget-row");
        if (!row) return;
        const key = row.getAttribute("data-key");
        const d = state.realmBudgetDraft;
        const left = REALM_BUDGET_POOL_POINTS - poolUsed();
        if (btn.classList.contains("realm-budget-plus") && left > 0 && state.stats[key] + d[key] < 100) {
          d[key] += 1;
          refreshBudgetUI();
        }
        if (btn.classList.contains("realm-budget-minus") && d[key] > 0) {
          d[key] -= 1;
          refreshBudgetUI();
        }
      });
      refreshBudgetUI();
      appendCoopActionBarIntoChoices();
    }

    function renderScene() {
      if (!state.keepBanner) hideEventBanner();
      state.keepBanner = false;

      const paint = () => {
      const scene = scenes[state.current];
      if (state.current !== "resolve_endings") state.realmBudgetCommittedResolveEndings = false;
      if (state.current === "resolve_endings" && state._prevSceneForBudget !== "resolve_endings") {
        state.realmBudgetDraft = { order: 0, reform: 0, people: 0 };
      }
      syncAppChrome(state.current, scene);
      endingBlock.innerHTML = "";

      if (scene.computed) {
        const ep = resolveEndingText();
        state.lastRunSummary = buildRunSummary(ep);
        titleEl.textContent = ep.title;
        textEl.innerHTML =
          `<div class="run-title-banner"><strong>Session title:</strong> ${ep.runTitle}</div>` + sceneBodyHtml(ep.body);
        let html = "";
        if (ep.secretHtml) html += ep.secretHtml;
        html += `<div class="ending-extra"><strong>Final scores</strong><br>Order ${state.stats.order} · Reform ${state.stats.reform} · People ${state.stats.people}<br><br>${ep.extras.join("<br>")}</div>`;
        if (ep.ach.length) {
          html += `<div class="achievements"><strong>Unlocked</strong>: ${ep.ach.join(" · ")}</div>`;
        }
        html += `<div class="historio-nudge">${ep.historiography}</div>`;
        if (ep.discussion) {
          html += `<div class="discussion-box">${ep.discussion}</div>`;
        }
        if (ep.unresolvedHtml) {
          html += ep.unresolvedHtml;
        }
        html += `<div class="ending-actions"><button type="button" class="ghost" id="copySummaryBtn">Copy run summary</button> <span class="copy-toast" id="copyToast" role="status" aria-live="polite" hidden>Copied.</span></div>`;
        const path = state.pathId || "west";
        const pack = EPILOGUE_TWELVE[path] || EPILOGUE_TWELVE.west;
        const cmp = (k, lab) => {
          const p = pack[k];
          if (!p) return "";
          const snip = String(p.body).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 140);
          return `<div class="debrief-compare-card"><h4>${lab}</h4><p><strong>${p.title}</strong></p><p class="debrief-snippet">${snip}…</p></div>`;
        };
        html += `<details class="debrief-lab"><summary>Debrief lab: compare framings (read-only)</summary><p class="debrief-lab-lead">Same path (<strong>${path}</strong>), three closing lenses. Your run used one; the others are snippets only—no stat change.</p><div class="debrief-compare-grid">${cmp("order", "Order lens")}${cmp("reform", "Reform lens")}${cmp("people", "People lens")}</div><button type="button" class="ghost" id="debriefPeekBtn">Branch peek: another path’s winter flavor (read-only)</button></details>`;
        html += `<details class="realm-debrief-lab"><summary>Debrief toy: coupled realm sliders (does not change saved scores)</summary><p class="realm-debrief-lead">Total fixed at 150. Drag one bar; the others rebalance—useful for arguing scarcity after the run.</p><div class="realm-coupled-row"><label>Order <span id="debValO">50</span><input type="range" id="debRngO" min="0" max="150" value="50" /></label></div><div class="realm-coupled-row"><label>Reform <span id="debValR">50</span><input type="range" id="debRngR" min="0" max="150" value="50" /></label></div><div class="realm-coupled-row"><label>People <span id="debValP">50</span><input type="range" id="debRngP" min="0" max="150" value="50" /></label></div></details>`;
        endingBlock.innerHTML = html;
        const copyBtn = document.getElementById("copySummaryBtn");
        const toast = document.getElementById("copyToast");
        if (copyBtn && toast) {
          copyBtn.addEventListener("click", () => {
            const t = state.lastRunSummary || "";
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(t).then(() => {
                toast.hidden = false;
                setTimeout(() => { toast.hidden = true; }, 2000);
              });
            } else {
              prompt("Copy this summary:", t);
            }
          });
        }
        const peekBtn = document.getElementById("debriefPeekBtn");
        const peekDlg = document.getElementById("debriefPeekDlg");
        const peekBody = document.getElementById("debriefPeekBody");
        const peekClose = document.getElementById("debriefPeekClose");
        const PEEK_TEXT = {
          west:
            "<strong>Westernizing track:</strong> mid totals often bring <strong>Neva flood echoes</strong> into salon talk; high totals favor a sanctioned reading night; low totals draw the censor.",
          slav:
            "<strong>Slavophile track:</strong> mid totals stress <strong>provincial gentry</strong> resisting ministry school maps; high totals can still open a salon; soil and parish rhetoric color the rumor.",
          statist:
            "<strong>Statist track:</strong> there is no separate mid-band in code—high totals frame <strong>flood logistics</strong>; lower totals fold into <strong>censor</strong> pressure.",
          med:
            "<strong>Mediator track:</strong> mid totals trigger <strong>zemstvo-style</strong> pilot funds vs. ministry veto; high totals still allow a salon night; low totals mean censor."
        };
        if (peekBtn && peekDlg && peekBody) {
          peekBtn.addEventListener("click", () => {
            const cur = state.pathId || "west";
            const alt = ["west", "slav", "statist", "med"].find((p) => p !== cur) || "west";
            peekBody.innerHTML = `<p><strong>Branch peek</strong> — your run: <strong>${cur}</strong>. Showing <strong>${alt}</strong> winter logic (read-only):</p><p>${PEEK_TEXT[alt]}</p>`;
            if (typeof peekDlg.showModal === "function") peekDlg.showModal();
          });
        }
        if (peekClose && peekDlg) {
          peekClose.addEventListener("click", () => peekDlg.close());
        }
        if (peekDlg) {
          peekDlg.addEventListener("click", (e) => {
            if (e.target === peekDlg) peekDlg.close();
          });
        }
        (function wireRealmDebriefSliders() {
          const rO = document.getElementById("debRngO");
          const rR = document.getElementById("debRngR");
          const rP = document.getElementById("debRngP");
          const vO = document.getElementById("debValO");
          const vR = document.getElementById("debValR");
          const vP = document.getElementById("debValP");
          if (!rO || !rR || !rP || !vO || !vR || !vP) return;
          const T = 150;
          function write(o, r, p) {
            o = Math.max(0, Math.min(T, Math.round(o)));
            r = Math.max(0, Math.min(T, Math.round(r)));
            p = T - o - r;
            if (p < 0) {
              p = 0;
              r = T - o;
            }
            rO.value = String(o);
            rR.value = String(r);
            rP.value = String(p);
            vO.textContent = String(o);
            vR.textContent = String(r);
            vP.textContent = String(p);
          }
          function onInput(changed) {
            let o = +rO.value;
            let r = +rR.value;
            let p = +rP.value;
            if (changed === "o") {
              const rem = T - o;
              const sumRP = r + p;
              if (sumRP <= 0) {
                r = Math.floor(rem / 2);
                p = rem - r;
              } else {
                r = Math.round(rem * (r / sumRP));
                p = rem - r;
              }
            } else if (changed === "r") {
              const rem = T - r;
              const sumOP = o + p;
              if (sumOP <= 0) {
                o = Math.floor(rem / 2);
                p = rem - o;
              } else {
                o = Math.round(rem * (o / sumOP));
                p = rem - o;
              }
            } else {
              const rem = T - p;
              const sumOR = o + r;
              if (sumOR <= 0) {
                o = Math.floor(rem / 2);
                r = rem - o;
              } else {
                o = Math.round(rem * (o / sumOR));
                r = rem - o;
              }
            }
            write(o, r, p);
          }
          rO.addEventListener("input", () => onInput("o"));
          rR.addEventListener("input", () => onInput("r"));
          rP.addEventListener("input", () => onInput("p"));
          write(50, 50, 50);
        })();
        sceneIdTextEl.textContent = `Scene: ${scene.title}`;
        stepsTextEl.textContent = `Turn: ${state.steps}`;
        eraTextEl.textContent = `Era: 1836–37`;
        stashCoopActionBarBeforeChoicesWipe();
        choicesEl.innerHTML = "";
        const endBtn = document.createElement("button");
        endBtn.className = "choice-btn";
        endBtn.textContent = "Play again";
        endBtn.addEventListener("click", restart);
        choicesEl.appendChild(endBtn);
        appendCoopActionBarIntoChoices();
        state._coopChoicesSnapshot = [];
        refreshCoopBallotUI();
        statBars();
        renderInventory();
        updateSceneVisuals(state.current);
        updateSalometry();
        animateChoiceButtonsIfNeeded();
        state._prevSceneForBudget = state.current;
        return;
      }

      titleEl.textContent = scene.title;
      let sceneText = scene.text;
      if (state.current === "resolve_endings") {
        state.evgenyChorus = false;
        const lead = RESOLVE_PATH_LEAD[state.pathId || "west"];
        if (lead) sceneText = lead + "\n\n" + sceneText;
      }
      let prefix = "";
      if (scene.crisisRoll) prefix = buildCrisisRecap();
      textEl.innerHTML = prefix + prependSceneCallbacks(state.current) + sceneBodyHtml(sceneText) + appendSceneEnrichment(scene);
      sceneIdTextEl.textContent = `Scene: ${scene.title}`;
      stepsTextEl.textContent = `Turn: ${state.steps}`;
      eraTextEl.textContent = state.steps >= 4 ? "Era: 1836–37" : "Era: 1836";

      stashCoopActionBarBeforeChoicesWipe();
      choicesEl.innerHTML = "";

      if (scene.forcedEffects && !state.sceneApplied.has(state.current)) {
        applyEffects(scene.forcedEffects);
        state.sceneApplied.add(state.current);
        showEventBanner("<strong>Event applied:</strong> " + formatEffects(scene.forcedEffects));
      }

      if (!scene.choices || !scene.choices.length) {
        const endBtn = document.createElement("button");
        endBtn.className = "choice-btn";
        endBtn.textContent = "Return to start";
        endBtn.addEventListener("click", restart);
        choicesEl.appendChild(endBtn);
        appendCoopActionBarIntoChoices();
        state._coopChoicesSnapshot = [];
        refreshCoopBallotUI();
        statBars();
        renderInventory();
        updateSceneVisuals(state.current);
        updateSalometry();
        animateChoiceButtonsIfNeeded();
        state._prevSceneForBudget = state.current;
        return;
      }

      let choicesToRender = scene.choices;
      if (state.current === "resolve_endings") {
        choicesToRender = scene.choices.slice();
        if (state.inventory.has("chaadaev_letter") && state.inventory.has("pushkin_bronze") && state.stats.people >= 55) {
          choicesToRender.push({
            text: "<strong>Vera</strong> (quietly): “Stop treating them as separate files: Chaadaev, Pushkin, and the clerk belong in one moral reckoning.” <em>(Rare: Evgeny’s chorus framing.)</em>",
            next: "final_route_people",
            evgenyChorus: true,
            effects: { people: 3 }
          });
        }
      }

      const icoDice =
        '<span class="choice-ico" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="8.5" cy="8.5" r="0.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="0.5" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="0.5" fill="currentColor" stroke="none"/></svg></span>';
      const icoBranch =
        '<span class="choice-ico choice-ico--branch" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v12"/><circle cx="6" cy="3" r="2"/><circle cx="6" cy="15" r="2"/><path d="M6 9h8l4 4"/><circle cx="18" cy="15" r="2"/></svg></span>';

      if (scene.coopRealmBudgetBeforeChoices && state.coopToolsEnabled && !state.realmBudgetCommittedResolveEndings) {
        mountResolveEndingsRealmBudget(choicesToRender, icoDice, icoBranch);
        state._coopChoicesSnapshot = [];
        refreshCoopBallotUI();
      } else {
        mountChoiceButtons(choicesToRender, icoDice, icoBranch);
        refreshCoopBallotUI();
      }

      statBars();
      renderInventory();
      updateSceneVisuals(state.current);
      updateSalometry();
      animateChoiceButtonsIfNeeded();
      state._prevSceneForBudget = state.current;
      };

      if (skipViewTransition()) {
        paint();
      } else {
        document.startViewTransition(paint);
      }
    }

    let coopTimerInterval = null;

    function restart() {
      if (coopTimerInterval) clearInterval(coopTimerInterval);
      coopTimerInterval = null;
      const disp = document.getElementById("coopTimerDisplay");
      if (disp) disp.textContent = "—";
      const cb = document.getElementById("coopToolsEnable");
      if (cb) cb.checked = false;
      state.coopToolsEnabled = false;
      state.current = "intro";
      state.steps = 0;
      state.history = [];
      state.stats = { order: 50, reform: 50, people: 50 };
      state.pathId = null;
      state.lastEvent = null;
      state.inventory = new Set();
      state.achievements = new Set();
      state.lastRoll = null;
      state.sceneApplied = new Set();
      state.keepBanner = false;
      state.finalLean = null;
      state.finalLeanApplied = null;
      state.evgenyChorus = false;
      state.lastRunSummary = "";
      state.crisisMisfit = false;
      state.crisisMisfitKind = null;
      state.runTags = new Set();
      state.scars = new Set();
      state.walkouts = new Set();
      state._coopReveal = false;
      state._coopChoicesSnapshot = null;
      state.realmBudgetCommittedResolveEndings = false;
      state.realmBudgetDraft = { order: 0, reform: 0, people: 0 };
      state._prevSceneForBudget = null;
      state.lastCoopBallotReveal = "";
      hideEventBanner();
      refreshCoopBallotUI();
      renderScene();
    }

    function goBack() {
      if (!state.history.length) return;
      hideEventBanner();
      state.current = state.history.pop();
      state.steps = Math.max(0, state.steps - 1);
      renderScene();
    }

    document.getElementById("restartBtn").addEventListener("click", restart);
    document.getElementById("backBtn").addEventListener("click", goBack);

    const glossaryModal = document.getElementById("glossaryModal");
    document.getElementById("glossaryBtn").addEventListener("click", () => {
      glossaryModal.classList.add("open");
    });
    document.getElementById("glossaryClose").addEventListener("click", () => {
      glossaryModal.classList.remove("open");
    });
    glossaryModal.addEventListener("click", (e) => {
      if (e.target === glossaryModal) glossaryModal.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") glossaryModal.classList.remove("open");
    });

    (function wireCoopTools() {
      const en = document.getElementById("coopToolsEnable");
      const start = document.getElementById("coopTimerStart");
      const stop = document.getElementById("coopTimerStop");
      const reveal = document.getElementById("coopRevealVotes");
      const hide = document.getElementById("coopHideVotes");
      const apply = document.getElementById("coopApplyMajority");
      const stance = document.getElementById("coopStanceOk");
      const disp = document.getElementById("coopTimerDisplay");
      if (en) en.addEventListener("change", refreshCoopBallotUI);
      if (stance) stance.addEventListener("change", updateCoopApplyGate);
      if (start && disp) {
        start.addEventListener("click", () => {
          if (coopTimerInterval) clearInterval(coopTimerInterval);
          let left = 30;
          disp.textContent = `${left}s`;
          coopTimerInterval = setInterval(() => {
            left -= 1;
            disp.textContent = left > 0 ? `${left}s` : "—";
            if (left <= 0) {
              clearInterval(coopTimerInterval);
              coopTimerInterval = null;
            }
          }, 1000);
        });
      }
      if (stop && disp) {
        stop.addEventListener("click", () => {
          if (coopTimerInterval) clearInterval(coopTimerInterval);
          coopTimerInterval = null;
          disp.textContent = "—";
        });
      }
      if (reveal) {
        reveal.addEventListener("click", () => {
          const list = state._coopChoicesSnapshot || [];
          const sumEl = document.getElementById("coopBallotSummary");
          const labels = ["Order", "Reform", "People"];
          const ids = ["coopV1", "coopV2", "coopV3"];
          const parts = ids.map((id, j) => {
            const el = document.getElementById(id);
            const v = el && el.value;
            if (v === "") return `${labels[j]}: (no vote)`;
            const ch = list[+v];
            return `${labels[j]} → ${stripChoiceLabel(ch && ch.text).slice(0, 42)}`;
          });
          const line = parts.join(" · ");
          if (sumEl) sumEl.textContent = line;
          state.lastCoopBallotReveal = line;
        });
      }
      if (hide) {
        hide.addEventListener("click", () => {
          const sumEl = document.getElementById("coopBallotSummary");
          if (sumEl) sumEl.textContent = "";
          state.lastCoopBallotReveal = "";
        });
      }
      if (apply) {
        apply.addEventListener("click", () => {
          const list = state._coopChoicesSnapshot || [];
          const idx = coopMajorityChoiceIndex();
          const st = document.getElementById("coopStanceOk");
          if (!st || !st.checked || idx < 0 || !list[idx]) return;
          const cbx = document.getElementById("coopToolsEnable");
          if (cbx) cbx.checked = false;
          state.coopToolsEnabled = false;
          refreshCoopBallotUI();
          commitChoice(list[idx]);
        });
      }
    })();

    (function applySceneFromQuery() {
      try {
        const q = new URLSearchParams(location.search).get("scene");
        if (!q || !scenes[q]) return;
        state.current = q;
        state.history = [];
        state.steps = 0;
        pushToast(`Deep link: scene “${q}” — default meters; not a full playthrough path.`);
      } catch (e) {}
    })();

    (function initSkipLink() {
      const a = document.querySelector("a.skip-link");
      const h = document.getElementById("title");
      if (!a || !h) return;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        h.focus({ preventScroll: true });
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        h.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
      });
    })();

    refreshCoopBallotUI();
    renderScene();
