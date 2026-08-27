import { expect } from '@playwright/test';
import { messageTest } from '../../../pages/messages_fixture';

messageTest.describe('Multi Messages', () => {
    messageTest('Generic', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0USGENERIC', url: '/accessibility/colorsdk.html' });
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('NI', async ({ navigatePage, page, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV0000000NIQ' });
        const messageIframe = await loadMessage();
        const messageFrame = await messageIframe.contentFrame();
        const messageButton = messageFrame.getByRole('button');

        await expect(messageButton).toHaveAccessibleName('No Interest if paid in full in 6 months. Learn more');

        // The rendered NI fixture switches copy below its 141.552px message breakpoint.
        await page.setViewportSize({ width: 150, height: 667 });
        await expect(messageButton).toHaveAccessibleName('PayPal Credit Buy now. Pay over time. Learn more');
        await messageAxeCoreScan(messageIframe);
    });
    messageTest('NI US only', async ({ navigatePage, loadMessage, messageAxeCoreScan }) => {
        await navigatePage({ account: 'DEV000NINONUS' });
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
        const messageFrame = await messageIframe.contentFrame();
        const messageButton = messageFrame.getByRole('button');

        await expect(messageButton).toHaveAccessibleName(/^PayPal As low as \$[\d,.]+\/ month\. Learn more$/);

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
        await page.waitForTimeout(5000);
        const messageIframe = await loadMessage();
        await messageAxeCoreScan(messageIframe);
    });
});
