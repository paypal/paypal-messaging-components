import fs from 'fs';
import path from 'path';
import got from 'got';

import { PORT, VARIANT } from '../../server/constants';
import { populateTemplate, localizeCurrency } from './miscellaneous';
import { getTerms } from './mockTerms';

const devAccountMap = {
    DEV00000000NI: ['US', ['ni'], 'ni'],
    DEV0000000NIQ: ['US', ['ni'], 'niq'],
    DEV000NINONUS: ['US', ['ni'], 'ni_non-us'],
    DEV00NINONUSQ: ['US', ['ni'], 'niq_non-us'],
    DEV0000000EAZ: ['US', ['ni_old', 'ezp_old'], 'ezp_any_eqz'],
    DEV0000000EAG: ['US', ['ni_old', 'ezp_old'], 'ezp_any_gtz'],
    DEV0000000PSZ: ['US', ['ni_old', 'ezp_old'], 'pala_single_eqz'],
    DEV0000000PSG: ['US', ['ni_old', 'ezp_old'], 'pala_single_gtz'],
    DEV0000000PMZ: ['US', ['ni_old', 'ezp_old'], 'pala_multi_eqz'],
    DEV0000000PMG: ['US', ['ni_old', 'ezp_old'], 'pala_multi_gtz'],
    DEV0000000GPL: ['US', ['gpl'], 'gpl'],
    DEV000000GPLQ: ['US', ['gpl'], 'gplq'],
    DEV00000GPLNQ: ['US', ['gpl'], 'gplnq'],

    // Multi product modal
    DEV00000NIGPL: ['US', ['gpl', 'ni'], 'gpl'],

    DEV0000000IAZ: ['DE', ['inst'], 'inst_any_eqz'],
    DEV0000000IAG: ['DE', ['inst'], 'inst_any_gtz'],
    DEV000000PQAG: ['DE', ['inst'], 'palaq_any_gtz'],
    DEV000000PQAZ: ['DE', ['inst'], 'palaq_any_eqz'],

    DEV000000GBPL: ['GB', ['gpl'], 'gpl'],
    DEV00000GBPLQ: ['GB', ['gpl'], 'gplq'],

    DEV000000FRPL: ['FR', ['gpl'], 'gpl'],
    DEV00000FRPLQ: ['FR', ['gpl'], 'gplq']
};

export default (app, server, compiler) => {
    const getMockBanner = req => {
        const { amount, client_id: clientId, payer_id: payerId, credit_type: preferredCreditType } = req.query;

        if (devAccountMap[clientId || payerId]) {
            const [country, , offer] = devAccountMap[clientId || payerId];
            const terms = getTerms(country, Number(amount));
            const [bestOffer] = terms.offers || [{}];
            const toLocaleCurrency = localizeCurrency(country);

            const morsVars = {
                financing_code: Math.random()
                    .toString(36)
                    .slice(2),
                formattedPeriodicPayment: toLocaleCurrency(bestOffer.monthly),
                formattedMonthlyPayment: toLocaleCurrency(bestOffer.monthly),
                formattedTotalCost: toLocaleCurrency(terms.formattedAmount),
                total_payments: bestOffer.term
            };

            const banner =
                preferredCreditType !== 'NI'
                    ? fs.readFileSync(`banners/${country}/${offer}.json`, 'utf-8')
                    : fs.readFileSync(`banners/US/ni.json`, 'utf-8');

            return JSON.parse(populateTemplate(morsVars, banner));
        }

        return null;
    };

    const createMockZoidMarkup = (component, initializer) => `
        <!DOCTYPE html>
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
            <script>
                var interface = (window.top.document.querySelector('script[src*="components"][src*="messages"]')
                    || window.top.document.querySelector('script[src*="messaging.js"]')).outerHTML;

                document.write(interface);
            </script>
            <script src="//localhost.paypal.com:${PORT}/smart-credit-common.js"></script>
            <script src="//localhost.paypal.com:${PORT}/smart-credit-${component}.js"></script>
            ${initializer}
        </body>
    `;

    const passthroughMessageReq = async req => {
        const { style, ...params } = req.query;
        const query = Object.entries({
            ...params,
            variant: VARIANT
        })
            .reduce((accumulator, [key, val]) => `${accumulator}&${key}=${val}`, '')
            .slice(1);

        const { statusCode, body } = await got(`https://www.paypal.com/credit-presentment/messages?${query}`);

        return statusCode === 200 ? JSON.parse(body) : null;
    };

    const getRenderedMessage = async req => {
        try {
            const populatedBanner = getMockBanner(req) ?? (await passthroughMessageReq(req));

            if (populatedBanner) {
                const style = JSON.parse(req.query.style);
                const { amount } = req.query;

                // eslint-disable-next-line no-eval, security/detect-eval-with-expression
                const { render, validateStyle, getParentStyles } = eval(
                    compiler.compilers[2].outputFileSystem
                        .readFileSync(path.resolve(__dirname, '../../dist/renderMessage.js'))
                        .toString()
                );

                const warnings = [];

                const validatedStyle = validateStyle(
                    warnings.push.bind(warnings),
                    style,
                    populatedBanner.meta.offerCountry,
                    populatedBanner.meta.offerType
                );

                let customMarkup = '';

                if (validatedStyle.layout === 'custom' && validatedStyle.markup) {
                    if (validatedStyle.markup.includes('https://localhost.paypal.com:8080/')) {
                        customMarkup = fs.readFileSync(
                            `demo/${validatedStyle.markup.replace('https://localhost.paypal.com:8080/', '')}`,
                            'utf-8'
                        );
                    } else {
                        ({ body: customMarkup } = await got(validatedStyle.markup));
                    }
                }

                const markup = render({ style: validatedStyle, amount, customMarkup }, populatedBanner);
                const parentStyles = getParentStyles(validatedStyle);

                return {
                    markup,
                    warnings,
                    parentStyles,
                    meta: {
                        ...populatedBanner.meta,
                        uuid: '928ad66d-81de-440e-8c47-69bb3c3a5623',
                        messageRequestId: 'acb0956c-d0a6-4b57-9bc5-c1daaa93d313',
                        trackingDetails: {
                            clickUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                            impressionUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`
                        }
                    }
                };
            }
        } catch (err) {
            console.error(err); // eslint-disable-line no-console
        }

        return null;
    };

    app.get('/ppcredit/messagingLogger', (req, res) => res.send(''));

    app.post('/credit-presentment/log', (req, res) => res.send(''));

    app.get('/credit-presentment/smart/message', async (req, res) => {
        const props = await getRenderedMessage(req);

        if (props) {
            res.set('Cache-Control', 'public, max-age=10');

            res.send(createMockZoidMarkup('message', `<script>crc.setupMessage(${JSON.stringify(props)})</script>`));
        } else {
            res.status(400).send('');
        }
    });

    const getModalData = req => {
        const { client_id: clientId, payer_id: payerId, merchant_id: merchantId, amount } = req.query;
        const account = clientId || payerId || merchantId;
        const [country, productNames] = devAccountMap[account] ?? ['US', ['ni']];

        const productsJSON = productNames.map(product =>
            fs.readFileSync(`modals/${country}/${product}.json`, 'utf-8').toString()
        );

        const terms = getTerms(country, Number(amount));
        const [bestOffer] = terms.offers || [{}];
        const toLocaleCurrency = localizeCurrency(country);

        const morsVars = {
            formattedPeriodicPayment: amount ? toLocaleCurrency(bestOffer.monthly) : '-',
            apr: bestOffer.apr,
            minAmount: terms.minAmount,
            maxAmount: terms.maxAmount,
            formattedTransactionAmount: terms.amount ? toLocaleCurrency(terms.amount) : '-',
            qualifying_offer: terms.amount ? 'true' : 'false',
            total_payments: bestOffer.term,
            formattedMinAmount: toLocaleCurrency(terms.minAmount),
            formattedMaxAmount: toLocaleCurrency(terms.maxAmount),
            nominal_rate: bestOffer.nominalRate
        };

        const otherVars = {
            'aprEntry.apr': 25.49,
            'aprEntry.formattedDate': '9/01/2020',
            fullYear: 2020
        };

        const products = productsJSON.map(json => {
            const morsPopulatedJSON = populateTemplate(morsVars, json);

            const populatedJSON = Object.entries(otherVars).reduce(
                (accumulator, [variable, val]) =>
                    // eslint-disable-next-line security/detect-non-literal-regexp
                    accumulator.replace(new RegExp(`{${variable}}`, 'g'), val),
                morsPopulatedJSON
                    .replace(/\${eval\(transaction_amount \? transaction_amount : '-'\)}/g, terms.amount ?? '-')
                    .replace(
                        /\${eval\(CREDIT_OFFERS_DS\.qualifying_offer \? CREDIT_OFFERS_DS\.qualifying_offer : 'false'\)}/g,
                        morsVars.qualifying_offer
                    )
            );

            return JSON.parse(populatedJSON);
        });

        const props = {
            terms: getTerms(country, Number(amount)),
            meta: {
                csrf: 'csrf'
            },
            aprEntry: {
                apr: 25.49,
                formattedDate: '9/01/2020'
            },
            country,
            products,
            type: products.slice(-1)[0].meta.product, // TODO: Can be removed after the ramp
            payerId: account
        };

        return { props, productNames };
    };

    app.get('/credit-presentment/smart/modal', (req, res) => {
        const { targetMeta } = req.query;
        const { props, productNames } = getModalData(req);

        res.send(
            createMockZoidMarkup(
                targetMeta ? 'modal' : `modal-${productNames.includes('ezp_old') ? 'US-EZP' : props.country}`,
                `<script>crc.setupModal(${JSON.stringify(props)})</script>`
            )
        );
    });
    app.get('/credit-presentment/modalContent', (req, res) => {
        const { props: data } = getModalData(req);
        setTimeout(() => {
            res.send(data);
        }, 1000);
    });

    app.get('/credit-presentment/renderMessage', async (req, res) => {
        res.send(await getRenderedMessage(req));
    });

    app.post('/credit-presentment/calculateTerms', (req, res) => {
        const csrf = req.headers['x-csrf-token'];

        if (!csrf) {
            res.status(403).send('CSRF token required');
            return;
        }

        const { country, amount } = req.query;

        setTimeout(() => {
            res.send(getTerms(country, Number(amount)));
        }, 1000);
    });
    app.get('/credit-presentment/calculateTerms', (req, res) => {
        const { country, amount } = req.query;

        setTimeout(() => {
            res.send(getTerms(country, Number(amount)));
        }, 1000);
    });

    app.get('/credit-presentment/messages', (req, res) => {
        const populatedBanner = getMockBanner(req);

        if (populatedBanner) {
            res.send({
                ...populatedBanner,
                meta: {
                    ...populatedBanner.meta,
                    messageRequestId: '1234',
                    clickUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                    impressionUrl: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`
                }
            });
        } else {
            const query = Object.entries(req.query)
                .reduce((accumulator, [key, val]) => `${accumulator}&${key}=${val}`, '')
                .slice(1);

            got(`https://www.paypal.com/credit-presentment/messages?${query}`)
                .then(({ body, headers }) => {
                    delete headers['content-encoding']; // eslint-disable-line no-param-reassign
                    res.set(headers);
                    res.send(body);
                })
                .catch(err => console.error(err) || res.status(500).send(err)); // eslint-disable-line no-console
        }
    });

    app.get('/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0, dimensions } = req.query;
        const account = req.query.pub_id ? req.query.pub_id : req.query.client_id;

        if (devAccountMap[account]) {
            const [country, , offer] = devAccountMap[account];
            const terms = getTerms(country, Number(amount));
            const [bestOffer] = terms.offers || [{}];
            const toLocaleCurrency = localizeCurrency(country);

            const morsVars = {
                financing_code: Math.random()
                    .toString(36)
                    .slice(2),
                formattedTotalCost: toLocaleCurrency(terms.formattedAmount),
                formattedPeriodicPayment: toLocaleCurrency(bestOffer.monthly),
                formattedMonthlyPayment: toLocaleCurrency(bestOffer.monthly),
                total_payments: bestOffer.term
            };

            const banner =
                dimensions !== 'x199x99'
                    ? fs.readFileSync(`banners/${country}/${offer}.json`, 'utf-8')
                    : fs.readFileSync(`banners/US/ni.json`, 'utf-8');

            const populatedBanner = Object.entries(JSON.parse(banner)).reduce((accumulator, [key, value]) => {
                return {
                    ...accumulator,
                    [key]: populateTemplate(morsVars, JSON.stringify(value))
                };
            }, {});

            const wrappedMarkup = JSON.stringify({
                content: {
                    json: populatedBanner
                },
                tracking_details: {
                    click_url: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`,
                    impression_url: `//localhost.paypal.com:${PORT}/ptrk/?fdata=null`
                }
            });

            res.send(`${call}(${wrappedMarkup})`);
        } else {
            const query = Object.entries(req.query)
                .reduce((accumulator, [key, val]) => `${accumulator}&${key}=${val}`, '')
                .slice(1);

            got(`https://www.paypal.com/imadserver/upstream?${query}`)
                .then(({ body, headers }) => {
                    delete headers['content-encoding']; // eslint-disable-line no-param-reassign
                    res.set(headers);
                    res.send(body);
                })
                .catch(err => console.error(err) || res.status(500).send(err)); // eslint-disable-line no-console
        }
    });

    app.get('/ptrk', (req, res) => res.send(''));
    app.post('/ppcredit/messagingLogger', (req, res) => res.send(''));
};
