import { selectors, modalSnapshot } from '../utils/index';

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
    const switchViews = async (childNum, viewName) => {
        await contentWindow.waitForSelector(contentWrapper);
        await contentWindow.waitForSelector(`${tile}:nth-child(${childNum})`);
        await contentWindow.click(`${tile}:nth-child(${childNum})`);
        await page.waitFor(2 * 1000);

        await contentWindow.waitForSelector(`${headerContent} > ${h2}`);
        const headline = await contentWindow.$eval(h2, element => element.innerText);
        expect(headline).toContain(modalContent[viewName]);

        await contentWindow.waitForSelector(productList);
        await contentWindow.click(productList);
        await page.waitFor(2 * 1000);
    };

    if (account !== 'DEV_DE_MULTI') {
        // Switch to long term view
        await switchViews(2, 'shortTerm');

        // Switch to short term view
        await switchViews(3, 'longTerm');

        // Switch to no interest view.
        // NOTE: PPC NI tile is separated from the pay later tiles as a means to distinguish product categories in the product list modal.
        await switchViews(5, 'noInterest');
    } else {
        // Switch to pay in 1 view
        await switchViews(2, 'payIn1');
    }
};

/**
 * Ensures that the starting amount is shared between views.
 */
export const viewsShareAmount = async (contentWindow, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${tile}:nth-child(2)`);
    await contentWindow.click(`${tile}:nth-child(2)`);
    await page.waitFor(2 * 1000);

    await contentWindow.waitForSelector(`${headerContent} > ${subheadlineContent}`);
    const subheadline = await contentWindow.$eval(subheadlineContent, element => element.innerText);

    await contentWindow.waitForSelector(productList);
    await contentWindow.click(productList);
    await page.waitFor(2 * 1000);

    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${tile}:nth-child(3)`);
    await contentWindow.click(`${tile}:nth-child(3)`);
    await page.waitFor(3 * 1000);

    await contentWindow.waitForSelector(input);
    const inputFieldVal = await contentWindow.$eval(input, element => element.value);

    expect(subheadline).not.toContain(inputFieldVal);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures that the modal close button works as expected.
 */
export const closeModalViaXBtn = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(close);

    await contentWindow.click(close);
    await page.waitFor(1000);
};

/**
 * Ensures that the modal closes upon hitting the Esc key.
 */
export const closeModalViaEscKey = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await page.keyboard.press('Escape');
    await page.waitFor(1000);
};

/**
 * Ensures that the modal closes upon clicking on the overlay.
 */
export const closeModalViaOverlay = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(overlay);

    await contentWindow.click(overlay);
    await page.waitFor(1000);
};

/**
 * Ensures that the modal can be reopened after closing.
 */
export const closeAndReopenModal = async (contentWindow, integration, messageContentWindow = '') => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(close);

    await contentWindow.click(close);
    await page.waitFor(1000);

    if (integration === 'standalone') {
        const learnMoreButton = await page.waitForSelector(standaloneLearnMore);
        await learnMoreButton.click();
        await page.waitFor(1000);
    } else {
        await messageContentWindow.waitForSelector(messageMessaging);
        await messageContentWindow.click(messageMessaging);

        await page.waitFor(1000);
    }
};
