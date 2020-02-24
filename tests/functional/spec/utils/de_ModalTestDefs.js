import selectors from './selectors';
import { modalSnapshot } from '../de_initalizeModal';

/**
 * DE Modal Calc Tests
 */

export const nonQualErrorMsg = (viewport, bannerStyle, account) => async () => {
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
    const calcInstructions = await modalFrame.evaluate(
        () => document.querySelector('.calculator__instructions').innerHTML
    );
    expect(calcInstructions).toContain('Geben Sie einen Betrag zwischen 199,00€ und 5.000,00€ ein.');

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(testNameParts, viewport, image);
};

export const updateFinanceTerms = (viewport, bannerStyle, account) => async () => {
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
    await modalFrame.waitForSelector(selectors.calculator.calcForm);
    await modalFrame.waitForSelector(selectors.calculator.calcInput, {
        visible: true
    });
    await page.waitFor(2000);
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await modalFrame.type(selectors.calculator.calcInput, '650');
    await modalFrame.click(selectors.button.btnMd);

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(testNameParts, viewport, image);
};

export const deModalContentAndCalc = (viewport, bannerStyle, account) => async () => {
    const testNameParts = 'ezp message content';

    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.calculator.contentCalc);
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.calculator.calc);

    expect(await modalFrame.evaluate(() => document.querySelector('.calculator'))).toBeTruthy();

    const calcTitle = await modalFrame.evaluate(() => document.querySelector('.calculator__title').innerText);

    expect(calcTitle).toContain('Monatliche Raten berechnen');

    // const image = await page.screenshot(
    //     {
    //         clip: {
    //             ...viewport,
    //             x: 0,
    //             y: 0
    //         }
    //     },
    //     3
    // );

    // modalSnapshot(testNameParts, viewport, image);
};

/**
 * DE Modal Func Tests
 */
