import { test, expect } from '@playwright/test';

test.describe('Quick Dark Mode Test', () => {
    test('should open the site and find dark mode button', async ({ page }) => {
        // Aller directement sur localhost:8080
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded', timeout: 10000 });

        // Attendre que le header soit visible
        await page.waitForSelector('header', { timeout: 5000 });

        // Chercher le bouton dark-mode
        const darkModeButton = page.locator('button[aria-label="Toggle dark mode"]');

        // Vérifier qu'il est visible
        await expect(darkModeButton).toBeVisible({ timeout: 5000 });

        console.log('✅ Bouton dark-mode trouvé !');

        // Cliquer dessus
        await darkModeButton.click();

        // Attendre un peu
        await page.waitForTimeout(500);

        // Vérifier que la classe dark est ajoutée
        const htmlElement = page.locator('html');
        const hasClass = await htmlElement.evaluate((el) => el.classList.contains('dark'));

        console.log('✅ Mode sombre activé :', hasClass);

        // Prendre un screenshot
        await page.screenshot({ path: 'test-results/dark-mode-activated.png', fullPage: true });

        expect(hasClass).toBe(true);
    });
});
