const fs = require('fs');
const got = require('got');

const getTerms = require('./mockTerms');

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

module.exports = app => {
    app.get('/ppcredit/messagingLogger', (req, res) => {
        res.send('');
    });

    app.get('/credit-presentment/smart/modal', (req, res) => {
        const { country, amount } = req.query;
        const props = {
            terms: getTerms(country, Number(amount)),
            meta: {},
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
                    var interface = window.top.document.querySelector('script').outerHTML;
                    var modal = '<script src="//localhost.paypal.com:8080/smart-credit-modal.js"><'+'/script>';
                    var data = '<script>crc.setupModal(${JSON.stringify(props)})<'+'/script>';
                    
                    document.write(interface + modal + data);
                </script>
            </body>
        `);
    });

    app.post('/credit-presentment/calculateTerms', (req, res) => {
        const { country, amount } = req.query;

        res.send(getTerms(country, Number(amount)));
    });

    app.get('/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0, dimensions } = req.query;
        const account = req.query.pub_id ? req.query.pub_id : req.query.client_id;

        if (devAccountMap[account]) {
            const [country, offer] = devAccountMap[account];
            const terms = getTerms(country, Number(amount));
            const [bestOffer] = terms.offers || [{}];

            const morsVars = {
                formattedTotalCost: country === 'DE' ? `${terms.formattedAmount}€` : `$${terms.formattedAmount}`,
                total_payments: bestOffer.term,
                formattedMonthlyPayment: country === 'DE' ? `${bestOffer.monthly}€` : `$${bestOffer.monthly}`
            };

            const populateVars = str =>
                Object.entries(morsVars)
                    .reduce(
                        (accumulator, [morsVar, val]) =>
                            accumulator.replace(new RegExp(`\\\${CREDIT_OFFERS_DS.${morsVar}}`, 'g'), val),
                        str
                    )
                    .replace(/\r\n|\r|\n/g, '');

            const banner =
                dimensions !== 'x199x99'
                    ? fs.readFileSync(`banners/${country}/${offer}.json`, 'utf-8')
                    : fs.readFileSync(`banners/US/ni.json`, 'utf-8');

            const populatedBanner = Object.entries(JSON.parse(banner)).reduce((accumulator, [key, value]) => {
                return {
                    ...accumulator,
                    [key]: populateVars(JSON.stringify(value))
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
};
