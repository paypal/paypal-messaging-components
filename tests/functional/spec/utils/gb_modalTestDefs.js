import selectors from './selectors';
import modalSnapshot from './modalSnapshot';

/**
 * Runs inside gb_ModalFunc-text for the GB locale.
 */

export const gbModalContent = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'gb modal content';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.modal.modalContent);
    await modalFrame.waitForSelector(selectors.modal.modalMain);
    await modalFrame.waitForSelector(selectors.modal.containerLeft);
    await modalFrame.waitForSelector(selectors.modal.h1);
    const h1 = await modalFrame.evaluate(() => document.querySelector('h1').innerHTML);

    if (account.includes('GBPLQ')) {
        expect(h1).toContain('3 interest-free payments of <br> £41.67 per month with Flex');
    } else {
        expect(h1).toContain('3 interest-free monthly <br> payments with Flex');
    }

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};
