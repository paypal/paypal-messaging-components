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
    navigatePage: async ({ page }, use) => {
        const navigate = async ({ account, amount, offer }) => {
            const url = generateUrl({ account, amount, offer });

            try {
                const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
                if (response && response.ok()) {
                    console.log('all good');
                } else {
                    throw new Error('Failed to lead');
                }
            } catch (error) {
                console.error('Naviagation failed');
            }
            await page.waitForLoadState('domcontentloaded');
        };
        await use(navigate);
    },

    // Fixture for loading the modal
    loadModal: async ({ page }, use) => {
        const loadModal = async () => {
            const messageButton = await page.waitForSelector('button', { state: 'visible', timeout: 300000 });
            if (!messageButton) {
                throw new Error('Button not found');
            }
            await messageButton.click();

            const modalIframe = await page.waitForSelector('iframe[name*="__zoid__paypal_credit_modal"]', {
                state: 'attached',
                timeout: 30000
            });
            const modalFrame = await modalIframe.contentFrame();
            await modalFrame.locator('.content__wrapper').waitFor({
                state: 'visible',
                timeout: 30000
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
