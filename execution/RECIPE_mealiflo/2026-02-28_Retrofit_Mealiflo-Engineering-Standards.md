# Mealiflo Retrofit — Engineering Standards Alignment

**Created**: 2026-02-28
**Source**: Full Stack PM `identity/STANDARDS.md` + `templates/configs/web/`
**Priority**: P0 before next feature, P1 next sprint, P2 after first public user

---

## P0 — Before Next Feature

### 1. Zod Input Validation
- `pnpm add zod`
- Create `src/lib/validators.ts` with schemas for all Server Action inputs
- Three schemas per AI endpoint: input validation, AI response validation, DB write validation
- Wrap every Server Action with Zod `.parse()` at the boundary

### 2. Security Headers
- Copy security headers from `templates/configs/web/next.config.ts` into `next.config.ts`
- Customize CSP: add Turso domain, Anthropic API, Vertex AI, Google Books, Vercel Blob
- Add image domains for Vercel Blob storage

### 3. Install Vitest + React Testing Library
```bash
pnpm add -D vitest @vitejs/plugin-react vite-tsconfig-paths @testing-library/react @testing-library/user-event jsdom @vitest/coverage-v8
```

### 4. Vitest Configuration
- Copy `templates/configs/web/vitest.config.ts` to project root
- Copy `templates/testing/test-setup.ts` to `src/test/setup.ts`
- Add to package.json: `"test": "vitest run --coverage"`, `"test:watch": "vitest"`

### 5. Install Playwright
```bash
pnpm create playwright
```
- Replace generated config with `templates/configs/web/playwright.config.ts`
- Add to package.json: `"test:e2e": "playwright test"`

### 6. GitHub Remote + CI
- Create GitHub remote → push initial code
- Copy `templates/configs/web/github/workflows/ci.yml` to `.github/workflows/ci.yml`
- Customize: remove `if: false` from E2E job when ready
- Push CI workflow

### 7. Project README
- Use `templates/project_readme_template.md` as base
- Pre-fill: MealiFlo description, all features from PRD, 14-table data model, AI services (Claude, Imagen 3, Google Vision, Google Books), env vars

### 8. Update `.claude/CLAUDE.md` to v2
- Use `templates/web_project_claudemd_template.md` as reference
- Add: plugin workflow sequence, component library quick-ref, AI services section, Vercel deployment notes, README maintenance reminder

---

## P1 — Next Sprint

### 9. Extract Database Queries
- Create `src/db/queries/` directory
- Extract inline Drizzle queries from Server Actions into reusable query functions
- Each query function takes typed params, returns typed results
- Enables unit testing of query logic separately from action logic

### 10. Claude Tool-Use Mode
- Switch all Claude API calls from text-parse to tool-use mode (function calling)
- Eliminate `extractJson` workaround — let Claude return structured output via tools
- Define Zod schemas for tool parameters and validate responses

### 11. AI Call Instrumentation
- Instrument all AI actions to write to `parse_attempt` table
- Log: model, duration_ms, confidence, success, user_id, action_name
- Use for debugging, cost tracking, and quality monitoring

### 12. Rate Limiting
- Add rate limiting to all AI Server Actions
- Sliding window: 10 calls/min/user, 50 calls/day/user (Claude Haiku)
- Key on `session.user.id`
- Return friendly error with retry-after header

---

## P2 — After First Public User

### 13. Error Tracking (Sentry)
```bash
pnpm add @sentry/nextjs
```
- Run Sentry wizard: `pnpm dlx @sentry/wizard@latest -i nextjs`
- Configure: capture Server Action errors, ignore expected auth redirects
- Set up source maps upload in Vercel build

### 14. Analytics + Web Vitals
- Enable Vercel Analytics (free tier) in Vercel dashboard
- Add `@vercel/analytics` and `@vercel/speed-insights` packages
- Track Core Web Vitals: LCP, CLS, TBT

### 15. Lighthouse CI
- Add Lighthouse CI step to `.github/workflows/ci.yml`
- Performance budgets: LCP < 2.5s, CLS < 0.1, TBT < 200ms
- Run against Vercel preview URL on every PR

---

## Verification

- [ ] `pnpm tsc --noEmit` passes after all P0 changes
- [ ] `pnpm biome check .` passes
- [ ] At least one Server Action test runs green
- [ ] Security headers visible in browser dev tools (Network tab → Response Headers)
- [ ] CI workflow runs on push to main
- [ ] README covers all 14 sections from template
