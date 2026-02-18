# ADR-004: PM OS Plugin Packaging Strategy

**Date**: 2026-02-17
**Status**: Proposed
**Deciders**: PM OS Orchestrator + Human PM
**Phase**: 8 prep (Enterprise Readiness)

---

## Context

PM OS is currently distributed as a git repository that users clone and customize. As Phase 8 targets multi-user collaboration and production deployment, we need a distribution strategy that:

1. Makes PM OS easy to install for new teams
2. Preserves the identity layer customization workflow
3. Doesn't add unnecessary dependency overhead
4. Integrates cleanly with Claude Code's native features (hooks, skills, settings)

---

## Options Evaluated

### Option A: npm Package (`npx create-pm-os`)

**How it works**: Publish PM OS as an npm package. Users scaffold a new workspace with `npx create-pm-os my-project`.

**Pros**:
- Familiar developer experience
- Version-pinned releases
- Easy updates (`npx create-pm-os@latest upgrade`)

**Cons**:
- Adds npm/Node.js dependency for a non-code tool
- Publishing cadence adds maintenance overhead
- No native benefit for PM OS's prompt-file architecture

**Verdict**: Deferred. Appropriate if PM OS gains a large external user base, but overhead outweighs benefit for current scale.

---

### Option B: GitHub Template Repository

**How it works**: Mark the PM OS repo as a GitHub template. Users click "Use this template" to get a clean copy without fork history.

**Pros**:
- Zero additional dependencies
- Native GitHub UX (one click to start)
- Users own their copy from day one
- Works with existing identity layer customization workflow

**Cons**:
- Updates require manual merge from upstream
- No automated update path

**Verdict**: Recommended for Phase 8. Simplest path with no new dependencies. Complements the existing `identity/` customization workflow.

---

### Option C: Claude Code Extension (Native)

**How it works**: Package PM OS as a Claude Code MCP server or extension that surfaces skills to any Claude Code workspace.

**Pros**:
- Skills usable without repo clone
- Clean separation between PM OS core and user workspace

**Cons**:
- Claude Code doesn't yet have a stable extension/plugin marketplace
- MCP server architecture doesn't map cleanly to PM OS's file-based skills
- Skills require access to local `identity/`, `execution/`, `pm-os-reference/` directories

**Verdict**: Not feasible with current Claude Code architecture. Revisit when Claude Code publishes an extension SDK.

---

### Option D: Status Quo (Repo Clone)

**How it works**: Users clone the repo, customize `identity/`, and use as-is.

**Pros**: No changes required. Already working.

**Cons**: No guided onboarding, no versioning, no update path.

**Verdict**: Current state. Sufficient for single-user/single-team use.

---

## Decision

**Adopt Option B (GitHub Template)** for Phase 8 distribution, combined with **Claude Code hooks** for in-session workflow automation.

The hooks layer (see `templates/hooks_template.json`) adds immediate value regardless of distribution method:
- Pre-tool-use validation gates
- Post-tool-use artifact logging
- Session-end commit reminders

This combination gives PM OS a clean install path AND better in-session behavior without adding external dependencies.

---

## Implementation Plan

### Phase 8 Action Items

| Item | Effort | Owner |
|------|--------|-------|
| Enable GitHub template flag on repo | XS | Human PM |
| Create `TEMPLATE_SETUP.md` (post-clone checklist) | S | PM OS |
| Add `templates/hooks_template.json` | XS | PM OS (done) |
| Add hooks guidance to `identity/README.md` | XS | PM OS |
| Create `pm-os-plugin/` prototype directory | S | PM OS (done) |

### Not Doing (Deferred)

- npm package publishing — deferred until external user demand justifies it
- Claude Code native extension — deferred until extension SDK available
- Automated update mechanism — deferred to post-Phase 8

---

## Consequences

**Positive**:
- Zero new dependencies
- Teams can start with one GitHub click
- Hooks provide immediate workflow improvement for all users

**Negative**:
- No automatic updates (users must pull from upstream manually)
- GitHub template requires PM OS repo to be public (or org-level template)

---

**ADR Author**: PM OS Orchestrator
**Related Tickets**: PMOS-59 (Phase 8 epic)
**Related Files**: `pm-os-plugin/README.md`, `templates/hooks_template.json`
