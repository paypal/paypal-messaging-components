import { selectors } from '../../v2/utils';

const isRecoverablePageError = error => {
    const message = error && error.message ? error.message : '';

    return (
        message.includes('Target closed') ||
        message.includes('Session closed') ||
        message.includes('TargetCloseError') ||
        message.includes('ERR_ABORTED')
    );
};

const ensureLivePage = async () => {
    if (!page || page.isClosed()) {
        const nextPage = await global.browser.newPage();
        global.page = nextPage;
    }
};

const createFreshPage = async () => {
    const nextPage = await global.browser.newPage();
    global.page = nextPage;
};

const gotoWithRecovery = async url => {
    await ensureLivePage();

    try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        return;
    } catch (error) {
        if (!isRecoverablePageError(error)) {
            throw error;
        }
    }

    await createFreshPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
};

export default async function setupTestPage({ config, testPage, frameName }) {
    await gotoWithRecovery(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);

    const frameWithMessage = frameName ? page.frames().find(frame => frame.name() === frameName) : page.mainFrame();
    const bannerElement = await frameWithMessage.waitForSelector(selectors.message.messageIframe, {
        visible: true
    });
    const bannerFrame = await bannerElement.contentFrame();

    await bannerFrame.waitForSelector(selectors.message.messageMessaging, { visible: true });

    const openModal = async () => {
        await bannerElement.click(selectors.message.messageMessaging);

        const zoidModalIframeEl = await page.waitForSelector(selectors.modal.iframe, { visible: true });
        const modalFrame = await zoidModalIframeEl.contentFrame();
        return { modalFrame };
    };

    await new Promise(resolve => setTimeout(resolve, 3 * 1000));

    return { bannerElement, openModal };
}
