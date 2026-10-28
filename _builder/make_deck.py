"""Build one deck: python _builder/make_deck.py <deck-id>
Reads _builder/decks/<deck-id>/deck.py and diagrams.js, writes <path>/index.html, upserts decks.json."""
import json, re, sys, importlib.util, datetime, pathlib
import make_guide
ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / "_builder"

def load(deck_id):
    spec = importlib.util.spec_from_file_location("deck", B / "decks" / deck_id / "deck.py")
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

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
    cards, problems = cards_from(m)
    slug = lambda s: s.lower().replace(" ", "-")
    L = "".join(f"--s-{slug(n)}:{l}; " for n, l, d in m.SECTIONS)
    D = "".join(f"--s-{slug(n)}:{d}; " for n, l, d in m.SECTIONS)
    diagrams = (B / "decks" / deck_id / "diagrams.js")
    title = f"{meta['subject']} {meta['number']}: {meta['topic']}"
    html = (B / "deck_template.html").read_text()
    html = (html.replace("__SECVARS_L__", L).replace("__SECVARS_D__", D).replace("__SECS__", json.dumps(m.SECTIONS and [x[0] for x in m.SECTIONS]))
            .replace("__ID__", deck_id)
            .replace("__GUIDELINK__", '<a class="hub" href="guide.html">Study guide</a>' if (B / "decks" / deck_id / "guide.html").exists() else "").replace("__TITLE__", title).replace("__SUB__", meta.get("subtitle", ""))
            .replace("__DIAGRAMS__", diagrams.read_text() if diagrams.exists() else "{}")
            .replace("__DATA__", json.dumps(dict(cards=cards, paths=getattr(m, "PATHS", {})))))
    if "\u2014" in html: problems.append("em-dash found")
    if problems:
        print("FIX BEFORE PUBLISHING:"); [print(" -", p) for p in problems]; sys.exit(1)
    out = ROOT / meta["path"] / "index.html"; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(html)
    dj = ROOT / "decks.json"; decks = json.loads(dj.read_text()) if dj.exists() else []
    entry = {k: meta[k] for k in ("id", "subject", "number", "topic", "path")}
    entry["cards"] = len(cards)
    old = next((d for d in decks if d["id"] == deck_id), None)
    entry["added"] = old["added"] if old else datetime.date.today().isoformat()
    decks = [d for d in decks if d["id"] != deck_id] + [entry]
    dj.write_text(json.dumps(decks, indent=2) + "\n")
    print(f"Built {title}: {len(cards)} cards -> {out.relative_to(ROOT)}")
    # The guide takes colors and diagrams from the deck page, so it is rebuilt after it.
    if (B / "decks" / deck_id / "guide.html").exists(): make_guide.main(deck_id)
    else: make_guide.stamp(deck_id)

if __name__ == "__main__":
    if len(sys.argv) != 2: sys.exit("usage: python _builder/make_deck.py <deck-id>")
    main(sys.argv[1])
