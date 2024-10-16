import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('Multi Messages', () => {
    messageTest('Generic', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0USGENERIC', url: '/accessibility/colorsdk.html' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('NI', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0000000NIQ' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('NI US only', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV000NINONUS' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Credit', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0000000PMG', amount: 1501 });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Short Term Q', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV000000GPLQ', amount: 200 });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Short Term NQ', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV00000GPLNQ' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });

    messageTest('Long Term Q', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
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
messageTest.describe('Flex Test', () => {
    messageTest('Flex', async ({ navigatePage, page, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0USGENERIC', url: '/accessibility/flexsdk.html' });
        const messageIframe = await loadMessage();
        await page.waitForTimeout(5000);
        await messageAxeCoreScan(messageIframe);
    });
});
