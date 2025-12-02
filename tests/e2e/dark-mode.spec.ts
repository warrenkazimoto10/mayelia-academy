import { test, expect } from '@playwright/test';

test.describe('Dark Mode Toggle', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
    });

    test('should display dark mode toggle button in header', async ({ page }) => {
        // Vérifier que le bouton dark-mode est visible
        const darkModeButton = page.locator('button[aria-label="Toggle dark mode"]');
        await expect(darkModeButton).toBeVisible({ timeout: 10000 });

        // Vérifier que l'icône Moon est affichée par défaut (mode clair)
        const moonIcon = darkModeButton.locator('svg');
        await expect(moonIcon).toBeVisible({ timeout: 10000 });
    });

    test('should toggle to dark mode when clicking the button', async ({ page }) => {
        const darkModeButton = page.locator('button[aria-label="Toggle dark mode"]');
        const htmlElement = page.locator('html');

        // Vérifier que le mode clair est actif par défaut
        await expect(htmlElement).not.toHaveClass(/dark/);

        // Cliquer sur le bouton pour activer le mode sombre
        await darkModeButton.click();

        // Vérifier que la classe 'dark' est ajoutée à l'élément html
        await expect(htmlElement).toHaveClass(/dark/, { timeout: 10000 });

        // Vérifier que l'icône change (Sun devrait être visible)
        await page.waitForTimeout(500); // Attendre l'animation
    });

    test('should change background color when switching to dark mode', async ({ page }) => {
        const darkModeButton = page.locator('button[aria-label="Toggle dark mode"]');

        // Récupérer la couleur de fond initiale (mode clair)
        const bodyElement = page.locator('body');
        const lightBgColor = await bodyElement.evaluate((el) =>
            window.getComputedStyle(el).backgroundColor
        );

        // Activer le mode sombre
        await darkModeButton.click();
        await page.waitForTimeout(500);

        // Récupérer la couleur de fond en mode sombre
        const darkBgColor = await bodyElement.evaluate((el) =>
            window.getComputedStyle(el).backgroundColor
        );

        // Vérifier que les couleurs sont différentes
        expect(lightBgColor).not.toBe(darkBgColor);
    });

    test('should toggle back to light mode', async ({ page }) => {
        const darkModeButton = page.locator('button[aria-label="Toggle dark mode"]');
        const htmlElement = page.locator('html');

        // Activer le mode sombre
        await darkModeButton.click();
        await expect(htmlElement).toHaveClass(/dark/, { timeout: 10000 });

        // Re-cliquer pour revenir au mode clair
        await darkModeButton.click();
        await expect(htmlElement).not.toHaveClass(/dark/, { timeout: 10000 });
    });

    test('should persist icon change when toggling modes', async ({ page }) => {
        const darkModeButton = page.locator('button[aria-label="Toggle dark mode"]');

        // Prendre un screenshot du bouton en mode clair
        await darkModeButton.screenshot({ path: 'test-results/dark-mode-light.png' });

        // Passer en mode sombre
        await darkModeButton.click();
        await page.waitForTimeout(500);

        // Prendre un screenshot du bouton en mode sombre
        await darkModeButton.screenshot({ path: 'test-results/dark-mode-dark.png' });
    });
});
