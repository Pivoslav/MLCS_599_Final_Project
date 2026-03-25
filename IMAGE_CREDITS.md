# Image credits (static assets)

The shipped game loads **period-appropriate** art from **Wikimedia Commons** over HTTPS. Full scene backgrounds are listed in **`scene-bg-source`** in play and documented per entry in **`js/game-config.js`** (`SCENE_IMAGES`).

## Dialogue portraits (story column)

Keyed by **`SCENE_DIALOGUE_PORTRAITS`** in **`js/game-config.js`** (under the scene title). Same HTTPS rules as scene panels.

| Scene key | Subject (caption varies) | Commons file page |
|-----------|--------------------------|-------------------|
| `intro` | Pyotr Chaadayev (engraving) | [RusPortraits Chaadaev](https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg) |
| `salon_pushkin` | Alexander Pushkin | [Pushkin portrait](https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg) |
| `reformist`, `distinct_path`, `slavophile` | Chaadayev (engraving; Slav beat uses him as **foil**) | [same engraving](https://commons.wikimedia.org/wiki/File:RusPortraits_v5-237_Petr_Iakovlevich_Chaadaev,_1794-1856.jpg) |
| `reform_education`, `crisis_west` | Chaadayev (portrait jpeg) | [Chaadaev portrait](https://commons.wikimedia.org/wiki/File:Chaadaev_portrait.jpeg) |
| `beat_west_print`, `beat_statist_machine`, `event_censor` | Count Benckendorff (engraving) | [Benckendorff](https://commons.wikimedia.org/wiki/File:RusPortraits_v2-046_Le_Comte_Alexandre_Khristoforowitch_Benkendorf.jpg) |
| `petersburg_pressure`, `event_salon` | Pushkin | [Pushkin portrait](https://commons.wikimedia.org/wiki/File:Alexander_Puschkin.jpg) |
| `beat_aksakov`, `crisis_slav` | Konstantin Aksakov (photo scan) | [KonstantinAksakov.jpg](https://commons.wikimedia.org/wiki/File:KonstantinAksakov.jpg) |
| `state_path`, `crisis_statist`, `event_rural_gentry` | Nicholas I | [Nicholas I](https://commons.wikimedia.org/wiki/File:Nicholas_I_of_Russia.jpg) |

**Student bundle:** no API keys; images are normal `<img src="https://upload.wikimedia.org/…">` requests. If Commons or upload.wikimedia.org is blocked on a school network, portraits (and some scene panels) may fail to load; the game text still works.
