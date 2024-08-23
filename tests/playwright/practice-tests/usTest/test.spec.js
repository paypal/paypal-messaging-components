import { test } from './setup';

test.describe('US SDK Modals Accessibility Tests', () => {
    test('US Modal PRODUCT LIST', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        // Use navigatePage fixture to go to the appropriate URL
        await navigatePage('DEV_US_MULTI', 200, '');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal SHORT TERM NQ', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_MULTI', 29, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    // Add more test cases as needed
});
