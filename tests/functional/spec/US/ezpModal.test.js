import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { openModal, modalSnapshot } from '../us_initalizeModal';
import selectors from '../utils/selectors';
import { viewports, bannerStyles, amounts } from '../utils/testStylesConfig';

const account = 'DEV0000000PSZ';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.002,
    customDiffConfig: {
        threshold: 0.05
    }
});

expect.extend({ toMatchImageSnapshot });

describe.each([
    [viewports[0], amounts[0]],
    [viewports[0], amounts[1]],
    [viewports[0], amounts[2]],
    [viewports[0], amounts[3]],
    [viewports[1], amounts[0]],
    [viewports[1], amounts[1]],
    [viewports[1], amounts[2]],
    [viewports[1], amounts[3]]
])('EZP modal calculator tests %o %i', (viewport, amount) => {
    beforeEach(async () => {
        await openModal(viewport, {
            account,
            amount,
            style: {
                layout: bannerStyles.layout,
                logo: {
                    position: bannerStyles.position,
                    type: bannerStyles.type
                }
            }
        });
    });
    test('show error message when entering a non-qualifying amount inside the calculator', async () => {
        const testNameParts = 'non-qualifying ezp amount error message';
        const elementModal = await page.$("iframe[title='paypal_credit_modal']");
        const modalFrame = await elementModal.contentFrame();
        await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
        await page.waitFor(2000);
        await modalFrame.waitForSelector(selectors.modal.contentBody);
        await page.waitFor(2000);
        await modalFrame.waitForSelector(selectors.calculator.calc);
        await modalFrame.waitForSelector(selectors.calculator.calcForm);

        await modalFrame.waitForSelector(selectors.calculator.calcInput, { visible: true });

        await page.waitFor(1000);
        await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
        await page.waitFor(1000);
        await modalFrame.type(selectors.calculator.calcInput, '2');
        await modalFrame.click(selectors.button.btnSecondary);

        const image = await page.screenshot(
            {
                clip: {
                    ...viewport,
                    x: 0,
                    y: 0
                }
            },
            3
        );

        modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
    });
    test('when an amount is passed into EZP message, the correct financing terms are loaded in a table', async () => {
        const testNameParts = 'ezp finance terms';
        const elementModal = await page.$("iframe[title='paypal_credit_modal']");
        const modalFrame = await elementModal.contentFrame();
        await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
        await page.waitFor(2000);
        await modalFrame.waitForSelector(selectors.modal.contentBody);

        const image = await page.screenshot(
            {
                clip: {
                    ...viewport,
                    x: 0,
                    y: 0
                }
            },
            3
        );

        modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
    });
    test('update finance terms when user updates amount passed into calculator', async () => {
        const testNameParts = 'update finance terms';
        const elementModal = await page.$("iframe[title='paypal_credit_modal']");
        const modalFrame = await elementModal.contentFrame();
        await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
        await page.waitFor(2000);
        await modalFrame.waitForSelector(selectors.modal.contentBody);
        await modalFrame.waitForSelector(selectors.calculator.calc, { visible: true });
        // await page.waitFor(2000);
        await modalFrame.waitForSelector(selectors.calculator.calcForm);
        await modalFrame.waitForSelector(selectors.calculator.calcInput, { visible: true });
        // await page.waitFor(2000);
        await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
        await modalFrame.type(selectors.calculator.calcInput, '650');
        await modalFrame.click(selectors.button.btnSecondary);

        const image = await page.screenshot(
            {
                clip: {
                    ...viewport,
                    x: 0,
                    y: 0
                }
            },
            3
        );

        modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
    });
    test('when an ezp message is clicked ezp content is loaded including a calculator for finance terms', async () => {
        const testNameParts = 'ezp message content';
        const elementModal = await page.$("iframe[title='paypal_credit_modal']");
        const modalFrame = await elementModal.contentFrame();
        await modalFrame.waitForSelector(selectors.modal.container, { visible: true });
        await page.waitFor(1000);
        await modalFrame.waitForSelector(selectors.modal.contentBody);
        await page.waitFor(1000);
        await modalFrame.waitForSelector(selectors.calculator.calc);
        await page.waitFor(1000);
        await modalFrame.waitForSelector(selectors.calculator.calcForm);
        await modalFrame.waitForSelector(selectors.calculator.calcInput);

        expect(await modalFrame.evaluate(() => document.querySelector('.calculator'))).toBeTruthy();

        await modalFrame.waitForSelector(selectors.modal.contentBody);
        await modalFrame.waitForSelector(selectors.modal.contentBodyTitle);

        const contentHeaderTitle = await modalFrame.evaluate(
            _contentHeaderTitle => document.querySelector(_contentHeaderTitle).innerText,
            selectors.modal.contentHeaderTitle
        );
        const contentBodyTitle = await modalFrame.evaluate(
            _contentBodyTitle => document.querySelector(_contentBodyTitle).innerText,
            selectors.modal.contentBodyTitle
        );

        // const contentHeaderTitle = await modalFrame.evaluate(
        //     () => document.querySelector('.content-header__title').innerText
        // );
        // const contentBodyTitle = await modalFrame.evaluate(
        //     () => document.querySelector('.content-body__title').innerText
        // );
        // eslint-disable-next-line no-unused-expressions
        expect(contentHeaderTitle).toContain('Split your purchases into equal monthly payments') &&
            expect(contentBodyTitle).toContain('Enter a purchase amount to calculate your monthly Easy Payments.');

        const image = await page.screenshot(
            {
                clip: {
                    ...viewport,
                    x: 0,
                    y: 0
                }
            },
            3
        );

        modalSnapshot(`${testNameParts} ${bannerStyles[0].layout}`, viewport, image, account);
    });
    afterEach(async () => {
        // eslint-disable-next-line no-undef
        await jestPuppeteer.resetPage();
    });
});
