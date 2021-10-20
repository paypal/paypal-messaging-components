import { localizeNumber } from './miscellaneous';

// This function does not represent how PayPal calculates the true rates
export const getTerms = (country, offers, amount) => {
    const toLocaleString = localizeNumber(country);

    const { totalMinAmount, totalMaxAmount } = offers.reduce((acc, { minAmount, maxAmount }) => {
        if (minAmount < (acc.totalMinAmount ?? Infinity)) {
            acc.totalMinAmount = minAmount;
        }

        if (maxAmount > (acc.totalMaxAmount ?? 0)) {
            acc.totalMaxAmount = maxAmount;
        }

        return acc;
    }, {});

    return {
        type: amount ? 'pala' : 'generic',
        minAmount: totalMinAmount,
        maxAmount: totalMaxAmount,
        // If no amount passed in, set amount to undefined to match production
        // Format as string to match production
        amount: amount ? amount.toString() : undefined,
        formattedAmount: toLocaleString(amount),
        offers: offers.map(({ totalPayments, apr, nominalRate, minAmount, maxAmount }) => {
            const total = amount + amount * (apr * 0.01) * (totalPayments / 12);
            return {
                term: totalPayments,
                type: 'INST',
                apr: toLocaleString(apr),
                nominalRate: toLocaleString(nominalRate),
                minValue: toLocaleString(minAmount),
                maxValue: toLocaleString(maxAmount),
                qualified: amount >= minAmount && amount <= maxAmount,
                monthly: toLocaleString(total / totalPayments),
                total: toLocaleString(total),
                totalInterest: toLocaleString(total - amount),
                periodic: toLocaleString(total / totalPayments)
            };
        }),
        formattedMinAmount: totalMinAmount && toLocaleString(totalMinAmount),
        formattedMaxAmount: totalMaxAmount && toLocaleString(totalMaxAmount)
    };
};
