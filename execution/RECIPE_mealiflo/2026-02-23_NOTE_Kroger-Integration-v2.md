# Kroger API Integration — v2 Grocery Export

**Date**: 2026-02-23
**Status**: v2 Feature (post-MVP)
**Project**: RECIPE_recipe-tracker

---

## Overview

Instead of generic grocery export (Instacart, Amazon Fresh), go directly to **Kroger** — the family's primary grocery store. Kroger has a public developer API that supports adding items to a customer's cart programmatically.

## Kroger Developer API

**Portal**: https://developer.kroger.com/reference/

### Relevant APIs

| API | Capability | Use in Recipe Tracker |
|-----|------------|----------------------|
| **Product API** | Search Kroger catalog by product name | Match ingredient names to actual Kroger products |
| **Cart API** | Create, view, and update a customer's cart | Add matched items directly to Kroger cart |
| **Location API** | Find nearby stores | Set user's preferred store for accurate product availability |
| **Authorization API** | OAuth 2.0 flow | Authenticate user's Kroger account |

### Registration

- Free developer registration at developer.kroger.com
- OAuth 2.0 client credentials
- Rate limits TBD (check developer docs)

## User Flow

```
Grocery List → "Send to Kroger" button
  → User authenticates with Kroger (one-time OAuth)
  → For each ingredient:
      → Search Product API for best match
      → Show user the matched product + price
      → User confirms or adjusts
  → Add confirmed items to Kroger Cart via Cart API
  → "Open Kroger" button → user checks out in Kroger app/website
```

## Implementation Path

1. Register at developer.kroger.com for API credentials
2. Implement Kroger OAuth 2.0 flow (store refresh token per user)
3. Build ingredient → product matching:
   - Search Product API by ingredient name
   - Rank results by relevance
   - Handle fuzzy matching ("heavy cream" → "Kroger Heavy Whipping Cream")
4. Build cart integration:
   - Add matched items to Kroger cart
   - Handle quantities (map recipe units to Kroger product sizes)
5. UI: "Send to Kroger" button on grocery list detail

## Existing Kroger MCP Server

A [Kroger MCP server](https://lobehub.com/mcp/cupofowls-kroger-mcp) already exists for AI assistant integration. Could accelerate development by providing a ready-made interface to Kroger's APIs.

## Challenges

- **Ingredient → product matching**: "garlic (4 cloves)" needs to match a head of garlic or a jar of minced garlic. May need AI assistance for mapping.
- **Unit conversion**: Recipe uses "1 cup heavy cream" but Kroger sells pints/quarts. Need mapping logic.
- **Product availability**: Varies by store location. Must set user's preferred store first.
- **Price sensitivity**: Users may want to see prices before auto-adding. Show a confirmation step.

## Environment Variables (v2)

`KROGER_CLIENT_ID`, `KROGER_CLIENT_SECRET` — stored in `.env`, never committed.

---

## References

- [Kroger Developer Portal](https://developer.kroger.com/reference/)
- [Kroger MCP Server](https://lobehub.com/mcp/cupofowls-kroger-mcp)
- PRD v1.0 Feature 7 (Grocery Lists): `2026-02-22_PRD_Recipe-Tracker-MVP_v1.0.md`
