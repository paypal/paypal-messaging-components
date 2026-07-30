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

const waitForModalReady = async contentWindow => {
    await contentWindow.waitForFunction(
        wrapperSelector => {
            const modalEl = document.querySelector(wrapperSelector);
            if (!modalEl) {
                return false;
            }

            const modalRect = modalEl.getBoundingClientRect();
            if (modalRect.width < 50 || modalRect.height < 50) {
                return false;
            }

            const text = (modalEl.innerText || '').replace(/\s+/g, ' ').trim();
            if (text.length < 30 || /^learn more$/i.test(text)) {
                return false;
            }

            const meaningfulContent = modalEl.querySelector(
                'h1, h2, .content__row, .offer__container, .tile, .instructions, .cta, .button'
            );

            return Boolean(meaningfulContent);
        },
        {
            polling: 50,
            timeout: 8000
        },
        contentWrapper
    );
};

export const modalSnapshot = async (testNameParts, contentWindow) => {
    const [country, integration, account, amount, testName, viewport = 'desktop'] = testNameParts.split('-');
    const viewportDimensions = screenDimensions[viewport] || screenDimensions.desktop;

    await waitForModalReady(contentWindow);

    const modalElement = await contentWindow.$(contentWrapper);
    if (!modalElement) {
        throw new Error(`Unable to locate modal content wrapper for ${testNameParts}`);
    }

    await modalElement.evaluate(element => {
        element.scrollIntoView({ block: 'center', inline: 'center' });
    });

    const box = await modalElement.boundingBox();
    const snapshotDimensions = box
        ? {
              x: Math.max(0, Math.round(box.x)),
              y: Math.max(0, Math.round(box.y)),
              width: Math.max(1, Math.round(box.width)),
              height: Math.max(1, Math.round(box.height))
          }
        : {
              x: 0,
              y: 0,
              width: viewportDimensions.width,
              height: viewportDimensions.height
          };

    logScreenshot({ name: testNameParts, viewport: snapshotDimensions });

    const image = await modalElement.screenshot();

    const matchFunction = screenDimensions[viewport].width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/v2/snapshots/modal/${integration}/${country}/${account}/${viewport}`,
        customSnapshotIdentifier: `${amount}-${testName}-${viewport}-snap`
    });
};
