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

const localize = country => (amount, fractionDigits = 2) => {
    const number = Number(amount) || Number(0);

    // toLocaleString only bundled with US locale on node
    const baseFormat = number.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: fractionDigits
    });

    switch (country) {
        case 'DE':
            return baseFormat.replace(/^([\d,]+)(\.)(\d+)$/, (match, p1, p2, p3) => `${p1.replace(/,/g, '.')},${p3}`);
        case 'US':
        default:
            return baseFormat;
    }
};

const getTerms = (country, amount) => {
    const toLocaleString = localize(country);
    const total = amount * 1.0999;

    return amount
        ? {
              type: 'pala',
              maxAmount: 5000,
              minAmount: 199,
              amount,
              formattedAmount: toLocaleString(amount),
              offers: [
                  {
                      term: 12,
                      type: 'INST',
                      apr: toLocaleString(9.99),
                      nominalRate: toLocaleString(9.5598, 4),
                      minValue: toLocaleString(199.0),
                      qualified: amount > 199 && amount < 5000,
                      monthly: toLocaleString(total / 12),
                      total: toLocaleString(total),
                      totalInterest: toLocaleString(total - amount)
                  }
              ],
              formattedMinAmount: toLocaleString(199),
              formattedMaxAmount: toLocaleString(5000)
          }
        : {};
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

    app.get('/ppcredit/messagingLogger', (req, res) => {
        res.send('');
    });

    app.post('/credit-presentment/calculateTerms', (req, res) => {
        const { country, amount } = req.query;

        res.send(getTerms(country, Number(amount)));
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
                    click_url: '//localhost.paypal.com:8080/ptrk/?fdata=null',
                    impression_url: '//localhost.paypal.com:8080/ptrk/?fdata=null'
                }
            });

            res.send(`${call}(${wrappedMarkup})`);
        } else {
            res.status(500).send(
                'Invalid dev account. If you are trying to use a stage or production account, please run the webpack dev server with the correct env value.'
            );
        }
    });

    app.get('/ptrk', (req, res) => res.send(''));
};
