# PM OS Web App — Claude Code Project Context

**Repository**: `github.com/MJLeach87/pm-os-web`
**Created**: 2026-03-15
**PM OS Execution Folder**: `execution/PMOS_pm-os-web-app/` (in `MJLeach87/AI-PM-OS`)
**Engineering Standards**: PM OS `identity/STANDARDS.md`

---

## Project Overview

A personal demo frontend for PM OS. Reads artifacts from the `AI-PM-OS` GitHub repo via the GitHub Contents API and renders them as clean, navigable web pages. No database, no auth system — Vercel password protection handles access.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix primitives) |
| Data source | GitHub Contents API (`GITHUB_TOKEN`) |
| Markdown | remark + rehype (server-side) |
| Diagrams | mermaid.js (client-side, lazy) |
| URL state | nuqs |
| Package manager | pnpm |
| Linter/Formatter | Biome |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel (password-protected) |

**No database. No Auth.js. No AI services.**

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout + sidebar shell
│   ├── page.tsx                      # Projects browser (/)
│   ├── projects/
│   │   └── [slug]/
│   │       ├── page.tsx              # Project detail + artifact list
│   │       └── [artifact]/
│   │           └── page.tsx          # Artifact viewer
│   └── skills/
│       ├── page.tsx                  # Skill catalog
│       └── [name]/
│           └── page.tsx              # Skill detail
├── components/
│   ├── ui/                           # shadcn/ui — DO NOT modify
│   ├── shared/                       # Sidebar, Header, EmptyState, ToC
│   └── artifacts/                    # ProjectCard, ArtifactRow, ArtifactContent, MermaidBlock
├── lib/
│   ├── github.ts                     # GitHub Contents API client
│   ├── artifacts.ts                  # Filename parser + phase inference
│   ├── markdown.ts                   # remark/rehype pipeline
│   └── utils.ts                      # cn() + shared utils
└── types/
    └── index.ts                      # Project, Artifact, Skill types
```

---

## PM OS Specs

| Artifact | Path in AI-PM-OS repo |
|----------|-----------------------|
| PRD v0.1 | `execution/PMOS_pm-os-web-app/2026-03-15_PRD_PM-OS-Web-App-Phase1_v0.1.md` |
| Information Architecture | `execution/PMOS_pm-os-web-app/2026-03-14_IA_PM-OS-Web-App.md` |
| Prototype | `execution/PMOS_pm-os-web-app/2026-03-14_Prototype_PM-OS-Web-App.html` |
| Launch artifact | `execution/PMOS_pm-os-web-app/2026-03-15_Launch_PM-OS-Web-App.md` |

---

## Key Implementation Details

### GitHub API Pattern

All data fetching is in server components via `lib/github.ts`. Use `{ next: { revalidate: 300 } }` for 5-minute caching. Never call the GitHub API from client components.

```typescript
// lib/github.ts — base pattern
const res = await fetch(
  `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${path}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 300 },
  }
);
```

File content comes back base64-encoded — always `Buffer.from(data.content, "base64").toString("utf-8")` to decode.

### Artifact Filename Convention

PM OS artifacts follow: `YYYY-MM-DD_[Type]_[Title-Words].md`

`lib/artifacts.ts` parses this into `{ date, type, title }`. Types map to badge colors — see PRD D-section for the full mapping.

### Markdown Rendering

Server-side only via remark/rehype pipeline in `lib/markdown.ts`. Wrap rendered output in a `div` with `className="markdown-body"` and apply `github-markdown-css` (or equivalent Tailwind prose styles). Never use `dangerouslySetInnerHTML` without first running through the remark pipeline.

Mermaid blocks (`<code class="language-mermaid">`) are handled by a client component that lazy-loads `mermaid.js`. Fallback: render as a styled code block with a "Diagram" label.

### Component Library

Install only via CLI: `pnpm dlx shadcn@latest add [component]`

Never modify files in `components/ui/`. Build wrappers in `components/artifacts/` or `components/shared/`.

---

## Plugin Workflow

1. `/feature-dev` — structured build from PRD + IA specs above
2. `/frontend-design` — production-grade UI from prototype HTML
3. `/code-review` — after each sprint
4. `/commit-commands` — commit + push

---

## Quality Gates

### Before Commit
- [ ] `pnpm tsc --noEmit` — zero type errors
- [ ] `pnpm biome check .` — zero warnings
- [ ] `pnpm test` — unit tests pass (lib/artifacts.ts, lib/markdown.ts)
- [ ] No `dangerouslySetInnerHTML` without remark pipeline
- [ ] No GitHub API calls in client components

### Before Deploy
- [ ] `pnpm audit` — no critical vulnerabilities
- [ ] `GITHUB_TOKEN` set in Vercel dashboard (not in source)
- [ ] Vercel Password Protection enabled
- [ ] Mobile layout tested at 375px

---

## Security

- `GITHUB_TOKEN` in `.env.local` only — gitignored
- File paths validated against `execution/` and `.claude/skills/` roots before API calls
- Markdown rendered through remark (not raw HTML injection)
- Vercel password protection is the sole access gate

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `GITHUB_TOKEN` | GitHub PAT — repo:read on AI-PM-OS | Yes |
| `GITHUB_OWNER` | GitHub username (MJLeach87) | Yes |
| `GITHUB_REPO` | Repo name (AI-PM-OS) | Yes |

---

## Key Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Unit tests
pnpm test:watch       # Watch mode
pnpm tsc --noEmit     # Type check
pnpm biome check .    # Lint + format
pnpm biome check . --fix  # Auto-fix
```

---

**Last Updated**: 2026-03-15
