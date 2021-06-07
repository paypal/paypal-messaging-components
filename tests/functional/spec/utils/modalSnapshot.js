import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { logScreenshot } from './logging';
import selectors from './selectors';

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

const modalSnapshot = async (testNameParts, viewport, account) => {
    const elementModal = await page.$(selectors.modal.iframe);
    const modalFrame = await elementModal.contentFrame();
    const modalDimensions = await modalFrame.$eval(selectors.modal.contentBackground, element => ({
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.clientWidth,
        height: element.clientHeight
    }));

    const snapshotDimensions = modalDimensions.height > 0 ? modalDimensions : { ...viewport, x: 0, y: 0 };

    logScreenshot({ name: testNameParts, viewport: snapshotDimensions });

    const image = await page.screenshot({ clip: snapshotDimensions }, 3);

    // replace double colons with underscores, and replace spaces and colons with dashes
    const customSnapshotIdentifier = testNameParts.replace(':: ', '_').replace(/[ :]/g, '-');
    let locale = 'US';

    if (account.includes('PL')) {
        const regexLocale = account.match(/(..)PL/);
        // 0G is what appears before PL on US accounts
        // as long as it's not 0G (US), set locale to be what the regex found
        if (regexLocale !== '0G') {
            [, locale] = regexLocale;
        }
    } else if (account.includes('IAZ')) {
        locale = 'DE';
    }

    const matchFunction = viewport.width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/snapshots/${locale}/${account}/modal`,
        customSnapshotIdentifier
    });
};

export default modalSnapshot;
