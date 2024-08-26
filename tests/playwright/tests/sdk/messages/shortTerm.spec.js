import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('Short Term', () => {
    messageTest('US Message short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message short term checkout', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
    messageTest('US Message short term pl2go', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_SHORT_TERM_PL2GO', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIFrame = await loadMessage();
        await runAxeCoreScan(messageIFrame, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});
