import openModal from '../../initializeModal';
import { viewports, bannerStyles } from '../../utils/testStylesConfig';
import { niContentTest } from '../../utils/us_modalTestDefs';

const account = 'DEV00000000NI';

describe.each([
    [viewports[0], bannerStyles[0]],
    [viewports[1], bannerStyles[0]]
])('NI modal tests %o', (viewport, bannerStyle) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            style: bannerStyle
        });
    });
    test(
        `NI content is loaded when NI message is clicked - ${viewport.width} ${bannerStyle.layout}`,
        niContentTest(account, viewport, bannerStyle)
    );
});
