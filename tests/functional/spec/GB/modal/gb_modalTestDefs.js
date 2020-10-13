import selectors from '../../utils/selectors';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalText.test.js for the GB locale.
 */

export const gbModalContent = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'gb modal content';
    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.modal.gbContent);
    await modalFrame.waitForSelector(selectors.modal.gbMain);
    await modalFrame.waitForSelector(selectors.modal.gbContainerLeft);
    await modalFrame.waitForSelector(selectors.modal.gbOffer);
    const h1 = await modalFrame.evaluate(() => document.querySelector('.content-body .offer').innerHTML);

    if (account.includes('GBPLQ')) {
        expect(h1).toContain('3 interest-free payments of <br> £41,67 per month with Flex');
    } else {
        expect(h1).toContain('3 interest-free monthly <br> payments with Flex');
    }
    await page.waitFor(500);
    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
