# PM OS Branding Reference

**Version**: 1.0 | **Created**: 2026-02-22 | **Status**: Authoritative

This is the canonical visual specification for PM OS. It governs Office export scripts,
React prototypes, Confluence page styling, and any future web UI work.

**Coupling note**: `scripts/office-export/branding.js` is the programmatic mirror of this
document. Changes to any value here **must** be reflected there, and vice versa.

---

## Color Palette

Colors derived from `pm-os-reference/artifacts/prototypes/2026-02-01_Prototype_Artifact-Search-Filter.tsx`.

### Base Tokens

| Token | Role | Hex | Tailwind |
|-------|------|-----|----------|
| `primary` | Actions, CTAs, links | `#2563EB` | `blue-600` |
| `primary-hover` | Hover state | `#1D4ED8` | `blue-700` |
| `primary-light` | Focus rings | `#3B82F6` | `blue-500` |
| `text-primary` | Headings, body | `#111827` | `gray-900` |
| `text-secondary` | Subtitles, meta | `#374151` | `gray-700` |
| `text-muted` | Captions, placeholders | `#6B7280` | `gray-500` |
| `surface` | Card backgrounds | `#FFFFFF` | `white` |
| `surface-alt` | Page/slide background | `#F9FAFB` | `gray-50` |
| `border` | Default borders | `#E5E7EB` | `gray-200` |

### Semantic Accent Colors (Artifact Type + Status)

All bg/text pairs meet WCAG 2.1 AA contrast (≥4.5:1). Validated in prototype header (lines 113–117).

| Token | Background | Text | Use |
|-------|-----------|------|-----|
| `accent-ost` | `#DBEAFE` | `#1E40AF` | OST badge |
| `accent-prd` | `#DCFCE7` | `#166534` | PRD badge / Active status |
| `accent-tech` | `#F3E8FF` | `#6B21A8` | Tech spec badge |
| `accent-proto` | `#FFEDD5` | `#9A3412` | Prototype badge |
| `accent-gtm` | `#FCE7F3` | `#9D174D` | GTM badge |
| `accent-draft` | `#FEF9C3` | `#713F12` | Draft status |
| `accent-superseded` | `#F3F4F6` | `#4B5563` | Archived/superseded status |

---

## Typography

Web stack: `ui-sans-serif, system-ui` → Office fallback: **Calibri** (ships with Office/Windows).
Mono stack: `ui-monospace, Menlo` → Office fallback: **Consolas**.

| Level | pt | Weight | Color | Office Style | Font |
|-------|----|--------|-------|--------------|------|
| H1 | 24 | Bold (700) | `#111827` | Heading 1 | Calibri |
| H2 | 16 | SemiBold (600) | `#111827` | Heading 2 | Calibri |
| H3 | 13 | SemiBold (600) | `#111827` | Heading 3 | Calibri |
| Body | 11 | Regular (400) | `#374151` | Normal | Calibri |
| Caption | 9 | Regular (400) | `#4B5563` | Caption | Calibri |
| Code | 9 | Regular (400) | `#111827` | Code | Consolas |

---

## Office Format Mapping

Machine-readable specification for `scripts/office-export/` generators.

### DOCX

| Element | Spec |
|---------|------|
| Table header fill | `primary` (`#2563EB`) |
| Table header font | White, Bold |
| Table row (even) | `surface` (`#FFFFFF`) |
| Table row (odd) | `surface-alt` (`#F9FAFB`) |
| Code block font | Consolas 9pt |
| Code block shading | `surface-alt` (`#F9FAFB`) paragraph fill |
| Page margins | 1 inch all sides |
| Mermaid/diagram blocks | Bordered placeholder box with caption |

### XLSX

| Element | Spec |
|---------|------|
| Header row fill | `primary` (`#2563EB`) |
| Header row font | White, Bold, 11pt Calibri |
| Data row (even) | `surface` (`#FFFFFF`) |
| Data row (odd) | `surface-alt` (`#F9FAFB`) |
| Status cells | Semantic accent bg/text pair (see table above) |
| Freeze | Top row + first column |
| Row height | Auto |

### PPTX

| Element | Spec |
|---------|------|
| Slide background | `surface-alt` (`#F9FAFB`) |
| Title bar fill | `primary` (`#2563EB`), 1-inch height |
| Title bar font | White, Bold |
| Content text color | `text-secondary` (`#374151`) |
| Slide dividers/accents | `primary` (`#2563EB`) |
| Each H2 in source Markdown | New slide |

---

## Usage

- **Office export**: `npm run export:docx|xlsx|pptx -- --source [file] --out [dir]`
- **Programmatic constants**: `scripts/office-export/branding.js`
- **React prototypes**: Use Tailwind equivalents from the Base Tokens table
- **Confluence pages**: Use hex values directly in inline styles where needed

---

**Maintained By**: PM OS Orchestrator | **Source of truth for**: `scripts/office-export/branding.js`
