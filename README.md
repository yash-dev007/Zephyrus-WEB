# Zephyrus — website

The marketing site for **Zephyrus**, a self-hosted, local-first AI harness. One page
(`/`), a colophon (`/colophon`), and a 404. Static, dark, and built to run without a
third-party request.

The design direction is **THE WYRM IN THE MACHINE / COLD BREATH**: black paper,
heavy grain, monochrome photography, rounded poster cards, hairline rails, a bone-white
signal, and a dragon mark that behaves like instrumentation rather than a mascot.

## Repository

- **This site:** [github.com/yash-dev007/Zephyrus-WEB](https://github.com/yash-dev007/Zephyrus-WEB) — default branch `main`.
- **The product:** [github.com/yash-dev007/Zephyrus](https://github.com/yash-dev007/Zephyrus) — default branch `master`.
- **Website issues:** [Zephyrus-WEB issues](https://github.com/yash-dev007/Zephyrus-WEB/issues).

The site links to the product repository for install and source links. The product repository
owns its own contributing, security, and roadmap documents.

## Stack

| Layer        | Choice                                                     | Pin                                       |
| ------------ | ---------------------------------------------------------- | ----------------------------------------- |
| Framework    | Astro, static output                                       | `7.4.1`                                   |
| Islands      | React                                                      | `19.3.1`                                  |
| Motion       | Motion for React                                           | `14.5.0`                                  |
| Smooth wheel | Lenis                                                      | `1.3.27`                                  |
| Styling      | Vanilla CSS layers + custom properties                     | —                                         |
| Images       | Sharp → AVIF / WebP                                        | `0.35.5`                                  |
| OG image     | Satori + resvg                                             | `0.63.2` / `2.6.2`                        |
| Typecheck    | TypeScript (strict)                                        | `6.0.3`                                   |
| Lint/format  | ESLint + typescript-eslint + eslint-plugin-astro; Prettier | `10.13.0` / `8.72.0` / `3.2.1` / `3.9.10` |
| Tests        | Vitest, Playwright, axe-core                               | `5.0.5` / `1.64.1` / `4.14.0`             |
| Perf CI      | Lighthouse CI                                              | `0.15.1`                                  |

**Why TypeScript 6.0.3?** `typescript-eslint@8.72.0` requires TypeScript `<6.1.0`,
and `@astrojs/check@0.9.12` supports `^5 || ^6`. `6.0.3` is the pinned intersection.
Do not bump TypeScript without checking both.

**Why `minimumReleaseAge: 0`?** Motion `14.5.0` was published the day the site was
scaffolded. The workspace setting is documented in `pnpm-workspace.yaml`; it is not
a general recommendation.

## Run it

Requirements: Node `24` (`.nvmrc`; engines allow `>=22.22.0`) and pnpm `12.14.0`.

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # emits dist/
pnpm preview      # serves dist/ at http://localhost:4321
```

### Scripts

| Command         | What it does                                                   |
| --------------- | -------------------------------------------------------------- |
| `pnpm check`    | `astro check` (Astro + TS diagnostics)                         |
| `pnpm lint`     | ESLint + Prettier check                                        |
| `pnpm lint:fix` | ESLint `--fix` + Prettier write                                |
| `pnpm test`     | Vitest content and asset-budget tests                          |
| `pnpm test:e2e` | Playwright (desktop Chromium/Firefox/WebKit + iPhone)          |
| `pnpm lhci`     | Lighthouse CI budgets against `dist/`                          |
| `pnpm fonts`    | Re-subset the self-hosted WOFF2 files                          |
| `pnpm grain`    | Regenerate the grain tiles                                     |
| `pnpm deploy`   | `wrangler deploy` (Cloudflare Pages config in `wrangler.toml`) |

## Deploy

The output is static. Set the production origin before building:

```sh
PUBLIC_SITE_URL=https://your-domain.example pnpm build
```

The placeholder is `https://zephyrus.example` in `src/data/site.ts` and
`astro.config.mjs`; replace both (or provide `PUBLIC_SITE_URL`) before launch.
`sitemap-index.xml`, `robots.txt`, `llms.txt`, canonical URLs, JSON-LD, and OG URLs
all derive from that value.

`public/_headers` contains the production CSP, HSTS, permissions policy, and cache
rules. `script-src` stays at `'self'`; `boot.js` is an external same-origin file and
Astro emits islands as external modules. `style-src` allows inline because Astro
inlines critical CSS. If you add a third-party embed, the headers need an explicit
review — the default is no third-party requests.

## Content and structure

- `src/data/site.ts` — name, description, version, edition, license, port, repo, links, nav.
- `src/data/capabilities.ts` — the twelve capability rows and their groups.
- `src/data/install.ts` — install tabs, verification, first boot, facts.
- `src/data/providers.ts` — local and hosted provider names.
- `src/data/spine.ts` — architecture layers, data tree, annotations, request trace.
- `src/data/images.ts` — image imports, alt text, captions, credits, focal positions.
- `src/pages/index.astro` — section composition.
- `src/styles/` — tokens, type, base primitives, section layout, motion, and the
  `poster.css` card/rail override layer.

Product links in `src/data/site.ts` use the product repository's actual default branch,
**`master`**: `/blob/master/...`. Update `site.ts` only; do not scatter links through
components.

## Images

The graded source images live in `src/assets/images/` and are imported through
`images.ts`. Astro emits AVIF and WebP with fixed dimensions from `Picture`; the
`width`/`height` pair prevents layout shift. Source photography is never copied to
`public/`.

- Hero has **no photograph**. The LCP is the H1 text.
- The hero sigil is Canvas 2D with an SVG fallback; it resolves to a static mark when
  `prefers-reduced-motion: reduce` is set.
- The stone relief is the only literal dragon scene. The optional eye and scales
  sources are processed but intentionally not placed on the page.
- `ref/` is gitignored and never published.

## Fonts and motion

- Three OFL families: Archivo (poster wordmark, condensed uppercase subset), JetBrains
  Mono (technical + body), Instrument Serif (one pull quote). Total self-hosted payload is
  under 100 KB; run `pnpm fonts` after copy changes.
- Archivo and JetBrains Mono are preloaded. Fonts are served from `/fonts/`.
- Lenis is wheel-only and disabled for reduced motion, reduced data, and Save-Data.
  Touch scrolling stays native.
- Reveals are progressive: content is visible without JS, and `data-reveal` only
  hides after the observer is installed. The spine diagram is fully visible without
  JS and only draws when hydrated.
- No smooth scrolling on keyboard focus moves; anchors move focus to the target.
- Initial JavaScript is held under **100 KB gzip**. The current page loads the canvas
  island, the mobile menu, React, and Lenis at around 82 KB gzip; Motion and the
  below-the-fold islands stay code-split until needed.

## Accessibility

Target: **WCAG 2.2 AA**. The site has a skip link, 44px touch targets, visible focus,
a focus-trapped mobile menu, keyboard tabs, native accordions, reduced-motion and
reduced-data paths, and no hover-only information. Text colors were raised so the
faint ink still clears AA on the field and surfaces. `pnpm test:e2e` runs axe on the
home page, colophon, and 404.

## Tests

```sh
pnpm test          # unit: content, links, budgets, sigil helpers
pnpm build
pnpm test:e2e      # desktop + mobile; axe; screenshots in test-results/
pnpm lhci          # mobile Lighthouse budgets
```

Visual screenshots are written to `test-results/` on every visual run; they are not
snapshot-compared, because the page is intentionally art-directed and reviewed by eye.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, checks, content rules, and the pull
request checklist. Contributions are accepted under the repository's AGPL-3.0-only
license.

## Security

See [`SECURITY.md`](SECURITY.md) for the supported version, private reporting channel,
scope, and safe-harbor terms. Do not open a public issue for a suspected vulnerability.

## License

Site source: **AGPL-3.0-only** (matching the product). See [`LICENSE`](LICENSE). Product
repository: [github.com/yash-dev007/Zephyrus](https://github.com/yash-dev007/Zephyrus).

Not affiliated with model providers. Provider names are trademarks of their owners.
# Zephyrus-WEB
