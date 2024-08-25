import { test } from '../../../pages/modals_fixture';

// US test cases, TODO: grab it from the config
const testCases = [
    {},
    { amount: 100, account: 'DEV_US_SHORT_TERM' },
    { amount: 200, account: 'DEV_US_SHORT_TERM_CHECKOUT' },
    { amount: 200, account: 'DEV_US_SHORT_TERM_PL2GO' },
    { amount: 200, account: 'DEV_US_LONG_TERM', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 200, account: 'DEV_US_LONG_TERM_CHECKOUT', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 200, account: 'DEV_US_LONG_TERM_PL2GO', offer: 'PAY_LATER_LONG_TERM' },
    { amount: 100, account: 'DEV_US_NO_INTEREST', offer: 'NI' }
];
test.describe('sdk', () => {
    test.setTimeout(120000); // Set a custom timeout of 2 minutes for this test

    test('message should not have any automatically detectable accessibility issues', async ({
        page,
        navigateUrl,
        runAxeCoreScan
    }) => {
        await Promise.all(
            testCases.map(async ({ account, amount, offer }) => {
                await test.step(`accessibility test for ${account || 'default'}`, async () => {
                    // Navigate to page
                    await navigateUrl({ amount, account, offer });

                    const zoidIFrame = await page.waitForSelector('iframe[name*="__zoid__paypal_message__"]');
                    const messageIframe = await zoidIFrame.contentFrame();

                    const button = await messageIframe.$('button');
                    await runAxeCoreScan(button);
                });
            })
        );
    });
});
