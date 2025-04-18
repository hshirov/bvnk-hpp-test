import { test, expect } from '@playwright/test';

test('shows error page on invalid uuid', async ({ page }) => {
  const invalidUUID = 'invalid-uuid';
  await page.goto(`/payin/${invalidUUID}`);

  await expect(page.getByText('Something went wrong')).toBeVisible();
});
