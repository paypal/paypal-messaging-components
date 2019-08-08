import Banner from 'src/messages/models/Banner';
import Modal from 'src/messages/models/Modal';
import { objectFlattenToArray as mockFlatten } from 'src/utils';

jest.mock('src/messages/models/Modal', () => ({ init: jest.fn() }));
jest.mock('src/messages/services/banner', () =>
    jest.fn(({ options }) => {
        const config = {
            options,
            markup: {
                meta: {
                    offerType: 'NI',
                    impressionUrl: '$impression_tracking_url$',
                    clickUrl: '$click_tracking_url$&landing_url=https://www.paypal.com/ppclander'
                },

                data: {
                    headline: [['Buy now. Pay over time.', ['default']]],
                    subHeadline: [['Check out with PayPal and choose PayPal Credit.', ['default']]],
                    disclaimer: [['See terms', ['default']]]
                }
            }
        };
        config.options.style._flattened = mockFlatten(options);

        return Promise.resolve(config);
    })
);

XMLHttpRequest.prototype.send = jest.fn();
// JSDOM will not fire load events, causing insertMarkup to stall out
HTMLImageElement.prototype.addEventListener = jest.fn((type, cb) => cb());

describe('Banner model', () => {
    const selector = '[data-pp-message]';

    const validOptions = {
        id: '1',
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        style: {
            layout: 'text'
        }
    };

    it('Creates iframe and inserts banner', async () => {
        const wrapper = document.createElement('div');
        document.body.appendChild(wrapper);

        await Banner.init(wrapper, selector, validOptions);
        const iframe = wrapper.firstChild.firstChild;

        // Ensure all steps of render pipeline are called
        expect(Modal.init).toHaveBeenCalledTimes(1);
        expect(wrapper.children.length).toBe(1);
        expect(iframe.tagName).toBe('IFRAME');
        expect(iframe.contentWindow.document.body.innerHTML).toMatch(/Buy now\. Pay over time\./);

        await Banner.init(wrapper, selector, validOptions);

        // With no options changed, re-render should be skipped
        expect(Modal.init).toHaveBeenCalledTimes(1);
        expect(wrapper.children.length).toBe(1);
        expect(iframe.contentWindow.document.body.innerHTML).toMatch(/Buy now\. Pay over time\./);

        await Banner.init(wrapper, selector, { ...validOptions, style: { layout: 'flex', ratio: '1x1' } });

        // With new options, ensure render pipeline is called again
        expect(Modal.init).toHaveBeenCalledTimes(2);
        expect(wrapper.children.length).toBe(1);
        expect(iframe.contentWindow.document.body.innerHTML).toMatch(/Buy now\. Pay over time\./);
    });
});
