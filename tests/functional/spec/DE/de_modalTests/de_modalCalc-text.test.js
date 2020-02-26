import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import openModal from '../../de_initalizeModal';
import { viewports, bannerStyles, amounts } from '../../utils/testStylesConfig';
import { nonQualErrorMsg, updateFinanceTerms, deModalContentAndCalc } from '../../utils/de_modalTestDefs';

const account = 'DEV0000000IAZ';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

describe.each([
    [viewports[0], bannerStyles[0], amounts[0]],
    [viewports[0], bannerStyles[0], amounts[1]],
    [viewports[0], bannerStyles[0], amounts[2]],
    [viewports[0], bannerStyles[0], amounts[3]],
    [viewports[1], bannerStyles[0], amounts[0]],
    [viewports[1], bannerStyles[0], amounts[1]],
    [viewports[1], bannerStyles[0], amounts[2]],
    [viewports[1], bannerStyles[0], amounts[3]]
])('DE Modal Calculator Tests %o', (viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: {
                layout: bannerStyle.layout,
                logo: {
                    position: bannerStyle.position,
                    type: bannerStyle.type
                }
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
