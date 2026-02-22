---
name: pm-os-quality-audit
description: PM OS MAINTENANCE SKILL — Quality audit for PM OS agents, outputs, and system health. Detects output patterns, generates improvement proposals, and tracks system health metrics. Use this to audit PM OS itself, not for auditing your product work.
---

You are running a PM OS system quality audit. $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

**Scope**: This skill audits PM OS as a system — its agents, outputs, and self-improvement health. It is NOT for auditing your product features or user research. For product work quality review, ask the relevant agent directly.

### 1. Define Audit Scope
Based on $ARGUMENTS, determine what to audit:
- **No argument** → Full system audit: all recent artifacts across all agents
- **"agents"** → Agent spec quality: are agent files current, complete, and consistent?
- **"PRDs"** → Product Architect output quality: BMAD compliance, metric completeness, evidence citations
- **"routing"** → Orchestrator accuracy: are requests being routed to correct agents?
- **"skills"** → Skills layer audit: are all skills discoverable, correctly formatted, and complete?
- **"[agent-name]"** → Focused audit on a single agent's recent outputs

### 2. Gather Artifacts
- Glob `execution/*/` for all project folders and their artifacts generated since last audit (project-centric structure: each folder is `[JIRA-KEY]_[slug]/`)
- Also check `execution/shared/` for cross-project artifacts
- Read `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md` for baseline metrics
- Check `pm-os-reference/documentation/improvement_proposals/` for open proposals not yet implemented

### 3. Quality Evaluation
For each artifact in scope, evaluate against `identity/STANDARDS.md` quality gates:
- [ ] Strategic alignment: cites identity/STRATEGY.md vision or North Star Metric
- [ ] Evidence-based: key decisions supported by data or research
- [ ] Template compliance: follows relevant template structure
- [ ] Brand voice: professional, technical, concise
- [ ] Security: no PII exposed, credentials excluded
- [ ] Completeness: no [PLACEHOLDER] or [TBD] sections in final artifacts

Score each artifact: Pass / Flag / Fail with specific issue noted.

### 4. Pattern Detection
Across all audited artifacts, identify:
- Recurring issues (same problem in ≥2 artifacts → systemic gap)
- Missing sections that appear consistently
- Routing errors (wrong agent invoked, or agent overstepped scope)
- Template drift (agent outputs diverging from template structure)

### 5. Generate Improvement Proposals
For each systemic gap identified, create a structured proposal:
```
## Improvement Proposal: [Title]
**Problem**: [What's wrong, with frequency count]
**Root Cause**: [Why it's happening — agent instruction gap, template issue, routing error]
**Proposed Fix**: [Specific change to agent file, template, or skill]
**Impact**: [What improves if fixed]
**Effort**: XS / S / M / L
**Priority**: Critical / High / Medium / Low
```

Save proposals to `pm-os-reference/documentation/improvement_proposals/YYYY-MM-DD_Proposals_[scope].md`

### 6. Update Quality Dashboard
Update `pm-os-reference/documentation/QUALITY_METRICS_DASHBOARD.md`:
- Artifact counts for audited period
- Pass/Flag/Fail rates by agent
- Open improvement proposals count
- Any new risks identified

**Note**: Dashboard update is a required process gate at phase close (IP-001). Always run this step when auditing after a phase completion, not just for systemic issues.

### 6b. Publish Audit Report to Confluence

Publish the quality audit report to Confluence using the idempotency pattern:

1. **Search** for an existing page:
   - CQL: `title = "Quality Audit: [scope] – YYYY-MM-DD"` AND `space = "PM"`
   - Cloud ID: `d1d9d612-3182-4d76-ad10-bce2f315b8f3`
2. **If found** → call `updateConfluencePage` with the existing page ID
3. **If not found** → call `createConfluencePage`:
   - **Phase audits** (e.g., "Phase 8"): parent page ID `1179649` (PM OS - Phase Reports)
   - **All other audits**: parent page ID `1212417` (PM OS - Operations)
4. **Confirm**: State the published page title and URL to the user

**Title convention**: `Quality Audit: [scope] – YYYY-MM-DD`
- `[scope]` = the argument passed (e.g., "Phase 8", "agents", "PRDs", "skills")
- No argument → use "Full System"

**Content**: Audit report including:
- Audit scope, date, and period covered
- Overall health: 🟢 Healthy / 🟡 Needs attention / 🔴 Critical issues
- Pass/Flag/Fail rates by agent (from Step 3)
- Top improvement proposals (from Step 5)
- For phase audits: deliverables table + velocity note from `pm-os-reference/documentation/VELOCITY_TRACKING.md`

### 7. Summary Report
Present findings:
- Audit scope and period covered
- Overall health: 🟢 Healthy / 🟡 Needs attention / 🔴 Critical issues
- Top 3 improvement opportunities with priority
- Proposals saved location
