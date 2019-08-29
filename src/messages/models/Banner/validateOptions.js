import arrayFind from 'core-js-pure/stable/array/find';
import objectEntries from 'core-js-pure/stable/object/entries';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { curry, objectClone } from '../../../utils';
import { EVENTS } from '../../services/logger';
import Types from './types';

import USOptions from './Options/US';
import DEOptions from './Options/DE';

const VALID_OPTIONS = {
    id: [Types.STRING],
    _legacy: [Types.BOOLEAN],
    onRender: [Types.FUNCTION]
};

// Combination of all valid style option combinations
export const VALID_STYLE_OPTIONS = (() => {
    // Webpack will not properly tree-shake a switch block
    if (__MESSAGES__.__LOCALE__ === 'DE') {
        return DEOptions;
    }

    if (__MESSAGES__.__LOCALE__ === 'US') {
        return USOptions;
    }

    return null;
})();

// Formalized validation logger helper functions
const logInvalid = (logger, location, message) => logger.warn(`Invalid option value (${location}). ${message}`);
const logInvalidType = (logger, location, expectedType, val) =>
    logInvalid(logger, location, `Expected type "${expectedType.toLowerCase()}" but instead received "${typeof val}".`);
const logInvalidOption = (logger, location, options, val) =>
    logInvalid(
        logger,
        location,
        `Expected one of ["${options.join('", "').replace(/\|[\w|]+/g, '')}"] but received "${val}".`
    );

function validateType(expectedType, val) {
    switch (expectedType) {
        case Types.STRING:
            return typeof val === 'string';
        case Types.BOOLEAN:
            return typeof val === 'boolean';
        case Types.NUMBER:
            return typeof val === 'number' && !numberIsNaN(val);
        case Types.FUNCTION:
            return typeof val === 'function';
        case Types.OBJECT:
            return typeof val === 'object' && val !== null;
        case Types.ANY:
            return true;
        default:
            return false;
    }
}

function getValidVal(logger, typeArr, val, location) {
    const [type, validVals = []] = typeArr;

    if (val === undefined) {
        return validVals[0];
    }

    if (validateType(type, val)) {
        if (type === Types.STRING && validVals.length > 0) {
            // Check if aliased value used.
            const validVal = arrayFind(validVals, v => v.split('|').some(x => x === val));
            if (validVal === undefined) {
                logInvalidOption(logger, location, validVals, val);
                return validVals[0].split('|')[0];
            }

            return validVal.split('|')[0];
        }

        return val;
    }

    logInvalidType(logger, location, type, val);
    return validVals[0];
}

/**
 * Create object using default object as base and replacing
 * with user options if available and valid
 * @param {Object} defaults Default values if missing from user options
 * @param {Object} options User style options
 * @param {String} prefix Keep track of property location. Used for logging.
 * @returns {Object} Object with user style options or default values if missing
 */
function populateDefaults(logger, defaults, options, prefix = 'style.') {
    return objectEntries(defaults).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            const validVal = getValidVal(logger, val, options[key], `${prefix}${key}`);

            // Don't put empty properties on the object
            return validVal === undefined
                ? accumulator
                : {
                      ...accumulator,
                      [key]: validVal
                  };
        }

        return {
            ...accumulator,
            [key]: populateDefaults(logger, defaults[key], options[key] || {}, `${prefix}${key}.`)
        };
    }, {});
}

/**
 * Create a valid style object based on user options
 * @param {Object} options User style options
 * @returns {Object} Object containing only valid style options
 */
function getValidStyleOptions(logger, localeStyleOptions, options) {
    return {
        layout: options.layout,
        ...populateDefaults(logger, localeStyleOptions[options.layout], options)
    };
}

/**
 * Validate user options object. Warn the user against invalid options
 * and ensure only valid options are returned
 * @param {Object} options User options object
 * @returns {Object} Object containing only valid options
 */
export default curry((logger, { account, amount, country, style, ...otherOptions }) => {
    const validOptions = populateDefaults(logger, VALID_OPTIONS, otherOptions, '');

    if (!validateType(Types.STRING, account)) {
        logInvalidType(logger, 'account', Types.STRING, account);
    } else if (account.length !== 13 && account.length !== 10 && !stringStartsWith(account, 'client-id:')) {
        logInvalid(logger, 'account', 'Ensure the correct Merchant Account ID has been entered.');
    } else {
        validOptions.account = account;
    }

    if (typeof amount !== 'undefined') {
        const numberAmount = Number(amount);

        if (!validateType(Types.NUMBER, numberAmount)) {
            logInvalidType(logger, 'amount', Types.NUMBER, amount);
        } else if (numberAmount < 0) {
            logInvalid(logger, 'amount', 'Ensure value is a positive number.');
        } else {
            validOptions.amount = numberAmount;
        }
    }

    if (typeof country !== 'undefined') {
        if (!validateType(Types.STRING, country)) {
            logInvalidType(logger, 'country', Types.STRING, country);
        } else if (country.length !== 2) {
            logInvalid(logger, 'country', 'Country code should be 2 characters.');
        } else {
            validOptions.country = country;
        }
    }

    if (
        validateType(Types.OBJECT, style) &&
        validateType(Types.STRING, style.layout) &&
        VALID_STYLE_OPTIONS[style.layout]
    ) {
        validOptions.style = getValidStyleOptions(logger, VALID_STYLE_OPTIONS, style);
    } else {
        if (validateType(Types.OBJECT, style)) {
            logInvalidOption(logger, 'style.layout', Object.keys(VALID_STYLE_OPTIONS), style.layout);
        } else if (style !== undefined) {
            logInvalidType(logger, 'style', Types.OBJECT, style);
        }

        // Get the default settings for a text banner
        validOptions.style = getValidStyleOptions(logger, VALID_STYLE_OPTIONS, { layout: 'text' });
    }

    logger.info(EVENTS.VALIDATE, { options: objectClone(validOptions) });

    return validOptions;
});
