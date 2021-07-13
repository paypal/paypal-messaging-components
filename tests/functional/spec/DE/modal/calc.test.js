import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, amounts, getGroupString } from '../../utils/testStylesConfig';
import { nonQualErrorMsgInst, updateFinanceTermsInst, deModalContentAndCalcInst } from './deInst_modalTestDefs';
import { nonQualErrorMsg, updateFinanceTerms, deModalContentAndCalc } from './de_modalTestDefs';

// TODO: Remove INST when GPL ramp is complete
const instAccount = 'DEV0000000IAZ';

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
])('DE Modal Calculator Tests %o', (viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account: instAccount,
            amount,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ account: instAccount, bannerStyle, viewport, amount });

    test(
        `${groupString} show error when entering a non-qualifying amount in the calculator`,
        nonQualErrorMsgInst({ account: instAccount, viewport, groupString })
    );
    test(
        `${groupString} update finance terms when user updates amount in calculator`,
        updateFinanceTermsInst({ account: instAccount, viewport, groupString })
    );
    test(
        `${groupString} passing amount to DE installment message loads correct finance terms in table`,
        deModalContentAndCalcInst({ account: instAccount, viewport, groupString })
    );
});

const account = 'DEV000DEPLEQZ';

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
])('DE GPL Modal Calculator Tests %o', (viewport, bannerStyle, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ account, bannerStyle, viewport, amount });

    test(
        `${groupString} show error when entering a non-qualifying amount in the calculator`,
        nonQualErrorMsg({ account, viewport, groupString })
    );
    test(
        `${groupString} update finance terms when user updates amount in calculator`,
        updateFinanceTerms({ account, viewport, groupString })
    );
    test(
        `${groupString} passing amount to DE installment message loads correct finance terms in table`,
        // Modal content changes based on initial amount
        deModalContentAndCalc({ account, viewport, groupString, amount })
    );
});
