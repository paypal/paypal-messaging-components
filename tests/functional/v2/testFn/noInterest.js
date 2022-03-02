import { selectors, modalSnapshot } from '../utils/index';

const {
    modal: { contentWrapper, instructions, instructionsItemWrapper, div },
    noInterest: {
        button: { termsLink, applyNowBtn }
    }
} = selectors;

/**
 * Ensures no interest modal opens and has expected content.
 */
export const openNoInterestView = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(instructions);
    const instructionsDivSelector = `${instructionsItemWrapper}:first-child > ${div}:last-child`;
    await contentWindow.waitForSelector(instructionsDivSelector);

    const numberedBullet = await contentWindow.$eval(instructionsDivSelector, element => element.innerText);
    expect(numberedBullet).toContain(modalContent);
    await modalSnapshot(testName, contentWindow);
};

/**
 * Ensures T&Cs page opens upon clicking link in modal.
 */
export const openTermsPage = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(termsLink);
    await contentWindow.evaluate(() => {
        document.querySelector('a').scrollIntoView();
    });
    await contentWindow.click(termsLink);
    await page.waitFor(2 * 1000);
};

/**
 * Ensures credit application login page opens upon clicking the Apply Now button.
 */
export const openCreditApplicationLogin = async contentWindow => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(applyNowBtn);
    await contentWindow.click(applyNowBtn);
    await page.waitFor(3 * 1000);
};
