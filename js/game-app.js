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
        const amb = SCENE_AMBIENT[sceneId] || "salon";
        contentEl.setAttribute("data-ambient", amb);
        if (typeof MLCS599Ambient !== "undefined" && MLCS599Ambient.crossfadeTo) {
          MLCS599Ambient.crossfadeTo(amb);
        }
      }
      if (!bg || !credit || !source) {
        setSceneSideRails(null);
        return;
      }
      bg.classList.remove("content-scene-bg--gradient-only");
      if (entry && entry.bgGradient && !entry.src) {
        bg.style.backgroundImage = "none";
        bg.style.background = entry.bgGradient;
        bg.style.backgroundPosition = "";
        bg.style.backgroundSize = "cover";
        bg.classList.add("content-scene-bg--gradient-only");
        setSceneSideRails(null);
        const gNote = entry.credit || "Colour wash only (no period plate for this beat).";
        credit.innerHTML = gNote.endsWith(".") ? gNote : gNote + ".";
        source.hidden = false;
        return;
      }
      if (!entry || !entry.src) {
        bg.style.backgroundImage = "none";
        bg.style.background = "";
        bg.style.backgroundPosition = "";
        bg.style.backgroundSize = "";
        setSceneSideRails(null);
        source.hidden = true;
        credit.innerHTML = "";
        return;
      }
      bg.style.background = "";
      bg.style.backgroundSize = "";
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
      if (entry.railsHidden) {
        setSceneSideRails(null);
      } else if (railPick && railPick.src) {
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

    /** Plain-language bands before the winter roll (pairs with <code>#crisisPreviewCard</code> for screen readers). */
    function crisisPreviewCardHtml() {
      const path = state.pathId || "west";
      const bonus = Math.floor(state.stats.order / 25);
      const O = state.stats.order;
      const R = state.stats.reform;
      const P = state.stats.people;
      const spread = Math.max(O, R, P) - Math.min(O, R, P);
      const minT = 1 + bonus;
      const maxT = 6 + bonus;
      const bands = {
        west:
          "<strong>Westernizing:</strong> total <strong>≥8</strong> → salon breakthrough · <strong>5–7</strong> → Neva flood echo · <strong>≤4</strong> → censor strike.",
        slav:
          "<strong>Slavophile:</strong> <strong>≥8</strong> sympathetic salon · <strong>5–7</strong> provincial gentry resist ministry schools · <strong>≤4</strong> censor.",
        statist:
          "<strong>Statist:</strong> <strong>≥8</strong> flood framed as logistics / emergency · <strong>≤7</strong> censor (no separate mid band in code).",
        med:
          "<strong>Mediator:</strong> <strong>≥8</strong> salon · <strong>5–7</strong> zemstvo-style pilot vs. ministry · <strong>≤4</strong> censor."
      };
      return `<aside class="crisis-preview-card" id="crisisPreviewCard" role="region" aria-label="Likely winter outcomes before you roll">
        <h3 class="crisis-preview-title">Crisis preview (before you roll)</h3>
        <p class="crisis-preview-lead">You will roll <strong>1d6 + ${bonus}</strong> (Order is ${O} → bonus ${bonus}). Possible totals this throw: <strong>${minT}</strong> through <strong>${maxT}</strong>.</p>
        <p class="crisis-preview-band">${bands[path] || bands.west}</p>
        <p class="crisis-preview-misfit"><strong>Misfits:</strong> raw die <strong>1</strong> with total <strong>≥7</strong>, or die <strong>6</strong> with total <strong>≤5</strong>, can force <em>another path’s</em> scandal, contingency, not the parable you rehearsed.</p>
        <p class="crisis-preview-meters">Current meters: Order ${O} · Reform ${R} · People ${P} · spread ${spread}.</p>
      </aside>`;
    }

    const state = {
      current: "session_format",
      steps: 0,
      history: [],
      pathId: null,
      lastEvent: null,
      stats: { order: 50, reform: 50, people: 50 },
      inventory: new Set(),
      achievements: new Set(),
      lastRoll: null,
      lastWinterTotal: null,
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
      lastCoopBallotReveal: "",
      ephemeralScenePrefix: "",
      inventoryFlashKey: null
    };

    const COURIER_WHISPER_SCENES = ["beat_west_print", "beat_aksakov", "beat_statist_machine", "beat_med_bridge"];

    /**
     * Shared “winter attention” pool at resolve_endings (before final framing choices; solo or co-op). Sizes tie to
     * the same totals as pickCrisisEvent: west/slav/med use T≤4, 5≤T≤7, T≥8; statist uses T≤7 vs T≥8 only. Uses only
     * magnitudes on that ruler: 3 (low / statist non-high), 5 (mid or default when winter total unknown), 8 (high).
     */
    function getRealmBudgetPoolPoints() {
      const T = state.lastWinterTotal;
      const p = state.pathId || "west";
      if (T == null || T < 1) return 5;
      if (p === "statist") return T >= 8 ? 8 : 3;
      if (T >= 8) return 8;
      if (T >= 5) return 5;
      return 3;
    }

    /** Co-op gating preference for this tab (sessionStorage); mirrors checkbox #coopToolsEnable. "1" on, "0" off; missing = default on (class play). */
    const COOP_TOOLS_PREF_KEY = "mlcs599_coop_tools_enabled";

    function persistCoopToolsPref(enabled) {
      try {
        sessionStorage.setItem(COOP_TOOLS_PREF_KEY, enabled ? "1" : "0");
      } catch (e) {}
    }

    function readCoopToolsPrefEnabled() {
      try {
        const v = sessionStorage.getItem(COOP_TOOLS_PREF_KEY);
        if (v === "0") return false;
        return true;
      } catch (e) {
        return true;
      }
    }

    function applyStoredCoopToolsPrefToCheckbox() {
      const cb = document.getElementById("coopToolsEnable");
      if (cb) cb.checked = readCoopToolsPrefEnabled();
    }

    /** Re-apply session pref and mirror checkbox → state (call at each scene paint so gating never goes stale vs DOM). */
    function applyCoopPrefToDomAndState() {
      applyStoredCoopToolsPrefToCheckbox();
      const cb = document.getElementById("coopToolsEnable");
      state.coopToolsEnabled = !!(cb && cb.checked);
    }

    /** Optional URL override: ?coop=0 or ?coop=off (solo), ?coop=1 or ?coop=on (force on). Only runs when the param is present. */
    function applyCoopPrefFromQueryIfPresent() {
      try {
        const raw = new URLSearchParams(location.search).get("coop");
        if (raw == null || raw === "") return;
        const q = String(raw).trim().toLowerCase();
        if (q === "0" || q === "false" || q === "off" || q === "no") persistCoopToolsPref(false);
        else if (q === "1" || q === "true" || q === "on" || q === "yes") persistCoopToolsPref(true);
      } catch (e) {}
    }

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
      return `${crisisPreviewCardHtml()}<div class="path-recap" role="note"><strong>Before you roll the winter die</strong> (3-player co-op: the <strong>Order</strong> player summarizes this box aloud first.)<br>Argument track you joined: <strong>${pathNames[path] || path}</strong> · Order ${O} · Reform ${R} · People ${P}<br>Add to the six-sided die: <strong>+${bonus}</strong> (take Order, divide by 25, round down).<br><em>${leanHint}</em></div>${crisisRollExplanationHtml()}`;
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
        pre += `<p class="crisis-misfit"><strong>Winter misfit:</strong> The rumor that reached you was meant for another table: hard luck when you felt safe, easy luck when you felt weak. Treat it as couriers and old scores crossing wires, not the story you rehearsed by the lamp.</p>`;
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

    function formatEpilogueDiscussion(specQ, bullets, path) {
      const aks =
        path === "slav"
          ? `<li><strong>Aksakov vs. Chaadaev:</strong> Does rooting legitimacy in <em>narod</em> and soil answer Chaadaev’s shame about “universal history,” or only change the subject? Can Slavophile thought protect Evgeny, or only prettify the village?</li>`
          : "";
      const lis = bullets.map((b) => `<li>${b}</li>`).join("");
      return `<h4>Speculative question</h4><p><em>${specQ}</em></p><h4>For class discussion</h4><ul>${lis}${aks}</ul>`;
    }

    /**
     * BACKLOG; priority order (user):
     *
     * (1) Narrative + teaching voice; synthesized pass (do together, in this order):
     *   (a) Foundational notes from vetted plot/theme companions (SparkNotes-caliber or equivalent) plus
     *       McNally & Tempest (Letter I), Arndt (Bronze Horseman), SOURCES.md.
     *   (b) Read alongside + scene glue: replace ornamental glosses with text-grounded lines (what the
     *       passage does, who speaks, concrete link to the branch), not filler connectives.
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
          body: `The fire had burned to ash long before anyone admitted the winter was over. In the gray light, <strong>Andrei</strong> spoke last and spoke plainly. Whatever had happened at the door (censor, high water, rumor from the north), the story he would carry to his cousins had one spine: <strong>the offices had to hold first</strong>. Papers had to read the same upstairs and down; ranks had to mean something. You could not feed a country on salon talk about Europe if the table itself was tipping.

<strong>Stepan</strong> turned the Chaadaev copy face-down on the table. That, he said, was the hollow dignity the letter had mocked: beautiful stationery, no air in the room. <strong>Vera</strong> asked whether Pushkin’s Neva had ever waited for a minister’s signature before it rose. <strong>Father Dimitri</strong> scrubbed ink from his cuff and named, under his breath, rooms that had flooded, rooms no one on Andrei’s side of the argument had mentioned aloud.

When the horses were called, they still rode out on <strong>Andrei’s</strong> version: Russia has to <strong>live through</strong> its masters before it can deserve its teachers. If that leaves Chaadaev in the police file instead of the schoolroom, each of them would have to sleep with the choice.`,
          specQ:
            "If stability has to come first, are you proving Chaadaev wrong about Russia’s gap, or showing that his “cloak of civilization” fits the police office better than the classroom?",
          bullets: [
            "Does running the state smoothly count as joining “universal history” if real debate never leaves the waiting room?",
            "In <em>The Bronze Horseman</em>, who counts as the face of “progress” when you end the winter on Order?",
            "Letter I attacks empty borrowing. Does putting Order first repeat that emptiness, or give reform something solid to stand on?"
          ]
        },
        reform: {
          title: "Ending: The Syllabus and the Censor",
          body: `<strong>Stepan</strong> would not let the night end on sighs about fate. He rested his hand on the dog-eared pages they had risked printing and said the winter had shown, again, what Chaadaev meant: a country is “educated” in its <strong>laws</strong> and in whether people can use their own language in public, and the Third Section still guarded both doors. <strong>Andrei</strong> warned him not to mistake a few permissions for a constitution. <strong>Father Dimitri</strong> added that if letters from the north had brought flood news, then whatever reform they drafted in Petersburg had once more arrived <strong>soaking</strong> on someone else’s step. <strong>Vera</strong> said nothing. She did not put out the lamp.

They did not settle the fight. They agreed, sourly, to close the year on <strong>Stepan’s</strong> terms: the part of the winter they would be proud of was syllabi, petitions, and the war on the page, not bronze parades, while every one of them knew the censor’s lamp still burned in the next corridor.`,
          specQ: "Can you really study “universal history” in rooms the secret police still own?",
          bullets: [
            "Were Westernizers right that Russia had to risk disorder to join world history, or does Chaadaev overstate the break with the past?",
            "When reform runs ahead of the state’s comfort, is crackdown inevitable in an autocracy, or only likely?",
            "How does Pushkin’s flood undercut trust in neat plans and tidy laws?"
          ]
        },
        people: {
          title: "Ending: Evgeny’s Europeans",
          body: `<strong>Father Dimitri</strong> blocked the door until someone in the room said <strong>clerk</strong> out loud and meant it. Pushkin’s poor clerk had haunted their autumn; now the priest made him flesh. If “Europe” meant only laws and drawing rooms, he said, then ordinary streets could <strong>starve</strong> while the argument stayed elegant. <strong>Vera</strong>, who had opened the season with French novels, quoted Chaadaev’s ladder from the court down to the owned life and asked which line of any syllabus touched the bottom rung. <strong>Andrei</strong> called that line beautiful and said he could not administer it. <strong>Stepan</strong>, wiping soot from the shutter, admitted that foreign models mean nothing if the river never reaches the account book.

They left with a fragile pact: the winter they would retell is one that <strong>weighed bodies before abstractions</strong>: Chaadaev’s mirror held up to Pushkin’s pauper grave until the carriage wheels turned.`,
          specQ: "Who is “Europe” for if the lesson plan never reaches the clerk’s street?",
          bullets: [
            "If institutions help real lives, can they still be “borrowed” in Chaadaev’s sense, or does he demand a kind of cultural depth law cannot supply?",
            "Does Pushkin’s poem require the state to care for flood victims, or only to mourn them in verse?",
            "Compared with the mediator path: is local trust enough to answer Chaadaev, or must Russia also “count” on a European stage?"
          ]
        }
      },
      slav: {
        order: {
          title: "Ending: The Vertical Iconostasis",
          body: `Lamplight slid across the icons. <strong>Andrei</strong> (no one had expected him to speak for the soil party) drew one clean line with his finger in the air: altar, throne, <em>narod</em>, no gap for scandal merchants. The Slavophile voices warmed to it until <strong>Vera</strong> asked a simple question: when the ministry uses the same words, <strong>who speaks for the hamlet</strong>? The pages on schism and “miserable Byzantium” stayed open; no one pretended they answered each other. <strong>Father Dimitri</strong> asked whether Pushkin’s clerk could live inside a story told as humble faith, or whether he would always catch on the silk like a burr.

They packed the doubt away for the ride. In <strong>Andrei’s</strong> retelling, winter had shown Holy Russia and good order <strong>in one story</strong>. Whether that story still left room for correction from below; the road would test.`,
          specQ: "When the crown says it speaks for the land, who is left to correct it from underneath?",
          bullets: [
            "When does talk of the <em>narod</em> serve the village, and when does it decorate a ministry dispatch?",
            "If Order is treated as sacred and “natural,” where do Chaadaev’s warnings about borrowed forms still bite?",
            "Does Pushkin’s clerk fit a Slavophile ending told through Order, or does he break the frame?"
          ]
        },
        reform: {
          title: "Ending: Parish Ink, Capital Light",
          body: `<strong>Stepan</strong> surprised the table: he kept Aksakov’s words but not Aksakov’s quiet. Parish schools; stewards the district could actually name; German textbooks read aloud in Russian, as long as no one waved a foreign charter like a holy relic. <strong>Vera</strong> said “a little borrowing” never stayed little once Petersburg counted the rubles. <strong>Andrei</strong> listened for treason, heard none, and allowed that maybe “rights” could stay in Latin while the silver stayed local. <strong>Father Dimitri</strong> asked when the mix would harden into a new costume Chaadaev would strip off the same way.

No answer landed. They agreed only that their winter would end on <strong>Stepan’s</strong> picture: <strong>ink in the parish, light from the capital</strong>, argument honest and still open.`,
          specQ: "At what point does “we only borrow a little” turn into a new hollow shell Chaadaev would still recognize?",
          bullets: [
            "Parish schools and local notables: when is hybrid reform real, and when is it show?",
            "Does Chaadaev’s shame about “universal history” hit Slavophile schools that borrow method but refuse rights talk?",
            "Can Pushkin’s clerk stay “European” in this frame, or does the story have to rewrite him?"
          ]
        },
        people: {
          title: "Ending: The Soil and the Roof",
          body: `<strong>Father Dimitri</strong> made <em>narod</em> a question of <strong>roofs and bellies</strong>, not embroidery. Clerks who shivered; peasants whose tithe paid for someone else’s church silver; if Slavophile love stopped at the village linden, he called it gentry vanity with incense. <strong>Andrei</strong> flinched; talk of throne and soil had never rehearsed Kolomna. <strong>Vera</strong> turned grief into lines a future local fund might someday pay for. <strong>Stepan</strong> quoted Chaadaev on strangers under one roof and asked whether their circle was any less strange now.

Pushkin and the letter would not let a pretty idea float where someone had drowned. They closed on <strong>Father Dimitri’s</strong> rule: <strong>soil that matters means roofs the chronicles skip</strong>, or their Slav year was only a prettier way to dodge Chaadaev’s shame.`,
          specQ: "Does Slavophile language force you to help the capital’s clerk, or only the village you imagine?",
          bullets: [
            "Material life versus the ideal village: where would later readers put the clerk (without mixing up centuries)?",
            "Can “soil” as a moral base answer Evgeny’s fate, or only soothe the gentry?",
            "Letter I attacks upper-class vice. Does a People-first Slav reading make Chaadaev sound fairer, or harsher?"
          ]
        }
      },
      statist: {
        order: {
          title: "Ending: The File Outlives the Salon",
          body: `The dossier on the sideboard was thick enough to shame the fire. <strong>Andrei’s</strong> friends, statists by habit and not by crown, agreed on what had survived the winter: what lasted was <strong>stamped, numbered, in triplicate</strong>. Some names in the file sat in someone’s throat like stones; others shrugged and said continuity was its own kind of civilization. <strong>Stepan</strong> looked ill; reform with no air died faster than he liked to admit. <strong>Vera</strong> asked whether “who thinks for Russia?” had been answered a little too neatly by police ink. <strong>Father Dimitri</strong> whispered Evgeny’s name once, then folded it into protocol.

The story they would tell in public: <strong>ranks held</strong>; the salon had been sorted into a case number; for now, thought lived only in the margins a chief allowed. Chaadaev’s question was still inside the cover sheet, unread, not gone.`,
          specQ: "Is following the process a kind of civilization, or a uniform while real thought stays rented?",
          bullets: [
            "Police files and routine: in your readings, does smooth continuity equal legitimacy?",
            "When Order is as high as it can go, who is left unprotected? Test it on Evgeny.",
            "Does very high Order with weak People repeat Letter I’s picture of elite life cut off from civic depth?"
          ]
        },
        reform: {
          title: "Ending: Commissioned Progress",
          body: `<strong>Stepan’s</strong> bitter joke fell flat: Europe had arrived as <strong>memoranda</strong>. Commissions, letters from patrons, reform only where chiefs allowed ribbon and triplicate, that was the harvest they chose to tell. <strong>Andrei</strong> called it sensible triage. <strong>Vera</strong> named friends who would never sign anything bold again. <strong>Father Dimitri</strong> asked whether mankind’s long “education” could happen only upstairs; when no one answered, his voice thinned.

Paper could <strong>look</strong> like borrowing and still be hollow: Letter I’s curse in fair copy. Still <strong>Stepan</strong> carried the close: Russia would change <strong>where the margin allowed</strong>; dignity would be counted in folders; nothing would move faster than the corridor could bear.`,
          specQ: "If reform lives only in triplicate copies, does mankind’s “education” happen, or does paperwork stand in for it?",
          bullets: [
            "When borrowing is managed from above, at what point does the form fill in with real life?",
            "Is “managed change” a moral share in civilization, or mimicry with a seal?",
            "Who slips through when Order and Reform both look respectable on paper?"
          ]
        },
        people: {
          title: "Ending: Relief Without Receipt",
          body: `<strong>Father Dimitri</strong> framed <strong>mercy</strong> on purpose, because talk of rights would have split them from the people who paid their rent. Flood-year letters; petitions for imperial relief; the emperor as father who might soften. He told the winter as <strong>grace</strong>, not as structure. <strong>Andrei</strong> relaxed; mercy read well in letters to patrons. <strong>Stepan</strong> said softly that begging saves no one the law forgets. <strong>Vera</strong> asked who the story had rescued: the drowned clerk, or only the <strong>portrait</strong> of a merciful throne.

They left that question folded like sealed paper. The tale they agreed on: <strong>people had shown up this season as objects of grace</strong>; whether grace ever became justice, the file would not say.`,
          specQ: "When you beg the center for flood victims, who is saved, them, or the story that the throne is kind?",
          bullets: [
            "Imperial charity versus rights: how do historians tell mercy after disaster?",
            "Does Pushkin ask the state for more than symbolic relief?",
            "Can you keep People high while you tell a story of grace instead of entitlement, and does that hold?"
          ]
        }
      },
      med: {
        order: {
          title: "Ending: The Minister’s Bridge",
          body: `<strong>Andrei</strong> said what they had built felt like a bridge with <strong>one stone pier and one rope pier</strong>: the ministry owned the stone; the locals got rope and thanks. Mediator hopes went thin but did not snap. <strong>Stepan</strong> said rope could hold if traffic stayed light; <strong>Vera</strong> said traffic never stayed light. <strong>Father Dimitri</strong> prayed, half seriously, for engineers honest enough to weigh both ends in one breath. They had tried to join Chaadaev’s borrowed forms with local trust; winter had taught them <strong>order under veto</strong>.

The story <strong>Andrei</strong> set for the road: <strong>center first</strong>, local voice as a concession, blunt about power and cruel about equality, maybe the only bridge that stood in mud season.`,
          specQ: "If one pier is stone and one is rope, is compromise only collapse postponed?",
          bullets: [
            "Center versus provinces: the game uses zemstvo-style images before those laws existed. Does scholarship on the real zemstvo era still sharpen this fight?",
            "Can this balance last, or does one side usually win?",
            "Which of Chaadaev’s three worries does a mediator Order ending answer least well?"
          ]
        },
        reform: {
          title: "Ending: Borrowed Law, Local Accent",
          body: `<strong>Stepan</strong> closed with a picture anyone could repeat: <strong>law in foreign words on the page, Russian in the schoolyard</strong>: neither pure import nor locked autarchy. <strong>Father Dimitri</strong> liked the sound of it. <strong>Vera</strong> asked how many local accents a code could carry before chiefs called it chaos. <strong>Andrei</strong> wanted timetables; impatience, he said, was always what killed compromise. Someone quoted Letter I on slow inner growth, and the room laughed once, without cheer.

Their winter ended on <strong>Stepan’s</strong> bet: <strong>hybrid from day one</strong>, borrowed until daily life proves it native, not slogans, with the ugly knowledge that whoever holds the ink may decide the proof.`,
          specQ: "How long must a law stay “borrowed” before it counts as Russian, and who gets to say when?",
          bullets: [
            "Hybrid rules: when does a statute sound Russian instead of European in the story you tell?",
            "Same primary texts, mediator reform versus Westernizer or statist close: what changes?",
            "Chaadaev on real versus copied institutions: does a local accent fix hollow borrowing?"
          ]
        },
        people: {
          title: "Ending: The Ledger They Share",
          body: `<strong>Father Dimitri</strong> laid two columns side by side as if they could be one story: <strong>a line for ministry grain, a line for parish rye</strong>, a total a hungry household could read. <strong>Stepan</strong> called it holy bookkeeping. <strong>Andrei</strong> called it staying alive. <strong>Vera</strong> said Chaadaev had named a gap; Pushkin had named <strong>bodies</strong>. They agreed to tell the winter as something <strong>material</strong>, not only a middle in talk: budgets a clerk and a priest could audit together.

Whether one column always swallowed the other, none would swear. The close chose <strong>hope over a neat diagram</strong>: two books, one satchel, one argument still walking beside them.`,
          specQ:
            "Two account books, one countryside: must one always become the small print, or is the overlap itself the answer Chaadaev could not sketch?",
          bullets: [
            "Who counted in the reform mix this ending implies: clerks, priests, landlords?",
            "Does shared money talk answer Pushkin’s “who pays” without erasing Order?",
            "Letter I as salon essay versus pastoral care: does the genre change how fair this synthesis sounds?"
          ]
        }
      }
    };

    function buildRunSummary(ep) {
      const path = state.pathId || "west";
      const pathLabels = { west: "Westernizing", slav: "Slavophile", statist: "Statist", med: "Mediator" };
      const visited = state.history.map((id) => (scenes[id] ? scenes[id].title : id)).join(" → ");
      const inv = Array.from(state.inventory).map((id) => ITEMS[id] || id).join("; ") || "(none)";
      const recapBeats = buildRunRecapBeatTitles();
      const lines = [
        "Russia's Troubled Future Past (run summary)",
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
        `Evgeny chorus framing: ${state.evgenyChorus ? "yes (Vera’s one-reckoning close)" : "no"}`,
        `Run tags: ${state.runTags.size ? Array.from(state.runTags).join(", ") : "(none)"}`,
        `Scars: ${state.scars.size ? Array.from(state.scars).join(", ") : "(none)"}`,
        `Walkouts: ${state.walkouts.size ? Array.from(state.walkouts).join(", ") : "(none)"}`,
        "",
        "Library: " + inv,
        "",
        "Beats you played through (scene titles, in order):",
        recapBeats.length ? recapBeats.map((t, i) => `${i + 1}. ${t}`).join("\n") : "(none recorded)",
        "",
        "Scenes visited (ids):",
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

    function stripSceneTitle(html) {
      return String(html || "")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }

    function escapeHtmlPlain(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    /** Scene titles visited, in order (skips setup-only beats). Used for epilogue recap and copy summary. */
    function buildRunRecapBeatTitles() {
      const SKIP = new Set(["session_format"]);
      const out = [];
      for (let i = 0; i < state.history.length; i += 1) {
        const id = state.history[i];
        if (SKIP.has(id)) continue;
        const sc = scenes[id];
        if (!sc || !sc.title) continue;
        out.push(stripSceneTitle(sc.title));
      }
      return out;
    }

    function epilogueVisualSceneId() {
      const map = typeof EPILOGUE_SCENE_VISUALS !== "undefined" ? EPILOGUE_SCENE_VISUALS : {};
      const path = state.pathId || "west";
      const lean = state.finalLeanApplied || "order";
      return map[`${path}_${lean}`] || "ending_computed";
    }

    function buildRunRecapHtml() {
      const pathLabels = { west: "Westernizing", slav: "Slavophile", statist: "Statist", med: "Mediator" };
      const leanLabels = {
        order: "Order (stability, ranks, and the state as spine)",
        reform: "Reform (law, schools, print, Chaadaev as program)",
        people: "People (clerks, peasants, flood-side lives in the last word)"
      };
      const path = state.pathId || "west";
      const lean = state.finalLeanApplied || "order";
      const beats = buildRunRecapBeatTitles();
      const bonusAtCrisis =
        state.lastRoll != null && state.lastWinterTotal != null ? state.lastWinterTotal - state.lastRoll : null;
      const rollBit =
        bonusAtCrisis != null
          ? `<p class="run-recap-line"><strong>Winter die:</strong> d6 = ${state.lastRoll}, Order bonus +${bonusAtCrisis}, table total <strong>${state.lastWinterTotal}</strong> (path rules at crisis).</p>`
          : "";
      const misfit =
        state.crisisMisfit
          ? `<p class="run-recap-line"><strong>Winter misfit:</strong> Fate handed you another track’s rumor; the table answered it anyway.</p>`
          : "";
      const vera =
        state.walkouts.has("vera")
          ? `<p class="run-recap-line"><strong>Circle change:</strong> Vera stopped coming after one hard debate.</p>`
          : "";
      const chorus =
        state.evgenyChorus
          ? `<p class="run-recap-line"><strong>Rare framing:</strong> You closed with Vera’s “one moral reckoning” for Chaadaev, Pushkin, and the clerk together.</p>`
          : "";
      const invPlain = Array.from(state.inventory)
        .map((id) => stripSceneTitle(ITEMS[id] || id))
        .filter(Boolean);
      const lib =
        invPlain.length > 0
          ? `<p class="run-recap-line"><strong>Library satchel:</strong> ${escapeHtmlPlain(invPlain.join("; "))}.</p>`
          : "";
      const list =
        beats.length > 0
          ? `<ol class="run-recap-list">${beats.map((t) => `<li>${escapeHtmlPlain(t)}</li>`).join("")}</ol>`
          : `<p class="run-recap-line">No scene list was recorded for this tab (try a fresh run from <em>At the table</em>).</p>`;

      return `<section class="run-recap" aria-labelledby="run-recap-h"><h4 id="run-recap-h">What happened in your run</h4><p class="run-recap-lead">The ending below is a closing <em>lens</em> on the same winter. Here is the path your choices actually walked through.</p><p class="run-recap-line"><strong>Argument track:</strong> ${escapeHtmlPlain(
        pathLabels[path] || path
      )}.</p><p class="run-recap-line"><strong>Winter scene:</strong> ${escapeHtmlPlain(
        stripSceneTitle(rollOutcomeLabel(state.lastEvent || "event_censor"))
      )}</p>${rollBit}${misfit}<p class="run-recap-line"><strong>Final framing:</strong> ${escapeHtmlPlain(
        leanLabels[lean] || lean
      )}.</p>${vera}${chorus}${lib}<p class="run-recap-sub"><strong>Beats in order</strong> (each title is a scene you left by choosing):</p>${list}</section>`;
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
      evgeny_merged_insight: "Rare: Letter + poem + strong People.",
      courier_intrusion: "Token: Misrouted ministry packet (random winter beat).",
      winter_misfit_story: "Token: Winter forced someone else’s rumor.",
      salon_wide_split: "Achievement: Realm spread reached 50+ (salon pulled apart).",
      aligned_benches: "Achievement: Realm spread stayed tight (≤12).",
      triple_satchel: "Token: Chaadaev, Pushkin, and Aksakov all in the library."
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

    function maybeCourierRandomBeat(nextSceneId) {
      if (state.runTags.has("courier_random_used")) return;
      if (!nextSceneId || COURIER_WHISPER_SCENES.indexOf(nextSceneId) < 0) return;
      if (Math.random() >= 0.26) return;
      state.runTags.add("courier_random_used");
      state.stats.order = clamp(state.stats.order + 2);
      state.stats.reform = clamp(state.stats.reform - 2);
      state.achievements.add("courier_intrusion");
      state.ephemeralScenePrefix = `<aside class="random-beat-courier" role="note"><strong>Winter mail (random event):</strong> A misrouted Ministry fair copy lands on your pile, half a decree on provincial schools, coffee-stained, dated last week. Nothing binding, but it costs an evening proving you never saw it. <em>Applied:</em> Order +2, Reform −2.</aside>`;
      pushToast(ACH_TOAST.courier_intrusion);
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
        state.lastWinterTotal = total;
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
        if (state.crisisMisfit) state.achievements.add("winter_misfit_story");
        flushNewAchievementsToasts();
        statBars();
        renderInventory();
        renderScene();
        return;
      }

      if (choice.sessionCoop !== undefined) {
        persistCoopToolsPref(!!choice.sessionCoop);
        applyCoopPrefToDomAndState();
        refreshCoopBallotUI();
        state.history.push(state.current);
        state.current = choice.next || "intro";
        state.steps += 1;
        pushToast(
          choice.sessionCoop
            ? "Co-op gating is on. Use the three seats and the reveal card on choice beats."
            : "Solo mode: tap the choice buttons directly."
        );
        statBars();
        flushNewAchievementsToasts();
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
      if (choice.item && addItem(choice.item)) {
        state.inventoryFlashKey = choice.item;
        pushToast(`Library: ${ITEMS[choice.item].replace(/<[^>]+>/g, "")}`);
      }
      if (choice.item2 && addItem(choice.item2)) {
        state.inventoryFlashKey = choice.item2;
        pushToast(`Library: ${ITEMS[choice.item2].replace(/<[^>]+>/g, "")}`);
      }
      if (choice.next && String(choice.next).indexOf("final_route") === 0) {
        state.evgenyChorus = choice.evgenyChorus === true;
      }

      let next = choice.next;
      if (next && typeof next === "string" && next.indexOf("crisis_") === 0) {
        state.steps += 1;
        state.current = next;
        statBars();
        flushNewAchievementsToasts();
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
        flushNewAchievementsToasts();
        renderInventory();
        renderScene();
        return;
      }

      maybeCourierRandomBeat(next);
      state.current = next;
      state.steps += 1;
      statBars();
      flushNewAchievementsToasts();
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
        if (barEl) {
          barEl.style.width = v + "%";
          barEl.style.height = "100%";
        }
        if (valEl) valEl.textContent = String(v);
      });
    }

    function renderInventory() {
      const ul = document.getElementById("inventoryList");
      ul.innerHTML = "";
      if (state.inventory.size === 0) {
        ul.innerHTML = "<li class=\"empty\">Nothing yet.</li>";
        state.inventoryFlashKey = null;
        return;
      }
      const flashId = state.inventoryFlashKey;
      state.inventory.forEach((id) => {
        const li = document.createElement("li");
        li.className = "inv-row";
        if (flashId === id) li.classList.add("inv-row--flash");
        const iconSvg = ITEM_ICONS[id] || INV_SVG.doc;
        li.innerHTML = `<span class="inv-ico" aria-hidden="true">${iconSvg}</span><span>${ITEMS[id]}</span>`;
        ul.appendChild(li);
      });
      if (flashId && !prefersReducedMotion()) {
        window.setTimeout(() => {
          ul.querySelectorAll(".inv-row--flash").forEach((n) => n.classList.remove("inv-row--flash"));
        }, 1600);
      }
      state.inventoryFlashKey = null;
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
      const { order: O, reform: R, people: Pl } = state.stats;
      const spread = Math.max(O, R, Pl) - Math.min(O, R, Pl);
      if (spread >= 50) state.achievements.add("salon_wide_split");
      if (spread <= 12) state.achievements.add("aligned_benches");
      if (
        state.inventory.has("chaadaev_letter") &&
        state.inventory.has("pushkin_bronze") &&
        state.inventory.has("aksakov_note")
      ) {
        state.achievements.add("triple_satchel");
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

        updateSceneDialoguePortrait(state.current);

        const event = state.lastEvent || "event_censor";
      const winterEcho = {
        event_salon:
          "Someone still carried governor’s hall on his cuff: wax, tea, that one sanctioned night when letter and poem had shared one candle and no copy quite matched memory. <strong>Vera</strong> said the room had tasted air; <strong>Andrei</strong> said air that sweet usually meant someone upstairs had opened a vent on purpose.",
        event_flood_echo:
          "North-country post had soaked every argument. Cold water, they said, does not ask which program you defended before it breaks the sill. <strong>Father Dimitri</strong> crossed himself for drowned rooms named only in letter margins; <strong>Stepan</strong> swore the Neva had picked their metaphors without asking.",
        event_censor:
          "Seals and torn proofs sat in the middle like a fifth guest. <strong>Stepan</strong> could still taste ash from pages pulled mid-phrase; <strong>Andrei</strong> said some continuity needed blank leaves, then wished he had not said it aloud.",
        event_rural_gentry:
          "<strong>Stepan’s</strong> throat still held provincial grit; the ministry map had snagged on a gentry nail. <strong>Vera</strong> turned the fight into rent and tutors; <strong>Father Dimitri</strong> asked whose icon corner the decree had never visited.",
        event_zemstvo_clash:
          "The struck pilot fund had left a bruise no manifesto could hide; money and trust had split in daylight. <strong>Andrei</strong> called it triage; <strong>Stepan</strong> said it showed which ledger ate the other when budgets met mercy."
      };
      const pathWinterCoda = {
        west:
          "From the Westernizing bench, Europe still sounded like a verdict as much as a model. Winter had not filed that habit away.",
        slav:
          "The Slavophile corner kept asking whether talk of soil could stay humble after it had survived a ministry winter.",
        statist:
          "The filing habit had won the morning; whether mercy lived in the margin was a question they shelved with the ink.",
        med:
          "Mediator habits died hard, they still heard two ledgers arguing under one roof while someone called the horses."
      };
      let winterBlock = "";
      if (state.crisisMisfit) {
        winterBlock +=
          "They had rehearsed one kind of crisis; the seal on the courier’s packet did not match what they had prepared for: wrong rumor, wrong coat, and the night had to go on anyway.\n\n";
      }
      winterBlock +=
        winterEcho[event] ||
        "Winter had left its own stamp on the table: no two of them quoted the same postscript, and each swore the other had misheard.";
      winterBlock += "\n\n" + (pathWinterCoda[path] || pathWinterCoda.west);
      body += "\n\n" + winterBlock;

      if (state.evgenyChorus) {
        body += `\n\n<strong>Vera</strong> would not let them file letter, poem, and clerk in three separate drawers. The circle gave her the last inch of ink: one moral winter, no polite partitions.`;
      }

      let secretHtml = "";
      if (state.inventory.has("chaadaev_letter") && state.inventory.has("pushkin_bronze") && P >= 60) {
        secretHtml = `<div class="secret-insight"><strong>Rare alignment:</strong> Chaadaev and Pushkin both ride in the satchel, and the room would not treat People as a footnote. If “civilization” never reaches the clerk’s roof, the bronze rider reads as threat, not partner, and someone had said so aloud before the lamps went out.</div>`;
      }

      const runTitle = computeRunTitle(endingKey, path, O, R, P);

      const achBefore = new Set(state.achievements);
      checkAchievements();
      state.achievements.forEach((k) => {
        if (!achBefore.has(k) && ACH_TOAST[k]) pushToast(ACH_TOAST[k]);
      });

      const extras = [];
      if (state.inventory.has("pushkin_bronze")) {
        extras.push(`The <em>Bronze Horseman</em> stayed with them: one city map shared by granite glory and a clerk’s grief.`);
      }
      if (state.inventory.has("chaadaev_letter")) {
        extras.push(`Chaadaev’s letter stayed the cold mirror: borrowed forms, broken continuity, and the insistence that Russia still owes a moral future.`);
      }
      if (state.inventory.has("aksakov_note")) {
        extras.push(`Aksakov’s note stayed in the satchel: <em>narod</em> and soil set against borrowed law. Whether that answers Chaadaev or ducks him stayed open.`);
      }
      if (state.walkouts.has("vera")) {
        extras.push(`After the seizure debate, <strong>Vera</strong> had stopped coming. The circle lost an honest conservative voice; the corners of the ending felt colder.`);
      }
      if (state.crisisMisfit) {
        extras.push(`Winter’s courier wore the wrong coat: history arrived as a mix-up, not as the parable they had rehearsed by the lamp.`);
      }
      if (state.runTags.has("intro_pushkin_first")) {
        extras.push(`They had opened with Pushkin’s clerk; prose and policy stayed knotted in one bundle from the first scene, order of reading mattered.`);
      }
      if (state.scars.has("petition_winter")) {
        extras.push(`The petition winter had eaten weeks the journals never got back; autumn felt shorter than it should have.`);
      }

      const ach = [];
      if (state.achievements.has("bronze_reader")) ach.push("Engaged Pushkin's Petersburg poem");
      if (state.achievements.has("people_champion")) ach.push("People's advocate (75+)");
      if (state.achievements.has("iron_order")) ach.push("High Order (80+)");
      if (state.achievements.has("reform_fire")) ach.push("High Reform (80+)");
      if (state.achievements.has("lucky_six")) ach.push("Rolled a 6 on fate");
      if (state.achievements.has("aksakov_reader")) ach.push("Engaged Aksakov (Slavophile voice)");
      if (state.achievements.has("evgeny_framing")) ach.push("Evgeny’s chorus framing");
      if (state.achievements.has("evgeny_merged_insight")) ach.push("Letter + poem + strong People (60+)");
      if (state.achievements.has("courier_intrusion")) ach.push("Misrouted ministry packet (random beat)");
      if (state.achievements.has("winter_misfit_story")) ach.push("Winter misfit (wrong rumor)");
      if (state.achievements.has("salon_wide_split")) ach.push("High realm spread (50+)");
      if (state.achievements.has("aligned_benches")) ach.push("Tight realm spread (≤12)");
      if (state.achievements.has("triple_satchel")) ach.push("All three library voices (Chaadaev, Pushkin, Aksakov)");

      return { title, body, extras, ach, discussion, runTitle, secretHtml };
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

    function clearCoopSeatsContextEl() {
      const el = document.getElementById("coopSeatsContext");
      if (!el) return;
      el.innerHTML = "";
      el.hidden = true;
    }

    /** Narrative-only plain text for co-op excerpt: omit Read-along, counterfactual, and winter-roll chrome (those flatten oddly in textContent and break tail slices). */
    function sceneColumnPlainTextForCoopExcerpt() {
      if (!textEl) return "";
      const clone = textEl.cloneNode(true);
      clone
        .querySelectorAll(
          ".primary-read, .counterfactual-note, .crisis-preview-card, .path-recap, .crisis-die-table, .random-beat-courier"
        )
        .forEach((n) => n.remove());
      return clone.textContent.replace(/\s+/g, " ").trim();
    }

    /** Plain excerpt of the beat players see in the story column (tail-biased so the decision moment is likelier to appear). */
    function updateCoopSeatsContextEl() {
      const el = document.getElementById("coopSeatsContext");
      if (!el) return;
      let body = "";
      if (textEl) {
        body = sceneColumnPlainTextForCoopExcerpt();
      }
      if (!body && scenes[state.current]) {
        body = stripChoiceLabel(scenes[state.current].text || "");
      }
      if (!body) {
        el.innerHTML = "";
        el.hidden = true;
        return;
      }
      const max = 450;
      let snip = body;
      if (snip.length > max) {
        snip = "\u2026 " + snip.slice(-max).trim();
      }
      const esc = (s) =>
        String(s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      el.innerHTML = `<strong class="coop-seats-context-lead">What you\u2019re weighing:</strong> ${esc(snip)}`;
      el.hidden = false;
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
        clearCoopSeatsContextEl();
        return;
      }
      if (state.current === "session_format") {
        actionBar.hidden = true;
        mount.innerHTML = "";
        setCoopBallotWrapVisible(false);
        if (sumEl) sumEl.textContent = "";
        clearCoopSeatsContextEl();
        return;
      }
      const list = state._coopChoicesSnapshot || [];
      if (!list.length) {
        actionBar.hidden = true;
        const sc = scenes[state.current];
        const realmBudgetActive =
          sc &&
          sc.coopRealmBudgetBeforeChoices &&
          !state.realmBudgetCommittedResolveEndings;
        if (realmBudgetActive || (sc && sc.computed)) {
          mount.innerHTML = "";
          setCoopBallotWrapVisible(false);
        } else {
          mount.innerHTML =
            '<p class="coop-ballot-idle-hint" role="status">Co-op is on. Three-seat voting and the reveal card under the buttons appear when this beat has choices below.</p>';
          setCoopBallotWrapVisible(true);
        }
        if (sumEl) sumEl.textContent = "";
        clearCoopSeatsContextEl();
        return;
      }
      actionBar.hidden = false;
      updateCoopSeatsContextEl();
      setCoopBallotWrapVisible(true);
      const roles = [
        {
          id: "coopV1",
          step: "1",
          realm: "Order",
          title: "Player 1 · Order",
          hint: "Speak for ranks, continuity, and ministry logic, not as the sovereign, but for the vertical everyone leans on.",
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
        h += "<option value=\"\">(choose)</option>";
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
      choicesToRender.forEach((choice, idx) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice-btn";
        const fx = choice.effects ? formatEffects(choice.effects) : "";
        const hintId = `choice-meter-hint-${idx}`;
        if (fx) button.title = `Meter shift if you choose this: ${fx}`;
        if (choice.roll) button.setAttribute("aria-describedby", "crisisPreviewCard");
        else if (fx) button.setAttribute("aria-describedby", hintId);
        const ico = choice.roll ? icoDice : icoBranch;
        button.innerHTML = choice.roll
          ? `${ico}<span class="choice-btn-main"><span class="main">${choice.text}</span></span>`
          : `${ico}<span class="choice-btn-main"><span class="main">${choice.text}</span>${fx ? `<span class="fx">${fx}</span>` : ""}</span>`;
        button.addEventListener("click", () => {
          if (state.coopToolsEnabled && state.current !== "session_format") {
            pushToast("Co-op gating on: each seat votes to match an option below, then Reveal → commit → Apply under the buttons.");
            return;
          }
          commitChoice(choice);
        });
        choicesEl.appendChild(button);
        if (fx && !choice.roll) {
          const hint = document.createElement("span");
          hint.id = hintId;
          hint.className = "sr-only";
          hint.textContent = `Meter shift if you choose this: ${fx}`;
          choicesEl.appendChild(hint);
        }
      });
      appendCoopActionBarIntoChoices();
      if (choicesToRender.length > 0 && !(choicesToRender.length === 1 && choicesToRender[0].roll)) {
        const ped = document.createElement("details");
        ped.className = "choice-pedagogy";
        const track = state.pathId ? `<strong>${state.pathId}</strong> (argument track locked)` : "<strong>not locked</strong> until you take a forking choice";
        ped.innerHTML = `<summary>How to read meter lines on choices</summary><p class="choice-pedagogy-body">Numbers show how <strong>Order</strong>, <strong>Reform</strong>, and <strong>People</strong> move, institutional costs, not a hidden “correct” score. Track: ${track}. Each choice with numbers has a <strong>tooltip</strong> and a screen-reader line with the same shift. Open <strong>Terms</strong> in the header for what each meter measures.</p>`;
        choicesEl.appendChild(ped);
      }
      state._coopChoicesSnapshot = choicesToRender;
    }

    function mountResolveEndingsRealmBudget(choicesToRender, icoDice, icoBranch) {
      stashCoopActionBarBeforeChoicesWipe();
      choicesEl.innerHTML = "";
      const poolMax = getRealmBudgetPoolPoints();
      const T = state.lastWinterTotal;
      const winterLine =
        T != null && T >= 1
          ? `Winter total <strong>${T}</strong> → <strong>${poolMax}</strong> shared points (scarce pools <strong>3</strong> / <strong>5</strong> / <strong>8</strong> from the same rumor bands as the crisis die). `
          : "";
      const wrap = document.createElement("div");
      wrap.className = "realm-budget-pilot";
      wrap.setAttribute("role", "region");
      wrap.setAttribute("aria-label", "Shared realm budget before final framing");
      wrap.innerHTML = `<h3 class="realm-budget-title">Winter attention: spend the shared pool</h3>
<p class="realm-budget-lead">${winterLine}Place every point across <strong>Order</strong>, <strong>Reform</strong>, and <strong>People</strong> before you choose how to <em>frame</em> the story. Each bar stays capped at 100. Spend the full pool, then commit; the three framing choices appear next.</p>
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
        const left = poolMax - poolUsed();
        live.textContent = `Points remaining: ${left} / ${poolMax}`;
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
          if (used < poolMax && canAddAnywhere()) {
            pushToast(`Spend the full ${poolMax} points (use +/− to move weight) before you commit.`);
            return;
          }
          if (used < poolMax && !canAddAnywhere()) {
            pushToast("Bars are at or near 100, committing the budget you could place.");
          }
          applyEffects({ order: state.realmBudgetDraft.order, reform: state.realmBudgetDraft.reform, people: state.realmBudgetDraft.people });
          state.realmBudgetCommittedResolveEndings = true;
          showEventBanner("<strong>Budget committed:</strong> " + formatEffects(state.realmBudgetDraft));
          mountChoiceButtons(choicesToRender, icoDice, icoBranch);
          refreshCoopBallotUI();
          statBars();
          renderInventory();
          updateSceneVisuals(state.current);
          updateSalometry();
          animateChoiceButtonsIfNeeded();
          return;
        }
        const row = btn.closest(".realm-budget-row");
        if (!row) return;
        const key = row.getAttribute("data-key");
        const d = state.realmBudgetDraft;
        const left = poolMax - poolUsed();
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

    function updateSceneDialoguePortrait(sceneId) {
      const fig = document.getElementById("sceneDialoguePortrait");
      if (!fig) return;
      const map = typeof SCENE_DIALOGUE_PORTRAITS !== "undefined" ? SCENE_DIALOGUE_PORTRAITS : {};
      const spec = sceneId && map[sceneId];
      if (!spec || !spec.src || !spec.alt) {
        fig.hidden = true;
        fig.innerHTML = "";
        fig.classList.remove("scene-dialogue-portrait--has-image");
        return;
      }
      fig.hidden = false;
      fig.innerHTML = "";
      fig.classList.add("scene-dialogue-portrait--has-image");
      const img = document.createElement("img");
      img.className = "scene-dialogue-portrait-img";
      img.src = spec.src;
      img.alt = spec.alt;
      img.setAttribute("width", "112");
      img.setAttribute("height", "140");
      img.loading = "lazy";
      img.decoding = "async";
      const cap = document.createElement("figcaption");
      cap.className = "scene-dialogue-portrait-caption";
      cap.appendChild(document.createTextNode(spec.caption));
      if (spec.creditHref) {
        cap.appendChild(document.createElement("br"));
        const a = document.createElement("a");
        a.className = "scene-dialogue-portrait-credit";
        a.href = spec.creditHref;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Source: Wikimedia Commons";
        cap.appendChild(a);
      }
      fig.appendChild(img);
      fig.appendChild(cap);
    }

    function renderScene() {
      if (!state.keepBanner) hideEventBanner();
      state.keepBanner = false;

      const paint = () => {
      applyCoopPrefToDomAndState();
      const scene = scenes[state.current];
      if (state.current !== "resolve_endings") state.realmBudgetCommittedResolveEndings = false;
      if (state.current === "resolve_endings" && state._prevSceneForBudget !== "resolve_endings") {
        state.realmBudgetDraft = { order: 0, reform: 0, people: 0 };
      }
      syncAppChrome(state.current, scene);
      endingBlock.innerHTML = "";

      let ep = null;
      if (scene.computed) {
        ep = resolveEndingText();
        state.lastRunSummary = buildRunSummary(ep);
        updateSceneVisuals(epilogueVisualSceneId());
      } else {
        updateSceneVisuals(state.current);
      }

      if (scene.computed) {
        titleEl.textContent = ep.title;
        updateSceneDialoguePortrait(state.current);
        textEl.innerHTML =
          buildRunRecapHtml() +
          `<div class="run-title-banner"><strong>Session title:</strong> ${ep.runTitle}</div>` +
          sceneBodyHtml(ep.body);
        let html = "";
        if (ep.secretHtml) html += ep.secretHtml;
        html += `<div class="ending-extra"><strong>Final scores</strong><br>Order ${state.stats.order} · Reform ${state.stats.reform} · People ${state.stats.people}<br><br>${ep.extras.join("<br>")}</div>`;
        if (ep.ach.length) {
          html += `<div class="achievements"><strong>Unlocked</strong>: ${ep.ach.join(" · ")}</div>`;
        }
        if (ep.discussion) {
          html += `<div class="discussion-box">${ep.discussion}</div>`;
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
        html += `<details class="debrief-lab"><summary>Debrief lab: compare framings (read-only)</summary><p class="debrief-lab-lead">Same path (<strong>${path}</strong>), three closing lenses. Your run used one; the others are snippets only, no stat change.</p><div class="debrief-compare-grid">${cmp("order", "Order lens")}${cmp("reform", "Reform lens")}${cmp("people", "People lens")}</div><button type="button" class="ghost" id="debriefPeekBtn">Branch peek: another path’s winter flavor (read-only)</button></details>`;
        html += `<details class="realm-debrief-lab"><summary>Debrief toy: coupled realm sliders (does not change saved scores)</summary><p class="realm-debrief-lead">Total fixed at 150. Drag one bar; the others rebalance, useful for arguing scarcity after the run.</p><div class="realm-coupled-row"><label>Order <span id="debValO">50</span><input type="range" id="debRngO" min="0" max="150" value="50" /></label></div><div class="realm-coupled-row"><label>Reform <span id="debValR">50</span><input type="range" id="debRngR" min="0" max="150" value="50" /></label></div><div class="realm-coupled-row"><label>People <span id="debValP">50</span><input type="range" id="debRngP" min="0" max="150" value="50" /></label></div></details>`;
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
            "<strong>Statist track:</strong> there is no separate mid-band in code, high totals frame <strong>flood logistics</strong>; lower totals fold into <strong>censor</strong> pressure.",
          med:
            "<strong>Mediator track:</strong> mid totals trigger <strong>zemstvo-style</strong> pilot funds vs. ministry veto; high totals still allow a salon night; low totals mean censor."
        };
        if (peekBtn && peekDlg && peekBody) {
          peekBtn.addEventListener("click", () => {
            const cur = state.pathId || "west";
            const alt = ["west", "slav", "statist", "med"].find((p) => p !== cur) || "west";
            peekBody.innerHTML = `<p><strong>Branch peek:</strong> your run is <strong>${cur}</strong>. Below is <strong>${alt}</strong> winter logic (read-only).</p><p>${PEEK_TEXT[alt]}</p>`;
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
        updateSalometry();
        animateChoiceButtonsIfNeeded();
        state._prevSceneForBudget = state.current;
        return;
      }

      titleEl.textContent = scene.title;
      updateSceneDialoguePortrait(state.current);
      let sceneText = scene.text;
      if (state.current === "resolve_endings") {
        state.evgenyChorus = false;
        const lead = RESOLVE_PATH_LEAD[state.pathId || "west"];
        if (lead) sceneText = lead + "\n\n" + sceneText;
      }
      let topPrefix = "";
      if (state.ephemeralScenePrefix) {
        topPrefix += state.ephemeralScenePrefix;
        state.ephemeralScenePrefix = "";
      }
      let crisisBlock = "";
      if (scene.crisisRoll) crisisBlock = buildCrisisRecap();
      textEl.innerHTML =
        topPrefix + crisisBlock + prependSceneCallbacks(state.current) + sceneBodyHtml(sceneText) + appendSceneEnrichment(scene);
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

      if (scene.coopRealmBudgetBeforeChoices && !state.realmBudgetCommittedResolveEndings) {
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
      if (disp) disp.textContent = "-";
      const cb = document.getElementById("coopToolsEnable");
      if (cb) cb.checked = readCoopToolsPrefEnabled();
      state.coopToolsEnabled = !!(cb && cb.checked);
      state.current = "session_format";
      state.steps = 0;
      state.history = [];
      state.stats = { order: 50, reform: 50, people: 50 };
      state.pathId = null;
      state.lastEvent = null;
      state.inventory = new Set();
      state.achievements = new Set();
      state.lastRoll = null;
      state.lastWinterTotal = null;
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
      state.ephemeralScenePrefix = "";
      state.inventoryFlashKey = null;
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
      applyCoopPrefFromQueryIfPresent();
      applyCoopPrefToDomAndState();
      if (en) {
        en.addEventListener("change", () => {
          persistCoopToolsPref(en.checked);
          refreshCoopBallotUI();
        });
      }
      if (stance) stance.addEventListener("change", updateCoopApplyGate);
      if (start && disp) {
        start.addEventListener("click", () => {
          if (coopTimerInterval) clearInterval(coopTimerInterval);
          let left = 30;
          disp.textContent = `${left}s`;
          coopTimerInterval = setInterval(() => {
            left -= 1;
            disp.textContent = left > 0 ? `${left}s` : "-";
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
          disp.textContent = "-";
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
        pushToast(`Deep link: scene “${q}” with default meters; not a full playthrough path.`);
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

    function wireGlossaryIcons() {
      const map = typeof GLOSSARY_ICON_BY_KEY !== "undefined" ? GLOSSARY_ICON_BY_KEY : null;
      const root = document.querySelector(".glossary-dl");
      if (!map || !root) return;
      root.querySelectorAll("dt[data-gloss-icon]").forEach((dt) => {
        if (dt.querySelector(".glossary-term-ico")) return;
        const k = dt.getAttribute("data-gloss-icon");
        const svg = k && map[k];
        if (!svg) return;
        const wrap = document.createElement("span");
        wrap.className = "glossary-term-ico";
        wrap.setAttribute("aria-hidden", "true");
        wrap.innerHTML = svg;
        dt.insertBefore(wrap, dt.firstChild);
      });
    }

    wireGlossaryIcons();

    refreshCoopBallotUI();
    renderScene();
