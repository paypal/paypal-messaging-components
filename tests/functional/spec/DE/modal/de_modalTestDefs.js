import selectors from '../../utils/selectors';
import logTestName from '../../utils/logTestName';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * Runs inside modalTextCalc and modalFlexCalc for the DE locale.
 */

export const nonQualErrorMsg = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'non-qualifying ezp amount error message';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$(selectors.modal.iframe);

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.calculator.calcForm);
    await page.waitFor(1000);
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await page.waitFor(1000);

    await modalFrame.type(selectors.calculator.calcInput, '2');
    await modalFrame.click(selectors.button.btnMd);
    await modalFrame.waitForSelector(selectors.calculator.calcInstructions);
    await page.waitFor(2000);

    const calcInstructions = await modalFrame.$eval(
        selectors.calculator.calcInstructions,
        element => element.innerHTML
    );
    expect(calcInstructions).toContain('Geben Sie einen Betrag zwischen 199€ und 5.000€ ein.');
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const updateFinanceTerms = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'DE update finance terms';
    logTestName({ account, viewport, groupString, testNameParts });

    await page.waitForFunction(
        iframeSelector =>
            Array.from(document.querySelectorAll(iframeSelector)).find(
                el => el.parentElement.parentElement.style.display !== 'none'
            ),
        {},
        selectors.modal.iframe
    );
    const elementModal = await page.$(selectors.modal.iframe);
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
    await page.waitFor(2000);

    await modalFrame.waitForSelector(selectors.calculator.calc, { visible: true });
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await modalFrame.type(selectors.calculator.calcInput, '650');
    await modalFrame.click(selectors.button.closeBtn);
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const deModalContentAndCalc = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'ezp message content';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$(selectors.modal.iframe);
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.calculator.calc);

    const calc = modalFrame.$eval(selectors.calculator.calc, element => element);
    expect(calc).toBeTruthy();

    const calcTitle = await modalFrame.$eval(selectors.calculator.calcTitle, element => element.innerText);
    expect(calcTitle).toContain('Monatliche Raten berechnen');
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};
