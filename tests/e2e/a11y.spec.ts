import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('accessibility', () => {
  test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });

  const pages = [
    { path: '/', name: 'home' },
    { path: '/colophon', name: 'colophon' },
    { path: '/404', name: '404' },
  ];

  for (const pageInfo of pages) {
    test(`${pageInfo.name} has no serious or critical axe violations`, async ({
      page,
      browserName,
    }) => {
      test.skip(browserName !== 'chromium', 'Run the axe matrix once in Chromium.');
      await page.goto(pageInfo.path);
      await page.locator('#main').waitFor();

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const blocking = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );
      expect(
        blocking.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => node.target),
        })),
      ).toEqual([]);
    });
  }
});
