import { screenDimensions } from '../../../utils/index';

export const setupWebpage = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    await page.goto(
        `https://localhost.paypal.com:8080/credit-presentment/lander/modal?payer_id=${account}&amount=${amount}`
    );
    await page.waitFor(5 * 1000);
};
