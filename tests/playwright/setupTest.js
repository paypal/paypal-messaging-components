import { test as base, expect } from '@playwright/test';

const test = base.extend({
    message: async ({ page }, use) => {
        const webpageMessage = async (options = {}) => {
            // Default options
            const { amount = 100, account = 'DEV_US_MULTI', offer = 'PAY_LATER_SHORT_TERM' } = options;

            const url = `https://localhost.paypal.com:8080/snapshot/v2/sdk.html?account=${account}&amount=${amount}&offer=${offer}&env=local`;
            await page.goto(url);
            page.waitForLoadState('domcontentloaded');
            return page;
        };
        await use(webpageMessage);
    }
    // modal: // TODO
});
export { test, expect };
