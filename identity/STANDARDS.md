# 🔧 CUSTOMIZE THIS: Your Organizational Standards

**IMPORTANT**: Replace all content below with YOUR tech stack, brand voice, security requirements, and quality standards.

**Reference**: See `pm-os-reference/identity/STANDARDS.md` for PM OS's own standards as a structural example.

**Purpose**: This file defines YOUR organization's standards that PM OS agents must follow when generating artifacts.

---

## Brand Voice & Communication

### Writing Principles

**[Define YOUR brand's writing principles]**

Examples:
- **Professional**: Use industry-standard terminology, avoid casual language
- **Technical**: Precise specifications over ambiguous descriptions
- **Concise**: Every word serves a purpose, eliminate fluff
- **Evidence-Based**: Cite data, research, or clear reasoning for decisions
- **Action-Oriented**: Focus on outcomes and next steps

### Documentation Style

**[Define YOUR documentation style guidelines]**

Examples:
- Use active voice ("The system validates..." not "Validation is performed...")
- Lead with the "why" before the "what"
- Structure with clear headings and bullet points
- Include examples for complex concepts
- Tag references with file:line format (e.g., `product_arch.md:47`)

---

## Technical Stack

### Core Technologies

**[List YOUR approved technologies]**

**Frontend**: [e.g., React, Vue, Angular, TypeScript, CSS framework]
**Backend**: [e.g., Node.js, Python, Java, .NET]
**Database**: [e.g., PostgreSQL, MySQL, MongoDB]
**Data Analytics**: [e.g., Snowflake, BigQuery, Redshift]
**Version Control**: [e.g., Git with feature branch workflow]
**IDEs**: [e.g., Cursor, Claude Code, VS Code]

### AI Infrastructure (PM OS Specific)

**Agent Framework**: Hybrid .mdc (Cursor) + .md (Claude Code) rules
**Context Management**: Identity Layer auto-injection
**MCP Integrations**: [List YOUR enabled MCPs: Google Drive, Jira, Slack, etc.]
**Orchestration**: Task routing via Orchestrator agent

---

## Security Requirements

### Non-Negotiables

**[Define YOUR security requirements]**

Examples:
1. **No hardcoded secrets**: All credentials in `.env` (gitignored)
2. **OAuth 2.0 required**: For all MCP integrations with user data
3. **Read-only by default**: Write permissions require explicit justification
4. **PII redaction**: Automatically redact sensitive data in logs/outputs
5. **Pre-commit scanning**: Git hooks scan for accidentally committed secrets

### MCP Credential Management

**[Define YOUR credential management practices]**

- Store in `mcp/credentials/` (gitignored)
- Use `mcp/config.json` with environment variable references
- Document setup in `mcp/setup_guides/[SERVICE]_SETUP.md`
- Rotate credentials [YOUR rotation policy: quarterly/monthly/etc.]

### Access Control

**[Define YOUR access control policies]**

Examples:
- **Identity Layer changes**: Require [Role] approval (CODEOWNERS)
- **Agent logic changes**: Submitted as PRs with test validation
- **Production data**: Row-level security, audit logging enabled

---

## Artifact Standards

### PRD Structure (BMAD Method)

**[Confirm if YOUR team uses BMAD, or specify alternative structure]**

1. **Business Case**: Why this matters (metrics, user impact)
2. **Metrics**: Success criteria with concrete targets
3. **Approach**: Solution design with alternatives considered
4. **Details**: Comprehensive specifications (user stories, edge cases, designs)

### Technical Specifications

**[Define YOUR technical spec requirements]**

Examples:
- **Architecture diagrams**: [Preferred format: BPMN, C4, UML, etc.]
- **API contracts**: [Format: OpenAPI/Swagger, GraphQL schema, etc.]
- **Acceptance criteria**: [Format: Gherkin scenarios, plain English, etc.]
- **Security review**: Required for [list sensitive areas: auth, payments, PII, etc.]

### Discovery Artifacts

**[Define YOUR discovery artifact requirements]**

Examples:
- **Opportunity Solution Trees**: Mermaid diagram format
- **User interviews**: Structured notes with verbatim quotes
- **Information Architecture**: Sitemap + navigation flows
- **Prototypes**: [YOUR preferred format: Figma, React components, wireframes, etc.]

---

## Quality Gates

### Before Agent Output Approval

**[Define YOUR quality gates]**

Examples:
- [ ] Aligns with identity/STRATEGY.md vision
- [ ] Follows brand voice from this document
- [ ] Includes specific metrics/acceptance criteria
- [ ] Cites evidence for key decisions
- [ ] Free of security vulnerabilities (no SQL injection, XSS, etc.)
- [ ] Technical stack matches approved technologies

### Before External Distribution

**[Define YOUR stakeholder review requirements]**

Examples:
- [ ] Human PM review completed
- [ ] Stakeholder feedback incorporated
- [ ] Engineering Partner validation (for technical specs)
- [ ] Data Analyst validation (for metric claims)
- [ ] Spell check and grammar review

---

## Workflow Conventions

### Git Practices

**[Define YOUR git workflow]**

Examples:
- **Branch naming**: `feature/[agent-name]-[brief-description]`
- **Commit messages**: Imperative mood ("Add discovery workflow" not "Added")
- **PR templates**: Include agent that generated changes, validation steps
- **Code reviews**: Required for all identity/ and agent logic changes

### File Naming

**[Confirm YOUR file naming conventions]**

**Artifacts**: `YYYY-MM-DD_[artifact-type]_[brief-title].md`
**Templates**: `[artifact-type]_template.md`
**Agent rules**: `[agent-name].mdc` (Cursor) or `[agent-name].md` (Claude)
**MCP configs**: `[service-name]_config.json` or in unified `mcp/config.json`

### Version Control for Artifacts

**[Define YOUR artifact versioning approach]**

Examples:
- Store in `execution/[artifact-type]/`
- Tag major versions with Git tags
- Include changelog section at top of document
- Link to related Jira/Linear tickets

---

## Error Handling Philosophy

### For Agent Logic

**[Define YOUR error handling approach]**

Examples:
- **Fail fast**: Surface errors immediately, don't mask issues
- **Provide context**: Include file path, line number, expected vs actual
- **Suggest fixes**: Point to documentation or similar working examples
- **Degrade gracefully**: If MCP unavailable, operate in offline mode

### For User-Facing Outputs

**[Define YOUR output validation approach]**

Examples:
- **Validate assumptions**: Explicitly state what was assumed if ambiguous
- **Highlight uncertainties**: Mark sections needing human validation
- **Provide alternatives**: When multiple approaches viable, present trade-offs
- **Link to sources**: Reference specific files, docs, or data sources

---

## Continuous Improvement

### Self-Evaluation Triggers

**[Define when YOUR team reviews PM OS performance]**

Examples:
- **Weekly**: System Evaluator analyzes last 20 agent outputs
- **Per artifact**: Collect stakeholder feedback scores
- **Quarterly**: Identity Layer review against company strategy changes
- **On incidents**: Root cause analysis for security/quality issues

### Improvement Proposal Process

**[Define YOUR improvement workflow]**

Example:
1. System Evaluator generates proposal as Markdown
2. Submitted as GitHub PR with before/after examples
3. Human PM reviews for alignment with standards
4. If approved: Merged → agents updated → re-tested
5. If rejected: Documented in `execution/improvement_proposals/rejected/` with reasoning

---

**Customization Instructions**:
1. Replace all `[placeholders]` with YOUR organization's actual standards
2. Delete sections that don't apply to your team
3. Add custom sections for YOUR unique requirements (e.g., accessibility standards, localization requirements)
4. Keep this file updated as your tech stack or policies evolve

**How Agents Use This File**:
- All PM OS agents validate outputs against these standards before presenting to you
- Engineering Partner ensures technical specs match YOUR approved tech stack
- UX Strategist generates prototypes using YOUR design system
- Product Architect enforces YOUR quality gates

**Need Help?** See `identity/README.md` for detailed customization guidance.

---

**Last Updated**: [Date when you customize this]
**Next Review**: [When you plan to review/update standards]
