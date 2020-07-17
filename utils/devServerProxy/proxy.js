import fs from 'fs';
import got from 'got';

import { getTerms, populateTemplate } from '..';
import renderMessage from '../../server/render';

const devAccountMap = {
    DEV00000000NI: ['US', 'ni'],
    DEV0000000NIQ: ['US', 'niq'],
    DEV000NINONUS: ['US', 'ni_non-us'],
    DEV00NINONUSQ: ['US', 'niq_non-us'],
    DEV0000000EAZ: ['US', 'ezp_any_eqz'],
    DEV0000000EAG: ['US', 'ezp_any_gtz'],
    DEV0000000PSZ: ['US', 'pala_single_eqz'],
    DEV0000000PSG: ['US', 'pala_single_gtz'],
    DEV0000000PMZ: ['US', 'pala_multi_eqz'],
    DEV0000000PMG: ['US', 'pala_multi_gtz'],

    DEV0000000IAZ: ['DE', 'inst_any_eqz'],
    DEV0000000IAG: ['DE', 'inst_any_gtz'],
    DEV000000PQAG: ['DE', 'palaq_any_gtz'],
    DEV000000PQAZ: ['DE', 'palaq_any_eqz']
};

export default app => {
    app.get('/ppcredit/messagingLogger', (req, res) => res.send(''));

    app.post('/credit-presentment/log', (req, res) => res.send(''));

    app.get('/credit-presentment/smart/message', (req, res) => {
        // const {} = req.query;

        const props = {
            markup: renderMessage().replace(/\r\n|\n|\r/g, ' '),
            meta: {
                uuid: '928ad66d-81de-440e-8c47-69bb3c3a5623',
                messageRequestId: 'acb0956c-d0a6-4b57-9bc5-c1daaa93d313',
                trackingDetails: {
                    clickUrl: '//localhost.paypal.com:8080/ptrk/?fdata=null',
                    impressionUrl: '//localhost.paypal.com:8080/ptrk/?fdata=null'
                }
            }
        };

        res.set('Cache-Control', 'public, max-age=10');

        res.send(`
            <!DOCTYPE html>
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <script>
                    var interface = window.top.document.querySelector('script').outerHTML;
                    var common = '<script src="//localhost.paypal.com:8080/smart-credit-common.js"><'+'/script>'
                    var component = '<script src="//localhost.paypal.com:8080/smart-credit-message.js"><'+'/script>';
                    var initializer = '<script>crc.setupMessage(${JSON.stringify(props)})<'+'/script>';

                    document.write(interface+common+component+initializer);
                </script>
            </body>
        `);
    });

    app.get('/credit-presentment/smart/modal', (req, res) => {
        const { country = 'US', amount } = req.query;
        const props = {
            aprEntry: { formattedDate: '3/1/2020', apr: 25.49 },
            terms: getTerms(country, Number(amount)),
            meta: {
                csrf: 'csrf'
            },
            country,
            type: 'NI',
            payerId: 'DEV00000000NI'
        };

        res.send(`
            <!DOCTYPE html>
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <script>
                    var interface = (window.top.document.querySelector('script[src*="components"][src*="messages"]') 
                        || window.top.document.querySelector('script[src*="messaging.js"]')
                        || window.top.document.querySelector('script[src*="merchant.js"]')).outerHTML;
                    var common = '<script src="//localhost.paypal.com:8080/smart-credit-common.js"><'+'/script>'
                    var component = '<script src="//localhost.paypal.com:8080/smart-credit-modal.js"><'+'/script>';
                    var initializer = '<script>crc.setupModal(${JSON.stringify(props)})<'+'/script>';

                    document.write(interface + common + component + initializer);
                </script>
            </body>
        `);
    });

    app.get('/credit-presentment/renderMessage', (req, res) => {
        res.send({
            markup: renderMessage().replace(/\r\n|\n|\r/g, ' '),
            meta: {
                uuid: '928ad66d-81de-440e-8c47-69bb3c3a5623',
                messageRequestId: 'acb0956c-d0a6-4b57-9bc5-c1daaa93d313',
                trackingDetails: {
                    clickUrl: '//localhost.paypal.com:8080/ptrk/?fdata=null',
                    impressionUrl: '//localhost.paypal.com:8080/ptrk/?fdata=null'
                }
            }
        });
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

    app.get('/credit-presentment/messages', (req, res) => {
        const { amount, client_id: clientId, payer_id: payerId, credit_type: preferredCreditType } = req.query;

        if (devAccountMap[clientId || payerId]) {
            const [country, offer] = devAccountMap[clientId || payerId];
            const terms = getTerms(country, Number(amount));
            const [bestOffer] = terms.offers || [{}];

            const morsVars = {
                financing_code: Math.random()
                    .toString(36)
                    .slice(2),
                formattedMonthlyPayment: country === 'DE' ? `${bestOffer.monthly}€` : `$${bestOffer.monthly}`,
                formattedTotalCost: country === 'DE' ? `${terms.formattedAmount}€` : `$${terms.formattedAmount}`,
                total_payments: bestOffer.term
            };

            const banner =
                preferredCreditType !== 'NI'
                    ? fs.readFileSync(`banners/${country}/${offer}.json`, 'utf-8')
                    : fs.readFileSync(`banners/US/ni.json`, 'utf-8');

            const populatedBanner = JSON.parse(populateTemplate(morsVars, banner));

            res.send({
                ...populatedBanner,
                meta: {
                    ...populatedBanner.meta,
                    impressionUrl: '//localhost.paypal.com:8080/ptrk/?fdata=null',
                    clickUrl: '//localhost.paypal.com:8080/ptrk/?fdata=null',
                    messageRequestId: '1234'
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
                .catch(err => console.log(err) || res.status(500).send(err));
        }
    });

    app.get('/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0, dimensions } = req.query;
        const account = req.query.pub_id ? req.query.pub_id : req.query.client_id;

        if (devAccountMap[account]) {
            const [country, offer] = devAccountMap[account];
            const terms = getTerms(country, Number(amount));
            const [bestOffer] = terms.offers || [{}];

            const morsVars = {
                financing_code: Math.random()
                    .toString(36)
                    .slice(2),
                formattedMonthlyPayment: country === 'DE' ? `${bestOffer.monthly}€` : `$${bestOffer.monthly}`,
                formattedTotalCost: country === 'DE' ? `${terms.formattedAmount}€` : `$${terms.formattedAmount}`,
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
                    click_url: '//localhost.paypal.com:8080/ptrk/?fdata=null',
                    impression_url: '//localhost.paypal.com:8080/ptrk/?fdata=null'
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
                .catch(err => console.log(err) || res.status(500).send(err));
        }
    });

    app.get('/ptrk', (req, res) => res.send(''));
    app.post('/ppcredit/messagingLogger', (req, res) => res.send(''));
    // TODO: Remove this once the apply now ramp is complete
    app.get('/smart-credit-modal-apply-now.js', (req, res) => res.redirect('/smart-credit-modal.js'));
};
