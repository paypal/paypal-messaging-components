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
    const [country, integration, account, amount, testName, viewport = 'desktop'] = testNameParts.split('-');
    const viewportDimensions = screenDimensions[viewport] || screenDimensions.desktop;

    const modalDimensions = await contentWindow.$eval(contentWrapper, element => {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        };
    });

    const frameElement = await contentWindow.frameElement();
    const frameDimensions = frameElement ? await frameElement.boundingBox() : null;

    let snapshotDimensions = {
        x: 0,
        y: 0,
        width: viewportDimensions.width,
        height: viewportDimensions.height
    };

    if (frameDimensions && modalDimensions.width > 0 && modalDimensions.height > 0) {
        const x = Math.max(0, Math.round(frameDimensions.x + modalDimensions.x));
        const y = Math.max(0, Math.round(frameDimensions.y + modalDimensions.y));
        const width = Math.max(1, Math.round(modalDimensions.width));
        const height = Math.max(1, Math.round(modalDimensions.height));

        snapshotDimensions = {
            x,
            y,
            width: Math.min(width, Math.max(1, viewportDimensions.width - x)),
            height: Math.min(height, Math.max(1, viewportDimensions.height - y))
        };
    }

    logScreenshot({ name: testNameParts, viewport: snapshotDimensions });

    const image = await page.screenshot({ clip: snapshotDimensions }, 3);

    const matchFunction = screenDimensions[viewport].width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/v2/snapshots/modal/${integration}/${country}/${account}/${viewport}`,
        customSnapshotIdentifier: `${amount}-${testName}-${viewport}-snap`
    });
};
