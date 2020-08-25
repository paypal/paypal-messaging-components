import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { clickHereSeeTerms, applyNowBtn, niContentTest } from './us_modalTestDefs';

const account = 'DEV00000000NI';

describe.each([
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('US EZP and NI basic modal functionality tests %o', (viewport, bannerStyle) => {
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

    test(
        `click here inside modal takes user to see terms page ${groupString}`,
        clickHereSeeTerms(account, viewport, bannerStyle)
    );
    test(
        `apply now button opens browser to credit application login ${groupString}`,
        applyNowBtn(account, viewport, bannerStyle)
    );
    test(
        `NI content is loaded when NI message is clicked ${groupString}`,
        niContentTest(account, viewport, bannerStyle)
    );
});
