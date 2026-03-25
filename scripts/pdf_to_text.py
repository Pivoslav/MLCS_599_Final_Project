#!/usr/bin/env python3
"""
Extract plain text from a PDF (UTF-8).

Default input: 978-94-011-3166-7.pdf (McNally & Tempest, Philosophical Works of Peter Chaadaev)
searched in this script's directory, then Final/, then repo root.

Requires: pip install pymupdf
  (or: pip install -r ../../requirements.txt from repo root)

Usage:
  python pdf_to_text.py
  python pdf_to_text.py "C:/path/to/book.pdf" -o chaadaev.txt
  python pdf_to_text.py ../978-94-011-3166-7.pdf --pages 18-25
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


DEFAULT_NAMES = (
    "978-94-011-3166-7.pdf",
    "Philosophical_Works_of_Peter_Chaadaev.pdf",
)


def find_default_pdf() -> Path | None:
    here = Path(__file__).resolve().parent
    candidates = [
        here / n for n in DEFAULT_NAMES
    ] + [
        here.parent / n for n in DEFAULT_NAMES
    ] + [
        here.parent.parent / n for n in DEFAULT_NAMES
    ]
    for p in candidates:
        if p.is_file():
            return p
    return None


def parse_page_range(spec: str | None) -> tuple[int, int] | None:
    """'18-25' -> (18, 25) inclusive, 1-based page numbers as in PDF viewers."""
    if not spec or not spec.strip():
        return None
    spec = spec.strip()
    if "-" not in spec:
        n = int(spec)
        return (n, n)
    a, b = spec.split("-", 1)
    return (int(a.strip()), int(b.strip()))


def extract_text(
    pdf_path: Path,
    page_range: tuple[int, int] | None = None,
) -> str:
    try:
        import fitz  # PyMuPDF
    except ImportError as e:
        print(
            "Missing dependency: pymupdf\n"
            "  pip install pymupdf\n"
            "  or from repo root: pip install -r requirements.txt",
            file=sys.stderr,
        )
        raise SystemExit(1) from e

    doc = fitz.open(pdf_path)
    try:
        total = len(doc)
        if page_range:
            start, end = page_range
            start = max(1, start)
            end = min(total, end)
            indices = range(start - 1, end)
        else:
            indices = range(total)

        parts: list[str] = []
        for i in indices:
            page = doc[i]
            parts.append(f"\n\n--- PDF page {i + 1} / {total} ---\n\n")
            parts.append(page.get_text(sort=True))
        return "".join(parts)
    finally:
        doc.close()


def main() -> None:
    ap = argparse.ArgumentParser(
        description="Convert PDF to UTF-8 text using PyMuPDF."
    )
    ap.add_argument(
        "pdf",
        type=Path,
        nargs="?",
        default=None,
        help="Input PDF (default: auto-find 978-94-011-3166-7.pdf near this script)",
    )
    ap.add_argument(
        "-o",
        "--output",
        type=Path,
        default=None,
        help="Output .txt (default: <pdf_stem>.txt next to the PDF)",
    )
    ap.add_argument(
        "--pages",
        metavar="START-END",
        default=None,
        help="Only these pages, 1-based inclusive (e.g. 18-101 for Letters block)",
    )
    args = ap.parse_args()

    pdf = args.pdf
    if pdf is None:
        pdf = find_default_pdf()
        if pdf is None:
            print(
                "No PDF path given and no default file found.\n"
                f"Place one of {DEFAULT_NAMES} in Final/ or the repo root, or pass the path explicitly.",
                file=sys.stderr,
            )
            raise SystemExit(2)

    pdf = pdf.resolve()
    if not pdf.is_file():
        raise SystemExit(f"PDF not found: {pdf}")

    page_range = parse_page_range(args.pages)
    text = extract_text(pdf, page_range=page_range)

    out = args.output
    if out is None:
        out = pdf.with_suffix(".txt")
    else:
        out = out.resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(text.replace("\r\n", "\n"), encoding="utf-8")

    print(f"Wrote {len(text):,} characters to {out}")


if __name__ == "__main__":
    main()
