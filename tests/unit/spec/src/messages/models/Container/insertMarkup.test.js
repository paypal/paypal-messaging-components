import createContainer from 'utils/createContainer';
import insertMarkup from 'src/messages/models/Container/insertMarkup';
import { objectFlattenToArray } from 'src/utils';

// JSDOM will not fire load events, causing insertMarkup to stall out
HTMLImageElement.prototype.addEventListener = jest.fn((type, cb) => cb());

describe('insertMarkup', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    const validOptions = {
        id: '1',
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        style: {
            layout: 'text',
            logo: {
                type: 'primary',
                position: 'left'
            },
            text: {
                color: 'black'
            }
        }
    };
    validOptions.style._flattened = objectFlattenToArray(validOptions.style);

    it('Inserts markup string into iframe container', async () => {
        const { container, getByText } = createContainer('iframe');
        const markup = '<div><script>window.meta = { test: true };</script><div>test</div></div>';
        const data = await insertMarkup(container, { markup, options: validOptions });

        expect(getByText(/test/i)).toBeVisible();
        expect(data).toEqual(expect.objectContaining({ meta: expect.objectContaining({ test: true }) }));
    });

    it('Inserts markup JSON into iframe container', async () => {
        const { container, getByText } = createContainer('iframe');
        const markup = {
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
        };
        const data = await insertMarkup(container, { markup, options: validOptions });

        expect(getByText(/see terms/i)).toBeVisible();
        expect(data).toEqual(
            expect.objectContaining({
                meta: expect.objectContaining({
                    offerType: 'NI',
                    impressionUrl: '$impression_tracking_url$',
                    clickUrl: '$click_tracking_url$&landing_url=https://www.paypal.com/ppclander'
                })
            })
        );
    });

    it('Inserts markup JSON into div container', async () => {
        const { container, getByText } = createContainer('div');
        const markup = {
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
        };
        const data = await insertMarkup(container, { markup, options: validOptions });

        expect(getByText(/see terms/i)).toBeVisible();
        expect(data).toEqual(
            expect.objectContaining({
                meta: expect.objectContaining({
                    offerType: 'NI',
                    impressionUrl: '$impression_tracking_url$',
                    clickUrl: '$click_tracking_url$&landing_url=https://www.paypal.com/ppclander'
                })
            })
        );
    });
});
