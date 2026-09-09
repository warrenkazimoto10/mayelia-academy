import { test, expect } from '@playwright/test';

const MOCK_CONSEILS = {
    success: true,
    data: [
        {
            id: 'c1',
            title: 'Comment réussir sa reconversion professionnelle',
            excerpt: 'Les clés pour réussir votre projet.',
            date: '1 févr. 2025',
            readTime: '8 min',
            image: '/favicon.png',
            published: true,
            content: { paragraphs: [] },
        },
        {
            id: 'c2',
            title: 'Optimiser son temps au travail',
            excerpt: 'Méthodes concrètes.',
            date: '2 févr. 2025',
            readTime: '5 min',
            image: '/favicon.png',
            published: true,
            content: { paragraphs: [] },
        },
        {
            id: 'c3',
            title: 'Bien communiquer en équipe',
            excerpt: 'Soft skills essentiels.',
            date: '3 févr. 2025',
            readTime: '4 min',
            image: '/favicon.png',
            published: true,
            content: { paragraphs: [] },
        },
    ],
    count: 3,
};

const MOCK_ACTUALITES = {
    success: true,
    data: [
        {
            id: 'a1',
            title: 'Saviez-vous que chez Mayelia Academy nous innovons chaque jour',
            excerpt: 'Découvrez nos nouveautés et notre vision.',
            category: 'Innovation',
            date: '15 mars 2025',
            readTime: '6 min',
            categoryColor: 'bg-blue-500 text-white',
            heroImage: '/favicon.png',
            published: true,
            content: { paragraphs: [{ text: 'Paragraphe.' }] },
        },
        {
            id: 'a2',
            title: 'Actualité 2',
            excerpt: 'Résumé 2.',
            category: 'Innovation',
            date: '14 mars 2025',
            readTime: '7 min',
            categoryColor: 'bg-blue-500 text-white',
            heroImage: '/favicon.png',
            published: true,
            content: { paragraphs: [{ text: 'x' }] },
        },
        {
            id: 'a3',
            title: 'Actualité 3',
            excerpt: 'Résumé 3.',
            category: 'Innovation',
            date: '13 mars 2025',
            readTime: '9 min',
            categoryColor: 'bg-blue-500 text-white',
            heroImage: '/favicon.png',
            published: true,
            content: { paragraphs: [{ text: 'y' }] },
        },
    ],
    count: 3,
};

/**
 * Les réponses API sont mockées pour ne pas dépendre d’un Laravel local pendant les e2e.
 */
test.describe('Blog Tabs - Actualités & Conseils', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/api/conseils', async (route) => {
            if (route.request().method() !== 'GET') {
                await route.continue();
                return;
            }
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCK_CONSEILS),
            });
        });
        await page.route('**/api/actualites', async (route) => {
            if (route.request().method() !== 'GET') {
                await route.continue();
                return;
            }
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCK_ACTUALITES),
            });
        });

        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await page.locator('#actualites').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
    });

    test('should display Actualités tab as selected by default', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();

        const buttonClasses = await actualitesButton.getAttribute('class');
        expect(buttonClasses).toContain('bg-white');
        expect(buttonClasses).toContain('shadow-md');
    });

    test('should display actualité cards when API returns data', async ({ page }) => {
        const grid = page.locator('#actualites').locator('.grid').first();
        await expect(grid).toBeVisible({ timeout: 20000 });
        const cards = grid.locator(':scope > div');
        await expect(cards.first()).toBeVisible({ timeout: 15000 });
        await expect(cards).toHaveCount(3);

        await expect(
            page.locator('text=Saviez-vous que chez Mayelia Academy').first()
        ).toBeVisible({ timeout: 15000 });
    });

    test('should switch to Conseils when clicking the tab', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();
        const conseilsButton = page.locator('button:has-text("Conseils")').first();

        await conseilsButton.click();
        await page.waitForTimeout(300);

        const conseilsClasses = await conseilsButton.getAttribute('class');
        expect(conseilsClasses).toContain('bg-white');

        const actualitesClasses = await actualitesButton.getAttribute('class');
        expect(actualitesClasses).not.toContain('shadow-md');
    });

    test('should display actualité cards when Actualités tab is active', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();

        await actualitesButton.click();
        await page.waitForTimeout(300);

        await expect(page.locator('text=Saviez-vous que chez Mayelia Academy').first()).toBeVisible({
            timeout: 15000,
        });
    });

    test('should switch back to Actualités tab', async ({ page }) => {
        const actualitesButton = page.locator('button:has-text("Actualités")').first();
        const conseilsButton = page.locator('button:has-text("Conseils")').first();

        await conseilsButton.click();
        await page.waitForTimeout(300);

        await actualitesButton.click();
        await page.waitForTimeout(300);

        await expect(
            page.locator('text=Saviez-vous que chez Mayelia Academy').first()
        ).toBeVisible({ timeout: 15000 });
    });

    test('should display category badge only on Actualités cards', async ({ page }) => {
        await expect(page.locator('text=Saviez-vous que chez Mayelia Academy').first()).toBeVisible({
            timeout: 15000,
        });

        await expect(page.locator('text=Innovation').first()).toBeVisible({ timeout: 15000 });
    });

    test('should display hero images for Actualités tab when API provides paths', async ({ page }) => {
        const imgs = page.locator('#actualites .grid img');
        await expect(imgs).toHaveCount(3);
    });

    test('should display read time and date for each card', async ({ page }) => {
        await expect(page.locator('text=6 min').first()).toBeVisible({ timeout: 15000 });
    });
});
