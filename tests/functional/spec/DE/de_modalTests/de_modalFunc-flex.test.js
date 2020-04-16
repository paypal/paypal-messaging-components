import openModal from '../../initializeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import {
    xClosesModal,
    closeModalEsc,
    clickOutsideClosesModal,
    closeReopenModal
} from '../../utils/globalModalTestDefs';

const deAccount = 'DEV0000000IAZ';

describe.each([
    [deAccount, viewports[0], bannerStyles[1]],
    [deAccount, viewports[1], bannerStyles[1]]
])('DE Modal Functionality Tests %o', (account, viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle
        });
    });
    test(
        `x button closes modal - ${bannerStyle.layout} ${viewport.width}`,
        xClosesModal(account, viewport, bannerStyle)
    );
    test(
        `close modal on escape key press - ${bannerStyle.layout} ${viewport.width}`,
        closeModalEsc(account, viewport, bannerStyle)
    );
    if (viewport.height === 1080) {
        test(
            `close modal on click outside - ${bannerStyle.layout} ${viewport.width}`,
            clickOutsideClosesModal(account, viewport, bannerStyle)
        );
    }
    test(
        `after modal close, modal can reopen and close again - ${bannerStyle.layout} ${viewport.width}`,
        closeReopenModal(account, viewport, bannerStyle)
    );
});
