const fs = require('fs');
const got = require('got');

const devAccountMap = {
    DEV00000000NI: 'ni',
    DEV000NINONUS: 'ni_non-us',
    DEV0000000EAZ: 'ezp_any_eqz',
    DEV0000000EAG: 'ezp_any_gtz',
    DEV0000000PSZ: 'pala_single_eqz',
    DEV0000000PSG: 'pala_single_gtz',
    DEV0000000PMZ: 'pala_multi_eqz',
    DEV0000000PMG: 'pala_multi_gtz',

    DEV0000000IAZ: 'inst_any_eqz',
    DEV0000000IAG: 'inst_any_gtz',
    DEV000000PQAG: 'palaq_any_gtz',
    DEV000000PQAZ: 'palaq_any_eqz'
};

module.exports = function proxyImadserv(app) {
    app.get('/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0, country_code: countryCode } = req.query;
        const account = req.query.pub_id ? req.query.pub_id : req.query.client_id;

        if (devAccountMap[account]) {
            const banner = fs.readFileSync(`banners/${countryCode}/${devAccountMap[account]}.json`, 'utf-8');
            const bannerJSON = JSON.parse(banner);

            const morsVars = {
                total_payments: 12,
                formattedMonthlyPayment: `$${Number(amount / 12).toFixed(2)}`
            };

            const populateVars = str =>
                Object.entries(morsVars)
                    .reduce(
                        (accumulator, [morsVar, val]) =>
                            accumulator.replace(new RegExp(`\\\${CREDIT_OFFERS_DS.${morsVar}}`, 'g'), val),
                        str
                    )
                    .replace(/\r\n|\r|\n/g, '');

            const populatedBanner = Object.entries(bannerJSON).reduce((accumulator, [key, value]) => {
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
                    click_url: '',
                    impression_url: ''
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
                .catch(err => console.log(err) || res.status(404).send());
        }
    });
};
