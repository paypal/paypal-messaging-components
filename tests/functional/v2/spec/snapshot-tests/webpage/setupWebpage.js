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

export const setupWebpage = async (viewport, account, amount, queryParams = {}) => {
    // Reset page between tests to get a clean state
    await resetPageSafely();

    // Set viewport before navigation so responsive layout resolves deterministically.
    await setViewportWithRetry(viewport);

    // Navigate to page
    const params = new URLSearchParams({ payer_id: account, amount, ...queryParams });
    await page.goto(`https://localhost.paypal.com:8080/credit-presentment/lander/modal?${params.toString()}`, {
        waitUntil: 'networkidle0'
    });

    // Wait for modal to be visible
    await page.waitForSelector(overlay, { visible: true });
};
