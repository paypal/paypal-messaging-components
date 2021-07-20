import selectors from './selectors';

export default async function setTestPage({ config, testPage, frameName }) {
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);

    const frameWithMessage = frameName ? page.frames().find(frame => frame.name() === frameName) : page.mainFrame();

    await frameWithMessage.waitForSelector(selectors.banner.iframeByAttribute, { visible: true });
    await frameWithMessage.waitForSelector(selectors.modal.iframe);

    const bannerElement = await frameWithMessage.$(selectors.banner.iframeByAttribute);
    const modalElement = await frameWithMessage.$(selectors.modal.iframe);
    const bannerFrame = await bannerElement.contentFrame();
    const modalFrame = await modalElement.contentFrame();

    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await bannerFrame.waitForSelector(selectors.banner.messageMessaging, { visible: true });

    return { bannerFrame, modalFrame };
}
