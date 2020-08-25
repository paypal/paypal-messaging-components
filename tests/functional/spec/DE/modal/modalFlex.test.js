import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';

const account = 'DEV0000000IAZ';

describe.each([
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('DE Modal Functionality Tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle
        });
    });

    const groupString = getGroupString({ viewport, bannerStyle });

    test(`x button closes modal ${groupString}`, xClosesModal(account, viewport, bannerStyle));
    test(`close modal on escape key press ${groupString}`, closeModalEsc(account, viewport, bannerStyle));
    if (viewport.height === 1080) {
        test(`close modal on click outside ${groupString}`, clickOutsideClosesModal(account, viewport, bannerStyle));
    }
    test(
        `after modal close, modal can reopen and close again ${groupString}`,
        closeReopenModal(account, viewport, bannerStyle)
    );
});
