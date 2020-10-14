import selectors from '../../utils/selectors';
import logTestName from '../../utils/logTestName';
import modalSnapshot from '../../utils/modalSnapshot';

/**
 * This function runs inside modalNI.test.js for the US locale.
 */
export const niContentTest = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'ni content in modal';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();
    /**
     * selectors.modal.contentHeaderTitle and selectors.modal.contentBodyTitle are passed to the variables
     * of the same name beginning with the underscore in order to pass the nodeJS variable to the browser through
     * document.querySelector with Puppeteer.
     */

    const contentHeaderTitle = await modalFrame.evaluate(
        _contentHeaderTitle => document.querySelector(_contentHeaderTitle).innerText,
        selectors.modal.contentHeaderTitle
    );
    const contentBodyTitle = await modalFrame.evaluate(
        _contentBodyTitle => document.querySelector(_contentBodyTitle).innerText,
        selectors.modal.contentBodyTitle
    );

    expect(contentHeaderTitle).toContain('Buy now and pay over time with PayPal Credit');
    expect(contentBodyTitle).toContain('No Interest if paid in full in 6 months on purchases of $99 or more');
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

/**
 * Runs inside modalText and modalFlex.test.js for the US locale.
 */
export const clickHereSeeTerms = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'see terms page on modal hyperlink click';
    logTestName({ account, viewport, groupString, testNameParts });

    await page.waitFor(1000);
    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector('a');
    await page.waitFor(1000);
    await modalFrame.click('a');
    await page.waitFor(1000);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const applyNowBtn = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'apply now button to credit application login';
    logTestName({ account, viewport, groupString, testNameParts });

    await page.waitFor(1000);
    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    await page.waitFor(500);
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.click(selectors.button.btn);
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

/**
 * Runs inside modalCalc.test.js for the US locale.
 */
export const nonQualErrorEZP = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'non-qualifying ezp amount error message';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();

    await modalFrame.waitForSelector(selectors.calculator.calc);
    await page.waitFor(1000);
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await page.waitFor(1000);
    await modalFrame.type(selectors.calculator.calcInput, '2');
    await modalFrame.click(selectors.button.btnSecondary);
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const ezpFinanceTerms = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'ezp finance terms';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const updateFinanceTerms = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'update finance terms';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.calculator.calc, { visible: true });
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await modalFrame.type(selectors.calculator.calcInput, '650');
    await modalFrame.click(selectors.button.btnSecondary);
    await page.waitFor(800);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const ezpModalContent = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'ezp message content';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.calculator.calc);
    await page.waitFor(800);

    expect(await modalFrame.evaluate(() => document.querySelector('.calculator'))).toBeTruthy();

    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await modalFrame.waitForSelector(selectors.modal.contentBodyTitle);

    const contentHeaderTitle = await modalFrame.evaluate(
        _contentHeaderTitle => document.querySelector(_contentHeaderTitle).innerText,
        selectors.modal.contentHeaderTitle
    );
    const calcTitle = await modalFrame.evaluate(
        _calcTitle => document.querySelector(_calcTitle).innerText,
        selectors.calculator.calcTitle
    );

    expect(contentHeaderTitle).toContain('Split your purchases into equal monthly payments');
    expect(calcTitle).toContain('Enter a purchase amount to calculate your monthly Easy Payments.');
    await page.waitFor(300);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
};

export const switchTabs = ({ account, viewport, groupString }) => async () => {
    const testNameParts = 'EZP and NI tabs click';
    logTestName({ account, viewport, groupString, testNameParts });

    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.button.tabs);
    await page.waitFor(500);
    // Select the tab that is NOT currently selected.
    await modalFrame.click('button.tab:not(.tab--selected)');
    await page.waitFor(200);

    await modalSnapshot(`${groupString} ${testNameParts}`, viewport, account);
    await page.waitFor(200);
    await modalFrame.click('button.tab:not(.tab--selected)');
};
