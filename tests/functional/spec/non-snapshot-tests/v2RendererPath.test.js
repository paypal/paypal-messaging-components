import setupTestPage from '../utils/setupTestPage';

// Verifies the v2 (CPS v6-style) renderer path end-to-end: the demo page loads through the
// existing dev-server proxy, the banner iframe/container becomes visible, and the dev-proxy's
// `data-test-v2-*` markers confirm the v2 renderer (not legacy v5) actually handled the request
// with the representative style options we passed in.
describe('v2 renderer path', () => {
    const config = {
        account: 'DEV_US_SHORT_TERM',
        amount: 0,
        style: {
            layout: 'text',
            logo: { type: 'primary', position: 'left' },
            text: { color: 'black' }
        },
        features: 'useRenderV2Message'
    };

    test('renders via the v2 path and reports the requested style', async () => {
        page.on('pageerror', error => {
            // eslint-disable-next-line no-console
            console.log(`v2RendererPath.test page error`, error);
        });

        const { bannerElement } = await setupTestPage({ config, testPage: 'banner.html' });
        const bannerFrame = await bannerElement.contentFrame();
        const messaging = await bannerFrame.waitForSelector('.message__messaging', { visible: true });

        const usedV2Renderer = await messaging.evaluate(el => el.getAttribute('data-test-v2-renderer'));
        expect(usedV2Renderer).toBe('true');

        const layoutMarker = await messaging.evaluate(el => el.getAttribute('data-test-v2-layout'));
        expect(layoutMarker).toBe('text');

        const styleMarker = await messaging.evaluate(el => JSON.parse(el.getAttribute('data-test-v2-style')));
        expect(styleMarker).toMatchObject({
            layout: 'text',
            color: 'black',
            logoType: 'primary',
            logoPosition: 'left'
        });
    });
});
