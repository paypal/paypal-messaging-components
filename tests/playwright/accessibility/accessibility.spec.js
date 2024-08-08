import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('smart', () => {
    // 2
    test('modal should not have any automatically detectable accessibility issues', async ({ page }) => {
        await page.goto('/standalone.html'); // 3

        const responsee = await page.$('iframe[name*="__zoid__paypal_"]');
        const responseee = await responsee.contentFrame();

        await responseee.waitForSelector('button');
        const responsed = await responseee.$('button');

        await responsed.click();
        await responsed.waitForSelector('div');
        const modal = await responsed.$('div.modal-wrapper');

        const response = await modal.textContent();
        console.log('modal div:', response);

        const accessibilityScanResults = await new AxeBuilder({ page }).include(modal).analyze(); // 4
        expect(accessibilityScanResults.violations).toEqual([]); // 5
    });
});
