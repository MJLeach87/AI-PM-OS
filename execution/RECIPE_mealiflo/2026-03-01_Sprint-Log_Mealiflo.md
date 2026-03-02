# MealiFlo Sprint Log

**Product**: MealiFlo
**Repo**: `C:\Users\MJLea\Claude Code Projects\mealiflo`
**Production**: https://mealiflo.vercel.app
**PRD**: `2026-02-24_PRD_Recipe-Tracker-MVP_v1.1.md`

---

## Sprint 1 — Foundation (Complete)

**Dates**: 2026-02-24 to 2026-02-25
**Scope**: Scaffolding, Auth, Schema

### Delivered
- [x] Next.js 16 App Router scaffold with TypeScript strict
- [x] Tailwind CSS v4 + shadcn/ui components
- [x] Auth.js v5 with Google OAuth (JWT strategy)
- [x] Drizzle ORM + Turso (libSQL) database
- [x] Full schema: users, recipes, ingredients, steps, cookbooks, tags, recipe_tags, grocery_lists, grocery_items, meal_plans, meal_plan_days, parse_attempts, events
- [x] App shell: sidebar (desktop) + bottom nav (mobile) with 5-tab layout
- [x] Vercel deployment pipeline
- [x] Biome linter/formatter configured

---

## Sprint 2 — Core (Complete)

**Dates**: 2026-02-25 to 2026-02-27
**Scope**: F2 Recipe CRUD, F3 Source Attribution, F1 AI Import

### Delivered
- [x] **AI Recipe Import** — Claude Haiku 4.5 text parsing with structured JSON output
- [x] **OCR Import** — Google Cloud Vision for cookbook page photos → text → AI parse
- [x] **URL Import** — Fetch page content, strip HTML, AI parse
- [x] **Recipe CRUD** — Full create/read/update/soft-delete
- [x] **Source Attribution** — sourceType (instagram/website/cookbook/family/idea), sourceName, sourceUrl, sourcePage
- [x] **Import Flow** — Source selection → text/URL/photo input → AI parse → review (editable) → tag assign → cookbook assign → save
- [x] **Recipe Grid** — Grid/list toggle, search, two-row filter chips (categories + attributes)
- [x] **Recipe Detail** — Full recipe view with hero image, ingredients, steps, metadata, edit/delete

---

## Sprint 3 — Organization (Complete)

**Dates**: 2026-02-27 to 2026-03-01
**Scope**: F4 Cookbooks, F5 Tags & Search, F8 Meal Planning

### Delivered
- [x] **Cookbooks** — CRUD, detail pages with recipe lists, emoji icons, cover images (Google Books API)
- [x] **Tags** — Category/attribute dual-type system, AI-suggested tags on import, filter chips on recipes page
- [x] **Tag Reclassification** — Bulk reclassify action on Account page (maps real user tag names to canonical categories)
- [x] **Meal Planning** (2026-03-01)
  - `src/actions/meal-plans.ts` — 7 server actions (getCurrentMealPlan, getMealPlan, getUserMealPlans, assignRecipeToDay, removeRecipeFromDay, generateGroceryListFromPlan, getRecipesForPicker)
  - `src/components/meal-plan-week.tsx` — Weekly calendar grid (vertical mobile, 7-col desktop), recipe picker dialog with search, optimistic UI
  - `src/app/(app)/meals/page.tsx` — Auto-creates current week plan, shows past plans
  - `src/app/(app)/meals/[id]/page.tsx` — Past plan detail view
  - Auto-create current week on first visit (no "New Week" button needed)
  - One recipe per day (per PRD)
  - Generate Grocery List from plan → creates list with combined ingredients
- [x] **Minimal Grocery** (2026-03-01)
  - `src/actions/grocery.ts` — 4 actions (getUserGroceryLists, getGroceryList, toggleGroceryItem, deleteGroceryList)
  - `src/components/grocery-checklist.tsx` — Optimistic toggle checklist
  - `src/app/(app)/grocery/page.tsx` — Lists overview with progress %
  - `src/app/(app)/grocery/[id]/page.tsx` — Checklist detail with toggle
- [x] **UI Refresh** (2026-02-28) — Sage green brand colors, card polish, grid/list toggles
- [x] **Image Generation** (2026-02-28) — Imagen 3 for dish photos, Google Books for cookbook covers
- [x] **Backfill Actions** — Account page buttons for bulk image/cover generation

### Sprint 3 Files Created
| File | Type | Purpose |
|------|------|---------|
| `src/actions/meal-plans.ts` | Server Actions | Meal plan CRUD + grocery generation |
| `src/actions/grocery.ts` | Server Actions | Grocery list read/toggle/delete |
| `src/components/meal-plan-week.tsx` | Client Component | Weekly calendar + recipe picker |
| `src/components/grocery-checklist.tsx` | Client Component | Shopping checklist with toggle |
| `src/app/(app)/meals/[id]/page.tsx` | Page | Past meal plan detail |
| `src/app/(app)/grocery/[id]/page.tsx` | Page | Grocery list detail |

### Sprint 3 Files Modified
| File | Change |
|------|--------|
| `src/app/(app)/meals/page.tsx` | Replaced stub with full meal plan view |
| `src/app/(app)/grocery/page.tsx` | Replaced stub with grocery lists overview |

---

## Sprint 4 — Grocery + Polish (In Progress)

**Dates**: 2026-03-01 to TBD
**Scope**: F7 Full Grocery Lists, Polish, Production Ship

### Delivered
- [x] **Full Grocery List UI** (2026-03-01) — Items grouped by store section (Produce, Dairy, Meat, Seafood, Bakery, Pantry, Spices, Frozen, Other), manual item add with inline form, delete items, rename list
- [x] **Add to Grocery from Recipe** (2026-03-01) — "Add to Grocery List" button on recipe detail page creates new list with all recipe ingredients
- [x] **Grocery Item Categories** (2026-03-01) — Keyword-based auto-categorization in `src/lib/grocery-categories.ts`, applied to both meal plan and recipe grocery generation
- [x] **Editable Grocery List Name** (2026-03-01) — Tap pencil icon to rename, inline editing with save/cancel
- [x] **Delete Grocery Lists** (2026-03-01) — Delete from overview page with confirmation dialog
- [x] **Mobile Polish** (2026-03-01) — Remove/delete buttons always visible on mobile (was hover-only), larger touch targets

### Remaining
- [ ] **Grocery List from Recipe Selection** — `/grocery/new` page for selecting multiple recipes to generate a list
- [ ] **Production Deploy** — Final Vercel config, environment verification

### Sprint 4 Files Created
| File | Type | Purpose |
|------|------|---------|
| `src/lib/grocery-categories.ts` | Utility | Keyword-based grocery item categorization |
| `src/components/grocery-list-header.tsx` | Client Component | Editable grocery list name |
| `src/components/grocery-lists-view.tsx` | Client Component | Grocery list overview with delete |

### Sprint 4 Files Modified
| File | Change |
|------|--------|
| `src/actions/grocery.ts` | Added createGroceryListFromRecipe, addGroceryItem, deleteGroceryItem, renameGroceryList |
| `src/actions/meal-plans.ts` | Added category to generated grocery items |
| `src/components/grocery-checklist.tsx` | Category grouping, manual add form, delete buttons, mobile touch targets |
| `src/components/recipe-detail.tsx` | "Add to Grocery List" button in view mode |
| `src/components/meal-plan-week.tsx` | Mobile-visible remove button |
| `src/app/(app)/grocery/page.tsx` | Simplified to use GroceryListsView client component |
| `src/app/(app)/grocery/[id]/page.tsx` | Pass listId, add editable header |

### Stretch
- [ ] Ingredient search (search recipes by ingredient name)
- [ ] Onboarding category setup card
- [ ] Account stats (recipe count, cookbook count, etc.)

---

## Deferred to v2

- Multiple meals per day (breakfast/dinner slots)
- Ingredient unit normalization (cup → tbsp conversion)
- Duplicate recipe detection
- Family/shared accounts
- Serving size adjustment
- Offline access (service worker)
- Kroger grocery integration
