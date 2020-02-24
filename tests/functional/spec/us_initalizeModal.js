/**
 * The purpose of this function is to click on the message and open the modal. openModal runs beforeEach US modal test.
 */
export const openModal = async (viewport, config, testPage = 'modal-test.html') => {
    await page.setViewport(viewport);
    await page.goto(`http://localhost.paypal.com:8080/${testPage}?config=${JSON.stringify(config)}`);

    await page.waitForSelector('[data-pp-id] iframe', { visible: true });
    await page.waitForSelector("iframe[title='paypal_credit_modal']");

    const elementHandle = await page.$('[data-pp-id] iframe');
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

    const frame = await elementHandle.contentFrame();
    const modalFrame = await elementModal.contentFrame();

    await frame.waitForSelector('.message__messaging', { visible: true });
    await modalFrame.waitForSelector('.content-body');
    await frame.click('.message__messaging');

    /**
     * FIXME:
     * https://github.com/puppeteer/puppeteer/issues/4356
     * NOTE: Puppeteer on some occassions does not detect that the modal is open, even if it is visible on screen,
     * as evidenced by snapshots. This is causing intermittent failures on certain permutations on a couple of tests.
     */

    await page.waitForSelector("iframe[title='paypal_credit_modal']", { visible: true });
};

/**
 * Modal-specific snapshot config.
 */

export const modalSnapshot = (testNameParts, viewport, image, account) => {
    const _testNameParts = testNameParts.replace(/( )/g, '-');
    const customSnapshotIdentifier = `${_testNameParts}-${viewport.width}`;
    // console.log(customSnapshotIdentifier);
    expect(image).toMatchImageSnapshot({
        customSnapshotsDir: `./tests/functional/snapshots/US/${account}/modal`,
        customSnapshotIdentifier
    });
};
