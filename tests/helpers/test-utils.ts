import { Page } from '@playwright/test';

/**
 * Attend la fin d'un scroll animé (smooth scroll)
 */
export async function waitForSmoothScroll(page: Page, timeout = 1000) {
    await page.waitForTimeout(timeout);
}

/**
 * Récupère la couleur calculée d'un élément
 */
export async function getComputedColor(page: Page, selector: string, property: 'backgroundColor' | 'color' = 'backgroundColor'): Promise<string> {
    const element = page.locator(selector);
    return await element.evaluate((el, prop) => {
        return window.getComputedStyle(el)[prop as any];
    }, property);
}

/**
 * Prend un screenshot avec un nom personnalisé
 */
export async function takeScreenshot(page: Page, name: string) {
    await page.screenshot({
        path: `test-results/${name}.png`,
        fullPage: true
    });
}

/**
 * Vérification basique d'accessibilité
 */
export async function checkAccessibility(page: Page) {
    // Vérifier que toutes les images ont un attribut alt
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    if (imagesWithoutAlt > 0) {
        console.warn(`⚠️ ${imagesWithoutAlt} images sans attribut alt trouvées`);
    }

    // Vérifier que les boutons ont un label accessible
    const buttonsWithoutLabel = await page.locator('button:not([aria-label]):not(:has-text(*))').count();
    if (buttonsWithoutLabel > 0) {
        console.warn(`⚠️ ${buttonsWithoutLabel} boutons sans label accessible trouvés`);
    }

    return {
        imagesWithoutAlt,
        buttonsWithoutLabel,
        passed: imagesWithoutAlt === 0 && buttonsWithoutLabel === 0
    };
}

/**
 * Scroller vers une section avec smooth scroll
 */
export async function scrollToSection(page: Page, sectionId: string) {
    await page.locator(sectionId).scrollIntoViewIfNeeded();
    await waitForSmoothScroll(page, 800);
}

/**
 * Vérifier qu'un élément est dans le viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    const box = await element.boundingBox();

    if (!box) return false;

    const viewport = page.viewportSize();
    if (!viewport) return false;

    return (
        box.y >= 0 &&
        box.y + box.height <= viewport.height &&
        box.x >= 0 &&
        box.x + box.width <= viewport.width
    );
}

/**
 * Attendre qu'une animation CSS se termine
 */
export async function waitForAnimation(page: Page, selector: string, timeout = 2000) {
    const element = page.locator(selector);
    await element.evaluate((el, timeoutMs) => {
        return new Promise((resolve) => {
            const onAnimationEnd = () => {
                el.removeEventListener('animationend', onAnimationEnd);
                resolve(true);
            };

            el.addEventListener('animationend', onAnimationEnd);

            // Timeout de sécurité
            setTimeout(() => {
                el.removeEventListener('animationend', onAnimationEnd);
                resolve(false);
            }, timeoutMs);
        });
    }, timeout);
}

/**
 * Vérifier le contraste de couleur (basique)
 */
export async function checkColorContrast(page: Page, selector: string): Promise<number> {
    const element = page.locator(selector);

    const { textColor, bgColor } = await element.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
            textColor: styles.color,
            bgColor: styles.backgroundColor
        };
    });

    // Conversion RGB en luminance (formule simplifiée)
    const getLuminance = (rgb: string) => {
        const match = rgb.match(/\d+/g);
        if (!match) return 0;

        const [r, g, b] = match.map(Number);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const textLuminance = getLuminance(textColor);
    const bgLuminance = getLuminance(bgColor);

    const lighter = Math.max(textLuminance, bgLuminance);
    const darker = Math.min(textLuminance, bgLuminance);

    return (lighter + 0.05) / (darker + 0.05);
}
