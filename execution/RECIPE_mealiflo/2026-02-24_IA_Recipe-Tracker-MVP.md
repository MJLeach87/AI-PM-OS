# Information Architecture: Recipe Tracker MVP

**Version**: 1.1
**Date**: 2026-02-24
**Author**: PM OS UX Strategist
**Project**: RECIPE_recipe-tracker
**PRD Reference**: `2026-02-24_PRD_Recipe-Tracker-MVP_v1.1.md`

**Changes from v1.0**:
- Navigation updated: 5 tabs — Recipes, Cookbooks, Add (FAB), Meals, Grocery; Account via header avatar (not a tab)
- Cookbooks reframed as source containers (not category buckets)
- Collections concept removed — Tags handle both category and attribute organization
- Flow 1 updated: tags assignment step added before cookbook step
- Flow 4 updated: cookbooks as source groupings, not category cookbooks
- Flow 5 added: Meal Planning
- Flow 6 added: Onboarding Tag Setup
- Page inventory updated: added Meal Plans screens, removed Collections screens
- Site map updated: Meal Plans node added

---

## 1. Site Map

```mermaid
graph TD
    ROOT["Recipe Tracker App"]

    ROOT --> LANDING["Landing Page\n(unauthenticated)"]
    ROOT --> HOME["App (authenticated)"]

    LANDING --> SIGNIN["Sign In with Google"]
    SIGNIN --> HOME

    HOME --> IMPORT["Add Recipe (FAB)"]
    HOME --> RECIPES["Recipes"]
    HOME --> COOKBOOKS["Cookbooks"]
    HOME --> MEALS["Meal Plans"]
    HOME --> GROCERY["Grocery Lists"]
    HOME --> ACCOUNT["Account (via avatar)"]

    %% Import flow
    IMPORT --> SOURCE_SEL["Source Selection"]
    SOURCE_SEL --> TEXT_INPUT["Text Input"]
    TEXT_INPUT --> PARSING["AI Parsing\n(Claude API)"]
    PARSING --> REVIEW["Review & Edit\nParsed Recipe"]
    REVIEW --> TAGS_SHEET["Assign Tags (sheet)"]
    TAGS_SHEET --> CB_SHEET["Assign Cookbook (sheet)"]
    CB_SHEET --> SUCCESS["Import Success"]
    SUCCESS --> RECIPE_DETAIL

    %% Recipes section
    RECIPES --> BROWSE["Browse / Search / Filter by Tags"]
    BROWSE --> RECIPE_DETAIL["Recipe Detail"]
    RECIPE_DETAIL --> EDIT_RECIPE["Edit Recipe"]
    RECIPE_DETAIL --> ADD_TO_GROCERY["Add to Grocery (sheet)"]
    RECIPE_DETAIL --> DELETE_CONFIRM["Delete Confirm (sheet)"]

    %% Cookbooks section
    COOKBOOKS --> COOKBOOK_LIST["All Cookbooks\n(source containers)"]
    COOKBOOK_LIST --> COOKBOOK_DETAIL["Cookbook Detail\n(recipes from source)"]
    COOKBOOK_DETAIL --> RECIPE_DETAIL

    %% Meal Plans section
    MEALS --> MEAL_PLAN_LIST["All Meal Plans"]
    MEAL_PLAN_LIST --> MEAL_PLAN_DETAIL["Meal Plan Detail\n(weekly calendar)"]
    MEAL_PLAN_DETAIL --> RECIPE_PICKER["Recipe Picker (sheet)"]
    MEAL_PLAN_DETAIL --> GROCERY_GENERATE

    %% Grocery section
    GROCERY --> GROCERY_LISTS["All Grocery Lists"]
    GROCERY_LISTS --> GROCERY_DETAIL["Grocery List Detail\n(shopping view)"]
    GROCERY_LISTS --> GROCERY_GENERATE["New Grocery List\n(recipe selection)"]

    style ROOT fill:#1a73e8,color:#fff
    style IMPORT fill:#f3e5f5,stroke:#7b1fa2
    style PARSING fill:#f3e5f5,stroke:#7b1fa2
    style REVIEW fill:#f3e5f5,stroke:#7b1fa2
    style RECIPES fill:#e8f0fe,stroke:#1a73e8
    style COOKBOOKS fill:#c8e6c9,stroke:#2e7d32
    style MEALS fill:#fff3e0,stroke:#e65100
    style GROCERY fill:#fce4ec,stroke:#c62828
```

---

## 2. Primary Navigation

### Bottom Tab Bar (Mobile) / Left Sidebar (Desktop)

The primary navigation uses a persistent bottom tab bar on mobile (the dominant use case for recipe access while cooking or shopping) and a left sidebar on desktop.

| Position | Label | Icon | Route | Description |
|----------|-------|------|-------|-------------|
| 1 | **Recipes** | `BookOpen` | `/recipes` | Browse, search, and filter all saved recipes by tags |
| 2 | **Cookbooks** | `Library` (bookshelf) | `/cookbooks` | Source-based groupings (physical cookbooks, Instagram accounts, blogs) |
| 3 | **Add** | `Plus` (FAB circle) | `/import` | Center action — source selection → parse → save |
| 4 | **Meals** | `Calendar` | `/meals` | Weekly meal planning calendar |
| 5 | **Grocery** | `ShoppingCart` | `/grocery` | Active and past grocery lists |

**Account**: Accessible via the user avatar in the top-right header (not a tab). Avoids crowding the bottom nav, keeps Account separate from core recipe-management actions.

**Design rationale**:
- **Add is center-tab** with a visually prominent circular FAB because adding recipes is the core value loop.
- **Recipes is position 1** (leftmost / default) — browsing and cooking from saved recipes is the most frequent action.
- **Cookbooks is position 2** — source attribution ("that Ina Garten recipe") is the second most common organizational need.
- **Meals and Grocery** complete the weekly cooking workflow: plan → shop → cook.

### Secondary Navigation

- **Within Recipes**: Search bar (always visible) + filter chips (category tags + attribute tags with recipe counts)
- **Within a Recipe Detail**: Back arrow to previous screen; header shows recipe title
- **Within Grocery List**: Sticky header with tappable list name (inline rename)
- **Within Meal Plan Detail**: Day slots Mon–Sun with recipe picker on empty slots

---

## 3. Information Architecture Aligned to User Mental Model

### Analysis of Real User Data (290+ meals)

The user data reveals a clear **protein/category-first** mental model:

| Category | Count | Examples |
|----------|-------|---------|
| **Pasta** | 38 | Butternut squash gnocchi, Lamb Bolognese, Mac and cheese |
| **Chicken** | 39 | Butter Chicken, Chicken Marsala, Thai lettuce wraps |
| **Pork** | 12 | Egg roll bowl, Pork tenderloin, Lemongrass pork lettuce cups |
| **Seafood** | 13 | Shrimp varieties, Baked cod, Scallops, Halibut |
| **Beef** | 20 | Meatballs, Tacos, Pot roast, Steak |
| **Veg / Whole Meals** | 8 | Eggplant parm, Spaghetti squash, Grilled cheese |
| **Casseroles/Pies** | 12 | Shepherd's pie, Chicken pot pies, Pizza |
| **Soups** | 24 | White Chicken Chili, Butternut Squash, Ramen |
| **Vegetables** | 35 | Organized as ingredient:preparation pairs |
| **Sides** | 16 | Potatoes, Rice, Cornbread |
| **Salads** | 28 | Crispy Rice salad, Caesar, Kale salad |

**Key patterns**:
1. **Primary axis is protein/meal type**, not source or cuisine
2. **Source is secondary metadata** — "Defined Dish", "Dinner Tonight", "Comfortable Kitchen", "AK" (Ambitious Kitchen), "ATK" (America's Test Kitchen), "Ina", "Cravings" appear as parentheticals
3. **Variable detail levels** — from "Stir fry" (2 words) to "Hot maple bacon carbonara with sweet potatoes and herby golden bread crumbs (AK)" (full descriptive title)
4. **Sub-variations within entries** — "Shrimp: curried, soy garlic, grilled, Panko/coconut" represents multiple recipes in one line

### How the IA Supports This Mental Model

| User Mental Model | IA Implementation |
|-------------------|-------------------|
| "Show me my pasta dishes" | **Tag** "Pasta" — filter chip on Recipes page |
| "What can I make with chicken?" | **Search** "chicken" hits both titles and ingredients |
| "That Defined Dish recipe" | **Cookbook** named "The Defined Dish" — browse all recipes from that source |
| "Quick weeknight ideas" | **Tag** "Weeknight" + **Tag** "Quick" — combinable filter chips |
| "I just want to save the name for now" | **AI Import** handles brief ideas; marks as "Idea" tag |
| "I have 5 recipes to add from this cookbook" | **Bulk import** mode — paste multiple lines, creates one entry per line |
| "What am I cooking this week?" | **Meal Plans** — assign recipes to each day Mon–Sun |

### Two Organizational Axes

**Tags** handle the *what* — the meal type and attributes users search by:
- **Category tags** (meal type): Pasta, Chicken, Beef, Pork, Seafood, Soups & Stews, Salads, Sides, Desserts, Vegetarian
- **Attribute tags**: Weeknight, Quick (≤30m), One-Pan, Freezer-Friendly, Special Occasion

**Cookbooks** handle the *where it came from* — the source of the recipe:
- Physical cookbooks (The Defined Dish, Barefoot Contessa, Jerusalem Cookbook)
- Instagram accounts / food bloggers (Ambitious Kitchen, Half Baked Harvest)
- Family recipes, personal notes

A recipe has tags AND belongs to a cookbook — these are orthogonal. "Harvest Kale and Farro Salad" has tags [Salads, Vegetarian] and belongs to "The Defined Dish" cookbook.

### Default Tags (Onboarding Suggestion)

During first sign-in, show a "Set up your categories" card with pre-populated checkboxes:
- Pasta, Chicken, Beef, Pork, Seafood, Soups & Stews, Salads, Sides, Desserts (pre-checked)
- User can deselect, and add more

Selected tags become the filter chips on the Recipes page immediately.

---

## 4. Key User Flows

### Flow 1: Paste Text → Parse → Review → Tags → Cookbook → Save

This is the core value loop — the primary reason users choose this app over alternatives.

```mermaid
flowchart TD
    A["User taps Add (center FAB)"] --> B["Source selection:\nInstagram / Website / Cookbook / Family / Quick Idea"]
    B --> C["Text input screen:\nTextarea + source-specific tips"]
    C --> D{"Char count check"}
    D -->|"> 5000"| D2["Parse disabled\n'Text too long'"]
    D -->|"< 5000"| E["User taps 'Parse Recipe'"]
    E --> F["Loading: Shimmer skeleton +\ncycling progress messages"]
    F --> G{"Claude API response"}

    G -->|"Valid parse"| H["Review screen:\nConfidence badge + editable fields\n(title, ingredients, steps, times)\nDish photo + recipe image upload"]
    G -->|"Multiple recipes detected\n(3+ short lines)"| I["Bulk import:\nCheckbox list of detected titles"]
    G -->|"No recipe found (5%)"| J["Error state:\n'No recipe found' + Try Again / Enter Manually"]
    G -->|"API timeout"| K["Error: 'Something went wrong' + Retry"]

    H --> L["User reviews / edits fields"]
    L --> M["Tap 'Save Recipe'"]
    M --> N["Assign Tags sheet:\nCategory chips + Attribute chips"]
    N --> O["Tap 'Save Recipe' in sheet"]
    O --> P["Assign Cookbook sheet:\nSource cookbook list + 'Create new' + 'Skip'"]
    P --> Q["Success screen:\nRecipe preview + Add Another / View Recipe / Add to Grocery"]

    I --> R["User selects recipes"]
    R --> S["Saved as Ideas — toast confirms count"]
    S --> T["Returns to Recipes"]

    J --> U["Manual entry form"]

    style A fill:#f3e5f5,stroke:#7b1fa2
    style H fill:#c8e6c9,stroke:#2e7d32
    style Q fill:#c8e6c9,stroke:#2e7d32
    style J fill:#ffcdd2,stroke:#c62828
    style K fill:#ffcdd2,stroke:#c62828
```

**Screen inventory for this flow**:

| Screen | Key Elements |
|--------|-------------|
| **Source Selection** | 5 source option cards: Instagram, Website, Cookbook, Family, Quick Idea |
| **Text Input** | Textarea, character counter (warn at 4500+, disable at 5001+), source-specific tip, cookbook selector (for cookbook source), Parse Recipe button |
| **Parsing (loading)** | Shimmer skeleton, cycling progress messages ("Reading text...", "Extracting ingredients...", "Almost done..."), Cancel button |
| **Review** | Confidence badge (High/Medium/Low), editable Title, editable Description, Servings/Prep/Cook fields, editable Ingredient rows (qty + unit + name), editable Step textareas, Dish Photo upload, Recipe Page Image upload (cookbook source), Source attribution |
| **Assign Tags (sheet)** | Category tag checkboxes, Attribute tag checkboxes, Save Recipe button |
| **Assign Cookbook (sheet)** | Cookbook list with source emojis, "Create new cookbook" option, Skip button |
| **Bulk Import** | Detected recipe names as checkboxes, "Import Selected as Ideas" button |
| **Error** | Error message, "Try Again" button, "Enter Manually" link |
| **Success** | Recipe card preview, "Add Another", "View Recipe", "Add to Grocery" |

### Flow 2: Browse Recipes → Filter → View → Act

```mermaid
flowchart TD
    A["User taps Recipes tab"] --> B["Recipes page:\nSearch bar + filter chips + grid/list toggle\n(optional onboarding card on first visit)"]
    B --> C{"User action"}

    C -->|"Search"| D["Type in search bar\n(title + ingredient match)"]
    D --> E["Filtered results update live"]
    E --> F["Tap recipe card"]

    C -->|"Filter by tag"| G["Tap filter chip\n(shows count per tag)"]
    G --> E

    C -->|"Browse"| F

    F --> I["Recipe Detail page:\nHero image / emoji, title, source,\ndual images, ingredients, steps, tags"]
    I --> J{"User action on detail"}
    J -->|"Edit"| L["Edit recipe fields + tags"]
    J -->|"Add to Grocery"| N["Add to Grocery sheet:\nExisting list or New list"]
    J -->|"Add to Meal Plan"| MP["Navigates to Meal Plans"]
    J -->|"Delete"| O["Delete Confirm sheet:\n'Delete [Name]? Can't be undone'"]

    style B fill:#e8f0fe,stroke:#1a73e8
    style I fill:#e8f0fe,stroke:#1a73e8
```

**Recipe card** shows: emoji placeholder (or dish photo), title, source, 1-2 tag chips. Filter chips show recipe counts: "Pasta (4)", "Chicken (3)".

**Recipe detail** shows: hero image or emoji placeholder (large), title, source attribution (cookbook name + page if applicable), description, servings/prep/cook/total time, Recipe Source card (recipe image if available), tags, ingredient list, numbered steps, action buttons.

**Dual image display**:
- `imageUrl` (dish photo) → hero image at top of detail, card thumbnail
- `recipeImageUrl` (recipe page photo) → shown in "Recipe Source" collapsible card below description; tappable to view full-size

### Flow 3: Select Recipes → Generate Grocery List

```mermaid
flowchart TD
    A["User wants a grocery list"] --> B{"Entry point"}

    B -->|"From recipe detail"| C["Tap 'Add to Grocery'\non a single recipe"]
    B -->|"From Meal Plan detail"| D["Tap 'Generate Grocery List'\n(adds all planned recipes)"]
    B -->|"From Grocery tab"| E["Tap 'New List'\nSelect recipes manually"]

    C --> F{"Active list exists?"}
    F -->|"Add to existing"| G["Ingredients appended to active list"]
    F -->|"Create new"| H["New list with recipe's ingredients"]

    D --> I["New list from all meal plan recipes"]

    E --> J["Recipe selection screen:\nCheckbox per recipe with ingredient count"]
    J --> K["Generate Grocery List"]

    G --> L["Grocery List Detail:\nGrouped by category"]
    H --> L
    I --> L
    K --> L

    L --> M["Shopping mode"]
    M -->|"Check off"| N["Item moves to Purchased section"]
    M -->|"Add manual item"| O["+ Add Item form: name + qty"]
    M -->|"Delete item"| P["× removes item from list"]
    M -->|"Rename list"| Q["Tap header title → inline edit"]

    style L fill:#fce4ec,stroke:#c62828
```

**Grocery list detail** layout:

| Section | Content |
|---------|---------|
| **Header** | Tappable list name (inline rename), items remaining count |
| **Category sections** | Produce, Dairy, Meat, Pantry (each as label + item rows) |
| **Per item** | Checkbox, ingredient name + quantity, source recipe badge, × delete button (on hover/tap) |
| **Purchased** (appears when items checked) | Checked items with count badge, "Clear" action |
| **Extras** | Manually added items with "manual" badge |
| **Add Item form** | Name + qty inputs (shown inline when + Add Item tapped) |

### Flow 4: Browse Cookbooks (Source Containers)

```mermaid
flowchart TD
    A["User taps Cookbooks tab"] --> B["Cookbooks list:\nSource name, description, recipe count, emoji"]
    B --> C{"User action"}

    C -->|"Create new"| D["'+ New' button → New Cookbook sheet:\nName + description"]
    D --> E["Cookbook created and shown in list"]

    C -->|"View source"| F["Cookbook detail:\nAll recipes from that source"]
    F --> G{"Recipe in cookbook?"}
    G -->|"Yes"| H["Tap recipe → Recipe Detail"]
    G -->|"No (empty)"| I["Empty state:\n'Add recipes from [Source Name]'"]

    C -->|"Import — cookbook source"| J["During import:\nCookbook selector pre-populated\nwith user's cookbook list"]

    H --> K["Recipe Detail\n(source attribution shows cookbook)"]

    style B fill:#c8e6c9,stroke:#2e7d32
    style F fill:#c8e6c9,stroke:#2e7d32
```

**Cookbook as source container**: Each cookbook represents one source. During import, the cookbook selector shows all user cookbooks. The user assigns the new recipe to the relevant source. On the recipe detail, "From [Cookbook Name]" + page number if applicable.

**Creating cookbooks**: Users create cookbooks for each source they use. Suggested names during onboarding: The Defined Dish, Barefoot Contessa, Ambitious Kitchen, Jerusalem Cookbook, Instagram Saves, Family Recipes. User customizes the list.

### Flow 5: Meal Planning

```mermaid
flowchart TD
    A["User taps Meals tab"] --> B["Meal Plans list:\nActive plan card (7-day mini grid) +\npast plans (Completed badge)"]
    B --> C{"User action"}

    C -->|"Create new plan"| D["'+ New Week' → new meal plan\nfor current calendar week"]
    D --> E["Meal Plan Detail:\n7 day slots Mon–Sun\n(current week dates)"]

    C -->|"View active plan"| E

    E --> F{"Slot action"}
    F -->|"Tap empty slot"| G["Recipe Picker sheet:\nSearchable recipe list"]
    G --> H["Tap a recipe → assigns to slot"]
    H --> I["Slot fills with:\nrecipe title + source + total time"]

    F -->|"Tap filled slot"| J["Day options sheet:\n'Remove from Plan' / 'Swap Recipe'"]
    J -->|"Remove"| K["Slot returns to empty dashed state"]
    J -->|"Swap"| G

    E --> L["Tap 'Generate Grocery List'"]
    L --> M["New grocery list from\nall assigned recipes"]
    M --> N["Grocery List Detail"]

    style E fill:#fff3e0,stroke:#e65100
    style G fill:#fff3e0,stroke:#e65100
```

**Meal plan detail** layout:
- 7 day slots, each showing: day label (MON, TUE...) + date number
- Empty slot: dashed border, "+ Assign a meal" text
- Filled slot: recipe title (bold), source + total time (gray)
- "Generate Grocery List" button at bottom

**Recipe picker sheet**: Full recipe list with search. Tapping any recipe immediately assigns it to the day slot and closes the sheet.

### Flow 6: Onboarding Tag Setup (First Sign-In)

```mermaid
flowchart TD
    A["User signs in for first time"] --> B["Navigates to Recipes page"]
    B --> C["Onboarding card shown at top\n(green background, dismissable):\n'Set up your categories'"]
    C --> D["Pre-selected checkboxes:\nPasta, Chicken, Beef, Pork, Seafood,\nSoups & Stews, Salads, Sides, Desserts"]
    D --> E{"User action"}

    E -->|"Saves categories"| F["Tags saved\nFilter chips appear on Recipes page\n'Categories saved' toast"]
    E -->|"Dismisses / skips"| G["Card hidden\nFilter chips show 'All' only\nCan manage tags in Account → Manage Tags"]

    F --> H["Recipes page with\ncategory filter chips"]
    G --> H

    style C fill:#f0fdf4,stroke:#16a34a
    style F fill:#f0fdf4,stroke:#16a34a
```

**Onboarding card behavior**:
- Shown once on first authenticated recipes page visit
- Pre-populated with common category tags (all pre-checked)
- User can deselect any before saving
- "Skip" / × button dismisses without saving
- After saving: card hides, filter chips show selected tags with recipe counts
- Can add/remove tags anytime via Account → Manage Tags

---

## 5. Page Inventory

| Page | Route | Purpose | Key Components |
|------|-------|---------|----------------|
| Landing | `/` | Marketing + sign-in | Hero, value props (AI import, ingredient search, grocery lists), Google Sign In |
| Recipes | `/recipes` | Default authenticated view — browse all recipes | Onboarding card (first visit), search bar, filter chips with counts, grid/list toggle, recipe cards |
| Recipe Detail | `/recipes/[id]` | Full recipe view + actions | Hero image/emoji, title, source attribution, dual images, ingredients, steps, tags, action buttons |
| Recipe Edit | `/recipes/[id]/edit` | Edit recipe fields | Title, description, servings/times, tag checkboxes |
| Import — Source | `/import` | Source type selection | 5 source option cards |
| Import — Text | `/import/text` | Text input + parse | Textarea + char counter + tips + Parse button |
| Import — Parsing | `/import/parsing` | AI parsing loading state | Shimmer skeleton + cycling messages + Cancel |
| Import — Review | `/import/review` | Review + edit parsed recipe | Confidence badge, editable fields, dish photo + recipe image upload |
| Import — Error | `/import/error` | Parse error state | Error message + Try Again + Enter Manually |
| Import — Bulk | `/import/bulk` | Multiple recipes detected | Checkbox list of titles + "Import as Ideas" |
| Import — Success | `/import/success` | Confirmation | Recipe card preview + quick actions |
| Cookbooks | `/cookbooks` | Source-container list | Cookbook cards with emoji, name, desc, recipe count |
| Cookbook Detail | `/cookbooks/[id]` | All recipes from a source | Recipe list with page numbers + empty state CTA |
| Meal Plans | `/meals` | Meal plan list | Active plan card (mini calendar grid), past plans |
| Meal Plan Detail | `/meals/[id]` | Weekly meal calendar | 7 day slots, recipe picker sheet, Generate Grocery List |
| Grocery Lists | `/grocery` | Grocery list management | Active + past list cards |
| Grocery Detail | `/grocery/[id]` | Shopping checklist | Categorized items, purchased section, manual add, rename |
| Grocery New | `/grocery/new` | Create grocery list | Recipe selection checkboxes + Generate |
| Account | (via avatar) | Profile + settings | Avatar, stats, Manage Cookbooks, Manage Tags, Export, Sign Out |

---

## 6. Responsive Breakpoints

| Breakpoint | Layout | Navigation |
|------------|--------|------------|
| **Mobile** (< 640px) | Single column, max-width 430px, bottom tab bar | 5-tab bottom nav + FAB |
| **Tablet** (640px–1024px) | 2-column recipe grid | Bottom tab bar |
| **Desktop** (> 1024px) | 3-4 column recipe grid | Left sidebar with same 5 items + Account at bottom |

Mobile is the primary design target because:
- Recipes are accessed while cooking (phone on counter)
- Grocery lists are used while shopping (phone in hand)
- Instagram recipe discovery happens on mobile

---

## 7. Accessibility Notes

- All interactive elements are keyboard-navigable
- Recipe cards use semantic `<article>` elements with `aria-label`
- Filter states are announced to screen readers
- Grocery list checkboxes have associated `<label>` elements
- Color is never the sole indicator of state (confidence badges use icon + text + color)
- Touch targets minimum 44×44px on mobile
- Bottom sheet backdrops trap focus while open (focus returns to trigger on close)
- High contrast mode support via Tailwind `dark:` variants (v2)

---

**Prototype**: `2026-02-24_Prototype_Recipe-Tracker-MVP.html` — interactive single-file HTML prototype covering all 6 flows
