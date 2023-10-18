import openModal from '../../utils/initializeModal';
import { viewports, getGroupString } from '../../utils/testStylesConfig';
import { xClosesModal, closeModalEsc, clickOutsideClosesModal, closeReopenModal } from '../../globalModalTestDefs';
import { clickHereSeeTerms, applyNowBtn, switchTabs } from './us_modalTestDefs';

const accounts = ['DEV0000000PSZ'];

describe.each([
    [accounts[0], viewports[0]],
    [accounts[0], viewports[1]]
])('US EZP basic standalone modal functionality tests %o', (account, viewport) => {
    beforeEach(async () => {
        await openModal(viewport, { account }, 'modal-standalone.html');
    });

    const groupString = getGroupString({ viewport, bannerStyle: { layout: 'standalone-modal' } });

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
        closeReopenModal({ account, viewport, groupString, standalone: true })
    );

    test(
        `${groupString} click here inside modal takes user to see terms page`,
        clickHereSeeTerms({ account, viewport, groupString })
    );
    test(
        `${groupString} apply now button opens browser to credit application login`,
        applyNowBtn({ account, viewport, groupString })
    );
    if (account === 'DEV0000000PSZ') {
        test(`${groupString} EZP content by clicking tabs`, switchTabs({ account, viewport, groupString }));
    }
});
