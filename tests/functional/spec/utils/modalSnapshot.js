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
    // eslint-disable-next-line no-console
    console.log(`Taking screenshot of [${testNameParts}] with dimensions ${JSON.stringify(viewport)}`);

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

    // replace double colons with underscores, and replace spaces and colons with dashes
    const customSnapshotIdentifier = testNameParts.replace(':: ', '_').replace(/[ :]/g, '-');
    let locale = 'US';

    if (account.includes('IAZ')) {
        locale = 'DE';
    } else if (account.includes('GBPL')) {
        locale = 'GB';
    } else if (account.includes('FRPL')) {
        locale = 'FR';
    }

    expect(image).toMatchImageSnapshot({
        customSnapshotsDir: `./tests/functional/snapshots/${locale}/${account}/modal`,
        customSnapshotIdentifier
    });
};

export default modalSnapshot;
