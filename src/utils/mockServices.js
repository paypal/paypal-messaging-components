import objectEntries from 'core-js-pure/stable/object/entries';
import startsWith from 'core-js-pure/stable/string/starts-with';

import { getGlobalUrl } from '.';

const parseQuery = url =>
    url
        .split('?')[1]
        .split('&')
        .reduce((accumulator, pair) => {
            const [key, val] = pair.split('=');
            return {
                ...accumulator,
                [key]: val
            };
        }, {});

function messageFetcher(url) {
    const query = parseQuery(url);

    const { currency_value: amount = '0', dimensions } = query;

    const termOptions = __MESSAGES__.__SANDBOX__.__TERMS__.options;
    const qualifiedTerms = termOptions.filter(({ minValue }) => Number(amount || 0) >= Number(minValue));

    let message;
    if (dimensions === 'x199x99') {
        message = __MESSAGES__.__SANDBOX__.__NI__;
    } else if (qualifiedTerms.length === 0) {
        message = __MESSAGES__.__SANDBOX__.__EZP__;
    } else if (qualifiedTerms.length === 1) {
        message = __MESSAGES__.__SANDBOX__.__PALA_SINGLE__;
    } else {
        message = __MESSAGES__.__SANDBOX__.__PALA_MULTI__;
    }

    const bestOffer = qualifiedTerms.slice(-1)[0];
    const maxTerms = bestOffer ? bestOffer.term : termOptions.slice(0, 1)[0].term;
    const morsVars = {
        formattedTotalCost: `$${Number(amount).toFixed(2)}`,
        total_payments: maxTerms,
        formattedMonthlyPayment: `$${Number(amount / maxTerms).toFixed(2)}`
    };

    const populateVars = str =>
        objectEntries(morsVars)
            .reduce(
                (accumulator, [morsVar, val]) =>
                    // eslint-disable-next-line security/detect-non-literal-regexp
                    accumulator.replace(new RegExp(`\\\${CREDIT_OFFERS_DS.${morsVar}}`, 'g'), val),
                str
            )
            .replace(/\r\n|\r|\n/g, '');

    const populatedBanner = objectEntries(message).reduce((accumulator, [key, value]) => {
        return {
            ...accumulator,
            [key]: populateVars(JSON.stringify(value))
        };
    }, {});

    const data = JSON.stringify({
        content: {
            json: populatedBanner
        },
        tracking_details: {
            click_url: '/webapps/mch/cmd/?fdata=null',
            impression_url: '/webapps/mch/cmd/?fdata=null'
        }
    });

    return `${query.call}(${data})`;
}

function termsFetcher(url) {
    const query = parseQuery(url);
    const terms = __MESSAGES__.__SANDBOX__.__TERMS__;

    terms.amount = query.amount;
    terms.options = terms.options.map(option => {
        // Not the correct math
        const total = Number(query.amount) + (Number(query.amount) * Number(option.apr)) / 100;
        const monthly = total / option.term;

        return {
            ...option,
            // eslint-disable-next-line security/detect-unsafe-regex, unicorn/no-unsafe-regex
            monthly: (monthly || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            // eslint-disable-next-line security/detect-unsafe-regex, unicorn/no-unsafe-regex
            total: (total || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            isNonQualified: Number(query.amount || 0) < Number(option.minValue)
        };
    });

    return JSON.stringify(terms);
}

export default function mockServices({ duration = 500 } = {}) {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function open(method, url, ...rest) {
        this._url = url;
        originalOpen.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function send(...args) {
        if (startsWith(this._url, getGlobalUrl('MESSAGE')) || startsWith(this._url, getGlobalUrl('TERMS'))) {
            setTimeout(() => {
                Object.defineProperty(this, 'responseText', { writable: true });
                this.responseText = startsWith(this._url, getGlobalUrl('MESSAGE'))
                    ? messageFetcher(this._url)
                    : termsFetcher(this._url);
                Object.defineProperty(this, 'readyState', { writable: true });
                this.readyState = 4;
                Object.defineProperty(this, 'status', { writable: true });
                this.status = 200;

                this.dispatchEvent(new Event('readystatechange'));
            }, duration);
        } else {
            originalSend.apply(this, args);
        }
    };
}
