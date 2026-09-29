export const isCloseTargetRace = error => {
    const message = error && error.message ? error.message : '';

    return message.includes('Target.closeTarget') && message.includes('No target with given id found');
};

export const resetPageSafely = async () => {
    try {
        await jestPuppeteer.resetPage();
    } catch (error) {
        if (!isCloseTargetRace(error)) {
            throw error;
        }
    }

    if (!page || page.isClosed()) {
        const nextPage = await global.browser.newPage();
        global.page = nextPage;
    }
};
