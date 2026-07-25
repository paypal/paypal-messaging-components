import { selectors, screenDimensions } from '../../../utils/index';
import { resetPageSafely } from '../../../utils/resetPageSafely';

const {
    message: { messageContainer, messageIframe, messageMessaging },
    modal: { iframe }
} = selectors;
const port = process.env.PORT || 8080;

const setViewportWithRetry = async (viewport, maxRetries = 5) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < maxRetries; i += 1) {
        try {
            // eslint-disable-next-line no-await-in-loop
            await page.setViewport(screenDimensions[viewport]);
            return;
        } catch (err) {
            const isRetryable =
                err.message.includes('Target') ||
                err.message.includes('Session') ||
                err.message.includes('closed') ||
                err.message.includes('Emulation');

            if (i === maxRetries - 1 || !isRetryable) {
                throw err;
            }
            // Exponential backoff: 100ms, 200ms, 400ms, 800ms
            const delay = Math.min(100 * 2 ** i, 1000);
            // eslint-disable-next-line no-await-in-loop
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

export const setupSDK = async (viewport, account, amount) => {
    // Reset page between tests to get a clean state
    await resetPageSafely();

    await setViewportWithRetry(viewport);
    await page.goto(`https://localhost.paypal.com:${port}/snapshot/v2/sdk.html?account=${account}&amount=${amount}`);

    await page.waitForSelector(messageContainer);
    const zoidMessageIframeEl = await page.waitForSelector(messageIframe, { visible: true });
    const messageFrame = await zoidMessageIframeEl.contentFrame();

    await messageFrame.waitForSelector(messageMessaging);
    await messageFrame.click(messageMessaging);

    const zoidModalIframeEl = await page.waitForSelector(iframe, { visible: true });
    const modalFrame = await zoidModalIframeEl.contentFrame();

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3 * 1000)));

    return { messageFrame, modalFrame };
};
