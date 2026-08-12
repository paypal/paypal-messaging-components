/* istanbul ignore file */
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { logScreenshot, logTestName } from './utils/logging';
import selectors from './utils/selectors';

const { launch: puppeteerLaunchConfig } = require('../../../jest-puppeteer.config');

const toMatchTextSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.004,
    customDiffConfig: {
        threshold: 0.05
    }
});

const toMatchFlexSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.005,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchTextSnapshot, toMatchFlexSnapshot });

const isV2RendererMode = () => process.env.BANNER_SNAPSHOT_MODE === 'v2Renderer';

const getBannerSnapshotRoot = () =>
    isV2RendererMode() ? './tests/functional/snapshots/v2Renderer' : './tests/functional/snapshots';

const getConfigStrParts = (obj, keyPrefix = '') => {
    return Object.entries(obj).reduce((accumulator, [key, val]) => {
        const totalKey = keyPrefix === '' ? key : `${keyPrefix}.${key}`;
        if (typeof val === 'object') return [...accumulator, ...getConfigStrParts(val, totalKey)];

        // Do not include the markup url in filename
        if (key === 'markup') return accumulator;

        return [...accumulator, `${totalKey}-${val}`];
    }, []);
};

const getConfigStr = obj => getConfigStrParts(obj).sort().join('_');

const getTestNameParts = (locale, { account, amount, style: { layout, ...style } }) => {
    // eslint-disable-next-line no-param-reassign
    if (amount) style = { ...style, amount };
    const styleStr = getConfigStr(style);

    return [locale, account, layout, styleStr];
};

// returns height and width of banner in pixels
const waitForBanner = async ({ testName, timeout, config }) => {
    try {
        const polling = 100;
        // Must pass into the page function — closures are not available in waitForFunction.
        const useIframeBodyDimensions = Boolean(config?.style?.text?.align);
        // Outer-page measurement for v2Renderer flex: Puppeteer headless doesn't propagate
        // CSS-driven iframe viewport resizes into the iframe context.
        const isFlexLayout = isV2RendererMode() && config?.style?.layout === 'flex';

        // Step 1: sync predicate — Puppeteer 2.x + newer Chrome only polls with sync
        // functions; async predicates return a truthy Promise and never retry.
        await page.waitForFunction(
            ({ bannerSelectors, isFlex, useBodyDims, _testName, _timeout, startedAt }) => {
                if (Date.now() - startedAt >= _timeout - 2000 && !window.__waitForBannerLogged) {
                    window.__waitForBannerLogged = true;
                    // eslint-disable-next-line no-console
                    console.info(`waitForBanner innerHTML for failed test [${_testName}]`, document.body.innerHTML);
                }

                const iframe = document.querySelector(bannerSelectors.iframeByAttribute);

                if (isFlex) {
                    return Boolean(iframe && iframe.clientHeight > 0);
                }

                if (!iframe) {
                    const legacy = document.querySelector(bannerSelectors.legacyContainer);
                    return Boolean(legacy && legacy.clientHeight > 0);
                }

                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                const iframeBody = iframeDoc?.body;
                if (!iframeBody) return false;

                const measureEl = useBodyDims ? iframeBody : iframeBody.querySelector(bannerSelectors.container);
                return Boolean(measureEl && measureEl.clientHeight > 0);
            },
            { polling, timeout },
            {
                bannerSelectors: selectors.banner,
                isFlex: isFlexLayout,
                useBodyDims: useIframeBodyDimensions,
                _testName: testName,
                _timeout: timeout,
                startedAt: Date.now()
            }
        );

        // Step 2: banner has positive height — wait for fonts/images then read stable dimensions.
        return await page.evaluate(
            async ({ bannerSelectors, isFlex, useBodyDims }) => {
                const iframe = document.querySelector(bannerSelectors.iframeByAttribute);
                let measureEl;
                let measureDoc;

                if (isFlex) {
                    measureEl = iframe;
                    measureDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
                } else if (iframe) {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    measureDoc = iframeDoc;
                    measureEl = useBodyDims
                        ? iframeDoc?.body
                        : iframeDoc?.body?.querySelector(bannerSelectors.container);
                } else {
                    measureEl = document.querySelector(bannerSelectors.legacyContainer);
                    measureDoc = document;
                }

                if (!measureEl) return { height: null, width: null };

                if (measureDoc?.fonts?.ready) await measureDoc.fonts.ready;

                const incompleteImages = Array.from(measureDoc?.images || []).filter(img => !img.complete);
                if (incompleteImages.length > 0) {
                    await Promise.all(
                        incompleteImages.map(
                            img =>
                                new Promise(resolve => {
                                    img.addEventListener('load', resolve, { once: true });
                                    img.addEventListener('error', resolve, { once: true });
                                })
                        )
                    );
                }

                await new Promise(resolve => {
                    requestAnimationFrame(() => requestAnimationFrame(resolve));
                });

                return { height: measureEl.clientHeight, width: measureEl.clientWidth };
            },
            { bannerSelectors: selectors.banner, isFlex: isFlexLayout, useBodyDims: useIframeBodyDimensions }
        );
    } catch (error) {
        console.warn(`waitForBanner error for [${testName}]`, error); // eslint-disable-line no-console
    }

    return { height: null, width: null };
};

const padDimension = number => 10 * Math.ceil(number / 10) + 5;

function setWindowDimensions({ width, height }) {
    window.outerWidth = width;
    window.outerHeight = height;
}

const isClosedSessionError = error => {
    const message = error && error.message ? error.message : '';

    return (
        message.includes('Session closed') ||
        message.includes('Target.closeTarget') ||
        message.includes('No target with given id found')
    );
};

const ensureFreshPage = async () => {
    const activeBrowser = global.browser;
    if (!activeBrowser || (typeof activeBrowser.isConnected === 'function' && !activeBrowser.isConnected())) {
        const puppeteerModule = await import('puppeteer');
        const relaunchedBrowser = await puppeteerModule.default.launch(puppeteerLaunchConfig);
        global.browser = relaunchedBrowser;
    }

    try {
        if (global.page && !global.page.isClosed()) {
            await global.page.close();
        }
    } catch (error) {
        if (!isClosedSessionError(error)) {
            throw error;
        }
    }

    const nextPage = await global.browser.newPage();
    global.page = nextPage;
};

const setupPageForBanner = async (viewport, config, testPage) => {
    await global.page.evaluateOnNewDocument(setWindowDimensions, viewport);
    await global.page.setViewport(viewport);

    await global.page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`, {
        waitUntil: 'networkidle0'
    });
};

const runWithPageRecovery = async runner => {
    try {
        return runner();
    } catch (error) {
        if (!isClosedSessionError(error)) {
            throw error;
        }

        await ensureFreshPage();
        return runner();
    }
};

export default function createBannerTest(locale, testPage = 'banner.html') {
    return (viewport, config) => {
        const bannerConfig = config;
        const testNameParts = getTestNameParts(locale, bannerConfig);
        const testName = testNameParts.join('/');
        test(testName, async () => {
            await runWithPageRecovery(async () => {
                await ensureFreshPage();

                global.page.on('console', message => {
                    const text = message.text();

                    if (text.includes('waitForBanner')) {
                        // eslint-disable-next-line no-console
                        console.log(text);
                    }
                });
                global.page.on('pageerror', error => {
                    // TODO: find a way to re-launch the browser on error so tests can continue
                    // eslint-disable-next-line no-console
                    console.log(`banner page error for [${testName}]`, error);
                });

                logTestName({ testName, viewport });

                // Route through the v2 renderer when in v2Renderer mode.
                const pageConfig = isV2RendererMode() ? { ...config, features: 'useRenderV2Message' } : config;
                await setupPageForBanner(viewport, pageConfig, testPage);

                const bannerDimensions = await waitForBanner({ testName, timeout: 10 * 1000, config });
                expect(bannerDimensions.height).toBeGreaterThan(0);
                expect(bannerDimensions.width).toBeGreaterThan(0);

                // pad text banners to account for variation in size
                const paddedDimensions = {
                    height: padDimension(bannerDimensions.height),
                    width: padDimension(bannerDimensions.width)
                };
                const snapshotDimensions = config?.style?.layout === 'text' ? paddedDimensions : bannerDimensions;

                logScreenshot({ name: testName, viewport: snapshotDimensions });
                const image = await global.page.screenshot(
                    {
                        clip: {
                            ...snapshotDimensions,
                            x: 0,
                            y: 0
                        }
                    },
                    3
                );

                const matchFunction = config?.style?.layout === 'text' ? 'toMatchTextSnapshot' : 'toMatchFlexSnapshot';
                const customSnapshotIdentifier = `${testNameParts.pop()}-${viewport.width}`;
                expect(image)[matchFunction]({
                    diffDirection: snapshotDimensions.width > snapshotDimensions.height ? 'vertical' : 'horizontal',
                    customSnapshotsDir: [getBannerSnapshotRoot(), ...testNameParts].join('/'),
                    customSnapshotIdentifier
                });
            });
        });
    };
}
