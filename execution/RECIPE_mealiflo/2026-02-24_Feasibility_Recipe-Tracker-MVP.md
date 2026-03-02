# Technical Feasibility Assessment: Recipe Tracker MVP

**Date**: 2026-02-24
**Assessor**: PM OS Engineering Partner
**PRD Version**: 1.1
**Project**: RECIPE_recipe-tracker
**Tech Stack**: Next.js 15 App Router, TypeScript (strict), Tailwind v4, shadcn/ui, Turso (SQLite edge) + Drizzle ORM, Auth.js v5 (Google OAuth), Claude API (Anthropic SDK), Vercel

**Changes from v1.0**:
- Feature 8 (Meal Planning) added to complexity ratings
- Schema updated: `recipeImageUrl` on RECIPE, `MEAL_PLAN` and `MEAL_PLAN_DAY` tables
- Collections removed — Tags replace them; no schema impact (TAG table already existed)
- Sprint plan updated to include Meal Plans in Sprint 3
- Effort estimate updated to 22-34 days

---

## 1. Feature Complexity Ratings

| # | Feature | Complexity | Effort | Justification |
|---|---------|-----------|--------|---------------|
| 1 | AI Recipe Import (Any Text Source + OCR) | **High** | **L** | Core differentiator. Claude API integration, structured output with Zod, adaptive parsing (full recipe vs. brief idea vs. bulk list), dual image handling, error states. Prompt engineering is iterative. |
| 2 | Recipe CRUD | **Low** | **S** | Standard CRUD with Drizzle ORM. Normalized ingredients/steps use multi-table writes (Drizzle transactions). Dual image fields (`imageUrl` + `recipeImageUrl`) add a column but no logic complexity. |
| 3 | Source Attribution | **Low** | **S** | Display-only. Conditional rendering (cookbook + page vs. URL vs. none). No external API calls. |
| 4 | Cookbook Organization (Source Containers) | **Low** | **S** | Many-to-many junction table (cookbook_recipe). CRUD for cookbooks + add/remove recipe operations. Cookbooks as source containers vs. category buckets is a UX decision, not a schema change — the data model is identical. |
| 5 | Tags & Search | **Medium** | **M** | Tags replace Collections — same complexity. Title + ingredient search requires JOIN + indexing. Filter by tag adds query composition. Tag type column (category vs. attribute) adds a column, not complexity. |
| 6 | Google OAuth Authentication | **Medium** | **M** | Auth.js v5 configuration with Drizzle adapter. GCP console setup, redirect URIs, JWT strategy. Well-documented but has sharp edges with Turso. |
| 7 | Grocery List Generation | **Medium** | **M** | Single-recipe list is simple. Multi-recipe ingredient combination with unit normalization deferred — MVP concatenates. Entry points: recipe detail, meal plan generate, manual selection. |
| 8 | Meal Planning | **Medium** | **M** | Two new tables (meal_plan, meal_plan_day). UI: weekly calendar with day slots, recipe picker sheet. Generate grocery list from meal plan reuses existing grocery list creation logic. No AI required. Low-risk feature relative to its user value. |

---

## 2. Technical Dependencies and Risks

### 2.1 Claude API Parsing Reliability

**Risk Level**: High (business-critical path)

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Inconsistent JSON structure | Broken parse flow | Medium | Tool-use mode + Zod validation. Reject on schema failure, fall back to manual. |
| Low accuracy on brief/ambiguous inputs | False confidence | Medium | Always show review before save. Track edit rates post-parse as accuracy signal. |
| API latency (2-8 seconds) | Poor perceived performance | High | Shimmer skeleton + cycling progress messages during parse. |
| API rate limits or outages | Feature unavailable | Low | Retry with exponential backoff. Show "enter manually" fallback. |
| Prompt injection via pasted text | Unintended AI output | Medium | Strip HTML from input. Use tool-use structured output. Validate with Zod. |
| Cost per parse | Unpredictable costs at scale | Medium | Claude Haiku (~$0.001-0.005/parse). At 100 WAU × 3 parses/week ≈ $0.30-1.50/week. |

**Recommendation**: Use Claude's tool-use mode (function calling) for structured output. This eliminates most JSON parsing failures.

### 2.2 Turso/Drizzle Schema

**Risk Level**: Low-Medium

The v1.1 data model adds these tables and columns:

| Addition | Schema Impact | Notes |
|----------|--------------|-------|
| `recipe.recipeImageUrl` | New nullable column on existing table | Stores URL to cookbook page scan, Instagram screenshot, etc. Same type as `imageUrl`. |
| `MEAL_PLAN` table | New table: id, userId, name, weekStartDate, status, createdAt, updatedAt, deletedAt | Simple. 1:N to MEAL_PLAN_DAY. |
| `MEAL_PLAN_DAY` table | New table: id, mealPlanId, dayOfWeek (0-6), recipeId (nullable FK), notes, assignedAt | N:1 to MEAL_PLAN, N:1 to RECIPE. Up to 7 rows per plan. |
| `tag.type` | New column on TAG: 'category' \| 'attribute' | Enables filtering onboarding tags. No performance impact. |

| Other Schema Concern | Assessment |
|---------------------|------------|
| **Normalized ingredients** | Correct. Multi-row inserts per recipe save — Drizzle batch insert handles this. |
| **Denormalized grocery items** | Correct. Grocery list items are independent copies; editing a recipe should not change an in-use list. |
| **Text primary keys (cuid2)** | 25 chars vs 36 for UUID — better for SQLite. Use `@paralleldrive/cuid2`. |
| **Indexes** | Required on: `recipe.userId`, `ingredient.recipeId`, `ingredient.name`, `step.recipeId`, `cookbook_recipe.cookbookId`, `tag.name + tag.userId`, `meal_plan.userId`, `meal_plan_day.mealPlanId`. |
| **Cascade deletes** | Define: recipe cascade → ingredients, steps, recipe_tags, cookbook_recipes. meal_plan cascade → meal_plan_days. |
| **Dual image storage (production)** | `imageUrl` and `recipeImageUrl` store URLs. For MVP, accept user-provided URLs or skip actual uploads. When file upload is implemented, store objects in R2 (Cloudflare) or S3, store the URL in the DB column. Do NOT store binary in SQLite/Turso. |

**Updated Drizzle schema snippet**:

```typescript
// schema.ts — recipe table with dual image fields
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const recipe = sqliteTable('recipe', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  sourceUrl: text('source_url'),
  sourceName: text('source_name'),
  sourceType: text('source_type'),      // 'instagram' | 'cookbook' | 'website' | 'family' | 'other'
  sourcePage: integer('source_page'),   // cookbook page number
  rawInputText: text('raw_input_text'), // preserved for re-parsing
  sourceConfidence: text('source_confidence'), // 'high' | 'medium' | 'low'
  parsedAt: integer('parsed_at', { mode: 'timestamp' }),
  parseAttemptId: text('parse_attempt_id'),
  imageUrl: text('image_url'),          // dish photo URL
  recipeImageUrl: text('recipe_image_url'), // cookbook page / source photo URL (NEW in v1.1)
  servings: integer('servings'),
  prepTimeMinutes: integer('prep_time_minutes'),
  cookTimeMinutes: integer('cook_time_minutes'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

export const mealPlan = sqliteTable('meal_plan', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  weekStartDate: text('week_start_date').notNull(), // ISO date string e.g. '2026-02-23'
  status: text('status').notNull().default('active'), // 'active' | 'completed'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

export const mealPlanDay = sqliteTable('meal_plan_day', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  mealPlanId: text('meal_plan_id').notNull().references(() => mealPlan.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('day_of_week').notNull(), // 0=Mon, 1=Tue, ... 6=Sun
  recipeId: text('recipe_id').references(() => recipe.id, { onDelete: 'set null' }),
  notes: text('notes'),
  assignedAt: integer('assigned_at', { mode: 'timestamp' }),
});
```

### 2.3 Auth.js v5 Google OAuth Setup

**Risk Level**: Medium

(Same as v1.0 assessment — no changes to auth from scope update.)

| Concern | Detail |
|---------|--------|
| **Auth.js v5 vs. v4** | v5 is a major rewrite. Test the Drizzle adapter configuration early. |
| **GCP OAuth consent screen** | Email/profile scope is non-sensitive — no app review required. |
| **Session strategy** | JWT recommended for Turso (no DB round-trip per request). |
| **Environment variables** | `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_TRUST_HOST=true` |

**Recommendation**: Start auth in Sprint 1. It is the foundation every feature depends on.

---

## 3. Security Assessment

### 3.1 STRIDE Threat Model

| Threat | Category | Risk | Mitigation |
|--------|----------|------|------------|
| Attacker steals Claude API key | Information Disclosure | **Critical** | Server Actions only. API key in env var, never client bundle. Verify with `next build` bundle search. |
| User impersonates another user | Spoofing | **High** | Auth.js v5 session tokens (HttpOnly, Secure, SameSite=Lax). Validate `session.user.id` on every mutation. |
| User accesses another user's recipes/plans | Elevation of Privilege | **High** | All queries include `WHERE userId = session.user.id`. `requireAuth()` helper on every Server Action. |
| Malicious text injection | Tampering | **Medium** | React escapes rendered text. No `dangerouslySetInnerHTML`. Sanitize sourceUrl (must start with `https://`). |
| Claude API prompt injection | Tampering | **Medium** | Tool-use structured output + Zod schema validation. Never eval Claude output. |
| Parse endpoint abuse | Denial of Service | **Medium** | Rate limit: 10/min/user, 50/day/user. 5000 char input limit. |
| Image upload abuse | Denial of Service | **Low (if upload implemented)** | Validate MIME type, enforce max file size (10 MB). Store in R2/S3, not DB. |

### 3.2 OWASP Top 10 (2021) Review

| # | Vulnerability | Status | Notes |
|---|--------------|--------|-------|
| **A01** | Broken Access Control | **Requires implementation** | Every Server Action + RSC data fetch must verify `session.user.id` owns the resource. Include `meal_plan` and `meal_plan_day` in ownership checks. |
| **A02** | Cryptographic Failures | **Low risk** | No passwords. API keys in env vars. Auth.js handles session encryption. |
| **A03** | Injection | **Mitigated by Drizzle** | Parameterized queries by default. Never use `sql.raw()` with user input. |
| **A04** | Insecure Design | **Requires attention** | Rate limiting on AI parse endpoint. Input validation with Zod at every boundary. |
| **A05** | Security Misconfiguration | **Requires attention** | Add security headers in `next.config.ts`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`. |
| **A06** | Vulnerable Components | **Ongoing** | `pnpm audit` before every deploy. Renovate for automated updates. |
| **A07** | Auth Failures | **Mitigated by Auth.js** | Strong `AUTH_SECRET` (32+ chars). Appropriate session maxAge (30 days). |
| **A08** | Software/Data Integrity | **Low risk** | pnpm lock file committed. Vercel builds from Git. |
| **A09** | Logging & Monitoring | **Needs implementation** | Log auth events, parse attempts (without full pasted text). Structured logging with `pino`. |
| **A10** | SSRF | **N/A for MVP** | No server-side URL fetching. If recipe URL preview is added later, SSRF becomes relevant. |

### 3.3 User-Generated Content (Pasted Text) Risks

| Risk | Mitigation |
|------|------------|
| Stored XSS | React JSX escaping by default. Never `dangerouslySetInnerHTML`. |
| URL injection | Validate `sourceUrl` with Zod: `z.string().url()` — reject `javascript:`, `data:` schemes. |
| Oversized input | 5000 char client-side limit + server-side validation before Claude API. |
| Image upload (if enabled) | Validate MIME type (`image/jpeg`, `image/png`, `image/webp`), max 10 MB, generate random UUID filename, store in R2/S3. |

---

## 4. Effort Estimates (T-Shirt Sizing)

**Assumptions**: Solo developer, familiar with Next.js and TypeScript, new to Auth.js v5 and Turso/Drizzle. Includes testing and basic error handling.

| Feature | Size | Estimated Days | Dependencies | Notes |
|---------|------|---------------|-------------|-------|
| **Project scaffolding** | S | 1-2 | None | Next.js 15, Tailwind, shadcn/ui, Drizzle, Turso, Vercel |
| **F6: Google OAuth** | M | 2-3 | Scaffolding | Auth.js v5 + Drizzle adapter + middleware. Start early. |
| **F2: Recipe CRUD** | S | 2-3 | Auth, Schema | Multi-table writes for ingredients/steps. Dual image URL columns. |
| **F3: Source Attribution** | S | 0.5-1 | Recipe CRUD | Display only. |
| **F1: AI Recipe Import** | L | 4-6 | Auth, Recipe CRUD | Prompt engineering, Claude API, Zod validation, dual image upload UI, error states. |
| **F4: Cookbook Organization** | S | 1-2 | Auth, Recipe CRUD | Junction table CRUD. |
| **F5: Tags & Search** | M | 2-3 | Recipe CRUD, Tags | SQL query composition, tag filter chips with counts, URL state (nuqs). |
| **F8: Meal Planning** | M | 3-4 | Auth, Recipe CRUD | New tables, weekly calendar UI, recipe picker sheet, grocery list generation from plan. |
| **F7: Grocery List Generation** | M | 3-4 | Recipe CRUD, Meal Plans | Multi-entry-point creation, ingredient combination, shopping UI. |
| **Polish, testing, deploy** | M | 2-3 | All features | Error boundaries, mobile responsiveness, production deploy. |
| **TOTAL** | — | **~22-34 days** | — | 5-7 weeks for a solo developer working full-time. |

_(Increased from 18-27 in v1.0 to account for Meal Planning addition.)_

---

## 5. Architecture Recommendations

### 5.1 Data Model

| Concern | Recommendation |
|---------|---------------|
| **Dual images (imageUrl / recipeImageUrl)** | Both are nullable URL columns. For MVP, accept user-provided URLs or skip file uploads entirely. When file upload ships, store in R2/S3, save the CDN URL in the column. Do not store binary in Turso. |
| **Soft deletes** | Add `deletedAt` to `recipe`, `cookbook`, `grocery_list`, `meal_plan`. Filter with `WHERE deletedAt IS NULL` in all queries. |
| **Indexes** | Required on all FK columns + searchable fields. Without indexes, queries degrade past ~10k rows. |
| **Auth.js tables** | Extend Auth.js's `user` table rather than creating a parallel table. |
| **Duplicate detection** | Deferred to v2. Show recently added recipes prominently for user self-detection. |

### 5.2 API Design

| Concern | Recommendation |
|---------|---------------|
| **Server Actions vs. API Routes** | Server Actions for all mutations. React Server Components for reads. API Routes only for public API (not in MVP). |
| **Claude API call location** | Server Action only. Never in client components. |
| **Zod schemas** | Three schemas: (1) input validation, (2) Claude response validation, (3) DB write validation. |
| **Error handling** | Server Actions return `{ success: true, data: T } \| { success: false, error: string }`. Never expose stack traces to client. |
| **Meal plan mutations** | `assignRecipeToDay(mealPlanId, dayOfWeek, recipeId)` upserts the `meal_plan_day` row. `removeRecipeFromDay(mealPlanId, dayOfWeek)` sets `recipeId = null`. |

### 5.3 Tech Stack

| Topic | Assessment |
|-------|-----------|
| **Turso (SQLite edge)** | Good for MVP. Free tier (9 GB, 25M row reads/month) is sufficient. No native FTS — use FTS5 extension if needed in v2. |
| **Drizzle ORM** | Type-safe, lightweight, excellent SQLite support. Migrations via `drizzle-kit`. |
| **Next.js 15 App Router** | Stable. Server Components reduce bundle. Server Actions simplify the API layer. |
| **Tailwind v4** | Verify shadcn/ui compatibility. Fall back to v3 if friction > 2 hours. |
| **Claude model** | Benchmark `claude-haiku-4-5` vs `claude-sonnet-4-6`. Use Haiku if ≥85% accuracy — ~10-20x cheaper. |

### 5.4 Recommended Build Order

```
Sprint 1 (Foundation):     Scaffolding → F6 Auth → Drizzle schema + migrations
Sprint 2 (Core):           F2 Recipe CRUD → F3 Source Attribution → F1 AI Import
Sprint 3 (Organization):   F4 Cookbooks → F5 Tags & Search → F8 Meal Planning
Sprint 4 (Grocery + Ship): F7 Grocery Lists → Polish → Production deploy
```

### 5.5 Decisions Requiring Human Sign-Off

| Decision | Options | Recommendation |
|----------|---------|---------------|
| **Tailwind v3 vs. v4** | v4 newer but shadcn compatibility risk | Spike first; fall back to v3 if >2 hours friction |
| **Claude model** | Haiku (cheap, fast) vs. Sonnet (accurate) | Benchmark; Haiku if ≥85% accuracy |
| **Session strategy** | JWT vs. database sessions | JWT for MVP |
| **Image uploads in MVP** | Accept URLs only vs. implement file upload | URL-only for MVP; R2 upload in v2 |
| **Meal plan: one meal vs. multiple per day** | One (MVP) vs. breakfast + dinner | One per day for MVP; multiple in v2 |

---

## 6. Summary

**Overall Feasibility**: **Go** — all proposed features are technically achievable with the specified stack. No architectural showstoppers.

**Primary Risks**:
1. **Claude API parsing accuracy** (High) — mitigated by user review before save, prompt iteration, Zod validation
2. **Auth.js v5 configuration** (Medium) — mitigated by early implementation and isolated testing
3. **Ingredient quantity combination** (Medium) — mitigated by deferring unit normalization to v2

**Key Security Actions Before Launch**:
- [ ] Verify Claude API key is never in client bundle (`next build` + search for `sk-ant-`)
- [ ] Verify every Server Action checks `session.user.id` ownership (including meal_plan and meal_plan_day)
- [ ] Add rate limiting to AI parse endpoint
- [ ] Configure security headers in `next.config.ts`
- [ ] `pnpm audit` — zero critical vulnerabilities
- [ ] IDOR test: sign in as User A, attempt to access User B's recipes, cookbooks, and meal plans

---

**Assessed By**: PM OS Engineering Partner
**PRD Reference**: `execution/RECIPE_recipe-tracker/2026-02-24_PRD_Recipe-Tracker-MVP_v1.1.md`
