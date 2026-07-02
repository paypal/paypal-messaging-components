import { selectors } from '../../v2/utils';

export default async function setupTestPage({ config, testPage, frameName }) {
    const isV2Mode = process.env.BANNER_SNAPSHOT_MODE === 'v2Renderer';
    const resolvedConfig = isV2Mode ? { ...config, features: 'useRenderV2Message' } : config;
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(resolvedConfig)}`);

    const frameWithMessage = frameName ? page.frames().find(frame => frame.name() === frameName) : page.mainFrame();
    const bannerElement = await frameWithMessage.waitForSelector(selectors.message.messageIframe, {
        visible: true
    });
    const bannerFrame = await bannerElement.contentFrame();

    await bannerFrame.waitForSelector(selectors.message.messageMessaging, { visible: true });

    const openModal = async () => {
        await bannerElement.click(selectors.message.messageMessaging);

        const zoidModalIframeEl = await page.waitForSelector(selectors.modal.iframe, { visible: true });
        const modalFrame = await zoidModalIframeEl.contentFrame();
        return { modalFrame };
    };

    await page.waitFor(3 * 1000);

    return { bannerElement, openModal };
}
