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

    const banner = JSON.stringify(__MESSAGES__.__SANDBOX__[`__${dimensions !== 'x199x99' ? 'EZP' : 'NI'}__`]);

    const morsVars = {
        tot_pymts: `$${Number(amount).toFixed(2)}`,
        term: 12,
        pymt_mo: `$${Number(amount / 12).toFixed(2)}`
    };

    const populatedBanner = objectEntries(morsVars)
        // eslint-disable-next-line security/detect-non-literal-regexp
        .reduce((accumulator, [morsVar, val]) => accumulator.replace(new RegExp(`\\\${${morsVar}}`, 'g'), val), banner)
        .replace(/"/g, '\\"')
        .replace(/\r\n|\r|\n/g, '');

    return `${query.call}("<div>${populatedBanner}</div>")`;
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
            monthly: monthly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            // eslint-disable-next-line security/detect-unsafe-regex, unicorn/no-unsafe-regex
            total: total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            isNonQualified: Number(query.amount) < Number(option.minValue)
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
