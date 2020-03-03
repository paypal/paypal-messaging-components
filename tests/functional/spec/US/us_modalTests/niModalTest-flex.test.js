// import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import openModal from '../../us_initalizeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import { niContentTest } from '../../utils/us_modalTestDefs';

const account = 'DEV00000000NI';

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
});
