# ADR-006: Web Development Standards for PM OS Product Development

**Date**: 2026-02-22
**Status**: Accepted
**Deciders**: Human PM + PM OS Orchestrator
**Phase**: 8 (Enterprise Readiness)

---

## Context

PM OS produces planning artifacts (PRDs, prototypes, specs) but has never been used to build and ship a real web application. The first product project — a family recipe tracker — exposed two gaps:

1. **`identity/STANDARDS.md` was an uncustomized template**: All sections contained placeholder text (`[Define YOUR...]`). PM OS agents had no concrete tech stack or quality standards to validate against. The concrete reference standards live in `pm-os-reference/identity/STANDARDS.md`; `identity/STANDARDS.md` remains a customizable template.
2. **No integrated implementation workflow**: PM OS had skills for strategy and planning but no structured path from spec to working code. Anthropic marketplace plugins fill this gap as a third capability layer alongside skills and MCPs.

This ADR establishes production-grade development standards, tooling choices, and the integrated PM OS workflow from strategy through shipping.

---

## Decision

### 1. Tech Stack Selection

Adopt a modern, TypeScript-first web stack optimized for solo/small-team development with AI assistance:

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 15 (App Router) | SSR, Server Actions, API routes, Vercel-native deployment |
| Language | TypeScript (strict) | End-to-end type safety |
| Styling | Tailwind CSS v4 | Utility-first, pairs well with AI-generated code |
| Components | shadcn/ui (Radix) | Own the code, accessible (WCAG AA), zero runtime cost |
| Database | Turso (SQLite edge) | SQLite simplicity + edge replication + generous free tier |
| ORM | Drizzle ORM | Best Turso/SQLite support, smallest bundle, SQL-like API |
| Auth | Auth.js v5 | Free, App Router native, multi-provider |
| AI | Claude API (Anthropic SDK) | AI features; already in the ecosystem |
| Package Manager | pnpm | Strict resolution, fast, disk-efficient |
| Linter/Formatter | Biome | Replaces ESLint + Prettier; single Rust-based tool |
| Deployment | Vercel | Automatic CI/CD, preview deploys |

**Rejected alternatives**:
- PostgreSQL/Supabase: More powerful but unnecessary complexity for initial projects; Turso's SQLite model is simpler and cheaper
- tRPC: Adds a layer; Server Actions provide type-safe mutations natively
- Prisma: Larger bundle, slower cold starts than Drizzle for serverless
- Docker: Vercel + Turso = fully managed; Docker adds complexity with no benefit

### 2. Claude Code Plugin Stack (Integrated into PM OS)

Seven Anthropic marketplace plugins extend PM OS with implementation capabilities, forming a third layer alongside skills and MCPs:

| Plugin | Purpose | PM OS Complement |
|--------|---------|-----------------|
| `feature-dev` | 7-phase structured implementation | `/feature-pipeline` plans; `feature-dev` builds |
| `frontend-design` | Production-grade UI quality | `/ux-strategist` prototypes; this enforces quality |
| `code-review` | 5 parallel review agents | `/engineering-partner` pre-impl; this post-impl |
| `security-guidance` | Real-time security monitoring | `/engineering-partner` STRIDE/OWASP at planning |
| `commit-commands` | Git commit/push/PR automation | Streamlines git ops |
| `pr-review-toolkit` | 6 specialized PR review agents | Deep pre-merge quality gate |
| `typescript-lsp` | Type checking, go-to-definition | Essential for TypeScript |

**Skipped**: `hookify` (solo dev, direct hooks simpler), `plugin-dev` (not building custom plugins), `explanatory-output-style` (token overhead).

### 3. Separate Repository Strategy

- **PM OS repo**: Strategy, planning, artifacts in `execution/[JIRA-KEY]_[slug]/`
- **Product repo**: Source code, tests, CI/CD — completely independent

Cross-referencing is convention-based (lightweight, no tooling):
- PM OS PRD metadata includes `Repository: github.com/[user]/[repo]`
- Product repo `.claude/CLAUDE.md` references PM OS execution folder
- Branch/commit names include Jira keys

### 4. Testing Strategy

TDD workflow with a testing pyramid:

| Layer | Tool | Coverage Target |
|-------|------|----------------|
| Unit | Vitest | 80%+ for `lib/`, `db/queries/`, `actions/` |
| Component | Vitest + React Testing Library | Key interactive components |
| E2E | Playwright | 5-8 critical user paths |

### 5. CI/CD Pipeline

- GitHub Actions: type check → lint → unit/component tests → E2E
- Vercel: preview deploys on PR, production on merge to `main`
- Pre-push hook: `pnpm tsc --noEmit && pnpm biome check . && pnpm test`

---

## Changes Made

| File | Change |
|------|--------|
| `identity/STANDARDS.md` | Full rewrite: replaced all template placeholders with concrete tech stack, security requirements, quality gates, testing strategy, and workflow conventions |
| `.claude/CLAUDE.md` | Added Web Product Development section explaining separate repo strategy, plugin stack, and PM OS → product repo workflow |
| `templates/web_project_claudemd_template.md` | New: reusable `.claude/CLAUDE.md` template for product repos |

---

## Consequences

### Positive

- PM OS agents now have concrete standards to validate against — no more placeholder text
- Clear workflow from PM OS planning artifacts to product repo implementation
- Plugin selection is documented and justified; future projects reuse the same stack
- Testing strategy and CI/CD pipeline are defined before the first line of product code
- `identity/STANDARDS.md` serves as the single source of truth for tech decisions

### Negative / Trade-offs

- **Stack is opinionated**: Projects with different requirements (e.g., mobile app, Python backend) will need to customize `STANDARDS.md` — but that's the intended use
- **Plugin dependency**: Relies on Anthropic marketplace plugins being maintained and available
- **Turso lock-in**: SQLite edge is less common than PostgreSQL; migration to Postgres would require schema/query changes (mitigated by Drizzle's multi-dialect support)

### Neutral

- PM OS's own development (Mode B) is unaffected — these standards apply to Mode A product work
- The recipe tracker will be the first validation of these standards; expect refinements after Phase C/D

---

## Alternatives Considered

1. **Monorepo (PM OS + product code)**: Rejected — PM OS is a planning system, not a codebase; mixing them conflates concerns and complicates CI/CD
2. **No plugin stack**: Rejected — plugins provide structured implementation workflow that complements PM OS planning; without them, the gap between artifact and code remains
3. **Heavier stack (Prisma, tRPC, Docker)**: Rejected — adds complexity without proportional benefit for solo/small-team projects
4. **Keep STANDARDS.md as template**: Rejected — agents cannot validate against placeholder text; concrete standards are required for Mode A work

---

## References

- Plan: Web Development Standards for PM OS Product Development (planning session 2026-02-22)
- ADR-005: Project-Centric execution/ Structure (2026-02-22)
- PM OS Phase 8 scope: Enterprise Readiness (multi-user Git, security hardening, web prototype)
