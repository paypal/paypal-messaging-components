import { test, navigatePage } from '../setup';

test.describe('DE SDK Modals Accessibility Tests', () => {
    test('DE Modal PRODUCT LIST', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_DE_MULTI', 200, '');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('DE Modal PAY IN ONE', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_DE_MULTI', 200, 'PAY_LATER_PAY_IN_1');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('DE Modal LONG TERM NQ', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_DE_MULTI', 50, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
    test('DE Modal LONG TERM Q', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_DE_MULTI', 500, 'PAY_LATER_LONG_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
