import selectors from './selectors';
import modalSnapshot from './modalSnapshot';

/**
 * General modal function tests for both the US & DE locales.
 * Runs inside of ModalFunc-(text/flex) for both the US and DE locale.
 */

export const xClosesModal = (account, viewport, bannerStyle) => async () => {
    const testNameParts = account === 'DEV00000000NI' ? 'ni x button closes modal' : 'ezp x button closes modal';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.button.closeBtn, { visible: true });
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn, { visible: true });
    await page.waitFor(200);

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};

export const closeModalEsc = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'esc key modal close';
    await page.waitFor(500);
    await page.keyboard.press('Escape');
    await page.waitForSelector('body');
    await page.waitFor(200);

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};

export const clickOutsideClosesModal = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'click outside modal close';
    await page.waitFor(1000);
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await modalFrame.click(selectors.modal.overlaySide);
    await page.waitFor(200);

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};

export const closeReopenModal = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'reopen and close modal';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const elementHandle = await page.$('[data-pp-id] iframe');
    const frame = await elementHandle.contentFrame();
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.button.closeBtn);
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn);
    await page.waitFor(1000);
    await frame.waitForSelector(selectors.message.messageMessaging);
    await frame.click(selectors.message.messageMessaging);
    await page.waitFor(1000);
    await modalFrame.waitForSelector('body');
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn);
    await page.waitFor(200);

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};
