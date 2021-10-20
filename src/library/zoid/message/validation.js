import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';

import { logger, memoize, getEnv } from '../../../utils';

export const Types = {
    ANY: 'ANY',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    NUMBER: 'NUMBER',
    FUNCTION: 'FUNCTION',
    ARRAY: 'ARRAY',
    OBJECT: 'OBJECT'
};

export function validateType(expectedType, val) {
    switch (expectedType) {
        case Types.STRING:
            return typeof val === 'string';
        case Types.BOOLEAN:
            return typeof val === 'boolean';
        case Types.NUMBER:
            return typeof val === 'number' && !numberIsNaN(val);
        case Types.FUNCTION:
            return typeof val === 'function';
        case Types.ARRAY:
            return Array.isArray(val);
        case Types.OBJECT:
            return !Array.isArray(val) && typeof val === 'object' && val !== null;
        case Types.ANY:
            return true;
        default:
            return false;
    }
}

// Formalized validation logger helper functions
const logInvalid = memoize((location, message) =>
    logger.warn('invalid_option_value', {
        description: message,
        location
    })
);
const logInvalidType = (location, expectedType, val) => {
    const valType = Array.isArray(val) ? 'array' : typeof val;
    logInvalid(
        location,
        `Expected type "${expectedType.toLowerCase()}" but instead received "${valType}" (${JSON.stringify(val)}).`
    );
};
const logInvalidOption = (location, options, val) =>
    logInvalid(location, `Expected one of ["${options.join('", "').replace(/\|[\w|]+/g, '')}"] but received "${val}".`);

export default {
    account: ({ props: { account } }) => {
        if (!validateType(Types.STRING, account)) {
            logInvalidType('account', Types.STRING, account);
        } else if (getEnv() === 'local' && stringStartsWith(account, 'DEV_')) {
            return account;
        } else if (account.length !== 13 && account.length !== 10 && !stringStartsWith(account, 'client-id:')) {
            logInvalid('account', 'Ensure the correct Merchant Account ID has been entered.');
        } else {
            return account;
        }

        return undefined;
    },
    merchantId: ({ props: { merchantId } }) => {
        if (typeof merchantId !== 'undefined') {
            if (!validateType(Types.STRING, merchantId)) {
                logInvalidType('merchantId', Types.STRING, merchantId);
            } else if (merchantId.length !== 13 && merchantId.length !== 10) {
                logInvalid('merchantId', 'Ensure the correct Merchant ID has been entered.');
            } else {
                return merchantId;
            }
        }

        return undefined;
    },
    customerId: ({ props: { customerId } }) => {
        if (typeof customerId !== 'undefined') {
            if (!validateType(Types.STRING, customerId)) {
                logInvalidType('customerId', Types.STRING, customerId);
            } else if (customerId.length !== 13 && customerId.length !== 10) {
                logInvalid('customerId', 'Ensure the correct Merchant ID has been entered.');
            } else {
                return customerId;
            }
        }

        return undefined;
    },
    amount: ({ props: { amount } }) => {
        if (typeof amount !== 'undefined') {
            const numberAmount = Number(amount);

            if (!validateType(Types.NUMBER, numberAmount)) {
                logInvalidType('amount', Types.NUMBER, amount);
            } else if (numberAmount < 0) {
                logInvalid('amount', 'Ensure value is a positive number.');
            } else {
                return numberAmount;
            }
        }

        return undefined;
    },
    offer: ({ props: { offer } }) => {
        if (typeof offer !== 'undefined') {
            if (!validateType(Types.STRING, offer)) {
                logInvalidType('offer', Types.STRING, offer);
            } else if (offer !== 'NI') {
                logInvalid('offer', 'Ensure valid offer type.');
            } else {
                return offer;
            }
        }

        return undefined;
    },
    // TODO: Handle server side locale specific style validation warnings passed down to client.
    // Likely makes sens to pass down in the onReady callback
    style: ({ props: { style: styleInput } }) => {
        if (validateType(Types.OBJECT, styleInput)) {
            const style = styleInput?.layout ? styleInput : { ...styleInput, layout: 'text' };

            if (validateType(Types.STRING, style.layout)) {
                return style;
            }
            logInvalidType('style.layout', Types.STRING, style.layout);

            if (validateType(Types.STRING, style.preset)) {
                return {
                    layout: 'text',
                    ...style
                };
            }
        } else if (typeof styleInput !== 'undefined') {
            logInvalidType('style', Types.OBJECT, styleInput);
        }

        // Get the default settings for a text banner
        return { layout: 'text' };
    },
    currency: ({ props: { currency } }) => {
        if (typeof currency !== 'undefined') {
            if (!validateType(Types.STRING, currency)) {
                logInvalidType('currency', Types.STRING, currency);
            } else {
                return currency;
            }
        }

        return undefined;
    },
    placement: ({ props: { placement } }) => {
        if (typeof placement !== 'undefined') {
            const options = ['home', 'category', 'product', 'cart', 'payment'];

            if (!validateType(Types.STRING, placement)) {
                logInvalidType('placement', Types.STRING, placement);
            } else if (!arrayIncludes(options, placement)) {
                logInvalidOption('placement', options, placement);
            } else {
                return placement;
            }
        }

        return undefined;
    },
    buyerCountry: ({ props: { buyerCountry } }) => {
        if (typeof buyerCountry !== 'undefined') {
            if (!validateType(Types.STRING, buyerCountry)) {
                logInvalidType('buyerCountry', Types.STRING, buyerCountry);
            } else {
                return buyerCountry;
            }
        }

        return undefined;
    },
    ignoreCache: ({ props: { ignoreCache } }) => {
        if (typeof ignoreCache !== 'undefined') {
            if (!validateType(Types.BOOLEAN, ignoreCache)) {
                logInvalidType('ignoreCache', Types.BOOLEAN, ignoreCache);
            } else {
                return ignoreCache;
            }
        }

        return undefined;
    },
    channel: ({ props: { channel } }) => {
        if (typeof channel !== 'undefined') {
            const options = ['UPSTREAM', 'CHECKOUT'];
            if (validateType(Types.STRING, channel) && arrayIncludes(options, channel)) {
                return channel;
            }
            if (!arrayIncludes('channel', options, channel)) {
                logInvalidOption('channel', options, channel);
            }
            if (!validateType(Types.STRING, channel)) {
                logInvalidType('channel', Types.STRING, channel);
            }
        }

        return undefined;
    }
};
