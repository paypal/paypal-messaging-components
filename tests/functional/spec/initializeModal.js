/**
 * The purpose of this function is to click on the message and open the modal. openModal runs beforeEach US & DE modal test.
 */
const openModal = async (viewport, config, testPage = 'modal-test.html') => {
    await page.setViewport(viewport);
    await page.goto(`http://localhost.paypal.com:8080/${testPage}?config=${JSON.stringify(config)}`);

    await page.waitForSelector('.banner-1 iframe', { visible: true });
    await page.waitForSelector("iframe[title='paypal_credit_modal']");

    const elementHandle = await page.$('.banner-1 iframe');
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

    const frame = await elementHandle.contentFrame();
    const modalFrame = await elementModal.contentFrame();

    await frame.waitForSelector('.message__messaging', { visible: true });
    if (config.account.includes('IAZ')) {
        await modalFrame.waitForSelector('.modal__content');
    } else {
        await modalFrame.waitForSelector('.content-body');
    }
    await frame.click('.message__messaging');
    await page.waitForSelector("iframe[title='paypal_credit_modal']", { visible: true });
};

export default openModal;
