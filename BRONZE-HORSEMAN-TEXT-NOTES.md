# *Bronze Horseman* primary text vs. the CYOA — notes

## File in repo

- **`Final/bronze_horseman.txt`** — English translation by **Walter Arndt** (1993). Header and endnotes in the file cite the edition (e.g. Penguin *Portable Nineteenth-Century Russian Reader* / Ardis). Spelling **Yevgeny** (not “Evgeny”) matches Arndt; the game sometimes uses “Evgeny” in choice labels and discussion prompts for familiarity—**Terms** in `index.html` flags this.

**Regenerate or replace** only if you swap translations; then grep the CYOA for quoted phrases and update `primaryRead` blocks and scene glosses.

---

## Verified anchors (Arndt, `bronze_horseman.txt`)

| Theme | Approx. lines (txt file) | Use in `index.html` |
|--------|--------------------------|----------------------|
| Peter’s vow, “window to the West,” new city | ~24–28 | `salon_pushkin` **Read alongside** (Prologue) |
| Love hymn: perfluctation, granite, “Peter’s own creation” | ~56–58, 62 | same |
| Flood: Nevá engorged, “Leaped on the city,” Petropolis foam-laced | ~191–197 | `salon_pushkin`, `petersburg_pressure`, `event_flood_echo` |
| Emperor: “For czars there is no pitting / Their power against the Lord’s” | ~220–221 | `event_flood_echo` scene text |
| After flood: “surcharge their neighbor” | ~364 | `reform_education` |
| Yevgeny: Kolomna, “found the great unnerving” | ~129–130 | `state_path` |
| Part Two: Idol on granite, “great wonder-worker,” “Bronze Horseman in pursuit” | ~446–475 | `salon_pushkin` **Read alongside** |
| Apostrophe: “Destiny’s great potentate” | ~445 | `final_route_order` |
| Pauper’s grave, “luckless knave” | ~505–507 | `final_route_people` |

`event_flood_echo` **Read alongside** pulls shorter flood fragments (engorged Nevá, basements/canals, generals saving people)—same Part One passage.

---

## Game implication

Quoted lines in collapsible **Read alongside** and in-scene `<strong>` glosses should stay **verbatim Arndt** unless you intentionally compare translations. Discussion bullets may keep “Evgeny” if you explain the spelling once (glossary).

---

## Revision ideas

- Add a second **Read alongside** on **beat_statist** or **beat_west_print** if those beats need a primary anchor.
- If you assign Russian original in class, pair one stanza with Arndt’s same moment for diction debate.
