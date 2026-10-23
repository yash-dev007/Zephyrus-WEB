import { test, expect } from '@playwright/test';

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('traps focus, closes on Escape, and restores the trigger', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await expect(trigger).toHaveAttribute('data-ready', 'true');
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await expect(dialog).toBeVisible();
    const close = page.getByRole('button', { name: 'Close menu' });
    await expect(close).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(dialog.locator('a[href="https://github.com/yash-dev007/Zephyrus"]')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('navigates to a section and closes the sheet', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await expect(trigger).toHaveAttribute('data-ready', 'true');
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Site menu' });
    await expect(dialog).toBeVisible();

    await dialog.getByRole('link', { name: 'Architecture', exact: true }).click();
    await expect(page).toHaveURL(/#spine$/);
    await expect(dialog).toBeHidden();
    await expect(page.locator('#spine')).toBeFocused();
  });

  test('has no horizontal overflow at 390px', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
