import { test, expect } from '@playwright/test';

test('shows 404 page on invalid uuid', async ({ page }) => {
  const invalidUUID = 'invalid-uuid';
  await page.goto(`/payin/${invalidUUID}`);

  await expect(page.getByText('404')).toBeVisible();
});
