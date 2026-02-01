# Information Security Assessment: [Feature Name]

**Feature**: [Brief feature title]
**Related PRD**: `execution/prds/YYYY-MM-DD_PRD_[feature-name].md`
**Assessment Date**: YYYY-MM-DD
**Assessed By**: Engineering Partner Agent
**Review Status**: [Draft / In Review / Approved / Approved with Conditions / Rejected]

---

## Executive Summary

**Security Risk Level**: [Low / Medium / High / Critical]

**Primary Security Concerns**:
- [Concern 1: Brief description]
- [Concern 2: Brief description]
- [Concern 3: Brief description]

**Recommendation**: [✅ APPROVED / ✅ APPROVED WITH CONDITIONS / ❌ REJECTED]

**Conditions** (if applicable):
1. [P0 security control requirement]
2. [P0 security control requirement]
3. [P0 security control requirement]

---

## Threat Model (STRIDE Framework)

### Spoofing Identity
**Risk**: [Description of spoofing threat]
**Attack Scenario**: [How an attacker could spoof identity]
**Mitigation**: [Proposed security control]
**Severity**: [Low / Medium / High / Critical]

### Tampering with Data
**Risk**: [Description of data tampering threat]
**Attack Scenario**: [How an attacker could tamper with data]
**Mitigation**: [Proposed security control]
**Severity**: [Low / Medium / High / Critical]

### Repudiation
**Risk**: [Description of repudiation threat]
**Attack Scenario**: [How a user could deny actions]
**Mitigation**: [Audit logging implementation]
**Severity**: [Low / Medium / High / Critical]

### Information Disclosure
**Risk**: [Description of information disclosure threat]
**Attack Scenario**: [How sensitive data could be exposed]
**Mitigation**: [Proposed security control]
**Severity**: [Low / Medium / High / Critical]

### Denial of Service
**Risk**: [Description of DoS threat]
**Attack Scenario**: [How attacker could cause service unavailability]
**Mitigation**: [Rate limiting, resource limits]
**Severity**: [Low / Medium / High / Critical]

### Elevation of Privilege
**Risk**: [Description of privilege escalation threat]
**Attack Scenario**: [How attacker could gain unauthorized access]
**Mitigation**: [Authorization checks, least privilege]
**Severity**: [Low / Medium / High / Critical]

---

## OWASP Top 10 (2021) Assessment

### A01: Broken Access Control
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Analysis**:
- [Describe how feature implements access control]
- [Identify any access control gaps]

**Vulnerabilities Identified**:
- [ ] User ID taken from client input (should use authenticated session)
- [ ] Authorization checks missing on endpoints
- [ ] Horizontal privilege escalation possible (access other users' data)
- [ ] Vertical privilege escalation possible (access admin functions)
- [ ] CORS misconfiguration allows cross-origin access

**Required Fixes**:
1. [Specific fix with code example if applicable]
2. [Specific fix]

**Code Example** (if applicable):
```javascript
// ❌ VULNERABLE
app.get('/api/v1/user/:userId/profile', (req) => {
  const userId = req.params.userId; // Attacker controls this
  return getUserProfile(userId);
});

// ✅ SECURE
app.get('/api/v1/user/profile', authenticateJWT, (req) => {
  const userId = req.user.id; // From verified JWT token
  return getUserProfile(userId);
});
```

---

### A02: Cryptographic Failures
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**PII Data Handled**:
| Field | Type | At Rest Encryption | In Transit Encryption | Key Management |
|-------|------|-------------------|----------------------|----------------|
| email | Contact Info | [Yes/No - method] | [TLS 1.3] | [AWS KMS / .env] |
| password | Credential | [bcrypt hash] | [TLS 1.3] | [N/A - hashed] |
| SSN | Identity | [AES-256] | [TLS 1.3] | [AWS KMS] |

**Vulnerabilities Identified**:
- [ ] PII stored in plaintext
- [ ] Weak encryption algorithm (DES, MD5, SHA1)
- [ ] Encryption keys hardcoded or in version control
- [ ] No TLS for data in transit
- [ ] Sensitive data in logs or error messages

**Required Fixes**:
1. [Specific fix]

---

### A03: Injection
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**User Input Points**:
- [List all user input fields/parameters]

**Injection Risks**:
- [ ] SQL Injection (user input in database queries)
- [ ] XSS (user input rendered in HTML without escaping)
- [ ] Command Injection (user input passed to OS commands)
- [ ] LDAP Injection (user input in directory queries)
- [ ] XML Injection (user input in XML documents)

**Required Fixes**:
1. **SQL Injection Prevention**: Use parameterized queries
   ```sql
   -- ❌ VULNERABLE
   query = `SELECT * FROM users WHERE name = '${req.body.name}'`;

   -- ✅ SECURE
   query = 'SELECT * FROM users WHERE name = $1';
   params = [req.body.name];
   ```

2. **XSS Prevention**: Escape HTML output
   ```javascript
   // ❌ VULNERABLE
   res.send(`<h1>Hello ${req.body.name}</h1>`);

   // ✅ SECURE (React auto-escapes)
   return <h1>Hello {req.body.name}</h1>;
   ```

---

### A04: Insecure Design
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Security Patterns Used**:
- [ ] Threat modeling completed (STRIDE)
- [ ] Security requirements defined upfront
- [ ] Defense in depth (multiple security layers)
- [ ] Fail-secure defaults (deny access on error)
- [ ] Least privilege principle applied

**Design Flaws Identified**:
- [List any fundamental design security issues]

**Required Fixes**:
1. [Design-level security improvements]

---

### A05: Security Misconfiguration
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Configuration Review**:
- [ ] Default credentials removed/changed
- [ ] Unnecessary features disabled (debug mode, sample endpoints)
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Error messages don't leak implementation details
- [ ] Directory listing disabled
- [ ] Latest security patches applied

**Required Fixes**:
1. [Configuration change needed]

---

### A06: Vulnerable and Outdated Components
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Dependency Scan Results** (`npm audit` or equivalent):
- Total dependencies: [number]
- Known vulnerabilities: [number]
- Critical: [number]
- High: [number]
- Medium: [number]
- Low: [number]

**Vulnerable Dependencies**:
| Package | Version | Vulnerability | CVE | Severity | Fix |
|---------|---------|---------------|-----|----------|-----|
| [package] | [1.0.0] | [description] | [CVE-YYYY-XXXXX] | [Critical] | [Update to 2.0.0] |

**Required Fixes**:
1. Update vulnerable packages to secure versions
2. Remove unused dependencies
3. Implement automated dependency scanning in CI/CD

---

### A07: Identification and Authentication Failures
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Authentication Architecture**:
- **Method**: [OAuth 2.0 / SAML / API Keys / JWT / Session Cookies]
- **Password Policy** (if applicable): [min length, complexity, expiration]
- **Multi-Factor Authentication**: [Available / Not Available]
- **Session Management**: [timeout, refresh, revocation mechanism]
- **Credential Storage**: [bcrypt / Argon2 / PBKDF2]

**Vulnerabilities Identified**:
- [ ] Weak password policy (no complexity requirements)
- [ ] No session timeout (indefinite sessions)
- [ ] Credentials sent over HTTP (not HTTPS)
- [ ] No account lockout after failed attempts
- [ ] Session tokens exposed in URL
- [ ] No MFA for sensitive operations

**Required Fixes**:
1. [Specific authentication improvement]

---

### A08: Software and Data Integrity Failures
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Integrity Checks**:
- [ ] Code signing for deployments
- [ ] Webhook signature verification (HMAC)
- [ ] Subresource Integrity (SRI) for CDN resources
- [ ] Supply chain security (verify NPM package sources)
- [ ] CI/CD pipeline integrity (signed commits, protected branches)

**Required Fixes**:
1. [Integrity control implementation]

---

### A09: Security Logging and Monitoring Failures
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**Security Events Logged**:
- [ ] Authentication attempts (success + failure)
- [ ] Authorization denials
- [ ] Admin operations (config changes, user management)
- [ ] Data exports / bulk operations
- [ ] Password changes / resets
- [ ] MFA enrollments / changes

**Log Contents**:
- [ ] Timestamp (UTC)
- [ ] User ID (no PII like email/name)
- [ ] IP address
- [ ] Action performed
- [ ] Result (success / failure / error code)
- [ ] PII redacted from logs

**Monitoring & Alerting**:
- [ ] Failed login threshold (5 failures → alert)
- [ ] Privilege escalation attempts
- [ ] Unusual data access patterns
- [ ] Security scan detections

**Required Fixes**:
1. [Logging/monitoring enhancement]

---

### A10: Server-Side Request Forgery (SSRF)
**Assessment**: [✅ Low Risk / ⚠️ Medium Risk / ❌ High Risk / 🚨 Critical Risk]

**User-Controllable URLs**:
- [List any features where users can specify URLs]

**SSRF Protections**:
- [ ] URL validation (allow-list of domains)
- [ ] Block access to internal IPs (127.0.0.1, 10.0.0.0/8, 192.168.0.0/16, 169.254.0.0/16)
- [ ] Disable URL redirects or validate redirect targets
- [ ] Network segmentation (application can't reach internal services)

**Required Fixes**:
1. [SSRF mitigation]

---

## Privacy & Compliance

### PII Classification

| Data Field | PII Category | GDPR Article 9? | Retention Period | Deletion Method |
|------------|--------------|-----------------|------------------|-----------------|
| Email | Contact Info | No | Account + 30 days | Hard delete |
| Password Hash | Credential | No | Account + 0 days | Immediate delete |
| SSN | Identity | Yes (Special Category) | Legal requirement | Secure wipe |
| Health Data | Medical | Yes (Special Category) | 7 years | Secure wipe |

### GDPR Requirements (EU Users)

**Lawful Basis for Processing**:
- [ ] Consent obtained (explicit, informed, freely given, withdrawable)
- [ ] Contract necessity (processing required for service delivery)
- [ ] Legal obligation (required by law)
- [ ] Legitimate interest (with balancing test)

**Data Subject Rights**:
- [ ] **Right to Access** (Article 15): User can export all their data
- [ ] **Right to Rectification** (Article 16): User can update incorrect data
- [ ] **Right to Erasure** (Article 17): User can request account deletion
- [ ] **Right to Data Portability** (Article 20): Data exported in machine-readable format (JSON)
- [ ] **Right to Object** (Article 21): User can object to processing
- [ ] **Breach Notification** (Article 33): 72-hour notification requirement (have incident response plan)

**Data Transfers**:
- [ ] Data stays in EU (no transfer issue)
- [ ] Standard Contractual Clauses (SCCs) in place for non-EU transfers
- [ ] Adequacy decision country (UK, Switzerland, etc.)

### CCPA Requirements (California Users)

- [ ] **Privacy Policy Disclosure**: What data collected, why, with whom shared
- [ ] **Right to Know**: User can request disclosure of data collected
- [ ] **Right to Delete**: User can request data deletion
- [ ] **Right to Opt-Out**: "Do Not Sell My Personal Information" link
- [ ] **Non-Discrimination**: Can't charge more for privacy requests

---

## Security Controls Required

### P0 - MANDATORY (Blocks Launch)

1. **[Control Name]**: [Description]
   - **Impact if Missing**: [Security risk]
   - **Implementation**: [How to implement]
   - **Validation**: [How to test]

2. **[Control Name]**: [Description]
   - **Impact if Missing**: [Security risk]
   - **Implementation**: [How to implement]
   - **Validation**: [How to test]

### P1 - HIGH PRIORITY (Launch Week)

3. **[Control Name]**: [Description]
4. **[Control Name]**: [Description]

### P2 - MEDIUM PRIORITY (Post-Launch)

5. **[Control Name]**: [Description]

---

## Risk Register

| Risk ID | Threat | Vulnerability | Impact | Likelihood | Risk Score | CVSS | Mitigation | Owner |
|---------|--------|---------------|--------|------------|------------|------|------------|-------|
| SEC-001 | [Threat description] | [Vuln description] | High | Medium | 7.5 | 7.5 (High) | [Mitigation] | Eng Team |
| SEC-002 | [Threat description] | [Vuln description] | Critical | Low | 9.1 | 9.1 (Critical) | [Mitigation] | Eng Team |

**Risk Score Calculation**: Impact × Likelihood
- **Impact**: Low (1), Medium (2), High (3), Critical (4)
- **Likelihood**: Low (1), Medium (2), High (3)
- **Risk Score Range**: 1-12

**CVSS Scores** (Common Vulnerability Scoring System):
- **0.0**: None
- **0.1-3.9**: Low
- **4.0-6.9**: Medium
- **7.0-8.9**: High
- **9.0-10.0**: Critical

---

## Security Testing Requirements

### Pre-Production Testing

- [ ] **SAST (Static Application Security Testing)**: SonarQube, Checkmarx, or Semgrep scan
- [ ] **DAST (Dynamic Application Security Testing)**: OWASP ZAP, Burp Suite automated scan
- [ ] **Dependency Scanning**: `npm audit`, Snyk, or Dependabot
- [ ] **Secrets Scanning**: git-secrets, TruffleHog, or GitHub secret scanning
- [ ] **Unit Tests**: Security-specific test cases (authorization, input validation)
- [ ] **Integration Tests**: End-to-end security flows (auth, permissions)

### Production Readiness

- [ ] **Manual Penetration Testing**: Security expert review (internal or external)
- [ ] **Security Code Review**: Senior engineer sign-off on auth/authz logic
- [ ] **Red Team Exercise**: Attempt to exploit identified vulnerabilities
- [ ] **Compliance Audit**: GDPR/SOC 2 checklist validation
- [ ] **Incident Response Plan**: Documented process for security incidents

### Ongoing Monitoring

- [ ] **Vulnerability Scanning**: Weekly automated scans
- [ ] **Penetration Testing**: Annual external pen test
- [ ] **Dependency Updates**: Monthly security patch review
- [ ] **Security Audits**: Quarterly review of logs and access controls

---

## Third-Party Security Assessment

### External Services/APIs

| Service | Purpose | Data Shared | SOC 2 Certified? | Security Review Date | Risk Level |
|---------|---------|-------------|------------------|----------------------|------------|
| [Service name] | [Purpose] | [PII/Other] | [Yes/No] | [YYYY-MM-DD] | [Low/Med/High] |

### Vendor Security Requirements

- [ ] **SOC 2 Type II** compliance (or equivalent: ISO 27001, PCI-DSS)
- [ ] **Security questionnaire** completed
- [ ] **Data Processing Agreement (DPA)** signed (GDPR requirement)
- [ ] **Penetration test results** reviewed (if processing PII)
- [ ] **Incident response SLA** documented
- [ ] **Data deletion guarantee** upon contract termination

---

## Recommendations

### Priority 0 (BLOCKS LAUNCH)

1. **[Recommendation]**: [Detailed description]
   - **Rationale**: [Why this is critical]
   - **Implementation Effort**: [XS/S/M/L/XL]
   - **Deadline**: [Before launch]

### Priority 1 (LAUNCH WEEK)

2. **[Recommendation]**: [Detailed description]
   - **Rationale**: [Why this is important]
   - **Implementation Effort**: [XS/S/M/L/XL]
   - **Deadline**: [Within 1 week of launch]

### Priority 2 (POST-LAUNCH)

3. **[Recommendation]**: [Detailed description]
   - **Rationale**: [Why this is good to have]
   - **Implementation Effort**: [XS/S/M/L/XL]
   - **Deadline**: [Within 1 month of launch]

---

## Compliance Checklist

### SOC 2 (Security, Availability, Confidentiality)

- [ ] Access control documented and enforced
- [ ] Encryption at rest and in transit
- [ ] Audit logging configured
- [ ] Incident response plan exists
- [ ] Change management process followed
- [ ] Vendor risk assessment completed

### GDPR (If EU Users)

- [ ] Lawful basis for processing documented
- [ ] Consent mechanism (if applicable)
- [ ] Privacy policy updated
- [ ] Data subject rights supported (access, delete, export)
- [ ] Data Protection Impact Assessment (DPIA) for high-risk processing
- [ ] Breach notification process (72 hours to supervisory authority)

### HIPAA (If Health Data)

- [ ] PHI encryption (AES-256 at rest, TLS 1.3 in transit)
- [ ] Access controls (role-based, minimum necessary)
- [ ] Audit logging (all PHI access)
- [ ] Business Associate Agreement (BAA) with vendors
- [ ] Security risk assessment completed
- [ ] Incident response plan

### PCI-DSS (If Payment Data)

- [ ] Cardholder data not stored (use tokenization)
- [ ] PCI-compliant payment processor (Stripe, etc.)
- [ ] Network segmentation (payment processing isolated)
- [ ] Quarterly vulnerability scans
- [ ] Annual penetration testing

---

## Approval Decision

### Security Risk Summary

**Overall Risk Level**: [Low / Medium / High / Critical]

**Critical Vulnerabilities**: [Number]
**High Vulnerabilities**: [Number]
**Medium Vulnerabilities**: [Number]
**Low Vulnerabilities**: [Number]

### Decision

**Status**: [✅ APPROVED / ✅ APPROVED WITH CONDITIONS / ❌ REJECTED / ⏸️ ON HOLD]

**Justification**:
[Explain the approval decision - why is it safe to proceed, or why not?]

**Conditions for Approval** (if applicable):
1. [P0 security control must be implemented]
2. [P0 security control must be implemented]
3. [Security re-review required after fixes]

**Next Steps**:
1. [Action item for engineering team]
2. [Action item for product team]
3. [Action item for security team]

---

## Appendix

### Security References

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [STRIDE Threat Modeling](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- [CVSS Calculator](https://www.first.org/cvss/calculator/3.1)
- [GDPR Portal](https://gdpr.eu/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

### Security Testing Tools

- **SAST**: SonarQube, Semgrep, Checkmarx
- **DAST**: OWASP ZAP, Burp Suite, Nessus
- **Dependency Scan**: npm audit, Snyk, Dependabot
- **Secrets Scan**: TruffleHog, git-secrets, GitHub secret scanning
- **Penetration Testing**: Metasploit, Kali Linux, Cobalt Strike

---

**Assessment Completed By**: Engineering Partner Agent v1.2
**Assessment Date**: [YYYY-MM-DD]
**Next Review Date**: [Before launch + any major feature changes]
**Document Version**: 1.0
