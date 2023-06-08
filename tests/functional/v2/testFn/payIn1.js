import { selectors, modalSnapshot } from '../utils/index';

const {
    modal: { contentWrapper, headerContent, subheadlineContent }
} = selectors;

/**
 * Ensures pay in 1 view opens and has expected content.
 */
export const openPayIn1View = async (contentWindow, modalContent, testName) => {
    await contentWindow.waitForSelector(contentWrapper);
    await contentWindow.waitForSelector(`${headerContent} > ${subheadlineContent}`);
    const subheadline = await contentWindow.$eval(subheadlineContent, element => element.innerText);

    expect(subheadline).toContain(modalContent.subheadline);
    await modalSnapshot(testName, contentWindow);
};
