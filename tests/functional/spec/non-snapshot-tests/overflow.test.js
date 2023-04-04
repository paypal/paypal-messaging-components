import fs from 'fs';
import setupTestPage from '../utils/setupTestPage';

function setWindowDimensions({ width, height, zoom = 1 }) {
    window.innerWidth = width / zoom;
    window.innerHeight = height / zoom;
    window.outerWidth = width;
    window.outerHeight = height;
}

const runTest = async ({ testName, testPage = 'banner.html', config, viewport, pageScaleFactor }) => {
    // eslint-disable-next-line no-console
    console.log(`Running test [${testName}]`);
    page.on('pageerror', error => {
        // eslint-disable-next-line no-console
        console.log(`rerender.test page error for [${testName}]`, error);
    });

    await page.evaluateOnNewDocument(setWindowDimensions, { ...viewport, zoom: pageScaleFactor });

    await page.setViewport(viewport);

    await setupTestPage({ config, testPage });

    await page.waitFor(5 * 1000);

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
