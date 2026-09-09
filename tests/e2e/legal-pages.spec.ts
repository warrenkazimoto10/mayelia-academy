import { test, expect } from '@playwright/test';

test.describe('Pages légales', () => {
  test('liens du pied de page ouvrent les bonnes routes', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('contentinfo').getByRole('link', { name: 'Mentions légales' }).click();
    await expect(page).toHaveURL(/\/mentions-legales$/);
    await expect(page.getByRole('heading', { name: 'Mentions légales' })).toBeVisible();

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('contentinfo').getByRole('link', { name: 'Politique de confidentialité' }).click();
    await expect(page).toHaveURL(/\/politique-de-confidentialite$/);
    await expect(page.getByRole('heading', { name: 'Politique de confidentialité' })).toBeVisible();

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('contentinfo').getByRole('link', { name: 'CGU' }).click();
    await expect(page).toHaveURL(/\/cgu$/);
    await expect(page.getByRole('heading', { name: /Conditions générales/i })).toBeVisible();
  });
});
