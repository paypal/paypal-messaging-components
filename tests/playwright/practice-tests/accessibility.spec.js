import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('smart', () => {
    test.skip('message should not have any automatically detectable accessibility issues', async ({ page }) => {
        // Navigate to page
        await page.goto(`/standalone.html?account=DEV_US_MULTI&amount=200&offer=PAY_LATER_SHORT_TERM`);
        page.waitForLoadState('domcontentloaded');

        const zoidIFrame = await page.$('iframe[name*="__zoid__paypal_message__"]');
        const messageIframe = await zoidIFrame.contentFrame();

        const button = await messageIframe.$('button');
        // TODO: 'best-practice' and 'wcag2aa' are resulting in errors, investigate
        const results = await new AxeBuilder({ page })
            .include(button)
            .withTags(['wcag2a', 'wcag21a', 'wcag21aa'])
            .analyze();

        expect(results.violations).toEqual([]);
    });
    test.skip('modal should not have any automatically detectable accessibility issues', async ({ page }) => {
        // Navigate to page
        await page.goto(`/snapshot/v2/standalone-modal.html?account=DEV_US_MULTI&amount=59&offer=PAY_LATER_SHORT_TERM`);
        page.waitForLoadState('domcontentloaded');

        //     const messageButton = await page.$('button');
        //     await messageButton.click();

        //     const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
        //     const modalFrame = await modalIframe.contentFrame();

        //     await modalFrame.locator('.content__wrapper').waitFor({
        //         state: 'visible'
        //     });

        //     const results = await new AxeBuilder({ page })
        //         .include(modalIframe)
        //         .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        //         .analyze();
        //     expect(results.violations).toEqual([]);
    });
});
