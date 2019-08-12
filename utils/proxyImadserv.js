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
    DEV0000000PMG: 'pala_multi_gtz'
};

module.exports = function proxyImadserv(app) {
    app.get('/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0 } = req.query;
        const account = req.query.pub_id ? req.query.pub_id : req.query.client_id;

        if (devAccountMap[account]) {
            const morsVars = {
                tot_pymts: `$${Number(amount).toFixed(2)}`,
                term: 12,
                pymt_mo: `$${Number(amount / 12).toFixed(2)}`
            };
            const banner = fs.readFileSync(`banners/${devAccountMap[account]}.json`, 'utf-8');
            const populatedBanner = Object.entries(morsVars)
                .reduce(
                    (accumulator, [morsVar, val]) => accumulator.replace(new RegExp(`\\\${${morsVar}}`, 'g'), val),
                    banner
                )
                .replace(/"/g, '\\"')
                .replace(/\r\n|\r|\n/g, '');
            const wrappedMarkup = `${call}("<div>${populatedBanner}</div>")`;
            res.send(wrappedMarkup);
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
