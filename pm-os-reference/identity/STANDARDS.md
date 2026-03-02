# PM OS Standards

**Purpose**: PM OS's own organizational standards. This serves as both the operating standards for PM OS development and a reference example for users customizing `identity/STANDARDS.md`.

**Last Updated**: 2026-02-22
**Next Review**: 2026-04-01 (or after first product repo ships to production)

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

## Technical Stack

### Web Product Stack (Default)

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | Next.js 15 (App Router) | SSR, Server Actions, API routes, Vercel-native |
| **Language** | TypeScript (strict mode) | Type safety end-to-end; `strict: true` in tsconfig |
| **Styling** | Tailwind CSS v4 | Utility-first |
| **Components** | shadcn/ui (Radix primitives) | Own the code, WCAG AA accessible, zero runtime cost |
| **Database** | Turso (SQLite edge) | SQLite + edge replication, generous free tier |
| **ORM** | Drizzle ORM | Best Turso/SQLite support, SQL-like TypeScript API |
| **Auth** | Auth.js v5 (NextAuth) | App Router native, Google OAuth |
| **State** | React Server Components + `nuqs` | RSC minimizes client state; URL params for filters/search |
| **AI** | Claude API (Anthropic SDK) | AI-powered features (parsing, analysis, generation) |
| **API** | Next.js Server Actions + API Routes | Type-safe mutations, no extra library |
| **Package Manager** | pnpm | Strict dependency resolution, fast, disk-efficient |
| **Linter/Formatter** | Biome | Replaces ESLint + Prettier; single Rust-based tool |
| **Testing** | Vitest + React Testing Library + Playwright | Unit/component/E2E pyramid |
| **Deployment** | Vercel | Automatic CI/CD, preview deploys, edge functions |

### AI Infrastructure (PM OS Specific)

| Component | Technology |
|-----------|-----------|
| **Agent Framework** | Claude Code skills (`.claude/skills/`) |
| **Context Management** | Identity Layer auto-injection |
| **MCP Integrations** | Atlassian Rovo (Jira + Confluence), Google Drive, Context7 |
| **Orchestration** | CLAUDE.md routing → skill execution |

### Version Control

- **Platform**: GitHub
- **Workflow**: Feature branch → PR → review → merge to `main`
- **Branch naming**: `feature/[JIRA-KEY]-[brief-description]` (e.g., `feature/PROJ-1-recipe-crud`)
- **Commit messages**: Conventional Commits — `type(scope): description (JIRA-KEY)`
  - Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`
  - Example: `feat(recipes): add create form (PROJ-1)`

---

## Security Requirements

### Non-Negotiables

1. **No hardcoded secrets**: All credentials in `.env` (gitignored); use environment variables in deployment
2. **OAuth 2.0 required**: For all user-facing auth and MCP integrations
3. **Read-only by default**: Write permissions require explicit justification
4. **PII redaction**: No PII in logs, error messages, or PM OS artifacts
5. **Pre-push scanning**: Git hooks scan for accidentally committed secrets
6. **Input validation**: Zod schemas at all system boundaries (API routes, Server Actions, form inputs)
7. **SQL injection prevention**: Drizzle ORM parameterized queries only; no raw SQL string concatenation
8. **XSS prevention**: React's default escaping + no `dangerouslySetInnerHTML` without sanitization
9. **CSRF protection**: Server Actions use built-in Next.js CSRF tokens
10. **Dependency audit**: `pnpm audit` in CI; no known critical vulnerabilities in production

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
- **Prototypes**: React/Tailwind components (via UX Strategist skill)

---

## Quality Gates

### Before Agent Output Approval

- [ ] Aligns with `identity/STRATEGY.md` vision
- [ ] Follows brand voice from this document
- [ ] Includes specific metrics and acceptance criteria
- [ ] Cites evidence for key decisions
- [ ] Free of security vulnerabilities (OWASP Top 10)
- [ ] Technical stack matches approved technologies listed above

### Before Code Merge (Product Repos)

- [ ] TypeScript compiles: `tsc --noEmit` passes
- [ ] Lint clean: `biome check .` passes
- [ ] Unit/component tests pass: `vitest`
- [ ] E2E tests pass: `playwright test` (for affected flows)
- [ ] No new `any` types without justification comment
- [ ] Zod validators for all external inputs
- [ ] Accessibility: interactive elements keyboard-navigable, WCAG AA color contrast

### Before Production Deploy

- [ ] All CI checks green
- [ ] Preview deploy reviewed (Vercel)
- [ ] No console errors in browser dev tools
- [ ] Environment variables configured in Vercel dashboard
- [ ] `pnpm audit` shows no critical vulnerabilities

---

## Testing Strategy

### Testing Pyramid

| Layer | Tool | Scope | Coverage Target |
|-------|------|-------|----------------|
| **Unit** | Vitest | Utils, validators, query functions, Server Action logic | 80%+ for `lib/`, `db/queries/`, `actions/` |
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

---

## Workflow Conventions

### Git Practices

- **Branch naming**: `feature/[JIRA-KEY]-[brief-description]`
- **Commit messages**: Conventional Commits with Jira key — `feat(scope): description (JIRA-KEY)`
- **PR size**: Aim for <400 lines changed; split larger work into stacked PRs
- **Code reviews**: Required for all PRs; use `code-review` and `pr-review-toolkit` plugins
- **Merge strategy**: Squash merge to `main`

### File Naming

**PM OS artifacts**: `YYYY-MM-DD_[artifact-type]_[brief-title].md`
**Templates**: `[artifact-type]_template.md`
**Skills**: `.claude/skills/[skill-name]/SKILL.md`
**Product code**: Follow Next.js App Router conventions (kebab-case routes, PascalCase components)

### Artifact Versioning

- Store in `execution/[JIRA-KEY]_[slug]/` (project-centric)
- Cross-project GTM artifacts → `execution/shared/`
- Include changelog section at top of document for major revisions
- Link to related Jira tickets

---

## Product Repository Standards

### Claude Code Plugin Stack

Product repos use these plugins to bridge PM OS planning to implementation:

| Plugin | Purpose | PM OS Complement |
|--------|---------|-----------------|
| `feature-dev` | 7-phase structured implementation | `/feature-pipeline` plans it; `feature-dev` builds it |
| `frontend-design` | Production-grade UI quality | `/ux-strategist` prototypes; this enforces quality in code |
| `code-review` | 5 parallel review agents | `/engineering-partner` pre-implementation; this post-implementation |
| `security-guidance` | Real-time security monitoring | `/engineering-partner` STRIDE/OWASP at planning; this at code time |
| `commit-commands` | Git commit/push/PR automation | Streamlines git operations |
| `pr-review-toolkit` | 6 specialized PR review agents | Deep pre-merge quality gate |
| `typescript-lsp` | Type checking, go-to-definition | Essential for TypeScript development |

### Repo Structure Convention

Product repos follow this directory layout (Next.js App Router):

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (auth, theme)
│   ├── (auth)/             # Login/register routes
│   └── (app)/              # Authenticated routes
├── components/
│   ├── ui/                 # shadcn/ui (auto-generated)
│   └── [feature]/          # Feature-specific components
├── db/
│   ├── schema.ts           # Drizzle schema
│   ├── index.ts            # Database connection
│   └── queries/            # Reusable query functions
├── actions/                # Server Actions (mutations)
├── lib/                    # Shared utilities
│   ├── auth.ts             # Auth.js config
│   ├── utils.ts            # cn() + shared utils
│   └── validators.ts       # Zod schemas
└── types/                  # Shared TypeScript types
```

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

**Last Updated**: 2026-02-22 (Phase 8 — Web Development Standards)
**Next Review**: 2026-04-01
