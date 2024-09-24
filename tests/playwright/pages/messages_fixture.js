// modalsFixture.js
import { baseTest } from './base';
import { selectors } from '../util/selectors';

// Extend Playwright base test with custom fixtures
export const messageTest = baseTest.extend({
    navigatePage: async ({ navigatePage }, use) => {
        const messageUrl = './snapshot/v2/colorsdk.html';
        const navigate = async ({ account, amount, offer }) => {
            await navigatePage(messageUrl, { account, amount, offer });
        };
        await use(navigate);
    },

    // Fixture for loading the modal
    loadMessage: async ({ page }, use) => {
        const loadMessage = async () => {
            const messageIframe = await page.waitForSelector(selectors.message.messageIframe, {
                state: 'visible',
                timeout: 300000
            });
            if (!messageIframe) {
                throw new Error('Message Iframe not found');
            }

            const messageFrame = await messageIframe.contentFrame();
            await messageFrame.locator(selectors.message.messageMessaging).waitFor({
                state: 'visible',
                timeout: 300000
            });
            return messageIframe;
        };
        await use(loadMessage);
    }
});
