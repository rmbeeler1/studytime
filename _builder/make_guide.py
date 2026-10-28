"""Build one study guide: python _builder/make_guide.py <deck-id>
Reads _builder/decks/<deck-id>/guide.html (the guide's body), inlines _builder/design/tokens.css, and takes
section colors and diagrams from the already-built deck page. make_deck.py runs this automatically.
Writes <path>/guide.html and stamps decks.json with version tags for cache busting."""
import json, re, sys, hashlib, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / "_builder"
HEX = re.compile(r"(?<![&\w])#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b")

def decks():
    return json.loads((ROOT / "decks.json").read_text())

def stamp(deck_id):
    """Record content hashes in decks.json so hub links change whenever a page changes."""
    ds = decks(); d = next(x for x in ds if x["id"] == deck_id)
    h = lambda p: hashlib.sha1(p.read_bytes()).hexdigest()[:8]
    d["v"] = h(ROOT / d["path"] / "index.html")
    g = ROOT / d["path"] / "guide.html"
    if g.exists(): d["guide"] = "guide.html"; d["gv"] = h(g)
    (ROOT / "decks.json").write_text(json.dumps(ds, indent=2, ensure_ascii=False) + "\n")

def main(deck_id):
    d = next((x for x in decks() if x["id"] == deck_id), None)
    if not d: sys.exit(f"{deck_id} is not in decks.json; build the deck first")
    src = B / "decks" / deck_id / "guide.html"
    if not src.exists(): sys.exit(f"no guide source at {src.relative_to(ROOT)}")
    deck = (ROOT / d["path"] / "index.html").read_text()
    body = src.read_text()
    # Section colors and diagrams come from the built deck page, so the guide always matches it.
    secvars = re.search(r":root\{ --s-.*?--deck-c:[^;]+; \}", deck).group(0)
    code = deck[deck.index("/* ---------- diagrams ---------- */"):deck.index("/* ---------- scheduling ---------- */")]
    paths = json.loads(re.search(r"const DATA = (.*?);\nconst CARDS", deck, re.S).group(1)).get("paths", {})
    secs = json.loads(re.search(r"const SECS = (\[.*?\]);", deck).group(1))
    m = re.search(r'<p class="lead">(.*?)</p>', deck); sub = m.group(1) if m else ""
    problems = []
    used = re.findall(r'data-sec="([^"]+)"', body)
    problems += [f"unknown section {s!r}" for s in used if s not in secs]
    problems += [f"section {s!r} has no guide section" for s in secs if s not in used]
    if used != [s for s in secs if s in used]: problems.append("guide sections must follow the deck's section order")
    for v in re.findall(r'data-viz="([^"]+)"', body):
        k = v.split(":")[0]
        if not re.search(r"(^|[\s{,])" + re.escape(k) + r"\s*[:(]", code, re.M): problems.append(f"unknown diagram {v!r}")
    title = f"{d['subject']} {d['number']}: {d['topic']}"
    html = (B / "guide_template.html").read_text()
    html = (html.replace("__SECVARS__", secvars).replace("__TITLE__", title).replace("__SUB__", sub)
            .replace("__SUBJECT__", d["subject"]).replace("__HEADING__", f"{d['number']}: {d['topic']}")
            .replace("__PATHS__", json.dumps(paths)).replace("__DIAGRAM_CODE__", code).replace("__BODY__", body))
    stray = HEX.findall(html)
    if stray: problems.append("raw hex colors outside tokens.css (use a token): " + ", ".join(sorted(set(stray))))
    html = html.replace("__TOKENS_CSS__", (B / "design" / "tokens.css").read_text())
    if "—" in html: problems.append("em-dash found")
    if problems:
        print("FIX BEFORE PUBLISHING:"); [print(" -", p) for p in problems]; sys.exit(1)
    out = ROOT / d["path"] / "guide.html"; out.write_text(html)
    stamp(deck_id)
    print(f"Built study guide for {title}: {len(used)} sections -> {out.relative_to(ROOT)}")

if __name__ == "__main__":
    if len(sys.argv) != 2: sys.exit("usage: python _builder/make_guide.py <deck-id>")
    main(sys.argv[1])
