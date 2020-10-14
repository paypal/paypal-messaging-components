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

const waitForBanner = async ({ testName, timeout }) => {
    try {
        await page.waitForFunction(
            () => {
                const iframe = document.querySelector('[data-pp-id] iframe');
                if (iframe) {
                    const iframeBody = iframe.contentWindow.document.body;
                    const banner = iframeBody.querySelector('.message__container');
                    return banner && banner.clientHeight > 0;
                }

                const legacyBanner = document.querySelector('div[role="button"].message');
                return legacyBanner && legacyBanner.clientHeight > 0;
            },
            {
                polling: 10,
                timeout
            }
        );

        // Give time for fonts to load after banner is rendered
        await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.warn(`waitForBanner error for [${testName}]`, error); // eslint-disable-line no-console
    }
};

export default function createBannerTest(locale, testPage = 'banner.html') {
    return (viewport, config) => {
        const testNameParts = getTestNameParts(locale, config);
        const testName = testNameParts.join('/');
        test(testName, async () => {
            // Outputs current test so CI does not stall
            // eslint-disable-next-line no-console
            console.info(`Running test [${testName}], with viewport [${JSON.stringify(viewport)}]`);
            await page.setViewport(viewport);

            const waitForNavPromise = page.waitForNavigation({ waitUntil: 'networkidle0' });
            await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);
            await waitForNavPromise;

            await waitForBanner({ testName, timeout: 2000 });

            const image = await page.screenshot(
                {
                    clip: {
                        ...viewport,
                        x: 0,
                        y: 0
                    }
                },
                3
            );

            const customSnapshotIdentifier = `${testNameParts.pop()}-${viewport.width}`;
            expect(image).toMatchImageSnapshot({
                customSnapshotsDir: ['./tests/functional/snapshots', ...testNameParts].join('/'),
                customSnapshotIdentifier
            });
        });
    };
}
