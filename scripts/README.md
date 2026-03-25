# Scripts

## `pdf_to_text.py`

Extracts searchable text from a PDF (e.g. Springer **978-94-011-3166-7**, *Philosophical Works of Peter Chaadaev*).

### Setup

From the repo root (`MLCS_599`):

```bash
pip install -r requirements.txt
```

### Run

1. Copy your PDF into **`Final/`** or the **repo root**, named e.g. `978-94-011-3166-7.pdf`.
2. From `Final/scripts/`:

```bash
python pdf_to_text.py
```

Or with explicit paths:

```bash
python pdf_to_text.py "C:/path/to/978-94-011-3166-7.pdf" -o ../chaadaev-springer-1991.txt
```

Extract only the *Philosophical Letters* block (Springer TOC ~pages 18–101; adjust if your PDF pagination differs):

```bash
python pdf_to_text.py ../978-94-011-3166-7.pdf -o ../chaadaev-letters-extract.txt --pages 18-101
```

Output is UTF-8 with `--- PDF page N ---` markers for citation checks.

### Notes

- Scanned PDFs without a text layer produce little or no text; use OCR tools separately if needed.
- Page numbers in the script are **PDF viewer pages** (1-based), not necessarily the book’s printed page numbers.
