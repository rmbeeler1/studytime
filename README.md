# Study Time

Flashcard decks hosted on GitHub Pages at https://rmbeeler1.github.io/studytime/

Each deck is one self-contained `index.html` in its own folder. The home page reads `decks.json` and lists every deck, grouped by subject.

## Naming convention

Folder path: `<subject>/<prefix><NN>-<topic>/index.html`

| Part | Rule | Examples |
|---|---|---|
| subject | Short, lowercase, one word or hyphenated | `aviation`, `ochem`, `us-history`, `spanish` |
| prefix | How the class numbers it: `u` unit, `ch` chapter, `wk` week, `ex` exam | `u`, `ch` |
| NN | Always two digits so folders sort correctly | `04`, `11` |
| topic | Short, lowercase, hyphens for spaces | `aerodynamics`, `alkanes`, `civil-war` |

Examples:
- `aviation/u04-aerodynamics/`
- `ochem/ch04-alkanes/`
- `ochem/ex01-midterm-review/`

**Deck ID** = subject + prefix/number + topic joined by hyphens: `aviation-u04-aerodynamics`.
The deck ID is used in two places and must match exactly:
1. `decks.json` (`id` field)
2. The progress key inside the deck's `index.html`: `const KEY = "studytime:<deck-id>";`

All decks share one website, so a unique key per deck keeps each deck's progress separate.

**Display title** = `<Subject> <Unit/Chapter N>: <Topic>`, e.g. "Aviation Unit 4: Aerodynamics".

## Rules
- Never rename or move a folder after it has been shared. It breaks the link and resets progress.
- To update a deck, replace its `index.html` in place. Progress survives as long as the KEY and card IDs stay the same.
- No student names or personal details in this repo. It is public.

## Adding a deck
1. Create the folder using the convention and upload the deck's `index.html` into it.
2. Add an entry to `decks.json`:
```json
{ "id": "ochem-ch04-alkanes", "subject": "Organic Chemistry", "number": "Ch 4",
  "topic": "Alkanes", "path": "ochem/ch04-alkanes/", "cards": 110, "added": "2026-11-02" }
```
3. Commit. The site updates in about a minute.
