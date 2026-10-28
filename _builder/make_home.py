"""Build the home page: python _builder/make_home.py
Inlines _builder/design/tokens.css into _builder/home_template.html and writes index.html. make_deck.py runs this."""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
B = ROOT / "_builder"
HEX = re.compile(r"(?<![&\w])#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b")

def main():
    html = (B / "home_template.html").read_text()
    stray = HEX.findall(html)
    if stray: sys.exit("FIX BEFORE PUBLISHING:\n - raw hex colors outside tokens.css: " + ", ".join(sorted(set(stray))))
    (ROOT / "index.html").write_text(html.replace("__TOKENS_CSS__", (B / "design" / "tokens.css").read_text()))
    print("Built home page -> index.html")

if __name__ == "__main__":
    main()
