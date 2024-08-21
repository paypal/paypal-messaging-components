// modalsFixture.js
import { test as base, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Function to generate URL based on parameters
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

// Extend Playwright base test with custom fixtures
export const test = base.extend({
    // Fixture for navigating to the page
    // navigatePage: async ({ page }, use) => {
    //     const navigate = async ({ account, amount, offer }) => {
    //         const url = generateUrl({ account, amount, offer });
    //         await page.goto(url);
    //         await page.waitForLoadState('domcontentloaded');
    //     };
    //     await use(navigate);
    // },

    // Fixture for loading the modal
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

    // Fixture for running Axe accessibility checks
    runAxeCoreScan: async ({ page }, use) => {
        const runAxeCoreScan = async modalIframe => {
            // TODO: US non qualifying & qualifying long term 'best-practice' tag error
            const results = await new AxeBuilder({ page })
                .include(modalIframe)
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();
            expect(results.violations).toEqual([]);
        };
        await use(runAxeCoreScan);
    }
});
