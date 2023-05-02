import { selectors, modalSnapshot } from '../utils/index';

const {
    modal: { contentWrapper, contentRow, headerContent, subheadlineContent },
    shortTerm: {
        donuts: { periodicPayment }
    }
} = selectors;

/**
 * Ensures short term view opens and has expected content.
 */
export const openShortTermView = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${headerContent} > ${subheadlineContent}`);
    const subheadline = await contentWindow.$eval(subheadlineContent, element => element.innerText);

    expect(subheadline).toContain(modalContent.subheadline);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures that the payment donuts component shows correct periodic payment information when qualifying,
 * and no payment information when non-qualifying.
 */
export const donutsShowCorrectPayment = async (amount, minAmount, maxAmount, contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(contentRow);

    if (amount < minAmount || amount > maxAmount) {
        const periodicPaymentEl = await contentWindow.evaluate(donutSelector => {
            return document.querySelector(donutSelector);
        }, periodicPayment);
        expect(periodicPaymentEl).toBeNull();
        await modalSnapshot(testName, contentWindow);
    } else {
        const periodicPaymentEl = await contentWindow.$eval(periodicPayment, element => element.innerText);
        expect(periodicPaymentEl).toBe(modalContent.periodicPayment);
        await modalSnapshot(testName, contentWindow);
    }
};
