import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts } from '../../utils/testStylesConfig';
import { nonQualErrorEZP, ezpFinanceTerms, updateFinanceTerms, ezpModalContent } from './us_modalTestDefs';

const account = 'DEV0000000PSZ';

describe.skip.each([
    [viewports[0], amounts[0], bannerStyles[0]],
    [viewports[0], amounts[1], bannerStyles[0]],
    [viewports[0], amounts[2], bannerStyles[0]],
    [viewports[0], amounts[3], bannerStyles[0]],
    [viewports[1], amounts[0], bannerStyles[0]],
    [viewports[1], amounts[1], bannerStyles[0]],
    [viewports[1], amounts[2], bannerStyles[0]],
    [viewports[1], amounts[3], bannerStyles[0]]
])('EZP modal calculator tests %o %i', (viewport, amount, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: bannerStyle
        });
    });
    test(
        'show error message when entering a non-qualifying amount inside the calculator',
        nonQualErrorEZP(account, viewport, bannerStyle)
    );
    test(
        'when an amount is passed into EZP message, the correct financing terms are loaded in a table',
        ezpFinanceTerms(account, viewport, bannerStyle)
    );
    test(
        'update finance terms when user updates amount passed into calculator',
        updateFinanceTerms(account, viewport, bannerStyle)
    );
    test(
        'when an ezp message is clicked ezp content is loaded including a calculator for finance terms',
        ezpModalContent(account, viewport, bannerStyle)
    );
});
