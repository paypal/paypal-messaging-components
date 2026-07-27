import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { logScreenshot } from './logging';
import { selectors } from './selectors';
import { screenDimensions } from './setup';
import { assertNonBlankPng } from '../../utils/assertNonBlankPng';

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

    const clip = await contentWindow.evaluate(wrapperSelector => {
        const modalEl = document.querySelector(wrapperSelector);
        if (!modalEl) {
            return null;
        }

        const modalRect = modalEl.getBoundingClientRect();
        const frameEl = window.frameElement;
        const frameRect = frameEl ? frameEl.getBoundingClientRect() : { left: 0, top: 0 };

        return {
            x: frameRect.left + modalRect.left,
            y: frameRect.top + modalRect.top,
            width: modalRect.width,
            height: modalRect.height
        };
    }, contentWrapper);

    let snapshotDimensions = {
        x: 0,
        y: 0,
        width: viewportDimensions.width,
        height: viewportDimensions.height
    };

    if (clip && clip.width > 0 && clip.height > 0) {
        const x = Math.max(0, Math.round(clip.x));
        const y = Math.max(0, Math.round(clip.y));
        const width = Math.max(1, Math.round(clip.width));
        const height = Math.max(1, Math.round(clip.height));

        snapshotDimensions = {
            x,
            y,
            width: Math.min(width, Math.max(1, viewportDimensions.width - x)),
            height: Math.min(height, Math.max(1, viewportDimensions.height - y))
        };
    }

    logScreenshot({ name: testNameParts, viewport: snapshotDimensions });

    const image = await page.screenshot({ clip: snapshotDimensions }, 3);
    assertNonBlankPng({ image, context: testNameParts });

    const matchFunction = screenDimensions[viewport].width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/v2/snapshots/modal/${integration}/${country}/${account}/${viewport}`,
        customSnapshotIdentifier: `${amount}-${testName}-${viewport}-snap`
    });
};
