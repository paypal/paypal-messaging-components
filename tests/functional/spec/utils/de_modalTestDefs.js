import selectors from './selectors';
import modalSnapshot from './modalSnapshot';

/**
 * Runs inside de_ModalCalc-flex & de_ModalCalc-text for the DE locale.
 */

export const nonQualErrorMsg = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'non-qualifying ezp amount error message';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

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
    const calcInstructions = await modalFrame.evaluate(
        () => document.querySelector('.calculator__instructions').innerHTML
    );
    expect(calcInstructions).toContain('Geben Sie einen Betrag zwischen 199,00€ und 5.000,00€ ein.');

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};

export const updateFinanceTerms = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'DE update finance terms';
    await page.waitForFunction(() =>
        Array.from(document.querySelectorAll("iframe[title='paypal_credit_modal']")).find(
            el => el.parentElement.parentElement.style.display !== 'none'
        )
    );
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.calculator.calc, {
        visible: true
    });
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await modalFrame.type(selectors.calculator.calcInput, '650');
    await modalFrame.click(selectors.button.btnMd);

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};

export const deModalContentAndCalc = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'ezp message content';

    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.calculator.calc);

    expect(await modalFrame.evaluate(() => document.querySelector('.calculator'))).toBeTruthy();

    const calcTitle = await modalFrame.evaluate(() => document.querySelector('.calculator__title').innerText);

    expect(calcTitle).toContain('Monatliche Raten berechnen');

    await modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, account);
};
