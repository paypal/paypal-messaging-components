import selectors from './selectors';
import { modalSnapshot } from '../us_initalizeModal';

export const xClosesModal = (viewport, bannerStyle, account) => async () => {
    console.log(account, bannerStyle, viewport);
    // const testNameParts = account === 'DEV00000000NI' ? 'ni x button closes modal' : 'ezp x button closes modal';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.button.closeBtn, { visible: true });
    await page.waitFor(1000);
    await modalFrame.click(selectors.button.closeBtn, { visible: true });

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, image, account);
};

export const closeModalEsc = (viewport, bannerStyle, account) => async () => {
    const testNameParts = 'esc key modal close';
    await page.waitFor(500);
    await page.keyboard.press('Escape');
    await page.waitForSelector('body');
    await page.waitFor(1000);

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, image, account);
};

export const clickOutsideClosesModal = (viewport, bannerStyle, account) => async () => {
    const testNameParts = 'click outside modal close';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await modalFrame.waitForSelector(selectors.modal.overlay);
    await modalFrame.click(selectors.modal.overlaySide);

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(
    //     `${testNameParts} ${bannerStyle.layout}`,
    //     viewport,
    //     image,
    //     account
    // );
};

export const closeReopenModal = (viewport, bannerStyle, account) => async () => {
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

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(
    //     `${testNameParts} ${bannerStyle.layout}`,
    //     viewport,
    //     image,
    //     account
    // );
};
