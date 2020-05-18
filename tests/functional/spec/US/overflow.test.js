const loadMessage = async () => {
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.goto(`http://localhost.paypal.com:8080/overflow-test.html`);
    await page.waitFor(1000);
};

describe('Test message fallback and hiding mechanisms', () => {
    beforeEach(async () => {
        await loadMessage();
    });
    it('attemps a fallback message on container overflow', async () => {
        const overflowSelector = '.message-overflow-test';
        await page.waitForSelector(overflowSelector);
        const overflowMessage = await page.evaluate(
            _overflowSelector =>
                document.querySelector(`${_overflowSelector} > span > iframe`).style.minWidth === '167px',
            overflowSelector
        );

        expect(overflowMessage).toEqual(true);
    });
    it('hides message when fallback message overflows', async () => {
        const hideSelector = '.message-hide-test';
        await page.waitForSelector(hideSelector);
        const hideMessage = await page.evaluate(
            _hideSelector =>
                document.querySelector(`${_hideSelector} > span > iframe`).dataset.ppMessageHidden === 'true' &&
                document.querySelector(`${_hideSelector} > span`).style.display === 'none',
            hideSelector
        );

        expect(hideMessage).toEqual(true);
    });
});
