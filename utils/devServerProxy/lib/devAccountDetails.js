import fs from 'fs';
import path from 'path';

import devAccountMap from '../config/devAccounts.config';
import devAccountMapV2 from '../config/devAccountsV2.config';
import { getTerms } from './mockTerms';
import { localizeCurrency, localizeNumber } from './miscellaneous';

const CONTENT_PATH = path.resolve(__dirname, '../../../content');

// eslint-disable-next-line default-param-last
const selectBestOffer = (offers = [], amount) =>
    offers.reduce(
        (acc, offer) =>
            (offer.min && amount < offer.min) ||
            (offer.max && amount > offer.max) ||
            acc?.totalPayments > offer.totalPayments
                ? acc
                : offer,
        undefined
    );

/**
 * @description Get labels based on country
 * @param {string} country
 * @returns array of locale date labels
 */
const countryBasedPaymentDates = country => {
    let dateGroup = [];
    switch (country) {
        case 'US':
            dateGroup = ['Today', '2 weeks', '4 weeks', '6 weeks'];
            break;
        case 'IT':
            dateGroup = ['Oggi', 'Tra 1 mese', 'Tra 2 mesi'];
            break;
        case 'GB':
            dateGroup = ['Today', '1 month', '2 months'];
            break;
        case 'FR':
            dateGroup = ["Aujourd'hui", '1 mois', '2 mois', '3 mois'];
            break;
        case 'ES':
            dateGroup = ['Hoy', '1 mes', '2 meses'];
            break;
        case 'AU':
            dateGroup = ['Today', '2 weeks', '4 weeks', '6 weeks'];
            break;
        default:
            break;
    }
    return dateGroup;
};

/**
 * Create estimate installments items array
 * @param {object}
 * @returns array of payments and date objects
 */
const countryBasedInstallments = ({ amount, total, totalPayments, country }) => {
    const toLocaleCurrency = localizeCurrency(country);
    return countryBasedPaymentDates(country).map(dateLabel => ({
        total_payment: amount ? toLocaleCurrency(total / totalPayments) : '-',
        payment_date: dateLabel
    }));
};

const getMorsVars = (country, offer, amount) => {
    if (!offer) {
        // If no offer, return proxy object that always returns '-' for its variable values
        return new Proxy({}, { get: () => '-' });
    }

    const toLocaleNumber = localizeNumber(country);
    const toLocaleCurrency = localizeCurrency(country);
    const { apr, nominalRate, totalPayments, minAmount, maxAmount } = offer;
    const total = Number(amount) + Number(amount) * (apr * 0.01) * (totalPayments / 12);
    const totalInterest = total - Number(amount);

    return {
        financing_code: Math.random().toString(36).slice(2),
        qualifying_offer: (amount >= minAmount ?? 0) && (amount <= maxAmount ?? Infinity) ? 'true' : 'false',
        apr,
        nominal_rate: nominalRate,
        minAmount: minAmount.toString(),
        maxAmount: maxAmount.toString(),
        total_payments: totalPayments,
        transaction_amount: amount ? amount.toString() : '-',
        formattedAPR: toLocaleNumber(apr),
        formattedMinAmount: toLocaleCurrency(minAmount),
        formattedMaxAmount: toLocaleCurrency(maxAmount),
        formattedTransactionAmount: amount ? toLocaleCurrency(amount) : '-',
        formattedTotalCost: amount ? toLocaleCurrency(total) : '-',
        formattedPeriodicPayment: amount ? toLocaleCurrency(total / totalPayments) : '-',
        formattedMonthlyPayment: amount ? toLocaleCurrency(total / totalPayments) : '-',
        formattedTotalInterest: amount ? toLocaleCurrency(totalInterest) : '-',
        estimated_installments: countryBasedInstallments({ amount, total, totalPayments, country })
    };
};

export default function getDevAccountDetails({ account, amount, buyerCountry }) {
    if (devAccountMap[account]) {
        const [country, productNames, messageName] = devAccountMap[account];
        const offers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/terms.json'), 'utf-8'));
        const terms = getTerms(country, offers, Number(amount));

        return {
            country,
            terms,
            modalViews: productNames.map(modalName => ({
                template: fs.readFileSync(`${CONTENT_PATH}/modals/${country}/${modalName}.json`, 'utf8'),
                morsVars: getMorsVars(country, selectBestOffer(offers, amount), amount)
            })),
            message: {
                template: fs.readFileSync(`${CONTENT_PATH}/messages/${country}/${messageName}.json`, 'utf8'),
                morsVars: getMorsVars(country, selectBestOffer(offers, amount), amount)
            }
        };
    }

    if (devAccountMapV2[account]) {
        const { country, modalViews, messageThresholds, offers } = devAccountMapV2[account];
        const selectedMessage =
            messageThresholds.find(
                ({ amount: minAmount }) => (amount === undefined && amount === minAmount) || minAmount < amount
            ) ?? messageThresholds[messageThresholds.length - 1];

        const messageTemplate =
            buyerCountry && buyerCountry !== country && selectedMessage.templateXB
                ? fs.readFileSync(`${CONTENT_PATH}/messages/${country}/${selectedMessage.templateXB}`, 'utf8')
                : fs.readFileSync(`${CONTENT_PATH}/messages/${country}/${selectedMessage.template}`, 'utf8');

        return {
            country,
            modalViews: modalViews.map(({ template, offersTemplate, product }) => {
                const viewTemplate = JSON.parse(
                    fs.readFileSync(`${CONTENT_PATH}/modals/${country}/${template}`, 'utf8')
                );
                delete viewTemplate.meta.variables; // Not part of the final response

                const viewOffersTemplate =
                    offersTemplate &&
                    JSON.parse(fs.readFileSync(`${CONTENT_PATH}/offers/${country}/${offersTemplate}`, 'utf8'));

                if (viewOffersTemplate) {
                    delete viewOffersTemplate.meta.variables; // Not part of the final response
                }

                const viewOffers = offers[product];

                return {
                    template: JSON.stringify(viewTemplate),
                    morsVars: viewOffers ? getMorsVars(country, selectBestOffer(viewOffers, amount), amount) : {},
                    offers:
                        viewOffersTemplate &&
                        viewOffers &&
                        viewOffers.map(offer => ({
                            template: JSON.stringify(viewOffersTemplate),
                            morsVars: getMorsVars(country, offer, amount)
                        }))
                };
            }),
            message: {
                template: messageTemplate,
                morsVars: getMorsVars(country, selectBestOffer(offers[selectedMessage.product], amount), amount)
            }
        };
    }

    throw new Error(`Missing dev account: ${account}`);
}
