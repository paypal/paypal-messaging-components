module.exports.populateTemplate = (morsVars, template) =>
    Object.entries(morsVars)
        .reduce(
            (accumulator, [morsVar, val]) =>
                accumulator.replace(new RegExp(`(\\\${CREDIT_OFFERS_DS\\.|{)${morsVar}}`, 'g'), val),
            template
        )
        .replace(/\r\n|\r|\n/g, '');

module.exports.localizeNumber = country => (amount, fractionDigits = 2) => {
    const number = Number(amount) || Number(0);

    // toLocaleString only bundled with US locale on node
    const baseFormat = number.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });

    switch (country) {
        case 'US':
        default:
            return baseFormat;
    }
};

module.exports.localizeCurrency = country => (amount, fractionDigits = 2) => {
    // Handle already localized numbers
    const localizedAmount = Number.isNaN(Number(amount))
        ? amount
        : module.exports.localizeNumber(country)(amount, fractionDigits);

    switch (country) {
        case 'US':
        default:
            return `$${localizedAmount}`;
    }
};
