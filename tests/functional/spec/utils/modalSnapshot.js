import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

const modalSnapshot = async (testNameParts, viewport, account) => {
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

    const _testNameParts = testNameParts.replace(/( )/g, '-');
    const customSnapshotIdentifier = `${_testNameParts}-${viewport.width}`;
    const locale = account.includes('IAZ') ? 'DE' : 'US';
    expect(image).toMatchImageSnapshot({
        customSnapshotsDir: `./tests/functional/snapshots/${locale}/${account}/modal`,
        customSnapshotIdentifier
    });
};

export default modalSnapshot;
