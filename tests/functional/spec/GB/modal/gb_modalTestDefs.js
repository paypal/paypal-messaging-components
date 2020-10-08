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
    await modalFrame.waitForSelector(selectors.modal.modalContent);
    await modalFrame.waitForSelector(selectors.modal.modalMain);
    await modalFrame.waitForSelector(selectors.modal.containerLeft);
    await modalFrame.waitForSelector(selectors.modal.offer);
    const h1 = await modalFrame.evaluate(() => document.querySelector('.content-body__offer').innerHTML);

    if (account.includes('GBPLQ')) {
        expect(h1).toContain('Pay in 3 interest-free <br /> payments of £41,67');
    } else {
        expect(h1).toContain('Pay in 3 interest-free <br /> payments');
    }
    await page.waitFor(500);
    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
