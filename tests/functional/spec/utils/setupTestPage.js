import { selectors } from '../../v2/utils/index';

const {
    modal: { iframe },
    message: { messageIframe, messageMessaging }
} = selectors;

export default async function setupTestPage({ config, testPage }) {
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);

    const zoidMessageIframeEl = await page.waitForSelector(messageIframe, { visible: true });
    const bannerElement = await zoidMessageIframeEl.contentFrame();

    await bannerElement.waitForSelector(messageMessaging);

    const openModal = async () => {
        await bannerElement.click(messageMessaging);

        const zoidModalIframeEl = await page.waitForSelector(iframe, { visible: true });
        const modalFrame = await zoidModalIframeEl.contentFrame();
        return { modalFrame };
    };

    await page.waitFor(3 * 1000);

    return { bannerElement, openModal };
}
