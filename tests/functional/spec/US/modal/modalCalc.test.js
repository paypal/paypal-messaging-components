import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts, getGroupString } from '../../utils/testStylesConfig';
import { nonQualErrorEZP, ezpFinanceTerms, updateFinanceTerms, ezpModalContent } from './us_modalTestDefs';

const account = 'DEV0000000PSZ';

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
            style: bannerStyles
        });
    });

    const groupString = getGroupString({ viewport, amount });

    test(
        `show error message when entering a non-qualifying amount inside the calculator ${groupString}`,
        nonQualErrorEZP(account, viewport, bannerStyles)
    );
    test(
        `when an amount is passed into EZP message, the correct financing terms are loaded in a table ${groupString}`,
        ezpFinanceTerms(account, viewport, bannerStyles)
    );
    test(
        `update finance terms when user updates amount passed into calculator ${groupString}`,
        updateFinanceTerms(account, viewport, bannerStyles)
    );
    test(
        `when an ezp message is clicked ezp content is loaded including a calculator for finance terms ${groupString}`,
        ezpModalContent(account, viewport, bannerStyles)
    );
});
