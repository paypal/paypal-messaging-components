import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';

// TODO: Remove INST when GPL ramp is complete
const instAccount = 'DEV0000000IAZ';

describe.each([
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]],
    [viewports[0], bannerStyles[0]],
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('DE Modal Functionality Tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account: instAccount,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ account: instAccount, viewport, bannerStyle });

    test(`${groupString} x button closes modal`, xClosesModal({ account: instAccount, viewport, groupString }));
    test(
        `${groupString} close modal on escape key press`,
        closeModalEsc({ account: instAccount, viewport, groupString })
    );
    if (viewport.height === 1080) {
        test(
            `${groupString} close modal on click outside`,
            clickOutsideClosesModal({ account: instAccount, viewport, groupString })
        );
    }
    test(
        `${groupString} after modal close, modal can reopen and close again`,
        closeReopenModal({ account: instAccount, viewport, groupString })
    );
});

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
