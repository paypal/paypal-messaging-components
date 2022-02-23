afterEach(async () => {
    await jestPuppeteer.resetPage();
    page.removeAllListeners();
});
