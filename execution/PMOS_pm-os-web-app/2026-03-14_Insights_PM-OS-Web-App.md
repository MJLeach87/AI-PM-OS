# Insights: PM OS Companion Web Application

**Date**: 2026-03-14
**Project**: PMOS_pm-os-web-app
**Artifact Type**: Discovery Insights
**Status**: Draft — Awaiting PM Review

---

## Research Sources

This synthesis draws from:
1. **PM OS CLAUDE.md** — Phase 8 goals, current architecture, user personas
2. **pm-os-reference/identity/STRATEGY.md** — Vision, mission, North Star metrics, long-term timeline
3. **identity/STANDARDS.md** — Engineering standards, platform profiles
4. **Session context** — Direct PM input on problem space and target users
5. **PM OS architecture observation** — Derived from actual system design (execution/ structure, skill routing, MCP integrations)

> **Note**: This is a first-party product discovery — PM OS discovering for PM OS. Research sources are internal documents, direct PM input, and architectural observation. No external customer interviews exist yet. Opportunities marked **[ASSUMPTION — validate]** require validation with 2+ additional non-power-user PMs before committing to feature set.

---

## Insights Summary: PM OS Web App Problem Space

---

### Theme 1: CLI Gatekeeping Blocks Team Adoption

- **Frequency**: 3/5 sources (CLAUDE.md Phase 8 goal, STRATEGY.md Month 6 milestone, direct PM context)
- **Severity**: High
- **Evidence**: "PM OS Phase 8 goal: 5+ PMs using concurrently, onboarding < 2 hours" — CLAUDE.md
- **Evidence**: "Full team onboarded, web prototype operational" (Month 6 target) — pm-os-reference/identity/STRATEGY.md
- **Evidence**: "Current users: primarily 1 PM (power user, Claude Code native)" — direct PM context
- **Evidence**: "Potential new users: PMs without CLI comfort, engineers reviewing specs, execs/stakeholders reviewing PRDs" — direct PM context
- **Implication**: The gap between current state (1 power user) and Phase 8 goal (5+ concurrent users) is fundamentally a UX problem — not a capability problem. PM OS has the capabilities; they're just inaccessible without CLI fluency. The web app unlocks the existing feature set for new user types rather than adding new capabilities.

---

### Theme 2: Artifacts Are Invisible Without Repo Access

- **Frequency**: 3/5 sources (execution/ directory structure, CLAUDE.md artifact conventions, direct PM context)
- **Severity**: High
- **Evidence**: "PM OS artifacts live in execution/ folders (PRDs, OSTs, sprint logs, prototypes)" — direct PM context
- **Evidence**: Execution artifacts use flat `execution/JIRA-KEY_slug/` folder structure with no browsable index — CLAUDE.md architecture
- **Evidence**: Confluence auto-publish exists but covers only 6 skills and requires manual trigger — MEMORY.md
- **Implication**: Stakeholders (executives, cross-functional partners, engineers not in the codebase) have no way to access PM OS outputs without: (a) repo access + Git client, (b) Confluence link sharing (manual, per-artifact), or (c) asking the PM to export/share. This creates a distribution bottleneck — PM OS produces high-quality artifacts that few people can consume. A web layer with browsable artifact views would eliminate this bottleneck.

---

### Theme 3: Onboarding Is Unguided and PM-Dependent

- **Frequency**: 2/5 sources (CLAUDE.md Phase 8 target, STRATEGY.md progressive disclosure principle)
- **Severity**: High
- **Evidence**: "Onboarding < 2 hours" — Phase 8 target implies current onboarding takes significantly longer
- **Evidence**: "Progressive Disclosure — Start minimal (Phase 0 bootstrap) → self-building → self-improving → enterprise-ready" — pm-os-reference/identity/STRATEGY.md
- **Implication [ASSUMPTION — validate]**: Each new PM currently relies on the power user to onboard them: explaining the skill routing table, execution/ conventions, CLAUDE.md, identity/ files, and MCP setup. This doesn't scale. A guided web onboarding flow (skill catalog, project browser, identity setup wizard) would reduce PM-on-PM dependency and hit the < 2hr target.

---

### Theme 4: No Cross-Role View of Work in Progress

- **Frequency**: 2/5 sources (multi-persona context, Confluence integration gap)
- **Severity**: Medium
- **Evidence**: Potential users include "execs/stakeholders reviewing PRDs and status, designers reviewing IA/prototypes" — direct PM context
- **Evidence**: Jira + Confluence already integrated via Rovo MCP, but surfaced only through CLI skill outputs — CLAUDE.md
- **Implication [ASSUMPTION — validate]**: Engineers need a "specs I'm building against" view. Designers need to see prototype + IA artifacts. Execs need project status dashboards. Today, all of these personas must either navigate Confluence manually or ask the PM to share specific links. A role-aware web interface could surface the right artifact type to each persona without requiring them to understand PM OS's internal structure.

---

### Theme 5: PM OS ROI Is Hard to Demonstrate

- **Frequency**: 2/5 sources (STRATEGY.md success metrics, North Star metric framework)
- **Severity**: Medium
- **Evidence**: "Product managers spend 80% of time on strategy, 20% on documentation (reversed from current state)" — pm-os-reference/identity/STRATEGY.md success definition
- **Evidence**: North Star metrics exist (time-to-spec, sprint readiness, discovery velocity) but are tracked manually if at all — STRATEGY.md metric framework
- **Implication [ASSUMPTION — validate]**: Without a dashboard that surfaces velocity metrics, artifact counts, and cycle time, PM OS ROI is invisible to non-PM stakeholders. A web app with a metrics view would make the efficiency gains tangible — supporting business case for continued investment and team expansion.

---

### Theme 6: The CLI Model Doesn't Fit All PM Workflows

- **Frequency**: 2/5 sources (direct PM context, STANDARDS.md)
- **Severity**: Medium
- **Evidence**: "Multi-Environment Design — Optimize for both Cursor IDE and Claude Code environments" — pm-os-reference/identity/STRATEGY.md
- **Evidence**: Skills require file-system knowledge (execution/ conventions, CLAUDE.md routing) — CLAUDE.md architecture
- **Implication**: PMs who primarily work in web apps (Jira, Confluence, Notion, Figma) will not adopt a CLI-native tool, regardless of its capability. The web app needs to meet PMs in their natural environment — the browser — while the CLI remains the power-user surface. This is a distribution strategy, not a capability replacement.

---

## Key Tensions Identified

| Tension | Description | Implication |
|---------|-------------|-------------|
| Companion vs. Replacement | Web app must not duplicate CLI; it must complement it | Clear scope boundary needed — read-heavy in web, create-heavy in CLI (initially) |
| Breadth vs. Depth | Many potential user types vs. limited build bandwidth | Start with 1-2 highest-leverage personas; expand iteratively |
| Artifact Browsing vs. Real-Time Generation | Reading artifacts is distinct from running skills | Phase 1 web app may be read + share layer; Phase 2 adds skill triggers |
| Simplicity vs. Power | Non-CLI users need simple UX; power users need full fidelity | Role-aware views rather than feature parity |

---

## Prioritized Opportunities (for OST)

Based on frequency × severity scoring:

| Rank | Opportunity | Frequency | Severity | Score |
|------|-------------|-----------|----------|-------|
| 1 | Enable non-CLI PMs to access and use PM OS | High | High | 9 |
| 2 | Make artifacts browsable + shareable without repo access | High | High | 9 |
| 3 | Guided onboarding that doesn't require PM hand-holding | Medium | High | 7 |
| 4 | Role-aware views for engineers, designers, execs | Medium | Medium | 5 |
| 5 | Metrics dashboard demonstrating PM OS ROI | Low | Medium | 4 |

---

## Research Gaps

The following gaps would most de-risk the top opportunities:

1. **Non-power-user PM interviews**: What does a PM without CLI comfort actually struggle with? What's their current workflow? (Top priority — validate Themes 1, 3, 6)
2. **Stakeholder access patterns**: How often do execs/engineers try to access PM OS artifacts today? What do they do when they can't? (Validate Theme 2, 4)
3. **Onboarding time measurement**: What's actual current onboarding time? What are the specific friction points? (Validate Theme 3)
4. **Confluence usage data**: How many Confluence pages created? How many views/visitors? (Quantify Theme 2)

---

*Generated by PM OS Discovery Skill | 2026-03-14*
*Evidence standard: ≥2 independent sources required to elevate a theme. [ASSUMPTION — validate] marks single-source claims.*
