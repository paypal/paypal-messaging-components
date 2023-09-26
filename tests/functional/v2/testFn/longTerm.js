import { selectors, modalSnapshot } from '../utils/index';

const {
    modal: { contentWrapper },
    longTerm: {
        calculator: { errorContainer, input },
        offerCard: { offerContainer, offerRow, offerField },
        OfferAccordion: {
            openAccordion,
            accordionHeaderContainer,
            accordionFieldHeader,
            accordionCollapsible,
            accordionRow,
            accordionFieldValue
        },
        button: { checkoutCta }
    }
} = selectors;

/**
 * Ensures the below threshold calcultor warning displays for amounts below the minimum qualifying amount.
 */
export const belowThresholdErr = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(errorContainer);
    const amountErr = await contentWindow.$eval(errorContainer, element => element.innerText);
    expect(amountErr).toContain(modalContent.belowMinAmountErr);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures the above threshold calcultor warning displays for amounts above the maximum qualifying amount.
 */
export const aboveThresholdErr = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(errorContainer);
    const amountErr = await contentWindow.$eval(errorContainer, element => element.innerText);
    expect(amountErr).toContain(modalContent.aboveMaxAmountErr);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures offer card headline is correct for given amount.
 */
export const showCorrectOfferInfo = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${offerRow}:first-child`);
    const offerFieldHeadline = await contentWindow.$eval(offerRow, element => element.innerText);
    const newOfferFieldHeadline = offerFieldHeadline.replace('month.', '').replace(/\n/g, '');
    expect(newOfferFieldHeadline).toContain(modalContent.offerHeadline);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures offer breakdown information is correct for given amount.
 */
export const showCorrectOfferBreakdown = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${offerContainer}:first-child`);

    const offerValuesArr = await contentWindow.$$eval(
        `${offerContainer}:first-child > ${offerRow}:nth-child(2) > ${offerField}`,
        elements => Array.from(elements).map(element => Array.from(element.childNodes)[1].innerText)
    );

    expect(offerValuesArr).toEqual(modalContent.offerFieldValues);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures offer card information is correct after entering a new value in the calculator.
 */
export const updateTermsViaCalc = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(input);
    await contentWindow.click(input, { clickCount: 3 });
    await contentWindow.type(input, '500', { delay: 100 });

    await page.waitFor(3 * 1000);

    await contentWindow.waitForSelector(`${offerRow}:first-child`);
    const offerFieldHeadline = await contentWindow.$eval(offerRow, element => element.innerText);
    const newOfferFieldHeadline = offerFieldHeadline.replace('month.', '').replace(/\n/g, '');
    expect(newOfferFieldHeadline).toContain(modalContent.updatedOfferHeadline);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures the correct checkout CTA button content is shown.
 */
export const showCorrectXOButtonContent = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(checkoutCta);
    const checkoutButtonContent = await contentWindow.$eval(checkoutCta, element => element.innerText);
    expect(checkoutButtonContent).toContain(modalContent.cta);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures the correct APR disclaimer is shown.
 */
export const showCorrectAPRDisclaimer = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${offerRow}:first-child`);
    const offerFieldHeadline = await contentWindow.$eval(offerRow, element => element.innerText);
    const newOfferFieldHeadline = offerFieldHeadline.replace('month.', '').replace(/\n/g, '');
    expect(newOfferFieldHeadline).toContain(modalContent.offerHeadline);
    await modalSnapshot(testName, contentWindow);
};

/**
 * NOTE: The test definitions below are used if the long term view is utilizing the offer accordion component rather than the offer cards.
 * i.e. DE Long Term Installments
 */

/**
 * Ensures offer accordion headline is correct for given amount.
 */
export const showCorrectOfferInfoAccordion = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(openAccordion);
    await contentWindow.waitForSelector(accordionHeaderContainer);
    const accordionOfferFieldHeadline = await contentWindow.$eval(accordionFieldHeader, element => element.innerText);
    const newOfferFieldHeadline = accordionOfferFieldHeadline.replace('month.', '').replace(/\n/g, '');
    expect(newOfferFieldHeadline).toContain(modalContent.offerHeadline);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures offer accordion breakdown information is correct for given amount.
 */
export const showCorrectOfferBreakdownAccordion = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(openAccordion);

    const offerValuesArr = await contentWindow.$$eval(
        `${openAccordion} > ${accordionCollapsible} > ${accordionRow} > ${accordionFieldValue}`,
        elements => Array.from(elements).map(element => element.innerText)
    );

    expect(offerValuesArr).toEqual(modalContent.offerFieldValues);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures offer accordion information is correct after entering a new value in the calculator.
 */
export const updateOfferAccordionTermsViaCalc = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(input);
    await contentWindow.click(input, { clickCount: 3 });
    await contentWindow.type(input, '500', { delay: 100 });

    await page.waitFor(3 * 1000);

    await contentWindow.waitForSelector(openAccordion);
    await contentWindow.waitForSelector(accordionHeaderContainer);
    const accordionOfferFieldHeadline = await contentWindow.$eval(accordionFieldHeader, element => element.innerText);
    const newOfferFieldHeadline = accordionOfferFieldHeadline.replace('month.', '').replace(/\n/g, '');
    expect(newOfferFieldHeadline).toContain(modalContent.updatedOfferHeadline);
    await modalSnapshot(testName, contentWindow);
};
