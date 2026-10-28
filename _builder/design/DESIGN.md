# Study Time design system

One look for every page: the home page, flashcard decks and study guides.
Values live in `tokens.css`; this file explains how to use them. If the two disagree, fix one so they match.

**The feel:** calm, precise, quietly confident. A cool off-white page, white panels that float on soft shadows, a deep navy voice for headlines, one violet accent that says "act here," and a sky-blue diagonal that adds energy behind the top of a page. Lots of air. Text aligned left.

Preview every token and component: `_builder/design/preview.html` (serve the repo with `python -m http.server` and open `/_builder/design/preview.html`).

---

## 1. Color

Every color has a light and a dark value. Dark mode follows the system setting, and `data-theme="light"` / `data-theme="dark"` on `<html>` overrides it. Contrast ratios are WCAG 2.x, measured against `--bg`, `--surface` and `--sunken`; the number shown is the lowest of the three.

### Surfaces

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f6f8fc` | `#0a1524` | Page background. Cool off-white, never pure white. |
| `--surface` | `#ffffff` | `#122036` | Cards, panels, anything raised. |
| `--sunken` | `#eef2f8` | `#0e1a2d` | Progress tracks, input wells, table stripes. |
| `--soft` | `#eef2f8` | `#1a2a44` | Neutral fills inside cards (grade buttons, blank diagram labels). Kept for deck compatibility. |
| `--line` | `#e1e7f0` | `#22344f` | Hairlines and card borders. |
| `--line-strong` | `#c9d3e1` | `#33496a` | Borders that must be seen: inputs, option buttons. |
| `--guide` | `#d3dbe8` | `#22344f` | Dashed column guides only. |

### Text

| Token | Light | Dark | Min contrast (L / D) | Use |
|---|---|---|---|---|
| `--ink` | `#0c2340` | `#f2f6fc` | 14.1 / 15.1 | Headlines, key numbers, card prompts, diagram strokes. |
| `--text` | `#425672` | `#b6c3d6` | 6.7 / 9.2 | Body copy. Muted slate-blue, not gray. |
| `--muted` | `#5b6b82` | `#93a3ba` | 4.8 / 6.4 | Captions, meta, helper text. Smallest allowed text color. |
| `--on-accent` | `#ffffff` | `#0a1524` | 7.1 / 7.8 | Text on a violet button. |

### Brand

| Token | Light | Dark | Min contrast (L / D) | Use |
|---|---|---|---|---|
| `--accent` | `#5332e6` | `#a99cff` | 6.3 / 6.9 | The violet. Links, primary buttons, eyebrow labels, focus ring. |
| `--accent-hover` | `#4322cf` | `#c0b6ff` | 7.9 / 8.9 | Hover and pressed state of the above. |
| `--accent-tint` | `#efecfe` | `#221f4d` | (fill) | Selected rows, tags. |
| `--sky` | `#0aa5f0` | `#38bdf8` | 2.4 / 7.6 | The sky blue. **Fills, bands, illustration only. Never text in light mode.** |
| `--sky-ink` | `#0068a8` | `#5ec8ff` | 5.3 / 8.7 | Sky blue when it has to be text. |
| `--sky-tint` | `#e3f4fd` | `#0d2a40` | (fill) | Informational callouts. |
| `--band-from` / `--band-to` | `#0aa5f0` / `#5332e6` | `#0b6fae` / `#4b35c9` | (fill) | The diagonal hero band gradient. Darker in dark mode so it doesn't glare. |

Violet is the only color that means "you can click this." Sky blue is energy and decoration; it never marks an action.

### Feedback (flashcard grades)

| Token | Light | Dark | Min contrast (L / D) |
|---|---|---|---|
| `--again` | `#b42318` | `#ff8b80` | 5.9 / 7.2 |
| `--hard` | `#985a00` | `#f2bd5c` | 4.9 / 9.5 |
| `--good` | `#2152c4` | `#86b1ff` | 6.1 / 7.6 |
| `--easy` | `#0b7a5f` | `#4fd6ad` | 4.7 / 9.0 |

### Section accents

Every deck has 6 to 8 sections, each with its own accent. These are the existing deck hues, shifted cooler and deeper so they sit next to the navy and violet, and all pass AA (4.5:1) as text on `--bg`, `--surface` and `--sunken`. White text on the light values and `--surface` text on the dark values also pass, so they work as fills behind a checkmark or letter.

Assign them in this order: section 1 gets blue, section 2 violet, and so on. A deck with 6 sections stops at amber.

| # | Token | Light | Dark | Min contrast (L / D) | Replaces (old light / dark) |
|---|---|---|---|---|---|
| 1 | `--sec-blue` | `#1f5bc4` | `#86b4ff` | 5.6 / 7.8 | `#1d5fa8` / `#7fb2ec` |
| 2 | `--sec-violet` | `#7d3fc8` | `#caa7f7` | 5.5 / 8.1 | `#7a3eb1` / `#c4a1ea` |
| 3 | `--sec-teal` | `#08776b` | `#4fd2bf` | 4.8 / 8.8 | `#0e7c6b` / `#5fd0bc` |
| 4 | `--sec-rose` | `#be2b6a` | `#f892c1` | 5.0 / 7.7 | `#b0306a` / `#f08cbc` |
| 5 | `--sec-orange` | `#bd4310` | `#ffa173` | 4.7 / 8.2 | `#c2410c` / `#fb9a6c` |
| 6 | `--sec-amber` | `#946000` | `#f0bf5e` | 4.8 / 9.6 | `#9a5b06` / `#e8b45c` |
| 7 | `--sec-green` | `#3d7a17` | `#a6d86c` | 4.7 / 9.9 | `#4d7c0f` / `#a8d46a` |
| 8 | `--sec-slate` | `#4d5d76` | `#b0bdd2` | 6.0 / 8.6 | `#475569` / `#a8b6c8` |

`--sec-violet` is a redder purple than the brand `--accent` on purpose, so a section chip never reads as a link.

In `deck.py`, write the pair as hex (the builder emits `--s-<slug>`), e.g. `("RNA Structure", "#1f5bc4", "#86b4ff")`.

---

## 2. Typography

**Family:** [Inter](https://fonts.google.com/specimen/Inter) (free, Google Fonts, SIL OFL). A crisp grotesque with geometric proportions, tabular figures and excellent small-size rendering on phones. One family for everything; hierarchy comes from size, weight and tracking.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Fallback stack (`--font-sans`):** `"Inter", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`
**Mono (`--font-mono`):** `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` for formulas and worked math.

### Scale

Sizes above body are fluid (`clamp`), so the phone and desktop values below are the two ends.

| Token | Phone → desktop | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `--fs-display` | 44 → 84 px | 700 | 1.04 | −0.04em | One per page: the hero headline. |
| `--fs-h1` | 36 → 56 px | 700 | 1.15 | −0.025em | Page title when there is no hero. |
| `--fs-h2` | 26 → 36 px | 700 | 1.15 | −0.025em | Section headings. |
| `--fs-h3` | 22 px | 700 | 1.15 | −0.025em | Sub-sections, card titles. |
| `--fs-lead` | 18 → 22 px | 400 | 1.6 | −0.006em | Intro paragraph under a headline. |
| `--fs-body` | 17 px | 400 | 1.65 | −0.006em | Body copy. |
| `--fs-small` | 15 px | 400–500 | 1.55 | −0.006em | Meta, secondary buttons. |
| `--fs-caption` | 13 px | 500–600 | 1.5 | 0 | Tags, figure captions. Nothing smaller. |
| `--fs-label` | 16 px | 600 | 1.4 | −0.01em | Colored eyebrow label above a headline. |

Rules:
- Headlines are big, bold and tight. Body is relaxed: line height 1.65, measure 60 to 75 characters (`--reading-max: 680px`).
- Headlines use `text-wrap: balance`; the display headline caps at about 14 characters per line (`max-width: 14ch`).
- Headlines are `--ink`. Body is `--text`. Never set body copy in navy or headlines in slate.
- Numbers that change or line up (card counts, percentages, timers) use `.num` (tabular figures).
- Sentence case everywhere. No all-caps labels.

---

## 3. Spacing and layout

4 px base. Use the tokens; don't invent values in between.

| `--sp-1` | `--sp-2` | `--sp-3` | `--sp-4` | `--sp-5` | `--sp-6` | `--sp-7` | `--sp-8` | `--sp-9` | `--sp-10` |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 96 | 128 |

- **Gutter (`--gutter`):** 16 px on phones, 24 px from 640 px, 32 px from 1024 px. Never less than 16 px. No horizontal page scroll at 390 px, ever.
- **Grids:** `.container` (max `--content-max: 1080px`) for the home page and heroes. `.reading` (max `--reading-max: 680px`) for a flashcard, a quiz, or study-guide prose.
- **Whitespace:** a hero gets `--sp-9` above and `--sp-10` below on desktop. Sections are separated by `--sp-8` or more. Inside a card, `--sp-5`. When in doubt, add space rather than a divider line.
- **Alignment:** left-aligned text everywhere, including heroes. Center only one-word or one-number moments (an empty state, the big score on a results screen).

### Dashed column guides

Faint dashed vertical lines that divide the page into columns, like a drafting sheet. Add `.guides` to a positioned wrapper (often `<body>` or the hero). It draws 5 lines (4 columns) from 640 px up and only the two outer edges on phones. Lines are 4 px dash / 4 px gap in `--guide`.

- Use on the home page and study-guide headers. Not behind flashcards in study mode; the card should be the only thing on screen.
- Guides sit behind everything (`z-index:-1` inside an isolated stacking context). Never let them cross text in a way that reduces legibility; cards cover them.

---

## 4. Radii

| `--r-xs` 4 | `--r-sm` 6 | `--r-md` 10 | `--r-lg` 16 | `--r-xl` 24 | `--r-pill` 999 |
|---|---|---|---|---|---|

- Buttons, tags and chips: `--r-pill`.
- Cards and flashcards: `--r-lg`. Floating app-style panels: `--r-md`. Inputs and option rows: `--r-md`.
- Small inner elements (letter boxes, checkboxes): `--r-sm`.

---

## 5. Elevation (shadows)

Two layers each: a wide, soft, downward-offset ambient shadow plus a tighter one that gives the edge. Tinted with navy in light mode, never pure black; plain black at higher opacity in dark mode.

| Token | Use |
|---|---|
| `--shadow-xs` | Tiny lift: pressed states, tags on a surface. |
| `--shadow-sm` | Ghost buttons, inputs on focus. |
| `--shadow-md` | Default card (deck list rows, study-guide sections). |
| `--shadow-lg` | The flashcard in study mode, card hover. |
| `--shadow-xl` | A showcase panel floating over the hero band. |

A raised element uses a shadow **or** a border, not both. `.card.flat` (border, no shadow) is for cards nested inside another card.

---

## 6. The diagonal band

A wide band of color that cuts across the background at about −9°, low in the hero, rising to the right. It's the system's one big gesture.

```html
<header class="hero guides">
  <div class="band" aria-hidden="true"></div>
  <div class="container">…</div>
</header>
```

- Gradient from `--band-from` (sky) to `--band-to` (violet). `.band.solid` uses sky only.
- On a deck or study guide, set `--band-from` to the deck's first section accent to tie the page to its subject.
- Text never sits on the band. Floating panels and cards can overlap it; that overlap is the point.
- One band per page, always behind the top hero. Never repeat it lower down.

---

## 7. Components

All in `tokens.css`.

### Eyebrow label
`<p class="label">Genetics</p>` above a headline: violet, 16 px, weight 600, sentence case. Variants: `.label.sky` (sky ink), `.label.sec` (current section color from `--c`). One label per headline, 1 to 3 words.

### Tags
`<span class="tag">New</span>` small pill on a tinted wash. `.tag.sec` uses `--c`.

### Buttons
Pill-shaped, with a small chevron that nudges right 3 px on hover.
- `.btn` primary: violet fill. One per view.
- `.btn.dark`: navy fill. For the main action inside a card when violet would compete (e.g. "Start studying" next to a violet link).
- `.btn.ghost`: white with a small shadow. Secondary action.
- `.btn.block` full width (phones, card footers). `.btn.sm` compact. `.btn.no-chev` drops the chevron (grade buttons, toggles).
- Minimum touch target 44 px tall.

### Text link
`<a class="link">Study guide</a>`: violet, weight 600, no underline, with the same chevron. `.link.quiet` is muted for low-priority actions (Reset, Back). Links inside running prose are plain `<a>`: violet with the browser underline.

### Cards and panels
- `.card`: white, `--r-lg`, `--shadow-md`, `--sp-5` padding.
- `.card.float`: `--shadow-lg`. `.card.lift`: rises on hover (for links).
- `.card.accent`: 4 px top stripe in `--c`.
- `.panel` + `.panel-head` + `.panel-body`: app-window look with `--shadow-xl`, for showcase moments over the band.
- `.track > i`: progress bar, colored by `--c` or accent.

### Focus
Every interactive element shows `--focus-ring` (a 3 px violet halo) on `:focus-visible`. Never remove it without a replacement.

---

## 8. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150 ms | Hover color, chevron nudge, press. |
| `--dur-base` | 240 ms | Card enter (`.rise`), card lift. |
| `--dur-slow` | 420 ms | Progress bars filling. |
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` | Default for everything entering or responding. |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Things that move and settle (a card flip, if ever added). |

Motion is small and purposeful: 8 px rises, 2 to 3 px nudges, no bounces, no parallax, nothing looping. `prefers-reduced-motion` turns all of it off.

---

## 9. Do and don't

**Do**
- Keep pages mostly `--bg` and white. Color is for accents, sections and the one band.
- Use one violet primary button per view.
- Let a big, tight headline carry the hierarchy; keep everything else calm.
- Float cards on shadows instead of drawing boxes with borders.
- Check every new page at 390 px wide, in light and dark.
- Use the section accent for anything that belongs to a section: chip, stripe, highlighted diagram label, cloze gap.

**Don't**
- Don't use the sky blue as text on a light background (it fails contrast). Use `--sky-ink`.
- Don't put text on the diagonal band or on the gradient.
- Don't use pure black (`#000`) or pure white backgrounds for the page.
- Don't center paragraphs or headings (except one-number moments like a final score).
- Don't combine a shadow and a border on the same card.
- Don't use violet for anything that isn't interactive, except eyebrow labels.
- Don't add new hex values in a page. If a color is missing, add a token here and in `tokens.css`.
- Don't use all-caps, letterspaced labels, condensed fonts, or text smaller than 13 px.
- Don't borrow another company's name, logo, illustrations or fonts.

---

## 10. Flashcard decks

- **Deck home:** a short hero: eyebrow label = subject (`.label`), `--fs-h1` title, `.lead` subtitle, a band in the deck's first section color. Below, the "launch" panel is a `.card.float` overlapping the band, holding the due count (big `--ink` number, `.num`), the mode toggles and a full-width `.btn.block` "Start".
- **Section list:** each section is a row with its color as the checkbox fill and progress `.track`. Rows sit in one `.card`, separated by `--line` hairlines.
- **Study mode:** no guides, no band. Plain `--bg` and one centered-column card (`.reading` width) with `--shadow-lg`, `--r-lg`, and a 4 px top stripe in the section color. The section chip is a `.tag.sec`. The prompt is `--ink`, 22 to 24 px, weight 600, tight tracking. The answer is the section color, weight 600. Extra is `--text` at `--fs-small`.
- **Reveal and grade:** "Show answer" is a `.btn.dark.block.no-chev`. Grade buttons are `--r-md` rounded rectangles (a pill would curve the color border) on `--soft` with a 3 px bottom border in the grade color, label in `--ink`, interval in `--muted`.
- **Quiz options:** `--r-md` rows with a `--line-strong` border; correct turns `--easy`, wrong turns `--again`, each with a 12% tint wash.
- **Diagrams:** keep using `var(--ink)`, `var(--muted)`, `var(--c)`, `var(--surface)`, `var(--soft)`, `var(--line)`; those names exist in the system. SVG text switches to Inter 600.

## 11. Study guides

- **Header:** the same hero as the deck home (label, title, lead, band, guides), plus `.link` buttons for "Study the flashcards" and "Back to all decks."
- **Contents:** a `.card` with a two-column list; each item has a small square in its section color.
- **Sections:** each `<section>` is a `.card` with `.card.accent` stripe in its color, `--fs-h2` heading with the section number in the section color. Prose at `--reading-max`, `--lh-body`.
- **Terms** (`.term`) are weight 600 in the section color. **Tables** use `--line` hairlines, header row in `--muted` weight 600, no vertical rules.
- **Callout boxes** (worked example, trap) are `.card.flat`-style: a 4 px left bar in `--c` (or `--again` for traps) on a 9% tint, label in the bar color.
- **Check yourself** (`details.check`) is a `--r-md` row with a `--line-strong` border; the summary reads as a `.link` with a chevron that rotates 90° when open.
- **Print:** drop shadows, band and guides; keep section stripes.

## 12. Home page

- Hero with guides and band: eyebrow "Study Time", display headline, one-line lead, no button (the deck list is the action).
- A floating `.panel` mock of the next due deck may overlap the band on desktop; hide it below 640 px.
- Deck list: subject `h2`, then `.card.lift` rows: number in the deck's accent, topic in `--ink` weight 600, meta in `--muted`, percent `.num`, `.track` progress, `.link` "Guide" when one exists.
