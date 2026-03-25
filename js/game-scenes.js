    const scenes = {
      session_format: {
        title: "At the table",
        text: `Before the letter lands in your hands, settle <strong>how your group will run choices</strong>.

If <strong>three players</strong> will take the Order, Reform, and People seats and vote before locking each beat, choose <strong>Three seats</strong>. If one person will tap the buttons alone, choose <strong>Solo</strong>—the story is the same either way.

You can still change this later with the <strong>Enable co-op gating</strong> checkbox above the choice buttons.`,
        choices: [
          {
            text: "<strong>Three seats</strong> — use the co-op ballot (vote, then reveal and apply) on choice beats.",
            next: "intro",
            sessionCoop: true
          },
          {
            text: "<strong>Solo / one voice</strong> — choose directly; keep co-op tools off.",
            next: "intro",
            sessionCoop: false
          }
        ]
      },

      intro: {
        title: "Moscow, Autumn 1836",
        text: `The latest issue of Teleskop has just circulated. Inside is a letter by Pyotr Chaadaev.

The manuscript ranges from one woman’s spiritual unrest to the nation’s, naming forces from the court down to “the <strong>slave who exists only for the pleasure of his master</strong>.” By the time it reaches world history, the charge is severe: Russia stands outside the main movement of that history, has contributed little to universal civilization, and lives by borrowed forms rather than a clear moral mission.

<strong>In the room tonight</strong> (they will argue with you again):

<strong>Vera Kornilova</strong>, who reads French and mistrusts hurry.

<strong>Stepan Ilyich</strong>, a junior official who wants a program he can file.

<strong>Father Dimitri</strong>, who keeps asking whether abstractions reach anyone outside this study.

<strong>Andrei Mikhailovich</strong>, who treats the letter as imported scandal before it is philosophy.

Three questions will keep surfacing: Does Russia belong to “universal” history or is it an exception? Can reform mean borrowing without hollowness? Who pays when the state builds its future: Pushkin’s bronze rider or Evgeny’s flooded room?

<strong>Andrei Mikhailovich</strong> cuts in first: “Half of Europe writes manifestos. Why should their nausea be our compass?”

<strong>Vera</strong>: “If we ‘repeat mankind’s education,’ whose syllabus: Berlin’s? Paris’s? And who pays the tutor?”

<strong>Father Dimitri</strong>: “The letter began as counsel to a soul in pain. Have we turned her into kindling?”

You answer them in the moment, not in policy headlines. (The real Letter I is a <strong>pastoral epistle</strong> to “Madame”; here the salon <strong>dramatizes</strong> its ideas. See Terms.)`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (outside universal history):</strong> “Placed, as it were, outside of the times, we have not been affected by the universal education of mankind.”<br><span class="read-gloss">After comforting Madame, Chaadaev widens to the nation: Russia missed the centuries-long moral formation other peoples absorbed. The first button treats that gap as work for law, schools, and press over time—not a single leap.</span><br><br><strong>Letter I (neither West nor East):</strong> “We belong neither to the West nor to the East, and we possess the traditions of neither.”<br><span class="read-gloss">He denies Russia a seat in either “family” of world civilization. The second button refuses his verdict as final: you will seek a non-European footing (Slavophile or statist branches follow). The third splits the difference: borrow only what takes root.</span><br><br><strong>Letter I (imitation):</strong> “This is a natural consequence of a culture based wholly upon importation and imitation.”<br><span class="read-gloss">Import without inner growth is the hollow culture Chaadaev names. The Westernizing button explicitly promises institutions that are more than costume—the letter will keep testing that promise.</span><br><br><strong>Letter I (no heritage):</strong> “We Russians… have come into the world like illegitimate children without a heritage, without a link with the men who preceded us on earth.”<br><span class="read-gloss">Illegitimacy here means no usable continuity with past generations—memory and habit do not add up to a patrimony. The fourth button opens Pushkin’s poem next: Part One will set that abstract shame beside a poor clerk, a fiancée, and a Neva flood that erases rooms—concrete loss alongside Chaadaev’s argument.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Chaadaev names our wound. We owe Europe serious reform, not costume imitation: schools, law, a public press, learned over time.”", next: "reformist", path: "west", effects: { order: -5, reform: 15, people: 5 }, item: "chaadaev_letter", stateTag: "intro_western" },
          { text: "<strong>You:</strong> “He mistakes difference for disgrace. Russia is not a tardy pupil in someone else’s classroom.”", next: "distinct_path", effects: { order: 8, reform: -8, people: 0 }, item: "chaadaev_letter", stateTag: "intro_distinct" },
          { text: "<strong>You:</strong> “He is right that stagnation should shame us; wrong that we must become Europe on Europe’s schedule. Adopt foreign forms only where they actually take root here.”", next: "mediator", path: "med", effects: { order: 3, reform: 6, people: 4 }, item: "chaadaev_letter", stateTag: "intro_med" },
          { text: "<strong>You</strong> (reaching for Pushkin): “Before we vote on Europe, read how the capital treats a clerk when the Neva rises.”", next: "salon_pushkin", effects: { order: 2, reform: 5, people: 3 }, stateTag: "intro_pushkin_first" }
        ]
      },

      salon_pushkin: {
        title: "The Salon Turns to Pushkin",
        text: `Stepan opens a worn volume. The conversation locks onto one long poem.

<em>The Bronze Horseman</em> (1833): Pushkin calls the flood narrative <strong>based on truth</strong>; the prologue gives Peter a founding vow and a love song to the new capital; then Parts One and Two turn to the Neva’s assault, a clerk’s loss, and the bronze statue in pursuit. Grand history and the little man do not share the same safety.

Chaadaev’s letter asks whether Russia has a real place in universal history. The poem asks who pays when the state builds its future in granite.

Someone quotes Chaadaev’s barb about a “great man” who civilized Russia: he “threw us the <strong>cloak of civilization</strong>”; we took the cloak, Chaadaev says, but “did not so much as touch civilization.” The room hears Pushkin’s granite and Yevgeny’s roof in it.

<strong>Vera</strong> objects: “A poem is not a ministry. Are we hiding behind beauty because law is harder?”

<strong>Andrei Mikhailovich</strong>: “Peter built; the clerk broke. That is not a constitution.”

<strong>Father Dimitri</strong>: “If Yevgeny matters, say what you owe him, not only what you owe Peter.”

What do you say next?`,
        primaryRead: {
          title: "Read alongside: The Bronze Horseman",
          body: `<strong>Prologue (Peter’s vow and hymn):</strong> “Here we at Nature’s own behest / Shall break a window to the West… / Here a new city shall be wrought.” The same voice loves “Nevá’s majestic perfluctation, / Her bankments’ granite carapace” and “Peter’s own creation.” (<em>The Bronze Horseman</em>, prologue.)<br><span class="read-gloss">The narrator celebrates Peter’s granite capital. The first answer sides with Vera’s worry: spectacle is not moral education—schools and law must catch up before parades and bronze.</span><br><br><strong>Part One (flood):</strong> “Nevá, engorged, with swell and roaring… / Leaped on the city… / There streamed Petropolis, foam-laced.” (<em>The Bronze Horseman</em>, Part One.)<br><span class="read-gloss">The flood shatters plans drawn in ink: ordinary rooms drown while embankments and decrees fail. The middle answer makes Yevgeny’s ruin the test of legitimacy and leads toward <em>News from the Capital</em> (relief, law, throne).</span><br><br><strong>Part Two (statue and pursuit):</strong> “There rode in bronze, one arm extended, / The Idol on its granite cliff”; Yevgeny to the “great wonder-worker”; “The Bronze Horseman in pursuit.” (<em>The Bronze Horseman</em>, Part Two.)<br><span class="read-gloss">Part Two turns the monument from glory to terror in Yevgeny’s madness. The third answer refuses to split institution-building from care for people the chronicle skips—it opens the mediator path.</span><br><br><strong>Letter I (cloak of civilization, same evening’s debate):</strong> “…he threw us the cloak of civilization: we took up the cloak but did not so much as touch civilization.”<br><span class="read-gloss">Chaadaev’s barb: we wore European polish without the inner habit it grew from. Use it to judge whether Pushkin’s proud city is civilization or another cloak.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Moral education and schools before spectacle: parades and bronze heroes are not civilization.”", next: "reformist", path: "west", effects: { order: -3, reform: 12, people: 6 }, item: "pushkin_bronze", item2: "chaadaev_letter", stateTag: "intro_pushkin_first" },
          { text: "<strong>You:</strong> “Pushkin’s clerk is the proof: a state that drowns ordinary people in spectacle is hollowing its own legitimacy.”", next: "petersburg_pressure", effects: { order: -10, reform: 4, people: 12 }, item: "pushkin_bronze", item2: "chaadaev_letter", stateTag: "intro_pushkin_first" },
          { text: "<strong>You:</strong> “Both: durable institutions <em>and</em> care for people the chronicles skip; I will not sacrifice clerks and peasants to save the argument.”", next: "mediator", path: "med", effects: { order: -2, reform: 10, people: 8 }, item: "pushkin_bronze", item2: "chaadaev_letter", stateTag: "intro_pushkin_first" }
        ]
      },

      petersburg_pressure: {
        title: "News from the Capital",
        text: `The Neva’s winter ice is already a rumor of power and peril. Officials speak of Peter’s statue, the embankments, the fleet. Others whisper Yevgeny’s name: a clerk broken by water and bronze; Pushkin’s poor Kolomna clerk who dreamed of marriage and a snug position until the river “<strong>Leaped on the city</strong>.”

Letter I had already painted a society with “no definite sphere,” families like strangers, citizens like <strong>nomads in the cities</strong>; even the steppe nomads, Chaadaev wrote, more attached to their deserts than you to your capital. The Neva makes that rootlessness visible.

<strong>Stepan</strong> wants statutes and relief lines on paper.

<strong>Andrei Mikhailovich</strong> warns that “relief” spoken aloud sounds like riot.

<strong>Vera</strong> asks who will sit in the clerk’s flat when the water recedes.

Whose objection do you answer first, and with what move?`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (“nomads in the cities”):</strong> “There is no definite sphere of existence for anyone… In our cities we look like nomads, even more than the nomads who let their herds graze on our steppes, for they are more attached to their deserts than we to our cities.”<br><span class="read-gloss">Chaadaev describes Russians as less rooted than steppe nomads: no fixed home, no durable habit of public life. That diagnosis sits behind this screen—then Pushkin’s flood makes rootlessness wet and lethal. Stepan’s button writes relief and protection into statute (Westernizing path); Andrei’s petitions the throne for managed charity and calm language (statist path).</span><br><br><strong><em>The Bronze Horseman</em>, Part One (flood):</strong> “Nevá, engorged, with swell and roaring… / Leaped on the city.” (<em>The Bronze Horseman</em>, Part One.)<br><span class="read-gloss">Same passage: the river ignores rank. The argument in the room is whether answerability to clerks belongs in law and budgets (Stepan) or in imperial grace filed quietly (Andrei).</span>`
        },
        choices: [
          { text: "<strong>You</strong> (to Stepan): “Then write the law; relief funds, public health, protection after disaster. I’ll take the heat.”", next: "reform_education", path: "west", effects: { order: -5, reform: 14, people: 10 } },
          { text: "<strong>You</strong> (to Andrei): “We petition for <em>imperial</em> relief; managed charity, no street theater. Let the throne show mercy while we keep the language calm.”", next: "state_path", path: "statist", effects: { order: 10, reform: 2, people: 4 } }
        ]
      },

      reformist: {
        title: "The Reformist Circle",
        text: `The room divides quickly. Backward institutions and censorship, you argue, keep Russia trapped. If Chaadaev is right, modernization must be moral and political, not only technical; the letter’s threefold worry (history, borrowing, mission) now sounds like a program.

You cite his demand that Russia must, “in a certain sense, <strong>repeat the whole education of mankind</strong>,” and his scorn for those who would assimilate European progress “<strong>in one stroke</strong>” without grasping the slow, morally grounded growth that produced it. You add his portrait of the West: not only books but <strong>duty, justice, law, and order</strong> breathed in “from the crib.”

<strong>Stepan</strong> leans in: “Where do we begin; courts or land?”

<strong>Father Dimitri</strong>: “Begin with who is still owned.”

<strong>Vera</strong>: “If we move too fast, we only dress the nobility in foreign verbs.”

Which pressure shapes your first step?`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (repeat mankind’s education):</strong> “If we wish to take up a position similar to that of other civilized people, we must, in a certain sense, repeat the whole education of mankind.”<br><span class="read-gloss">Chaadaev insists Europe’s advantage was slow accretion, not a leap. The first answer below sides with <strong>Stepan</strong>: courts, universities, literacy—repeat mankind’s homework in the open.</span><br><br><strong>Letter I (against “one stroke” mimicry):</strong> “…without even bothering to find out how it was produced, we can in one stroke assimilate all this European progress, which occurred so slowly and under the direct, evident action of a unique moral power?”<br><span class="read-gloss">He scorns swallowing foreign progress whole. <strong>Vera</strong>’s fear on this screen is the same vice wearing French verbs.</span><br><br><strong>Letter I (West as moral atmosphere, not only books):</strong> “…in the crib the child is imbued with these ideas… They are the ideas of duty, justice, law, and order.”<br><span class="read-gloss">“Civilization” is duty and law inhaled with the air, not a library shelf. <strong>Father Dimitri</strong>’s “begin with who is still owned” points to the second answer: emancipation before self-rule promises—Letter I names the ladder from court to bonded labor.</span>`
        },
        choices: [
          { text: "<strong>You</strong> (to Stepan): “Courts, universities, civic literacy; make thought legal before we pretend it is free.”", next: "reform_education", path: "west", effects: { order: -4, reform: 12, people: 6 } },
          { text: "<strong>You</strong> (to Father Dimitri): “Abolish serfdom before we promise zemstvo or elections. Self-rule is empty while people are still legally property.”", next: "reform_serfdom", path: "west", effects: { order: -12, reform: 10, people: 14 } }
        ]
      },

      reform_education: {
        title: "Paper, Schools, and Law",
        text: `New schools open. Censorship loosens in places. Translation circles spread European philosophy and science.

You hope to build what Chaadaev described as the West’s invisible scaffolding: <strong>duty, justice, law, order</strong>, not only imported tomes. Critics say you are still draping the <strong>cloak</strong> without the moral fabric underneath.

Conservative elites accuse reformers of importing alien values. Someone quotes the flood: when waters retreat, Pushkin’s burghers rush to <strong>“surcharge their neighbor”</strong> for what Nevá stole; the market moves on while corpses still float in memory. The river, they say, does not consult the Senate.

<strong>Andrei Mikhailovich</strong> folds his arms: “Gradualism is how nothing happens.”

<strong>Vera</strong>: “A constitution on this table is a warrant for the Third Section.”

<strong>Stepan</strong>: “Or we do what the law allows; petition in order, wait our season.”`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (duty, justice, law, order):</strong> “They are the ideas of duty, justice, law, and order… This is the atmosphere of the West…”<br><span class="read-gloss">Chaadaev’s West is moral atmosphere, not gadgets. <strong>Vera</strong>’s gradual charters match that mood; <strong>Andrei</strong>’s constitutional scandal risks the “one stroke” mimicry Chaadaev mocked; <strong>Stepan</strong>’s petition path tests whether procedure without pressure is another hollow form.</span><br><br><strong><em>The Bronze Horseman</em>, Part One (after the flood):</strong> tradesmen rush “To surcharge their neighbor / For their grave loss” while the city moves on. (<em>The Bronze Horseman</em>, Part One, after the flood.)<br><span class="read-gloss">Pushkin’s tradesmen profit from neighbors’ flood losses—markets move on while bodies are remembered. That greed undercuts naive gradualism <em>and</em> faith that petitions alone moralize the capital.</span>`
        },
        counterfactualNote: `Schools and “public” debate accelerated unevenly; this scene compresses years of argument into one autumn. Use it to name tensions, not to date specific ministries.`,
        choices: [
          { text: "<strong>You</strong> (to Vera): “Gradual law; charters, schools; so stability survives the first winter.”", next: "beat_west_print", effects: { order: 8, reform: 4, people: 2 }, item: "reform_charter" },
          { text: "<strong>You</strong> (to Andrei): “We circulate a constitutional draft in trusted circles; force the question into salons before ministers pretend they never heard it.”", next: "beat_west_print", effects: { order: -15, reform: 18, people: 4 } },
          { text: "<strong>Stepan</strong> (you second him): “Petitions first; proper channels, no scandal.” <em>(Costs the autumn; you reconvene behind schedule.)</em>", next: "stub_petition_winter", effects: { order: 3, reform: -2, people: -2 }, scar: "petition_winter" }
        ]
      },

      stub_petition_winter: {
        title: "Autumn Eaten by Forms",
        text: `The petition breeds copies, seals, and waiting rooms.

Vera stops attending after the second week; her note cites an indisposed aunt.

Father Dimitri says dryly that Russia already had enough paper before Chaadaev.

You proved a different hollowness than the one you meant: procedure without pressure stalls; the Third Section’s file on your circle grows thicker for the delay, not thinner. This branch is a <strong>dead end, not a game-over</strong>; you may still reach winter journals, one season poorer.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (restlessness, no fixed sphere):</strong> “We all resemble travellers. There is no definite sphere of existence for anyone… In our families we look like strangers…”<br><span class="read-gloss">Chaadaev sketches a society without settled habit or home—your autumn lost inside copies and seals matches his image. The only way out offered is to abandon the waiting room and return to print, poorer and watched.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Enough. We return to print and risk; chastened, behind schedule.”", next: "beat_west_print", effects: { order: 0, reform: -2, people: -2 } }
        ]
      },

      reform_serfdom: {
        title: "Land and Freedom First",
        text: `Serfdom is the central moral contradiction, you insist. Emancipation gains force but threatens landed interests and control from above.

Chaadaev’s Letter I already named forces dominating “from the highest strata… to the <strong>slave who exists only for the pleasure of his master</strong>”; your path tries to make that hierarchy morally intolerable in policy, not only in a paragraph.

Pushkin’s Yevgeny, who “found the great unnerving,” dwelled in poor Kolomna and stands for every small life the plan forgets. The statue and the flood are one fable about power. Can the empire refuse absolute dominion over persons without chaos?

<strong>Vera</strong> asks who pays compensation.

<strong>Andrei Mikhailovich</strong> mutters about Poland and precedent.`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (master and slave):</strong> “…forces which dominate everything here from the highest strata of society to the slave who exists only for the pleasure of his master.”<br><span class="read-gloss">Chaadaev names power from court down to the enslaved person. That is the moral ladder Father Dimitri pointed at: promising elections while people are still serfs is empty.</span><br><br><strong><em>The Bronze Horseman</em>, Part One (Yevgeny before the flood):</strong> “Our hero dwelled / In poor Kolomna… / Some office, found the great unnerving…” (<em>The Bronze Horseman</em>, Part One.)<br><span class="read-gloss">Pushkin’s Yevgeny is a small clerk under the great plan. The two choices on this screen are whether you build careful noble alliances or force a public scandal. Both are also about whether <em>he</em> counts in politics.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Noble alliances, careful administrators; buy time without another Decembrist-style explosion.”", next: "beat_west_print", effects: { order: 4, reform: 8, people: 10 }, item: "reform_charter" },
          { text: "<strong>You:</strong> “Public networks; force the scandal until the capital cannot look away.”", next: "beat_west_print", effects: { order: -18, reform: 12, people: 6 } }
        ]
      },

      beat_west_print: {
        title: "Journals and the Third Section",
        text: `Your path is Westernizing in spirit: universities, law codes, translation societies. Chaadaev’s letter circulates alongside Hegel and the French debates. The Third Section takes notes; a governor asks whether “universal history” is worth a riot.

Chaadaev asked: “Where are our wise men, where are our <strong>thinkers</strong>? Who is there who has ever <strong>thought for us</strong>?” Your journals wager that a reading minority can become that elite; for enlightenment or for sedition, depending on who writes the report.

Pushkin’s Neva is a counter-image: the state’s plan and the clerk’s room are not the same story. Winter will test whether print or ranks decide what Russia becomes next. <strong>Sometimes the mail contradicts your rehearsed moral</strong>; the die can cross-wire rumor and path.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (who thinks for Russia?):</strong> “Now I ask you, where are our wise men, where are our thinkers? Who is there who has ever thought for us, who is there who thinks for us today?”<br><span class="read-gloss">Chaadaev demands a thinking public, not a mute crowd. Keeping the journals loud claims the salon as that minority; quieting them trades thought for patronage and a thinner file—at the cost of conceding the mind to chiefs who stamp in triplicate.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Keep printing; circles, students, editors. Let spies earn their salary.”", next: "crisis_west", effects: { order: -6, reform: 10, people: 4 } },
          { text: "<strong>You</strong> (over Stepan’s wince): “Quiet the journals; secure funding and ministerial cover first, trained staff second.”", next: "crisis_west", effects: { order: 10, reform: 2, people: -4 } }
        ]
      },

      distinct_path: {
        title: "A Separate Destiny",
        text: `Chaadaev mistakes difference for failure, you answer. Russia is not late Europe. Orthodox tradition, communal memory, and social fabric may offer another historical contribution; an answer to “universal history” that does not concede the letter’s every premise, yet must still face the question of borrowed forms and of who is left out.

You know Letter I also attacked a moral code drawn from “<strong>miserable Byzantium</strong>” and mourned Russia’s isolation from Latin Christendom’s “<strong>vivifying principle of unity</strong>”; so Slavophile pride does not simply <em>refute</em> Chaadaev; it must answer him on his own historical terms.

<strong>Stepan</strong> worries you are swapping one borrowed slogan for another.

<strong>Father Dimitri</strong> listens for whether “destiny” still reaches the poor.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (Byzantium and schism):</strong> “…we proceeded to seek the moral code which was to constitute our education in miserable Byzantium…” / “…the vivifying principle of unity animated everything.”<br><span class="read-gloss">Chaadaev attacks Orthodox separation from Latin Christendom and lost “unity.” Any Slavophile answer on the next screen still has to answer <em>that</em> charge, not only praise the village.</span><br><br><strong>Letter I (Russia between East and West):</strong> “…situated between the two great divisions of the world, between the East and the West, leaning with one elbow on China and another on Germany, we should have united within us the two great principles of intelligent nature…”<br><span class="read-gloss">Chaadaev says Russia could have fused East and West in one people but missed its vocation. If you pick the statist branch next, you are trading that romantic myth for loyalty to throne and ministries.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Moral community, not Western individualism dressed as reform.”", next: "slavophile", path: "slav", effects: { order: 2, reform: -6, people: 4 }, item: "slavophile_note" },
          { text: "<strong>You</strong> (to Stepan): “We align with the throne and ministries (the chain of command), not salon manifestos. Unity first; we keep religious or national arguments private unless rank invites them.”", next: "state_path", path: "statist", effects: { order: 14, reform: -8, people: -4 } }
        ]
      },

      slavophile: {
        title: "Community and Faith",
        text: `Your circle emphasizes sobornost and local tradition. Younger voices; Konstantin Aksakov will become one of the clearest; will argue that Russia’s truth lives in land, <em>narod</em>, and spirit, not in a borrowed legal script. Critics ask whether policy can follow without freezing the past.

Letter I’s shadow: Chaadaev blamed <strong>schism</strong> and separation from the Western Church for missing Europe’s intellectual unity. Your defense of Orthodoxy must confront that indictment, not only celebrate the village.

<strong>Vera</strong> asks whether the village is a moral refuge or an alibi.

<strong>Pushkin’s Petersburg</strong> intrudes: when the state is absolute, can the communal soul starve as surely as Evgeny under the bronze gaze?

Which answer do you hazard aloud?`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (charges the Slavophile path must answer):</strong> schism, “miserable Byzantium,” and missing Europe’s “vivifying principle of unity” (see same passages as <em>A Separate Destiny</em> scene).<br><span class="read-gloss">Soil-first pride still owes Chaadaev an answer on schism and failed unity—not only praise of the village.</span><br><br><strong>Discuss:</strong> Land, <em>narod</em>, Orthodox conscience, suspicion of abstract “rights” talk (themes later associated with Aksakov). Does this language help the clerk in the flood, or chiefly the idea of the village?<br><span class="read-gloss">First answer: parish schools and elected boards—faith with budgets. Second: freeze foreign-looking law and defend the whole way of life. Both test whether <em>narod</em> talk reaches Pushkin’s clerk or stops at the icon.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Turn <em>sobornost</em> (communal spiritual unity) into parish schools and accountable oversight: faith backed by real institutions and budgets, not a substitute for them.”", next: "beat_aksakov", effects: { order: 4, reform: 6, people: 8 } },
          { text: "<strong>You:</strong> “Freeze borrowed law; defend the whole way of life; reform would dissolve what we love.”", next: "beat_aksakov", effects: { order: 12, reform: -14, people: -6 } }
        ]
      },

      beat_aksakov: {
        title: "Aksakov at the Edge of the Letter",
        text: `<strong>Konstantin Aksakov</strong> (1817–1860) does not answer Chaadaev with European timelines. He treats the Russian people as a moral-historical subject in its own right: communal bonds, Orthodox conscience, and native speech against the abstract “rights” chatter of the West. Petersburg’s granite plan; Pushkin’s bronze rider; is for him a symbol of uprooted, state-driven power alien to the soil.

This <em>inverts</em> much of Chaadaev’s prescription while sometimes echoing his shame: Russia may have failed Europe’s exam without thereby owing Europe its soul. The tension is live: can Slavophile language protect Evgeny, or only the idea of the village?`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (cloak and false progress):</strong> “…he threw us the cloak of civilization: we took up the cloak but did not so much as touch civilization.”<br><span class="read-gloss">Even soil-first rhetoric can wear Chaadaev’s “cloak.” The hard public line risks costume; the softened line admits selective borrowing—winter will test which was honest.</span><br><br><strong>Letter I (sterile soil):</strong> “…not one useful idea has germinated in the sterile soil of our fatherland…”<br><span class="read-gloss">Chaadaev’s barren soil taunt hangs over both stances: proclaim native truth loudly, or temper the edge while still importing technique.</span>`
        },
        choices: [
          { text: "Take Aksakov’s line in public: truth in our own soil, not a borrowed code.", next: "crisis_slav", effects: { order: 4, reform: -8, people: 6 }, item: "aksakov_note" },
          { text: "Soften the edge: speak of spirit, yet allow selective borrowing in practice.", next: "crisis_slav", effects: { order: 2, reform: 2, people: 2 } }
        ]
      },

      state_path: {
        title: "Order Before Liberty",
        text: `You are <strong>not</strong> the Tsar; you are a circle that wants the capital to believe that stability is worth more than salon scandal. Officials praise loyalty; rails and bureaucracy expand. Through cousins in the service and governors’ antechambers, you might ease <em>limited</em> debate, or you might feed the Third Section’s vocabulary.

Writers in your own room whisper: order without conscience grows sterile, like a rider of bronze who outlives every Evgeny.

Chaadaev’s “<strong>cloak of civilization</strong>” hangs in the air: the state took the garment of reform but, he charged, barely touched civilization itself. Your camp prefers a slow, supervised march; but <strong>only the sovereign and the ministers</strong> sign decrees; you supply briefs, introductions, and rumor.

<strong>Andrei</strong> has a brother in the Ministry of Education.

<strong>Stepan</strong> asks whether you are advising power or flattering it.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (cloak of civilization):</strong> “…he threw us the cloak of civilization: we took up the cloak but did not so much as touch civilization.”<br><span class="read-gloss">Chaadaev warns the state can wear the cloak of civilization without touching the real thing. The two choices below are opposite ways your circle tries to “fix” that image: loyal sponsored readings versus urging crackdown.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Draft a brief for Andrei’s patron: <em>sponsored</em> readings, tight program; show we can govern thought without burning every journal.”", next: "beat_statist_machine", effects: { order: -4, reform: 10, people: 6 }, item: "pushkin_bronze" },
          { text: "<strong>You:</strong> “Urge our contacts to treat Chaadaev’s circle as seditious; pull our manuscripts, praise firm censorship in letters <em>they</em> can show upstairs.”", next: "beat_statist_machine", effects: { order: 14, reform: -12, people: -10 } }
        ]
      },

      beat_statist_machine: {
        title: "Files, Uniforms, and the Letter as Case File",
        text: `Chaadaev’s text is copied into triplicate. The salon is not an idea but a security category; for the police. <strong>You</strong> cannot order a search; you can volunteer a <em>summary</em> for a section chief, host a “loyal” reading to shape the file, or distance yourself from friends who copied the letter.

Reform, upstairs, exists only where it thickens the chain of command. Letter I asked who would <strong>think for Russia</strong>. The answer in the corridors is the minister and the clerk with the stamp, not you, unless you marry into the chain or draft its language.

Here the Bronze Horseman is read as state majesty, not as Evgeny’s tragedy; unless someone in <em>your</em> circle dares say so, which costs him the next favor from a patron.`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (who thinks for the nation?):</strong> “…where are our wise men, where are our thinkers? Who is there who has ever thought for us…”<br><span class="read-gloss">On this track the file often answers Chaadaev before the salon speaks: memos route dissent into ranks, or names feed the Third Section—two ways of “thinking for Russia” that cost different friendships.</span><br><br><strong><em>The Bronze Horseman</em>, Part Two (statue as power):</strong> “Oh, Destiny’s great potentate! / Was it not thus, a towering idol…” (<em>The Bronze Horseman</em>, Part Two.)<br><span class="read-gloss">Pushkin’s idol is state majesty raised above human scale. The informer choice sharpens that machinery against your own circle—Pushkin’s clerk stays the moral counterweight if anyone still dares say his name.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “I’ll help frame the case for commissions; memos that route dissent into ranked reports, not street trials.”", next: "crisis_statist", effects: { order: 8, reform: 4, people: -6 } },
          { text: "<strong>You:</strong> “I give the police names: who circulated the letter, who mocked court ceremony; let the Third Section arrest them while we keep our hands clean.”", next: "crisis_statist", effects: { order: 12, reform: -10, people: -10 }, walkout: "vera" }
        ]
      },

      mediator: {
        title: "Between Imitation and Isolation",
        text: `You accept Chaadaev’s moral urgency but reject pure copying. Learn Europe’s law and science; rework them through local history.

Chaadaev once imagined Russia between East and West; “leaning with one elbow on <strong>China</strong> and another on <strong>Germany</strong>”; called to unite imagination and reason; he concluded Providence had “left us completely on our own.” Your path is a stubborn attempt to build the synthesis that history denied.

The same autumn questions persist, but the answer is neither abject imitation nor proud isolation. Pushkin’s flood already taught that borrowed granite and fleets need foundations that ordinary lives can survive.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (between East and West):</strong> “…leaning with one elbow on China and another on Germany, we should have united within us the two great principles of intelligent nature - imagination and reason…”<br><span class="read-gloss">Chaadaev wanted imagination and reason fused in one Russia; history never delivered it. The mediator’s first fork is whether you try that fusion in cities first or in the provinces first.</span><br><br><strong>Letter I (Providence and solitude):</strong> “…Providence has left us completely on our own, has refused all involvement in any of our affairs…”<br><span class="read-gloss">Providence left Russia alone in Chaadaev’s text. Your wager here answers that abandonment: borrow law and technique, but root them in local voice—neither pure copy nor proud isolation.</span><br><br><strong>Discuss:</strong> Can law and technique be rooted so that clerks and provinces recognize themselves in them, not as decorations dropped from the capital?<br><span class="read-gloss">The Discuss line is the moral test for the two forks below: will provinces and clerks recognize themselves in your pilot, or only see another capital ornament?</span>`
        },
        counterfactualNote: `The phrase “zemstvo-style” names a later model (zemstvos from 1864). You are staging the <em>argument</em> for local voice in the 1830s, not claiming the institutions already exist.`,
        choices: [
          { text: "Pilot reforms in cities first.", next: "mediator_city", effects: { order: 2, reform: 10, people: -2 } },
          { text: "Start in provinces: zemstvo-style councils and schools.", next: "mediator_province", effects: { order: -2, reform: 8, people: 10 } }
        ]
      },

      mediator_city: {
        title: "Pilot Modernization",
        text: `St. Petersburg and Moscow glitter; the periphery lags. Inequality feeds resentment. The Bronze Horseman’s shadow: magnificence for some, drowning rooms for others.`,
        primaryRead: {
          title: "Read alongside: The Bronze Horseman",
          body: `<strong>Prologue (capital’s glory):</strong> “Peter’s own creation,” granite, Nevá’s “carapace.”<br><span class="read-gloss">Pushkin’s prologue is showpiece capital. The “negotiate with conservatives” button accepts that capital splendor still sets the political tempo for your pilot.</span><br><br><strong>Part One (ordinary life vs. plan):</strong> Yevgeny in “poor Kolomna,” the flood “Leaped on the city.” (<em>The Bronze Horseman</em>, prologue and Part One.)<br><span class="read-gloss">Yevgeny in poor Kolomna is periphery <em>inside</em> the capital. The “public pressure” choice argues that his kind of life, not only salons, must shape any national rollout.</span>`
        },
        choices: [
          { text: "Negotiate broader rollout with conservatives.", next: "beat_med_bridge", effects: { order: 6, reform: 6, people: 2 } },
          { text: "Public pressure for national adoption.", next: "beat_med_bridge", effects: { order: -10, reform: 12, people: 4 } }
        ]
      },

      mediator_province: {
        title: "From the Ground Up",
        text: `Teachers and local councils reshape life outside the capitals. Trust grows where institutions feel familiar, not dropped from above like a decree in a storm.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (peoples mature slowly):</strong> “Peoples are moral beings just as individuals are. It takes centuries to educate them, just as it takes years to educate a person.”<br><span class="read-gloss">Chaadaev says nations mature slowly: moral cover for slow provincial schools and councils. The “central directives” choice trades that patience for speed ordered from St. Petersburg.</span>`
        },
        counterfactualNote: `Provincial self-rule as imagined here borrows from reforms that mature decades later; the game uses it to test values (trust vs. speed), not to simulate an 1836 statute.`,
        choices: [
          { text: "Slow institution-building over decades.", next: "beat_med_bridge", effects: { order: 4, reform: 10, people: 10 } },
          { text: "Shift to central directives to speed outcomes.", next: "beat_med_bridge", effects: { order: 8, reform: 4, people: -8 } }
        ]
      },

      beat_med_bridge: {
        title: "Neither Salon Nor Soil Alone",
        text: `You steer between Chaadaev’s demand for real participation in “civilization” and the Slavophile warning that borrowed forms may hollow the country. Zemstvo dreams meet ministry suspicion; Pushkin’s poem is cited by both sides; flood for the people, embankments for the state.

His image of Russia between <strong>East and West</strong>, a country called to merge two principles yet left to find its own way, haunts your compromise: neither pure Brussels nor pure Moscow, but a ledger both can sign.

The bridge strains: local trust is your asset; central jealousy is the weather.`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (East/West mission):</strong> “…leaning with one elbow on China and another on Germany…” (full passage in <em>Between Imitation and Isolation</em> read-along).<br><span class="read-gloss">You promised locals a hybrid East–West synthesis. The ministry-veto winter event tests whether that promise was ever real power or only talk.</span><br><br><strong><em>The Bronze Horseman</em>:</strong> flood vs. embankments; clerk vs. statue (<em>The Bronze Horseman</em>, Part One and Part Two).<br><span class="read-gloss">Pushkin gives the image set for center (statue, embankments) vs. periphery (clerk, flood). Ask who pays when budgets and blame move upstairs to ministers.</span>`
        },
        counterfactualNote: `“Zemstvo dreams” is shorthand for local budgets and schools; real zemstvo law postdates this era. Treat clashes as thought-experiment, not documentary.`,
        choices: [
          { text: "Insist local budgets lead; fight ministerial veto in the open.", next: "crisis_med", effects: { order: -4, reform: 8, people: 8 } },
          { text: "Trade public spotlight for guarantees: a smaller trial program, but written protections.", next: "crisis_med", effects: { order: 6, reform: 6, people: 2 } }
        ]
      },

      crisis_west: {
        title: "Winter 1837: The Westernizing Wager",
        text: `Ice, journals, spies: the reformers’ winter. Will a reading society survive, will the Neva echo in the capital’s nerves, will a ministry strike a provincial budget you never championed, or will the censor end the season?

You spent the season in print, law, and the Europe-facing case, but couriers do not ask which lamp you read by. Which whisper hardens into “what everyone knows” owes something to whether your friends still move in step with the ministries (the <strong>Order</strong> on your meter), and something to plain ill luck at the threshold. <strong>Two ones when you felt sure of yourself, or a six from nowhere when you felt invisible, can force the wrong crisis through the door</strong>. The sort of mess later lectures call “contingency,” but tonight is only dread and bad timing.

Roll once: d6 + Order bonus. Strong totals lean toward a salon breakthrough or a Neva echo from the north; a Slavophile or statist circle, in this same frost, would be untangling different gossip entirely.`,
        crisisRoll: true,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (thinkers and the crowd):</strong> “…where are our wise men, where are our thinkers? Who is there who has ever thought for us…”<br><span class="read-gloss">Chaadaev contrasts a few thinkers with a mute crowd. The die roll on this Westernizing winter screen decides which side (salon or street) gets the rumor that shapes your story.</span><br><br><strong><em>The Bronze Horseman</em>:</strong> Part One (the Neva flood); Part Two (Yevgeny and the statue).<br><span class="read-gloss">Pushkin keeps the clerk and the flood in the same world as salon debate. Ideas don’t float free of water, roofs, or terror.</span>`
        },
        choices: [
          { text: "Roll fate (1d6 + Order bonus)", next: null, roll: true }
        ]
      },

      crisis_slav: {
        title: "Winter 1837: Soil, Censor, and the Provinces",
        text: `Land committees, clergy, and provincial gentry watch the capital. Aksakov’s language circulates in copies; the Third Section reads “narod” as a code for unrest. Will an Orthodox-sympathetic governor host a reading, will rural notables block a ministry school plan, will flood gossip from the capital derail your soil-first story, or will the packet burn?

The provinces do not file their fears in your order. <strong>Snake eyes on a night you thought won, or a six when you had no pull, can paste someone else’s scandal onto your soil-first story</strong>. Raw contingency that syllabi will later call “background noise,” but your table will remember as the wrong name on the seal.

Roll once: d6 + Order bonus. Middling totals favor gentry and clergy digging in against Petersburg’s school maps; a high throw may still buy a guarded salon hour, if the gendarmes are watching another staircase.`,
        crisisRoll: true,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (Byzantium / unity):</strong> “…miserable Byzantium…” / “…the vivifying principle of unity…”<br><span class="read-gloss">Chaadaev names schism and missed Latin unity. The Slavophile winter roll will stress either soil rhetoric or rootless Petersburg. Both are answers you still owe him.</span><br><br><strong>Letter I (village vs. capital air):</strong> nomads in the cities passage (see <em>News from the Capital</em>).<br><span class="read-gloss">Same letter: village soul vs. nomads in the capital. The winter rumor table will lean on one side or the other after you roll.</span>`
        },
        choices: [
          { text: "Roll fate (1d6 + Order bonus)", next: null, roll: true }
        ]
      },

      crisis_statist: {
        title: "Winter 1837: The Apparatus Closes Ranks",
        text: `From your salon’s window, the letter is already a file number. Troops stand by embankments; floods become logistics, not moral drama. Reformers are “managed” by people you do not command. When someone asks who “thinks for Russia” now, the garrison and the <strong>Chief Directorate of Censorship</strong> have ready answers; your circle only hears the echo.

Will winter hand you another Neva alarm: proclamations, barges, the <em>center</em> forced to move in daylight, or only the dull rhythm of seized proofs and closed rooms? Or will a sideways whisper slip the latch: <strong>a permissive rumor when you prayed for discipline, or a clamp when you needed breathing room</strong>. The kind of misfire files never quite explain?

Roll once: d6 + Order bonus. High totals sound like flood and emergency; low ones, like censors and ordinary fear. <strong>When fortune crosses the wires, even those patterns lie.</strong>`,
        crisisRoll: true,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (who thinks for Russia?):</strong> wise men / “thought for us” passage.<br><span class="read-gloss">Under censorship, Chaadaev’s question (“who thinks for Russia?”) is answered in advance by the police. The die tests whether any other rumor breaks through anyway.</span><br><br><strong><em>The Bronze Horseman</em>:</strong> flood as state emergency vs. moral catastrophe; “Destiny’s great potentate” (<em>The Bronze Horseman</em>, Part Two).<br><span class="read-gloss">One Neva flood, two readings: statists see logistics and files; Pushkin—and anyone who keeps Yevgeny in the room—stress the clerk’s horror alongside the plan.</span>`
        },
        choices: [
          { text: "Roll fate (1d6 + Order bonus)", next: null, roll: true }
        ]
      },

      crisis_med: {
        title: "Winter 1837: The Bridge Under Strain",
        text: `Provincial pilots meet winter shortages and ministry ledgers. Chaadaev’s question and Pushkin’s clerk refuse to stay in separate rooms. Will a mixed salon win a night, will zemstvo ambition trigger a central slapdown, will pure censorship erase a pilot you thought safe, or will couriers mistake your patchwork for someone else’s feud, and leave you answering a petition you never signed?

Roll once: d6 + Order bonus. The middling throws are where Petersburg’s ink and the district ledger collide. <strong>If fate misfires, you may inherit another salon’s winter entirely. Compromise, it turns out, does not buy immunity from the wrong rumor.</strong>`,
        crisisRoll: true,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I:</strong> China/Germany / “left us completely on our own” (mediator path).<br><span class="read-gloss">Hybrid mission, lonely execution in Chaadaev’s terms. When the winter die misfires, another salon’s rumor can still land on you—compromise did not seal the door.</span><br><br><strong><em>The Bronze Horseman</em>:</strong> clerk, flood, statue; center vs. periphery read through Part One–Two.<br><span class="read-gloss">Clerk, flood, and statue are one Pushkin story; the mediator winter beat keeps them on the same page, not in separate files.</span>`
        },
        counterfactualNote: `Zemstvo “ambition” in dialogue belongs chiefly to later decades; here it stands in for any pilot local fund the ministry might crush.`,
        choices: [
          { text: "Roll fate (1d6 + Order bonus)", next: null, roll: true }
        ]
      },

      event_flood_echo: {
        title: "Echo of the Neva",
        text: `Word arrives of ice jams and broken embankments in the north. Merchants panic; clerks lose roofs. The capital’s plan is grand; the water does not read decrees.

Chaadaev had written of a people with no lasting home, of <strong>nomads in the cities</strong>, and of masters and slaves in one breath. The flood turns metaphor into wet plaster and broken timber.

Pushkin’s Nevá “<strong>Leaped on the city</strong>”; coffins float down streets; the sovereign owns that <strong>“For czars there is no pitting / Their power against the Lord’s</strong>”; small comfort if your isle is gone.

<strong>Asymmetric sting:</strong> reform-minded voices may seize the scandal to demand change, yet the <strong>People</strong> meter still dives; panic and loss outrun rhetoric. One axis improving does not spare the others.

(Automatic: Order −5, Reform +5, People −8.)`,
        primaryRead: {
          title: "Read alongside: The Bronze Horseman",
          body: `<strong>Part One (flood):</strong> “Nevá, engorged, with swell and roaring… / Leaped on the city.” “Into the deeply hollowed basements, / Canals rose gushing to the casements.” “There streamed Petropolis, foam-laced…” (<em>The Bronze Horseman</em>, Part One.)<br><span class="read-gloss">Pushkin’s lines are raw destruction. The “useful scandal” choice below tries to turn that pain into reform rhetoric; the other choice calms chiefs and controls the story.</span><br><br><strong>Part One (aftermath and sovereign):</strong> The Emperor’s generals went speeding “To save the people, who, unheeding / With fear, were drowning where they dwelled.” Compare the sovereign’s speech on czars and the Lord in the same passage (<em>The Bronze Horseman</em>, Part One).<br><span class="read-gloss">The Emperor’s speech is throne theology plus rescue theater. Calming chiefs (second button) matches controlling how that narrative spreads.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Petition governors for relief, open subscriptions; make the scandal <em>useful</em> to reform rhetoric.”", next: "resolve_endings", effects: { order: -8, reform: 8, people: 12 } },
          { text: "<strong>You:</strong> “Counsel contacts to stress legality and calm; urge <em>their</em> chiefs to shape the story before the crowd does.”", next: "resolve_endings", effects: { order: 6, reform: -4, people: -10 } }
        ],
        forcedEffects: { order: -5, reform: 5, people: -8 }
      },

      event_censor: {
        title: "The Censor’s Visit",
        text: `A packet of Chaadaev’s letters is seized. Someone’s Pushkin is “lost.” Order tightens; Reform bleeds.

(Automatic: Order +6, Reform −10, People −4.)`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (imitation and hollowness):</strong> “This is a natural consequence of a culture based wholly upon importation and imitation.”<br><span class="read-gloss">After the censor seizes letters, “protest legally” claims Chaadaev’s ideas were serious; “retreat private” admits the salon was only dressing up.</span>`
        },
        choices: [
          { text: "Protest through legal channels.", next: "resolve_endings", effects: { order: -6, reform: 8, people: 2 } },
          { text: "Retreat to private circles.", next: "resolve_endings", effects: { order: 4, reform: -4, people: 0 } }
        ],
        forcedEffects: { order: 6, reform: -10, people: -4 }
      },

      event_salon: {
        title: "Salon Victory",
        text: `A sympathetic governor allows a reading; <strong>his</strong> indulgence, not yours. Excerpts from <em>The Bronze Horseman</em> (Arndt; flood, statue, pursuit) and Chaadaev share one evening: granite hymn, drowned streets, and history’s verdict.

(Automatic: Order −3, Reform +8, People +6.)`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong><em>The Bronze Horseman</em> (salon-sized excerpts):</strong> Prologue “window to the West”; Part One “Leaped on the city”; Part Two “The Bronze Horseman in pursuit.” (<em>The Bronze Horseman</em>, prologue, Part One, and Part Two.)<br><span class="read-gloss">The poem runs pride → disaster → pursuit in one arc. “Provincial circuit” bets that whole arc can travel beyond one governor’s salon.</span><br><br><strong>Letter I (program in one room):</strong> “…repeat the whole education of mankind…”<br><span class="read-gloss">Chaadaev’s “repeat mankind’s education” is a long haul, not one reading night. Thanking the host and vanishing protects his patronage; a circuit risks it.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Pool subscriptions, beg letters of introduction; stretch this night into a provincial circuit.”", next: "resolve_endings", effects: { order: -4, reform: 10, people: 8 } },
          { text: "<strong>You:</strong> “Thank the host and vanish; let no one say we presumed on imperial patience.”", next: "resolve_endings", effects: { order: 6, reform: 4, people: 2 } }
        ],
        forcedEffects: { order: -3, reform: 8, people: 6 }
      },

      event_rural_gentry: {
        title: "Provincial Notables Dig In",
        text: `Gentry assemblies balk at a ministry school plan: too foreign, too fast. Orthodoxy and local patronage are invoked against “borrowed” classrooms. Order in the provinces looks like inertia; reformers call it sabotage.

(Automatic: Order +2, Reform −5, People +4.)`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (borrowed codes):</strong> “…seek the moral code which was to constitute our education in miserable Byzantium…” / “…the vivifying principle of unity…”<br><span class="read-gloss">Chaadaev’s “Byzantium” and “unity” lines are cousins of the gentry cry “too foreign.” The buttons are the policy fork: negotiate parish schools with locals, or lobby the ministry to crush the assembly.</span>`
        },
        choices: [
          { text: "Negotiate parish schools and elected local boards: Slavophile communities, but with budgets and rules on paper.", next: "resolve_endings", effects: { order: 4, reform: 6, people: 6 } },
          { text: "<strong>You:</strong> “Lobby the ministry to override the assembly; use patrons, not troops we don’t have.”", next: "resolve_endings", effects: { order: 8, reform: 2, people: -8 } }
        ],
        forcedEffects: { order: 2, reform: -5, people: 4 }
      },

      event_zemstvo_clash: {
        title: "Ministry vs. Local Budget",
        text: `A pilot zemstvo’s school fund is struck from above. Central ledgers win the day; provincial trust cracks. Chaadaev’s “borrowing” accusation returns in a new key: mimicry of Western institutions without local teeth.

(Automatic: Order +4, Reform −4, People −6.)`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (importation and imitation):</strong> “This is a natural consequence of a culture based wholly upon importation and imitation.”<br><span class="read-gloss">Chaadaev says import-and-imitate cultures hollow out meaning. A ministry canceling a local school fund is exactly that charge in bureaucratic form.</span><br><br><strong>Letter I (no inner progression):</strong> “With us there is no inner development, no natural progression; new ideas sweep away the old…”<br><span class="read-gloss">Chaadaev says new ideas sweep away the old with no inner progression. Cutting the pilot fund feels like betrayal because another reform idea just got erased from below.</span>`
        },
        counterfactualNote: `Zemstvos in law arrive after this period; this event is a parable about center vs. periphery, not a claim about an 1837 zemstvo budget.`,
        choices: [
          { text: "Appeal publicly; ally with reformers in the capital.", next: "resolve_endings", effects: { order: -8, reform: 10, people: 6 } },
          { text: "Retreat to smaller charity; keep the trial program nominally alive so it can be revived later.", next: "resolve_endings", effects: { order: 4, reform: 2, people: 2 } }
        ],
        forcedEffects: { order: 4, reform: -4, people: -6 }
      },

      resolve_endings: {
        title: "Sorting the Outcome",
        /** Co-op pilot: spend a shared pool across meters before framing choices (`getRealmBudgetPoolPoints()` in game-app.js; 3/5/8 from winter total bands). Solo / gating off: skipped. */
        coopRealmBudgetBeforeChoices: true,
        text: `The winter crisis scene is over. The three colored bars (Order, Reform, People) are the running score for how your choices leaned, not a grade, just a portrait.

Chaadaev’s Letter I asked whether Russia gets an honest place in “universal” history; Pushkin’s <em>Bronze Horseman</em> asked who survives when the state builds in granite and the river rises.

Below, three friends name <em>which of those two questions should close the story you tell about this winter</em>. That choice tilts the voice of the closing scenes—not which dispatch “really” carried the day in Petersburg.`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I:</strong> opening on Madame, “universal education,” West/East, imitation (see <em>Moscow, Autumn 1836</em> read-along for short extracts).<br><span class="read-gloss">Letter I is Chaadaev’s half of the pairing: history, borrowing, whether Russia has an honest seat in “universal” education. <strong>Stepan</strong>’s voice below closes on that program—law and schools as more than salon entertainment.</span><br><br><strong><em>The Bronze Horseman</em>:</strong> Prologue through Part Two (see <em>The Salon Turns to Pushkin</em> for excerpts keyed to those sections).<br><span class="read-gloss">Pushkin runs from Peter’s vow to Yevgeny’s pauper grave. <strong>Andrei</strong> weights majesty and survival; <strong>Father Dimitri</strong> weights the clerk, the flood, and who gets buried without a monument.</span>`
        },
        choices: [
          { text: "<strong>Andrei Mikhailovich</strong> insists: “Stability first; without the state, your ethics are smoke.” <em>(Choose this to frame the epilogue around Order, the blue-gray bar: state survival and ranks.)</em>", next: "final_route_order" },
          { text: "<strong>Stepan</strong> insists: “Law and schools, or we admit Chaadaev was only entertainment.” <em>(Choose this to frame the epilogue around Reform, the rose bar: institutions and Letter I as program.)</em>", next: "final_route_reform" },
          { text: "<strong>Father Dimitri</strong> insists: “If the clerk and the peasant are footnotes, we lied to ourselves.” <em>(Choose this to frame the epilogue around People, the green bar: clerks, peasants, flood victims.)</em>", next: "final_route_people" }
        ]
      },

      final_route_order: {
        title: "Closing: The Weight of Order",
        text: `The closing argument insists on legibility, ranks, and the survival of the state as such. The Bronze Horseman stands: Pushkin addresses him as “<strong>Destiny’s great potentate</strong>.” Yevgeny has no vote in the official story.`,
        primaryRead: {
          title: "Read alongside: The Bronze Horseman",
          body: `<strong>Part Two (direct address to the statue):</strong> “Oh, Destiny’s great potentate! / Was it not thus, a towering idol…” (<em>The Bronze Horseman</em>, Part Two.)<br><span class="read-gloss">Pushkin addresses the statue as fate-like power. Saying yes here lets that majesty—not Yevgeny’s counter-voice—name the moral center of the tale you take out of the winter.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Yes. Tell the story with stability and state authority as the moral center.”", next: "ending_computed" }
        ],
        tag: "order"
      },

      final_route_reform: {
        title: "Closing: The Weight of Reform",
        text: `The closing argument insists on law, schools, and Russia’s stake in a wider history. Chaadaev’s sting is treated as a program, not only a wound.`,
        primaryRead: {
          title: "Read alongside: First Philosophical Letter (Letter I)",
          body: `<strong>Letter I (program):</strong> “…we must, in a certain sense, repeat the whole education of mankind.”<br><span class="read-gloss">“Repeat mankind’s education” is the banner for Stepan’s Reform frame: Russia’s long homework inside world history.</span><br><br><strong>Letter I (duty, justice, law, order):</strong> same theme in <em>The Reformist Circle</em> read-along.<br><span class="read-gloss">For Chaadaev, “education” includes duty and law breathed like air, not scandal headlines alone. That is what Stepan’s closing is claiming.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Yes. Close with law, schools, and Russia’s place in world history, whatever this winter cost.”", next: "ending_computed" }
        ],
        tag: "reform"
      },

      final_route_people: {
        title: "Closing: The Weight of the People",
        text: `The final argument rests on clerks, peasants, and everyone caught in the flood’s path. Pushkin ends with a <strong>pauper’s grave</strong> for the “luckless knave” the city outran; the Neva and the Admiralty’s needle share one lesson: the ledger must count bodies, not only ideas.`,
        primaryRead: {
          title: "Read alongside: Letter I and The Bronze Horseman",
          body: `<strong>Letter I (slave and master):</strong> “…from the highest strata of society to the slave who exists only for the pleasure of his master.”<br><span class="read-gloss">Chaadaev names the whole ladder from court to bonded laborer. Father Dimitri’s closing insists the bottom rung stay in sight—not an afterthought to granite and file.</span><br><br><strong><em>The Bronze Horseman</em>, Part Two (close):</strong> “…Here lay asprawl my luckless knave, / And here in charity they buried / The chill corpse in a pauper’s grave.” (<em>The Bronze Horseman</em>, Part Two, closing.)<br><span class="read-gloss">Yevgeny’s pauper grave is what triumphal history skips. Saying yes here keeps that burial in the tale’s last line—ordinary bodies before monuments.</span>`
        },
        choices: [
          { text: "<strong>You:</strong> “Yes. End with ordinary lives (clerks, peasants), not monuments to emperors.”", next: "ending_computed" }
        ],
        tag: "people"
      },

      ending_computed: {
        title: "Epilogue",
        text: ``,
        choices: [],
        computed: true
      }
    };
