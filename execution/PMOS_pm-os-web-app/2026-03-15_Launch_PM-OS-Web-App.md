# Launch: PM OS Companion Web App — Phase 1

**Date**: 2026-03-15
**Project**: PMOS_pm-os-web-app
**Status**: Ready for Development
**PRD**: `execution/PMOS_pm-os-web-app/2026-03-15_PRD_PM-OS-Web-App-Phase1_v0.1.md`
**IA**: `execution/PMOS_pm-os-web-app/2026-03-14_IA_PM-OS-Web-App.md`

---

## Spec Validation

| Artifact | Status | Notes |
|----------|--------|-------|
| PRD v0.1 | ✅ Draft — sufficient for Phase 1 build | Personal demo scope confirmed |
| Information Architecture | ✅ Complete | Routes, components, user journeys defined |
| Prototype | ✅ Complete | `2026-03-14_Prototype_PM-OS-Web-App.html` |
| OST | ✅ Complete | Phase 1 solution set validated |
| Feasibility / STRIDE | ⚠️ Skipped | Acceptable for personal demo; no user data mutations |
| Metrics Validation | ⚠️ Skipped | Acceptable — no data warehouse integration |

> PRD is v0.1 (draft) but scope is locked and clear. Proceeding to build is appropriate for a personal demo project.

---

## Architecture Decisions (Agreed Pre-Build)

| Decision | Choice | Reason |
|----------|--------|--------|
| Data source | GitHub Contents API | Artifacts are already in the GitHub repo; no filesystem mounting needed on Vercel |
| Auth | Vercel Password Protection | Personal demo — no per-user accounts needed; one password set in Vercel dashboard |
| Confluence | ❌ Out of scope | Not a priority; clean markdown rendering in-app is the goal |
| Share tokens | ❌ Out of scope | Phase 2 if needed |
| Database | ❌ None | GitHub API is the data source; no persistence needed |
| Analytics | ❌ Not instrumented | Personal demo |
| AI services | ❌ None | Read-only artifact viewer |

---

## Tech Stack (This Project)

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15 App Router | SSR, server components |
| Language | TypeScript strict | Per STANDARDS.md |
| Styling | Tailwind CSS v4 | Per STANDARDS.md |
| Components | shadcn/ui | Per STANDARDS.md |
| Data source | GitHub Contents API | `fetch` with `GITHUB_TOKEN` |
| Markdown | remark + rehype pipeline | Server-side rendering |
| Diagrams | mermaid.js | Client-side, lazy-loaded |
| URL state | nuqs | Search/filter params |
| Package manager | pnpm | Per STANDARDS.md |
| Linter/Formatter | Biome | Per STANDARDS.md |
| Deployment | Vercel | Password-protected |

**Intentionally excluded** (not needed for this project):
- Auth.js / Google OAuth — replaced by Vercel Password Protection
- Turso / Drizzle — no database needed
- Vercel KV / Blob — no storage needed
- AI SDKs — read-only app

---

## Sprint Plan

### Sprint 1 — Foundation (Days 1–2)

- [ ] Bootstrap Next.js 15 app with pnpm
- [ ] Copy and configure: biome, tsconfig, next.config, CI workflow
- [ ] Install and configure shadcn/ui + Tailwind v4
- [ ] `lib/github.ts` — GitHub Contents API client with caching
- [ ] `lib/artifacts.ts` — filename parser + phase inference
- [ ] `lib/markdown.ts` — remark/rehype pipeline (GFM, syntax highlight, heading slugs)
- [ ] `types/index.ts` — Project, Artifact, Skill TypeScript types
- [ ] App shell: root layout, sidebar nav, header with breadcrumb
- [ ] First type-check green: `pnpm tsc --noEmit`

### Sprint 2 — Projects Browser + Artifact Viewer (Days 3–5)

- [ ] `/` — Projects browser: grid of project cards from GitHub API
  - Card: Jira key badge, title, artifact count, last updated, phase label, artifact type badges
  - Search input (nuqs URL state)
  - Sorted newest-first
- [ ] `/projects/[slug]` — Project detail
  - Artifact list with type badge, date, title
  - Artifact type filter tabs (nuqs URL state)
  - Sorted newest-first
- [ ] `/projects/[slug]/[artifact]` — Artifact viewer
  - Rendered markdown (server-side remark/rehype)
  - Floating ToC sidebar (h2/h3 anchors)
  - Artifact type badge in header
  - Breadcrumb: Home → Project → Artifact
  - Mermaid diagrams (client-side lazy-load)
  - 404 state for missing artifacts

### Sprint 3 — Skill Catalog + Polish (Days 6–7)

- [ ] `/skills` — Skill catalog
  - Grid of skill cards from `.claude/skills/` via GitHub API
  - Search (nuqs)
- [ ] `/skills/[name]` — Skill detail
  - Full SKILL.md rendered as HTML
  - Copy-able example prompt block
- [ ] Empty states: no projects, no artifacts, skill not found
- [ ] Mobile responsive layout (sidebar collapses to hamburger)
- [ ] Vercel deploy + password protection enabled
- [ ] `pnpm audit` — zero critical vulnerabilities
- [ ] README complete

---

## Dev Checklist

### Security
- [ ] `GITHUB_TOKEN` in `.env.local` only — never committed
- [ ] GitHub API `filePath` validated against allowed roots (`execution/`, `.claude/skills/`) — no traversal
- [ ] Content rendered with remark/rehype (not `dangerouslySetInnerHTML` raw) — XSS safe
- [ ] No secrets in source code
- [ ] `pnpm audit` passes before deploy

### Quality Gates
- [ ] `pnpm tsc --noEmit` — zero errors
- [ ] `pnpm biome check .` — zero warnings
- [ ] Unit tests for `lib/artifacts.ts` (filename parser + phase inference)
- [ ] Unit tests for `lib/markdown.ts` (render pipeline smoke test)
- [ ] Mobile layout tested at 375px breakpoint
- [ ] Keyboard navigation: Tab through projects browser and artifact viewer
- [ ] Mermaid fallback tested (show code block if diagram fails)

### Performance
- [ ] Projects browser < 500ms (GitHub API response cached with `revalidate: 300`)
- [ ] Artifact viewer < 1s (single file fetch + server render)
- [ ] No client-side fetch waterfalls — all data fetched in server components

---

## Bootstrap Instructions

### Step 1 — Create Next.js App

```bash
cd "C:\Users\MJLea\Claude Code Projects"
pnpm create next-app@latest pm-os-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd pm-os-web
```

> When prompted: App Router ✅, Turbopack ✅ (for dev speed)

### Step 2 — Replace Default Config Files

Copy from PM OS `templates/configs/web/`:
```bash
# From PM OS repo:
cp "../PM OS/templates/configs/web/biome.json" .
cp "../PM OS/templates/configs/web/tsconfig.json" .
cp "../PM OS/templates/configs/web/next.config.ts" .
cp "../PM OS/templates/configs/web/ci.yml" .github/workflows/
```

Remove ESLint (using Biome instead):
```bash
pnpm remove eslint eslint-config-next @eslint/eslintrc
rm .eslintrc.* eslint.config.*
```

### Step 3 — Install Dependencies

```bash
# Core UI
pnpm dlx shadcn@latest init
# Choose: Default style, Zinc base color, CSS variables: yes

# URL state
pnpm add nuqs

# Markdown pipeline
pnpm add remark remark-gfm remark-html rehype rehype-slug rehype-highlight highlight.js

# Dev tools
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
pnpm add -D @playwright/test
pnpm add -D @biomejs/biome
```

### Step 4 — Install shadcn/ui Components

```bash
pnpm dlx shadcn@latest add badge button card input separator sheet skeleton
```

> Add more as needed during build. Never copy from shadcn docs — always use the CLI.

### Step 5 — Environment Setup

Create `.env.local`:
```
GITHUB_TOKEN=your_pat_here
GITHUB_OWNER=MJLeach87
GITHUB_REPO=AI-PM-OS
```

Create `.env.example` (safe to commit):
```
GITHUB_TOKEN=           # GitHub PAT — repo read scope
GITHUB_OWNER=           # Your GitHub username
GITHUB_REPO=            # Your PM OS repo name
```

### Step 6 — GitHub PAT Setup

1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens
2. Create token with scope: **Contents: Read-only** on the `AI-PM-OS` repo only
3. Paste into `.env.local` — never commit this file

### Step 7 — Git Init + GitHub Remote

```bash
git init
git add .
git commit -m "chore: initial Next.js 15 scaffold"
# Create repo on GitHub: pm-os-web (private)
git remote add origin https://github.com/MJLeach87/pm-os-web.git
git push -u origin main
```

### Step 8 — Vercel Deploy

1. Connect `pm-os-web` repo to Vercel
2. Add environment variables in Vercel dashboard:
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
3. Enable Password Protection: Vercel dashboard → Settings → Security → Password Protection
4. Verify first deploy is green before building features

### Step 9 — First Type-Check Green

```bash
pnpm tsc --noEmit   # Must be zero errors before starting features
pnpm biome check .  # Must be zero warnings
```

---

## Key Implementation Notes

### GitHub API Client (`lib/github.ts`)

```typescript
const GITHUB_API = "https://api.github.com";
const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

// List execution/ projects
export async function getProjects() {
  const res = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/execution`,
    { headers, next: { revalidate: 300 } }
  );
  // Returns array of { name, type, path } — filter type === "dir"
}

// Get file content (base64 decoded)
export async function getFileContent(path: string) {
  const res = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${path}`,
    { headers, next: { revalidate: 300 } }
  );
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}
```

### Artifact Filename Parser (`lib/artifacts.ts`)

Parses `YYYY-MM-DD_Type_Title-Words.md` convention:
- `date` = part 0
- `type` = part 1 (used for badge color)
- `title` = part 2+, dashes → spaces, title-cased

### Markdown Pipeline (`lib/markdown.ts`)

```typescript
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)       // Tables, strikethrough, task lists
    .use(remarkHtml, { sanitize: false })  // Allow HTML passthrough
    .process(markdown);
  return result.toString();
}
```

Apply `github-markdown-css` class (`markdown-body`) to the rendered container for clean default styling.

### Mermaid Diagrams

Mermaid code blocks come through as `<code class="language-mermaid">`. Client component detects these and renders with `mermaid.initialize()`. Fallback: leave as styled code block.

### Caching Strategy

Use Next.js `fetch` `revalidate: 300` (5 minutes) for GitHub API calls. For development, set `revalidate: 0` to always fetch fresh. This means changes to `execution/` on GitHub are visible in the web app within 5 minutes of push.

---

## Starter Files

Two starter files are generated alongside this launch artifact:
- `CLAUDE.md` → copy to the new repo's `.claude/CLAUDE.md`
- `README.md` → copy to the new repo's `README.md`

Both are pre-filled with this project's specifics.

---

## Config Customizations Needed

When copying from `templates/configs/web/`:

| File | What to customize |
|------|------------------|
| `next.config.ts` | Remove image domains (no `next/image` from external URLs needed initially); add `api.github.com` to allowed fetch origins if CSP is strict |
| `tsconfig.json` | No changes needed — use as-is |
| `biome.json` | No changes needed — use as-is |
| `vitest.config.ts` | No changes needed — use as-is |
| `ci.yml` | Remove E2E step initially (add back in Sprint 3); ensure `GITHUB_TOKEN` secret is set in GitHub Actions |

---

*Generated by PM OS Launch Skill | 2026-03-15*
*Next: copy CLAUDE.md + README.md to new repo, run bootstrap instructions, start Sprint 1*
