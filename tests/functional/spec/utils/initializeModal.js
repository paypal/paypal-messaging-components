import selectors from './selectors';

/**
 * The purpose of this function is to click on the message and open the modal. openModal runs beforeEach US & DE modal test.
 */
const openModal = async (viewport, config, testPage = 'modal-test.html') => {
    page.on('pageerror', error => {
        // TODO: find a way to re-launch the browser on error so tests can continue
        // eslint-disable-next-line no-console
        console.log(`modal page error for ${JSON.stringify(config)} with viewport ${JSON.stringify(viewport)}`, error);
    });

    const isStandalone = testPage === 'modal-standalone.html';

    await page.setViewport(viewport);
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);

    if (!isStandalone) await page.waitForSelector(selectors.banner.iframe, { visible: true });
    await page.waitForSelector(selectors.modal.iframe);

    if (!isStandalone) {
        const elementHandle = await page.$(selectors.banner.iframe);
        const elementModal = await page.$(selectors.modal.iframe);

        const frame = await elementHandle.contentFrame();
        const modalFrame = await elementModal.contentFrame();
        await frame.click(selectors.banner.messageMessaging);

        await frame.waitForSelector(selectors.banner.messageMessaging, { visible: true });
        const hasContentBody = ['DEV00000000NI', 'DEV0000000PSZ'].includes(config.account);
        await modalFrame.waitForSelector(hasContentBody ? selectors.modal.contentBody : selectors.modal.modalContent);
    } else {
        const elementBanner = await page.$(selectors.banner.wrapper);
        const elementModal = await page.$(selectors.modal.iframe);

        const modalFrame = await elementModal.contentFrame();
        await elementBanner.click();

        const hasContentBody = ['DEV00000000NI', 'DEV0000000PSZ'].includes(config.account);
        await modalFrame.waitForSelector(hasContentBody ? selectors.modal.contentBody : selectors.modal.modalContent);
    }

    await page.waitForSelector(selectors.modal.iframe, { visible: true });
    await page.waitFor(10 * 1000);
};

export default openModal;
