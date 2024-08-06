import { test, expect } from '@playwright/test';
test.describe('all my tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
    });
    test.afterAll(async ({ page }) => {
        await page.close();
    });
    test('homepage', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.getByText('Sauce Labs Bolt T-ShirtGet').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="item-5-title-link"]').click();
        await page.locator('[data-test="add-to-cart"]').click();
    });
    test('logout', async ({ page }) => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
    });
});
