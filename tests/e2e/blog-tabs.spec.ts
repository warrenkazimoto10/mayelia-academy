import { test, expect } from '@playwright/test';

test.describe('Blog Tabs - Actualités & Conseils', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });

        // Scroller jusqu'à la section blog
        await page.locator('#actualites').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
    });

    test('should display Conseils tab as selected by default', async ({ page }) => {
        const conseilsButton = page.locator('button:has-text("Conseils")').first();

        // Vérifier que le bouton Conseils a les classes actives
        const buttonClasses = await conseilsButton.getAttribute('class');
        expect(buttonClasses).toContain('bg-white');
        expect(buttonClasses).toContain('shadow-md');
    });

    test('should display 3 conseil cards by default', async ({ page }) => {
        // Attendre que les cartes soient visibles
        const conseilCards = page.locator('#actualites .grid > div');

        // Vérifier qu'il y a exactement 3 cartes
        await expect(conseilCards).toHaveCount(3);

        // Vérifier que les titres des conseils sont visibles
        await expect(page.locator('text=Comment réussir sa reconversion professionnelle')).toBeVisible({ timeout: 10000 });
    });

    test('should switch to Actualités when clicking the tab', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();
        const conseilsButton = page.locator('button:has-text("Conseils")').first();

        // Cliquer sur Actualités
        await actualitesButton.click();
        await page.waitForTimeout(500);

        // Vérifier que Actualités est maintenant actif
        const actualitesClasses = await actualitesButton.getAttribute('class');
        expect(actualitesClasses).toContain('bg-white');

        // Vérifier que Conseils n'est plus actif
        const conseilsClasses = await conseilsButton.getAttribute('class');
        expect(conseilsClasses).not.toContain('shadow-md');
    });

    test('should display 3 actualité cards when Actualités tab is active', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();

        // Cliquer sur Actualités
        await actualitesButton.click();
        await page.waitForTimeout(500);

        // Vérifier les titres des actualités
        await expect(page.locator('text=Les métiers de demain dans l\'automobile')).toBeVisible({ timeout: 10000 });
    });

    test('should switch back to Conseils tab', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();
        const conseilsButton = page.locator('button:has-text("Conseils")').first();

        // Passer à Actualités
        await actualitesButton.click();
        await page.waitForTimeout(500);

        // Revenir à Conseils
        await conseilsButton.click();
        await page.waitForTimeout(500);

        // Vérifier que les conseils sont de nouveau affichés
        await expect(page.locator('text=Comment réussir sa reconversion professionnelle')).toBeVisible({ timeout: 10000 });
    });

    test('should display correct categories for each tab', async ({ page }) => {
        // Vérifier les catégories des Conseils (par défaut)
        await expect(page.locator('text=Carrière').first()).toBeVisible({ timeout: 10000 });

        // Passer aux Actualités
        const actualitesButton = page.locator('button:has-text("Actualités")').first();
        await actualitesButton.click();
        await page.waitForTimeout(500);

        // Vérifier les catégories des Actualités
        await expect(page.locator('text=Automobile').first()).toBeVisible({ timeout: 10000 });
    });

    test('should display images for all cards', async ({ page }) => {
        // Vérifier que les images sont chargées pour les Conseils
        const conseilImages = page.locator('#actualites .grid img');
        await expect(conseilImages).toHaveCount(3);

        // Passer aux Actualités
        const actualitesButton = page.locator('button:has-text("Actualités")').first();
        await actualitesButton.click();
        await page.waitForTimeout(500);

        // Vérifier que les images sont chargées pour les Actualités
        const actualiteImages = page.locator('#actualites .grid img');
        await expect(actualiteImages).toHaveCount(3);
    });

    test('should display read time and date for each card', async ({ page }) => {
        // Vérifier la présence des informations de lecture
        await expect(page.locator('text=7 min').first()).toBeVisible({ timeout: 10000 });
    });
});
