const fs = require('fs');
const got = require('got');

const devAccountMap = {
    DEV00000000NI: 'ni',
    DEV000NINONUS: 'ni:non-us',
    DEV0000000EAZ: 'ezp:any:eqz',
    DEV0000000EAG: 'ezp:any:gtz',
    DEV0000000PSZ: 'pala:single:eqz',
    DEV0000000PSG: 'pala:single:gtz',
    DEV0000000PMZ: 'pala:multi:eqz',
    DEV0000000PMG: 'pala:multi:gtz'
};

module.exports = function proxyImadserv(app) {
    app.get('/proxy/imadserver/upstream', (req, res) => {
        const { call, currency_value: amount = 0, pub_id: account } = req.query;

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
