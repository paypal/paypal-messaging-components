import { test, expect, chromium } from '@playwright/test';

test('slow motion and video recording demo', async () => {
    const browser = await chromium.launch({
        slowMo: 500,
        headless: false
    });
    const context = await browser.newContext({
        recordVideo: {
            // creates video folder of test, file recording there
            dir: 'videos/',
            size: { width: 800, height: 600 }
        }
    });
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

    await context.close();
});
