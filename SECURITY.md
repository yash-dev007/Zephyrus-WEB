# Security policy

This repository contains the static Zephyrus marketing site. It has no application
server, database, login, analytics, cookies, or third-party runtime request. The product
runtime and its API live in the [Zephyrus repository](https://github.com/yash-dev007/Zephyrus);
report product vulnerabilities there.

## Supported versions

| Version | Supported |
| ------- | --------- |
| `1.0.x` | ✅        |
| `main`  | ✅        |
| Older   | ❌        |

The site is deployed from `main`. A fix is normally shipped as a normal site release; no
separate long-term branch is maintained.

## Reporting a vulnerability

**Do not open a public issue for a suspected vulnerability.**

Use GitHub's private advisory flow:

<https://github.com/yash-dev007/Zephyrus-WEB/security/advisories/new>

If private reporting is unavailable, contact the maintainer through the GitHub profile
[@yash-dev007](https://github.com/yash-dev007) and ask for a private channel. Do not include
exploit details, credentials, or personal data in a public issue or pull request.

Please include:

- A description of the issue and the affected URL, commit, or file.
- Reproduction steps or a minimal proof of concept.
- The impact you believe is possible, including any required user interaction.
- Your environment (browser, version, and any relevant headers).
- Whether you want to be credited, and how.

## Scope

In scope for this repository:

- A bypass of the production Content Security Policy or other security headers in
  `public/_headers`.
- Script injection or HTML injection through site content, generated metadata, the OG
  route, or the canvas/sigil code.
- A leaked secret, private reference asset, or unintended third-party request in the
  published output.
- A dependency vulnerability that is reachable through the built site.
- A supply-chain issue in the build or deploy workflow.

Out of scope:

- The Zephyrus product runtime, API, model serving, authentication, or data directory.
  Report those to the [product repository](https://github.com/yash-dev007/Zephyrus).
- Findings that require a compromised browser, a malicious extension, or physical access.
- Denial-of-service traffic, social engineering, spam, or automated scanner output
  without a demonstrated impact.
- Missing headers that are not exploitable in the static deployment, or best-practice
  suggestions with no security consequence.

## Response

- Acknowledgement target: **3 business days**.
- Initial triage target: **7 business days**.
- Coordinated disclosure target: **90 days** after a fix is available, or sooner by
  agreement.

These are targets, not a warranty. We will keep the report private until a fix or
mitigation is ready and will credit reporters who want credit.

## Safe harbor

We support good-faith security research. If you:

- test only against a local build or your own deployment,
- avoid privacy violations, data destruction, and service disruption,
- do not use social engineering or physical intrusion, and
- give us reasonable time to fix the issue before disclosure,

we will not pursue legal action or report you to a platform for the research. This safe
harbor does not authorize testing third-party services or data you do not own.

There is no bug bounty program. Reports are handled on a best-effort basis.

## Security posture

- Static output; no server-side request handling at runtime.
- CSP, HSTS, permissions policy, and cache rules in `public/_headers`; the default
  `script-src` is `'self'`.
- No third-party requests, analytics, or cookies by default.
- Pinned dependencies and a frozen lockfile in CI.
- GitHub Actions use read-only `contents` permission and a pinned Node/pnpm toolchain.
- `ref/` and local reference material are gitignored and excluded from the published site.
- The build runs `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm build` before deploy.
