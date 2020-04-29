import openModal from '../../initializeModal';
import { viewports, bannerStyles, amounts } from '../../utils/testStylesConfig';
import { nonQualErrorMsg, updateFinanceTerms, deModalContentAndCalc } from '../../utils/de_modalTestDefs';

const account = 'DEV0000000IAZ';

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
            style: bannerStyle
        });
    });
    test.skip(
        `show error message when entering a non-qualifying amount inside the calculator ${bannerStyle.layout} ${viewport.width}`,
        nonQualErrorMsg(account, viewport, bannerStyle)
    );
    test.skip(
        `update finance terms when user updates amount passed into calculator ${bannerStyle.layout} ${viewport.width}`,
        updateFinanceTerms(account, viewport, bannerStyle)
    );
    test.skip(
        `when an amount is passed into DE PP installments message, the correct financing terms are loaded in a table ${bannerStyle.layout} ${viewport.width}`,
        deModalContentAndCalc(account, viewport, bannerStyle)
    );
});
