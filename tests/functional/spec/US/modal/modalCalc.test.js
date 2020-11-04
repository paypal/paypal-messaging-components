import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts, getGroupString } from '../../utils/testStylesConfig';
import { nonQualErrorEZP, ezpFinanceTerms, updateFinanceTerms, ezpModalContent } from './us_modalTestDefs';

const account = 'DEV0000000PSZ';

describe.each([
    // desktop, text
    [viewports[0], bannerStyles[0], amounts[0]],
    [viewports[0], bannerStyles[0], amounts[1]],
    [viewports[0], bannerStyles[0], amounts[2]],
    [viewports[0], bannerStyles[0], amounts[3]],
    // mobile, text
    [viewports[1], bannerStyles[0], amounts[0]],
    [viewports[1], bannerStyles[0], amounts[1]],
    [viewports[1], bannerStyles[0], amounts[2]],
    [viewports[1], bannerStyles[0], amounts[3]],
    // desktop, flex
    [viewports[0], bannerStyles[1], amounts[0]],
    [viewports[0], bannerStyles[1], amounts[1]],
    [viewports[0], bannerStyles[1], amounts[2]],
    [viewports[0], bannerStyles[1], amounts[3]],
    // mobile, flex
    [viewports[1], bannerStyles[1], amounts[0]],
    [viewports[1], bannerStyles[1], amounts[1]],
    [viewports[1], bannerStyles[1], amounts[2]],
    [viewports[1], bannerStyles[1], amounts[3]]
])('EZP modal calculator tests %o', (viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ viewport, amount, bannerStyle });

    test(
        `${groupString} show error message when entering a non-qualifying amount inside calculator`,
        nonQualErrorEZP({ account, viewport, groupString })
    );
    test(
        `${groupString} when amount is passed to EZP message, correct financing terms load in table`,
        ezpFinanceTerms({ account, viewport, groupString })
    );
    test(
        `${groupString} update finance terms when user updates amount passed into calculator`,
        updateFinanceTerms({ account, viewport, groupString })
    );
    test(
        `${groupString} clicking EZP message loads EZP content with calculator for finance terms`,
        ezpModalContent({ account, viewport, groupString })
    );
});
