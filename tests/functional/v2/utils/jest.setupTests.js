const ensureLivePage = async () => {
    if (!page || page.isClosed()) {
        const nextPage = await global.browser.newPage();
        global.page = nextPage;
    }
};

beforeEach(async () => {
    await ensureLivePage();
});

afterEach(async () => {
    if (page && typeof page.removeAllListeners === 'function') {
        page.removeAllListeners();
    }

    const pages = await global.browser.pages();
    const cleanupTargets = pages.filter(candidate => candidate !== page);
    await Promise.all(
        cleanupTargets.map(candidate =>
            candidate.close().catch(() => {
                // ignore teardown races on pages that are already closing/closed
            })
        )
    );

    await ensureLivePage();
});
