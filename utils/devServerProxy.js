const fs = require('fs');

const devAccountMap = {
    DEV00000000NI: ['US', 'ni'],
    DEV000NINONUS: ['US', 'ni_non-us'],
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

const REWRITE_RULES = {
    '/credit-presentment/smart/modal': '/modal.html'
};

module.exports = app => {
    app.use((req, res, next) => {
        Object.entries(REWRITE_RULES).forEach(([route, newRoute]) => {
            if (req.url.startsWith(route)) {
                req.url = req.url.replace(route, newRoute);
            }
        });
        next();
    });
    app.get('/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0, dimensions } = req.query;
        const account = req.query.pub_id ? req.query.pub_id : req.query.client_id;

        if (devAccountMap[account]) {
            const banner =
                dimensions !== 'x199x99'
                    ? fs.readFileSync(`banners/${devAccountMap[account].join('/')}.json`, 'utf-8')
                    : fs.readFileSync(`banners/ni.json`, 'utf-8');
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
            res.status(500).send(
                'Invalid dev account. If you are trying to use a stage or production account, please run the webpack dev server with the correct env value.'
            );
        }
    });
};
