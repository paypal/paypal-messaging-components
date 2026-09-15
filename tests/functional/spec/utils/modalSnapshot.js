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
    await modalFrame.waitForSelector(selectors.modal.wrapper, { visible: true });

    await modalFrame.waitForFunction(
        ({ wrapperSelector, contentSelector }) => {
            const wrapperEl = document.querySelector(wrapperSelector);
            const contentEl = document.querySelector(contentSelector);

            if (!wrapperEl || !contentEl) {
                return false;
            }

            const rect = contentEl.getBoundingClientRect();
            if (rect.width < 50 || rect.height < 50) {
                return false;
            }

            const text = (wrapperEl.innerText || '').replace(/\s+/g, ' ').trim();
            if (text.length < 30 || /^learn more$/i.test(text)) {
                return false;
            }

            const meaningfulContent = wrapperEl.querySelector(
                'h1, h2, .content-body, .instructions, .calculator, .button.content__row'
            );

            return Boolean(meaningfulContent);
        },
        {
            polling: 50,
            timeout: 8000
        },
        {
            wrapperSelector: selectors.modal.wrapper,
            contentSelector: selectors.modal.contentBackground
        }
    );

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

    if (account.includes('IAZ') || account.includes('PI30')) {
        locale = 'DE';
    } else if (account.includes('PL')) {
        const regexLocale = account.match(/(..)PL/);
        // 0G is what appears before PL on US accounts
        // as long as it's not 0G (US), set locale to be what the regex found
        if (regexLocale !== '0G') {
            [, locale] = regexLocale;
        }
    }

    const matchFunction = viewport.width > 500 ? 'toMatchLargeSnapshot' : 'toMatchSmallSnapshot';
    expect(image)[matchFunction]({
        customSnapshotsDir: `./tests/functional/snapshots/${locale}/${account}/modal`,
        customSnapshotIdentifier
    });
};

export default modalSnapshot;
