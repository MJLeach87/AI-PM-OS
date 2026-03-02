# Metrics Validation: Recipe Tracker MVP

**Date**: 2026-02-24
**Analyst**: PM OS Data Analyst
**PRD Version**: 1.1
**Project**: RECIPE_recipe-tracker
**Tech Stack**: Turso (SQLite edge), Drizzle ORM, Next.js 15 Server Actions

**Changes from v1.0**:
- Feature 8 (Meal Planning) added: new metric S2.5 (Meal Plan Creation Rate), new events taxonomy section, WAU query updated
- Collections replaced by Tags — no metric impact (cookbook creation rate metric unchanged; tag counts now tracked like cookbook counts)
- `recipeImageUrl` addition — new `parse_source_image_uploaded` event added
- All recommendations from v1.0 were incorporated into PRD v1.1 schema

---

## Executive Summary

The PRD v1.1 defines 4 primary and 5 secondary success metrics. The data model (14 tables, including `parse_attempts` and `events`) can support all metrics once `events` and `parse_attempts` tables are in place. This document provides the metric feasibility assessment, baseline SQL queries, event taxonomy, and dashboard recommendations.

**Key change from v1.0**: The schema additions recommended in v1.0 (events table, parse_attempts table, recipe.parsedAt, recipe.sourceConfidence, recipe.parseAttemptId) are now in the PRD v1.1 data model. The v1.1 baseline is ready for implementation.

---

## 1. PRD Metric Feasibility

### 1.1 Primary Metrics

#### P1: AI Parse Success Rate

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Non-error responses / total parse attempts; >90% target |
| **Measurable?** | Yes — `parse_attempts` table tracks status, confidence, duration per attempt |
| **Query** | See Q1 below |
| **Blind spots** | "Accurate" parse is proxied by user not editing within 5 min of save. True accuracy requires human eval of a sample. |
| **Verdict** | **MEASURABLE** |

#### P2: Recipes Saved per User per Week

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Count of saved recipes per active user per week; target >3/user/week |
| **Measurable?** | Yes — `recipe.userId` + `recipe.createdAt` |
| **Blind spots** | Bulk import (one paste → 10 recipes) inflates metric. Track separately by `source_type = 'bulk'` in `parse_attempts`. |
| **Verdict** | **MEASURABLE** |

#### P3: Weekly Active Users (WAU)

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Action-based: distinct users with any write action in past 7 days; target 50 WAU within 60 days |
| **Measurable?** | Yes — derivable from recipe, cookbook, grocery_list, meal_plan creation timestamps |
| **Query** | See Q3 below |
| **Verdict** | **MEASURABLE** |

#### P4: Grocery List Generation Rate

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Users who create grocery lists / WAU; target >30% after 60 days |
| **Measurable?** | Yes — `grocery_list.userId` + `grocery_list.createdAt` / WAU |
| **Verdict** | **MEASURABLE** |

---

### 1.2 Secondary Metrics

#### S1: Recipe Edit Rate Post-Parse

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Recipes edited within 5 min of parse / total parses; target <40% |
| **Measurable?** | Yes — join `parse_attempts.createdAt` to `events` where `event_name = 'recipe_edited'` and `created_at < parse + 5 min` |
| **Tables needed** | `parse_attempts`, `events` |
| **Verdict** | **MEASURABLE** with events table |

#### S2: Cookbook Creation Rate

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Users with ≥1 cookbook / total registered users; target >50% |
| **Measurable?** | Yes — `cookbook.userId` joined to `user.id` |
| **Verdict** | **MEASURABLE** |

#### S2.5: Meal Plan Creation Rate *(New in v1.1)*

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Users who create ≥1 meal plan per month / WAU; target >20% after 60 days |
| **Measurable?** | Yes — `meal_plan.userId` + `meal_plan.createdAt` / WAU |
| **Baseline** | 0 at launch (new feature). Monitor from first week. Users need 10+ recipes before Meal Plans are useful — set 60-day evaluation window. |
| **Verdict** | **MEASURABLE** |

#### S3: Multi-Device Usage

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | % of users who access from 2+ device types per week; target >20% |
| **Measurable?** | Yes — `events.device_type` + `events.user_id` windowed by week |
| **Note** | Redefined from "per household" to "per user" — household concept has no data model representation in MVP |
| **Verdict** | **MEASURABLE** with events table |

#### S4: Time to First Recipe

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | Median time from OAuth to first saved recipe; target <3 minutes |
| **Measurable?** | Yes — `user.createdAt` vs `MIN(recipe.createdAt)` per user |
| **Verdict** | **MEASURABLE** |

#### S5: Day 7 / Day 30 Retention

| Dimension | Assessment |
|-----------|------------|
| **PRD Definition** | % of sign-up cohort active N days later; D7 >40%, D30 >20% |
| **Measurable?** | Yes — cohort retention query (see Q5 below) |
| **Verdict** | **MEASURABLE** |

---

### 1.3 Feasibility Summary

| Metric | Type | Measurable? | Required Tables |
|--------|------|-------------|----------------|
| AI Parse Success Rate | Primary | ✅ Yes | `parse_attempts` |
| Recipes Saved/User/Week | Primary | ✅ Yes | `recipe` |
| Weekly Active Users | Primary | ✅ Yes | `recipe`, `cookbook`, `grocery_list`, `meal_plan` |
| Grocery List Generation Rate | Primary | ✅ Yes | `grocery_list` + WAU |
| Recipe Edit Rate Post-Parse | Secondary | ✅ Yes | `parse_attempts` + `events` |
| Cookbook Creation Rate | Secondary | ✅ Yes | `cookbook` |
| Meal Plan Creation Rate | Secondary | ✅ Yes | `meal_plan` |
| Multi-Device Usage | Secondary | ✅ Yes | `events` (device_type) |
| Time to First Recipe | Secondary | ✅ Yes | `user` + `recipe` |
| D7 / D30 Retention | Secondary | ✅ Yes | `user` + action tables |

**Score**: 10 of 10 metrics measurable once `events` + `parse_attempts` tables are implemented. Significant improvement over v1.0 (3 of 8 fully measurable).

---

## 2. Baseline Queries

All queries are SQLite-compatible (Turso). Assumes the PRD v1.1 schema is implemented.

### Q1: AI Parse Success Rate

```sql
-- AI Parse Success Rate (weekly)
-- Expected rows: 1 (aggregate)

SELECT
    COUNT(*) AS total_parses,
    SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS successful_parses,
    SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failed_parses,
    ROUND(
        CAST(SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS REAL)
        / NULLIF(COUNT(*), 0) * 100, 1
    ) AS success_rate_pct,
    SUM(CASE WHEN confidence = 'high' THEN 1 ELSE 0 END) AS high_confidence,
    SUM(CASE WHEN confidence = 'medium' THEN 1 ELSE 0 END) AS medium_confidence,
    SUM(CASE WHEN confidence = 'low' THEN 1 ELSE 0 END) AS low_confidence,
    ROUND(AVG(parse_duration_ms), 0) AS avg_parse_ms
FROM parse_attempts
WHERE created_at >= DATE('now', '-7 days');
```

```sql
-- Parse success by source type (monthly)
-- Expected rows: ~5-6 (one per source_type)

SELECT
    source_type,
    COUNT(*) AS total_parses,
    SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS successes,
    ROUND(CAST(SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS REAL) / NULLIF(COUNT(*), 0) * 100, 1) AS success_rate_pct,
    ROUND(AVG(input_text_length), 0) AS avg_input_length,
    ROUND(AVG(parse_duration_ms), 0) AS avg_parse_ms
FROM parse_attempts
WHERE created_at >= DATE('now', '-30 days')
GROUP BY source_type
ORDER BY total_parses DESC;
```

### Q2: Recipes Saved per User per Week

```sql
-- Recipes saved per active user per week (rolling 4 weeks)
-- Expected rows: ~4

WITH weekly_counts AS (
    SELECT
        r.user_id,
        DATE(r.created_at, 'weekday 0', '-6 days') AS week_start,
        COUNT(*) AS recipes_saved
    FROM recipe r
    WHERE r.created_at >= DATE('now', '-28 days')
      AND r.deleted_at IS NULL
    GROUP BY r.user_id, week_start
)
SELECT
    week_start,
    COUNT(DISTINCT user_id) AS active_users,
    SUM(recipes_saved) AS total_recipes,
    ROUND(CAST(SUM(recipes_saved) AS REAL) / NULLIF(COUNT(DISTINCT user_id), 0), 1) AS avg_recipes_per_user
FROM weekly_counts
GROUP BY week_start
ORDER BY week_start DESC;
```

### Q3: Weekly Active Users (WAU)

```sql
-- WAU (action-based): distinct users with any write action in past 7 days
-- Updated in v1.1 to include meal_plan creation
-- Expected rows: 1

SELECT COUNT(DISTINCT user_id) AS weekly_active_users
FROM (
    SELECT user_id FROM recipe
    WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
    UNION
    SELECT user_id FROM cookbook
    WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
    UNION
    SELECT user_id FROM grocery_list
    WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
    UNION
    SELECT user_id FROM meal_plan
    WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
) AS active_users;
```

```sql
-- WAU trend (rolling 8 weeks)
-- Expected rows: 8

WITH weeks AS (
    SELECT DATE('now', '-' || (n * 7) || ' days') AS week_end,
           DATE('now', '-' || ((n + 1) * 7) || ' days') AS week_start
    FROM (
        SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3
        UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
    )
),
all_actions AS (
    SELECT user_id, created_at FROM recipe WHERE deleted_at IS NULL
    UNION ALL SELECT user_id, created_at FROM cookbook WHERE deleted_at IS NULL
    UNION ALL SELECT user_id, created_at FROM grocery_list WHERE deleted_at IS NULL
    UNION ALL SELECT user_id, created_at FROM meal_plan WHERE deleted_at IS NULL
)
SELECT
    w.week_start,
    w.week_end,
    COUNT(DISTINCT a.user_id) AS wau
FROM weeks w
LEFT JOIN all_actions a ON a.created_at >= w.week_start AND a.created_at < w.week_end
GROUP BY w.week_start, w.week_end
ORDER BY w.week_start DESC;
```

### Q4: Grocery List Generation Rate

```sql
-- % of WAU who created a grocery list this week
-- Expected rows: 1

WITH wau AS (
    SELECT DISTINCT user_id FROM (
        SELECT user_id FROM recipe WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
        UNION
        SELECT user_id FROM cookbook WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
        UNION
        SELECT user_id FROM grocery_list WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
        UNION
        SELECT user_id FROM meal_plan WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
    )
),
grocery_users AS (
    SELECT DISTINCT user_id FROM grocery_list
    WHERE created_at >= DATE('now', '-7 days') AND deleted_at IS NULL
)
SELECT
    (SELECT COUNT(*) FROM wau) AS total_wau,
    (SELECT COUNT(*) FROM grocery_users) AS grocery_list_users,
    ROUND(CAST((SELECT COUNT(*) FROM grocery_users) AS REAL) / NULLIF((SELECT COUNT(*) FROM wau), 0) * 100, 1) AS grocery_list_rate_pct;
```

### Q4.5: Meal Plan Creation Rate *(New)*

```sql
-- % of WAU who created a meal plan this month
-- Expected rows: 1

WITH monthly_wau AS (
    SELECT DISTINCT user_id FROM (
        SELECT user_id FROM recipe WHERE created_at >= DATE('now', '-30 days') AND deleted_at IS NULL
        UNION
        SELECT user_id FROM cookbook WHERE created_at >= DATE('now', '-30 days') AND deleted_at IS NULL
        UNION
        SELECT user_id FROM grocery_list WHERE created_at >= DATE('now', '-30 days') AND deleted_at IS NULL
        UNION
        SELECT user_id FROM meal_plan WHERE created_at >= DATE('now', '-30 days') AND deleted_at IS NULL
    )
),
meal_plan_users AS (
    SELECT DISTINCT user_id FROM meal_plan
    WHERE created_at >= DATE('now', '-30 days') AND deleted_at IS NULL
)
SELECT
    (SELECT COUNT(*) FROM monthly_wau) AS monthly_wau,
    (SELECT COUNT(*) FROM meal_plan_users) AS meal_plan_users,
    ROUND(CAST((SELECT COUNT(*) FROM meal_plan_users) AS REAL) / NULLIF((SELECT COUNT(*) FROM monthly_wau), 0) * 100, 1) AS meal_plan_creation_rate_pct;
```

### Q5: Cohort Retention (D7 / D30)

```sql
-- Cohort retention: % of sign-up cohort active N days later
-- Expected rows: cohort_count × retention_windows

WITH user_cohorts AS (
    SELECT
        id AS user_id,
        DATE(created_at, 'weekday 0', '-6 days') AS cohort_week
    FROM user
),
user_activity AS (
    SELECT DISTINCT user_id, DATE(created_at, 'weekday 0', '-6 days') AS activity_week
    FROM (
        SELECT user_id, created_at FROM recipe WHERE deleted_at IS NULL
        UNION ALL SELECT user_id, created_at FROM cookbook WHERE deleted_at IS NULL
        UNION ALL SELECT user_id, created_at FROM grocery_list WHERE deleted_at IS NULL
        UNION ALL SELECT user_id, created_at FROM meal_plan WHERE deleted_at IS NULL
    )
)
SELECT
    uc.cohort_week,
    CAST((JULIANDAY(ua.activity_week) - JULIANDAY(uc.cohort_week)) / 7 AS INTEGER) AS weeks_since_signup,
    COUNT(DISTINCT uc.user_id) AS active_users,
    (SELECT COUNT(DISTINCT user_id) FROM user_cohorts WHERE cohort_week = uc.cohort_week) AS cohort_size,
    ROUND(CAST(COUNT(DISTINCT uc.user_id) AS REAL) / (SELECT COUNT(DISTINCT user_id) FROM user_cohorts WHERE cohort_week = uc.cohort_week) * 100, 1) AS retention_pct
FROM user_cohorts uc
JOIN user_activity ua ON uc.user_id = ua.user_id
WHERE CAST((JULIANDAY(ua.activity_week) - JULIANDAY(uc.cohort_week)) / 7 AS INTEGER) BETWEEN 0 AND 8
GROUP BY uc.cohort_week, weeks_since_signup
ORDER BY uc.cohort_week DESC, weeks_since_signup ASC;
```

---

## 3. Instrumentation Plan

### 3.1 Events Table Schema

```sql
CREATE TABLE events (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    event_name  TEXT NOT NULL,
    properties  TEXT,          -- JSON string
    session_id  TEXT,
    device_type TEXT,          -- 'mobile' | 'tablet' | 'desktop'
    user_agent  TEXT,
    page_path   TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_events_user_id ON events(user_id);
CREATE INDEX idx_events_event_name ON events(event_name);
CREATE INDEX idx_events_user_event_time ON events(user_id, event_name, created_at);
```

### 3.2 Parse Attempts Table Schema

```sql
CREATE TABLE parse_attempts (
    id                TEXT PRIMARY KEY,
    user_id           TEXT NOT NULL,
    recipe_id         TEXT,
    status            TEXT NOT NULL,     -- 'success' | 'failed' | 'partial'
    confidence        TEXT,              -- 'high' | 'medium' | 'low'
    source_type       TEXT,              -- 'instagram' | 'cookbook' | 'website' | 'family' | 'idea' | 'bulk'
    input_text_length INTEGER NOT NULL,
    fields_extracted  TEXT,              -- JSON array
    fields_missing    TEXT,              -- JSON array
    parse_duration_ms INTEGER,
    error_message     TEXT,
    created_at        TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE SET NULL
);
CREATE INDEX idx_parse_attempts_user ON parse_attempts(user_id);
CREATE INDEX idx_parse_attempts_created ON parse_attempts(created_at);
CREATE INDEX idx_parse_attempts_status ON parse_attempts(status);
```

### 3.3 Event Taxonomy

#### Authentication Events

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `user_signed_up` | `{ provider: "google" }` | P0 |
| `user_signed_in` | `{ provider: "google" }` | P0 |
| `user_signed_out` | `{}` | P1 |

#### Recipe Parsing Events

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `recipe_parse_attempted` | `{ input_length, source_type }` | P0 |
| `recipe_parse_succeeded` | `{ recipe_id, confidence, fields_extracted, parse_duration_ms }` | P0 |
| `recipe_parse_failed` | `{ error_type, input_length }` | P0 |
| `recipe_bulk_parse_attempted` | `{ item_count }` | P1 |
| `parse_source_image_uploaded` | `{ source_type: "cookbook", file_size_kb }` | P2 |

#### Recipe CRUD Events

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `recipe_created` | `{ recipe_id, source_type, was_parsed, has_dish_photo, has_recipe_image }` | P0 |
| `recipe_viewed` | `{ recipe_id }` | P1 |
| `recipe_edited` | `{ recipe_id, fields_changed: [] }` | P0 |
| `recipe_deleted` | `{ recipe_id }` | P1 |

#### Cookbook Events

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `cookbook_created` | `{ cookbook_id }` | P0 |
| `cookbook_recipe_added` | `{ cookbook_id, recipe_id }` | P1 |
| `cookbook_recipe_removed` | `{ cookbook_id, recipe_id }` | P2 |

#### Meal Plan Events *(New in v1.1)*

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `meal_plan_created` | `{ meal_plan_id, week_start_date }` | P0 |
| `meal_plan_recipe_assigned` | `{ meal_plan_id, day_of_week, recipe_id }` | P0 |
| `meal_plan_recipe_removed` | `{ meal_plan_id, day_of_week }` | P1 |
| `meal_plan_grocery_generated` | `{ meal_plan_id, grocery_list_id, recipes_included }` | P0 |

#### Grocery List Events

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `grocery_list_created` | `{ grocery_list_id, recipe_count, item_count, source: 'meal_plan' \| 'recipe_detail' \| 'manual' }` | P0 |
| `grocery_item_checked` | `{ grocery_list_id, item_id }` | P1 |
| `grocery_item_added_manually` | `{ grocery_list_id }` | P2 |
| `grocery_list_completed` | `{ grocery_list_id, items_checked, items_total }` | P2 |

#### Search & Filter Events

| Event Name | Properties | Priority |
|------------|-----------|----------|
| `search_performed` | `{ query_length, result_count, filter_active }` | P1 |
| `tag_filter_applied` | `{ tag_name, result_count }` | P1 |

### 3.4 Implementation Pattern

```typescript
// src/lib/analytics.ts
import { db } from '@/db';
import { events } from '@/db/schema/events';
import { createId } from '@paralleldrive/cuid2';
import { headers } from 'next/headers';

export async function trackEvent({
  userId, eventName, properties, sessionId,
}: { userId: string; eventName: string; properties?: Record<string, unknown>; sessionId?: string; }): Promise<void> {
  const headersList = await headers();
  const ua = headersList.get('user-agent') ?? '';
  const deviceType = /mobile/i.test(ua) ? 'mobile' : /tablet|ipad/i.test(ua) ? 'tablet' : 'desktop';

  // Fire-and-forget — analytics must never block the app
  db.insert(events).values({
    id: createId(), userId, eventName,
    properties: properties ? JSON.stringify(properties) : null,
    sessionId, deviceType, userAgent: ua,
    createdAt: new Date().toISOString(),
  }).execute().catch(err => console.error('[analytics] Failed to track:', eventName, err));
}
```

---

## 4. Analytics Dashboard Recommendations

### Launch Dashboard (8 charts for first 60 days)

| Chart | Type | Metric | Why |
|-------|------|--------|-----|
| 1 | Line | WAU trend with 50/100 target lines | Single most important growth indicator |
| 2 | Stacked bar | Parse attempts by status (success/partial/failed) + success rate overlay | Core differentiator health |
| 3 | Histogram | Recipes saved per user distribution (0, 1, 2, 3+) | Shows healthy vs. dormant user distribution |
| 4 | Horizontal funnel | Sign Up → First Parse → First Recipe → First Cookbook → First Meal Plan → First Grocery List | Onboarding drop-off analysis |
| 5 | KPI card + sparkline | Grocery list generation rate (%) vs. 30% target | Validates shopping use case |
| 6 | KPI card + sparkline | Meal plan creation rate (%) vs. 20% target | Validates planning use case |
| 7 | Donut | Parse confidence distribution (high/medium/low) | Leading AI quality indicator |
| 8 | Heatmap | Cohort retention by week (D7, D14, D30) | Long-term product health |

---

## 5. Recommendations

All recommendations from v1.0 have been incorporated into PRD v1.1. Remaining action items for implementation:

1. **Implement `events` and `parse_attempts` tables in Sprint 1** alongside the core schema. Without these, 5+ metrics are unmeasurable at launch.

2. **Track `meal_plan_grocery_generated` source on `grocery_list.createdAt`**: Add a `source` column to `grocery_list` (`'meal_plan' | 'recipe_detail' | 'manual'`) to distinguish how grocery lists are created. This informs whether Meal Planning drives grocery behavior.

3. **Use action-based WAU** (no session infrastructure needed for MVP). If session-level analytics are needed later, add `session_id` propagation via cookies.

4. **Set event retention policy**: Archive events older than 90 days to pre-aggregated daily summary tables. Raw Turso storage at scale (1K WAU × 10 events/day × 90 days = 900K rows) is manageable but should be monitored.

5. **Meal Plan creation requires recipe library**: Monitor the P50 recipe count at time of first meal plan creation. If users create meal plans with <5 recipes, the recipe picker is important to nail. If users wait until 20+ recipes, onboarding to meal plans should be delayed.

---

**Artifact**: `2026-02-24_MetricsValidation_Recipe-Tracker-MVP.md`
**Project**: RECIPE_recipe-tracker
**Status**: Complete — ready for implementation
