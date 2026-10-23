import { test, expect } from '@playwright/test';

const widths = [375, 768, 1440];

test.describe('visual matrix', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Screenshots once in Chromium.');

  for (const width of widths) {
    for (const reduced of [false, true]) {
      test(`homepage ${width}px ${reduced ? 'reduced motion' : 'default'}`, async ({
        page,
      }, testInfo) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        await page.evaluate(async () => {
          const height = document.body.scrollHeight;
          for (let y = 0; y < height; y += 700) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 45));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(reduced ? 350 : 2200);

        const broken = await page.evaluate(() =>
          [...document.images]
            .filter((image) => !image.complete || image.naturalWidth === 0)
            .map((image) => image.currentSrc || image.src),
        );
        expect(broken).toEqual([]);

        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(1);

        await page.screenshot({
          path: testInfo.outputPath(`home-${width}-${reduced ? 'reduced' : 'default'}.png`),
          fullPage: true,
        });

        await page.locator('.hero').screenshot({
          path: testInfo.outputPath(`hero-${width}-${reduced ? 'reduced' : 'default'}.png`),
        });
      });
    }
  }
});
