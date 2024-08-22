import { test, navigatePage } from '../setup';

test.describe('AU SDK Modals Accessibility Tests', () => {
    test('AU Modal SHORT TERM Q', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_AU_SHORT_TERM', 200, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });

    test('AU Modal SHORT TERM NQ', async ({ page, loadModal, runAxeCoreScan }) => {
        await navigatePage(page, 'DEV_AU_SHORT_TERM', 29, 'PAY_LATER_SHORT_TERM');
        const modalIframe = await loadModal();
        await runAxeCoreScan(modalIframe);
    });
});
