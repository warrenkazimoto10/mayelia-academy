import { test, expect } from '@playwright/test';

test.describe('FAQ Modal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
    });

    test('should not display FAQ button at top of page', async ({ page }) => {
        // Le bouton FAQ ne devrait pas être visible en haut de page
        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();

        // Vérifier que le bouton n'est pas visible ou a une opacité 0
        const isVisible = await faqButton.isVisible().catch(() => false);
        if (isVisible) {
            const opacity = await faqButton.evaluate((el) =>
                window.getComputedStyle(el).opacity
            );
            expect(parseFloat(opacity)).toBeLessThan(1);
        }
    });

    test('should display FAQ button when scrolling to Contact section', async ({ page }) => {
        // Scroller jusqu'à la section Contact
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // Attendre l'animation

        // Chercher le bouton FAQ flottant
        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();

        // Vérifier que le bouton est visible
        await expect(faqButton).toBeVisible({ timeout: 10000 });
    });

    test('should open FAQ modal when clicking the button', async ({ page }) => {
        // Scroller jusqu'à Contact
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // Trouver et cliquer sur le bouton FAQ
        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();
        await faqButton.click();
        await page.waitForTimeout(500);

        // Vérifier que la modale est ouverte
        const modal = page.locator('[role="dialog"]').or(
            page.locator('text=Questions Fréquentes').locator('..')
        );
        await expect(modal).toBeVisible({ timeout: 10000 });
    });

    test('should display FAQ questions in the modal', async ({ page }) => {
        // Scroller et ouvrir la modale
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();
        await faqButton.click();
        await page.waitForTimeout(500);

        // Vérifier la présence des questions FAQ
        await expect(page.locator('text=Comment s\'inscrire à une formation ?')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('text=Les formations sont-elles certifiantes ?')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('text=Proposez-vous des facilités de paiement ?')).toBeVisible({ timeout: 10000 });
    });

    test('should expand FAQ accordion items', async ({ page }) => {
        // Ouvrir la modale FAQ
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();
        await faqButton.click();
        await page.waitForTimeout(500);

        // Cliquer sur une question pour l'ouvrir
        const firstQuestion = page.locator('text=Comment s\'inscrire à une formation ?');
        await firstQuestion.click();
        await page.waitForTimeout(500);

        // Vérifier que la réponse est visible
        await expect(page.locator('text=Vous pouvez vous inscrire directement en ligne')).toBeVisible({ timeout: 10000 });
    });

    test('should close FAQ modal when clicking close button', async ({ page }) => {
        // Ouvrir la modale
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();
        await faqButton.click();
        await page.waitForTimeout(500);

        // Cliquer sur le bouton Fermer
        const closeButton = page.locator('button:has-text("Fermer")');
        await closeButton.click();
        await page.waitForTimeout(500);

        // Vérifier que la modale est fermée
        const modal = page.locator('[role="dialog"]');
        await expect(modal).not.toBeVisible({ timeout: 10000 });
    });

    test('should close FAQ modal when clicking outside', async ({ page }) => {
        // Ouvrir la modale
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();
        await faqButton.click();
        await page.waitForTimeout(500);

        // Cliquer en dehors de la modale (sur le backdrop)
        await page.mouse.click(50, 50);
        await page.waitForTimeout(500);

        // Vérifier que la modale est fermée
        const modal = page.locator('[role="dialog"]');
        const isVisible = await modal.isVisible().catch(() => false);
        expect(isVisible).toBeFalsy();
    });

    test('should have bounce animation on FAQ button', async ({ page }) => {
        // Scroller jusqu'à Contact
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        const faqButton = page.locator('button.rounded-full.h-16.w-16').first();

        // Vérifier que le bouton a une classe d'animation
        const buttonClasses = await faqButton.getAttribute('class');
        expect(buttonClasses).toContain('animate');
    });
});
