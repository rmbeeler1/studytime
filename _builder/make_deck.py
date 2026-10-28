"""Build one deck: python _builder/make_deck.py <deck-id>
Reads _builder/decks/<deck-id>/deck.py (or deck.json, for decks stored as ready-made cards) and diagrams.js,
inlines _builder/design/tokens.css, writes <path>/index.html, upserts decks.json, then builds the study guide."""
import json, re, sys, importlib.util, datetime, pathlib
import make_guide, make_home
ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / "_builder"

TOKENS = B / "design" / "tokens.css"
HEX = re.compile(r"(?<![&\w])#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b")

def load(deck_id):
    folder = B / "decks" / deck_id
    if not (folder / "deck.py").exists() and (folder / "deck.json").exists():
        # Ready-made cards (aviation u04 predates deck.py). Card ids are kept as stored.
        return type("Deck", (), json.loads((folder / "deck.json").read_text()))
    spec = importlib.util.spec_from_file_location("deck", folder / "deck.py")
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

def section_tokens():
    """Map each (light, dark) section pair in tokens.css to its token name, e.g. ('#1f5bc4', '#86b4ff') -> 'sec-blue'."""
    css = TOKENS.read_text(); dark_at = css.index("tokens: dark")
    light = dict((v.lower(), k) for k, v in re.findall(r"--(sec-[a-z]+):(#[0-9a-fA-F]{6})", css[:dark_at]))
    dark = dict((k, v.lower()) for k, v in re.findall(r"--(sec-[a-z]+):(#[0-9a-fA-F]{6})", css[dark_at:]))
    return {(l, dark[k]): k for l, k in light.items()}

def cards_from(m):
    cards, problems = [], []
    pat = r"\{\{c(\d+)::(.*?)(::(.*?))?\}\}"
    for i, (f, b, e, s, v) in enumerate(m.BASIC):
        if len(re.sub(r"<[^>]+>", "", f).split()) > 15: problems.append("front over 15 words: " + f)
        if len(re.sub(r"<[^>]+>", "", b).split()) > 10: problems.append("back over 10 words: " + b)
        cards.append(dict(id=f"b{i}", sec=s, kind="basic", front=f, back=b, extra=e, added=False, viz=v, vf=False))
    for j, (t, e, s, v) in enumerate(m.CLOZE):
        nums = sorted(set(int(n) for n in re.findall(r"\{\{c(\d+)::", t)))
        if not nums: problems.append("cloze with no gaps: " + t)
        if t.count("{{") != t.count("}}"): problems.append("unbalanced braces: " + t)
        for n in nums:
            def rep(mm, rev):
                k, ans, hint = int(mm.group(1)), mm.group(2), mm.group(4)
                if k != n: return ans
                return f'<span class="cz">{ans}</span>' if rev else f'<span class="cz gap">{hint or "?"}</span>'
            fr = re.sub(pat, lambda mm: rep(mm, False), t); bk = re.sub(pat, lambda mm: rep(mm, True), t)
            if "<br>" in t: fr, bk = f'<div class="list">{fr}</div>', f'<div class="list">{bk}</div>'
            cards.append(dict(id=f"c{j}_{n}", sec=s, kind="cloze", front=fr, back=bk, extra=e, added=False, viz=v, vf=False))
    for d, (s, labels, prompt) in getattr(m, "DIAGRAM_QUIZ", {}).items():
        for lb in labels:
            cards.append(dict(id=f"d_{d}_{re.sub(r'[^A-Za-z0-9]', '_', lb)}", sec=s, kind="diagram", front=prompt,
                              back=lb, extra="", added=False, viz=f"{d}:{lb}", quiz=lb, vf=True))
    secs = [x[0] for x in m.SECTIONS]
    for c in cards:
        if c["sec"] not in secs: problems.append(f"unknown section {c['sec']!r} on {c['id']}")
    ids = [c["id"] for c in cards]
    if len(ids) != len(set(ids)): problems.append("duplicate card ids")
    fronts = [c["front"] for c in cards if c["kind"] == "basic"]
    dups = {f for f in fronts if fronts.count(f) > 1}
    if dups: problems.append("duplicate fronts: " + "; ".join(dups))
    return cards, problems

def main(deck_id):
    m = load(deck_id); meta = m.META
    assert meta["id"] == deck_id, "META id must match folder name"
    cards, problems = (m.CARDS, []) if hasattr(m, "CARDS") else cards_from(m)
    slug = lambda s: s.lower().replace(" ", "-")
    # Section colors must be design-system section tokens; the page references the token, never the hex.
    toks, names = section_tokens(), []
    for n, l, d in m.SECTIONS:
        t = toks.get((l.lower(), d.lower()))
        if not t: problems.append(f"section {n!r} color {l}/{d} is not a section token pair in tokens.css")
        names.append(t or "sec-slate")
    order = list(toks.values())  # tokens.css lists them in DESIGN.md order
    if names != order[:len(names)]: problems.append("sections must use the section tokens in order: " + ", ".join(order[:len(names)]))
    secvars = "".join(f"--s-{slug(n)}:var(--{t}); " for (n, _, _), t in zip(m.SECTIONS, names))
    diagrams = (B / "decks" / deck_id / "diagrams.js")
    title = f"{meta['subject']} {meta['number']}: {meta['topic']}"
    html = (B / "deck_template.html").read_text()
    tokens = TOKENS.read_text()
    html = (html.replace("__SECVARS__", secvars).replace("__DECK_C__", f"var(--{names[0]})").replace("__SECS__", json.dumps([x[0] for x in m.SECTIONS]))
            .replace("__ID__", deck_id).replace("__SUBJECT__", meta["subject"]).replace("__HEADING__", f"{meta['number']}: {meta['topic']}")
            .replace("__GUIDELINK__", '<a class="link" href="guide.html">Study guide</a>' if (B / "decks" / deck_id / "guide.html").exists() else "")
            .replace("__TITLE__", title).replace("__SUB__", meta.get("subtitle", ""))
            .replace("__DIAGRAMS__", diagrams.read_text() if diagrams.exists() else "{}")
            .replace("__DATA__", json.dumps(dict(cards=cards, paths=getattr(m, "PATHS", {})))))
    stray = HEX.findall(html.replace("__TOKENS_CSS__", ""))
    if stray: problems.append("raw hex colors outside tokens.css (use a token): " + ", ".join(sorted(set(stray))))
    html = html.replace("__TOKENS_CSS__", tokens)
    if "\u2014" in html: problems.append("em-dash found")
    if problems:
        print("FIX BEFORE PUBLISHING:"); [print(" -", p) for p in problems]; sys.exit(1)
    out = ROOT / meta["path"] / "index.html"; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(html)
    dj = ROOT / "decks.json"; decks = json.loads(dj.read_text()) if dj.exists() else []
    entry = {k: meta[k] for k in ("id", "subject", "number", "topic", "path")}
    entry["cards"] = len(cards); entry["accent"] = names[0]
    old = next((d for d in decks if d["id"] == deck_id), None)
    entry["added"] = old["added"] if old else datetime.date.today().isoformat()
    decks = [d for d in decks if d["id"] != deck_id] + [entry]
    dj.write_text(json.dumps(decks, indent=2) + "\n")
    print(f"Built {title}: {len(cards)} cards -> {out.relative_to(ROOT)}")
    # The guide takes colors and diagrams from the deck page, so it is rebuilt after it.
    if (B / "decks" / deck_id / "guide.html").exists(): make_guide.main(deck_id)
    else: make_guide.stamp(deck_id)
    make_home.main()

if __name__ == "__main__":
    if len(sys.argv) != 2: sys.exit("usage: python _builder/make_deck.py <deck-id>")
    main(sys.argv[1])
