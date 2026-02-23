import { test, expect } from '@playwright/test';

const base = process.env.PW_BASE_URL || 'http://localhost:4321';

test.describe('Forms validation timing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(base + '/ui/stories/forms-validation');
  });

  test('blur shows error', async ({ page }) => {
    const input = page.locator('#name');
    await input.focus();
    await page.click('body'); // blur
    await expect(page.locator('#name-error')).toBeVisible();
  });

  test('submit blocks when invalid', async ({ page }) => {
    await page.click('#submit');
    await expect(page.locator('#submitted')).toHaveCount(0);
    await expect(page.locator('#name-error')).toBeVisible();
  });

  test('loading disables submission and then shows submitted', async ({ page }) => {
    await page.fill('#name', 'Jane Doe');
    await page.click('#submit');
    const submitBtn = page.locator('#submit');
    await expect(submitBtn).toBeDisabled();
    await expect(submitBtn).toHaveText(/Loading/);
    await page.waitForSelector('#submitted', { timeout: 2000 });
    await expect(page.locator('#submitted')).toBeVisible();
  });
});
