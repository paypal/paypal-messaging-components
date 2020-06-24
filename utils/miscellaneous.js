module.exports.populateTemplate = (morsVars, template) =>
    Object.entries(morsVars)
        .reduce(
            (accumulator, [morsVar, val]) =>
                accumulator.replace(new RegExp(`(\\\${CREDIT_OFFERS_DS\\.|{)${morsVar}}`, 'g'), val),
            template
        )
        .replace(/\r\n|\r|\n/g, '');

module.exports.localizeCurrency = (country, amount) => {
    let localizedAmount = `$${amount}`;

    if (country === 'DE') {
        localizedAmount = `${amount}€`;
    } else if (country === 'GB') {
        localizedAmount = `£${amount}`;
    }
    return localizedAmount;
};
