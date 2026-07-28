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
        const result = await page.waitForFunction(
            ({ bannerSelectors, _testName, _timeout, useIframeBodyDimensions: useBodyDims, startedAt }) => {
                if (Date.now() - startedAt >= _timeout - 2000 && !window.__waitForBannerLogged) {
                    window.__waitForBannerLogged = true;
                    // eslint-disable-next-line no-console
                    console.info(`waitForBanner innerHTML for failed test [${_testName}]`, document.body.innerHTML);
                }

                const iframe = document.querySelector(bannerSelectors.iframeByAttribute);
                if (iframe) {
                    // Iframe can exist before its document/body is ready; do not throw.
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                    const iframeBody = iframeDoc?.body;
                    if (!iframeBody) {
                        return false;
                    }

                    if (useBodyDims) {
                        return (
                            iframeBody.clientHeight > 0 && {
                                height: iframeBody.clientHeight,
                                width: iframeBody.clientWidth
                            }
                        );
                    }

                    const banner = iframeBody.querySelector(bannerSelectors.container);
                    return (
                        banner?.clientHeight > 0 && {
                            height: banner.clientHeight,
                            width: banner.clientWidth
                        }
                    );
                }

                const legacy = document.querySelector(bannerSelectors.legacyContainer);
                return (
                    legacy?.clientHeight > 0 && {
                        height: legacy.clientHeight,
                        width: legacy.clientWidth
                    }
                );
            },
            {
                polling,
                timeout
            },
            {
                bannerSelectors: selectors.banner,
                _testName: testName,
                _timeout: timeout,
                useIframeBodyDimensions,
                startedAt: Date.now()
            }
        );

        // Give time for fonts to load after banner is rendered
        await new Promise(resolve => setTimeout(resolve, 500));
        return await result.jsonValue();
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
        const testNameParts = getTestNameParts(locale, config);
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

                await setupPageForBanner(viewport, config, testPage);

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
                const customSnapshotIdentifier = `${testNameParts.pop()}-${viewport.width}-snap`;
                expect(image)[matchFunction]({
                    diffDirection: snapshotDimensions.width > snapshotDimensions.height ? 'vertical' : 'horizontal',
                    customSnapshotsDir: ['./tests/functional/snapshots', ...testNameParts].join('/'),
                    customSnapshotIdentifier
                });
            });
        });
    };
}
