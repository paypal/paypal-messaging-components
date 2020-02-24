import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { openModal } from '../../de_initalizeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import {
    xClosesModal,
    closeModalEsc,
    clickOutsideClosesModal,
    closeReopenModal
} from '../../utils/globalModalTestDefs';

const accounts = 'DEV0000000IAZ';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

describe.each([
    [accounts, viewports[0], bannerStyles[0]],
    [accounts, viewports[1], bannerStyles[0]]
])('DE Modal Functionality Tests %o', (account, viewport, bannerStyle) => {
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
    afterEach(async () => {
        // eslint-disable-next-line no-undef
        await jestPuppeteer.resetPage();
    });
});
