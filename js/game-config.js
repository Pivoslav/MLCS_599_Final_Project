    const ITEMS = {
      chaadaev_letter: "Chaadaev’s First Letter (1836)",
      pushkin_bronze: "Pushkin, <em>Bronze Horseman</em> (Arndt trans.)",
      reform_charter: "Draft charter (local schools)",
      slavophile_note: "Notes on sobornost &amp; tradition",
      aksakov_note: "Konstantin Aksakov: land, <em>narod</em>, spirit vs. borrowed law"
    };

    const INV_SVG = {
      scroll: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h6"/><path d="M8 17h4"/></svg>',
      book: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 5a2 2 0 012-2h7v20H4a2 2 0 01-2-2V5zm20 0a2 2 0 00-2-2h-7v20h7a2 2 0 002-2V5z"/></svg>',
      doc: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>',
      quill: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 2 2-7 7-4 1 1-4z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 7.5"/><path d="M16 16l2 2"/></svg>',
      church: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 6v14H4V8l8-6z"/><path d="M9 22v-8h6v8"/></svg>'
    };

    const ITEM_ICONS = {
      chaadaev_letter: INV_SVG.scroll,
      pushkin_bronze: INV_SVG.book,
      reform_charter: INV_SVG.doc,
      slavophile_note: INV_SVG.church,
      aksakov_note: INV_SVG.quill
    };

    /**
     * Per-scene art: direct upload.wikimedia.org URLs (Commons /thumb/ paths often 404 in browsers).
     * Optional bgPos: background-position for cover crops. Portraits use a lower horizontal % so the
     * subject sits in the clearer band to the right of the text-column veil (see .content-scene-veil).
     *
     * BACKLOG (item 2 — scene imagery):
     * - Period appropriateness (critical): assets should fit ~1830s imperial Russia and the game’s
     *   salon / Neva / province frame. Avoid anachronisms (e.g. cars, modern street furniture, obvious
     *   contemporary photos of historic sites). Prefer period paintings, engravings, documented
     *   architecture views, and early photography only when the scene is clearly pre-modern.
     * - Reduce recycling: prefer distinct center (main column) images per scene where feasible.
     * - Side rails (.scene-rail): MUST use different image files than the center panel — not the same
     *   URL with a different crop. When implementing, add e.g. railSrc / SCENE_RAIL_IMAGES keyed by
     *   sceneId (left/right may share one rail image or differ; still ≠ center src).
     */
    const SCENE_IMAGES = {
      intro: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Square_in_Moscow_%281801%29_by_Fedor_Alekseev.jpg",
        alt: "Red Square and the Kremlin in Moscow (painting, ca. 1801).",
        credit: "Fyodor Alekseyev, <em>Red Square in Moscow</em> (ca. 1801).",
        href: "https://commons.wikimedia.org/wiki/File:Red_Square_in_Moscow_(1801)_by_Fedor_Alekseev.jpg",
        bgPos: "48% 38%"
      },
      salon_pushkin: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Puschkin.jpg",
        alt: "Portrait of Alexander Pushkin.",
        credit: "Portrait of Alexander Pushkin.",
        href: "https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg",
        bgPos: "38% 20%"
      },
      petersburg_pressure: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        alt: "Nineteenth-century view of a bridge over the Fontanka in Saint Petersburg.",
        credit: "Karl Beggrov, view of Panteleymonovsky Bridge, Fontanka.",
        href: "https://commons.wikimedia.org/wiki/File:Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg"
      },
      reformist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Pyotr Chaadayev.",
        credit: "Engraved portrait of Petr Chaadaev (Grand Duke Nicholas Mikhailovich catalogue).",
        href: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg",
        bgPos: "42% 20%"
      },
      reform_education: {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Chaadaev_portrait.jpeg",
        alt: "Portrait of Pyotr Chaadayev.",
        credit: "Portrait of Pyotr Chaadayev (19th c., after Kozina).",
        href: "https://commons.wikimedia.org/wiki/File:Chaadaev_portrait.jpeg",
        bgPos: "44% 16%"
      },
      stub_petition_winter: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        alt: "Palace Square and the Winter Palace (19th-century watercolor).",
        credit: "Vasily Sadovnikov, Palace Square and the Winter Palace (19th c.).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      reform_serfdom: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Savrasov_1871.jpeg",
        alt: "Savrasov’s study of melting snow, rooks, and a village church (The Rooks Have Returned).",
        credit: "Alexei Savrasov, study related to <em>The Rooks Have Returned</em> (1871).",
        href: "https://commons.wikimedia.org/wiki/File:Savrasov_1871.jpeg",
        bgPos: "48% 38%"
      },
      beat_west_print: {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Chaadaev_portrait.jpeg",
        alt: "Portrait of Pyotr Chaadayev.",
        credit: "Portrait of Pyotr Chaadayev.",
        href: "https://commons.wikimedia.org/wiki/File:Chaadaev_portrait.jpeg",
        bgPos: "44% 16%"
      },
      distinct_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        alt: "The Anichkov Bridge in Saint Petersburg.",
        credit: "Anichkov Bridge over the Fontanka.",
        href: "https://commons.wikimedia.org/wiki/File:Anichkov_bridge.jpg"
      },
      slavophile: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        alt: "Church of the Intercession on the Nerl.",
        credit: "Church of the Intercession on the Nerl.",
        href: "https://commons.wikimedia.org/wiki/File:Church_of_the_Intercession_on_the_Nerl.jpg"
      },
      beat_aksakov: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Gorskii_04449u.jpg",
        alt: "Church of St. Boris and Gleb near Suzdal (early color photograph, ca. 1910).",
        credit: "Sergey Prokudin-Gorsky, Church of St. Boris and Gleb near Suzdal (ca. 1910).",
        href: "https://commons.wikimedia.org/wiki/File:Gorskii_04449u.jpg",
        bgPos: "50% 40%"
      },
      state_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        alt: "Palace Square and the Winter Palace (19th-century watercolor).",
        credit: "Vasily Sadovnikov, Palace Square (19th c.).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      beat_statist_machine: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        alt: "Portrait of Emperor Nicholas I of Russia.",
        credit: "Portrait of Nicholas I of Russia.",
        href: "https://commons.wikimedia.org/wiki/File:Nicholas_I_of_Russia.jpg",
        bgPos: "38% 22%"
      },
      mediator: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        alt: "The Anichkov Bridge in Saint Petersburg.",
        credit: "Anichkov Bridge (metaphor for bridging center and province).",
        href: "https://commons.wikimedia.org/wiki/File:Anichkov_bridge.jpg"
      },
      mediator_city: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        alt: "View of a bridge over the Fontanka in Saint Petersburg.",
        credit: "Beggrov, Fontanka bridge view.",
        href: "https://commons.wikimedia.org/wiki/File:Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg"
      },
      mediator_province: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        alt: "Ivanovskaya Square, Moscow (early 19th-century city view).",
        credit: "Fyodor Alekseyev, Ivanovskaya Square, Moscow.",
        href: "https://commons.wikimedia.org/wiki/File:Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        bgPos: "50% 40%"
      },
      beat_med_bridge: {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Dvortsovaya_pier_at_1840.jpg",
        alt: "The Palace Embankment and Neva piers (watercolor, 1840).",
        credit: "Vasily Sadovnikov, Palace Embankment pier (1840).",
        href: "https://commons.wikimedia.org/wiki/File:Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      },
      crisis_west: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Pyotr Chaadayev.",
        credit: "Chaadaev engraving (Westernizing crisis beat).",
        href: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg",
        bgPos: "42% 20%"
      },
      crisis_slav: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        alt: "Church of the Intercession on the Nerl.",
        credit: "Church of the Intercession on the Nerl (Slavophile crisis beat).",
        href: "https://commons.wikimedia.org/wiki/File:Church_of_the_Intercession_on_the_Nerl.jpg"
      },
      crisis_statist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        alt: "Portrait of Emperor Nicholas I.",
        credit: "Nicholas I (statist crisis beat).",
        href: "https://commons.wikimedia.org/wiki/File:Nicholas_I_of_Russia.jpg",
        bgPos: "38% 22%"
      },
      crisis_med: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        alt: "Anichkov Bridge.",
        credit: "Anichkov Bridge (mediator crisis beat).",
        href: "https://commons.wikimedia.org/wiki/File:Anichkov_bridge.jpg"
      },
      event_flood_echo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        alt: "Historical depiction of the 1824 Saint Petersburg flood.",
        credit: "The flood in Saint Petersburg, 1824 (contemporary image).",
        href: "https://commons.wikimedia.org/wiki/File:The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg"
      },
      event_censor: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        alt: "Engraved portrait of Count Alexander von Benckendorff.",
        credit: "Engraved portrait of Alexander von Benckendorff (Third Section / gendarmes; censorship climate).",
        href: "https://commons.wikimedia.org/wiki/File:RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        bgPos: "38% 22%"
      },
      event_salon: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Puschkin.jpg",
        alt: "Portrait of Alexander Pushkin.",
        credit: "Pushkin (salon and print culture).",
        href: "https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg",
        bgPos: "38% 20%"
      },
      event_rural_gentry: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        alt: "Church of the Intercession on the Nerl.",
        credit: "Rural landmark (provincial gentry resistance).",
        href: "https://commons.wikimedia.org/wiki/File:Church_of_the_Intercession_on_the_Nerl.jpg"
      },
      event_zemstvo_clash: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        alt: "Palace Square and the Winter Palace (19th-century watercolor).",
        credit: "Vasily Sadovnikov, Palace Square (ministry vs. local pilot).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      resolve_endings: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        alt: "The Anichkov Bridge over the Fontanka (historical view).",
        credit: "Anichkov Bridge (sorting hat: which frame closes the run?).",
        href: "https://commons.wikimedia.org/wiki/File:Anichkov_bridge.jpg",
        bgPos: "58% 45%"
      },
      final_route_order: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        alt: "Palace Square and the Winter Palace (19th-century watercolor).",
        credit: "Vasily Sadovnikov, Palace Square (closing frame: Order).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      final_route_reform: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Chaadayev.",
        credit: "Chaadaev engraving (closing frame: Reform).",
        href: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg",
        bgPos: "42% 20%"
      },
      final_route_people: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        alt: "The 1824 Saint Petersburg flood.",
        credit: "1824 flood (closing frame: People / Evgeny’s side).",
        href: "https://commons.wikimedia.org/wiki/File:The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg"
      },
      ending_computed: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/14/SVINYIN%281814%29_p039_View_of_the_Monument_of_Peter_the_Great.jpg",
        alt: "The Bronze Horseman monument (early 19th-century print).",
        credit: "M. S. Viniychuk after F. P. Alexeyev, view of the monument to Peter the Great (plate from Stepan Pimenov, <em>Collection of the most remarkable places of St. Petersburg</em>, 1814).",
        href: "https://commons.wikimedia.org/wiki/File:SVINYIN(1814)_p039_View_of_the_Monument_of_Peter_the_Great.jpg",
        bgPos: "50% 42%"
      }
    };

    /**
     * Side rails: separate Commons files from the center panel (BACKLOG 2c). All picks are pre-modern
     * paintings, prints, or early photography; rail.src must never equal SCENE_IMAGES[sceneId].src.
     */
    const SCENE_RAIL_IMAGES = {
      intro: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        bgPos: "50% 38%"
      },
      salon_pushkin: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        bgPos: "42% 20%"
      },
      petersburg_pressure: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        bgPos: "50% 45%"
      },
      reformist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Puschkin.jpg",
        bgPos: "38% 20%"
      },
      reform_education: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        bgPos: "44% 20%"
      },
      stub_petition_winter: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      },
      reform_serfdom: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        bgPos: "48% 35%"
      },
      beat_west_print: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        bgPos: "38% 22%"
      },
      distinct_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        bgPos: "50% 40%"
      },
      slavophile: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Savrasov_1871.jpeg",
        bgPos: "48% 38%"
      },
      beat_aksakov: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        bgPos: "52% 35%"
      },
      state_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        bgPos: "38% 22%"
      },
      beat_statist_machine: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        bgPos: "38% 22%"
      },
      mediator: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Square_in_Moscow_%281801%29_by_Fedor_Alekseev.jpg",
        bgPos: "48% 38%"
      },
      mediator_city: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      mediator_province: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Square_in_Moscow_%281801%29_by_Fedor_Alekseev.jpg",
        bgPos: "48% 38%"
      },
      beat_med_bridge: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        bgPos: "55% 45%"
      },
      crisis_west: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      },
      crisis_slav: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Gorskii_04449u.jpg",
        bgPos: "50% 40%"
      },
      crisis_statist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        bgPos: "42% 20%"
      },
      crisis_med: {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      },
      event_flood_echo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        bgPos: "50% 38%"
      },
      event_censor: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        bgPos: "38% 22%"
      },
      event_salon: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        bgPos: "50% 40%"
      },
      event_rural_gentry: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      event_zemstvo_clash: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        bgPos: "55% 45%"
      },
      resolve_endings: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/19/PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      final_route_order: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/14/SVINYIN%281814%29_p039_View_of_the_Monument_of_Peter_the_Great.jpg",
        bgPos: "50% 42%"
      },
      final_route_reform: {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Chaadaev_portrait.jpeg",
        bgPos: "44% 16%"
      },
      final_route_people: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Savrasov_1871.jpeg",
        bgPos: "48% 38%"
      },
      ending_computed: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      }
    };

    /** Colour wash bucket per scene (see .content[data-ambient] in CSS). */
    const SCENE_AMBIENT = {
      intro: "salon",
      salon_pushkin: "print",
      petersburg_pressure: "neva",
      reformist: "print",
      reform_education: "print",
      stub_petition_winter: "winter",
      reform_serfdom: "soil",
      beat_west_print: "print",
      distinct_path: "bridge",
      slavophile: "soil",
      beat_aksakov: "soil",
      state_path: "crown",
      beat_statist_machine: "crown",
      mediator: "bridge",
      mediator_city: "neva",
      mediator_province: "soil",
      beat_med_bridge: "bridge",
      crisis_west: "winter",
      crisis_slav: "winter",
      crisis_statist: "winter",
      crisis_med: "winter",
      event_flood_echo: "flood",
      event_censor: "censor",
      event_salon: "print",
      event_rural_gentry: "soil",
      event_zemstvo_clash: "zemstvo",
      resolve_endings: "sorting",
      final_route_order: "crown",
      final_route_reform: "print",
      final_route_people: "flood",
      ending_computed: "finis"
    };

    /**
     * Optional global palette preset per scene: sets html[data-scheme] when not "default".
     * CSS defines :root[data-scheme="frost"] and ["ember"] as examples; add more named schemes there first.
     * Per-scene one-offs: prefer selectors :root[data-scene-id="…"] { --veil-rgb: … } in css/game.css.
     * @type {Record<string, "default"|"frost"|"ember">}
     */
    const SCENE_COLOR_SCHEME = {
      event_flood_echo: "frost",
      event_censor: "ember"
    };
    /** After crisis, the “sorting” scene gets a path-specific lead-in. */
    const RESOLVE_PATH_LEAD = {
      west: `You have been arguing from the Westernizing side of the room: law, print, universities, and the hope that Russia can, in Chaadaev’s phrase, <strong>repeat the whole education of mankind</strong> using the history of humanity before it, not “in one stroke” mimic progress it never helped build.`,
      slav: `You have been arguing from the Slavophile side, sharpened by voices such as <strong>Konstantin Aksakov</strong> (1817–1860): the Russian people (<em>narod</em>), the land, and Orthodox moral community as the true seat of renewal, not a code imported from abroad. Chaadaev’s shame is sometimes accepted; his remedy is rejected, yet his Letter I also indicted <strong>schism</strong> and a moral code drawn from “miserable Byzantium,” so every position the salon took still wrestles with Chaadaev’s premises, not only his conclusions.`,
      statist: `You have been arguing <strong>for</strong> the throne’s logic, not <em>as</em> the autocrat. Your circle is gentry, clerks, officers who defend unity, legible ranks, and the containment of dangerous print. You draft memoranda, cultivate patrons in ministries, self-censor, or urge superiors to act. The <strong>sovereign and the ministers</strong> still hold the pen that signs decrees; you only supply the climate in which they move. Someone remembers Chaadaev’s <strong>cloak of civilization</strong>. Your camp prefers order in half-modern garb to another hollow leap.`,
      med: `You have been arguing the mediator’s wager: borrow European law and technique, but root them in local councils, schools, and provincial trust: neither pure imitation nor proud isolation. (When the text says “zemstvo-style,” that names a <em>later</em> institution used here as shorthand; see Historical staging on any mediator beat.) Chaadaev imagined Russia between East and West, meant to fuse imagination and reason; he concluded Providence had “left us completely on our own.” The mediator track is the game’s name for trying to finish that unfinished synthesis.`
    };
