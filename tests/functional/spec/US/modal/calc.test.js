import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts, getGroupString } from '../../utils/testStylesConfig';
import { updateFinanceTerms } from './us_modalTestDefs';

const account = 'DEV_US_MULTI';

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
    [viewports[0], bannerStyles[1], amounts[0]]
])('modal calculator tests %o', (viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ viewport, amount, bannerStyle });

    test(
        `${groupString} update finance terms when user updates amount passed into calculator`,
        updateFinanceTerms({ account, viewport, groupString })
    );
});
