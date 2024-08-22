import { test, navigatePage } from './modals_fixture';

test.describe('Modals Accessibility Tests', () => {
    test('US Modal product list', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_US_MULTI', 200, '');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal short term non qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_US_MULTI', 29, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal short term qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_US_MULTI', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal long term non qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_US_MULTI', 20001, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('US Modal long term qualifying', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_US_MULTI', 1501, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('US Modal no interest', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_US_MULTI', 200, 'PAYPAL_CREDIT_NO_INTEREST');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    // TODO: check inputs for checkout and pl2go
    // test('US Modal short term checkout', async ({ loadModal, runAxeCoreScan }) => {
    //     await navigatePage({  'DEV_US_SHORT_TERM_CHECKOUT',  200,  'PAY_LATER_SHORT_TERM' });
    //     const modalIframe = await loadModal();
    //     await runAxeCoreScan(modalIframe);
    // });
    // test('US Modal long term checkout', async ({ loadModal, runAxeCoreScan }) => {
    //     await navigatePage({  'DEV_US_LONG_TERM_CHECKOUT',  200,  'PAY_LATER_LONG_TERM' });
    //     const modalIframe = await loadModal();
    //     await runAxeCoreScan(modalIframe);
    // });
    // test('US Modal short term pl2go', async ({ loadModal, runAxeCoreScan }) => {
    //     await navigatePage({  'DEV_US_SHORT_TERM_PL2GO',  200,  'PAY_LATER_SHORT_TERM' });
    //     const modalIframe = await loadModal();
    //     await runAxeCoreScan(modalIframe);
    // });
    // test('US Modal long term pl2go', async ({ loadModal, runAxeCoreScan }) => {
    //     await navigatePage({  'DEV_US_LONG_TERM_PL2GO',  200,  'PAY_LATER_LONG_TERM' });
    //     const modalIframe = await loadModal();
    //     await runAxeCoreScan(modalIframe);
    // });
});
