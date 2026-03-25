# Sources Used in This Project

This document tracks the primary and secondary works used to build:
- `pushkin-gypsies-presentation.html`
- `Final/index.html` (Chaadaev + *Bronze Horseman* CYOA)
- `Final/README.md` (narrative coherence + how to use ending prompts in class)
- `SUMMARY.md` (comparative overview, including *The Bronze Horseman*)

## 1) Pushkin Project: *The Gypsies* (`Цыганы`)

### Primary text and parallel translation
1. **Pushkin, Aleksandr S.** *Цыганы* (Russian text), in collected editions (e.g., Bondi ed.).
2. **Pushkin, Aleksandr S.** *The Gipsies* (English translation by **Charles Edward Turner**), Parallel Texts at Russian Virtual Library (RVB):
   - English: https://rvb.ru/pt/pushkin/0789-en.html
   - Russian: https://rvb.ru/pt/pushkin/0789-ru.html

### Context and reference material
3. **Wikipedia**: "The Gypsies (poem)" (used for quick orientation, publication history, and broad scholarly pointers):
   - https://en.wikipedia.org/wiki/The_Gypsies_(poem)

### Scholarly works cited in discussion/context
4. **Briggs, A.D.P.** *Alexander Pushkin: A Critical Study*.
5. **Pushkin, Aleksandr; Wood, Antony; Brett, Simon.** *The Gypsies & Other Narrative Poems*.
6. **Kahn, Andrew (ed.)** *The Cambridge Companion to Pushkin* (esp. essays on long poems / historical framing).

### Related Pushkin text (summary document)
7. **Pushkin, Aleksandr S.** *The Bronze Horseman* (*Медный всадник*, 1833). Narrative poem on Peter the Great, Petersburg, the 1824 flood, and the clerk Evgeny. Used in `SUMMARY.md` for thematic comparison with *The Gypsies* and Chaadaev.

---

## 2) Chaadaev Project: Choose-Your-Own Adventure

### Primary text
1. **Chaadaev, Pyotr Yakovlevich.** *First Philosophical Letter* (1836), from the *Philosophical Letters*.
   - Core themes used: Russia's place in universal history, critique of historical discontinuity, moral-intellectual borrowing, and the question of Russia's future path.
2. **Chaadaev, Peter (Pyotr).** *Philosophical Works of Peter Chaadaev*, ed./trans. **Raymond T. McNally** and **Richard Tempest** (Dordrecht: Springer, 1991; *Sovietica* 56). eBook **ISBN 978-94-011-3166-7**, DOI [10.1007/978-94-011-3166-7](https://doi.org/10.1007/978-94-011-3166-7). Full English translation of the letters, *Apologia*, and fragments; editorial analysis and notes.
   - **Plain-text extract:** run `python Final/scripts/pdf_to_text.py` after placing the PDF in `Final/` (see `Final/scripts/README.md`). Output: `Final/978-94-011-3166-7.txt`.
   - **Alignment notes:** `Final/CHAADAEV-PRIMARY-TEXT-NOTES.md`.

### Literary mirror in the game
3. **Pushkin, Aleksandr S.** *The Bronze Horseman* (*Медный всадник*, 1833). **In-repo class text:** `Final/bronze_horseman.txt` — English translation by **Walter Arndt** (1993), as noted in that file’s header (source edition referenced there: e.g. Penguin *Portable Nineteenth-Century Russian Reader* / Ardis). Branching scenes quote or gloss this wording (Petersburg, flood, Yevgeny vs. Peter’s statue). **Alignment notes:** `Final/BRONZE-HORSEMAN-TEXT-NOTES.md`. The CYOA does **not** incorporate *The Gypsies* (separate Pushkin presentation).

### Supporting intellectual context used for branching themes
4. 19th-century debates associated with **Westernizers vs. Slavophiles** (used as conceptual framework for story branches).
5. **Aksakov, Konstantin** (1817–1860), Slavophile publicist and critic: themes of Russian **soil**, **narod**, Orthodox moral community, and suspicion of abstract Western “rights” and state-driven modernization—used in the CYOA’s **Aksakov prelude** and inventory token as an interpretive counterweight to Chaadaev’s European-facing diagnosis (not a quotation of a specific edition).
6. Historical context around censorship/publication controversy after the 1836 publication in *Teleskop*.

**Suggested secondary for teaching Aksakov / Slavophiles:** e.g. Andrzej Walicki, *The Slavophile Controversy* (or comparable intellectual-history surveys of Westernizer–Slavophile debate).

---

## Notes on Use

- The creative branching narrative in `Final/index.html` is an **interpretive educational adaptation**, not a direct translation of Chaadaev.
- Quoted passages in the Pushkin slides are drawn from the Russian text and Turner translation listed above.
- If needed, this source list can be expanded into a formal MLA/Chicago bibliography.
