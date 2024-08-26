import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('Long Term', () => {
    messageTest('US Message long term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: 29, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message long term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: 100, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message long term checkout', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
