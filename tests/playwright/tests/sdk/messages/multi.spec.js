import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('@US Multi Messages', () => {
    messageTest('US long term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 20001, offer: 'PAY_LATER_LONG_TERM' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });

    messageTest('US long term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 1501, offer: 'PAY_LATER_LONG_TERM' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });

    messageTest('US product list', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: '' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });

    messageTest('US short term non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });

    messageTest('US short term qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_US_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });
});

messageTest.describe('@DE Multi Messages', () => {
    messageTest('DE multi qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 200, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });

    messageTest('DE multi non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_MULTI', amount: 29, offer: 'PAY_LATER_SHORT_TERM' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });
    messageTest('DE pay in 1 qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_PAY_IN_1', amount: 200, offer: 'PAY_LATER_PAY_IN_1' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });
    messageTest('DE pay in 1 non qualifying', async ({ navigatePage, loadMessage, runAxeCoreScan }) => {
        await navigatePage({ account: 'DEV_DE_PAY_IN_1', amount: 1001.1, offer: 'PAY_LATER_PAY_IN_1' });
        const messageIframe = await loadMessage();
        await runAxeCoreScan(messageIframe);
    });
});
