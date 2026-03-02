# Value Proposition: Recipe Tracker MVP

**Date**: 2026-02-22
**Project**: RECIPE_recipe-tracker
**Version**: 1.0
**Source PRD**: `execution/RECIPE_recipe-tracker/2026-02-22_PRD_Recipe-Tracker-MVP_v0.1.md`
**Source Insights**: `execution/RECIPE_recipe-tracker/2026-02-22_Insights_Recipe-Discovery-and-Management.md`

---

## Problem / Solution / Benefit

### Problem

Home cooks collect recipes from everywhere — cookbooks, Instagram, food blogs, family texts, brief meal ideas scribbled on napkins — but have no single place to organize, search, or shop from them. They resort to screenshots, bookmarks, notes apps, and handwritten lists. These workarounds are fragmented, unsearchable, and impossible to generate a grocery list from.

Existing recipe apps (Paprika, Whisk, Samsung Food) only solve part of this: they scrape structured data from recipe websites. They fail on Instagram captions, cannot handle cookbook recipes typed from a physical book, and ignore brief meal ideas like "butternut squash gnocchi" that lack full ingredient lists.

**Evidence**: Real user data shows 290+ meals collected from 8+ cookbook sources alongside Instagram discoveries, organized in a flat markdown file by protein category — a clear signal that no existing tool meets the need.

### Solution

A universal recipe organizer powered by AI (Claude API) that parses **any text** into structured recipe data — from detailed Instagram captions to cookbook recipes with page numbers to one-line meal ideas. Paste text, AI extracts what it can, user reviews and saves. Organize into cookbooks, search by ingredient, auto-generate grocery lists.

### Benefit

Every recipe you discover, from any source, lives in one searchable, shoppable library — accessible from any device. No more lost recipes, no more retyping ingredients into grocery apps, no more "what was that chicken dish from the Defined Dish, page 262?"

---

## One-Liner Value Proposition

> **Every recipe you find, from anywhere, organized and shoppable in seconds.**

Alternative variants for testing:

- "Paste any recipe. AI organizes it. Shop from it." (action-oriented)
- "One home for every recipe — cookbook, Instagram, or a quick idea." (breadth-focused)
- "Stop losing recipes. Start cooking from them." (pain-focused)

---

## Three Value Pillars

### 1. Universal Import — Any Text, Any Source

Paste text from an Instagram caption, type a recipe from a cookbook (with page number attribution), or jot down a brief meal idea. The AI adapts: full parsing for detailed recipes, title-only capture for quick ideas. No URL required. No structured data required. If you can describe it in text, Recipe Tracker can organize it.

**Key proof point**: Handles the full spectrum from "Coleslaw - Defined Dish (p262)" to a 500-word Instagram recipe caption with nested ingredient lists — something no URL-scraping app can do.

### 2. Structured and Searchable — Find Any Recipe by What Is In It

Every parsed recipe stores ingredients as structured data (name, quantity, unit) — not a blob of text. Search by ingredient ("what can I make with chicken thighs?"), filter by cookbook or tag, and browse your library the way you think about meals: by protein, cuisine, or weeknight vs. weekend.

**Key proof point**: Normalized ingredient model enables cross-recipe search and quantity combination that flat-text recipe storage cannot support.

### 3. Grocery Lists That Write Themselves

Select the recipes you want to cook this week. Recipe Tracker combines all ingredients, sums duplicate quantities (two recipes needing 1 cup butter becomes 2 cups on the list), and gives you a checkable shopping list on your phone. No more transcription errors. No more forgotten ingredients.

**Key proof point**: Grocery list generation is a direct downstream benefit of structured AI parsing — the same intelligence that organizes your recipe also powers your shopping.

---

## Target Audience Segments

### Segment 1: The Multi-Source Collector (Primary)

**Who**: Home cooks (25-45) who actively discover recipes from 5+ sources — cookbooks, Instagram, food blogs, family, friends. Cook 3-7 meals/week from recipes. Part of a family household.

**Current behavior**: Screenshots, bookmarks, notes apps, handwritten lists. Organizes mentally by protein/meal type. Uses Google ecosystem.

**Messaging variant**: "You save recipes from everywhere — cookbooks, Instagram, blogs, family texts. But you can never find them when it's time to cook. Recipe Tracker gives every recipe one searchable, shoppable home."

**Trigger to adopt**: Frustration moment — cannot find a recipe they know they saved somewhere, or manually retyping an ingredient list into a grocery app for the third time.

### Segment 2: The Cookbook Loyalist

**Who**: Home cooks (30-55) with a shelf of physical cookbooks who want a digital index of their collection — with page number references so they can find the physical recipe quickly.

**Current behavior**: Sticky notes in cookbooks, handwritten "favorites" lists, or a spreadsheet of go-to recipes with page numbers.

**Messaging variant**: "Your favorite cookbooks, digitally indexed. Save any recipe with the cookbook name and page number so you always know exactly where to find it — and generate a grocery list without flipping back and forth."

**Trigger to adopt**: Planning a week of meals from multiple cookbooks and needing to consolidate a grocery list across all of them.

### Segment 3: The Meal Planning Pragmatist

**Who**: Busy parents (28-45) who plan weekly meals and need an efficient path from "what are we eating this week?" to a grocery list in hand at the store.

**Current behavior**: Google Keep or Apple Notes with a weekly meal list, then manually building a grocery list from memory and recipe lookups.

**Messaging variant**: "Pick your meals for the week. Get a grocery list in one tap. No more Sunday night scramble to figure out what you need at the store."

**Trigger to adopt**: The weekly Sunday meal planning + grocery list ritual that currently takes 30-45 minutes and could take 5.

---

## Positioning Statement

> **For home cooks who collect recipes from cookbooks, Instagram, blogs, and family**, Recipe Tracker **is the universal recipe organizer** that **uses AI to turn any text into a structured, searchable, shoppable recipe** — unlike URL-scraping apps that only work with recipe websites.

### Positioning Breakdown

| Element | Value |
|---------|-------|
| **For** | Home cooks who collect recipes from multiple sources (cookbooks, Instagram, blogs, family) |
| **Product** | Recipe Tracker |
| **Category** | Universal recipe organizer |
| **Key differentiator** | AI parsing of any text source — not limited to URL scraping |
| **Competitive frame** | Unlike Paprika, Whisk, and Samsung Food which require structured web pages |

### Category Positioning Notes

Recipe Tracker occupies a new position: **universal recipe organizer with AI parsing**. It is not:

- A meal planning app (no calendar in MVP — potential v2)
- A social recipe platform (no community features)
- A recipe discovery app (does not suggest recipes; organizes what you find)

The category is deliberately narrow for launch: "the place where all your recipes live, no matter where you found them." Expansion into meal planning and social features is a post-MVP decision informed by usage data.

---

## Validation Checklist

- [ ] Test one-liner variants with 10+ target users (A/B on landing page)
- [ ] Confirm "any text" parsing claim with 20-30 real-world inputs (Instagram captions, cookbook transcriptions, brief meal ideas)
- [ ] Validate grocery list as #1 or #2 value driver via user interviews
- [ ] Confirm cookbook loyalist segment size is meaningful (are there enough of them?)
- [ ] Test positioning statement with 5 target users: does "universal recipe organizer" resonate, or is simpler language better?

---

**Next Steps**: Battle card vs. Paprika (strongest direct competitor) saved to `execution/shared/2026-02-22_BattleCard_Paprika.md`. Recommend Engineering Partner review of AI parsing contract and UX Strategist review of import flow.
