import openModal from '../../initializeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import {
    xClosesModal,
    closeModalEsc,
    clickOutsideClosesModal,
    closeReopenModal
} from '../../utils/globalModalTestDefs';
import { clickHereSeeTerms, applyNowBtn, switchTabs } from '../../utils/us_modalTestDefs';

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

    test(
        `click here inside modal takes user to see terms page - ${bannerStyle.layout} ${viewport.width}`,
        clickHereSeeTerms(account, viewport, bannerStyle)
    );
    test(
        `apply now button opens browser to credit application login - ${bannerStyle.layout} ${viewport.width}`,
        applyNowBtn(account, viewport, bannerStyle)
    );
    if (account === 'DEV0000000PSZ') {
        test(
            `switch between EZP and NI content by clicking tabs - ${bannerStyle.layout} ${viewport.width}`,
            switchTabs(account, viewport, bannerStyle)
        );
    }
});
