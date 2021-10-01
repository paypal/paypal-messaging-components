import fs from 'fs';
import path from 'path';

import devAccountMap from '../config/devAccounts.config';
import devAccountMapV2 from '../config/devAccountsV2.config';
import { getTerms } from './mockTerms';
import { localizeCurrency, localizeNumber } from './miscellaneous';

const selectBestOffer = (offers = [], amount) =>
    offers.reduce(
        (acc, offer) =>
            (offer.min && amount < offer.min) || (offer.max && amount > offer.max) || acc?.term > offer.term
                ? acc
                : offer,
        undefined
    );

const getMorsVars = (country, offer, amount) => {
    const toLocaleNumber = localizeNumber(country);
    const toLocaleCurrency = localizeCurrency(country);
    const { apr, nominalRate, term, minAmount, maxAmount } = offer;
    const total = amount + amount * (apr * 0.01) * (term / 12);

    return {
        financing_code: Math.random()
            .toString(36)
            .slice(2),
        qualifying_offer: (amount > minAmount ?? 0) && (amount < maxAmount ?? Infinity) ? 'true' : 'false',
        apr,
        nominal_rate: nominalRate,
        minAmount,
        maxAmount,
        total_payments: term,
        transaction_amount: amount,
        formattedAPR: toLocaleNumber(apr),
        formattedMinAmount: toLocaleCurrency(minAmount),
        formattedMaxAmount: toLocaleCurrency(maxAmount),
        formattedTransactionAmount: amount ? toLocaleCurrency(amount) : '-',
        formattedTotalCost: amount ? toLocaleCurrency(total) : '-',
        formattedPeriodicPayment: amount ? toLocaleCurrency(total / term) : '-',
        formattedMonthlyPayment: amount ? toLocaleCurrency(total / term) : '-'
    };
};

export default function getDevAccountDetails(account, amount) {
    if (devAccountMap[account]) {
        const [country, productNames, messageName] = devAccountMap[account];
        const offers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/terms.json'), 'utf-8'));
        const terms = getTerms(country, offers, Number(amount));

        return {
            country,
            terms,
            modals: productNames.map(modalName => ({
                template: fs.readFileSync(`content/modals/${country}/${modalName}.json`, 'utf8'),
                morsVars: getMorsVars(country, selectBestOffer(offers, amount), amount)
            })),
            message: {
                template: fs.readFileSync(`content/messages/${country}/${messageName}.json`, 'utf8'),
                morsVars: getMorsVars(country, selectBestOffer(offers, amount), amount)
            }
        };
    }

    if (devAccountMapV2[account]) {
        const { country, modalViews, messageThresholds, offers } = devAccountMapV2[account];
        const [, messageName, messageProductName] = messageThresholds.find(([minAmount]) => minAmount < amount) ?? [];

        return {
            country,
            modals: modalViews.map(modalName => ({
                template: fs.readFileSync(`content/modals/${country}/${modalName}.json`, 'utf8'),
                morsVars: getMorsVars(country, selectBestOffer(offers[modalName], amount), amount)
            })),
            message: {
                template: fs.readFileSync(`content/messages/${country}/${messageName}.json`, 'utf8'),
                morsVars: getMorsVars(country, selectBestOffer(offers[messageProductName], amount), amount)
            }
        };
    }

    throw new Error(`Missing dev account: ${account}`);
}
