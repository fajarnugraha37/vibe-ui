import { test, expect } from '@playwright/test';

const base = process.env.PW_BASE_URL || 'http://localhost:4321';

test.describe('Overlay focus management (Dialog + Drawer)', () => {
  test('dialog traps focus, Escape closes, focus returns', async ({ page }) => {
    await page.goto(base + '/ui/stories/dialog');
    const open = page.getByRole('button', { name: /open dialog/i });
    await open.waitFor({ state: 'attached' });
    // wait until the client island attaches to the trigger
    await page.waitForSelector('.dialog-trigger[data-island-mounted="1"]', { timeout: 5000 });
    await open.click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor({ state: 'visible' });
    await expect(dialog).toBeVisible();
    // Tab inside dialog should keep focus within
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    // focus should return to trigger
    await expect(open).toBeFocused();
  });

  test('drawer traps focus, Escape closes, focus returns', async ({ page }) => {
    await page.goto(base + '/ui/stories/drawer');
    const openLeft = page.getByRole('button', { name: /open left/i });
    await openLeft.waitFor({ state: 'attached' });
    // wait until the client island attaches to the trigger
    await page.waitForSelector('.drawer-trigger[data-island-mounted="1"]', { timeout: 5000 });
    await openLeft.click();
    const drawer = page.getByRole('dialog');
    await drawer.waitFor({ state: 'visible' });
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(drawer).toBeHidden();
    await expect(openLeft).toBeFocused();
  });
});
