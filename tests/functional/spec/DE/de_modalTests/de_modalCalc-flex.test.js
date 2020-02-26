import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import openModal from '../../de_initalizeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import { nonQualErrorMsg, updateFinanceTerms, deModalContentAndCalc } from '../../utils/de_modalTestDefs';

const account = 'DEV0000000IAZ';

// FIXME: Add amounts to this suite inside describe.each
// const amounts = [1, 10000, undefined, 500];

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

describe.each([
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('DE Modal Calculator Tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: {
                layout: bannerStyle.layout,
                ratio: bannerStyle.ratio,
                color: bannerStyle.color
            }
        });
    });
    test(
        `show error message when entering a non-qualifying amount inside the calculator ${bannerStyle.layout} ${viewport.width}`,
        nonQualErrorMsg(account, viewport, bannerStyle)
    );
    test(
        `update finance terms when user updates amount passed into calculator ${bannerStyle.layout} ${viewport.width}`,
        updateFinanceTerms(account, viewport, bannerStyle)
    );
    test(
        `when an amount is passed into DE PP installments message, the correct financing terms are loaded in a table ${bannerStyle.layout} ${viewport.width}`,
        deModalContentAndCalc(account, viewport, bannerStyle)
    );
    afterEach(async () => {
        // eslint-disable-next-line no-undef
        await jestPuppeteer.resetPage();
    });
});
