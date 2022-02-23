import selectors from '../../utils/selectors';
import { logTestName } from '../../utils/logging';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalText.test.js for the FR locale.
 */

export const frModalContent = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'fr modal content';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$(selectors.modal.iframe);

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.modal.modalContent);
    await modalFrame.waitForSelector(selectors.modal.modalMain);
    await modalFrame.waitForSelector(selectors.modal.contentDescriptionTitle);
    const h3 = await modalFrame.$eval(selectors.modal.contentDescriptionTitle, element => element.innerHTML);

    if (account.includes('FRPLQ')) {
        expect(h3).toContain('500 € divisé en 4 échéances sans frais de 31,25 €.');
    } else {
        expect(h3).toContain('4 échéances sans frais, pour les achats de 199 € à 5.000 €.');
    }
    await page.waitFor(500);
    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
