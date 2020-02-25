/**
 * The purpose of this function is to click on the message and open the modal. openModal runs beforeEach US modal test.
 */
export const openModal = async (viewport, config, testPage = 'modal-test.html') => {
    await page.setViewport(viewport);
    await page.goto(`http://localhost.paypal.com:8080/${testPage}?config=${JSON.stringify(config)}`);

    await page.waitForSelector('.banner-1 iframe', { visible: true });
    await page.waitForSelector("iframe[title='paypal_credit_modal']");

    const elementHandle = await page.$('.banner-1 iframe');
    const elementModal = await page.$("iframe[title='paypal_credit_modal']");

    const frame = await elementHandle.contentFrame();
    const modalFrame = await elementModal.contentFrame();

    await frame.waitForSelector('.message__messaging', { visible: true });
    await modalFrame.waitForSelector('.content-body');
    await frame.click('.message__messaging');

    /**
     * The below function evaluates which modal iframe is *not* set to display:none, then execute the
     * openModal func beforeEach test.
     */

    await page.waitForFunction(() =>
        Array.from(document.querySelectorAll("iframe[title='paypal_credit_modal']")).find(
            el => el.parentElement.parentElement.style.display !== 'none'
        )
    );
};

export const modalSnapshot = (testNameParts, viewport, image, account) => {
    const _testNameParts = testNameParts.replace(/( )/g, '-');
    const customSnapshotIdentifier = `${_testNameParts}-${viewport.width}`;
    expect(image).toMatchImageSnapshot({
        customSnapshotsDir: `./tests/functional/snapshots/US/${account}/modal`,
        customSnapshotIdentifier
    });
};
