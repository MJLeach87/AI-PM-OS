# Figma Design System — Recipe Tracker

**Date**: 2026-02-23
**Status**: Future (after HTML prototype validation)
**Project**: RECIPE_recipe-tracker

---

## Prerequisite

The HTML prototype (`2026-02-22_Prototype_Recipe-Tracker-MVP.html`) must be validated with real users (you + wife) first. The prototype determines the information architecture and flows — Figma refines the visual design.

**Do not start hi-fi design until IA and flows are confirmed.**

---

## Scope

### 1. Component Library

Set up a Figma component library for Recipe Tracker:

- **Colors**: Slate palette (primary), Emerald (success/confidence), Amber (warnings/ideas), Red (errors/delete)
- **Typography**: System font stack, size scale matching Tailwind defaults (xs through 3xl)
- **Spacing**: 4px base grid (Tailwind spacing scale)
- **Components**:
  - Recipe card (grid variant, list variant)
  - Bottom tab bar (5 tabs with active/inactive states)
  - Search bar with filter chips
  - Ingredient row (qty + unit + name + notes)
  - Step row (number + instruction)
  - Confidence badge (high/medium/low)
  - Cookbook card
  - Grocery item row (checkbox + name + qty + source badge)
  - Bottom sheet dialog
  - Button variants (primary, secondary, ghost, outline)
  - Input fields (text, textarea)
  - Tag chips (removable)
  - Empty state illustration

### 2. Hi-Fi Screens (15 total)

Build hi-fi versions of all 15 screens validated in the HTML prototype:

1. Landing / Sign In
2. Import Input
3. Import Parsing (skeleton)
4. Import Review
5. Import Success
6. Recipes List (grid + search + filters)
7. Recipe Detail
8. Recipe Edit
9. Cookbooks List
10. Cookbook Detail
11. New Cookbook Dialog
12. Grocery Lists
13. Grocery Detail (shopping checklist)
14. Generate Grocery List (recipe selection)
15. Account

### 3. Figma MCP Integration

Investigate Figma MCP integration for Claude Code workflow:
- Can Claude Code push design tokens or component specs to Figma via MCP?
- Can Figma designs be read back into Claude Code for implementation reference?
- Existing Figma MCP servers to evaluate

### 4. Reusability

The component library should be reusable across future PM OS product projects — not just Recipe Tracker. Design tokens and base components (buttons, inputs, cards, nav) should be generic enough to fork.

---

## References

- HTML prototype: `2026-02-22_Prototype_Recipe-Tracker-MVP.html`
- IA document: `2026-02-22_IA_Recipe-Tracker-MVP.md`
- PRD v1.0: `2026-02-22_PRD_Recipe-Tracker-MVP_v1.0.md`
- TSX prototype (component patterns): `2026-02-22_Prototype_Recipe-Tracker-MVP.tsx`
