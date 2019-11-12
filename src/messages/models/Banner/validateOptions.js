import arrayFind from 'core-js-pure/stable/array/find';
import objectEntries from 'core-js-pure/stable/object/entries';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { curry, objectClone } from '../../../utils';
import { EVENTS } from '../../services/logger';
import { Types, validateType } from './types';

import { getValidOptions } from '../../../locale';

const VALID_OPTIONS = {
    id: [Types.STRING],
    _legacy: [Types.BOOLEAN],
    onRender: [Types.FUNCTION],
    currencyCode: [Types.STRING, ['USD', 'EUR']]
};

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
export const validateStyleOptions = curry((logger, style) => {
    const validStyleOptions = getValidOptions();

    const validatedStyle = (() => {
        if (validStyleOptions[style.layout]) {
            return getValidStyleOptions(logger, validStyleOptions, style);
        }

        logInvalidOption(logger, 'style.layout', Object.keys(validStyleOptions), style.layout);

        // Get the default settings for a text banner
        return getValidStyleOptions(logger, validStyleOptions, {
            layout: 'text'
        });
    })();

    logger.info(EVENTS.VALIDATE_STYLE, { style: objectClone(validatedStyle) });

    return validatedStyle;
});

/**
 * Validate user options object. Warn the user against invalid options
 * and ensure only valid options are returned
 * @param {Object} options User options object
 * @returns {Object} Object containing only valid options
 */
export default curry((logger, { account, amount, style, offer, currency, ...otherOptions }) => {
    const validOptions = populateDefaults(logger, VALID_OPTIONS, otherOptions, ''); // Combination of all valid style option combinations

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

    if (typeof offer !== 'undefined') {
        if (!validateType(Types.STRING, offer)) {
            logInvalidType(logger, 'offer', Types.STRING, offer);
        } else if (offer !== 'NI') {
            logInvalid(logger, 'offer', 'Ensure valid offer type.');
        } else {
            validOptions.offerType = offer;
        }
    }

    if (typeof currency !== 'undefined') {
        // Only set currency option if a value was passed in, so we don't override the SDK value with our default of USD
        validOptions.currency = getValidVal(logger, VALID_OPTIONS.currency, currency, 'currency');
    }

    if (validateType(Types.OBJECT, style) && validateType(Types.STRING, style.layout)) {
        validOptions.style = style;
    } else {
        if (validateType(Types.OBJECT, style)) {
            logInvalidType(logger, 'style.layout', Types.STRING, style.layout);
        } else if (style !== undefined) {
            logInvalidType(logger, 'style', Types.OBJECT, style);
        }

        // Get the default settings for a text banner
        validOptions.style = { layout: 'text' };
    }

    logger.info(EVENTS.VALIDATE_CONFIG, { options: objectClone(validOptions) });

    return validOptions;
});
