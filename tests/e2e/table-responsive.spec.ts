import { test, expect } from '@playwright/test';

const base = process.env.PW_BASE_URL || 'http://localhost:4321';

test.describe('Table responsive degradation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(base + '/ui/stories/table');
  });

  test('density toggle changes data-density attribute', async ({ page }) => {
    const wrapper = page.locator('.demo-density');
    await expect(wrapper).toHaveAttribute('data-density', 'comfortable');
    await page.click('#density-toggle');
    await expect(wrapper).toHaveAttribute('data-density', 'dense');
    await page.click('#density-toggle');
    await expect(wrapper).toHaveAttribute('data-density', 'comfortable');
  });

  test('mobile breakpoint shows cards instead of table', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.waitForTimeout(200);
    const table = page.locator('.vibe-table').first();
    const cards = page.locator('.table-cards').first();
    await expect(table).toBeHidden();
    await expect(cards).toBeVisible();
  });
});
