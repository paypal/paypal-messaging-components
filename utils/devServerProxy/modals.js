import { createMockZoidMarkup, populateTemplate, waitForTimeout, btoa, toBinary } from './lib/miscellaneous';
import getDevAccountDetails from './lib/devAccountDetails';

const REQUEST_DELAY = process.env.REQUEST_DELAY ?? 500;

const getModalData = req => {
    const { client_id: clientId, payer_id: payerId, merchant_id: merchantId, amount } = req.query;
    const account = merchantId || clientId || payerId;

    const { country, terms, modalViews } = getDevAccountDetails({ account, amount });

    const otherVars = {
        'aprEntry.apr': 25.49,
        'aprEntry.formattedDate': '9/01/2020',
        fullYear: 2020
    };

    const views = modalViews.map(({ template, morsVars, offers }) => {
        const viewData = JSON.parse(
            populateTemplate(template, {
                ...morsVars,
                ...otherVars
            })
        );

        if (offers) {
            viewData.offers = offers.map(offer => JSON.parse(populateTemplate(offer.template, offer.morsVars)));
        }

        return viewData;
    });

    return {
        terms,
        country,
        [terms ? 'products' : 'views']: views,
        payerId: account,
        meta: {
            displayedMessage: 'b0ffd6cc-6887-4855-a5c8-4b17a5efb201',
            messageRequestId: '9ad74722-d142-4c5a-9b0b-59cd7b079235',
            trackingDetails: {
                clickUrl: `/ptrk/?fdata=null`,
                impressionUrl: `/ptrk/?fdata=null`,
                payload: {}
            }
        }
    };
};

export default function createModalRoutes(app, server) {
    const { port } = server.options;

    app.get('/credit-presentment/smart/modal', async (req, res) => {
        const { scriptUID } = req.query;
        const props = getModalData(req);
        const encodedData = btoa(toBinary(JSON.stringify(props)));

        const postfix = (() => {
            if (props.views) {
                return 'v2';
            }

            if (props.country === 'US' && props.products?.some(product => product.meta.product === 'EZP')) {
                return 'US-EZP';
            }

            if (
                props.country === 'DE' &&
                (props.products?.some(product => product.meta.product === 'GPL') ||
                    props.products?.some(product => product.meta.product === 'PI30'))
            ) {
                return 'DE-GPL';
            }

            return props.country;
        })();

        const markup = createMockZoidMarkup({
            component: `modal-${postfix}`,
            encodedData,
            scriptUID,
            port
        });

        await waitForTimeout(REQUEST_DELAY);

        res.send(markup);
    });

    app.get('/credit-presentment/modalContent', async (req, res) => {
        const props = getModalData(req);

        await waitForTimeout(REQUEST_DELAY);

        res.send(props);
    });

    app.get('/credit-presentment/lander/modal', async (req, res) => {
        const props = getModalData(req);
        const encodedData = btoa(toBinary(JSON.stringify(props)));
        const markup = createMockZoidMarkup({
            component: 'modal-v2-lander',
            encodedData,
            port
        });

        await waitForTimeout(REQUEST_DELAY);

        res.send(markup);
    });
}
