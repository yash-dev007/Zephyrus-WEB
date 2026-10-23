import { test, expect } from '@playwright/test';

test.describe('home', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('renders the approved hero and every section', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Your models.');
    await expect(h1).toContainText('Your machine.');
    await expect(h1).toContainText('Your hoard.');

    for (const id of ['lair', 'anatomy', 'spine', 'hoard', 'kin', 'rite', 'wind']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    await expect(page.locator('.cap')).toHaveCount(12);
    await expect(page.getByRole('tab')).toHaveCount(3);
    await expect(page.locator('.provider')).toHaveCount(13);
    await expect(page.locator('footer')).toBeVisible();
  });

  test('skip link moves focus to main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('anchor navigation scrolls, updates the hash, and moves focus', async ({ page }) => {
    await page.goto('/');
    const anatomyLink = page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Anatomy' });
    await anatomyLink.click();

    await expect(page).toHaveURL(/#anatomy$/);
    await expect(page.locator('#anatomy')).toBeFocused();
    await expect(anatomyLink).toHaveAttribute('data-active', 'true');
    const progress = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress'),
    );
    expect(Number(progress)).toBeGreaterThan(0);
  });

  test('ledger opens one row at a time', async ({ page }) => {
    await page.goto('/#anatomy');
    const rows = page.locator('details.cap');
    const first = rows.nth(0);
    const second = rows.nth(1);

    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');

    await second.locator('summary').click();
    await expect(second).toHaveAttribute('open', '');
    await expect(first).not.toHaveAttribute('open', '');
  });

  test('install tabs are keyboard operable', async ({ page }) => {
    await page.goto('/#rite');
    await expect(page.locator('.install')).toHaveAttribute('data-ready', 'true');
    const tabs = page.getByRole('tab');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveCount(1);

    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveCount(1);

    await page.keyboard.press('End');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Home');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  });

  test('copy button copies commands and announces the result', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only reliable in Chromium.');
    await page.goto('/#rite');
    await expect(page.locator('.install')).toHaveAttribute('data-ready', 'true');
    const panel = page.locator('.install__panel[data-active="true"]');
    await expect(panel).toBeVisible();
    const copy = panel.locator('.copy-button').first();
    await copy.click();
    await expect(panel.locator('.copy-status')).toHaveText('Copied to clipboard');
    await expect(copy).toHaveAttribute('data-copied', 'true');
  });

  test('external links carry safe rel values', async ({ page }) => {
    await page.goto('/');
    const unsafe = await page.locator('a[href^="http"]').evaluateAll((links) =>
      links
        .filter((link) => {
          const rel = (link.getAttribute('rel') ?? '').split(/\s+/);
          return !rel.includes('noopener') || !rel.includes('noreferrer');
        })
        .map((link) => link.getAttribute('href')),
    );
    expect(unsafe).toEqual([]);
  });

  test('makes no third-party requests', async ({ page }) => {
    const hosts = new Set<string>();
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.protocol.startsWith('http')) hosts.add(url.host);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect([...hosts]).toEqual(['127.0.0.1:4321']);
  });

  test('has no horizontal overflow at desktop width', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('renders the colophon and 404', async ({ page }) => {
    await page.goto('/colophon');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'The machinery, on the record.',
    );
    await expect(page.locator('#type')).toBeAttached();
    await expect(page.locator('#images')).toBeAttached();

    const response = await page.goto('/this-address-is-not-in-the-hoard');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The wyrm found nothing.');
  });
});
