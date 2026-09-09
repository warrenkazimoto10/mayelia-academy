import { test, expect } from '@playwright/test';

test.describe('FAQ Modal', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('should not display FAQ button at top of page', async ({ page }) => {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);

        const faqFabWrap = page.locator('div.fixed.bottom-8.right-8.z-50').filter({
            has: page.getByRole('button', { name: 'Ouvrir la FAQ' }),
        });
        await expect(faqFabWrap).toHaveClass(/opacity-0/);
    });

    test('should display FAQ button when scrolling to Contact section', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        const faqTrigger = page.getByRole('button', { name: 'Ouvrir la FAQ' });
        await expect(faqTrigger).toBeVisible({ timeout: 10000 });
    });

    test('should open FAQ modal when clicking the button', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        await page.getByRole('button', { name: 'Ouvrir la FAQ' }).click();
        await page.waitForTimeout(300);

        await expect(page.getByRole('dialog', { name: /Questions Fréquentes/i })).toBeVisible({
            timeout: 10000,
        });
    });

    test('should display FAQ questions in the modal', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        await page.getByRole('button', { name: 'Ouvrir la FAQ' }).click();
        await page.waitForTimeout(300);

        const dialog = page.getByRole('dialog', { name: /Questions Fréquentes/i });
        await expect(
            dialog.getByRole('button', { name: 'Pourquoi choisir Mayelia Academy pour se former ?' })
        ).toBeVisible({ timeout: 10000 });
        await expect(
            dialog.getByRole('button', { name: 'Quels avantages exclusifs offrent vos formations ?' })
        ).toBeVisible();
        await expect(
            dialog.getByRole('button', { name: 'Peut-on travailler après une formation à Mayelia Academy ?' })
        ).toBeVisible();
    });

    test('should expand FAQ accordion items', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        await page.getByRole('button', { name: 'Ouvrir la FAQ' }).click();
        await page.waitForTimeout(300);

        const dialog = page.getByRole('dialog', { name: /Questions Fréquentes/i });
        await dialog.getByRole('button', { name: 'Pourquoi choisir Mayelia Academy pour se former ?' }).click();
        await page.waitForTimeout(400);

        await expect(
            dialog.getByText(
                "Mayelia Academy offre une formation pratique, professionnalisante axée sur l'employabilité"
            )
        ).toBeVisible({ timeout: 10000 });
    });

    test('should close FAQ modal when clicking close button', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        await page.getByRole('button', { name: 'Ouvrir la FAQ' }).click();
        await page.waitForTimeout(300);

        await page.getByRole('dialog', { name: /Questions Fréquentes/i }).getByRole('button', { name: 'Fermer' }).click();
        await page.waitForTimeout(400);

        await expect(page.getByRole('dialog', { name: /Questions Fréquentes/i })).not.toBeVisible({
            timeout: 10000,
        });
    });

    test('should close FAQ modal when clicking outside', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        await page.getByRole('button', { name: 'Ouvrir la FAQ' }).click();
        await page.waitForTimeout(300);

        await page.mouse.click(50, 50);
        await page.waitForTimeout(400);

        await expect(page.getByRole('dialog', { name: /Questions Fréquentes/i })).not.toBeVisible({
            timeout: 10000,
        });
    });

    test('should have bounce animation on FAQ button', async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);

        const faqButton = page.getByRole('button', { name: 'Ouvrir la FAQ' });
        const buttonClasses = await faqButton.getAttribute('class');
        expect(buttonClasses).toContain('animate');
    });
});
