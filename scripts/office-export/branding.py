"""
PM OS Branding Constants
Programmatic mirror of pm-os-reference/identity/BRANDING.md.
Changes to that document MUST be reflected here, and vice versa.

Used by: generate_docx.py, generate_xlsx.py, generate_pptx.py
"""

from dataclasses import dataclass, field
from typing import Optional


@dataclass(frozen=True)
class AccentPair:
    bg: str
    text: str


@dataclass(frozen=True)
class Accents:
    ost:        AccentPair = field(default_factory=lambda: AccentPair('#DBEAFE', '#1E40AF'))
    prd:        AccentPair = field(default_factory=lambda: AccentPair('#DCFCE7', '#166534'))
    tech_spec:  AccentPair = field(default_factory=lambda: AccentPair('#F3E8FF', '#6B21A8'))
    prototype:  AccentPair = field(default_factory=lambda: AccentPair('#FFEDD5', '#9A3412'))
    gtm:        AccentPair = field(default_factory=lambda: AccentPair('#FCE7F3', '#9D174D'))
    draft:      AccentPair = field(default_factory=lambda: AccentPair('#FEF9C3', '#713F12'))
    superseded: AccentPair = field(default_factory=lambda: AccentPair('#F3F4F6', '#4B5563'))


# ---------------------------------------------------------------------------
# Base color tokens
# ---------------------------------------------------------------------------
PRIMARY        = '#2563EB'
PRIMARY_HOVER  = '#1D4ED8'
PRIMARY_LIGHT  = '#3B82F6'
TEXT_PRIMARY   = '#111827'
TEXT_SECONDARY = '#374151'
TEXT_MUTED     = '#6B7280'
SURFACE        = '#FFFFFF'
SURFACE_ALT    = '#F9FAFB'
BORDER         = '#E5E7EB'

ACCENTS = Accents()

# ---------------------------------------------------------------------------
# Typography
# ---------------------------------------------------------------------------
FONT_PRIMARY = 'Calibri'
FONT_MONO    = 'Consolas'

FONT_SIZE_H1      = 24
FONT_SIZE_H2      = 16
FONT_SIZE_H3      = 13
FONT_SIZE_BODY    = 11
FONT_SIZE_CAPTION =  9
FONT_SIZE_MONO    =  9

# ---------------------------------------------------------------------------
# Spacing
# ---------------------------------------------------------------------------
PAGE_MARGIN_IN         = 1.0   # inches — DOCX page margins
HEADING_SPACE_AFTER_PT = 18    # points of space after heading paragraphs


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    """Convert '#RRGGBB' or 'RRGGBB' to (r, g, b)."""
    clean = hex_color.lstrip('#')
    return (int(clean[0:2], 16), int(clean[2:4], 16), int(clean[4:6], 16))


def hex_to_pt_color(hex_color: str):
    """
    Return a python-pptx RGBColor from a hex string.
    Import deferred so this module is importable without pptx installed.
    """
    from pptx.util import Pt  # noqa: F401 — validate pptx is present
    from pptx.dml.color import RGBColor
    r, g, b = hex_to_rgb(hex_color)
    return RGBColor(r, g, b)


def hex_to_openpyxl_color(hex_color: str) -> str:
    """Return 'FFRRGGBB' ARGB string expected by openpyxl fills."""
    return 'FF' + hex_color.lstrip('#').upper()
