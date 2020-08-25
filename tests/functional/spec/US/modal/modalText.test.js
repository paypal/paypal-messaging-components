import openModal from '../../utils/initializeModal';
import { viewports, bannerStyles, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { clickHereSeeTerms, applyNowBtn, switchTabs, niContentTest } from './us_modalTestDefs';

const accounts = ['DEV00000000NI', 'DEV0000000PSZ'];

describe.each([
    [accounts[0], viewports[0], bannerStyles[0]],
    [accounts[0], viewports[1], bannerStyles[0]],
    [accounts[1], viewports[0], bannerStyles[0]],
    [accounts[1], viewports[1], bannerStyles[0]]
])('US EZP and NI basic modal functionality tests %o', (account, viewport, bannerStyle) => {
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
    if (account === 'DEV0000000PSZ') {
        test(
            `switch between EZP and NI content by clicking tabs ${groupString}`,
            switchTabs(account, viewport, bannerStyle)
        );
    }
    if (account === 'DEV00000000NI') {
        test(
            `NI content is loaded when NI message is clicked ${groupString}`,
            niContentTest(account, viewport, bannerStyle)
        );
    }
});
