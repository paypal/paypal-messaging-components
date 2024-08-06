import { test, expect } from '@playwright/test';

test('selectors demo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // using any object property
    await page.click('id=user-name');
    await page.locator('id=user-name').fill('Edision');
    await page.locator('[id=user-name]').fill('Edn');

    // using css selector
    await page.locator('#login-button').click();
    await page.pause();

    //using xpath
    await page.locator('xpath=//input[@id="user-name"]').fill('Faraday');
    await page.locator('//input[@id="user-name"]').fill('ramanujan');

    // using text
    await page.locator('text=LOGIN').click();
    await page.locator('input:has-text("LOGIN")').click();
});
