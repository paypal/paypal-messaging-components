import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { selectProductsFromList, switchProducts } from './de_modalTestDefs';

const account = 'DEV000DEPLEQZ';

describe.each([
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]],
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('DE GPL Modal Functionality Tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ account, viewport, bannerStyle });

    test(`${groupString} x button closes modal`, xClosesModal({ account, viewport, groupString }));
    test(`${groupString} close modal on escape key press`, closeModalEsc({ account, viewport, groupString }));
    if (viewport.height === 1080) {
        test(
            `${groupString} close modal on click outside`,
            clickOutsideClosesModal({ account, viewport, groupString })
        );
    }
    test(
        `${groupString} after modal close, modal can reopen and close again`,
        closeReopenModal({ account, viewport, groupString })
    );
});

const pi30Account = 'DEV000DEPI30Q';

describe.each([
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]],
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('DE Pi30 Modal Functionality Tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account: pi30Account,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ account: pi30Account, viewport, bannerStyle });

    test(`${groupString} x button closes modal`, xClosesModal({ account: pi30Account, viewport, groupString }));
    test(
        `${groupString} close modal on escape key press`,
        closeModalEsc({ account: pi30Account, viewport, groupString })
    );
    if (viewport.height === 1080) {
        test(
            `${groupString} close modal on click outside`,
            clickOutsideClosesModal({ account: pi30Account, viewport, groupString })
        );
    }
    test(
        `${groupString} after modal close, modal can reopen and close again`,
        closeReopenModal({ account: pi30Account, viewport, groupString })
    );
});

// For dually-eligible GPL and Pi30 accounts
const multiprodAccount = 'DEV000DEMULTI';

describe.each([
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]],
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('DE Multiproduct (Pi30 and GPL) Modal Functionality Tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account: multiprodAccount,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ account: multiprodAccount, viewport, bannerStyle });

    test(`${groupString} x button closes modal`, xClosesModal({ account: multiprodAccount, viewport, groupString }));
    test(
        `${groupString} close modal on escape key press`,
        closeModalEsc({ account: multiprodAccount, viewport, groupString })
    );
    if (viewport.height === 1080) {
        test(
            `${groupString} close modal on click outside`,
            clickOutsideClosesModal({ account: multiprodAccount, viewport, groupString })
        );
    }
    test(
        `${groupString} after modal close, modal can reopen and close again`,
        closeReopenModal({ account: multiprodAccount, viewport, groupString })
    );

    describe('Product-switching functionality tests', () => {
        test(
            `${groupString} Product List button-clicks change view to their respective products`,
            selectProductsFromList({ account: multiprodAccount, viewport, groupString })
        );

        test(
            `${groupString} Switch-text link-clicks toggle displayed product`,
            switchProducts({ account: multiprodAccount, viewport, groupString })
        );
    });
});
