import { screenDimensions, selectors } from '../../../utils/index';
import { resetPageSafely } from '../../../utils/resetPageSafely';

const {
    modal: { overlay }
} = selectors;

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

export const setupWebpage = async (viewport, account, amount) => {
    // Reset page between tests to get a clean state
    await resetPageSafely();

    // Small delay to ensure page is ready after jest-environment-puppeteer reset
    await new Promise(resolve => setTimeout(resolve, 100));

    // Navigate to page
    await page.goto(
        `https://localhost.paypal.com:8080/credit-presentment/lander/modal?payer_id=${account}&amount=${amount}`,
        { waitUntil: 'networkidle2' }
    );

    // Set viewport after page loads with retries
    await setViewportWithRetry(viewport);

    // Wait for modal to be visible
    await page.waitForSelector(overlay, { visible: true });
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5 * 1000)));
};
