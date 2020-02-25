import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { openModal } from '../../us_initalizeModal';
import { viewports, bannerStyles, amounts } from '../../utils/testStylesConfig';
import { nonQualErrorEZP, ezpFinanceTerms, updateFinanceTerms, ezpModalContent } from '../../utils/us_ModalTestDefs';

const account = 'DEV0000000PSZ';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

describe.each([
    [viewports[0], amounts[0]],
    [viewports[0], amounts[1]],
    [viewports[0], amounts[2]],
    [viewports[0], amounts[3]],
    [viewports[1], amounts[0]],
    [viewports[1], amounts[1]],
    [viewports[1], amounts[2]],
    [viewports[1], amounts[3]]
])('EZP modal calculator tests %o %i', (viewport, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: {
                layout: bannerStyles.layout,
                logo: {
                    position: bannerStyles.position,
                    type: bannerStyles.type
                }
            }
        });
    });
    test(
        'show error message when entering a non-qualifying amount inside the calculator',
        nonQualErrorEZP(account, viewport, bannerStyles)
    );
    test(
        'when an amount is passed into EZP message, the correct financing terms are loaded in a table',
        ezpFinanceTerms(account, viewport, bannerStyles)
    );
    test(
        'update finance terms when user updates amount passed into calculator',
        updateFinanceTerms(account, viewport, bannerStyles)
    );
    test(
        'when an ezp message is clicked ezp content is loaded including a calculator for finance terms',
        ezpModalContent(account, viewport, bannerStyles)
    );
    afterEach(async () => {
        // eslint-disable-next-line no-undef
        await jestPuppeteer.resetPage();
    });
});
