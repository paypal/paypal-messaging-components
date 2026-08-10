import validOptions from './validOptions';
import { validateType, Types } from './types';

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

function populateDefaults(addLog, defaults, options, prefix = 'style.') {
    return Object.entries(defaults).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            const validVal = getValidVal(addLog, val, options[key], `${prefix}${key}`);

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

function buildValidStyle(addLog, layoutOptions, options) {
    return {
        layout: options.layout,
        ...populateDefaults(addLog, layoutOptions[options.layout], options)
    };
}

export default (addLog, style = {}) => {
    const safeStyle = style ?? {};
    const layout = safeStyle.layout ?? 'text';

    if (layout === 'custom') {
        addLog(
            'Invalid option value (style.layout). The "custom" layout is not supported by renderV2Message; falling back to "text".'
        );
        return buildValidStyle(addLog, validOptions, { layout: 'text' });
    }

    if (validOptions[layout]) {
        return buildValidStyle(addLog, validOptions, { ...safeStyle, layout });
    }

    logInvalidOption(addLog, 'style.layout', Object.keys(validOptions), layout);
    return buildValidStyle(addLog, validOptions, { layout: 'text' });
};
