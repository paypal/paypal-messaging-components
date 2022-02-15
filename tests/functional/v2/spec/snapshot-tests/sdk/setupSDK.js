import { selectors, screenDimensions } from '../../../utils/index';

const {
    message: { messageContainer, messageIframe, messageMessaging },
    modal: { iframe }
} = selectors;

export const setupSDK = async (viewport, account, amount) => {
    await page.setViewport(screenDimensions[viewport]);
    await page.goto(`https://localhost.paypal.com:8080/snapshot/v2/sdk.html?account=${account}&amount=${amount}`);

    await page.waitForSelector(messageContainer);
    const zoidMessageIframeEl = await page.waitForSelector(messageIframe, { visible: true });
    const messageFrame = await zoidMessageIframeEl.contentFrame();

    await messageFrame.waitForSelector(messageMessaging);
    await messageFrame.click(messageMessaging);

    const zoidModalIframeEl = await page.waitForSelector(iframe, { visible: true });
    const modalFrame = await zoidModalIframeEl.contentFrame();

    await page.waitFor(3 * 1000);

    return { messageFrame, modalFrame };
};
