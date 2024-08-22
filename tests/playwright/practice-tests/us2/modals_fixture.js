import { test as base, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export const generateUrl = ({ account, amount, offer }) => {
    let url = `/snapshot/v2/standalone-modal.html?account=${account}`;
    if (amount !== undefined) {
        url += `&amount=${amount}`;
    }
    if (offer !== undefined && offer !== '') {
        url += `&offer=${offer}`;
    }
    return url;
};

export const test = base.extend({
    loadModal: async ({ page }, use) => {
        const loadModal = async () => {
            const messageButton = await page.$('button');
            await messageButton.click();
            const modalIframe = await page.waitForSelector('iframe[name*="__zoid__paypal_credit_modal"]');
            const modalFrame = await modalIframe.contentFrame();
            await modalFrame.locator('.content__wrapper').waitFor({
                state: 'visible'
            });
            return modalIframe;
        };
        await use(loadModal);
    },

    runAxeCoreScan: async ({ page }, use) => {
        const runAxeCoreScan = async modalIframe => {
            const results = await new AxeBuilder({ page })
                .include(modalIframe)
                .withTags(['wcag2a', 'wcag21a', 'wcag21aa'])
                .analyze();
            expect(results.violations).toEqual([]);
        };
        await use(runAxeCoreScan);
    }
});
