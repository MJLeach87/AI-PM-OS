# PM OS Standards

## Brand Voice & Communication

### Writing Principles
- **Professional**: Use industry-standard terminology, avoid casual language
- **Technical**: Precise specifications over ambiguous descriptions
- **Concise**: Every word serves a purpose, eliminate fluff
- **Evidence-Based**: Cite data, research, or clear reasoning for decisions
- **Action-Oriented**: Focus on outcomes and next steps

### Documentation Style
- Use active voice ("The system validates..." not "Validation is performed...")
- Lead with the "why" before the "what"
- Structure with clear headings and bullet points
- Include examples for complex concepts
- Tag references with file:line format (e.g., `product_arch.mdc:47`)

## Technical Stack

### Core Technologies
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, TypeScript
- **Data**: SQL (Snowflake for analytics)
- **Version Control**: Git with feature branch workflow
- **IDEs**: Cursor (collaborative editing), Claude Code (deep analysis)

### AI Infrastructure
- **Agent Framework**: Hybrid .mdc (Cursor) + .md (Claude Code) rules
- **Context Management**: Identity Layer auto-injection
- **MCP Integrations**: Google Drive, Jira/Linear, Slack, Notion, Snowflake
- **Orchestration**: Task routing via Orchestrator agent

## Security Requirements

### Non-Negotiables
1. **No hardcoded secrets**: All credentials in `.env` (gitignored)
2. **OAuth 2.0 required**: For all MCP integrations with user data
3. **Read-only by default**: Write permissions require explicit justification
4. **PII redaction**: Automatically redact sensitive data in logs/outputs
5. **Pre-commit scanning**: Git hooks scan for accidentally committed secrets

### MCP Credential Management
- Store in `mcp/credentials/` (gitignored)
- Use `mcp/config.json` with environment variable references
- Document setup in `mcp/setup_guides/[SERVICE]_SETUP.md`
- Rotate credentials quarterly minimum

### Access Control
- **Identity Layer changes**: Require Head of Product approval (CODEOWNERS)
- **Agent logic changes**: Submitted as PRs with test validation
- **Production data**: Row-level security, audit logging enabled

## Artifact Standards

### PRD Structure (BMAD Method)
1. **Business Case**: Why this matters (metrics, user impact)
2. **Metrics**: Success criteria with concrete targets
3. **Approach**: Solution design with alternatives considered
4. **Details**: Comprehensive specifications (user stories, edge cases, designs)

### Technical Specifications
- **BPMN diagrams**: For complex workflows
- **API contracts**: OpenAPI/Swagger format
- **Gherkin scenarios**: Given/When/Then acceptance criteria
- **Security review**: Required for authentication, payments, data handling

### Discovery Artifacts
- **Opportunity Solution Trees**: Mermaid diagram format
- **User interviews**: Structured notes with verbatim quotes
- **Information Architecture**: Sitemap + navigation flows
- **Prototypes**: React components with Tailwind styling

## Quality Gates

### Before Agent Output Approval
- [ ] Aligns with identity/STRATEGY.md vision
- [ ] Follows brand voice from this document
- [ ] Includes specific metrics/acceptance criteria
- [ ] Cites evidence for key decisions
- [ ] Free of security vulnerabilities (no SQL injection, XSS, etc.)
- [ ] Technical stack matches approved technologies

### Before External Distribution
- [ ] Human PM review completed
- [ ] Stakeholder feedback incorporated
- [ ] Engineering Partner validation (for technical specs)
- [ ] Data Analyst validation (for metric claims)
- [ ] Spell check and grammar review

## Workflow Conventions

### Git Practices
- **Branch naming**: `feature/[agent-name]-[brief-description]`
- **Commit messages**: Imperative mood ("Add discovery workflow" not "Added")
- **PR templates**: Include agent that generated changes, validation steps
- **Code reviews**: Required for all identity/ and agent logic changes

### File Naming
- **Artifacts**: `YYYY-MM-DD_[artifact-type]_[brief-title].md`
- **Templates**: `[artifact-type]_template.md`
- **Agent rules**: `[agent-name].mdc` (Cursor) or `[agent-name].md` (Claude)
- **MCP configs**: `[service-name]_config.json` or in unified `mcp/config.json`

### Version Control for Artifacts
- Store in `execution/[artifact-type]/`
- Tag major versions with Git tags
- Include changelog section at top of document
- Link to related Jira/Linear tickets

## Error Handling Philosophy

### For Agent Logic
- **Fail fast**: Surface errors immediately, don't mask issues
- **Provide context**: Include file path, line number, expected vs actual
- **Suggest fixes**: Point to documentation or similar working examples
- **Degrade gracefully**: If MCP unavailable, operate in offline mode

### For User-Facing Outputs
- **Validate assumptions**: Explicitly state what was assumed if ambiguous
- **Highlight uncertainties**: Mark sections needing human validation
- **Provide alternatives**: When multiple approaches viable, present trade-offs
- **Link to sources**: Reference specific files, docs, or data sources

## Continuous Improvement

### Self-Evaluation Triggers
- **Weekly**: System Evaluator analyzes last 20 agent outputs
- **Per artifact**: Collect stakeholder feedback scores
- **Quarterly**: Identity Layer review against company strategy changes
- **On incidents**: Root cause analysis for security/quality issues

### Improvement Proposal Process
1. System Evaluator generates proposal as Markdown
2. Submitted as GitHub PR with before/after examples
3. Human PM reviews for alignment with standards
4. If approved: Merged → agents updated → re-tested
5. If rejected: Documented in `docs/REJECTED_PROPOSALS.md` with reasoning

---

**Last Updated**: 2026-01-31 (Phase 0 Bootstrap)
**Next Review**: End of Phase 1 (Week 5)
