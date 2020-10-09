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

const waitForBanner = async ({ configString, testName, timeout }) => {
    try {
        await page.waitForFunction(
            () => {
                const el = document.querySelector('[data-pp-id] iframe');
                return el && el.clientHeight !== 0;
            },
            {
                polling: 10,
                timeout
            }
        );

        // Give time for fonts to load after banner is rendered
        await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.warn(`waitForBanner error for test [${testName}] with config: [${configString}]`, error); // eslint-disable-line no-console
    }
};

export default function createBannerTest(locale, testPage = 'banner.html') {
    return (viewport, config) => {
        const testNameParts = getTestNameParts(locale, config);
        test(testNameParts.slice(-1)[0], async () => {
            // clone config so later code doesn't change the logged string
            const configString = JSON.stringify({ account: config.account, ...viewport, ...config.style });

            await page.setViewport(viewport);

            await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${configString}`);

            await waitForBanner({ configString, testName: testNameParts.join('/'), timeout: 1000 });

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
