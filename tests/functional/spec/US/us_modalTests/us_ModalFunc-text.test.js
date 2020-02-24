import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { openModal } from '../../us_initalizeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import {
    xClosesModal,
    closeModalEsc,
    clickOutsideClosesModal,
    closeReopenModal
} from '../../utils/globalModalTestDefs';
import { clickHereSeeTerms, applyNowBtn } from '../../utils/us_ModalTestDefs';

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
            style: {
                layout: bannerStyle.layout,
                logo: {
                    position: bannerStyle.position,
                    type: bannerStyle.type
                }
            }
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
    // FIXME: Not showing up in test results
    if (viewport.height === '1080') {
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
    // FIXME: Validate Apply Now button exists
    test(
        `apply now button opens browser to credit application login - ${bannerStyle.layout} ${viewport.width}`,
        applyNowBtn(account, viewport, bannerStyle)
    );
});
const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });
