"""
PM OS Office Export — CLI entry point.

Usage:
    python scripts/office-export/index.py --format docx --source <file> --out <dir>
    python scripts/office-export/index.py --format xlsx --source <file> --out <dir>
    python scripts/office-export/index.py --format pptx --source <file> --out <dir>

Or via npm:
    npm run export:docx -- --source execution/prds/2026-02-22_PRD_MyFeature_v1.0.md
    npm run export:xlsx -- --source execution/data_analysis/2026-02-22_Metrics_MyFeature.md
    npm run export:pptx -- --source execution/gtm/2026-02-22_ValueProp_MyFeature.md

Defaults:
    --out   execution/exports/
"""

import argparse
import sys
from pathlib import Path

# Add this directory to path so generator modules can import branding.py
sys.path.insert(0, str(Path(__file__).parent))


SUPPORTED_FORMATS = ('docx', 'xlsx', 'pptx')


def _resolve_source(source_arg: str) -> Path:
    """Resolve --source relative to the repo root (cwd) or as absolute."""
    p = Path(source_arg)
    if not p.is_absolute():
        p = Path.cwd() / p
    if not p.exists():
        print(f'ERROR: Source file not found: {p}', file=sys.stderr)
        sys.exit(1)
    return p


def _resolve_out(out_arg: str) -> Path:
    p = Path(out_arg)
    if not p.is_absolute():
        p = Path.cwd() / p
    p.mkdir(parents=True, exist_ok=True)
    return p


def main():
    parser = argparse.ArgumentParser(
        description='PM OS Office Export — convert Markdown artifacts to Office formats.'
    )
    parser.add_argument(
        '--format', required=True, choices=SUPPORTED_FORMATS,
        help='Output format: docx | xlsx | pptx'
    )
    parser.add_argument(
        '--source', required=True,
        help='Path to the source Markdown file'
    )
    parser.add_argument(
        '--out', default='execution/exports',
        help='Output directory (default: execution/exports/)'
    )
    args = parser.parse_args()

    source_path = _resolve_source(args.source)
    out_dir     = _resolve_out(args.out)

    print(f'PM OS Office Export')
    print(f'  Format : {args.format.upper()}')
    print(f'  Source : {source_path}')
    print(f'  Output : {out_dir}')
    print()

    try:
        if args.format == 'docx':
            from generate_docx import generate
        elif args.format == 'xlsx':
            from generate_xlsx import generate
        elif args.format == 'pptx':
            from generate_pptx import generate
    except ImportError as e:
        print(f'ERROR: Missing dependency — {e}', file=sys.stderr)
        print('Run:  pip install -r scripts/office-export/requirements.txt', file=sys.stderr)
        sys.exit(1)

    out_path = generate(source_path, out_dir)
    print(f'Done: {out_path}')


if __name__ == '__main__':
    main()
