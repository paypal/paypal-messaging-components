import selectors from './selectors';
import modalSnapshot from './modalSnapshot';

/**
 * This function runs inside niModal-flex & niModal-text for the US locale.
 * Function definition can be found inside './us_ModalTestDefs.js'
 */

export const niContentTest = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'ni content in modal';
    await page.waitForFunction(() =>
        Array.from(document.querySelectorAll("iframe[title='paypal_credit_modal']")).find(
            el => el.parentElement.parentElement.style.display !== 'none'
        )
    );
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

    const modalFrame = await elementModal.contentFrame();
    await page.waitFor(1000);
    await modalFrame.evaluate(browserVal => Boolean(document.querySelector(browserVal)), selectors.modal.container);
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.modalContent);
    await modalFrame.waitForSelector(selectors.modal.modalMain);
    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await modalFrame.waitForSelector(selectors.modal.contentBodyTitle);

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
    // eslint-disable-next-line no-unused-expressions
    expect(contentHeaderTitle).toContain('Buy now and pay over time with PayPal Credit') &&
        expect(contentBodyTitle).toContain('No Interest if paid in full in 6 months on purchases of $99 or more');

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, image, account);
};

/**
 * This function runs inside us_ModalFunc-flex & us_ModalFunc-text for the US locale.
 * Function definition can be found inside './us_ModalTestDefs.js'
 */

export const clickHereSeeTerms = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'see terms page on modal hyperlink click';
    await page.waitFor(1000);
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await modalFrame.waitForSelector(selectors.modal.contentBodyTerms);
    await modalFrame.waitForSelector('a');
    await page.waitFor(1000);
    await modalFrame.click('a');
    await page.waitFor(1000);

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, image, account);
};

export const applyNowBtn = (account, viewport, bannerStyle) => async () => {
    const testNameParts = 'apply now button to credit application login';
    await page.waitFor(1000);
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    await page.waitFor(500);
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, {
        visible: true
    });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.contentHeader);
    await modalFrame.waitForSelector(selectors.button.btn);

    await modalFrame.click(selectors.button.btn);

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    modalSnapshot(`${testNameParts} ${bannerStyle.layout}`, viewport, image, account);
};

/**
 * This function runs inside us_ModalCalc-flex & us_ModalCalc-text for the US locale.
 * Function definition can be found inside './us_ModalTestDefs.js'
 * Passes in bannerStyles instead of bannerStyle.
 */

export const nonQualErrorEZP = (account, viewport, bannerStyles) => async () => {
    const testNameParts = 'non-qualifying ezp amount error message';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.calculator.calc);
    await modalFrame.waitForSelector(selectors.calculator.calcForm);

    await modalFrame.waitForSelector(selectors.calculator.calcInput, { visible: true });

    await page.waitFor(1000);
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await page.waitFor(1000);
    await modalFrame.type(selectors.calculator.calcInput, '2');
    await modalFrame.click(selectors.button.btnSecondary);

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    // modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
    modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
};

export const ezpFinanceTerms = (account, viewport, bannerStyles) => async () => {
    const testNameParts = 'ezp finance terms';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.contentBody);

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
};

export const updateFinanceTerms = (account, viewport, bannerStyles) => async () => {
    const testNameParts = 'update finance terms';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await modalFrame.waitForSelector(selectors.calculator.calc, { visible: true });
    // await page.waitFor(2000);
    await modalFrame.waitForSelector(selectors.calculator.calcForm);
    await modalFrame.waitForSelector(selectors.calculator.calcInput, { visible: true });
    // await page.waitFor(2000);
    await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
    await modalFrame.type(selectors.calculator.calcInput, '650');
    await modalFrame.click(selectors.button.btnSecondary);

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
};

export const ezpModalContent = (account, viewport, bannerStyles) => async () => {
    const testNameParts = 'ezp message content';
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");
    const modalFrame = await elementModal.contentFrame();
    await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.calculator.calc);
    await page.waitFor(1000);
    await modalFrame.waitForSelector(selectors.calculator.calcForm);
    await modalFrame.waitForSelector(selectors.calculator.calcInput);

    expect(await modalFrame.evaluate(() => document.querySelector('.calculator'))).toBeTruthy();

    await modalFrame.waitForSelector(selectors.modal.contentBody);
    await modalFrame.waitForSelector(selectors.modal.contentBodyTitle);

    const contentHeaderTitle = await modalFrame.evaluate(
        _contentHeaderTitle => document.querySelector(_contentHeaderTitle).innerText,
        selectors.modal.contentHeaderTitle
    );
    const contentBodyTitle = await modalFrame.evaluate(
        _contentBodyTitle => document.querySelector(_contentBodyTitle).innerText,
        selectors.modal.contentBodyTitle
    );

    // eslint-disable-next-line no-unused-expressions
    expect(contentHeaderTitle).toContain('Split your purchases into equal monthly payments') &&
        expect(contentBodyTitle).toContain('Enter a purchase amount to calculate your monthly Easy Payments.');

    const image = await page.screenshot(
        {
            clip: {
                ...viewport,
                x: 0,
                y: 0
            }
        },
        3
    );

    modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
};
