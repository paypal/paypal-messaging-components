/* istanbul ignore file */
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { logScreenshot, logTestName } from './utils/logging';
import selectors from './utils/selectors';

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
        const polling = 10;
        const result = await page.waitForFunction(
            ({ bannerSelectors, _testName, _polling, _timeout }) => {
                Window.timeTaken = (Window.timeTaken || 0) + _polling;
                if (Window.timeTaken % 1000 === 0 && Window.timeTaken >= _timeout - 2000) {
                    // eslint-disable-next-line no-console
                    console.info(`waitForBanner innerHTML for failed test [${_testName}]`, document.body.innerHTML);
                }

                const iframe = document.querySelector(bannerSelectors.iframeByAttribute);
                if (iframe) {
                    const iframeBody = iframe.contentWindow.document.body;
                    const banner = iframeBody.querySelector(bannerSelectors.container);
                    if (config?.style?.text?.align) {
                        return (
                            iframeBody?.clientHeight && {
                                height: iframeBody.clientHeight,
                                width: iframeBody.clientWidth
                            }
                        );
                    }
                    return banner?.clientHeight && { height: banner.clientHeight, width: banner.clientWidth };
                }

                const legacy = document.querySelector(bannerSelectors.legacyContainer);
                return legacy?.clientHeight && { height: legacy.clientHeight, width: legacy.clientWidth };
            },
            {
                polling,
                timeout
            },
            {
                bannerSelectors: selectors.banner,
                _testName: testName,
                _polling: polling,
                _timeout: timeout
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

export default function createBannerTest(locale, testPage = 'banner.html') {
    return (viewport, config) => {
        const testNameParts = getTestNameParts(locale, config);
        const testName = testNameParts.join('/');
        test(testName, async () => {
            page.on('console', message => {
                const text = message.text();

                if (text.includes('waitForBanner')) {
                    // eslint-disable-next-line no-console
                    console.log(text);
                }
            });
            page.on('pageerror', error => {
                // TODO: find a way to re-launch the browser on error so tests can continue
                // eslint-disable-next-line no-console
                console.log(`banner page error for [${testName}]`, error);
            });

            logTestName({ testName, viewport });

            await page.evaluateOnNewDocument(setWindowDimensions, viewport);
            await page.setViewport(viewport);

            const waitForNavPromise = page.waitForNavigation({ waitUntil: 'networkidle0' });
            await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);
            await waitForNavPromise;

            const bannerDimensions = await waitForBanner({ testName, timeout: 2 * 1000, config });
            expect(bannerDimensions.height).toBeGreaterThan(0);
            expect(bannerDimensions.width).toBeGreaterThan(0);

            // pad text banners to account for variation in size
            const paddedDimensions = {
                height: padDimension(bannerDimensions.height),
                width: padDimension(bannerDimensions.width)
            };
            const snapshotDimensions = config?.style?.layout === 'text' ? paddedDimensions : bannerDimensions;

            logScreenshot({ name: testName, viewport: snapshotDimensions });
            const image = await page.screenshot(
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
                customSnapshotsDir: ['./tests/functional/snapshots', ...testNameParts].join('/'),
                customSnapshotIdentifier
            });
        });
    };
}
