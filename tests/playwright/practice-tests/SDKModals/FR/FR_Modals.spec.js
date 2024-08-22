import { test, navigatePage } from '../setup';

test.describe('FR SDK Modals Accessibility Tests', () => {
    test('FR Modal SHORT TERM Q', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_FR_SHORT_TERM', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('FR Modal SHORT TERM NQ', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_FR_SHORT_TERM', 29, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
