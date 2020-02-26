import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import openModal from '../../us_initalizeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import { niContentTest } from '../../utils/us_modalTestingDefs';

const account = 'DEV00000000NI';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

describe.each([
    [viewports[0], bannerStyles[1]],
    [viewports[1], bannerStyles[1]]
])('NI modal tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: {
                layout: bannerStyle.layout,
                ratio: bannerStyle.ratio,
                color: bannerStyle.color
            }
        });
    });
    test(
        `NI content is loaded when NI message is clicked - ${viewport.width} ${bannerStyle.layout}`,
        niContentTest(account, viewport, bannerStyle)
    );
    afterEach(async () => {
        // eslint-disable-next-line no-undef
        await jestPuppeteer.resetPage();
    });
});
