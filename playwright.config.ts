import { defineConfig, devices } from '@playwright/test';

/** Port dédié aux e2e pour éviter `reuseExistingServer` sur un autre service déjà lié à :8080. */
const E2E_PORT = Number(process.env.E2E_PORT || 9323);
const E2E_ORIGIN = `http://127.0.0.1:${E2E_PORT}`;

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    /** Le serveur Vite dev encaisse mal une dizaine de navigateurs en parallèle (timeouts `goto`). */
    workers: process.env.CI ? 1 : 3,
    reporter: 'html',

    webServer: {
        command: `npx vite --host 127.0.0.1 --port ${E2E_PORT} --strictPort`,
        url: E2E_ORIGIN,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
    },

    use: {
        baseURL: E2E_ORIGIN,
        navigationTimeout: 90_000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
