import fs from 'fs';

function setWindowDimensions({ width, height, zoom = 1 }) {
    window.innerWidth = width / zoom;
    window.innerHeight = height / zoom;
    window.outerWidth = width;
    window.outerHeight = height;
}

const isRecoverablePageError = error => {
    const message = error && error.message ? error.message : '';

    return (
        message.includes('Target closed') || message.includes('Session closed') || message.includes('TargetCloseError')
    );
};

const setViewportWithRecovery = async (viewport, pageScaleFactor) => {
    try {
        await page.evaluateOnNewDocument(setWindowDimensions, { ...viewport, zoom: pageScaleFactor });
        await page.setViewport(viewport);
    } catch (error) {
        if (!isRecoverablePageError(error)) {
            throw error;
        }

        const nextPage = await global.browser.newPage();
        global.page = nextPage;

        await global.page.evaluateOnNewDocument(setWindowDimensions, { ...viewport, zoom: pageScaleFactor });
        await global.page.setViewport(viewport);
    }
};

const runTest = async ({ testName, testPage = 'banner.html', config, viewport, pageScaleFactor }) => {
    // eslint-disable-next-line no-console
    console.log(`Running test [${testName}]`);
    page.on('pageerror', error => {
        // eslint-disable-next-line no-console
        console.log(`rerender.test page error for [${testName}]`, error);
    });
    page.on('console', msg => {
        if (msg.text().includes('[pp-overflow-debug]')) {
            // eslint-disable-next-line no-console
            console.log('[overflow-diag]', msg.text());
        }
    });

    const testUrl = `https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`;

    const tryNavigate = async attempt => {
        await setViewportWithRecovery(viewport, pageScaleFactor);

        try {
            await page.goto(testUrl, { waitUntil: 'networkidle0' });
            await page.waitForSelector('[data-test-visible]', {
                visible: true,
                timeout: 30000
            });
        } catch (error) {
            if (!isRecoverablePageError(error) || attempt >= 1) {
                throw error;
            }

            const nextPage = await global.browser.newPage();
            global.page = nextPage;

            await tryNavigate(attempt + 1);
        }
    };

    await tryNavigate(0);

    await new Promise(resolve => setTimeout(resolve, 5 * 1000));

    await page.evaluate(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    });

    const bannerContainers = await page.$$('[data-test-visible]');

    return Promise.all(
        bannerContainers.map(async (container, index) => {
            const { expected, value } = await container.evaluate(node => ({
                expected: node.getAttribute('data-test-visible') === 'true',
                value: node.querySelector('iframe').style.opacity === '1'
            }));

            expect(`message #${index + 1}: ${value}`).toBe(`message #${index + 1}: ${expected}`);
        })
    );
};

describe('overflow detection', () => {
    const config = {
        account: 'DEV0000000GPL',
        amount: 500
    };

    const pageScenarios = fs.readdirSync('demo/snapshot/overflow');

    pageScenarios.forEach(scenario => {
        const markup = fs.readFileSync(`demo/snapshot/overflow/${scenario}`, 'utf8');
        const [, name] = markup.match(/@name: (.+)/);
        const [, width, height] = markup.match(/@viewport: (\d+)x(\d+)/);
        const [, pageScaleFactor] = markup.match(/@pageScaleFactor: (\d+\.\d+)/) ?? [];

        test(name, () =>
            runTest({
                config,
                testName: name,
                testPage: `overflow/${scenario}`,
                viewport: {
                    width: Number(width),
                    height: Number(height)
                },
                pageScaleFactor: Number(pageScaleFactor ?? '1')
            })
        );
    });
});
