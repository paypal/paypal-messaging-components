import selectors from './selectors';

export default async function setupTestPage({ config, testPage }) {
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);

    const bannerElement = await page.waitForSelector(selectors.banner.iframeByAttribute, { visible: true });
    const bannerFrame = await bannerElement.contentFrame();

    await bannerFrame.waitForSelector(selectors.banner.messageMessaging, { visible: true });

    const openModal = async () => {
        // Modal is no longer preloaded so must click on the banner to render it
        await bannerElement.click();

        const modalElement = await page.waitForSelector(selectors.modal.iframe, { visible: true });
        const modalFrame = await modalElement.contentFrame();

        await modalFrame.waitForSelector(selectors.modal.contentBody);

        return { modalFrame };
    };

    return { bannerFrame, openModal };
}
