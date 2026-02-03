# Your Organizational Intelligence Guide

This directory contains **YOUR organizational context** - the strategy, standards, and roadmap that PM OS agents use to ensure all work aligns with your company's goals.

**🚨 CRITICAL: You must customize these template files** with YOUR company's actual information. PM OS agents load these files automatically, so they need YOUR organization's real content, not PM OS defaults.

---

## 🚨 CRITICAL: Customize These Files

**All files in this directory have "🔧 CUSTOMIZE THIS" headers** - this means you should replace the template content with your company's actual information.

**Before using PM OS for real work**, customize:
- ✅ `STRATEGY.md` - YOUR company's vision, mission, North Star Metrics
- ✅ `ROADMAP.md` - YOUR product's roadmap (not PM OS's implementation phases)
- ✅ `STANDARDS.md` - YOUR tech stack, brand voice, security requirements

**Why this is critical**: PM OS agents automatically load these files to guide their work. If you don't customize them, agents will generate outputs based on PM OS's defaults instead of YOUR organization's context.

---

## Purpose of the Identity Layer

The Identity Layer is **YOUR organizational intelligence as executable code**. Instead of repeating your company's vision, tech stack, and standards in every conversation, PM OS agents automatically load these files and use them to:

- Ensure PRDs align with YOUR company's strategic vision
- Generate technical specs using YOUR approved tech stack
- Validate prototypes against YOUR brand voice and design standards
- Reference YOUR product roadmap when prioritizing features

**Philosophy**: "Organizational context as code" - version-controlled, automatically injected, single source of truth.

---

## Required Files to Customize

### `STRATEGY.md` - Your Company's Strategy

**What it contains**:
- **Vision**: Your company's long-term aspirational goal
- **Mission**: Your product team's specific purpose
- **North Star Metrics**: 3-4 key metrics you use to measure product success
- **Strategic Principles**: Your organization's decision-making frameworks

**How agents use it**:
- Product Architect validates all PRDs cite vision/mission (100% Identity Traceability)
- Data Analyst ensures metrics proposals align with your North Star Metrics
- GTM Strategist references your strategic principles when crafting positioning

**Customization checklist**:
- [ ] Replace vision with YOUR company's vision
- [ ] Replace mission with YOUR team's mission
- [ ] Choose 3-4 North Star Metrics that fit YOUR context (from framework or create custom)
- [ ] Define YOUR strategic principles (not PM OS's defaults)
- [ ] Delete example content and placeholders

**Reference**: See `examples/identity/STRATEGY.md` for PM OS's own strategy as structural example.

---

### `ROADMAP.md` - Your Product Roadmap

**What it contains**:
- **Product roadmap**: YOUR product's feature timeline (not PM OS's implementation phases)
- **Themes/initiatives**: Quarterly or phase-based organization
- **Dependencies**: How major initiatives relate
- **Risk tracking**: Risks to YOUR roadmap execution

**How agents use it**:
- Product Architect checks if new feature proposals align with YOUR roadmap themes
- Engineering Partner references planned initiatives when assessing feasibility
- All agents ensure new work supports YOUR strategic timeline

**Customization checklist**:
- [ ] Replace PM OS's Phase 0-7 timeline with YOUR product roadmap
- [ ] Choose roadmap structure that fits YOUR team (time-based, theme-based, now/next/later)
- [ ] Add YOUR actual features and initiatives
- [ ] Update dependencies and risks relevant to YOUR product
- [ ] Delete PM OS roadmap references

**Reference**: See `examples/identity/ROADMAP.md` for PM OS's roadmap structure (but replace with YOUR product's roadmap).

---

### `STANDARDS.md` - Your Organizational Standards

**What it contains**:
- **Brand voice**: YOUR writing style and communication principles
- **Technical stack**: YOUR approved technologies (frontend, backend, database, etc.)
- **Security requirements**: YOUR security policies and compliance needs
- **Quality gates**: YOUR artifact approval criteria
- **Workflow conventions**: YOUR git practices, file naming, review processes

**How agents use it**:
- UX Strategist generates prototypes using YOUR tech stack (React vs Vue, Tailwind vs Bootstrap, etc.)
- Engineering Partner validates technical specs use YOUR approved backend technologies
- Product Architect enforces YOUR quality gates before presenting PRDs
- All agents follow YOUR brand voice in all outputs

**Customization checklist**:
- [ ] Define YOUR brand voice (replace PM OS's "professional, technical, concise")
- [ ] List YOUR approved tech stack (replace React/Node.js/TypeScript if different)
- [ ] Specify YOUR security requirements (OAuth, PII handling, credential rotation)
- [ ] Define YOUR quality gates (alignment checks, review processes)
- [ ] Set YOUR workflow conventions (git workflow, file naming, PR templates)
- [ ] Delete PM OS standards that don't apply

**Reference**: See `examples/identity/STANDARDS.md` for comprehensive example of organizational standards.

---

## How Agents Use YOUR Identity Files

### Automatic Context Injection

**When you make a request** (e.g., "Generate a PRD for user authentication"):

1. **Orchestrator agent** routes request to Product Architect
2. **Product Architect automatically loads**:
   - `identity/STRATEGY.md` - To ensure PRD aligns with YOUR vision
   - `identity/STANDARDS.md` - To follow YOUR brand voice and quality gates
   - `identity/ROADMAP.md` - (Optional) To check alignment with YOUR roadmap
3. **Product Architect generates PRD** using YOUR organizational context
4. **Output includes**:
   - Vision/mission citations from YOUR STRATEGY.md
   - Success metrics aligned with YOUR North Star Metrics
   - Technical approach using YOUR approved tech stack
   - Brand voice matching YOUR writing principles

**You don't need to repeat context** - the Identity Layer ensures agents always work with YOUR organization's current strategy and standards.

---

## Customization Guide

### Step-by-Step Customization

**1. Open template files** (all in this `identity/` directory):
- `STRATEGY.md`
- `ROADMAP.md`
- `STANDARDS.md`

**2. Look for "🔧 CUSTOMIZE THIS" headers** - these indicate templates to customize

**3. Replace all `[placeholders]` with YOUR actual information**:
- `[Replace with YOUR company's vision]` → Your actual vision statement
- `[Replace with YOUR tech stack]` → Your actual technologies (e.g., Vue instead of React)
- `[Replace with YOUR product roadmap]` → Your actual Q1/Q2/Q3 initiatives

**4. Use examples/identity/ files as structural reference**:
- See `examples/identity/STRATEGY.md` for how PM OS structures its strategy
- Use similar section headings but replace content with YOUR company's info
- Don't copy PM OS's vision/mission - create your own!

**5. Delete sections that don't apply**:
- If you don't use quarterly roadmaps, delete that section from ROADMAP.md
- If you don't have specific security compliance needs, simplify STANDARDS.md

**6. Add custom sections for YOUR unique requirements**:
- Accessibility standards (e.g., WCAG 2.1 Level AA)
- Localization requirements (if multi-language product)
- Industry-specific compliance (HIPAA, SOC 2, GDPR)

**7. Commit customized files to version control**:
```bash
git add identity/
git commit -m "Customize Identity Layer with [Your Company] organizational context"
```

---

## When to Update

### Update Triggers

Update your Identity Layer files when:

**STRATEGY.md**:
- Company vision or mission changes (typically annually)
- North Star Metrics revised (typically quarterly)
- Strategic principles evolve (as organization matures)
- New strategic focus announced (e.g., enterprise shift, international expansion)

**ROADMAP.md**:
- Quarterly planning cycles (update with new Q1/Q2/Q3 initiatives)
- Major roadmap pivots (competitive pressure, market changes)
- Completed initiatives (mark as done, add new ones)

**STANDARDS.md**:
- Tech stack changes (migrate from React to Vue, add new database)
- Security policy updates (new compliance requirements, password policies)
- Brand voice refinement (after marketing rebrand)
- New quality gates (after retrospectives, process improvements)

### Best Practices

**Quarterly Identity Layer Review**:
1. Review STRATEGY.md with Head of Product (still aligned with company vision?)
2. Update ROADMAP.md with latest quarterly plan
3. Check STANDARDS.md tech stack (any deprecated technologies? new approvals?)
4. Commit updates with clear changelog in commit message

**Use Git for Change Tracking**:
```bash
# See history of strategy changes
git log identity/STRATEGY.md

# Compare current vs. 6 months ago
git diff HEAD~6 identity/STRATEGY.md
```

**Communicate Updates**:
- When Identity Layer changes, notify team (Slack announcement, standup mention)
- PM OS agents automatically use latest version (no reconfiguration needed)
- Consider tagging major strategy shifts: `git tag v2.0-strategy-shift`

---

## What Belongs Where

### Understanding PM OS's File Organization

**examples/identity/** (PM OS's own organizational context):
- Contains PM OS's **actual** STRATEGY.md, ROADMAP.md, STANDARDS.md
- Files describe PM OS building itself (meta-recursive)
- **Reference examples** - read-only, don't edit
- Shows what a complete Identity Layer looks like

**identity/** (YOUR organizational context) ← **YOU ARE HERE**:
- Contains **templates** with "🔧 CUSTOMIZE THIS" headers
- Files should describe YOUR company's strategy, YOUR product's roadmap, YOUR tech stack
- **Active files used by agents** - you should customize these
- Single source of truth for YOUR organizational intelligence

**execution/** (YOUR workspace):
- Where agents save artifacts they generate for YOUR work
- OSTs, PRDs, technical specs, prototypes, GTM materials
- See `execution/README.md` for artifact pipeline guide

**examples/artifacts/** (PM OS's workspace):
- Where PM OS saved artifacts it generated for building itself
- Examples of output quality (OSTs, PRDs, specs, prototypes from PM OS inception)
- See `examples/README.md` for details

### Quick Decision Tree

**Where does this go?**
- YOUR company's vision/mission/NSM → `identity/STRATEGY.md`
- YOUR product's roadmap → `identity/ROADMAP.md`
- YOUR tech stack/standards → `identity/STANDARDS.md`
- OST you're creating for YOUR product → `execution/discovery/`
- PRD for YOUR product feature → `execution/prds/`
- PM OS's own vision (reference only) → `examples/identity/STRATEGY.md`
- PM OS's implementation phases (reference only) → `examples/identity/ROADMAP.md`

---

## Examples Reference

### See PM OS's Own Identity Layer

Want to see a complete, real-world Identity Layer? Check out `examples/identity/`:

**examples/identity/STRATEGY.md**:
- PM OS's vision: "Transform PMs from document-authors into Strategic Architects"
- PM OS's mission: "Institutionalize product strategy as executable code"
- PM OS's NSM: Flexible framework with time efficiency, quality, discovery, alignment metrics

**examples/identity/ROADMAP.md**:
- PM OS's 7-phase implementation timeline (Phase 0-7)
- Shows how PM OS builds itself over 28 weeks
- Demonstrates phase-based roadmap structure

**examples/identity/STANDARDS.md**:
- PM OS's tech stack: React, TypeScript, Node.js, Snowflake
- PM OS's brand voice: Professional, technical, concise, evidence-based
- PM OS's quality gates: Strategic alignment, evidence-based decisions, security requirements

**Use these as structural inspiration**, but replace content with YOUR organization's actual information.

---

## Troubleshooting

### "I'm still seeing PM OS defaults in agent outputs"

**Problem**: PRDs reference "PM OS's vision to transform PMs" instead of YOUR company's vision.

**Solution**: You haven't customized `identity/STRATEGY.md` yet. Agents are loading the template defaults. Open `identity/STRATEGY.md`, replace all `[placeholders]` with your actual company information, and save.

**Validation**: After customization, ask Product Architect to generate a PRD. It should cite YOUR vision from identity/STRATEGY.md.

---

### "Should I edit examples/identity/ or identity/?"

**Problem**: Confusion between PM OS's files (examples/identity/) and your customization files (identity/).

**Solution**:
- **NEVER edit examples/identity/** - these are PM OS's own files (reference only)
- **ALWAYS edit identity/** - these are templates for YOUR company (customize these)

**Rule of thumb**: If file has "🔧 CUSTOMIZE THIS" header → edit it (identity/). If it doesn't → reference only (examples/identity/).

---

### "What if my company doesn't have a formal vision/mission?"

**Problem**: Your organization hasn't documented formal vision/mission statements.

**Solution**: Work with your Head of Product to define them, or:
1. Use informal team-level vision/mission (what your product team is trying to achieve)
2. Start with aspirational statements, refine over time
3. Focus on North Star Metrics initially (easier to define than vision/mission)

**Example starting point**:
- Vision: "Become the leading [category] solution for [target users]"
- Mission: "Help [user segment] achieve [outcome] through [approach]"

---

### "My tech stack uses Vue instead of React - what do I change?"

**Problem**: Template shows React/TypeScript, but your team uses Vue/JavaScript.

**Solution**:
1. Open `identity/STANDARDS.md`
2. Find "Technical Stack" section
3. Replace:
   - **Frontend**: React, TypeScript, Tailwind CSS → **Frontend**: Vue 3, JavaScript, [Your CSS framework]
4. Save and commit

**Result**: UX Strategist will now generate Vue components instead of React components. Engineering Partner will validate specs for Vue compatibility.

---

### "How do I know agents are using my customized files?"

**Problem**: Want to verify agents loaded YOUR identity files, not defaults.

**Solution**: Test with Product Architect:
1. Customize `identity/STRATEGY.md` with unique vision (e.g., "Revolutionize widget management")
2. Ask: "Product Architect: Generate a PRD for new feature X"
3. Check PRD output - it should cite your unique vision verbatim
4. If it does → customization successful! If not → check file was saved and committed

---

## Links to Related Documentation

**Customization Process**:
- [examples/identity/README.md](../examples/identity/README.md) - Explains PM OS's own organizational context (reference examples)
- [QUICK_START.md](../QUICK_START.md) - Fast-start guide with Identity Layer customization emphasis
- [.claude/CLAUDE.md](../.claude/CLAUDE.md) - Project context explaining Identity Layer architecture

**Agent Documentation**:
- [.claude/agents/](../.claude/agents/) - Agent specification files that load your Identity Layer
- [Product Architect](../.claude/agents/product_arch.md) - Generates PRDs using YOUR strategy
- [Engineering Partner](../.claude/agents/engineering_partner.md) - Validates specs using YOUR tech stack

**Workspace Guides**:
- [execution/README.md](../execution/README.md) - Product workspace artifact pipeline guide
- [examples/README.md](../examples/README.md) - PM OS inception materials overview

**Templates**:
- [templates/](../templates/) - Agent spec, PRD, and MCP integration templates

---

## Summary

**Key Takeaways**:
1. **Customize templates in identity/** with YOUR company's actual information
2. **Use examples/identity/** as structural reference only (PM OS's own files, don't edit)
3. **Agents automatically load identity/** files - no need to repeat context in every request
4. **Update quarterly** or when organizational strategy/standards change
5. **Test customization** by generating a PRD and checking it cites YOUR vision

**Next Steps**:
1. ✅ Customize `identity/STRATEGY.md` with YOUR vision, mission, NSM (30 min)
2. ✅ Customize `identity/ROADMAP.md` with YOUR product roadmap (20 min)
3. ✅ Customize `identity/STANDARDS.md` with YOUR tech stack and standards (30 min)
4. ✅ Commit changes: `git add identity/ && git commit -m "Customize Identity Layer"`
5. ✅ Test: Ask Product Architect to generate PRD, verify it cites YOUR vision
6. ✅ Start using PM OS for real work with YOUR organizational context!

---

**Directory Purpose**: Store YOUR organizational intelligence (strategy, standards, roadmap) as version-controlled code
**Maintained By**: You (Product Manager) + Head of Product (for STRATEGY.md major changes)
**Update Frequency**: Quarterly or when organizational context changes
**Related Files**: See `examples/identity/README.md` for PM OS's own organizational context (reference examples)
