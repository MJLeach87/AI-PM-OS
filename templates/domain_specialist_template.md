# Domain Specialist Agent Template

**Template Type**: Domain Specialist Sub-Agent
**Phase**: 7 (Claude Code Advanced Workflows)
**Use Case**: Create a domain-specific PM OS agent that layers vertical context (compliance, vocabulary, workflows) on top of the core agent team.

---

## When to Create a Domain Specialist

Create a domain specialist when your product operates in a vertical with:

1. **Specialized vocabulary** not covered by PM OS defaults (e.g., PMPM costs in healthcare, interchange fees in payments)
2. **Domain-specific compliance requirements** that must appear in every PRD/spec (e.g., HIPAA, PCI-DSS, SOC 2, FDA 510k)
3. **Unique workflow patterns** that differ from standard PM OS flows (e.g., regulatory review gate before launch)
4. **Recurring routing gaps** — you find yourself explaining the same domain context in every session

**Examples**: Payments, Healthcare, B2B SaaS, Marketplace, EdTech, Fintech, GovTech, Legal Tech

---

## How Domain Specialists Fit the Architecture

Domain specialists are **context injectors**, not replacements for core agents. They:

- Load domain vocabulary, regulations, and patterns as pre-context
- Augment (not replace) Product Architect, Engineering Partner, and UX Strategist outputs
- Are invoked by the Orchestrator when domain-specific keywords appear
- Save to the same `execution/` directories as core agents (no new directories needed)

**Routing pattern**:
```
User request with domain keywords
    → Orchestrator detects domain
    → Domain Specialist: loads domain context, enriches brief
    → Hands enriched brief to appropriate core agent (Product Architect, Engineering Partner, etc.)
    → Core agent generates output with domain context pre-loaded
```

---

## Template: [Domain Name] Specialist

Copy this template and fill in YOUR domain's specifics. Save to `.claude/skills/[domain]-specialist/SKILL.md`.

---

```markdown
---
name: [domain]-specialist
description: [Domain] context expert — loads vertical-specific vocabulary, compliance requirements, and workflow patterns for [domain] product development
---

# [Domain Name] Specialist Agent

**Agent Type**: Domain Context Specialist
**Environment**: Claude Code
**Created**: YYYY-MM-DD
**Version**: 1.0
**Domain**: [e.g., Payments / Healthcare / B2B SaaS / Marketplace]

**Purpose Statement**:
The [Domain Name] Specialist loads [domain]-specific context before core PM OS agents execute.
This ensures PRDs, technical specs, and discovery artifacts reflect [domain] vocabulary,
[compliance framework] requirements, and [domain]-specific user mental models — without
repeating this context in every session.

---

## Domain Vocabulary

Key terms agents must use correctly in this domain:

| Term | Definition | Do NOT confuse with |
|------|-----------|---------------------|
| [Term 1] | [Precise definition] | [Common misconception] |
| [Term 2] | [Precise definition] | [Common misconception] |
| [Term 3] | [Precise definition] | [Common misconception] |
| [Add all domain-critical terms] | | |

**Usage rule**: When generating PRDs or specs, use these terms as defined here. Do not
substitute general PM vocabulary when domain terms are more precise.

---

## Compliance & Regulatory Context

**Primary compliance framework**: [e.g., PCI-DSS Level 2 / HIPAA / SOC 2 Type II / GDPR]

**Mandatory inclusions in every PRD for this domain**:
- [ ] [Compliance requirement 1] — e.g., "Data residency requirements must be specified"
- [ ] [Compliance requirement 2] — e.g., "PII handling must include encryption at rest"
- [ ] [Compliance requirement 3] — e.g., "Audit log retention period must be defined"

**Mandatory inclusions in every technical spec**:
- [ ] [Security requirement] — e.g., "Tokenization for card data (no raw PAN storage)"
- [ ] [Architecture requirement] — e.g., "Separate cardholder data environment (CDE)"
- [ ] [Monitoring requirement] — e.g., "Fraud detection alerting thresholds"

**Regulatory gates before launch** (add to Engineering Partner tech spec workflow):
1. [Gate 1] — e.g., "Legal/compliance review required before any PII field added to schema"
2. [Gate 2] — e.g., "Security penetration test required before processing live transactions"
3. [Gate 3] — e.g., "QSA sign-off for PCI-DSS scope changes"

**Reference documents** (if stored in Google Drive or Confluence):
- [Document name]: [retrieval instruction or URL]
- [Document name]: [retrieval instruction or URL]

---

## Domain-Specific User Mental Models

How users in this domain think about product problems (inform OST generation and PRDs):

**Primary user types**:
1. **[User type 1]**: [Role, key motivations, pain points, success definition]
2. **[User type 2]**: [Role, key motivations, pain points, success definition]
3. **[User type 3]**: [Role, key motivations, pain points, success definition]

**Key user journeys specific to this domain**:
- [Journey 1]: [Brief description — e.g., "Merchant onboarding: KYC → bank verification → first transaction"]
- [Journey 2]: [Brief description]

**Domain-specific friction points** (recurring themes in user research for this domain):
- [Friction 1]: [e.g., "Regulatory complexity creates anxiety — users fear compliance mistakes"]
- [Friction 2]: [e.g., "Settlement delays are universally painful — users anchor on T+1 or T+2"]

---

## Domain-Specific Metrics

Key metrics relevant to this domain (supplement identity/STRATEGY.md NSMs):

| Metric | Definition | Typical Benchmark | Notes |
|--------|-----------|------------------|-------|
| [Metric 1] | [Precise definition] | [Industry benchmark] | [e.g., "Above benchmark = competitive"] |
| [Metric 2] | [Precise definition] | [Industry benchmark] | |
| [Metric 3] | [Precise definition] | [Industry benchmark] | |

**How to use**: When Product Architect proposes success metrics, check if domain metrics
above are more appropriate or should supplement the proposed metrics.

---

## Workflow Modifications for This Domain

Standard PM OS workflows modified for [domain]:

### PRD Generation (Product Architect)

**Additional sections required in every [domain] PRD**:
```
## Compliance Review
- Regulatory frameworks applicable: [list]
- Compliance sign-off required from: [team/role]
- Data classification: [PII / PHI / PCI / Public]
- Audit log requirements: [yes/no, retention period]

## [Domain] Risk Assessment
- [Domain-specific risk 1]: [mitigation]
- [Domain-specific risk 2]: [mitigation]
```

### Technical Spec (Engineering Partner)

**Additional sections required**:
```
## [Compliance Framework] Requirements
- [Specific technical controls required]
- [Architecture constraints]
- [Testing requirements before launch]
```

### Metrics Validation (Data Analyst)

**Domain-specific data sources** to check beyond identity/DATA_DICTIONARY.md:
- [Data source 1]: [what it contains, how to access]
- [Data source 2]: [what it contains, how to access]

---

## Triggers & Routing

### Keyword Triggers (add to CLAUDE.md routing)

Add these keywords to the task routing section in `.claude/CLAUDE.md`:

```
[Domain] specialist keywords:
[keyword 1], [keyword 2], [keyword 3], [compliance framework name],
[domain regulatory body], [domain-specific metric names]
```

### When to Invoke

✅ **Invoke this specialist when**:
- Request involves [specific domain activity]
- User mentions [compliance framework]
- Feature touches [sensitive domain data type]
- PRD metrics reference [domain-specific KPIs]

❌ **Do NOT invoke when**:
- Request is purely general PM work with no [domain] touchpoints
- [Domain] context already pre-loaded in session

---

## Quality Gates (Domain-Specific)

Before any artifact is finalized in this domain, verify:

- [ ] All [domain] terms used correctly per Domain Vocabulary section
- [ ] Compliance inclusions present (PRD and tech spec checklists above)
- [ ] No [domain-prohibited patterns] — e.g., "Never recommend storing raw card numbers"
- [ ] Regulatory gates identified and included in launch plan
- [ ] [Domain] metrics proposed or validated where applicable

---

## References

**Regulatory bodies**: [e.g., PCI SSC / HHS / FCA / FDA]
**Key standards**: [e.g., PCI-DSS v4.0 / HIPAA Security Rule / ISO 27001]
**Internal docs**: [links to your company's compliance documentation]
**Related agents**: Product Architect, Engineering Partner, Data Analyst
**Related identity files**: `identity/STRATEGY.md`, `identity/STANDARDS.md`, `identity/DATA_DICTIONARY.md`

---

**Specification Status**: Active
**Version**: 1.0
**Created**: YYYY-MM-DD
**Domain Owner**: [Team or person responsible for keeping this current]
**Review Frequency**: Quarterly (compliance requirements change) or when regulations update
```

---

## How to Activate a Domain Specialist

After creating `.claude/skills/[domain]-specialist/SKILL.md`:

**Step 1: Update CLAUDE.md routing**

Add domain keywords to the task routing section in `.claude/CLAUDE.md` so Claude knows when to invoke `/[domain]-specialist`.

**Step 2: Test routing**

```
Test prompt: "[Domain keyword]-related request"
Expected: CLAUDE.md routes to /[domain]-specialist → specialist loads context → hands to Product Architect
```

**Step 3: Validate PRD output**

Run `/prd [feature that touches domain]` and verify:
- Domain vocabulary appears correctly
- Compliance sections are present
- Domain-specific metrics are included

**Step 4: Document in identity/STANDARDS.md**

Add a note to `identity/STANDARDS.md` that a [domain] specialist is active, so all agents are aware of the domain overlay.

---

## Example Domain Specialists

| Domain | File | Key Additions |
|--------|------|---------------|
| Payments | `.claude/agents/payments_specialist.md` | PCI-DSS, interchange, settlement, tokenization, fraud |
| Healthcare | `.claude/agents/healthcare_specialist.md` | HIPAA, PHI, EHR integration, clinical workflow, FDA |
| B2B SaaS | `.claude/agents/b2b_saas_specialist.md` | Enterprise sales cycles, multi-tenancy, SSO, SOC 2 |
| Marketplace | `.claude/agents/marketplace_specialist.md` | Supply/demand balance, take rate, trust & safety, NPS by side |
| EdTech | `.claude/agents/edtech_specialist.md` | FERPA, learning outcomes, accessibility (WCAG), LTI |

---

**Template Version**: 1.0 (Phase 7 — Claude Code Advanced Workflows)
**Used By**: PM, Product Architect (self-building), System Evaluator (proposes new specialists)
**Storage Location**: `templates/domain_specialist_template.md`
**Related Templates**: `templates/agent_spec_template.md` (full agent spec), `templates/prd_template.md`
