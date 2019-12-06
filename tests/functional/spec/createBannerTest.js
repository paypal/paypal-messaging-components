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

const getTestNameParts = (locale, { account, style: { layout, ...style } }) => {
    const styleStr = getConfigStr(style);

    return [locale, account, layout, styleStr];
};

const waitForBanner = async timeout => {
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
    } catch (e) {
        // Do nothing
    }
};

export default function createBannerTest(viewport, locale, legacy = false) {
    return config => {
        const testNameParts = getTestNameParts(locale, config);
        test(testNameParts.slice(-1)[0], async () => {
            const testPage = legacy ? 'legacy_banner.html' : 'banner.html';
            await page.goto(`http://localhost.paypal.com:8080/${testPage}?config=${JSON.stringify(config)}`);

            await waitForBanner(1000);

            await new Promise(resolve => setTimeout(resolve, 500));

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

            const customSnapshotIdentifier = testNameParts.pop();
            expect(image).toMatchImageSnapshot({
                customSnapshotsDir: ['./tests/functional/snapshots', ...testNameParts].join('/'),
                customSnapshotIdentifier
            });
        });
    };
}
