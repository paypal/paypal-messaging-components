import selectors from './utils/selectors';
import logTestName from './utils/logTestName';
import modalSnapshot from './utils/modalSnapshot';

/**
 * General modal function tests for the US, DE, and GB locales.
 * Runs inside of modalText and modalFlex test files for the US, DE, and GB locales.
 */

export const xClosesModal = ({ account, viewport, groupString }) => async () => {
    let testNameParts = 'ezp x button closes modal';
    logTestName({ account, viewport, groupString, testNameParts });

    if (account.includes('NI')) {
        testNameParts = 'ni x button closes modal';
    } else if (account.includes('GBPL')) {
        testNameParts = 'gb x button closes modal';
    }
    const elementModal = await page.$(selectors.modal.iframe);
    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.button.closeBtn, { visible: true });
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn, { visible: true });
    await page.waitFor(1000);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const closeModalEsc = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'esc key modal close';
    logTestName({ account, viewport, groupString, testNameParts });

    await page.waitFor(500);
    await page.keyboard.press('Escape');
    await page.waitForSelector('body');
    await page.waitFor(1000);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const clickOutsideClosesModal = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'click outside modal close';
    logTestName({ account, viewport, groupString, testNameParts });

    await page.waitFor(1000);
    const elementModal = await page.$(selectors.modal.iframe);
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await modalFrame.click(selectors.modal.overlaySide);
    await page.waitFor(1000);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const closeReopenModal = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'reopen and close modal';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$(selectors.modal.iframe);
    const elementHandle = await page.$(selectors.banner.iframeByAttribute);
    const frame = await elementHandle.contentFrame();
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.button.closeBtn);
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn);
    await page.waitFor(1000);
    await frame.waitForSelector(selectors.banner.messageMessaging);
    await frame.click(selectors.banner.messageMessaging);
    await page.waitFor(1000);
    await modalFrame.waitForSelector('body');
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn);
    await page.waitFor(1000);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
