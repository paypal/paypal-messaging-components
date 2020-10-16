/* istanbul ignore file */
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

const getConfigStrParts = (obj, keyPrefix = '') => {
    return Object.entries(obj).reduce((accumulator, [key, val]) => {
        const totalKey = keyPrefix === '' ? key : `${keyPrefix}.${key}`;
        if (typeof val === 'object') return [...accumulator, ...getConfigStrParts(val, totalKey)];

        // Do not include the markup url in filename
        if (key === 'markup') return accumulator;

        return [...accumulator, `${totalKey}-${val}`];
    }, []);
};

const getConfigStr = obj =>
    getConfigStrParts(obj)
        .sort()
        .join('_');

const getTestNameParts = (locale, { account, amount, style: { layout, ...style } }) => {
    // eslint-disable-next-line no-param-reassign
    if (amount) style = { ...style, amount };
    const styleStr = getConfigStr(style);

    return [locale, account, layout, styleStr];
};

// returns height and width of banner in pixels
const waitForBanner = async ({ testName, timeout }) => {
    try {
        // selectors must remain as strings because puppeteer will not understand babel transforms for imports
        const result = await page.waitForFunction(
            () => {
                const iframe = document.querySelector('[data-pp-id] iframe');
                if (iframe) {
                    const iframeBody = iframe.contentWindow.document.body;
                    const banner = iframeBody.querySelector('.message__container');
                    return banner?.clientHeight && { height: banner.clientHeight, width: banner.clientWidth };
                }

                const legacy = document.querySelector('div[role="button"].message');
                return legacy?.clientHeight && { height: legacy.clientHeight, width: legacy.clientWidth };
            },
            {
                polling: 10,
                timeout
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

export default function createBannerTest(locale, testPage = 'banner.html') {
    return (viewport, config) => {
        const testNameParts = getTestNameParts(locale, config);
        const testName = testNameParts.join('/');
        test(testName, async () => {
            // Outputs current test so CI does not stall
            // eslint-disable-next-line no-console
            console.info(`Running test [${testName}], with viewport ${JSON.stringify(viewport)}`);
            await page.setViewport(viewport);

            const waitForNavPromise = page.waitForNavigation({ waitUntil: 'networkidle0' });
            await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);
            await waitForNavPromise;

            const bannerDimensions = await waitForBanner({ testName, timeout: 2000 });
            expect(bannerDimensions.height).toBeGreaterThan(0);
            expect(bannerDimensions.width).toBeGreaterThan(0);

            // pad text banners to account for variation in size
            const paddedDimensions = {
                height: padDimension(bannerDimensions.height),
                width: padDimension(bannerDimensions.width)
            };
            const snapshotDimensions = config.layout === 'text' ? paddedDimensions : bannerDimensions;

            // eslint-disable-next-line no-console
            console.log(`Taking screenshot of [${testName}] with dimensions ${JSON.stringify(snapshotDimensions)}`);
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

            const customSnapshotIdentifier = `${testNameParts.pop()}-${viewport.width}`;
            expect(image).toMatchImageSnapshot({
                diffDirection: snapshotDimensions.width > snapshotDimensions.height ? 'vertical' : 'horizontal',
                customSnapshotsDir: ['./tests/functional/snapshots', ...testNameParts].join('/'),
                customSnapshotIdentifier
            });
        });
    };
}
