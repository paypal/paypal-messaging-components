import { selectors, screenDimensions } from '../../../utils/index';
import { resetPageSafely } from '../../../utils/resetPageSafely';

const {
    modal: { apiIframe }
} = selectors;

let apiIframeEl;

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

export const setupAPI = async (viewport, account, amount) => {
    // Reset page between tests to get a clean state
    await resetPageSafely();

    await setViewportWithRetry(viewport);
    const { width, height } = screenDimensions[viewport];
    await page.goto(
        `https://localhost.paypal.com:8080/snapshot/v2/api.html?account=${account}&amount=${amount}&width=${width}&height=${height}`
    );

    apiIframeEl = await page.waitForSelector(apiIframe, {
        visible: true
    });
    const modalFrame = await apiIframeEl.contentFrame();

    return { modalFrame };
};
