# Study Time

Flashcard study apps, hosted at https://rmbeeler1.github.io/studytime/

- Home page lists every deck from `decks.json`, grouped by subject.
- Each deck is a self-contained page at `<subject>/<prefix><NN>-<topic>/`, with a study guide at `guide.html` beside it.
- Every page follows the design system in `_builder/design/` (`DESIGN.md`, `tokens.css`, `preview.html`).
- Decks are built with Claude Code. See `CLAUDE.md` for the conventions and the build workflow.
