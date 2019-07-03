import arrayFind from 'core-js-pure/stable/array/find';
import objectAssign from 'core-js-pure/stable/object/assign';
import objectEntries from 'core-js-pure/stable/object/entries';
import numberIsNaN from 'core-js-pure/stable/number/is-nan';

import { logger } from '../../services/logger';

const Types = {
    ANY: 'ANY',
    STRING: 'STRING',
    BOOLEAN: 'BOOLEAN',
    FUNCTION: 'FUNCTION'
};

const TypeMap = {
    [Types.STRING]: 'string',
    [Types.BOOLEAN]: 'boolean',
    [Types.FUNCTION]: 'function'
};

const VALID_OPTIONS = {
    onRender: [Types.FUNCTION],
    sign: [Types.STRING]
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

const logInvalidType = (location, expectedType, val) =>
    logger.warn(
        `Invalid option value (${location}). Expected type "${expectedType}" but instead received "${typeof val}".`
    );

function validateType(expectedType, val) {
    if (TypeMap[expectedType] === Types.BOOLEAN) {
        return typeof val === 'boolean';
    }

    if (expectedType === Types.FUNCTION) {
        return typeof val === 'function';
    }

    if (expectedType === Types.STRING) {
        return typeof val === 'string';
    }

    return true;
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
                logger.warn(
                    `Invalid option value (${location}). Expected one of ["${validVals
                        .join('", "')
                        .replace(/\|[\w|]+/g, '')}"] but received "${val}".`
                );
            } else {
                return validVal.split('|')[0];
            }
        }

        return val;
    }

    logInvalidType(location, TypeMap[type], val);
    return validVals[0];
}

/**
 * Create object using default object as base and replacing
 * with user options if available and valid
 * @param {Object} defaults Default values if missing from user options
 * @param {Object} options User style options
 * @returns {Object} Object with user style options or default values if missing
 */
function populateDefaults(defaults, options, prefix = 'style.') {
    return objectEntries(defaults).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            return {
                ...accumulator,
                [key]: getValidVal(val, options[key], `${prefix}${key}`)
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
export default function validateOptions({ id, account, amount, countryCode, style, _legacy, ...otherOptions }) {
    const validOptions = { _legacy, id };

    if (typeof account !== 'string') {
        logInvalidType('account', 'string', account);
    } else if (account.length !== 13 && account.length !== 10) {
        logger.warn('Invalid option value (account). Ensure the correct Merchant Account ID has been entered.');
    } else {
        validOptions.account = account;
    }

    if (typeof amount !== 'undefined') {
        const numberAmount = Number(amount);

        if (numberIsNaN(numberAmount)) {
            logger.warn('Invalid option value (amount). Ensure value is a number.');
        } else if (numberAmount < 0) {
            logger.warn('Invalid option value (amount). Ensure value is a positive number.');
        } else {
            validOptions.amount = numberAmount;
        }
    }

    if (typeof countryCode !== 'undefined') {
        if (typeof countryCode !== 'string') {
            logger.warn('Invalid option value (countryCode). Ensure value is a string.');
        } else if (countryCode.length !== 2) {
            logger.warn('Invalid option value (countryCode). Country code should be 2 characters.');
        } else {
            validOptions.countryCode = countryCode;
        }
    }

    if (typeof style !== 'object' || typeof style.layout !== 'string' || !VALID_STYLE_OPTIONS[style.layout]) {
        if (typeof style === 'object') {
            logger.warn(
                `Invalid option value (style.layout). Expected one of ["${Object.keys(VALID_STYLE_OPTIONS).join(
                    '", "'
                )}"] but received "${style.layout}".`
            );
        } else if (style !== undefined) {
            logInvalidType('style', 'object', style);
        }

        // Get the default settings for a text banner
        validOptions.style = getValidStyleOptions({
            layout: 'text'
        });
    } else {
        validOptions.style = getValidStyleOptions(style);
    }

    objectAssign(validOptions, populateDefaults(VALID_OPTIONS, otherOptions, ''));

    return validOptions;
}
