import selectors from '../../utils/selectors';
import { logTestName } from '../../utils/logging';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalText.test.js for the AU locale.
 */

export const auModalContent =
    ({ account, viewport, groupString }) =>
    async () => {
        const testNameParts = 'au modal content';
        logTestName({ account, viewport, groupString, testNameParts });

        const elementModal = await page.$(selectors.modal.iframe);

        const modalFrame = await elementModal.contentFrame();
        await page.waitFor(2000);
        await modalFrame.waitForSelector(selectors.modal.modalContent);
        await modalFrame.waitForSelector(selectors.modal.modalMain);
        await modalFrame.waitForSelector(selectors.modal.contentDescriptionTitle);
        const h3 = await modalFrame.$eval(selectors.modal.contentDescriptionTitle, element => element.innerHTML);

        if (account.includes('AUPLQ')) {
            expect(h3).toContain('Split your $500.00 purchase into 4 interest-free payments of');
        } else {
            expect(h3).toContain('Split your purchase into 4 interest-free payments');
        }
        await page.waitFor(500);
        await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
    };
