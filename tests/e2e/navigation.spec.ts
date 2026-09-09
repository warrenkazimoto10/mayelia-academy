import { test, expect, type Page } from '@playwright/test';

/** Évite tout `<header>` injecté par des outils de dev (ex. overlays avec d'autres classes). */
function siteHeader(page: Page) {
    return page.locator('header.fixed.top-0.z-50');
}

test.describe('One-Page Navigation', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await siteHeader(page).waitFor({ state: 'visible' });
        await siteHeader(page)
            .getByRole('link', { name: 'Accueil', exact: true })
            .first()
            .waitFor({ state: 'visible' });
    });

    test('should navigate to Hero section when clicking Accueil', async ({ page }) => {
        const accueilLink = siteHeader(page).getByRole('link', { name: 'Accueil', exact: true }).first();
        await accueilLink.click();

        await page.waitForTimeout(1500);

        const heroSection = page.locator('#hero');
        await expect(heroSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to About section when clicking À propos', async ({ page }) => {
        const aproposLink = siteHeader(page).getByRole('link', { name: 'À propos', exact: true }).first();
        await aproposLink.click();

        await page.waitForTimeout(1500);

        const aproposSection = page.locator('#apropos');
        await expect(aproposSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to Formations section when clicking Formations', async ({ page }) => {
        const formationsLink = siteHeader(page).getByRole('link', { name: 'Formations', exact: true }).first();
        await formationsLink.click();

        await page.waitForTimeout(1500);

        const formationsSection = page.locator('#formations');
        await expect(formationsSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to Actualités section when clicking Actualités', async ({ page }) => {
        const actualitesLink = siteHeader(page).getByRole('link', { name: 'Actualités', exact: true }).first();
        await actualitesLink.click();

        await page.waitForTimeout(1500);

        const actualitesSection = page.locator('#actualites');
        await expect(actualitesSection).toBeInViewport({ timeout: 10000 });
    });

    test('should navigate to Contact section when clicking Contact', async ({ page }) => {
        const contactLink = siteHeader(page).getByRole('link', { name: 'Contact', exact: true }).first();
        await contactLink.click();

        await page.waitForTimeout(1500);

        const contactSection = page.locator('#contact');
        await expect(contactSection).toBeInViewport({ timeout: 10000 });
    });

    test('should keep header sticky when scrolling', async ({ page }) => {
        const header = siteHeader(page);

        await expect(header).toBeVisible();

        await page.evaluate(() => window.scrollTo(0, 1000));
        await page.waitForTimeout(500);

        await expect(header).toBeVisible();

        const headerClasses = await header.getAttribute('class');
        expect(headerClasses).toContain('fixed');
    });

    test('should change header style when scrolling', async ({ page }) => {
        const header = siteHeader(page);

        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(200);

        await expect(header).toHaveClass(/py-5/);

        await page.evaluate(() => window.scrollTo(0, 80));
        await page.waitForTimeout(600);

        await expect(header).toHaveClass(/py-3/);
    });
});
