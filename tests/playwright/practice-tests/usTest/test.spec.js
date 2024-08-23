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

    test('US Modal SHORT TERM Q', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_MULTI', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal LONG TERM NQ', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_MULTI', 20001, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal LONG TERM Q', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_MULTI', 1501, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal NO INTEREST', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_MULTI', 200, 'PAYPAL_CREDIT_NO_INTEREST');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    // TODO: check inputs for checkout and pl2go
    test('US Modal SHORT TERM CHECKOUT', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_SHORT_TERM_CHECKOUT', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal LONG TERM CHECKOUT', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_LONG_TERM_CHECKOUT', 200, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal SHORT TERM PL2GO', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_SHORT_TERM_PL2GO', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal LONG TERM PL2GO', async ({ navigatePage, loadModal, runAxeCoreScan }) => {
        await navigatePage('DEV_US_LONG_TERM_PL2GO', 200, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
