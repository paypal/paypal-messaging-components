// modalsFixture.js
import { baseTest } from './base';
import { selectors } from '../util/selectors';

// Extend Playwright base test with custom fixtures
export const modalTest = baseTest.extend({
    // Fixture for loading the modal
    loadModal: async ({ page }, use) => {
        const loadModal = async () => {
            const messageButton = await page.waitForSelector(selectors.standaloneLearnMore, {
                state: 'visible',
                timeout: 300000
            });
            if (!messageButton) {
                throw new Error('Button not found');
            }
            await messageButton.click();

            const modalIframe = await page.waitForSelector(selectors.modal.iframe, {
                state: 'attached',
                timeout: 30000
            });
            const modalFrame = await modalIframe.contentFrame();
            await modalFrame.locator(selectors.modal.contentWrapper).waitFor({
                state: 'visible',
                timeout: 30000
            });
            return modalIframe;
        };
        await use(loadModal);
    }
});
