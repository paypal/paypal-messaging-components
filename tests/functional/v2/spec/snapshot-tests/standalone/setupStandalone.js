import { selectors, screenDimensions } from '../../../utils/index';

const {
    standaloneLearnMore,
    modal: { iframe }
} = selectors;

export const setupStandalone = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    await page.goto(
        `https://localhost.paypal.com:8080/snapshot/v2/standalone-modal.html?account=${account}&amount=${amount}`
    );
    const learnMoreButton = await page.waitForSelector(standaloneLearnMore);
    await learnMoreButton.click();

    const zoidModalIframeEl = await page.waitForSelector(iframe, { visible: true });
    const modalFrame = await zoidModalIframeEl.contentFrame();

    await page.waitFor(5 * 1000);

    return { modalFrame };
};
