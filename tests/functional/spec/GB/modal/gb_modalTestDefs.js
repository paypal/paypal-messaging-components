import selectors from '../../utils/selectors';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalText.test.js for the GB locale.
 */

export const gbModalContent = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'gb modal content';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.modal.modalContent);
    await modalFrame.waitForSelector(selectors.modal.modalMain);
    await modalFrame.waitForSelector(selectors.modal.containerLeft);
    await modalFrame.waitForSelector(selectors.modal.offer);
    const h1 = await modalFrame.evaluate(() => document.querySelector('.content-body__offer').innerHTML);

    if (account.includes('GBPLQ')) {
        expect(h1).toContain('3 interest-free payments of <br> £41,67 per month with Flex');
    } else {
        expect(h1).toContain('3 interest-free monthly <br> payments with Flex');
    }
    await page.waitFor(500);
    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};
