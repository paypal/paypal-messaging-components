/**
 * The purpose of this function is to click on the message and open the modal. openModal runs beforeEach DE modal test.
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
    await modalFrame.waitForSelector('.modal__content');

    await frame.click('.message__messaging');

    /**
     * Evaluates which modal iframe is *not* set to display:none, then executes the openModal func beforeEach test.
     */

    await page.waitForFunction(() =>
        Array.from(document.querySelectorAll("iframe[title='paypal_credit_modal']")).find(
            el => el.parentElement.parentElement.style.display !== 'none'
        )
    );
};

export default openModal;
