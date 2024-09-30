import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('Multi Messages', () => {
    messageTest('Generic', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0USGENERIC' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('No Interest', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0000000NIQ' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('No Interest US only', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV000NINONUS' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Pay Monthly Credit', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0000000PMG', amount: 1501 });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Short Term Qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV000000GPLQ', amount: 200 });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Short Term Non Qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV00000GPLNQ' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Long Term Qualifying', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV00USLTMQGZ', amount: 200 });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('Buttons Message', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0GENERICPL' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
});
