import { selectors, modalSnapshot } from '../utils/index';

const {
    modal: { contentWrapper, headerContent, h2 }
} = selectors;

/**
 * Ensures pay in 1 view opens and has expected content.
 */
export const openPayIn1View = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${headerContent} > ${h2}`);
    const subheadline = await contentWindow.$eval(h2, element => element.innerText);

    expect(subheadline).toContain(modalContent.subheadline);
    await modalSnapshot(testName, contentWindow);
};
