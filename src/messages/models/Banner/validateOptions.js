import arrayFind from 'core-js-pure/stable/array/find';
import objectEntries from 'core-js-pure/stable/object/entries';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { logger } from '../../services/logger';

const Types = {
    ANY: 'ANY',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    NUMBER: 'NUMBER',
    FUNCTION: 'FUNCTION',
    OBJECT: 'OBJECT'
};

const VALID_OPTIONS = {
    id: [Types.STRING],
    _legacy: [Types.BOOLEAN],
    onRender: [Types.FUNCTION]
};

// Combination of all valid style option combinations
const VALID_STYLE_OPTIONS = {
    text: {
        logo: {
            type: [Types.STRING, ['primary', 'alternative', 'inline', 'none']],
            position: [Types.STRING, ['left', 'right', 'top']]
        },
        text: {
            color: [Types.STRING, ['black', 'white']]
        }
    },
    flex: {
        color: [Types.STRING, ['blue', 'black', 'white', 'white-no-border', 'gray|grey']],
        ratio: [Types.STRING, ['1x1', '1x4', '8x1', '20x1']]
    },
    legacy: {
        typeNI: [Types.STRING, ['', 'image', 'html']],
        typeEZP: [Types.STRING, ['', 'html']],
        size: [Types.STRING],
        color: [Types.STRING, ['none', 'blue', 'black', 'gray|grey', 'white']],
        border: [Types.BOOLEAN, [true, false]]
    },
    custom: {
        markup: [Types.STRING],
        ratio: [Types.ANY]
    }
};

// Formalized validation logger helper functions
const logInvalid = (location, message) => logger.warn(`Invalid option value (${location}). ${message}`);
const logInvalidType = (location, expectedType, val) =>
    logInvalid(location, `Expected type "${expectedType.toLowerCase()}" but instead received "${typeof val}".`);
const logInvalidOption = (location, options, val) =>
    logInvalid(location, `Expected one of ["${options.join('", "').replace(/\|[\w|]+/g, '')}"] but received "${val}".`);

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

function getValidVal(typeArr, val, location) {
    const [type, validVals = []] = typeArr;

    if (val === undefined) {
        return validVals[0];
    }

    if (validateType(type, val)) {
        if (type === Types.STRING && validVals.length > 0) {
            // Check if aliased value used.
            const validVal = arrayFind(validVals, v => v.split('|').some(x => x === val));
            if (validVal === undefined) {
                logInvalidOption(location, validVals, val);
                return validVals[0].split('|')[0];
            }

            return validVal.split('|')[0];
        }

        return val;
    }

    logInvalidType(location, type, val);
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
function populateDefaults(defaults, options, prefix = 'style.') {
    return objectEntries(defaults).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            const validVal = getValidVal(val, options[key], `${prefix}${key}`);

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
            [key]: populateDefaults(defaults[key], options[key] || {}, `${prefix}${key}.`)
        };
    }, {});
}

/**
 * Create a valid style object based on user options
 * @param {Object} options User style options
 * @returns {Object} Object containing only valid style options
 */
function getValidStyleOptions(options) {
    return {
        layout: options.layout,
        ...populateDefaults(VALID_STYLE_OPTIONS[options.layout], options)
    };
}

/**
 * Validate user options object. Warn the user against invalid options
 * and ensure only valid options are returned
 * @param {Object} options User options object
 * @returns {Object} Object containing only valid options
 */
export default function validateOptions({ account, amount, countryCode, style, ...otherOptions }) {
    const validOptions = populateDefaults(VALID_OPTIONS, otherOptions, '');

    if (!validateType(Types.STRING, account)) {
        logInvalidType('account', Types.STRING, account);
    } else if (account.length !== 13 && account.length !== 10 && !stringStartsWith(account, 'client-id:')) {
        logInvalid('account', 'Ensure the correct Merchant Account ID has been entered.');
    } else {
        validOptions.account = account;
    }

    if (typeof amount !== 'undefined') {
        const numberAmount = Number(amount);

        if (!validateType(Types.NUMBER, numberAmount)) {
            logInvalidType('amount', Types.NUMBER, amount);
        } else if (numberAmount < 0) {
            logInvalid('amount', 'Ensure value is a positive number.');
        } else {
            validOptions.amount = numberAmount;
        }
    }

    if (typeof countryCode !== 'undefined') {
        if (!validateType(Types.STRING, countryCode)) {
            logInvalidType('countryCode', Types.STRING, countryCode);
        } else if (countryCode.length !== 2) {
            logInvalid('countryCode', 'Country code should be 2 characters.');
        } else {
            validOptions.countryCode = countryCode;
        }
    }

    if (
        validateType(Types.OBJECT, style) &&
        validateType(Types.STRING, style.layout) &&
        VALID_STYLE_OPTIONS[style.layout]
    ) {
        validOptions.style = getValidStyleOptions(style);
    } else {
        if (validateType(Types.OBJECT, style)) {
            logInvalidOption('style.layout', Object.keys(VALID_STYLE_OPTIONS), style.layout);
        } else if (style !== undefined) {
            logInvalidType('style', Types.OBJECT, style);
        }

        // Get the default settings for a text banner
        validOptions.style = getValidStyleOptions({ layout: 'text' });
    }

    return validOptions;
}
