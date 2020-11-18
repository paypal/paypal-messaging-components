import selectors from '../../utils/selectors';
import logTestName from '../../utils/logTestName';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalText.test.js for the GB locale.
 */

export const gbModalContent = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'gb modal content';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$(selectors.modal.iframe);

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.modal.modalContent);
    await modalFrame.waitForSelector(selectors.modal.modalMain);
    await modalFrame.waitForSelector(selectors.modal.contentDescriptionTitle);
    const h3 = await modalFrame.$eval(selectors.modal.contentDescriptionTitle, element => element.innerHTML);

    if (account.includes('GBPLQ')) {
        expect(h3).toContain('Make one interest-free payment of £41.67 today');
    } else {
        expect(h3).toContain('Make one interest-free payment today, then pay the rest monthly.');
    }
    await page.waitFor(500);
    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
