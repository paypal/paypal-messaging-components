import { selectors, modalSnapshot, settleModalRendering } from '../utils/index';

const {
    standaloneLearnMore,
    modal: {
        overlay,
        contentWrapper,
        headerContent,
        h2,
        subheadlineContent,
        button: { close, productList }
    },
    productList: { tile },
    longTerm: {
        calculator: { input }
    },
    message: { messageMessaging }
} = selectors;

/**
 * Navigates to the product list view by clicking "See other ways to pay over time"
 * inside a product-specific modal (Pi30 or Pi3). GB-specific flow: product list
 * never opens directly from "Learn more" in the message.
 */
export const openProductListFromModal = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);

    // Click "See other ways to pay over time" inside the product modal
    await contentWindow.waitForFunction(
        selector => !!document.querySelector(selector),
        { timeout: 30000 },
        productList
    );
    await contentWindow.evaluate(selector => {
        const el = document.querySelector(selector);
        el.scrollIntoView({ block: 'center' });
        el.click();
    }, productList);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2 * 1000)));

    // Product list view should now be shown
    await contentWindow.waitForSelector(`${headerContent} > ${h2}`);
    const headline = await contentWindow.$eval(h2, element => element.innerText);
    expect(headline).toContain(modalContent.headline);
    if (testName) {
        await modalSnapshot(testName, contentWindow);
    }
};

/**
 * Ensures product list modal opens and has expected content.
 */
export const openProductListView = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${headerContent} > ${h2}`);

    const headline = await contentWindow.$eval(h2, element => element.innerText);
    expect(headline).toContain(modalContent.headline);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures each product tile in the product list modal takes user to correct view.
 */
export const clickProductListTiles = async (contentWindow, modalContent, account) => {
    // Disable CSS animations/transitions so the entrance animation doesn't intercept tile clicks
    await settleModalRendering(contentWindow);
    const switchViews = async (childNum, viewName) => {
        await contentWindow.waitForSelector(contentWrapper);
        await contentWindow.waitForSelector(`${tile}:nth-child(${childNum})`);
        // Use native .click() via evaluate instead of frame.click() which requires iframe focus
        // and correct page coordinates - both can fail in cross-origin iframes with newer Chrome headless.
        await contentWindow.evaluate(
            selector => document.querySelector(selector).click(),
            `${tile}:nth-child(${childNum})`
        );
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2 * 1000)));

        await contentWindow.waitForSelector(`${headerContent} > ${h2}`);
        const headline = await contentWindow.$eval(h2, element => element.innerText);
        expect(headline).toContain(modalContent[viewName]);

        await contentWindow.waitForFunction(
            selector => !!document.querySelector(selector),
            { timeout: 30000 },
            productList
        );
        await contentWindow.evaluate(selector => {
            const el = document.querySelector(selector);
            el.scrollIntoView({ block: 'center' });
            el.click();
        }, productList);
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2 * 1000)));
    };

    if (account === 'DEV_US_MULTI') {
        // Switch to long term view
        await switchViews(2, 'shortTerm');

        // Switch to short term view
        await switchViews(3, 'longTerm');

        // Switch to no interest view.
        // NOTE: PPC NI tile is separated from the pay later tiles as a means to distinguish product categories in the product list modal.
        await switchViews(5, 'noInterest');
    } else if (account === 'DEV_ES_MULTI' || account === 'DEV_IT_MULTI' || account === 'DEV_FR_MULTI') {
        // Switch to long term view
        await switchViews(2, 'shortTerm');

        // Switch to short term view
        await switchViews(3, 'longTerm');
    } else if (account === 'DEV_GB_MULTI') {
        // Tile 1: Pay in 3 → PAY_LATER_SHORT_TERM
        await switchViews(2, 'shortTerm');

        // Tile 2: Pay in 30 Days → PAY_LATER_PAY_IN_1
        await switchViews(3, 'payIn1');
    } else {
        // Switch to pay in 1 view
        await switchViews(2, 'payIn1');
    }
};

/**
 * Ensures that the starting amount is shared between views.
 */
export const viewsShareAmount = async (contentWindow, testName, account) => {
    // Disable CSS animations/transitions so the entrance animation doesn't intercept tile clicks
    await settleModalRendering(contentWindow);
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${tile}:nth-child(2)`);
    await contentWindow.evaluate(selector => document.querySelector(selector).click(), `${tile}:nth-child(2)`);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2 * 1000)));

    await contentWindow.waitForSelector(`${headerContent} > ${subheadlineContent}`);
    const subheadline = await contentWindow.$eval(subheadlineContent, element => element.innerText);

    // waitForFunction checks pure DOM presence (no viewport-visibility requirement),
    // then scrollIntoView ensures the button is reachable before clicking.
    // LongTerm and other content-heavy views can push #productListLink below the fold.
    await contentWindow.waitForFunction(
        selector => !!document.querySelector(selector),
        { timeout: 30000 },
        productList
    );
    await contentWindow.evaluate(selector => {
        const el = document.querySelector(selector);
        el.scrollIntoView({ block: 'center' });
        el.click();
    }, productList);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2 * 1000)));

    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${tile}:nth-child(3)`);
    await contentWindow.evaluate(selector => document.querySelector(selector).click(), `${tile}:nth-child(3)`);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3 * 1000)));

    // FR long term and GB Pay in 30 Days modals do not have a calculator
    if (account !== 'DEV_FR_MULTI' && account !== 'DEV_GB_MULTI') {
        await contentWindow.waitForSelector(input);
        const inputFieldVal = await contentWindow.$eval(input, element => element.value);
        expect(subheadline).not.toContain(inputFieldVal);
    }
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures that the modal close button works as expected.
 */
export const closeModalViaXBtn = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(close);

    await contentWindow.click(close);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
};

/**
 * Ensures that the modal closes upon hitting the Esc key.
 */
export const closeModalViaEscKey = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await page.keyboard.press('Escape');
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
};

/**
 * Ensures that the modal closes upon clicking on the overlay.
 */
export const closeModalViaOverlay = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(overlay);

    await contentWindow.click(overlay);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
};

/**
 * Ensures that the modal can be reopened after closing.
 */
export const closeAndReopenModal = async (contentWindow, integration, messageContentWindow = '') => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(close);

    await contentWindow.click(close);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    if (integration === 'standalone') {
        const learnMoreButton = await page.waitForSelector(standaloneLearnMore);
        await learnMoreButton.click();
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    } else {
        await messageContentWindow.waitForSelector(messageMessaging);
        await messageContentWindow.click(messageMessaging);

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    }
};
