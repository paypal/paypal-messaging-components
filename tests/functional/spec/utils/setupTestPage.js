import selectors from './selectors';

export default async function setTestPage({ config, testPage }) {
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);
    await page.waitForSelector(selectors.banner.iframeByAttribute, { visible: true });
    await page.waitForSelector(selectors.modal.iframe);

    const bannerElement = await page.$(selectors.banner.iframeByAttribute);
    const modalElement = await page.$(selectors.modal.iframe);
    const bannerFrame = await bannerElement.contentFrame();
    const modalFrame = await modalElement.contentFrame();

    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await bannerFrame.waitForSelector(selectors.banner.messageMessaging, { visible: true });

    return { bannerFrame, modalFrame };
}
