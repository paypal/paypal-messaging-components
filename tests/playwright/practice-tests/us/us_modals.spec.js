import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from './setupTest';

// US test cases, TODO: grab it from the config
const testCases = [
    {},
    { account: 'DEV_US_MULTI' },
    { amount: 29, account: 'DEV_US_MULTI', offer: 'PAY_LATER_SHORT_TERM' },
    { amount: 200, account: 'DEV_US_MULTI', offer: 'PAY_LATER_SHORT_TERM' },
    { amount: 20001, account: 'DEV_US_MULTI', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 1501, account: 'DEV_US_MULTI', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 200, account: 'DEV_US_MULTI', offer: 'PAYPAL_CREDIT_NO_INTEREST' },

    { amount: 200, account: 'DEV_US_SHORT_TERM_CHECKOUT' },
    { amount: 200, account: 'DEV_US_SHORT_TERM_PL2GO' },
    { amount: 200, account: 'DEV_US_LONG_TERM_CHECKOUT', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 200, account: 'DEV_US_LONG_TERM_PL2GO', offer: 'PAY_LATER_LONG_TERM' }
];

test.describe('sdk', () => {
    test('message should not have any automatically detectable accessibility issues', async ({ sdkModal }) => {
        for (const { account, amount, offer } of testCases) {
            await test.step(`accessibility test for ${account}`, async () => {
                // Navigate to page
                const page = await sdkModal({ amount, account, offer });

                const messageButton = await page.$('button');
                await messageButton.click();

                // Get the iframe that contains the modal
                const modalIframe = await page.$('iframe[name*="__zoid__paypal_credit_modal"]');
                const modalFrame = await modalIframe.contentFrame();

                // Wait for the modal to become visible
                await modalFrame.locator('.content__wrapper').waitFor({
                    state: 'visible'
                });

                // TODO: 'best-practice' and 'wcag2aa' are resulting in errors, investigate
                const results = await new AxeBuilder({ page })
                    .include(modalIframe)
                    .withTags(['wcag2a', 'wcag21a', 'wcag21aa'])
                    .analyze();

                expect(results.violations).toEqual([]);
            });
        }
    });
});
