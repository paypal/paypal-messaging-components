module.exports.populateTemplate = (morsVars, template) =>
    Object.entries(morsVars)
        .reduce(
            (accumulator, [morsVar, val]) =>
                accumulator.replace(new RegExp(`(\\\${CREDIT_OFFERS_DS\\.|{)${morsVar}}`, 'g'), val),
            template
        )
        .replace(/\r\n|\r|\n/g, '');
