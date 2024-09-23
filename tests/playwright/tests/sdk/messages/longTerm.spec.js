import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('@US Long Term', () => {
    messageTest('US Message long term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: 29, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('US Message long term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM', amount: 100, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('US Message long term checkout', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_LONG_TERM_CHECKOUT', amount: 100, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
messageTest.describe('@DE Long Term', () => {
    messageTest('DE Message long term qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 100, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('DE Message long term non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM', amount: 29, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('DE Message long term 0APR non qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM_0APR', amount: 29, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
    messageTest('DE Message long term 0APR qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_LONG_TERM_0APR', amount: 100, offer: 'PAY_LATER_LONG_TERM' });
        const messageIFrame = await loadMessage();
        await messageAxeCoreScan(messageIFrame);
    });
});
