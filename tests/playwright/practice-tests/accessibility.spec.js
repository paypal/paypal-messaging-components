import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('smart', () => {
    test('message should not have any automatically detectable accessibility issues', async ({ page }) => {
        // Navigate to page
        await page.goto('/standalone.html');
        page.waitForLoadState('domcontentloaded');

        const iframe = await page.$('iframe[name*="__zoid__paypal_message__"]');
        const frame = await iframe.contentFrame();

        const messageButton = await frame.$('button');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .include(messageButton)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
    });
    test('modal should not have any automatically detectable accessibility issues', async ({ page }) => {
        // Navigate to page
        await page.goto('/standalone.html');
        page.waitForLoadState('domcontentloaded');

        const iframe = await page.$('iframe[name*="__zoid__paypal_message__"]');
        const frame = await iframe.contentFrame();

        const messageButton = await frame.$('button');
        await messageButton.click();

        const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal__"]');
        const modalFrame = await modalIframe.contentFrame();

        await modalFrame.locator('.content__wrapper').waitFor({
            state: 'visible'
        });

        const modal = await modalFrame.$('.content__wrapper');
        const accessibilityScanResults = await new AxeBuilder({ page })
            .include(messageButton, modal, modalFrame, frame)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
            .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
