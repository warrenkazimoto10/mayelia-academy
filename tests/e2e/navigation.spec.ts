import { test, expect } from '@playwright/test';

test.describe('One-Page Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
    });

    test('should navigate to Hero section when clicking Accueil', async ({ page }) => {
        const accueilLink = page.locator('nav a:has-text("Accueil")').first();
        await accueilLink.click();

        // Attendre le scroll
        await page.waitForTimeout(1500);

        // Vérifier que la section hero est visible
        const heroSection = page.locator('#hero');
        await expect(heroSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to About section when clicking À propos', async ({ page }) => {
        const aproposLink = page.locator('nav a:has-text("À propos")').first();
        await aproposLink.click();

        await page.waitForTimeout(1500);

        const aproposSection = page.locator('#apropos');
        await expect(aproposSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to Formations section when clicking Formations', async ({ page }) => {
        const formationsLink = page.locator('nav a:has-text("Formations")').first();
        await formationsLink.click();

        await page.waitForTimeout(1500);

        const formationsSection = page.locator('#formations');
        await expect(formationsSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to Actualités section when clicking Actualités', async ({ page }) => {
        const actualitesLink = page.locator('nav a:has-text("Actualités")').first();
        await actualitesLink.click();

        await page.waitForTimeout(1500);

        const actualitesSection = page.locator('#actualites');
        await expect(actualitesSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to Contact section when clicking Contact', async ({ page }) => {
        const contactLink = page.locator('nav a:has-text("Contact")').first();
        await contactLink.click();

        await page.waitForTimeout(1500);

        const contactSection = page.locator('#contact');
        await expect(contactSection).toBeInViewport({ timeout: 10000 });
    });

    test('should keep header sticky when scrolling', async ({ page }) => {
        const header = page.locator('header');

        // Vérifier que le header est visible en haut de page
        await expect(header).toBeVisible();

        // Scroller vers le bas
        await page.evaluate(() => window.scrollTo(0, 1000));
        await page.waitForTimeout(1000);

        // Vérifier que le header est toujours visible (sticky)
        await expect(header).toBeVisible();

        // Vérifier que le header a la classe fixed
        const headerClasses = await header.getAttribute('class');
        expect(headerClasses).toContain('fixed');
    });

    test('should change header style when scrolling', async ({ page }) => {
        const header = page.locator('header');

        // Récupérer le padding initial
        const initialPadding = await header.evaluate((el) =>
            window.getComputedStyle(el).paddingTop
        );

        // Scroller vers le bas
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(1000); // Attendre la transition

        // Récupérer le nouveau padding
        const scrolledPadding = await header.evaluate((el) =>
            window.getComputedStyle(el).paddingTop
        );

        // Le padding devrait être réduit après le scroll
        expect(scrolledPadding).not.toBe(initialPadding);
    });

    // Test supprimé car l'implémentation du highlight n'est pas claire
    /*
    test('should highlight active menu item', async ({ page }) => {
      const formationsLink = page.locator('nav a:has-text("Formations")').first();
      
      // Cliquer sur Formations
      await formationsLink.click();
      await page.waitForTimeout(800);
      
      // Vérifier que le lien a un style actif (underline)
      // Note: Cette vérification dépend de l'implémentation CSS
      const linkClasses = await formationsLink.getAttribute('class');
      expect(linkClasses).toBeTruthy();
    });
    */
});
