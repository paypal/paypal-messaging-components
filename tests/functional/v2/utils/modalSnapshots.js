import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { logScreenshot } from './logging';
import { selectors } from './selectors';
import { screenDimensions } from './setup';

const {
    modal: { contentWrapper }
} = selectors;

const toMatchLargeSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

const toMatchSmallSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.003,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchLargeSnapshot, toMatchSmallSnapshot });

export const modalSnapshot = async (testNameParts, contentWindow) => {
    const modalDimensions = await contentWindow.$eval(contentWrapper, element => ({
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.clientWidth,
        height: element.clientHeight
    }));

    const [country, integration, account, amount, testName, viewport = 'desktop'] = testNameParts.split('-');

    const snapshotDimensions = modalDimensions.height > 0 ? modalDimensions : { ...viewport, x: 0, y: 0 };

    logScreenshot({ name: testNameParts, viewport: snapshotDimensions });

    const image = await page.screenshot({ clip: snapshotDimensions }, 3);

    const matchFunction = screenDimensions[viewport].width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/v2/snapshots/modal/${integration}/${country}/${account}/${viewport}`,
        customSnapshotIdentifier: `${amount}-${testName}-${viewport}`
    });
};
