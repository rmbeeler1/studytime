# Study Time: instructions for Claude Code

This repo is a public GitHub Pages site (https://rmbeeler1.github.io/studytime/) of flashcard study apps.
Each deck is one self-contained `index.html`. The home page (`index.html`) reads `decks.json`.
Folders starting with `_` are not published by GitHub Pages.

## Layout
- `_inbox/`: drop source material here (slides, review sheets), one folder per subject, then per chapter or unit (e.g. `_inbox/genetics/ch14/`). Gitignored. Never commit it.
- `_builder/deck_template.html`: the study app. Edit only to change app behavior for all future decks.
- `_builder/make_deck.py`: builds one deck and updates `decks.json`.
- `_builder/decks/<deck-id>/deck.py`: the deck's content (META, SECTIONS, BASIC, CLOZE, DIAGRAM_QUIZ).
- `_builder/decks/<deck-id>/diagrams.js`: the deck's SVG diagrams (a JS object of functions).
- `_builder/decks/<deck-id>/guide.html`: the deck's study guide content (body only). Built into `<deck path>/guide.html`.
- `_builder/guide_template.html` and `_builder/make_guide.py`: the study guide page and its builder.
- `aviation/u04-aerodynamics/`: built before the builder existed. Its cards have no source in `_builder`; edit its `index.html` directly. Its study guide does have source: `_builder/decks/aviation-u04-aerodynamics/guide.html`, built with `python _builder/make_guide.py aviation-u04-aerodynamics`.

## Naming convention
- Folder: `<subject>/<prefix><NN>-<topic>/` with prefix `u` unit, `ch` chapter, `wk` week, `ex` exam; NN always two digits.
- Deck id: same parts joined by hyphens, e.g. `genetics-ch14-rna-processing`. Folder under `_builder/decks/` uses the deck id.
- Title is generated as `<Subject> <Number>: <Topic>`, e.g. "Genetics Ch 14: RNA Processing".
- Never rename or move a published deck folder, and never change a published deck's id. That breaks links and erases progress.
- No student names or personal details anywhere in the repo.

## Building a new deck (the usual request)
1. Read every file the user points to in `_inbox/`. For PDFs, extract text and look at the slide images; handwritten notes on slides count as content.
2. Copy `_builder/decks/genetics-ch13-transcription/` as the starting pattern. Write `deck.py` and `diagrams.js` for the new deck.
3. Content rules:
   - Every fact comes from the source material. Do not add facts. If a card answers a question the slides pose but do not answer, say so in Extra.
   - One fact per card, gradable in under ten seconds. Front max 15 words, back max 10 words; explanation goes in Extra.
   - Never a bare-term front, never two facts joined by "and" on the back unless they are one concept.
   - Lists and sequences become one CLOZE with c1..cN (each card hides one item, shows the rest).
   - Number problems and worked examples from the slides become cards with the full working in Extra.
   - Concept Check questions from the slides become cards.
   - 6 to 8 SECTIONS, each with its own accent color pair (light, dark). Reuse the palette in the existing deck.
   - No em-dashes anywhere. Use the real prime (′) for 5′ and 3′, real minus (−) for negative positions.
4. Diagrams: draw clean SVG line art in `diagrams.js` for anything visual (structures, processes, labeled figures). Never copy textbook images.
   Assign a diagram to a card with its `viz` field (`"name"` or `"name:highlight"`); it shows on the answer side.
   Labeled figures the student must recognize go in DIAGRAM_QUIZ and must draw their labels with `label(x,y,text,o)`.
   Helpers available: `svgWrap`, `label`, `ln`, `arr`, and colors `INK`, `ACC`, `MUT`. Use `var(--c)` for the section accent.
5. Write the study guide in `_builder/decks/<deck-id>/guide.html`, using `genetics-ch13-transcription/guide.html` as the pattern:
   - One `<section data-sec="<Section name>"><h2>...</h2>...</section>` per SECTION, same names, same order.
   - Same content rule as the cards: every fact comes from the source material. Organize it; don't add to it.
   - Building blocks: `<span class="term">`, tables wrapped in `<div class="tablewrap">`, `<div class="box"><span class="lbl">Worked example</span>...</div>` (`box warn` for traps), `<details class="check"><summary>Question</summary><div class="a">Answer</div></details>` for Concept Checks, and `<figure><div data-viz="name"></div></figure>` to reuse a deck diagram. One diagram per figure; side-by-side diagrams are unreadable on a phone.
6. Build: `python _builder/make_deck.py <deck-id>`. It builds the deck, then the guide, and stamps version tags in `decks.json` (the hub uses them so phones never show a stale copy). Fix every problem it reports, then rebuild.
7. Check it: serve with `python -m http.server` and open the deck and its guide at phone width (390 px). Confirm no labels overlap or run off the edge, and no horizontal scroll.
8. Show the user the card count per section and anything you were unsure about. Then commit and push (below) once they say go.

## Updating an existing deck
Edit its `deck.py`, `diagrams.js` or `guide.html` and rebuild. Keep card order stable where possible: card ids come from position, so inserting cards in the middle of BASIC resets progress on the cards after it. Append new cards at the end of a list instead.

## Commit and push
- Stage only the deck folder (including `guide.html`), its `_builder/decks/<deck-id>/` folder and `decks.json` (plus any template change the user asked for).
- Commit message: `Add <Title>` for new decks, `Update <Title>: <what changed>` for edits.
- Push to `main`. GitHub Pages updates in about a minute; give the user the deck link: `https://rmbeeler1.github.io/studytime/<path>`.
- Never commit anything in `_inbox/`.
