    const ITEMS = {
      chaadaev_letter: "Chaadaev’s First Letter (1836)",
      pushkin_bronze: "Pushkin, <em>Bronze Horseman</em> (Arndt trans.)",
      reform_charter: "Draft charter (local schools)",
      slavophile_note: "Notes on sobornost &amp; tradition",
      aksakov_note: "Konstantin Aksakov: land, <em>narod</em>, spirit vs. borrowed law"
    };

    const INV_SVG = {
      scroll:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h6"/><path d="M8 17h4"/></svg>',
      book:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5a2 2 0 012-2h7v20H4a2 2 0 01-2-2V5zm20 0a2 2 0 00-2-2h-7v20h7a2 2 0 002-2V5z"/></svg>',
      doc:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>',
      quill:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 2 2-7 7-4 1 1-4z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 7.5"/><path d="M16 16l2 2"/></svg>',
      church:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 6v14H4V8l8-6z"/><path d="M9 22v-8h6v8"/></svg>'
    };

    const ITEM_ICONS = {
      chaadaev_letter: INV_SVG.scroll,
      pushkin_bronze: INV_SVG.book,
      reform_charter: INV_SVG.doc,
      slavophile_note: INV_SVG.church,
      aksakov_note: INV_SVG.quill
    };

    /**
     * Glossary modal: keys match data-gloss-icon on each <dt> in index.html.
     * Stroke vocabulary aligns with choice-row icons and icons-showcase.html.
     */
    const GLOSSARY_ICON_BY_KEY = {
      teleskop: INV_SVG.scroll,
      third_section:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10c0-3 2-6 4-6s4 3 4 6v3H8v-3z"/><path d="M6 13h12v3H6z"/><path d="M10 21h4"/><path d="M12 16v5"/></svg>',
      sobornost: INV_SVG.church,
      narod:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="2.5"/><path d="M3 21v-1.5A3.5 3.5 0 016.5 16h5a3.5 3.5 0 013.5 3.5V21"/><path d="M14 21v-1.2a2.8 2.8 0 012.5-2.8h1"/></svg>',
      neva_flood:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18h20"/><path d="M4 22c3-2 5-2 8 0s5 2 8 0"/></svg>',
      bronze_horseman: INV_SVG.book,
      zemstvo:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-6 9 6v9H3V12z"/><path d="M9 21V14h6v7"/><path d="M12 10v2"/></svg>',
      salon_network:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
      game_meters:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20V10M12 20V4M18 20v-8"/></svg>',
      genre_letter: INV_SVG.quill,
      chaadaev_europe:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>'
    };

    /**
     * Optional dialogue portrait under the scene title only (not full-width SCENE_IMAGES backgrounds).
     * Same static-HTTPS rule as SCENE_IMAGES; provenance from RusPortraits / Commons where noted.
     * @type {Record<string, { src: string, alt: string, caption: string, creditHref?: string }>}
     */
    const SCENE_DIALOGUE_PORTRAITS = {
      intro: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Pyotr Chaadayev in formal dress, bust length, facing slightly right.",
        caption:
          "Pyotr Chaadayev; author of the First Philosophical Letter (engraving, 19th c., catalogue portrait).",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg"
      },
      salon_pushkin: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Puschkin.jpg",
        alt: "Portrait of Alexander Pushkin with dark curly hair and a high collar.",
        caption:
          "Alexander Pushkin; the salon turns to The Bronze Horseman (commonly reproduced portrait).",
        creditHref: "https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg"
      },
      reformist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Pyotr Chaadayev in formal dress, bust length.",
        caption: "Westernizing opening: Chaadayev’s letter as program for law, schools, and print.",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg"
      },
      reform_education: {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Chaadaev_portrait.jpeg",
        alt: "Portrait of Pyotr Chaadayev, oil or print after a nineteenth-century likeness.",
        caption: "Chaadayev; schools, charters, and petitions on the Westernizing path.",
        creditHref: "https://commons.wikimedia.org/wiki/File:Chaadaev_portrait.jpeg"
      },
      beat_west_print: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        alt: "Engraved portrait of Count Alexander von Benckendorff in uniform.",
        caption: "Count Benckendorff; shorthand for files, salons, and Third Section pressure on print.",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg"
      },
      petersburg_pressure: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Puschkin.jpg",
        alt: "Portrait of Alexander Pushkin with dark curly hair and a high collar.",
        caption: "Pushkin’s Neva and clerk; the capital’s flood logic beside Chaadaev’s nomads.",
        creditHref: "https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg"
      },
      distinct_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Pyotr Chaadayev in formal dress, bust length.",
        caption: "Chaadayev’s verdict still hangs in the air; the room seeks a separate destiny.",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg"
      },
      slavophile: {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/44/RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev%2C_1794-1856.jpg",
        alt: "Engraved portrait of Pyotr Chaadayev in formal dress, bust length.",
        caption: "Soil and faith answers still argue with Chaadaev’s letter; foil, not wallpaper.",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg"
      },
      beat_aksakov: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/KonstantinAksakov.jpg",
        alt: "Photograph of Konstantin Sergeyevich Aksakov, seated, nineteenth-century print reproduction.",
        caption: "Konstantin Aksakov (1817–1860); narod, soil, and spirit vs. borrowed law (Commons scan).",
        creditHref: "https://commons.wikimedia.org/wiki/File:KonstantinAksakov.jpg"
      },
      state_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        alt: "Portrait of Emperor Nicholas I of Russia in military dress.",
        caption: "Nicholas I; the offstage sovereign your circle lobbies, never replaces (portrait).",
        creditHref: "https://commons.wikimedia.org/wiki/File:Nicholas_I_of_Russia.jpg"
      },
      beat_statist_machine: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        alt: "Engraved portrait of Count Alexander von Benckendorff in uniform.",
        caption: "Benckendorff and the file; memoranda, names, and the climate of the Third Section.",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg"
      },
      crisis_west: {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Chaadaev_portrait.jpeg",
        alt: "Portrait of Pyotr Chaadayev, nineteenth-century likeness.",
        caption: "Westernizing winter; Chaadayev’s questions under salon, censor, and flood rumors.",
        creditHref: "https://commons.wikimedia.org/wiki/File:Chaadaev_portrait.jpeg"
      },
      crisis_slav: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/KonstantinAksakov.jpg",
        alt: "Photograph of Konstantin Sergeyevich Aksakov, nineteenth-century reproduction.",
        caption: "Slavophile winter; parish, provinces, and censor in Aksakov’s key.",
        creditHref: "https://commons.wikimedia.org/wiki/File:KonstantinAksakov.jpg"
      },
      crisis_statist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        alt: "Portrait of Emperor Nicholas I of Russia in military dress.",
        caption: "Statist winter; logistics, files, and flood echo under Nicholas’s reign.",
        creditHref: "https://commons.wikimedia.org/wiki/File:Nicholas_I_of_Russia.jpg"
      },
      event_censor: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d9/RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg",
        alt: "Engraved portrait of Count Alexander von Benckendorff in uniform.",
        caption: "Censor’s visit; political police and seizure climate (Benckendorff engraving).",
        creditHref: "https://commons.wikimedia.org/wiki/File:RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg"
      },
      event_salon: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Alexander_Puschkin.jpg",
        alt: "Portrait of Alexander Pushkin with dark curly hair and a high collar.",
        caption: "Salon breakthrough; print and poetry still face the same corridors.",
        creditHref: "https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg"
      },
      event_rural_gentry: {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Nicholas_I_of_Russia.jpg",
        alt: "Portrait of Emperor Nicholas I of Russia in military dress.",
        caption: "Provincial notables and ministry schools; patronage logic under the autocrat.",
        creditHref: "https://commons.wikimedia.org/wiki/File:Nicholas_I_of_Russia.jpg"
      }
    };

    /**
     * Per-scene art: prefer Commons /thumb/…/1280px-… (or 1920px) URLs for very large masters so mobile
     * browsers decode reliably; keep href on the canonical file page. Optional bgPos for cover crops.
     * Do not use portrait plates as full-width backgrounds (banner dialogue portraits stay separate).
     * Fallback with no src: set bgGradient (CSS linear-gradient string) + credit; rails stay off.
     *
     * BACKLOG (item 2; scene imagery):
     * - Period appropriateness (critical): assets should fit ~1830s imperial Russia and the game’s
     *   salon / Neva / province frame. Avoid anachronisms (e.g. cars, modern street furniture, obvious
     *   contemporary photos of historic sites). Prefer period paintings, engravings, documented
     *   architecture views, and early photography only when the scene is clearly pre-modern.
     * - Reduce recycling: prefer distinct center (main column) images per scene where feasible.
     * - Side rails (.scene-rail): MUST use different image files than the center panel; not the same
     *   URL with a different crop. When implementing, add e.g. railSrc / SCENE_RAIL_IMAGES keyed by
     *   sceneId (left/right may share one rail image or differ; still ≠ center src).
     */
    const SCENE_IMAGES = {
      session_format: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Square_in_Moscow_%281801%29_by_Fedor_Alekseev.jpg",
        alt: "Red Square and the Kremlin in Moscow (painting, ca. 1801).",
        credit: "Fyodor Alekseyev, <em>Red Square in Moscow</em> (ca. 1801; table setup against the imperial city).",
        href: "https://commons.wikimedia.org/wiki/File:Red_Square_in_Moscow_(1801)_by_Fedor_Alekseev.jpg",
        bgPos: "48% 38%"
      },
      intro: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Olga_Kotchetova_-_Int%C3%A9rieur_de_salon.jpg/1280px-Olga_Kotchetova_-_Int%C3%A9rieur_de_salon.jpg",
        alt: "Oil painting of a lamp-lit interior with figures seated in a nineteenth-century salon.",
        credit: "Olga Kotchetova, <em>Intérieur de salon</em> (late 19th c.; Moscow salon night, Chaadaev’s letter).",
        href: "https://commons.wikimedia.org/wiki/File:Olga_Kotchetova_-_Int%C3%A9rieur_de_salon.jpg",
        bgPos: "48% 42%"
      },
      salon_pushkin: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fontanka_beggrov.jpg/1280px-Fontanka_beggrov.jpg",
        alt: "Nineteenth-century lithograph of the Fontanka River embankment in Saint Petersburg.",
        credit: "Karl Beggrov, Fontanka embankment (salon turns to Pushkin; city plate, portrait stays in the banner).",
        href: "https://commons.wikimedia.org/wiki/File:Fontanka_beggrov.jpg",
        bgPos: "50% 45%"
      },
      petersburg_pressure: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg/1280px-Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        alt: "Nineteenth-century view of a bridge over the Fontanka in Saint Petersburg.",
        credit: "Karl Beggrov, view of Panteleymonovsky Bridge, Fontanka.",
        href: "https://commons.wikimedia.org/wiki/File:Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg"
      },
      reformist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Alexeev_Senatskaya_plocshad.jpg/1280px-Alexeev_Senatskaya_plocshad.jpg",
        alt: "Painting of Senate Square with Saint Isaac’s Cathedral and the Senate in Saint Petersburg.",
        credit: "Fyodor Alexeyev, Senate Square (Westernizing reform: institutions and façades, not a sitter).",
        href: "https://commons.wikimedia.org/wiki/File:Alexeev_Senatskaya_plocshad.jpg",
        bgPos: "50% 40%"
      },
      reform_education: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg/1280px-Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        alt: "Ivanovskaya Square, Moscow (early nineteenth-century city view).",
        credit: "Fyodor Alekseyev, Ivanovskaya Square, Moscow (schools and charters; Moscow fabric).",
        href: "https://commons.wikimedia.org/wiki/File:Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        bgPos: "50% 40%"
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
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/PalaceSquare-Sadovnikov.jpg/1280px-PalaceSquare-Sadovnikov.jpg",
        alt: "Palace Square and the Winter Palace in Saint Petersburg (19th-century watercolor).",
        credit: "Vasily Sadovnikov, Palace Square (journals, Third Section, capital: ministry facades and the public stage).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
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
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Gorskii_04449u.jpg/1280px-Gorskii_04449u.jpg",
        alt: "Church of St. Boris and Gleb near Suzdal (early color photograph, ca. 1910).",
        credit: "Sergey Prokudin-Gorsky, Church of St. Boris and Gleb near Suzdal (ca. 1910).",
        href: "https://commons.wikimedia.org/wiki/File:Gorskii_04449u.jpg",
        bgPos: "50% 40%"
      },
      state_path: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Alekseev_Kremlin_palace-1800.jpg/1280px-Alekseev_Kremlin_palace-1800.jpg",
        alt: "Painting of the Kremlin palace complex and cathedrals above the Moskva River.",
        credit: "Fyodor Alexeyev, Kremlin palace view (shared with the next statist beat: vertical center, ministries, and the letter as case file).",
        href: "https://commons.wikimedia.org/wiki/File:Alekseev_Kremlin_palace-1800.jpg",
        bgPos: "50% 38%"
      },
      beat_statist_machine: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Alekseev_Kremlin_palace-1800.jpg/1280px-Alekseev_Kremlin_palace-1800.jpg",
        alt: "Painting of the Kremlin palace complex and cathedrals above the Moskva River.",
        credit: "Fyodor Alexeyev, Kremlin palace view (same plate as <em>Order Before Liberty</em>; files, uniforms, and the letter as case file).",
        href: "https://commons.wikimedia.org/wiki/File:Alekseev_Kremlin_palace-1800.jpg",
        bgPos: "50% 38%"
      },
      mediator: {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Dvortsovaya_pier_at_1840.jpg",
        alt: "The Palace Embankment and Neva piers (watercolor, 1840).",
        credit: "Vasily Sadovnikov, Palace Embankment pier (1840); center–province negotiation.",
        href: "https://commons.wikimedia.org/wiki/File:Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      },
      mediator_city: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Columns_and_Kazan_Kathedral_behiind.jpg/1280px-Columns_and_Kazan_Kathedral_behiind.jpg",
        alt: "Watercolor view of Kazan Cathedral with colonnade (scan of an 1847 Sadovnikov watercolor).",
        credit: "After Vasily Sadovnikov (1847 watercolor); scan and restoration by Vitold Muratov, CC BY-SA 3.0 (mediator city beat: imperial public church and square).",
        href: "https://commons.wikimedia.org/wiki/File:Columns_and_Kazan_Kathedral_behiind.jpg",
        bgPos: "50% 42%"
      },
      mediator_province: {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        alt: "Ivanovskaya Square, Moscow (early 19th-century city view).",
        credit: "Fyodor Alekseyev, Ivanovskaya Square, Moscow.",
        href: "https://commons.wikimedia.org/wiki/File:Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        bgPos: "50% 40%"
      },
      beat_med_bridge: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Alexeev_Voskresenskie_vorota_3.jpg",
        alt: "Painting of the Resurrection Gate and Iberian Chapel at the north end of Red Square, Moscow.",
        credit: "Fyodor Alexeyev, Resurrection Gate and Iberian Chapel (mediator bridge beat: threshold between courts and streets).",
        href: "https://commons.wikimedia.org/wiki/File:Alexeev_Voskresenskie_vorota_3.jpg",
        bgPos: "48% 38%"
      },
      crisis_west: {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Alekseev_Nikolskie_vorota_Kitai_Goroda.jpg",
        alt: "Painting of Nikolskiye Gates and Kitay-gorod walls in Moscow, with merchants and traffic.",
        credit: "Fyodor Alexeyev, Nikolskiye Gates, Kitay-gorod (Westernizing crisis: commerce, print, borrowed façades).",
        href: "https://commons.wikimedia.org/wiki/File:Alekseev_Nikolskie_vorota_Kitai_Goroda.jpg",
        bgPos: "46% 36%"
      },
      crisis_slav: {
        src: "https://upload.wikimedia.org/wikipedia/commons/5/54/Alekseev_Spas_na_Boru.jpg",
        alt: "Painting of the Savior in the Wood monastery and wooded hills near Moscow.",
        credit: "Fyodor Alexeyev, <em>Spas na Boru</em> (Slavophile crisis: monastery, soil, spiritual landscape).",
        href: "https://commons.wikimedia.org/wiki/File:Alekseev_Spas_na_Boru.jpg",
        bgPos: "50% 42%"
      },
      crisis_statist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/PalaceSquare-Sadovnikov.jpg/1280px-PalaceSquare-Sadovnikov.jpg",
        alt: "Palace Square and the Winter Palace in Saint Petersburg (19th-century watercolor).",
        credit: "Vasily Sadovnikov, Palace Square (statist crisis: capital façade and crowd geometry).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      crisis_med: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        alt: "Historical depiction of the 1824 Saint Petersburg flood.",
        credit: "The flood in Saint Petersburg, 1824 (mediator crisis: bridge and embankment under strain).",
        href: "https://commons.wikimedia.org/wiki/File:The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      },
      event_flood_echo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/12/Fontanka_beggrov.jpg",
        alt: "Nineteenth-century lithograph of the Fontanka River embankment in Saint Petersburg.",
        credit: "Karl Beggrov, Fontanka embankment (Neva-side water logic without reusing the 1824 flood plate).",
        href: "https://commons.wikimedia.org/wiki/File:Fontanka_beggrov.jpg",
        bgPos: "50% 45%"
      },
      event_censor: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Anichkov_bridge.jpg/1280px-Anichkov_bridge.jpg",
        alt: "The Anichkov Bridge in Saint Petersburg.",
        credit: "Anichkov Bridge over the Fontanka (censorship beat: official city fabric; Benckendorff stays in dialogue banner where used).",
        href: "https://commons.wikimedia.org/wiki/File:Anichkov_bridge.jpg",
        bgPos: "50% 45%"
      },
      event_salon: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Olga_Kotchetova_-_Int%C3%A9rieur_de_salon.jpg/1280px-Olga_Kotchetova_-_Int%C3%A9rieur_de_salon.jpg",
        alt: "Oil painting of a lamp-lit interior with figures seated in a nineteenth-century salon.",
        credit: "Olga Kotchetova, <em>Intérieur de salon</em> (salon reopens after pressure; interior plate, no single portrait as backdrop).",
        href: "https://commons.wikimedia.org/wiki/File:Olga_Kotchetova_-_Int%C3%A9rieur_de_salon.jpg",
        bgPos: "48% 42%"
      },
      event_rural_gentry: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vid_na_Kreml_ot_Vospitatelnogo_doma.jpg/1280px-Vid_na_Kreml_ot_Vospitatelnogo_doma.jpg",
        alt: "Painting of the Moscow Kremlin towers seen from the Foundling Hospital embankment.",
        credit: "Fyodor Alexeyev, Kremlin from the Foundling Hospital (provincial notables eyeing the vertical center).",
        href: "https://commons.wikimedia.org/wiki/File:Vid_na_Kreml_ot_Vospitatelnogo_doma.jpg",
        bgPos: "48% 40%"
      },
      event_zemstvo_clash: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Carl_Kollmann_Saint-P%C3%A9tersbourg.jpg",
        alt: "Early lithograph panorama of Saint Petersburg with spires and the Neva.",
        credit: "Carl Kollmann, panorama of Saint Petersburg (zemstvo clash: ministry city vs. local pilot).",
        href: "https://commons.wikimedia.org/wiki/File:Carl_Kollmann_Saint-P%C3%A9tersbourg.jpg",
        bgPos: "50% 42%"
      },
      resolve_endings: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/PalaceSquare-Sadovnikov.jpg/1280px-PalaceSquare-Sadovnikov.jpg",
        alt: "Watercolor of Palace Square and the Winter Palace in Saint Petersburg (19th century).",
        credit: "Vasily Sadovnikov, Palace Square and the Winter Palace (19th c.; sorting the outcome: period painting, no modern street traffic).",
        href: "https://commons.wikimedia.org/wiki/File:PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      final_route_order: {
        src: "https://upload.wikimedia.org/wikipedia/commons/2/27/Palace_Embankment_near_Hermitage_Theatre_%28Beggrov%29.jpg",
        alt: "Lithograph of the Palace Embankment near the Hermitage Theatre in Saint Petersburg.",
        credit: "Karl Beggrov, Palace Embankment near the Hermitage Theatre (closing frame: Order, ranks, façade).",
        href: "https://commons.wikimedia.org/wiki/File:Palace_Embankment_near_Hermitage_Theatre_(Beggrov).jpg",
        bgPos: "52% 46%"
      },
      final_route_reform: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Alexeev_Senatskaya_plocshad.jpg",
        alt: "Painting of Senate Square with Saint Isaac’s Cathedral and the Senate in Saint Petersburg.",
        credit: "Fyodor Alexeyev, Senate Square (closing frame: Reform, law, public institutions).",
        href: "https://commons.wikimedia.org/wiki/File:Alexeev_Senatskaya_plocshad.jpg",
        bgPos: "50% 40%"
      },
      final_route_people: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg/1280px-The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        alt: "Historical depiction of the 1824 Saint Petersburg flood.",
        credit: "The flood in Saint Petersburg, 1824 (People lens: water, clerks, and lives beside the bronze story).",
        href: "https://commons.wikimedia.org/wiki/File:The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      },
      ending_computed: {
        src: "https://upload.wikimedia.org/wikipedia/commons/2/23/Beggrov_Vid_na_Isaakij.jpg",
        alt: "Lithograph view of Saint Isaac’s Cathedral rising above the Saint Petersburg skyline.",
        credit: "Karl Beggrov, view of Saint Isaac’s Cathedral (epilogue coda: monument, horizon, story fixed in stone).",
        href: "https://commons.wikimedia.org/wiki/File:Beggrov_Vid_na_Isaakij.jpg",
        bgPos: "50% 38%"
      },
      /** Statist + Order epilogue: single full-width plate (side rails off; see <code>railsHidden</code> in <code>updateSceneVisuals</code>). */
      ending_statist_order: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vid_na_Kreml_ot_Vospitatelnogo_doma.jpg/1280px-Vid_na_Kreml_ot_Vospitatelnogo_doma.jpg",
        alt: "Painting of the Moscow Kremlin towers seen from the Foundling Hospital embankment.",
        credit: "Fyodor Alexeyev, Kremlin from the Foundling Hospital (<em>Ending: The File Outlives the Salon</em>: one plate, dossier and vertical center).",
        href: "https://commons.wikimedia.org/wiki/File:Vid_na_Kreml_ot_Vospitatelnogo_doma.jpg",
        bgPos: "48% 40%",
        railsHidden: true
      }
    };

    /**
     * Optional override for epilogue background art (defaults to <code>ending_computed</code>).
     * Keys are <code>pathId_finalLeanApplied</code>, e.g. <code>statist_order</code>.
     * @type {Record<string, string>}
     */
    const EPILOGUE_SCENE_VISUALS = {
      statist_order: "ending_statist_order"
    };

    /**
     * Side rails: separate Commons files from the center panel (BACKLOG 2c). All picks are pre-modern
     * paintings, prints, or early photography; rail.src must never equal SCENE_IMAGES[sceneId].src.
     */
    const SCENE_RAIL_IMAGES = {
      session_format: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        bgPos: "50% 38%"
      },
      intro: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Alekseev_Nikolskie_vorota_Kitai_Goroda.jpg/1280px-Alekseev_Nikolskie_vorota_Kitai_Goroda.jpg",
        bgPos: "46% 36%"
      },
      salon_pushkin: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg/1280px-Fyodor_Alekseyev._View_of_Ivanovskaya_Square.jpg",
        bgPos: "50% 40%"
      },
      petersburg_pressure: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Anichkov_bridge.jpg/1280px-Anichkov_bridge.jpg",
        bgPos: "50% 45%"
      },
      reformist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dvortsovaya_pier_at_1840.jpg/1280px-Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      },
      reform_education: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fontanka_beggrov.jpg/1280px-Fontanka_beggrov.jpg",
        bgPos: "50% 45%"
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
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dvortsovaya_pier_at_1840.jpg/1280px-Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
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
        src: "https://upload.wikimedia.org/wikipedia/commons/1/14/SVINYIN%281814%29_p039_View_of_the_Monument_of_Peter_the_Great.jpg",
        bgPos: "50% 42%"
      },
      beat_statist_machine: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/PalaceSquare-Sadovnikov.jpg/1280px-PalaceSquare-Sadovnikov.jpg",
        bgPos: "52% 42%"
      },
      mediator: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Square_in_Moscow_%281801%29_by_Fedor_Alekseev.jpg",
        bgPos: "48% 38%"
      },
      mediator_city: {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Beggrov_K_View_of_Chain_Panteleimonovsky_Bridge_across_Fontanka.jpg",
        bgPos: "50% 38%"
      },
      mediator_province: {
        src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Red_Square_in_Moscow_%281801%29_by_Fedor_Alekseev.jpg",
        bgPos: "48% 38%"
      },
      beat_med_bridge: {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      },
      crisis_west: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fontanka_beggrov.jpg/1280px-Fontanka_beggrov.jpg",
        bgPos: "50% 45%"
      },
      crisis_slav: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        bgPos: "52% 35%"
      },
      crisis_statist: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg/1280px-The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      },
      crisis_med: {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      },
      event_flood_echo: {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/93/The_Flood_in_St.Petersburg_in_1824._1820-ies.jpg",
        bgPos: "50% 45%"
      },
      event_censor: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fontanka_beggrov.jpg/1280px-Fontanka_beggrov.jpg",
        bgPos: "50% 45%"
      },
      event_salon: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Savrasov_1871.jpeg",
        bgPos: "48% 38%"
      },
      event_rural_gentry: {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Church_of_the_Intercession_on_the_Nerl.jpg",
        bgPos: "52% 35%"
      },
      event_zemstvo_clash: {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Anichkov_bridge.jpg",
        bgPos: "55% 45%"
      },
      resolve_endings: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fontanka_beggrov.jpg/1280px-Fontanka_beggrov.jpg",
        bgPos: "50% 45%"
      },
      final_route_order: {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/14/SVINYIN%281814%29_p039_View_of_the_Monument_of_Peter_the_Great.jpg",
        bgPos: "50% 42%"
      },
      final_route_reform: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Palace_Embankment_near_Hermitage_Theatre_%28Beggrov%29.jpg/1280px-Palace_Embankment_near_Hermitage_Theatre_%28Beggrov%29.jpg",
        bgPos: "52% 46%"
      },
      final_route_people: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Savrasov_1871.jpeg/1280px-Savrasov_1871.jpeg",
        bgPos: "48% 38%"
      },
      ending_computed: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dvortsovaya_pier_at_1840.jpg/1280px-Dvortsovaya_pier_at_1840.jpg",
        bgPos: "50% 48%"
      }
    };

    /** Colour wash bucket per scene (see .content[data-ambient] in CSS). */
    const SCENE_AMBIENT = {
      session_format: "salon",
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
      ending_computed: "finis",
      ending_statist_order: "finis"
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

    /**
     * Epilogue “what this run was about”: path-level narrative (society/politics), not a scene checklist.
     * Shown above the twelve endings; keyed by <code>state.pathId</code>.
     */
    const RUN_RECAP_PATH_NARRATIVE = {
      west: `<p>Your salon walked the <strong>Westernizing</strong> wager. You treated Europe less as a costume than as a syllabus: law, print, schools, the hope that Russia might join what Chaadaev called universal history without pretending it had already paid every tuition fee.</p><p>In the politics of Nicholas’s decade, that stance buys enemies in the Third Section and impatience in drawing rooms. The autocracy wants borrowed manners it can stage; reformers want debate that can survive morning arrests. Your track keeps asking whether institutions redeem Chaadaev’s shame about imitation, or only rename it.</p><p>Pushkin’s Petersburg is the reproach in the corner: granite on the embankment, Evgeny at the waterline. A Westernizer winter is always deciding whether “progress” names a façade the state will fund or a life clerks can actually afford.</p>`,
      slav: `<p>Your circle pressed the <strong>Slavophile</strong> counter-theme: <em>narod</em>, soil, parish voice, and a suspicion of rights-talk that sounds like foreign uniforms. You did not necessarily dismiss Chaadaev; you often argued his wound while refusing his pharmacy, or you braided both.</p><p>For Russian politics this is a fight over who may speak for the village and the altar once the ministry learns the same words. Local trust becomes an asset and a mask: it can shelter ordinary rhythm, or decorate a dispatch that still flows from Petersburg.</p><p>Aksakov’s shadow in your satchel is a reminder that “Russian spirit” is not automatically innocent of power. The same autumn still has to answer Pushkin’s clerk: does soil-talk ever reach Kolomna, or only the linden at the manor gate?</p>`,
      statist: `<p>You played gentry and clerks who serve the <strong>vertical</strong> without holding the scepter: memoranda, patrons, files, the Third Section’s vocabulary always at the edge of hearing. Chaadaev’s letter becomes case material; Pushkin’s statue becomes majesty you file before you pity.</p><p>The political meaning is blunt. Stability trades air for ink; thought lives where chiefs allow margins. Flood years become logistics; scandals become schedules. The society you model is legible to ministers first, and only sometimes to conscience.</p><p>Your winter tests whether Chaadaev’s “cloak of civilization” fits the police office better than the classroom, and whether continuity without debate is still civilization or only its uniform.</p>`,
      med: `<p>Your path refused the clean duel between wholesale import and proud isolation. You chased <strong>hybrid</strong> schools, hybrid ledgers, capital technique with provincial accents, the bet that law can sound Russian in the yard while foreign words still sit on the page.</p><p>In political terms you always negotiate two jealousies: Petersburg’s fear of chaos, and the provinces’ fear of ornaments dropped from above. “Zemstvo-style” talk in this game names that quarrel as an argument, not a claim that the real institution already exists in 1836.</p><p>Chaadaev asked for moral depth inside borrowed forms; your winter asks whether compromise is a bridge or only rope beside stone until the next flood.</p>`
    };

    /** How the player chose to <em>frame</em> the epilogue (Order / Reform / People). */
    const RUN_RECAP_FRAMING_SENTENCE = {
      order:
        "At the close you framed the story with <strong>stability first</strong>: ranks and continuity as the spine, even when that leaves Chaadaev in the waiting room.",
      reform:
        "At the close you framed the story through <strong>law and schools</strong>: Russia’s long homework in institutions, with the censor still in the next corridor.",
      people:
        "At the close you refused to bury the clerk: the last word went to <strong>bodies, roofs, and flooded rooms</strong>, not only to bronze and files."
    };
