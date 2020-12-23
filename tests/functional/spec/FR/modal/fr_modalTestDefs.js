import selectors from '../../utils/selectors';
import logTestName from '../../utils/logTestName';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalText.test.js for the FR locale.
 */

export const gbModalContent = ({ account, viewport, groupString }) => async () => {
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
        expect(h3).toContain(
            '500,00 € divisé en 4 échéances de 41,67 €. Inclut des frais de 2,1% dans la limite de 20 €.'
        );
    } else {
        expect(h3).toContain(
            '4 échéances, pour les achats de 199 € à 5.000 €. Inclut des frais de 2,1% dans la limite de 20 €. '
        );
    }
    await page.waitFor(500);
    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
