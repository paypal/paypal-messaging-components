const isRecoverablePageError = error => {
    const message = error && error.message ? error.message : '';

    return (
        message.includes('Target closed') ||
        message.includes('Session closed') ||
        message.includes('TargetCloseError') ||
        message.includes('Protocol error')
    );
};

const isUsablePage = async candidate => {
    if (!candidate || candidate.isClosed()) {
        return false;
    }

    try {
        await candidate.title();
        return true;
    } catch (error) {
        if (isRecoverablePageError(error)) {
            return false;
        }

        throw error;
    }
};

const ensureLivePage = async () => {
    if (await isUsablePage(page)) {
        return;
    }

    const nextPage = await global.browser.newPage();
    global.page = nextPage;
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
