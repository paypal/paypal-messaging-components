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
        case 'DE':
        case 'GB':
            return baseFormat.replace(/^([\d,]+)(\.)(\d+)$/, (match, p1, p2, p3) => `${p1.replace(/,/g, '.')},${p3}`);
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
        case 'DE':
            return `${localizedAmount}€`;
        case 'GB':
            return `£${localizedAmount}`;
        case 'US':
        default:
            return `$${localizedAmount}`;
    }
};
