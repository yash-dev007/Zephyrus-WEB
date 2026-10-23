# Contributing to the Zephyrus website

Thanks for helping with the Zephyrus marketing site. This repository is the static
website only. Product bugs, install problems, and runtime security reports belong in the
[Zephyrus product repository](https://github.com/yash-dev007/Zephyrus).

By participating, you agree to keep discussion respectful, assume good faith, and avoid
posting another person's private information.

## Requirements

- Node `24` (`.nvmrc`; the package engines allow `>=22.22.0`)
- pnpm `12.14.0` (the pinned `packageManager`)
- A Chromium-family browser for quick checks; the full Playwright matrix also uses
  Firefox and WebKit

## Set up

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

For a production-like check:

```sh
pnpm build
pnpm preview      # serves dist/ at http://localhost:4321
```

## Before opening a pull request

Run the checks that apply to your change:

```sh
pnpm check        # Astro + TypeScript diagnostics
pnpm lint         # ESLint + Prettier
pnpm test         # Vitest content/asset checks
pnpm build        # production output, OG image, sitemap
pnpm test:e2e     # Playwright, axe, visual capture
```

If you touched motion, hydration, or the canvas:

```sh
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
```

If you touched performance, fonts, images, or the hero, run the Lighthouse budget:

```sh
pnpm lhci
```

Visual changes need screenshots at `375`, `768`, and `1440`, plus a reduced-motion run.
The Playwright visual test writes those captures to `test-results/`; they are reviewed by
eye rather than snapshot-compared.

## Content and design rules

- Keep the visual direction monochrome: black paper, bone-white ink, grain, hairline
  rails, rounded poster cards, and the condensed wordmark. Do not reintroduce a colored
  accent without an explicit design decision.
- Keep the approved copy deck's meaning. Edit `src/data/*.ts` for shared content and
  links; do not scatter repository URLs or repeated copy through components.
- Do not add analytics, cookies, trackers, third-party fonts, remote images, or embeds.
  The production default is **no third-party requests**. A new origin requires a CSP and
  privacy review in `public/_headers` and the README.
- Preserve the accessibility contract: semantic headings, a skip link, 44px touch targets,
  visible focus, keyboard-operable tabs and menu, native accordions, and reduced-motion /
  reduced-data paths. Run `pnpm test:e2e` after changing interaction code.
- The hero LCP is the H1 text, not an image. Do not replace it with a hero photograph or a
  canvas-only headline.
- Keep the initial JavaScript under **100 KB gzip**. New `client:load` islands need a
  measured reason; prefer `client:visible` for below-the-fold interaction.
- Do not commit `ref/`, source reference images, credentials, `.env` files, or local
  tooling state. `ref/` is gitignored and never published.

### Images

Use the generated photography in `src/assets/images/` through `src/data/images.ts`. Images
must not contain generated UI, text, logos, charts, or product screenshots. The stone
relief is the only literal dragon scene. The mark, wordmark, stamp, barcode, sigil,
diagrams, and OG typography are built in code.

## Branch model

- `main` is the deployable branch.
- Work on a short-lived branch: `feat/…`, `fix/…`, `docs/…`, or `chore/…`.
- Rebase on `main` before opening the pull request. Do not force-push a branch someone
  else is reviewing.
- Website links to the product source use the product repository's `master` branch; the
  website repository itself uses `main`.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(hero): add the poster card rail
fix(menu): restore focus after closing the sheet
docs(readme): document the website repository
chore(deps): pin playwright
```

Keep a commit to one concern. If a visual change spans several sections, explain the
system in the body rather than listing every selector.

## Pull request checklist

- [ ] `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm build` pass.
- [ ] The change was checked at 375, 768, and 1440, including reduced motion.
- [ ] Keyboard and screen-reader behavior was checked for interactive changes.
- [ ] No new third-party request, secret, `ref/` asset, or generated UI image was added.
- [ ] The initial JS budget and Lighthouse budgets still pass when relevant.
- [ ] Documentation and data modules were updated with the change.
- [ ] The PR description states the user-visible change and any follow-up work.

## Security

Do not report a suspected vulnerability in a public issue. Follow
[`SECURITY.md`](SECURITY.md) and use GitHub's private security advisory flow.

## License

By contributing, you agree that your contribution is licensed under the repository's
**AGPL-3.0-only** license. See [`LICENSE`](LICENSE).
