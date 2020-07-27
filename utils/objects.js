import arrayIncludes from 'core-js-pure/stable/array/includes';
import objectEntries from 'core-js-pure/stable/object/entries';

/**
 * One way diff that returns an object with key/values
 * that are different from original to updated
 * @param {Object} original First object
 * @param {Object} updated Second object
 * @returns {Object} Diff object
 */
export function objectDiff(original, updated) {
    return objectEntries(updated).reduce((accumulator, [key, val]) => {
        // If key does not exist on original object and check against key with value of undefined or null
        if (!original[key] && original[key] !== val) {
            return {
                ...accumulator,
                [key]: val
            };
        }
        if (typeof val !== 'object' || val === null) {
            if (val !== original[key]) {
                return {
                    ...accumulator,
                    [key]: val
                };
            }
            return accumulator;
        }
        if (Array.isArray(val)) {
            if (Array.isArray(original[key])) {
                const diff = val.filter(x => !arrayIncludes(original[key], x));
                if (diff.length > 0) {
                    return {
                        ...accumulator,
                        [key]: diff
                    };
                }
                return accumulator;
            }
            return {
                ...accumulator,
                [key]: val
            };
        }

        const diff = objectDiff(original[key], val);
        if (Object.keys(diff).length > 0) {
            return {
                ...accumulator,
                [key]: diff
            };
        }

        return accumulator;
    }, {});
}

/**
 * Deep clone an object
 * @param {Object} a Any object
 * @returns {Object} Cloned object
 */
export function objectClone(a) {
    return objectEntries(a).reduce((accumulator, [key, val]) => {
        if (Array.isArray(val)) {
            return {
                ...accumulator,
                [key]: [...val]
            };
        }
        if (typeof val === 'object') {
            return {
                ...accumulator,
                [key]: objectClone(val)
            };
        }

        return {
            ...accumulator,
            [key]: val
        };
    }, {});
}

/**
 * Create a new object with the second object merged into the first
 * @param {Object} a Base object
 * @param {Object} b Object to be merged in
 * @returns {Object} Merged object
 */
export function objectMerge(a, b) {
    const clone = objectClone(a);

    return (function deepMerge(targetObject, mergingObject) {
        return objectEntries(mergingObject).reduce((accumulator, [key, val]) => {
            // Just overwrite if val is an array
            if (Array.isArray(val)) {
                return {
                    ...accumulator,
                    [key]: [...val]
                };
            }

            // Overwrite if non-existent on targetObject or not an object
            if (
                typeof val === 'object' &&
                val !== null &&
                (!targetObject[key] || typeof targetObject[key] !== 'object' || Array.isArray(targetObject[key]))
            ) {
                return {
                    ...accumulator,
                    [key]: objectClone(val)
                };
            }

            // Set value to deep merge of 2 objects
            if (typeof val === 'object' && val !== null) {
                return {
                    ...accumulator,
                    [key]: deepMerge(targetObject[key], val)
                };
            }

            // Set new key value
            return {
                ...accumulator,
                [key]: val
            };
        }, targetObject);
    })(clone, b);
}

/**
 * Flatten object to array of deep key value strings
 * @param {Object} options Object of options
 * @param {String} prefix Prefix for current option property
 * @returns {Array<String>} Array of options as string
 */
export function objectFlattenToArray(options, prefix = '', delimiter = ':') {
    return objectEntries(options).reduce((accumulator, [key, val]) => {
        switch (typeof val) {
            case 'object': {
                return [...accumulator, ...objectFlattenToArray(val, `${prefix}${key}.`)];
            }
            case 'string':
            default: {
                return [...accumulator, `${prefix}${key}${delimiter}${val}`];
            }
        }
    }, []);
}

/**
 * Search an object for a specific prop path
 * @param {Object} object Object to find specific prop
 * @param {String} propString String representation of nested props
 * @returns {*} Prop value or undefined
 */
export function objectGet(object, propString) {
    const props = propString.split('.');
    return props.reduce(
        (accumulator, prop) =>
            typeof accumulator === 'object' || typeof accumulator === 'function' ? accumulator[prop] : undefined,
        object
    );
}

/**
 * Set a nested property on an object
 * @param {Object} object Object to set specific prop
 * @param {String} propString String representation of nested props
 * @param {*} value Value to set
 * @returns {Object} The original object
 */
export function objectSet(object, propString, value) {
    const props = propString.split('.');
    const lastProp = props.pop();

    const targetObj = props.reduce((accumulator, prop) => {
        accumulator[prop] = accumulator[prop] || {};
        return accumulator[prop];
    }, object);

    targetObj[lastProp] = value;

    return object;
}

/**
 * Convert a string representation of an object path and value to an object
 * @param {String} option Object string path representation
 * @param {*} attributeValue Value to set on the object path
 * @param {String} delimiter Object nesting delimiter
 * @returns {Object} New nested object with provided value
 */
export function flattenedToObject(option, attributeValue, delimiter = '-') {
    const firstIndex = option.indexOf(delimiter);
    if (firstIndex === -1) {
        return { [option]: attributeValue };
    }

    const key = option.slice(0, firstIndex);
    const val = option.slice(firstIndex + 1);

    return { [key]: flattenedToObject(val, attributeValue) };
}
