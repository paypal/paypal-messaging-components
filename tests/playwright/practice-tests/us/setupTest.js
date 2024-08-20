import { test as base, expect } from '@playwright/test';

const test = base.extend({
    sdkMessage: async ({ browser }, use) => {
        const message = async (options = {}) => {
            // Default options
            const { amount = 100, account = 'DEV_US_MULTI', offer = 'PAY_LATER_SHORT_TERM' } = options;
            // Create a new browser context and page
            const context = await browser.newContext();
            const page = await context.newPage();

            const url = `/snapshot/v2/sdk.html?account=${account}&amount=${amount}&offer=${offer}&env=local`;
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            return { page, context };
        };
        await use(message);
    },
    sdkModal: async ({ browser }, use) => {
        const modal = async (options = {}) => {
            // Default options
            const { amount = 100, account = 'DEV_US_MULTI', offer = 'PAY_LATER_SHORT_TERM' } = options;
            // Create a new browser context and page
            const context = await browser.newContext();
            const page = await context.newPage();
            
            await page.goto(`/snapshot/v2/standalone-modal.html?account=${account}&amount=${amount}&offer=${offer}`);
            page.waitForLoadState('domcontentloaded');
            return { page, context };
        };
        await use(modal);
    }
});
export { test, expect };
