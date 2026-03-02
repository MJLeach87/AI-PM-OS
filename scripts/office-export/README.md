# PM OS Office Export

Convert PM OS Markdown artifacts to branded Office documents.

## Prerequisites

Python 3.11+ required.

```bash
pip install -r scripts/office-export/requirements.txt
```

Libraries used (all MIT/BSD licensed, no system dependencies):
- `python-docx` — DOCX generation
- `openpyxl` — XLSX generation
- `python-pptx` — PPTX generation

## Usage

Via npm scripts (recommended):

```bash
npm run export:docx -- --source execution/prds/2026-02-22_PRD_MyFeature_v1.0.md
npm run export:xlsx -- --source execution/data_analysis/2026-02-22_Metrics_MyFeature.md
npm run export:pptx -- --source execution/gtm/2026-02-22_ValueProp_MyFeature.md
```

Direct Python:

```bash
python scripts/office-export/index.py --format docx --source <file> --out <dir>
python scripts/office-export/index.py --format xlsx --source <file> --out <dir>
python scripts/office-export/index.py --format pptx --source <file> --out <dir>
```

Output lands in `execution/exports/` by default (override with `--out`).
Binary files are gitignored — only the source Markdown is committed.

## Branding

All visual constants are defined in two coupled locations:

| File | Purpose |
|------|---------|
| `pm-os-reference/identity/BRANDING.md` | Human-readable spec (source of truth) |
| `scripts/office-export/branding.py` | Programmatic constants (mirror) |

**If you change a colour or font in BRANDING.md, update branding.py too — and vice versa.**

## Format Behaviour

| Format | Generator | Source Artifact | Key Logic |
|--------|-----------|-----------------|-----------|
| DOCX | `generate_docx.py` | Any PRD/discovery Markdown | Line-level MD parser → python-docx paragraphs + styled tables |
| XLSX | `generate_xlsx.py` | Data analysis / metrics files | H2 sections → named sheets; known PM OS section names auto-mapped |
| PPTX | `generate_pptx.py` | GTM / value prop Markdown | H1 → title slide, H2 → new slide, body → content box |

## Extending

To add a new format:
1. Create `generate_<format>.py` with a `generate(source_path, out_dir) -> Path` function
2. Import it in `index.py` under a new `elif args.format == '<format>'` branch
3. Add `--format <format>` to the `choices` list in `index.py`
4. Add an npm script to `package.json`
