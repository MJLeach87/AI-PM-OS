# Product Requirements Document: PM OS Companion Web App — Phase 1 (Read Layer)

**Author**: PM OS PRD Skill
**Date**: 2026-03-15
**Status**: Draft — Awaiting PM Review
**Last Updated**: 2026-03-15
**Version**: v0.1

---

## Document Metadata

**Related Documents**:
- Discovery Insights: `execution/PMOS_pm-os-web-app/2026-03-14_Insights_PM-OS-Web-App.md`
- OST: `execution/PMOS_pm-os-web-app/2026-03-14_OST_PM-OS-Web-App.md`
- Information Architecture: `execution/PMOS_pm-os-web-app/2026-03-14_IA_PM-OS-Web-App.md`
- Prototype: `execution/PMOS_pm-os-web-app/2026-03-14_Prototype_PM-OS-Web-App.html`

**Stakeholders**:
- **Product Owner**: Matt Leach (Power-user PM)
- **Engineering Lead**: TBD
- **Design Lead**: TBD (UX Strategist skill as proxy)

**Tracking**:
- **Jira Project**: PMOS
- **Target Release**: Q2 2026
- **Priority**: P1

---

## Executive Summary

PM OS produces high-quality product artifacts — PRDs, OSTs, IAs, prototypes, sprint logs — but only the power-user PM can access them today. Stakeholders (engineers, execs, non-CLI PMs) have no path to the artifacts without repo access. The Phase 1 Companion Web App eliminates this access bottleneck by creating a read layer: a Next.js 15 web application that renders PM OS execution artifacts as browsable, shareable web pages — authenticated for PM team members, publicly linked for stakeholders.

**TL;DR**:
- **Problem**: PM OS artifacts are trapped in `execution/` folders, inaccessible to anyone without a Git client and repo access.
- **Solution**: A read-only web app that indexes `execution/` artifacts and surfaces them via browsable project views, artifact rendering, shareable public links, and a skill catalog.
- **Impact**: 2+ non-power-user PMs accessing PM OS within 30 days of launch; artifact share links used by at least 1 engineer or exec in the first month.

---

# B — Business Case

## Problem Statement

### User Pain Point

PM OS's product lifecycle output — OSTs, PRDs, IAs, sprint logs, prototypes — accumulates in `execution/[slug]/` directories on a local machine. There is no index, no browsable interface, and no way for non-CLI users to find or read these artifacts without:

1. Having Git installed and repo access
2. Knowing the execution directory naming conventions
3. Asking the power-user PM to manually share or export a file

This creates a distribution bottleneck where PM OS produces high-quality output that almost nobody consumes. Confluence auto-publish exists but covers only a subset of skills and requires a manual per-artifact trigger — it is not a passive discovery layer.

**Evidence** (from `2026-03-14_Insights_PM-OS-Web-App.md`):
- *"PM OS produces valuable output that almost nobody can see."* — Theme 2 key insight
- *"Execs/stakeholders reviewing PRDs and status — personas named but no access path."* — Theme 2 evidence
- *"Current users: primarily 1 PM (power user, Claude Code native)"* — Phase 8 baseline
- Execution artifacts use a flat folder structure with no browsable index — CLAUDE.md architecture observation

**Impact if Unsolved**:
- Phase 8 goal of 5+ concurrent PM users is unachievable — new PMs have no low-friction entry point
- Stakeholders continue to skip PM OS outputs, increasing spec-to-build miscommunication
- PM OS ROI remains invisible; no evidence base for continued investment or team expansion

---

### Strategic Alignment

**Alignment with PM OS Strategy** (`pm-os-reference/identity/STRATEGY.md`):

- **Vision**: "Transform Product Managers from document-authors into high-leverage Strategic Architects." A web layer makes PM OS outputs legible to stakeholders — multiplying the leverage of every artifact produced.
- **Mission**: "Institutionalize product strategy, discovery, and execution as executable code that improves itself over time." A companion app is the distribution mechanism that makes institutional knowledge accessible.
- **North Star — Phase 8**: "5+ PMs using PM OS concurrently, onboarding < 2 hours." The web app is the direct enabler of this goal — non-CLI PMs cannot onboard without a browser-based entry point.
- **Long-Term Vision**: "Month 6: Full team onboarded, web prototype operational" — this feature IS that milestone.
- **Strategic Principle — Progressive Disclosure**: Phase 1 Read Layer validates demand with minimal build before committing to the write/execution layer (Phase 2).

---

### Opportunity Size

**User Impact**:
- **Directly unlocked**: Non-CLI PMs on the team (Phase 8 target: 4 new users beyond power user = 5 total)
- **Stakeholder access**: Engineers reading specs, execs reviewing PRDs, designers reviewing IAs — all currently locked out
- **Frequency**: Every artifact produced (estimated 3–8 artifacts per initiative) currently has zero passive distribution

**OST Phase 1 solution set** (Quick Wins from `2026-03-14_OST_PM-OS-Web-App.md`):

| OST Solution | Opportunity Addressed |
|---|---|
| S1C — Skill output viewer | O1: Non-CLI PMs can't access PM OS |
| S2A — Project browser | O2: Artifacts trapped in execution/ |
| S2B — Shareable artifact links | O2: Stakeholder distribution |
| S3B — Skill catalog | O3: Onboarding requires PM hand-holding |
| S4B — Artifact type filters | O4: No role-aware view |

---

# M — Metrics

## Success Criteria

### Primary Success Metrics

**1. Non-power-user PM Sessions**
- **Current Baseline**: 0 sessions/week from non-power-user PMs
- **Target**: 2+ unique non-power-user PM sessions/week by Week 4 post-launch
- **Measurement Method**: Vercel Analytics — unique users by email domain, excluding power-user email
- **Data Source**: Vercel Analytics + Auth.js session logs

**2. Artifact Share Link Usage**
- **Current Baseline**: 0 public artifact links shared (feature doesn't exist)
- **Target**: 1+ share link clicked by an engineer or exec within 30 days of launch
- **Measurement Method**: Track `/share/[token]` page view events; note user-agent / referrer source
- **Data Source**: Vercel Analytics

**3. Skill Catalog Page Views by New Users**
- **Current Baseline**: 0 (no web skill catalog exists)
- **Target**: New users view at least 1 skill detail page during their first session (within 14 days of launch)
- **Measurement Method**: Page view event on `/skills/[name]` correlated with user's first session timestamp
- **Data Source**: Vercel Analytics

---

### Secondary Metrics

- **Artifact Views per Session**: Target ≥ 2 artifacts viewed per authenticated session (indicates useful browsing, not just landing and bouncing)
- **Time to First Artifact**: From login to first artifact open, target < 60 seconds
- **Projects Browser Load Time**: < 1s p95 (measures file system indexing performance)

---

### Guardrail Metrics

- **Error Rate**: < 1% of artifact page loads return an error (markdown render failures, 404s)
- **Auth Failure Rate**: < 0.5% of login attempts fail due to OAuth misconfiguration
- **Share Token Abuse**: 0 cases of unauthorized access via share token (no auth bypass on protected routes)

---

## Measurement Plan

### Data Instrumentation

**New Events to Track**:
- `artifact_viewed` — Fired when: user navigates to `/projects/[slug]/[artifact]` and content renders
- `artifact_shared` — Fired when: user clicks "Share" and share modal opens (intent)
- `share_link_generated` — Fired when: share token is created and link copied
- `share_link_visited` — Fired when: `/share/[token]` is opened (any visitor, no auth required)
- `skill_catalog_viewed` — Fired when: `/skills/[name]` is rendered
- `project_browsed` — Fired when: `/projects/[slug]` is rendered

**Event Properties**:
```json
{
  "user_id": "string (Auth.js session ID — no PII)",
  "artifact_type": "OST | PRD | Insights | IA | Prototype | Sprint-Log | Launch | GTM",
  "project_slug": "string",
  "is_first_session": "boolean",
  "source": "authenticated | share_link"
}
```

### Dashboards & Reporting
- **Dashboard**: Vercel Analytics (built-in) + custom `/api/analytics` route for share link tracking
- **Refresh Frequency**: Real-time (Vercel) + daily digest
- **Owner**: Power-user PM (Matt)

### Evaluation Timeline
- **Launch Date**: Target Q2 2026 (post `/launch` scaffold + sprint build)
- **First Check-In**: Launch + 1 week — share link usage + session count
- **Full Evaluation**: Launch + 4 weeks — all three primary metrics reviewed
- **Success Declaration**: All three primary metrics hit by Week 4

---

# A — Approach

## Solution Overview

**Core Concept**: A Next.js 15 App Router web application that reads PM OS's `execution/` directory structure (via Node.js `fs` on the server) and surfaces artifacts as rendered web pages. No database required for Phase 1 — the file system is the data source. Share tokens are stored in a minimal Vercel KV (Redis) store for `/share/[token]` generation and lookup.

**User Experience**:
- Authenticated PMs sign in via Google OAuth (Auth.js v5, restricted to authorized email addresses)
- Projects browser shows all `execution/[slug]/` directories as cards, searchable, sorted by recency
- Project detail shows all artifacts in that slug as a list, filterable by artifact type (type parsed from filename convention `YYYY-MM-DD_[Type]_[Title].md`)
- Artifact viewer renders markdown as HTML (server-side, `remark` + `rehype`) with a floating ToC sidebar and a Share button
- Share modal generates a `cuid2` token, stores `{ token → filePath, expiry }` in Vercel KV, and returns `/share/[token]` — usable by anyone without login
- Skill catalog reads `.claude/skills/[name]/SKILL.md` files and displays them as searchable cards; skill detail page shows full docs and copy-able example prompts

**Technical Approach**:
- **Platform**: Next.js 15 (App Router) + Vercel deployment — consistent with `identity/STANDARDS.md` platform profiles
- **Auth**: Auth.js v5 with Google provider; `AUTHORIZED_EMAILS` env var restricts access to known PM team
- **Data layer**: `fs.readdir` / `fs.readFile` in Next.js server components; no database for artifact content
- **Share tokens**: Vercel KV (Redis) — `token → { filePath, expiresAt }` — minimal footprint
- **Markdown rendering**: `remark` + `rehype-highlight` + `rehype-slug` for server-side HTML; `github-markdown-css` for baseline styling
- **Component library**: shadcn/ui + Tailwind CSS v4 — per STANDARDS.md
- **Styling**: Dark mode by default (consistent with PM OS design; prototype established palette)

**Detailed IA reference**: `execution/PMOS_pm-os-web-app/2026-03-14_IA_PM-OS-Web-App.md`

---

## Alternatives Considered

### Alternative 1: Confluence-First (No New Web App)
**Description**: Invest in improving Confluence auto-publish coverage instead of building a new web app. All artifacts published to Confluence on creation.

**Pros**:
- No new app to build or maintain
- Stakeholders already have Confluence access at many orgs

**Cons**:
- Requires manual trigger or post-hook to publish every artifact
- Confluence's rendering is generic — no PM OS artifact type awareness, no share links, no skill catalog
- Doesn't solve onboarding or skill catalog discovery

**Why Not Chosen**: Confluence is a good publishing destination but not a discovery or navigation layer. PM OS artifacts have naming conventions and artifact type semantics that Confluence can't surface. Confluence also doesn't solve the skill catalog or onboarding use case.

---

### Alternative 2: Static Site Generator (No Auth, Full Export)
**Description**: Run a static site generation step on every PM OS CLI session that exports `execution/` to a static HTML site deployed to Vercel.

**Pros**:
- Extremely simple — no auth, no KV, no server components
- Blazing fast (pre-built HTML)

**Cons**:
- No share tokens (all artifacts are either public or private — no middle ground)
- Build step required after every CLI run — adds friction to the power user
- No skill catalog (skills are in `.claude/skills/`, separate from static export path)
- No auth means all artifacts are world-readable or behind Vercel password protection (blunt instrument)

**Why Not Chosen**: Share link granularity (some artifacts public, most private) is a core requirement. Static generation can't support `token → filePath` lookups at request time.

---

### Do Nothing Option
**Impact**: Phase 8 goal (5+ concurrent users, < 2hr onboarding) remains blocked indefinitely. PM OS ROI stays invisible. Stakeholders continue asking the PM to "send me the PRD" — the bottleneck this system was designed to eliminate persists.

---

## Phased Rollout Strategy

### Phase 1 — Read Layer (This PRD)
**Scope**: Projects browser, project detail + artifact type filter, artifact viewer, share modal + public `/share/[token]` view, skill catalog + skill detail
**Timeline**: Q2 2026
**Success Criteria**: Primary metrics hit by Week 4 post-launch

### Phase 2 — Write Layer
**Scope**: Browser-based identity/ editor (S3A), onboarding checklist flow (S3C), Confluence sync dashboard (S2C), project status cards with Jira live data (S5B)
**Timeline**: Q3 2026 (informed by Phase 1 learnings)
**Prerequisites**: Phase 1 live; validate which personas actually use it and what they do next

### Phase 3 — Execution Layer
**Scope**: Web skill execution interface (S1A), guided skill wizard (S1B), role-aware views (S4A), NSM velocity dashboard (S5A)
**Timeline**: Q4 2026+
**Dependencies**: Phase 2 identity/ editor complete; Snowflake MCP active (PMOS-108); Jira API integration validated in Phase 2

---

# D — Details

## User Stories & Acceptance Criteria

---

### Epic 1: Artifact Discovery & Browsing

#### Story 1: Projects Browser
**As a** non-CLI PM or stakeholder with web app access,
**I want** to see all PM OS projects in a searchable browser,
**So that** I can find the initiative I care about without navigating a file system.

```gherkin
Scenario: Authenticated user views projects browser
  Given I am authenticated via Google OAuth
  When I navigate to "/"
  Then I see a grid of project cards, one per execution/ slug
  And each card shows: Jira key badge, project title, artifact count, last-updated date, artifact type badges, and inferred phase label

Scenario: Search filters projects
  Given I am on the projects browser
  When I type "mealiflo" in the search input
  Then only project cards whose slug or title contain "mealiflo" are shown

Scenario: No projects exist
  Given the execution/ directory is empty
  When I navigate to "/"
  Then I see an empty state message: "No projects yet. Run a PM OS skill to generate your first artifact."
```

**Priority**: P0
**Estimate**: M

---

#### Story 2: Project Detail with Artifact Type Filter
**As a** PM or engineer,
**I want** to see all artifacts for a project in a filterable list,
**So that** I can quickly find the PRD or OST without scrolling past unrelated artifacts.

```gherkin
Scenario: View project artifact list
  Given I navigate to "/projects/PMOS_pm-os-web-app"
  When the page loads
  Then I see an artifact list with type badge, date, and title for each file in the execution/ slug
  And artifacts are sorted newest-first by filename date prefix
  And a Jira deep link is shown in the header (constructed from the Jira key in the slug)

Scenario: Filter by artifact type
  Given I am on a project detail page with OST, PRD, and Insights artifacts
  When I click the "PRD" filter tab
  Then only PRD artifacts are shown in the list

Scenario: Click artifact opens viewer
  Given I am on a project detail page
  When I click an artifact row
  Then I navigate to "/projects/[slug]/[artifact-id]"
  And the artifact renders as HTML

Scenario: Non-existent project
  Given I navigate to "/projects/nonexistent-slug"
  When the page loads
  Then I see a 404 state: "Project not found"
```

**Priority**: P0
**Estimate**: M

---

#### Story 3: Artifact Viewer
**As a** PM, engineer, or exec,
**I want** to read a PM OS artifact rendered as formatted HTML,
**So that** I can understand the content without knowing Markdown.

```gherkin
Scenario: Artifact renders with ToC
  Given I navigate to "/projects/[slug]/[artifact-id]"
  When the page loads
  Then the markdown content is rendered as formatted HTML (headings, tables, code blocks, Mermaid diagrams)
  And a floating Table of Contents sidebar shows all h2/h3 headings with anchor links
  And clicking a ToC link scrolls to and highlights the corresponding section

Scenario: Artifact type badge shown in header
  Given I am viewing a PRD artifact
  When the page loads
  Then the header shows an "PRD" badge in emerald green
  And the project slug and Jira key are shown as breadcrumb

Scenario: Confluence badge links out
  Given the artifact has a known Confluence page URL (via metadata)
  When I view the artifact
  Then a "Confluence" badge is shown in the header as an external link
```

**Priority**: P0
**Estimate**: L

---

### Epic 2: Artifact Sharing

#### Story 4: Share Modal — Generate Link
**As a** PM,
**I want** to generate a shareable public link to a specific artifact,
**So that** I can send it to an engineer or exec who doesn't have PM OS web app access.

```gherkin
Scenario: Generate share link
  Given I am viewing an artifact
  When I click the "Share" button
  Then a share modal opens with a generated public link: "/share/[cuid2-token]"
  And a "Copy" button copies the full URL to clipboard
  And I can optionally set an expiry (7 days / 30 days / Never)

Scenario: Default expiry is 30 days
  Given I open the share modal
  When I do not change the expiry setting
  Then the generated link expires in 30 days

Scenario: Copy button feedback
  Given I have a share link in the modal
  When I click "Copy"
  Then the button text changes to "Copied!" for 2 seconds
  Then returns to "Copy"

Scenario: Close modal
  Given the share modal is open
  When I press Escape or click outside the modal
  Then the modal closes and focus returns to the Share button
```

**Priority**: P0
**Estimate**: S

---

#### Story 5: Public Artifact View (Unauthenticated)
**As an** engineer or exec who received a share link,
**I want** to read the linked artifact without creating an account,
**So that** I can review the PRD or OST without any setup friction.

```gherkin
Scenario: Valid share link renders artifact
  Given a valid, non-expired share token exists
  When I navigate to "/share/[token]" without being authenticated
  Then I see the artifact rendered as formatted HTML
  And a "Public View" banner is shown: "You are viewing a shared PM OS artifact. Sign in to browse all projects."
  And the banner includes a "Sign in →" CTA link

Scenario: Expired share link
  Given a share token that has passed its expiry date
  When I navigate to "/share/[token]"
  Then I see a friendly error: "This link has expired. Ask the PM for a new share link."

Scenario: Invalid token
  Given a URL with a token that doesn't exist in KV
  When I navigate to "/share/[nonexistent-token]"
  Then I see a 404 state: "Share link not found."

Scenario: No sidebar on public view
  Given I am viewing an artifact via share link
  When the page loads
  Then there is no app sidebar or authenticated navigation chrome
  And the page is clean reading-focused layout only
```

**Priority**: P0
**Estimate**: S

---

### Epic 3: Skill Catalog

#### Story 6: Browse Skill Catalog
**As a** new PM being onboarded to PM OS,
**I want** to browse all available skills with descriptions and example prompts,
**So that** I can understand what PM OS can do and how to invoke it without asking the power-user PM.

```gherkin
Scenario: Skill catalog shows all skills
  Given I navigate to "/skills"
  When the page loads
  Then I see a grid of skill cards, one per .claude/skills/[name]/SKILL.md file
  And each card shows: trigger (e.g., /prd), skill name, description excerpt, and output type badges

Scenario: Search filters skills
  Given I am on the skills catalog page
  When I type "discovery" in the search input
  Then only skills whose name or description contain "discovery" are shown

Scenario: Click skill opens detail
  Given I am on the skill catalog page
  When I click the "PRD" skill card
  Then I navigate to "/skills/prd"
  And I see full SKILL.md content rendered as HTML
  And I see a copy-able example prompt in a code block with a "Copy prompt" button
```

**Priority**: P1
**Estimate**: M

---

## Functional Specifications

### Artifact Filename Parsing

PM OS artifact filenames follow the convention: `YYYY-MM-DD_[Type]_[Title-Words].md`

**Parsing logic**:
1. Split filename on `_` (max 3 parts: date, type, title)
2. `date` = part 0 (ISO date string)
3. `type` = part 1 (used for badge color and filter tabs)
4. `title` = part 2 onward, dashes replaced with spaces, title-cased

**Artifact type → badge color mapping**:
| Type | Tailwind Color Class |
|------|---------------------|
| Insights | `bg-purple-500` |
| OST | `bg-blue-500` |
| PRD | `bg-emerald-500` |
| IA | `bg-orange-500` |
| Prototype | `bg-pink-500` |
| Sprint-Log | `bg-yellow-500` |
| Launch | `bg-cyan-500` |
| GTM | `bg-red-500` |
| (unknown) | `bg-zinc-500` |

**Project phase inference** (for project cards):
- Has `Sprint-Log` file → phase = "Sprint N" (parse N from filename if present)
- Has `PRD`, no Sprint-Log → phase = "Planning"
- Has `Insights` or `OST`, no PRD → phase = "Discovery"
- Has `Launch` file → phase = "Ready for Dev"
- Default → phase = "In Progress"

---

### Share Token System

**Token generation**: `cuid2` — cryptographically random, URL-safe, 24-char string

**KV schema** (Vercel KV):
```
Key:   share:[token]
Value: { filePath: string, expiresAt: ISO8601 | null, createdBy: userId }
TTL:   Set on key in Redis to match expiresAt; no TTL if "Never"
```

**Token lookup flow** (server component for `/share/[token]`):
1. `kv.get("share:[token]")` — if null → 404
2. Check `expiresAt` — if past → show expiry error
3. Read file at `filePath` — if missing → 404
4. Render artifact content without auth layout

**Token invalidation**: Tokens are single-path — they grant access to one artifact only. No token can be escalated to browse other projects.

---

### Auth Configuration

**Provider**: Google OAuth via Auth.js v5
**Restriction**: Middleware checks `session.user.email` against `AUTHORIZED_EMAILS` env var (comma-separated list). Non-authorized emails see a "You're not authorized" page with contact instructions.
**Protected routes**: All routes under `(app)/` layout — enforced in `middleware.ts` via `auth()` check
**Public routes**: `/login`, `/share/[token]` — no auth check

---

## Edge Cases & Error Scenarios

### Edge Case 1: Artifact File Deleted Between Index and View
**Situation**: PM deletes an artifact from `execution/` while a browser tab has the project page cached.
**Expected Behavior**: Navigating to the artifact URL returns a 404 server component with message "Artifact not found. It may have been deleted."
**Fallback**: Back button returns to project detail.

### Edge Case 2: Mermaid Diagram in Markdown
**Situation**: Many PM OS artifacts (OSTs, IAs) contain Mermaid diagram code blocks.
**Expected Behavior**: Server-side rendering via `remark-mermaidjs` (headless Chrome) OR client-side lazy-load via `mermaid.js`. Fallback if render fails: show fenced code block with a "⚠ Diagram rendering unavailable" note.
**Decision**: Use client-side `mermaid.js` (simpler, no headless Chrome dependency in Vercel serverless).

### Edge Case 3: Very Large Artifact File (> 500KB)
**Situation**: Prototype HTML files or large sprint logs may exceed typical markdown size.
**Expected Behavior**: Render with streaming (Next.js Suspense). Show skeleton loader while content streams.
**Limit**: Files > 2MB are refused with: "This artifact is too large to render in the browser. Download from the file system."

### Edge Case 4: Unauthorized Email Tries to Sign In
**Situation**: Someone with a valid Google account but not in `AUTHORIZED_EMAILS` completes OAuth flow.
**Expected Behavior**: Auth.js redirects to `/unauthorized` page: "Your email is not authorized for PM OS. Contact [power-user PM] to request access."
**No data leak**: They receive no information about what PM OS contains.

### Edge Case 5: execution/ Directory Doesn't Exist
**Situation**: Web app deployed but `execution/` path not configured or empty.
**Expected Behavior**: Projects browser shows empty state: "No projects yet. Run a PM OS skill to generate your first artifact."

---

## Security & Privacy

### Security Requirements
- [x] **Authentication**: Google OAuth via Auth.js v5; all `(app)/` routes require valid session
- [x] **Authorization**: `AUTHORIZED_EMAILS` env var; unauthorized users see a dedicated page, no data exposed
- [x] **Share token scope**: Tokens grant single-artifact read access only; no traversal to other files
- [x] **File path validation**: `filePath` stored in KV is validated against a whitelist root (`execution/` and `.claude/skills/`) before `fs.readFile` — no path traversal attacks possible
- [x] **Input validation**: Share expiry input validated server-side (enum: `7d | 30d | never`); no free-text file path input from users
- [x] **No PII in artifacts**: STANDARDS.md requirement — artifacts must not contain PII; web app does not add PII handling requirements beyond Auth.js session (email stored server-side only)
- [x] **HTTPS only**: Vercel deployment enforces HTTPS; no HTTP fallback
- [x] **Environment secrets**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_SECRET`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `AUTHORIZED_EMAILS` — all in Vercel env vars, never in code

### Privacy Considerations
- [x] **PII collected**: Email address (from Google OAuth, for authorization check only); stored in Auth.js session cookie (httpOnly, secure, sameSite=lax)
- [x] **Analytics**: Vercel Analytics — anonymous page view events; no PII in event properties
- [x] **Data Deletion**: Removing email from `AUTHORIZED_EMAILS` revokes access; no persistent user records to delete
- [x] **Third-Party Sharing**: Google (OAuth provider); Vercel (hosting + KV + analytics) — standard SaaS data processing

### Compliance Checklist
- [ ] WCAG 2.1 AA — keyboard navigation + ARIA on all interactive elements (per IA accessibility notes)
- [ ] No hardcoded secrets (pre-push hook in PM OS repo enforces)
- [ ] Dependency audit before launch (`npm audit` + Dependabot)

---

## Dependencies & Integrations

### Internal Dependencies
- **PM OS `execution/` directory**: Web app must be co-located with PM OS repo OR configured via `EXECUTION_PATH` env var pointing to the directory on the host machine
- **`.claude/skills/` directory**: Skills catalog reads from this path — same co-location requirement
- **Vercel KV**: Required for share token persistence; must be provisioned before first deploy

### External Dependencies
- **Auth.js v5** (`next-auth@beta`): Google OAuth provider
- **Vercel KV** (Redis): Share token store
- **Google OAuth App**: Client ID + secret; restricted to `@[team-domain].com` in Google Cloud Console
- **`remark` + `rehype` ecosystem**: Server-side markdown → HTML pipeline
- **`mermaid.js`**: Client-side diagram rendering (lazy-loaded)
- **shadcn/ui + Tailwind CSS v4**: Component library per STANDARDS.md

### Timeline Impact
- **Blocker**: Google OAuth app must be configured before any auth testing
- **Critical Path**: Vercel KV provisioning → share token implementation → public share view

---

## Performance Requirements

### Response Time
- **Projects browser**: < 500ms p95 (server component reads `execution/` directory listing)
- **Artifact viewer**: < 1s p95 (reads file + renders markdown server-side)
- **Share link public view**: < 1s p95 (KV lookup + file read + render)

### Scalability
- **Expected Load**: 5–10 authenticated users; up to 50 share link visits/month
- **Scale ceiling**: Vercel serverless + KV handles this load trivially; no scaling work needed in Phase 1

### Reliability
- **Uptime SLA**: Vercel-provided (99.9% SLA on Pro tier)
- **Error Rate**: < 1% of artifact renders (guardrail metric)

---

## Testing Strategy

### Test Coverage Requirements

**Unit Tests** (Vitest):
- Artifact filename parser (`parseArtifactFilename`) — all type/date/title combinations including edge cases (missing type, hyphenated titles, non-standard extensions)
- Phase inference logic (`inferProjectPhase`) — all 5 phase states
- Share token validation logic (`validateShareToken`) — expired, missing, valid cases
- File path sanitization (`sanitizeFilePath`) — path traversal attempts

**Integration Tests**:
- Auth middleware — authorized email passes, unauthorized email redirected
- Share token KV roundtrip — create token, retrieve via public route, verify file content served
- Artifact rendering — known markdown fixture renders expected HTML output

**End-to-End Tests** (Playwright):
1. Happy path: Login → Projects browser → Project detail → Artifact viewer → Share modal → Copy link → Public share view (new incognito tab)
2. Filter: Projects browser → click project → apply PRD filter → only PRDs shown
3. Skill catalog: Navigate to `/skills` → search "prd" → click PRD skill → verify detail page renders

**Accessibility Tests**:
- `axe-core` on all page types (projects browser, artifact viewer, public share view, skill catalog)
- Keyboard-only navigation smoke test: Tab through projects browser to first artifact, open share modal, close with Escape

### QA Checklist
- [ ] All Gherkin acceptance criteria passing
- [ ] Share links work in incognito (no auth cookie leakage)
- [ ] Mermaid diagrams render in all major browsers (Chrome, Firefox, Safari)
- [ ] Mobile layout tested at 375px (iPhone SE breakpoint)
- [ ] Expired token shows correct error (not a 500)
- [ ] Unauthorized email shows correct page (not a blank screen)
- [ ] `npm audit` — zero high/critical vulnerabilities

---

## Launch Plan

### Pre-Launch Checklist
- [ ] Google OAuth app configured and tested
- [ ] Vercel KV provisioned
- [ ] `AUTHORIZED_EMAILS` set for all intended team members
- [ ] `EXECUTION_PATH` env var configured on Vercel (or app co-located with PM OS repo)
- [ ] E2E tests passing in CI
- [ ] Accessibility audit passing (axe-core)
- [ ] Performance benchmarks met (< 1s artifact render p95)

### Rollout Strategy
**Approach**: All-at-once (small team, known users, no external traffic on initial launch)

**Timeline**:
- **Day 0**: Power-user PM dogfoods (solo)
- **Day 3**: Invite 1–2 non-CLI PMs from target team
- **Day 7**: Share first external link with an engineer or exec (validate share flow)
- **Day 14**: Evaluate primary metrics

**Rollback Criteria**:
- Share tokens returning 500 errors consistently → revert KV integration, keep auth + browser working
- Auth.js blocking all logins → revert to prior deploy on Vercel

### Communication Plan
- **Internal**: PM announces in team Slack: "PM OS web app is live — here's your login link and a 2-min tour"
- **Stakeholders**: First share link sent to an engineer with a PRD they're actively building against

---

## Post-Launch

### Monitoring Plan
**Week 1**: Daily check of Vercel Analytics — session counts, artifact view counts, share link clicks
**Week 2–4**: Weekly review of all three primary metrics; interview 1 non-CLI PM user for qualitative feedback

### Iteration Criteria
**When to iterate**:
- Non-CLI PM sessions < 1/week by Week 4 → investigate onboarding friction (add better empty states, email invite flow)
- Share links generated but never clicked → follow up with PM to understand handoff friction
- Skill catalog not viewed → reconsider placement or discoverability in nav

**When to proceed to Phase 2**:
- Primary metrics all hit by Week 4
- At least 1 non-CLI PM expresses desire to "run a skill from here"

---

## Open Questions & Risks

### Open Questions

1. **Co-location vs. Remote Path**
   - **Q**: Should the web app read `execution/` directly from the filesystem (requires co-location with PM OS repo on a persistent server) or from a synced cloud storage path?
   - **Impact if Unresolved**: Deployment architecture depends on this. Vercel serverless functions can't read a local filesystem; requires either (a) deploying on a VPS/container with PM OS repo mounted, or (b) syncing `execution/` to Vercel Blob Storage on each CLI run.
   - **Owner**: Matt (PM + deployment owner)
   - **Target Resolution**: Before `/launch` scaffold

2. **Mermaid Rendering Strategy**
   - **Q**: Client-side `mermaid.js` vs. server-side render (remark-mermaidjs). Client-side is simpler but adds a flash-of-unrendered-content; server-side requires headless Chrome or a Mermaid API service.
   - **Impact if Unresolved**: Implementation approach for artifact viewer. Client-side chosen as default (see Functional Specs) but may need revisiting if FOUC is unacceptable.
   - **Owner**: Engineering
   - **Target Resolution**: Sprint 1

3. **Prototype HTML files**
   - **Q**: How should `.html` prototype artifacts be handled? Render in iframe? Download link only? Direct link?
   - **Impact if Unresolved**: Artifact viewer currently handles `.md` files only. Prototype HTML needs a separate render path or safe iframe sandbox.
   - **Owner**: Engineering + PM
   - **Target Resolution**: Sprint 1

### Risks & Mitigation

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Vercel serverless can't read PM OS filesystem | High | High | Resolve Q1 above before build starts — deploy on Railway/VPS, or implement execution/ sync to Vercel Blob |
| Google OAuth misconfiguration delays auth | Medium | High | Configure OAuth app and test locally in Sprint 1 Day 1 |
| Mermaid rendering fails for complex OST diagrams | Medium | Medium | Fallback to fenced code block with "diagram unavailable" note; test with actual OST artifact |
| Non-CLI PMs don't use the web app after launch | Medium | Medium | Plan 1:1 walkthroughs for first 2 new users; collect friction feedback in Week 1 |
| Share token KV costs unexpectedly high | Low | Low | Vercel KV free tier: 3,000 req/day — well within Phase 1 usage |

---

## Appendix

### Research & Data Sources
- Discovery Insights: `execution/PMOS_pm-os-web-app/2026-03-14_Insights_PM-OS-Web-App.md`
- OST: `execution/PMOS_pm-os-web-app/2026-03-14_OST_PM-OS-Web-App.md`
- IA + User Journeys: `execution/PMOS_pm-os-web-app/2026-03-14_IA_PM-OS-Web-App.md`
- PM OS Strategy (NSMs): `pm-os-reference/identity/STRATEGY.md`
- Engineering Standards: `identity/STANDARDS.md`
- Config Templates: `templates/configs/web/`

### Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| v0.1 | 2026-03-15 | PM OS PRD Skill | Initial draft |

---

**Document Status**: Draft — Awaiting PM Review
**Next Step**: PM review → run `/launch` to scaffold the web app repo with engineering standards baked in

*Generated by PM OS PRD Skill | 2026-03-15*
*BMAD structure: Business Case (grounded in 2026-03-14 discovery artifacts) → Metrics → Approach → Details*
