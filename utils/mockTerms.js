const fs = require('fs');
const path = require('path');

const localize = country => (amount, fractionDigits = 2) => {
    const number = Number(amount) || Number(0);

    // toLocaleString only bundled with US locale on node
    const baseFormat = number.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });

    switch (country) {
        case 'DE':
            return baseFormat.replace(/^([\d,]+)(\.)(\d+)$/, (match, p1, p2, p3) => `${p1.replace(/,/g, '.')},${p3}`);
        case 'US':
        default:
            return baseFormat;
    }
};

// This function does not represent how PayPal calculates the true rates
module.exports.getTerms = (country, amount) => {
    const terms = JSON.parse(fs.readFileSync(path.resolve(__dirname, './terms.json'), 'utf-8'));
    const toLocaleString = localize(country);

    return {
        type: amount ? 'pala' : 'generic',
        maxAmount: terms.maxAmount,
        minAmount: terms.minAmount,
        amount,
        formattedAmount: toLocaleString(amount),
        offers: terms.offers.map(({ term, apr, nominalRate }) => {
            const total = amount + amount * (apr * 0.01) * (term / 12);
            return {
                term,
                type: 'INST',
                apr: toLocaleString(apr),
                nominalRate: toLocaleString(nominalRate),
                minValue: toLocaleString(terms.minAmount),
                qualified: amount > terms.minAmount && amount < terms.maxAmount,
                monthly: toLocaleString(total / term),
                total: toLocaleString(total),
                totalInterest: toLocaleString(total - amount)
            };
        }),
        formattedMinAmount: toLocaleString(terms.minAmount),
        formattedMaxAmount: toLocaleString(terms.maxAmount)
    };
};
