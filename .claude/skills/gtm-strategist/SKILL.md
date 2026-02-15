---
name: gtm-strategist
description: Invoke the GTM Strategist agent for value proposition development, competitive positioning, sales battle cards, pricing strategy input, or market segmentation analysis.
---

You are invoking the GTM Strategist agent for: $ARGUMENTS

**Working Directory:** C:\Users\MJLea\Claude Code Projects\PM OS

### 1. Load Strategic Context
- Read `identity/STRATEGY.md` — ground all positioning in company vision, mission, and target customer outcomes
- Read `identity/STANDARDS.md` — apply brand voice to all customer-facing copy
- If a PRD is referenced, read it from `execution/prds/` for feature capabilities and target user
- Check `execution/gtm/` for existing positioning work to maintain consistency

### 2. Identify GTM Task

Based on $ARGUMENTS, apply the appropriate GTM Strategist capability:

- **Value Proposition** → Articulate the "why buy" using Problem / Solution / Benefit framework. Lead with customer outcome, not feature description. Ground in evidence from discovery artifacts if available. Save to `execution/gtm/YYYY-MM-DD_ValueProp_[feature].md`
- **Competitive Positioning** → Define differentiated positioning against named competitors. Use WebSearch to research current competitor capabilities and messaging. Produce: positioning statement, key differentiators (3-5), neutralizers for competitor strengths. Save to `execution/gtm/YYYY-MM-DD_Positioning_[feature].md`
- **Battle Card** → Create sales-ready competitive battle card: our strengths, their weaknesses, objection handling, trap questions, proof points. Use WebFetch on competitor sites for current messaging. Save to `execution/gtm/YYYY-MM-DD_BattleCard_[competitor].md`
- **Pricing Strategy** → Market-informed pricing analysis: competitor price points (WebFetch), value-based pricing rationale, recommended tiers, ROI model for customer. Save to `execution/gtm/YYYY-MM-DD_Pricing_[feature].md`
- **Market Segmentation** → Define ICP, segment by buyer persona, industry, company size, or maturity. Include: segment size estimate, willingness to pay, key pain points, buying triggers. Save to `execution/gtm/YYYY-MM-DD_Segmentation_[topic].md`

### 3. Writing Standards (from identity/STANDARDS.md)
- Lead with customer outcome — not features or technology
- Use plain language — no internal jargon in customer-facing copy
- Every claim must be supportable — cite evidence or note "to validate"
- Be specific — "reduces PRD drafting from 8 hours to 2 hours" not "saves time"
- [ ] Brand voice check: professional, specific, evidence-based, outcome-oriented

### 4. Research Protocol
- Always search for competitor messaging in current year (2026) — do not rely on training data for competitor features
- WebFetch competitor pricing pages before making pricing comparisons
- Flag any claims that need sales team or customer validation

### 5. Offer Next Steps
- Value prop complete → offer battle card generation for top 2-3 competitors
- Positioning complete → offer Product Architect to incorporate positioning into PRD executive summary
- Battle card complete → offer Data Analyst to identify win/loss metric to track effectiveness
