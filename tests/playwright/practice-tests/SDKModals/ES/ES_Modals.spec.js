import { test, navigatePage } from '../setup';

test.describe('ES SDK Modals Accessibility Tests', () => {
    test('ES Modal SHORT TERM Q', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_ES_SHORT_TERM', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('ES Modal SHORT TERM NQ', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_ES_SHORT_TERM', 29, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
