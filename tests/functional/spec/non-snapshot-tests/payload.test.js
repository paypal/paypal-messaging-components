import qs from 'qs';
import packageConfig from '../../../../package.json';
import selectors from '../utils/selectors';

const createSpy = async ({ keyword = 'bdata' }) => {
    const spy = { matchedUrls: [] };
    page.on('request', request => {
        const url = request.url();
        if (url.includes(keyword)) spy.matchedUrls.push(url);
    });
    return spy;
};

const setupPage = async ({ config, testPage = 'banner.html' }) => {
    await page.goto(`https://localhost.paypal.com:8080/snapshot/${testPage}?config=${JSON.stringify(config)}`);
    await page.waitForSelector('.container iframe', { visible: true });
    await page.waitForSelector('iframe[title*="paypal_credit_modal"]');

    const elementHandle = await page.$('.container iframe');
    const elementModal = await page.$('iframe[title*="paypal_credit_modal"]');
    const bannerFrame = await elementHandle.contentFrame();
    const modalFrame = await elementModal.contentFrame();

    await modalFrame.waitForSelector('.content-body');
    await bannerFrame.waitForSelector('.message__messaging', { visible: true });

    return { bannerFrame, modalFrame };
};

const clickBanner = async bannerFrame => {
    await bannerFrame.click('.message__messaging');
    await page.waitForSelector('iframe[title*="paypal_credit_modal"]', { visible: true });
};

const getParsedRequests = spy => {
    return spy.matchedUrls.map(url => {
        const [_, query] = url.split('?'); // eslint-disable-line no-unused-vars
        const parsedQuery = qs.parse(query);

        return {
            url,
            query: parsedQuery,
            bdata: qs.parse(parsedQuery.bdata)
        };
    });
};

const runTest = async ({ config, testPage, callback }) => {
    const payloadSpy = await createSpy({});
    const { bannerFrame, modalFrame } = await setupPage({ config, testPage });

    if (callback) await callback({ bannerFrame, modalFrame });

    return getParsedRequests(payloadSpy);
};

const getStatRequest = ({ requests, statName, eventType, link }) => {
    const request = requests.find(r => {
        const eventMatches = eventType && r.bdata.event_type === eventType;
        const linkMatches = link && r.bdata.link && r.bdata.link.toLowerCase().includes(link.toLowerCase());
        return eventMatches || linkMatches;
    });
    if (!request) {
        // eslint-disable-next-line no-console
        console.error(
            `[${statName}] stat not found, sent requests:`,
            requests.map(r => r.bdata)
        );
        return null;
    }
    return request;
};

describe.skip('payload testing', () => {
    const config = {
        account: 'DEV0000000EAZ',
        amount: 500
    };

    test('initial payload', async () => {
        await page.waitFor(30 * 1000);
        const requests = await runTest({
            config,
            callback: async () => {
                await page.waitFor(5 * 1000);
            }
        });

        const request = getStatRequest({ requests, statName: 'initial payload', eventType: 'stats' });
        expect(request).not.toBeNull();
        expect(request.bdata).toMatchObject({
            et: 'CLIENT_IMPRESSION',
            event_type: 'stats',
            integration_type: 'STANDALONE',
            messaging_version: packageConfig.version,
            placement: '',
            pos_x: '0',
            pos_y: '0',
            browser_width: '800',
            browser_height: '600',
            visible: 'true',
            amount: '500',
            message_request_id: expect.any(String),
            uuid: expect.any(String),

            adblock: 'false',
            blocked: 'false'
        });
    });

    test('scroll stat sent if below fold', async () => {
        await page.viewport({ width: 600, height: 200 });
        const requests = await runTest({
            config,
            testPage: 'banner-scroll.html',
            callback: async () => {
                await page.evaluate(() => window.scrollBy(0, 1000));
                await page.waitFor(5 * 1000);
            }
        });

        const request = getStatRequest({ requests, statName: 'scroll', eventType: 'scroll' });
        expect(request).not.toBeNull();
        expect(request.bdata).toMatchObject({
            et: 'CLIENT_IMPRESSION',
            event_type: 'scroll',
            visible: 'true',
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });
    });

    test('scroll stat not sent if above fold', async () => {
        const requests = await runTest({
            config
        });

        const request = requests.find(r => r.bdata.event_type === 'scroll');
        expect(request).not.toBeDefined();
    });

    test('click stat sent', async () => {
        const requests = await runTest({
            config,
            callback: async ({ bannerFrame }) => {
                await clickBanner(bannerFrame);
            }
        });

        const clickRequest = getStatRequest({ requests, statName: 'click', eventType: 'click' });
        expect(clickRequest).toBeDefined();
        expect(clickRequest.bdata).toMatchObject({
            et: 'CLICK',
            event_type: 'click',
            link: 'Banner Wrapper',
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });

        const modalOpenRequest = getStatRequest({ requests, statName: 'click - modal open', eventType: 'modal-open' });
        expect(modalOpenRequest).toBeDefined();
        expect(modalOpenRequest.bdata).toMatchObject({
            et: 'CLIENT_IMPRESSION',
            event_type: 'modal-open',
            modal: expect.stringMatching(/(NI)|(EZP)|(INST)/),
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });
    });

    test('hover stat sent', async () => {
        const requests = await runTest({
            config,
            callback: async ({ bannerFrame }) => {
                await bannerFrame.hover('.message__messaging');
            }
        });

        const request = getStatRequest({ requests, statName: 'hover', eventType: 'hover' });
        expect(request).not.toBeNull();
        expect(request.bdata).toMatchObject({
            et: 'CLIENT_IMPRESSION',
            event_type: 'hover',
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });
    });

    test('modal calculate stat sent', async () => {
        const requests = await runTest({
            config,
            callback: async ({ bannerFrame, modalFrame }) => {
                await clickBanner(bannerFrame);
                await modalFrame.click(selectors.calculator.calcInput, { clickCount: 3 });
                await modalFrame.type(selectors.calculator.calcInput, '650');
                await modalFrame.click(selectors.button.btnSecondary);
                await page.waitFor(10 * 1000);
            }
        });

        const request = getStatRequest({ requests, statName: 'modal calculate', link: 'calculator' });
        expect(request).not.toBeNull();
        expect(request.bdata).toMatchObject({
            et: 'CLICK',
            event_type: 'click',
            link: 'Calculator',
            amount: expect.any(String),
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });
    });

    test('modal click stat sent', async () => {
        const requests = await runTest({
            config,
            callback: async ({ bannerFrame, modalFrame }) => {
                await clickBanner(bannerFrame);
                await page.waitFor(10 * 1000);
                await modalFrame.click(selectors.button.btn);
            }
        });

        const request = getStatRequest({ requests, statName: 'modal click', link: 'apply now' });
        expect(request).not.toBeNull();
        expect(request.bdata).toMatchObject({
            et: 'CLICK',
            event_type: 'click',
            link: expect.any(String),
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });
    });

    test('modal close stat sent', async () => {
        const requests = await runTest({
            config,
            callback: async ({ bannerFrame, modalFrame }) => {
                await clickBanner(bannerFrame);
                await page.waitFor(10 * 1000);
                await modalFrame.click(selectors.button.closeBtn);
                await page.waitFor(15 * 1000);
            }
        });

        const request = getStatRequest({ requests, statName: 'close', eventType: 'modal-close' });
        expect(request).not.toBeNull();
        expect(request.bdata).toMatchObject({
            et: 'CLICK',
            event_type: 'modal-close',
            link: expect.any(String),
            message_request_id: expect.any(String),
            uuid: expect.any(String)
        });
    });
});
