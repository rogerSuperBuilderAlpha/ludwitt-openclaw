# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Ludwitt, please report it responsibly.

**Email:** security@ludwitt.com

For sensitive reports, you may encrypt your email using our PGP key:

- **Key ID:** (coming soon — will be published at `https://ludwitt.com/.well-known/security.txt`)
- Alternatively, use GitHub's [private vulnerability reporting](https://github.com/rogerSuperBuilderAlpha/ludwitt-openclaw/security/advisories/new)

Please include:

- Description of the vulnerability
- Steps to reproduce
- Affected component (e.g., API route, Firestore rule, client-side)
- Severity estimate (see below)
- Any suggested fix

## Severity Ratings

| Level             | Description                                  | Response SLA                          | Examples                               |
| ----------------- | -------------------------------------------- | ------------------------------------- | -------------------------------------- |
| **P0 - Critical** | Active exploitation or data breach risk      | Acknowledge < 4 hours, fix < 24 hours | Auth bypass, credential exposure, RCE  |
| **P1 - High**     | Exploitable with direct user impact          | Acknowledge < 24 hours, fix < 7 days  | Privilege escalation, stored XSS, IDOR |
| **P2 - Medium**   | Exploitable with limited impact              | Acknowledge < 48 hours, fix < 30 days | CSRF, reflected XSS, info disclosure   |
| **P3 - Low**      | Minimal risk or requires unlikely conditions | Acknowledge < 7 days, fix < 90 days   | Missing headers, verbose errors        |

## Response Timeline

1. **Acknowledgment:** We will confirm receipt of your report within the SLA above
2. **Triage:** We will validate and assign a severity level within 48 hours
3. **Fix:** We will develop and deploy a fix within the SLA for the assigned severity
4. **Notification:** We will notify you when the fix is deployed
5. **Disclosure:** We coordinate public disclosure 90 days after the fix, or sooner by mutual agreement

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | Yes       |

## Scope

- Authentication and authorization flaws
- Data exposure or leakage
- Injection vulnerabilities (XSS, SQL injection, etc.)
- CSRF and SSRF vulnerabilities
- Insecure direct object references
- Firestore/Storage security rule bypasses
- Rate limiting bypasses
- Credit system manipulation

## Out of Scope

- Denial of service attacks
- Social engineering
- Issues in third-party dependencies (report to the upstream project)
- Vulnerabilities requiring physical access to user devices

## Disclosure Policy

- We follow coordinated disclosure practices
- We ask that you give us 90 days to address the issue before public disclosure
- We will credit reporters in our security advisories (unless anonymity is requested)
