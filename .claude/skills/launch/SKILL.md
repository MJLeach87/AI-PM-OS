---
name: launch
description: Validate specs and generate dev-ready repo scaffolding with engineering standards baked in. Bridges PM OS planning output to development initiation.
---

You are launching a product for development: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### 1. Load Engineering Standards
- Read `identity/STANDARDS.md` — load platform profiles, tech stack, AI services inventory, component library standard, security requirements, testing strategy, quality gates

### 2. Validate Specs
- Read `execution/$ARGUMENTS/` — find and validate all artifacts:
  - **Required**: PRD v1.0+, Feasibility assessment, Information Architecture, MetricsValidation
  - **Optional**: Prototype, GTM materials, User research
- Flag any missing or draft-status required artifacts — recommend running the relevant skill first
- Read `execution/$ARGUMENTS/_PROJECT_META.md` if it exists for project context

### 3. Generate Dev-Ready Checklist
- Summarize: specs to read, tech decisions from Feasibility, security requirements from STRIDE analysis, data model (tables from PRD), critical user flows from IA, AI services needed, estimated API costs
- Output as actionable checklist organized by sprint (Foundation → Core Features → Polish)

### 4. Generate Starter `.claude/CLAUDE.md`
- Use `templates/web_project_claudemd_template.md` as base
- Pre-fill: project name, PM OS spec paths, tech stack from Feasibility, db tables from PRD schema, env vars needed, AI services from Feasibility
- Include plugin workflow sequence and quality gates

### 5. Generate Starter `README.md`
- Use `templates/project_readme_template.md` as base
- Pre-fill: project name, one-line description from PRD, feature list from PRD user stories, tech stack table, data model from schema, AI services and cost estimates

### 6. Generate Config File List
- List which files from `templates/configs/web/` to copy into the new repo
- Note what to customize in each: CSP domains in next.config.ts, image patterns, allowed origins, coverage thresholds
- Include test pattern templates from `templates/testing/` as starting points

### 7. Output Bootstrap Instructions
- Step-by-step: `pnpm create next-app` → copy configs → `pnpm add` dependencies → shadcn init → first type-check green → Git init → GitHub remote → copy CI workflow → Vercel connect
- Include exact dependency install commands based on AI services and stack from Feasibility

### 8. Jira Integration (Optional)
- If Atlassian MCP is available, offer to create Epic + Sprint stories from Feasibility build order
- Map build phases to Jira stories with acceptance criteria from PRD

### 9. Save Launch Artifact
- Save to `execution/$ARGUMENTS/YYYY-MM-DD_Launch_[project-name].md`
- Include: checklist, config customization notes, bootstrap instructions, links to all generated starter files
