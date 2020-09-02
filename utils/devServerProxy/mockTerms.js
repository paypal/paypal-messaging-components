import fs from 'fs';
import path from 'path';

import { localizeNumber } from './miscellaneous';

// This function does not represent how PayPal calculates the true rates
export const getTerms = (country, amount) => {
    const terms = JSON.parse(fs.readFileSync(path.resolve(__dirname, './terms.json'), 'utf-8'));
    const toLocaleString = localizeNumber(country);

    return {
        type: amount ? 'pala' : 'generic',
        maxAmount: terms.maxAmount,
        minAmount: terms.minAmount,
        // If no amount passed in, set amount to undefined to match production
        amount: amount || undefined,
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
                totalInterest: toLocaleString(total - amount),
                periodic: toLocaleString(total / term)
            };
        }),
        formattedMinAmount: toLocaleString(terms.minAmount),
        formattedMaxAmount: toLocaleString(terms.maxAmount)
    };
};
