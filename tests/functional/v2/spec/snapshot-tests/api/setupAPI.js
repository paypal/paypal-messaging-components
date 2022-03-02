import { selectors, screenDimensions } from '../../../utils/index';

const {
    modal: { apiIframe }
} = selectors;

let apiIframeEl;

export const setupAPI = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    const { width, height } = screenDimensions[viewport];
    await page.goto(
        `https://localhost.paypal.com:8080/snapshot/v2/api.html?account=${account}&amount=${amount}&width=${width}&height=${height}`
    );

    apiIframeEl = await page.waitForSelector(apiIframe, {
        visible: true
    });
    const modalFrame = await apiIframeEl.contentFrame();

    await page.waitFor(5 * 1000);

    return { modalFrame };
};
