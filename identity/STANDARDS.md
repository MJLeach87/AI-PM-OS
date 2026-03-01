# Full Stack PM — Engineering Standards

**Purpose**: Defines engineering standards for all products built through PM OS. Every skill reads this file in Step 1 — populating it makes the entire system engineering-aware.

**Last Updated**: 2026-02-28
**Next Review**: 2026-04-01 (or after first production deploy)

---

## Platform Profiles

Standards are organized into **shared standards** (apply to all platforms) and **platform profiles** (specific to a deployment target). This architecture allows PM OS to expand beyond web without restructuring.

### Shared Standards (all platforms)

- **Language**: TypeScript (strict mode) — no `any` without justification
- **Package Manager**: pnpm (strict dependency resolution)
- **Linter/Formatter**: Biome (replaces ESLint + Prettier; single Rust-based tool)
- **Testing Philosophy**: TDD, pyramid (unit → component → E2E)
- **Security**: OWASP/STRIDE threat modeling, Zod at all boundaries, no hardcoded secrets
- **AI Services**: Claude API, Imagen 3, Google Cloud Vision (see AI Services Inventory)
- **Accessibility**: WCAG 2.1 Level AA
- **Git Workflow**: Conventional Commits, feature branches, PR process
- **Quality Gates**: type check → lint → test → audit before every merge
- **IDs**: cuid2 (`@paralleldrive/cuid2`) — 25 chars, collision-safe, better for SQLite than UUID

### Profile: Web (Active)

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix primitives) — see Component Library section
- **Database**: Turso (SQLite edge) + Drizzle ORM
- **Auth**: Auth.js v5 (Google OAuth, JWT strategy)
- **State**: React Server Components + nuqs (URL state for filters/search)
- **Deployment**: Vercel (auto CI/CD, preview deploys, edge functions)
- **Storage**: Vercel Blob (CDN-backed image/file storage)
- **Testing**: Vitest + React Testing Library + Playwright
- **Config templates**: `templates/configs/web/`

### Profile: Mobile (Planned)

- **Framework**: [TBD — React Native / Expo]
- **Components**: [TBD — NativeWind / Tamagui]
- **Database**: [TBD — SQLite local + sync]
- **Auth**: [TBD — extends web auth]
- **Deployment**: [TBD — EAS / App Store]
- **Testing**: [TBD — Jest + Detox or Maestro]
- **Config templates**: `templates/configs/mobile/`

### Profile: Agential Development (Planned)

> This section will define standards for building AI agent-powered applications — autonomous workflows, tool-use patterns, agent orchestration, evaluation frameworks, and human-in-the-loop safeguards. Definition coming soon.

- **Agent Framework**: [TBD — Claude Agent SDK / custom orchestration]
- **Tool Use Patterns**: [TBD — function calling, structured output, multi-turn]
- **Evaluation**: [TBD — evals framework, golden datasets, regression testing]
- **Orchestration**: [TBD — single-agent vs multi-agent, handoff patterns]
- **Safety**: [TBD — guardrails, human approval gates, audit logging]
- **Observability**: [TBD — agent trace logging, token usage tracking, decision replay]
- **Config templates**: `templates/configs/agential/`

---

## Brand Voice & Communication

### Writing Principles

- **Clear**: Plain language over jargon; if a simpler word works, use it
- **Evidence-Based**: Cite data, research, or clear reasoning for every decision
- **Concise**: Every word serves a purpose — cut filler, hedging, and redundancy
- **Action-Oriented**: Focus on outcomes and next steps, not process descriptions
- **Technical When Needed**: Use precise terminology for engineering audiences; simplify for stakeholder-facing docs

### Documentation Style

- Use active voice ("The system validates..." not "Validation is performed...")
- Lead with the "why" before the "what"
- Structure with clear headings and bullet points
- Include examples for complex concepts
- Tag references with file:line format (e.g., `src/actions/recipes.ts:47`)
- Use Mermaid for diagrams (architecture, flows, sequences)

---

## Technical Stack — Web Profile

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15+ (App Router) | SSR, Server Actions, Vercel-native |
| Language | TypeScript (strict mode) | No `any` without justification |
| Styling | Tailwind CSS v4 | Utility classes only, no inline styles |
| Components | shadcn/ui (Radix primitives) | See Component Library section |
| Database | Turso (SQLite edge) | Free tier: 9 GB, 25M reads/month |
| ORM | Drizzle ORM | Type-safe, migrations via drizzle-kit |
| Auth | Auth.js v5 | JWT strategy, Google OAuth |
| AI — Language | Claude API (Anthropic SDK) | Tool-use mode for structured output |
| AI — Image Gen | Imagen 3 (Vertex AI) | Food photography, product images |
| AI — OCR | Google Cloud Vision | DOCUMENT_TEXT_DETECTION for photo import |
| AI — Data | Google Books API | Cookbook cover art, metadata |
| State | React Server Components + nuqs | URL params for filters; minimize client state |
| Storage | Vercel Blob | Image/file CDN storage |
| Package Manager | pnpm | Strict dependency resolution |
| Linter/Formatter | Biome | Replaces ESLint + Prettier |
| Testing | Vitest + React Testing Library + Playwright | See Testing section |
| Deployment | Vercel | Auto CI/CD, preview deploys, edge functions |
| IDs | cuid2 (@paralleldrive/cuid2) | 25 chars, better for SQLite than UUID |

---

## Component Library Standard

- **Library**: shadcn/ui built on Radix UI primitives
- **Install**: always via `pnpm dlx shadcn@latest add [component]` — never copy from docs
- **`components/ui/`**: auto-generated by shadcn CLI — DO NOT modify directly
- **Custom components**: create wrappers in `components/[feature]/` that compose ui/ primitives
- **Shared compositions**: `components/shared/` for cross-feature reusables (confirm-dialog, empty-state, search-input)

### Component Selection Guide

| Need | Use | Not |
|------|-----|-----|
| Modal with form | Dialog | Sheet |
| Side panel / filters | Sheet | Dialog |
| Mobile bottom actions | Drawer (Vaul) | Sheet |
| Confirmations | AlertDialog | Dialog |
| Menu actions | DropdownMenu | Select |
| Form field selection | Select or Combobox | DropdownMenu |
| Notifications | Sonner | Custom toast |
| Data display | Table + DataTable | Raw `<table>` |

### Theme & Brand

- All via CSS variables in `globals.css` using `oklch()` — never hardcoded hex/rgb
- Dark mode via `class` strategy
- Brand colors: `bg-primary`, `text-muted-foreground`, etc. — not literal values
- Touch targets: 44x44px minimum

---

## AI Services Inventory

| Service | SDK/API | Use Case | Cost Model | Rate Limits |
|---------|---------|----------|------------|-------------|
| Claude (Haiku 4.5) | `@anthropic-ai/sdk` | Recipe/text parsing, structured extraction | ~$0.001/call | 10/min/user, 50/day/user |
| Claude (Sonnet 4.6) | `@anthropic-ai/sdk` | Complex analysis, multi-step reasoning | ~$0.01/call | Per-task basis |
| Claude Vision | `@anthropic-ai/sdk` | OCR fallback, image understanding | ~$0.005/call | Same as text |
| Imagen 3 | Vertex AI REST (`imagen-3.0-generate-002`) | Food photography, product images | ~$0.04/image | 10/min |
| Google Cloud Vision | `@google-cloud/vision` | OCR (DOCUMENT_TEXT_DETECTION) | Free: 1K/month, then $1.50/1K | — |
| Google Books API | REST (no SDK) | Cookbook cover art, ISBN lookup | Free | 1K/day |
| Vercel Blob | `@vercel/blob` | Image/file CDN storage | Free: 1 GB | — |

### AI Integration Rules

- All AI calls in **Server Actions only** — never import SDKs in client components
- Verify with `next build` bundle — search for `sk-ant-`, `GOOGLE_CLOUD`, API keys in client output
- **Three Zod schemas** per AI endpoint: input validation, AI response validation, DB write validation
- **Tool-use mode** (function calling) for Claude structured output — never parse raw text JSON
- Log model, duration, confidence, success to `parse_attempt` table for every AI call
- **Rate limit** all AI endpoints with sliding window keyed on `session.user.id`

---

## Vercel Platform Standard

- **Deployment**: Vercel is the standard platform for all web projects
- **CI/CD**: GitHub → Vercel auto-deploy (preview on PR, production on merge to main)
- **Preview deploys**: every PR gets a unique URL — use for QA and Playwright E2E
- **Environment variables**: set in Vercel dashboard for production; `.env.local` for development
- **Edge functions**: use for middleware (auth checks, redirects) — not for heavy computation
- **Analytics**: Vercel Analytics (free) for Web Vitals
- **Image optimization**: `next/image` with Vercel's built-in optimizer
- **Blob storage**: `@vercel/blob` for user uploads and AI-generated images
- **Caching**: ISR for semi-static pages; `revalidatePath()` / `revalidateTag()` for on-demand

---

## Security Requirements

### Non-Negotiables

1. **No hardcoded secrets**: All credentials in `.env` (gitignored); use environment variables in deployment
2. **OAuth 2.0 required**: For all user-facing auth and MCP integrations
3. **Read-only by default**: Write permissions require explicit justification
4. **PII redaction**: No PII in logs, error messages, or PM OS artifacts
5. **Pre-push scanning**: Git hooks scan for accidentally committed secrets
6. **Input validation**: Zod schemas at all system boundaries (Server Actions, API routes, form inputs)
7. **SQL injection prevention**: Drizzle ORM parameterized queries only; no raw SQL string concatenation
8. **XSS prevention**: React's default escaping + no `dangerouslySetInnerHTML` without DOMPurify
9. **CSRF protection**: Server Actions use built-in Next.js CSRF tokens
10. **Dependency audit**: `pnpm audit` in CI; no known critical vulnerabilities in production

### HTTP Security Headers (next.config.ts)

- `Content-Security-Policy` — restrict script/style sources
- `X-Frame-Options: DENY` — prevent clickjacking
- `X-Content-Type-Options: nosniff` — prevent MIME sniffing
- `Referrer-Policy: origin-when-cross-origin` — limit referrer info
- `Permissions-Policy` — disable unnecessary browser features (camera, microphone, geolocation)

### IDOR Prevention

Every database query that returns user data MUST include `WHERE userId = session.user.id`. No exceptions.

### MCP Credential Management

- Store in `.env` (gitignored) — never in source code
- Use environment variable references in `.mcp.json` and `vercel.json`
- Document setup in `mcp/setup_guides/[SERVICE]_SETUP.md`
- Rotate credentials quarterly

### Access Control

- **Identity Layer changes** (`identity/`): Require Human PM approval
- **Skill logic changes** (`.claude/skills/`): PR with test/validation evidence
- **Production data**: Row-level security via auth session; audit logging for mutations
- **Environment variables**: Vercel dashboard (production); `.env.local` (development)

---

## Testing Strategy

### Testing Pyramid

| Layer | Tool | Scope | Coverage Target |
|-------|------|-------|----------------|
| **Unit** | Vitest | Utils, validators, query functions, Server Action logic | 80%+ for `lib/`, `db/queries/` |
| **Component** | Vitest + React Testing Library | Interactive components (forms, lists, search) | Key interactive components |
| **E2E** | Playwright | Critical user journeys | 5-8 critical paths |

### TDD Workflow Per Feature

1. Read PM OS spec (PRD/feasibility from `execution/[slug]/`)
2. Write Zod validator first (define data shape)
3. Write failing test for Server Action
4. Implement Server Action (make test pass)
5. Write component test (render, interact, verify)
6. Implement component (make test pass)
7. Write E2E test for critical user paths
8. Run code review plugin

### Mocking Strategy

- **DB**: mock `db` module for unit tests — never hit real database
- **AI SDKs**: mock Anthropic SDK for AI action tests — test Zod validation + business logic, not the API
- **Auth**: mock `auth()` to return test session — test authorization logic

### Coverage Thresholds

- `lib/` and `db/queries/`: 80% lines and functions
- `actions/`: 70% lines and functions
- Config templates: `templates/configs/web/vitest.config.ts`

---

## Quality Gates

### Before Agent Output Approval

- [ ] Aligns with `identity/STRATEGY.md` vision
- [ ] Follows brand voice from this document
- [ ] Includes specific metrics and acceptance criteria
- [ ] Cites evidence for key decisions
- [ ] Free of security vulnerabilities (OWASP Top 10)
- [ ] Technical stack matches approved technologies listed above

### Before Code Merge

- [ ] `tsc --noEmit` — no type errors
- [ ] `biome check .` — lint + format clean
- [ ] `vitest run` — unit + component tests pass
- [ ] No new `any` types without justification
- [ ] Zod validators for all external inputs
- [ ] Interactive elements keyboard-navigable (WCAG AA)

### Before Production Deploy

- [ ] All CI checks green
- [ ] Preview deploy reviewed (Vercel)
- [ ] No console errors in browser dev tools
- [ ] Environment variables configured in Vercel dashboard
- [ ] `pnpm audit` shows no critical vulnerabilities

---

## Git Workflow

- **Branch**: `feature/[JIRA-KEY]-[brief-description]`
- **Commits**: Conventional Commits — `feat|fix|refactor|test|docs|chore|ci(scope): description`
  - Example: `feat(recipes): add create form (PROJ-1)`
- **PR size**: <400 lines; split larger work into stacked PRs
- **Code review**: `code-review` + `pr-review-toolkit` plugins
- **Merge**: squash merge to `main`

### File Naming

- **PM OS artifacts**: `YYYY-MM-DD_[artifact-type]_[brief-title].md`
- **Templates**: `[artifact-type]_template.md`
- **Skills**: `.claude/skills/[skill-name]/SKILL.md`
- **Product code**: Next.js App Router conventions (kebab-case routes, PascalCase components)

---

## README Standard

Every product repo README must include:

1. **Project name** + one-line description
2. **Live URL** / Demo link
3. **Features** — comprehensive list grouped by domain
4. **Tech Stack** — table (layer / technology / purpose)
5. **Architecture** — Mermaid diagram (Client → Server Actions → DB/AI)
6. **Project Structure** — annotated `src/` tree
7. **Getting Started** — prerequisites, clone, install, env setup, db push, dev
8. **Environment Variables** — table (name, description, source, required/optional)
9. **Scripts Reference** — all `pnpm` commands
10. **Testing** — how to run unit, component, E2E; how to write new tests
11. **Deployment** — Vercel setup, env config, preview deploys
12. **Data Model** — key tables and relationships
13. **AI Integration** — services used, what they do, cost estimates
14. **Contributing** — branch naming, commit convention, PR checklist

Template: `templates/project_readme_template.md`

---

## Accessibility

- **Standard**: WCAG 2.1 Level AA
- All interactive elements keyboard-navigable
- **Color contrast**: 4.5:1 (normal text), 3:1 (large text)
- **Semantic HTML5**: `nav`, `main`, `section`, `article`, `button` — not div soup
- ARIA labels on non-text interactive elements
- **Touch targets**: 44x44px minimum
- Color never sole indicator of state (use icons/text alongside color)

---

## Observability

- **Error tracking**: Sentry (`@sentry/nextjs`) — free tier for solo/small projects
- **Structured logging**: `pino` for Server Action failures (`{ userId, action, error }`)
- **Client performance**: Vercel Analytics + Web Vitals
- **Performance budgets**: Lighthouse CI in GitHub Actions
  - LCP < 2.5s
  - CLS < 0.1
  - TBT < 200ms

---

## Artifact Standards

### PRD Structure (BMAD Method)

1. **Business Case**: Why this matters (metrics, user impact, strategic alignment)
2. **Metrics**: Success criteria with concrete targets and measurement approach
3. **Approach**: Solution design with alternatives considered
4. **Details**: User stories (Gherkin format), edge cases, designs, acceptance criteria

### Technical Specifications

- **Architecture diagrams**: Mermaid (C4 or component diagrams)
- **API contracts**: TypeScript types + Zod schemas (Server Actions are the primary API surface)
- **Acceptance criteria**: Gherkin scenarios (`Given/When/Then`)
- **Security review**: Required for auth flows, data mutations, external API integrations, AI-generated content display

### Discovery Artifacts

- **Opportunity Solution Trees**: Mermaid diagram format
- **User needs synthesis**: Structured insights with evidence links
- **Feature prioritization**: RICE or weighted scoring with rationale
- **Prototypes**: React/Tailwind + shadcn/ui components (via UX Strategist skill)

---

## Product Repository Standards

### Repo Structure Convention (Next.js App Router)

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (auth, theme)
│   ├── (auth)/             # Login/register routes
│   └── (app)/              # Authenticated routes
│       ├── [feature-1]/    # Feature routes
│       └── [feature-2]/
├── components/
│   ├── ui/                 # shadcn/ui (auto-generated — DO NOT modify)
│   ├── shared/             # Cross-feature compositions
│   └── [feature]/          # Feature-specific components
├── db/
│   ├── schema.ts           # Drizzle schema
│   ├── index.ts            # Turso connection
│   └── queries/            # Reusable query functions
├── actions/                # Server Actions (mutations)
├── lib/
│   ├── auth.ts             # Auth.js config
│   ├── utils.ts            # cn() + shared utils
│   └── validators.ts       # Zod schemas
├── test/
│   └── setup.ts            # Vitest setup (RTL cleanup, mocks)
└── types/                  # Shared TypeScript types
```

---

## Development Tooling — Claude Plugins

| Plugin | Role in Workflow | When to Use |
|--------|-----------------|-------------|
| `feature-dev` | 7-phase structured implementation | Starting any feature from PM OS specs |
| `frontend-design` | Production-grade UI generation | Any component with visual requirements |
| `code-review` | 5 parallel review agents | After feature complete, before commit |
| `security-guidance` | Real-time security monitoring | Activate at session start for auth/API/AI work |
| `pr-review-toolkit` | 6 specialized PR reviewers | Before marking PR ready for review |
| `commit-commands` | Git commit/push/PR automation | Every commit/push operation |
| `typescript-lsp` | Type checking, go-to-definition | Passive — always available |
| `playwright` | Browser automation for E2E | Playwright test debugging, selector generation |
| `figma` | Figma design file access | Design-to-code implementation |
| `github` | GitHub integration | Issues, PRs, Actions |
| `code-simplifier` | Complexity reduction | Post-implementation refactoring |

### Feature Implementation Workflow Order

1. `/feature-dev` — structured 7-phase build from PM OS spec
2. `/security-guidance` — activate at session start
3. `/typescript-lsp` — type check after each file
4. `/frontend-design` — production-grade UI from prototype
5. `/code-review` — after feature complete
6. `/commit-commands` — commit + push
7. `/pr-review-toolkit` — before requesting review

---

## Error Handling

### Application Code

- **Fail fast**: Surface errors immediately; don't swallow exceptions
- **Typed errors**: Use discriminated unions or error codes, not string messages
- **User-friendly messages**: Show actionable feedback; log technical details server-side
- **Graceful degradation**: If an external service is unavailable, show cached data or clear fallback UI

### Agent Outputs

- **Validate assumptions**: Explicitly state what was assumed if input was ambiguous
- **Highlight uncertainties**: Mark sections needing human validation with `[NEEDS REVIEW]`
- **Provide alternatives**: When multiple approaches are viable, present trade-offs
- **Link to sources**: Reference specific files, docs, or data sources

---

## Continuous Improvement

### Self-Evaluation Triggers

- **Monthly**: `/pm-os-quality-audit` analyzes recent agent outputs
- **Per phase**: Quality audit after each PM OS phase closes
- **On incidents**: Root cause analysis for security or quality issues
- **Quarterly**: Identity Layer review against strategy changes

### Improvement Proposal Process

1. Generate proposal as Markdown in `pm-os-reference/documentation/improvement_proposals/`
2. Submit as GitHub PR with before/after examples
3. Human PM reviews for alignment with standards
4. If approved: merge, update agents, re-test
5. If rejected: document in `improvement_proposals/rejected/` with reasoning

---

**Last Updated**: 2026-02-28 (Phase 8 — Full Stack PM Engineering Standards)
**Next Review**: 2026-04-01
