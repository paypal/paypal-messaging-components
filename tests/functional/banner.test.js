import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

test('text banners', async () => {
    await page.goto('http://localhost.paypal.com:8080/banner.html?config={"account":"DEV00000000NI","style":{}}');

    await new Promise(resolve => setTimeout(resolve, 3000));

    const image = await page.screenshot(
        {
            clip: {
                x: 0,
                y: 0,
                width: 900,
                height: 100
            }
        },
        3
    );

    expect(image).toMatchImageSnapshot({
        customSnapshotsDir: './tests/functional/snapshots',
        customSnapshotIdentifier: `container`
    });
});
