import { test, expect } from '@playwright/test';

test('stories page loads', async ({ page }) => {
  await page.goto('/ui/stories');
  await expect(page).toHaveURL(/ui\/stories/);
  await expect(page.locator('body')).toBeVisible();
});
