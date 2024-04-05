import { getValidOptions } from './locale';
import { validateType, Types } from './types';

// Formalized validation addLog helper functions
const logInvalid = (addLog, location, message) => addLog(`Invalid option value (${location}). ${message}`);
const logInvalidType = (addLog, location, expectedType, val) =>
    logInvalid(addLog, location, `Expected type "${expectedType.toLowerCase()}" but instead received "${typeof val}".`);
const logInvalidOption = (addLog, location, options, val) =>
    logInvalid(
        addLog,
        location,
        // Filter out potentially malicious inputs from warnings.
        `Expected one of ["${options.join('", "').replace(/\|[\w|]+/g, '')}"] but received "${
            /^[a-z0-9]+$/i.test(val) ? val : 'REDACTED'
        }".`
    );

function getValidVal(addLog, typeArr, val, location) {
    const [type, validVals = []] = typeArr;

    if (val === undefined) {
        return validVals[0];
    }

    if (type !== Types.NUMBER && validateType(type, val)) {
        if (type === Types.STRING && validVals.length > 0) {
            // Check if aliased value used.
            const validVal = validVals.find(v => {
                if (typeof v !== 'string') {
                    return false;
                }
                return v.split('|').some(x => x === val);
            });

            if (validVal === undefined) {
                logInvalidOption(addLog, location, validVals, val);
                if (typeof validVals[0] === 'undefined') {
                    return validVals[0];
                }
                return validVals[0].split('|')[0];
            }

            return validVal.split('|')[0];
        }
        return val;
    }

    const numberVal = Number(val);
    if (type === Types.NUMBER && validateType(type, numberVal)) {
        if (validVals.length > 0) {
            const validVal = validVals.find(v => v === numberVal);
            if (validVal === undefined) {
                logInvalidOption(addLog, location, validVals, numberVal);
                return validVals[0];
            }

            return validVal;
        }

        return numberVal;
    }

    logInvalidType(addLog, location, type, val);
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
function populateDefaults(addLog, defaults, options, prefix = 'style.') {
    return Object.entries(defaults).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            const validVal = getValidVal(addLog, val, options[key], `${prefix}${key}`);

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
            [key]: populateDefaults(addLog, defaults[key], options[key] ?? {}, `${prefix}${key}.`)
        };
    }, {});
}

/**
 * Create a valid style object based on user options
 * @param {Object} options User style options
 * @returns {Object} Object containing only valid style options
 */
function getValidStyleOptions(addLog, localeStyleOptions, options) {
    const defaultValues = {
        layout: options.layout,
        ...populateDefaults(addLog, localeStyleOptions[options.layout], options)
    };

    return defaultValues;
}

/**
 * Validate user options object. Warn the user against invalid options
 * and ensure only valid options are returned
 * @param {Object} options User options object
 * @returns {Object} Object containing only valid options
 */
export default (addLog, style, locale, offerType, contextualComponents) => {
    const validStyleOptions = getValidOptions(locale, offerType, contextualComponents);

    if (validStyleOptions[style.layout]) {
        return getValidStyleOptions(addLog, validStyleOptions, style);
    }

    logInvalidOption(addLog, 'style.layout', Object.keys(validStyleOptions), style.layout);

    // Get the default settings for a text banner
    return getValidStyleOptions(addLog, validStyleOptions, {
        layout: 'text'
    });
};
