# Execution Workspace - Project-Centric Artifact Pipeline

## ⚠️ IMPORTANT: This is YOUR Workspace

**This directory should be EMPTY when you start using PM OS.** It fills up with YOUR product artifacts as you use the system — organized by project, not artifact type.

**NOT PM OS inception materials** — those live in `pm-os-reference/artifacts/`. This workspace is for YOUR actual product development work.

---

## Structure

```
execution/
├── README.md                              (this file)
├── [project-slug]/                        (one folder per initiative)
│   ├── 2026-02-22_OST_Topic.md
│   ├── 2026-02-22_PRD_Feature_v0.1.md
│   ├── 2026-02-22_Feasibility_Feature.md
│   ├── 2026-02-22_Prototype_Feature.tsx
│   ├── 2026-02-22_ValueProp_Feature.md
│   ├── 2026-02-22_Metrics_Feature.md
│   └── DISCOVERY_INDEX.md                 (optional: for 10+ interconnected artifacts)
└── shared/
    ├── 2026-02-22_BattleCard_Competitor.md  (cross-project competitive GTM)
    └── 2026-02-22_MarketResearch_Topic.md   (broad market research)
```

**All artifact types for a single feature live flat in one project folder.** The filename prefix identifies the artifact type — no type-based subdirectories.

---

## Project Slug Convention

**Format**: `[JIRA-KEY]_[brief-kebab-title]`

**Examples**:
- `PMOS-110_one-click-checkout`
- `PMOS-123_user-onboarding-redesign`
- `PROJ-45_payment-gateway-v2`

**How skills determine the slug**:
1. Skills derive the slug from the active Jira issue key + feature name supplied in the request
2. If a Jira key is not provided, the skill asks the PM before writing any output: *"What is the Jira key for this feature? (e.g., PMOS-110)"*
3. Once confirmed, all artifacts for that request go into `execution/[project-slug]/`

---

## File Naming Within a Project

All artifacts use the same naming convention regardless of type:

```
YYYY-MM-DD_[artifact-type]_[brief-title].[ext]
```

**Artifact type prefixes**:

| Artifact | Prefix | Extension |
|----------|--------|-----------|
| Opportunity Solution Tree | `OST` | `.md` |
| Insights summary | `Insights` | `.md` |
| User flow / IA map | `UserFlow` or `IA` | `.md` |
| Problem statement | `ProblemStatement` | `.md` |
| Product Requirements Document | `PRD` | `.md` |
| Technical feasibility | `Feasibility` | `.md` |
| Security assessment | `Security` | `.md` |
| Implementation analysis | `Implementation` | `.md` |
| BPMN workflow | `BPMN` | `.md` |
| API contract | `API` | `.yaml` |
| React/Tailwind prototype | `Prototype` | `.tsx` |
| Accessibility audit | `A11y` | `.md` |
| Value proposition | `ValueProp` | `.md` |
| Competitive positioning | `Positioning` | `.md` |
| Metrics validation | `MetricsValidation` | `.md` |
| A/B test analysis | `ABTest` | `.md` |
| SQL query | `Query` | `.sql` |

**Version suffixes** (for iterative artifacts):
- `_v0.1.md` — Initial draft (for review)
- `_v1.0.md` — Final approved version
- `_v1.1.md` — Minor revision
- `_v2.0.md` — Major revision (significant scope change)

---

## Shared Artifacts

**`execution/shared/`** holds cross-project artifacts that aren't tied to a single initiative:
- Competitive battle cards (relevant across multiple features)
- Broad market research (applies to multiple projects)
- Company-wide positioning documents
- Industry trend analyses

**Rule of thumb**: If an artifact would be cited by two or more different project folders, put it in `shared/`.

---

## Artifact Pipeline Flow

```
User Request + Jira Key
    ↓
[Skill determines project slug → execution/[project-slug]/]
    ↓
[1] Discovery: OST, Insights, UserFlow
    → execution/[project-slug]/YYYY-MM-DD_OST_[topic].md
    ↓
[2] PRD v0.1 (Product Architect / prd skill)
    → execution/[project-slug]/YYYY-MM-DD_PRD_[feature]_v0.1.md
    ↓
[PARALLEL — all write to same project folder]
[3a] Engineering Partner: Feasibility + Security
     → execution/[project-slug]/YYYY-MM-DD_Feasibility_[feature].md
     → execution/[project-slug]/YYYY-MM-DD_Security_[feature].md

[3b] UX Strategist: IA + Prototype
     → execution/[project-slug]/YYYY-MM-DD_IA_[feature].md
     → execution/[project-slug]/YYYY-MM-DD_Prototype_[feature].tsx

[3c] Data Analyst: Metrics Validation
     → execution/[project-slug]/YYYY-MM-DD_MetricsValidation_[feature].md

[3d] GTM Strategist: Value Prop (feature-specific)
     → execution/[project-slug]/YYYY-MM-DD_ValueProp_[feature].md
     Battle cards (cross-project) → execution/shared/
    ↓
[4] Final PRD v1.0 (consolidated)
    → execution/[project-slug]/YYYY-MM-DD_PRD_[feature]_v1.0.md
    ↓
Human PM Review & Approval
```

---

## Quality Standards

All artifacts must pass quality gates defined in `identity/STANDARDS.md`:

- [ ] Aligns with `identity/STRATEGY.md` vision and North Star Metrics
- [ ] Follows brand voice from `identity/STANDARDS.md`
- [ ] Includes specific, measurable success criteria
- [ ] Cites evidence for key decisions (data, research, user feedback)
- [ ] Free of security vulnerabilities (no SQL injection, XSS, hardcoded secrets)
- [ ] Uses approved tech stack from `identity/STANDARDS.md`

---

## Optional: DISCOVERY_INDEX.md

Create `execution/[project-slug]/DISCOVERY_INDEX.md` when:
- You have 10+ discovery artifacts that reference each other
- Multiple OSTs exploring related problem spaces
- Long-term discovery work spanning weeks or months
- Need to explain artifact relationships to stakeholders

Skip it when file search (Glob, grep) provides sufficient navigation.

---

## What Belongs Where

| Artifact | Location |
|----------|----------|
| PRD, OST, specs for a specific feature | `execution/[project-slug]/` |
| Cross-project battle cards, market research | `execution/shared/` |
| YOUR company's strategy/roadmap/standards | `identity/` |
| Mode B improvement proposals, ADRs | `pm-os-reference/documentation/improvement_proposals/` |
| PM OS inception examples (reference only) | `pm-os-reference/artifacts/` |

---

## Confluence Sync (Future)

Directory-level Confluence sync for `execution/[project-slug]/` is planned but not yet implemented. When built:
- Each project slug → one top-level Confluence page
- Artifacts published as child pages (flat hierarchy)
- Sync script resolves project page IDs dynamically at publish time

Until then, individual skills (prd, feature-pipeline, etc.) publish specific artifacts to Confluence directly via the idempotency pattern.

---

## Archiving Old Projects

When a feature ships and the project folder is no longer active:
- **Don't delete from git** — preserve history
- Use `git tag` to mark the shipped state: `git tag [JIRA-KEY]-shipped`
- Optionally move the folder to `execution/archive/[project-slug]/` for organizational clarity

---

**Directory Purpose**: Version-controlled, project-centric workspace for product development artifacts
**Maintained By**: You (Product Manager) + PM OS Skills (generate outputs)
**Related**: `identity/README.md` (org context) | `pm-os-reference/README.md` (quality examples)
