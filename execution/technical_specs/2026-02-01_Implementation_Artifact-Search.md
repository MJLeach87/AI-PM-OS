# Implementation Analysis: Artifact Search Filter

**Author**: Engineering Partner Agent v1.1
**Date**: 2026-02-01
**PRD Reference**: `execution/prds/2026-01-31_PRD_Artifact-Search-Filter_v0.1.md`
**Feasibility Report**: `execution/technical_specs/2026-02-01_Feasibility_Artifact-Search.md`

---

## Purpose

This document analyzes the existing PM OS codebase to identify optimal implementation strategies for the Artifact Search Filter feature, including reusable components, integration patterns, and refactoring opportunities.

---

## Existing Code Analysis

### Codebase Search Results

**Search Strategy**:
```bash
# Search for existing file operations
Glob pattern="**/*.js"
Glob pattern="**/*.ts"
Grep pattern="(fs\.|readFile|readdir)" path="." output_mode="files_with_matches"

# Search for existing search functionality
Grep pattern="(search|query|index)" path="." output_mode="files_with_matches"
```

**Results**: ❌ No JavaScript or TypeScript code found

**Relevant Files Identified**: None

### Current Implementation Patterns

#### Pattern 1: File Management (Markdown Artifacts)
**Location**: `execution/` directory tree (discovery, prds, technical_specs, prototypes, gtm)
**Description**: PM OS currently stores all artifacts as markdown files with YAML frontmatter
**Quality Assessment**: N/A (manual file browsing via `ls` or file explorer, no programmatic access)

**Current Workflow**:
```bash
# Manual artifact retrieval
ls execution/discovery/
cat execution/discovery/2026-01-31_OST_PM-OS-Discovery-Improvements.md
```

**Maintainability Score**: ⭐ (1/5 stars)
- **Test Coverage**: None (no code)
- **Code Clarity**: N/A
- **Documentation**: README.md explains directory structure

**Observation**: PM OS is in bootstrap phase (Phase 0-1), no production code exists yet. This is a greenfield implementation.

---

## Reusability Assessment

### ✅ Can Reuse (No Changes Needed)

**None**: No existing search or file indexing code to reuse.

**Directory Structure**:
- ✅ Existing `execution/` directory tree provides clear organization
- ✅ File naming convention `YYYY-MM-DD_[type]_[title].md` enables type filtering
- ✅ YAML frontmatter in artifacts provides metadata (status, date, related docs)

**Reusable Pattern**:
- File organization pattern (subdirectories by artifact type) maps directly to search filters
- Frontmatter metadata can be parsed without code changes

### ⚠️ Can Reuse with Enhancements

**None applicable**: No existing code to enhance.

### ❌ Cannot Reuse (Must Build New)

**Everything**: This is a net-new feature with no legacy code.

**What to Build**:
1. **File System Scanner**: Recursively read `execution/**/*.md`
2. **Metadata Parser**: Extract YAML frontmatter from markdown files
3. **Search Index**: In-memory data structure for fast lookups
4. **Fuzzy Search**: fuse.js integration for relevance ranking
5. **CLI Interface**: Command-line tool for search queries
6. **File Watcher**: Real-time index updates (chokidar)

---

## Integration Strategy

### Recommended Approach

**Strategy**: Build New Module (Greenfield)

**Justification**:
- PM OS has no existing codebase to integrate with
- Search feature is standalone utility (no dependencies on other modules)
- Can be developed independently and added to repository

### Implementation Steps

#### Step 1: Create Search Module Structure
**Files to Create**:
- `scripts/search.js` - Main search CLI entry point
- `scripts/lib/indexer.js` - File system scanner + index builder
- `scripts/lib/searcher.js` - fuse.js integration for fuzzy search
- `scripts/lib/watcher.js` - chokidar file watcher (Phase 2+)

**Effort**: XS (1-2 hours for directory setup + file stubs)

#### Step 2: Implement File System Scanner
**File**: `scripts/lib/indexer.js`
**Changes Required**:
```javascript
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const glob = require('glob');

class ArtifactIndexer {
  constructor(basePath = './execution') {
    this.basePath = basePath;
    this.index = [];
  }

  async buildIndex() {
    // Recursively scan execution/**/*.md
    const files = glob.sync(`${this.basePath}/**/*.md`);

    this.index = files.map(filePath => {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);

      return {
        filePath,
        title: this.extractTitle(filePath),
        type: this.extractType(filePath),
        metadata: data, // YAML frontmatter
        preview: body.substring(0, 500), // First 500 chars
        created: data.date || this.extractDateFromFilename(filePath)
      };
    });

    return this.index;
  }

  extractTitle(filePath) {
    // Extract title from filename: YYYY-MM-DD_Type_Title.md
    const filename = path.basename(filePath, '.md');
    const parts = filename.split('_');
    return parts.slice(2).join(' '); // "Title Title"
  }

  extractType(filePath) {
    const dir = path.dirname(filePath);
    if (dir.includes('/discovery')) return 'OST';
    if (dir.includes('/prds')) return 'PRD';
    if (dir.includes('/technical_specs')) return 'Tech Spec';
    if (dir.includes('/prototypes')) return 'Prototype';
    if (dir.includes('/gtm')) return 'GTM';
    return 'Unknown';
  }

  extractDateFromFilename(filePath) {
    const filename = path.basename(filePath);
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : null;
  }
}

module.exports = ArtifactIndexer;
```

**Effort**: S (8 hours for implementation + tests)

#### Step 3: Implement Fuzzy Search
**File**: `scripts/lib/searcher.js`
**Changes Required**:
```javascript
const Fuse = require('fuse.js');

class ArtifactSearcher {
  constructor(index) {
    this.fuse = new Fuse(index, {
      keys: [
        { name: 'title', weight: 0.6 },
        { name: 'preview', weight: 0.3 },
        { name: 'type', weight: 0.1 }
      ],
      threshold: 0.4, // 60% similarity required
      includeScore: true
    });
  }

  search(query, filters = {}) {
    let results = this.fuse.search(query);

    // Apply filters
    if (filters.type) {
      results = results.filter(r => r.item.type === filters.type);
    }

    if (filters.status) {
      results = results.filter(r => r.item.metadata.status === filters.status);
    }

    if (filters.after) {
      results = results.filter(r => r.item.created >= filters.after);
    }

    // Limit to top 10
    return results.slice(0, 10).map(r => ({
      path: r.item.filePath,
      title: r.item.title,
      type: r.item.type,
      preview: r.item.preview.substring(0, 100) + '...',
      score: (1 - r.score).toFixed(2) // Convert distance to similarity %
    }));
  }
}

module.exports = ArtifactSearcher;
```

**Effort**: S (6 hours for implementation + tests)

#### Step 4: Create CLI Interface
**File**: `scripts/search.js`
**Changes Required**:
```javascript
#!/usr/bin/env node
const { program } = require('commander');
const ArtifactIndexer = require('./lib/indexer');
const ArtifactSearcher = require('./lib/searcher');

program
  .name('pm-os-search')
  .description('Search PM OS artifacts')
  .argument('<query>', 'Search query')
  .option('-t, --type <type>', 'Filter by artifact type (PRD, OST, etc.)')
  .option('-s, --status <status>', 'Filter by status (Active, Draft, etc.)')
  .option('--after <date>', 'Filter by date (YYYY-MM-DD)')
  .action(async (query, options) => {
    console.log('Building search index...');
    const indexer = new ArtifactIndexer();
    const index = await indexer.buildIndex();
    console.log(`Indexed ${index.length} artifacts\n`);

    const searcher = new ArtifactSearcher(index);
    const results = searcher.search(query, options);

    if (results.length === 0) {
      console.log('No results found.');
    } else {
      console.log(`Found ${results.length} results:\n`);
      results.forEach((r, i) => {
        console.log(`${i + 1}. [${r.type}] ${r.title}`);
        console.log(`   Path: ${r.path}`);
        console.log(`   Match: ${(r.score * 100)}%`);
        console.log(`   Preview: ${r.preview}\n`);
      });
    }
  });

program.parse();
```

**Effort**: S (4 hours for CLI + help text)

#### Step 5: Add Logging
**File**: `scripts/lib/logger.js`
**Changes Required**:
```javascript
const fs = require('fs');
const path = require('path');

class SearchLogger {
  constructor(logPath = './logs/search_usage.log') {
    this.logPath = logPath;
    this.ensureLogDir();
  }

  ensureLogDir() {
    const dir = path.dirname(this.logPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  log(query, results, latency) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      query,
      results_count: results.length,
      latency_ms: latency,
      top_result: results[0]?.path || null
    };

    fs.appendFileSync(this.logPath, JSON.stringify(logEntry) + '\n');
  }
}

module.exports = SearchLogger;
```

**Effort**: XS (2 hours)

**Total Estimated Effort**: **S** (20 hours total = ~3 days)

### Alternative Approach: SQLite Database

**What This Means**: Store artifact metadata in SQLite database instead of in-memory index

**Pros**:
- Persistent index (faster startup after first build)
- SQL querying flexibility

**Cons**:
- Adds database dependency
- Synchronization complexity (file changes must update database)
- **More effort**: M (40 hours = 1 week)

**Rejected Because**: In-memory index simpler and sufficient for PM OS scale (100s of artifacts). Persistence not needed (rebuild index on startup in <2 seconds).

---

## Integration Points

### File System Integration

**Existing Directory Structure**:
```
execution/
├── discovery/          # OSTs, user research
├── prds/              # PRDs
├── technical_specs/   # Feasibility reports, API specs
├── prototypes/        # React components
└── gtm/               # GTM materials
```

**Integration**:
- Scanner reads from these 5 subdirectories
- Artifact type automatically determined by directory name
- No changes to directory structure needed

**Schema Changes Needed**: None

**Data Migration**: N/A (no existing data to migrate)

### CLI Integration

**Existing CLI**: None (PM OS has no CLI yet)

**New CLI Command**:
```bash
# Add to package.json scripts
{
  "scripts": {
    "search": "node scripts/search.js"
  }
}

# Usage
npm run search "authentication PRD"
npm run search "onboarding" -- --type=OST --status=Active
```

**Integration Effort**: XS (15 minutes to update package.json)

### Cursor Integration (Phase 1+)

**Existing Cursor Integration**: None yet

**Future Integration Path** (Phase 2+):
1. Create Cursor extension: `cursor-pm-os-search`
2. Add command palette action: "PM OS: Search Artifacts"
3. Call `search.js` script from extension
4. Display results in Cursor sidebar panel

**Integration Effort**: M (1-2 weeks for Cursor extension)

---

## Refactoring Recommendations

### High Priority (Address Before Implementation)

**None**: No existing code to refactor.

### Medium Priority (Improve During Implementation)

#### Refactoring 1: Centralized File Path Resolution

**Problem**: Hard-coded `./execution` path in indexer

**Proposed Improvement**:
```javascript
// Add to config.js
module.exports = {
  EXECUTION_PATH: process.env.PM_OS_EXECUTION_PATH || './execution',
  LOG_PATH: process.env.PM_OS_LOG_PATH || './logs'
};
```

**Effort**: XS (1 hour)
**Why Medium Priority**: Makes PM OS more flexible for custom installations (e.g., different directory structure)

#### Refactoring 2: Abstract Metadata Parser

**Opportunity**: YAML frontmatter parsing is specific to markdown, but future artifacts might use JSON or TOML

**Proposed Improvement**:
```javascript
// Polymorphic parser
class MetadataParser {
  static parse(content, fileType) {
    if (fileType === '.md') return matter(content).data;
    if (fileType === '.json') return JSON.parse(content);
    // Extensible for future formats
  }
}
```

**Effort**: S (4 hours)
**Benefits**: Future-proof for Phase 5+ automation (JSON artifacts from agents)

### Low Priority (Defer to Tech Debt Backlog)

#### Refactoring 3: Async File Reading

**Problem**: `fs.readFileSync()` blocks event loop (fine for CLI, but not scalable)

**Recommendation**: Switch to `fs.promises.readFile()` for async I/O

**Effort**: S (6 hours to refactor + test)
**Why Low Priority**: PM OS is single-user local CLI, blocking I/O acceptable. Defer until performance issues arise.

---

## Architectural Considerations

### Current Architecture Pattern

**Pattern**: File-based artifact storage (markdown + YAML frontmatter)

**Diagram**:
```
User (CLI)
  ↓
search.js (entry point)
  ↓
indexer.js (scan files) → File System (execution/*)
  ↓
searcher.js (fuse.js) → In-Memory Index
  ↓
Results (CLI output)
```

### How New Feature Fits

**Alignment**: ✅ Fits cleanly

- Search feature reads existing markdown files (no schema changes)
- Respects existing directory structure
- Leverages existing YAML frontmatter metadata
- No dependencies on other PM OS components (standalone utility)

**Recommended Pattern for New Code**: Module-based architecture
- Separate concerns: indexer, searcher, logger, CLI
- Each module independently testable
- Easy to extend (add PDF search, Notion integration, etc.)

### Backward Compatibility

**Breaking Changes**: No

**New Artifacts Compatible**: Yes
- All existing and future markdown artifacts automatically indexed
- No migration needed

**Assurance**: Search feature is additive only (read-only file access)

---

## Code Quality Improvements

### Testing Gaps

**Current Test Coverage**: 0% (no code exists)

**Recommendation**: Achieve >80% coverage for search feature

**Test Plan**:
```javascript
// tests/indexer.test.js
describe('ArtifactIndexer', () => {
  test('scans execution directory recursively', () => { ... });
  test('extracts title from filename correctly', () => { ... });
  test('parses YAML frontmatter', () => { ... });
  test('handles missing metadata gracefully', () => { ... });
});

// tests/searcher.test.js
describe('ArtifactSearcher', () => {
  test('returns results ranked by relevance', () => { ... });
  test('filters by artifact type', () => { ... });
  test('fuzzy matches typos', () => { ... });
  test('limits results to top 10', () => { ... });
});
```

**Effort**: S (10 hours for comprehensive test suite)

### Documentation Gaps

**Current Documentation**: README.md covers directory structure, but no code documentation

**Recommendation**:
1. Add JSDoc comments to all functions
2. Create `scripts/README.md` explaining search architecture
3. Update main README.md with search usage examples

**Effort**: XS (3 hours)

---

## Implementation Risks

### Risk 1: File Parsing Errors

**Probability**: Medium
**Impact**: Medium

**Scenario**: Malformed YAML frontmatter breaks indexer

**Mitigation**:
```javascript
try {
  const { data } = matter(content);
} catch (err) {
  console.warn(`Failed to parse ${filePath}: ${err.message}`);
  return { metadata: {}, content }; // Graceful degradation
}
```

**Testing**: Create test artifacts with invalid YAML, verify indexer continues

### Risk 2: Performance Degradation at Scale

**Probability**: Low
**Impact**: Medium

**Scenario**: 1000+ artifacts cause >1 second indexing time

**Mitigation**:
- Benchmark with 500 test artifacts before Phase 1 launch
- Implement pagination (only index first 100 chars of content)
- If slow, switch to SQLite (Alternative Approach)

### Risk 3: Cross-Platform Path Issues

**Probability**: Low
**Impact**: High

**Scenario**: Windows path separators (`\`) break on macOS/Linux

**Mitigation**:
- Always use `path.join()` and `path.resolve()`
- Test on Windows, macOS, Linux (via CI)

**Testing**: GitHub Actions CI with matrix testing (all OS)

---

## Dependencies on Other Work

### Blocked By

**None**: Search feature can be implemented independently

### Blocks

**None**: Search is standalone utility (doesn't block other features)

---

## Effort Estimate

### Total Implementation Effort

| Task | Effort |
|------|--------|
| **File System Scanner** | S (8 hours) |
| **Fuzzy Search Integration** | S (6 hours) |
| **CLI Interface** | S (4 hours) |
| **Logging** | XS (2 hours) |
| **Testing** | S (10 hours) |
| **Documentation** | XS (3 hours) |
| **TOTAL** | **S (33 hours = ~5 days)** |

**Comparison to Greenfield**:
- **Building from scratch**: S (33 hours)
- **If existing search library**: XS (10 hours to integrate)
- **Savings**: N/A (no existing code to reuse)

**Effort Matches Feasibility Report**: ✅ Yes (Feasibility estimated S = 3-5 days, Implementation confirms ~5 days)

---

## Recommendation

**Integration Strategy**: Build New Module (Greenfield Implementation)

**Key Benefits**:
1. Clean architecture (no legacy code constraints)
2. Modern patterns (async/await, ES6 modules)
3. Testable (modular design)

**Critical Path**:
1. Implement `indexer.js` (foundation for all other components)
2. Integrate `fuse.js` for search
3. Create CLI interface
4. Add logging

**When to Start Implementation**:
- After PRD approval (Product Architect final PRD)
- Phase 1, Week 5, Days 1-3 (aligns with Feasibility Report timeline)

**No Blockers**: Ready to implement immediately

---

## Related Artifacts

**PRD**: `execution/prds/2026-01-31_PRD_Artifact-Search-Filter_v0.1.md`
**Feasibility Report**: `execution/technical_specs/2026-02-01_Feasibility_Artifact-Search.md`
**Existing Codebase**: None (greenfield)

---

**Implementation Analysis Status**: Completed
**Reviewed By**: Engineering Partner Agent v1.1
**Human Review Required**: Yes (recommended before implementation)
**Last Updated**: 2026-02-01
