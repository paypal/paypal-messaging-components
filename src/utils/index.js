import objectAssign from 'core-js-pure/stable/object/assign';
import objectEntries from 'core-js-pure/stable/object/entries';
import arrayIncludes from 'core-js-pure/stable/array/includes';

/**
 * Memoize a function based on all arguments
 * @param {Function} fn Function to memoize
 * @returns {Function} Memoized function
 */
export function memoize(fn) {
    const cache = new Map();

    return (...args) => {
        const cacheKey = JSON.stringify(args);

        if (!cache.has(cacheKey)) {
            cache.set(cacheKey, fn(...args));
        }

        return cache.get(cacheKey);
    };
}

/**
 * Memoize a unary function that takes has a single object parameter
 * @param {Function} fn Function to memoize
 * @param {Array<string>} props Property names to cache against
 * @returns {Function} Memoized function
 */
export function memoizeOnProps(fn, props) {
    const cache = new Map();

    return (options, ignoreCache = false) => {
        const cacheKey = JSON.stringify(props.map(key => options[key]));

        if (!cache.has(cacheKey) || ignoreCache) {
            cache.set(cacheKey, fn(options));
        }

        return cache.get(cacheKey);
    };
}

/**
 * Partially apply a function with specified parameters
 * @param {Function} fn Function to partially apply
 * @param  {...any} intialArgs Arguments to partially apply
 * @returns {Function} Partially applied function
 */
export function partial(fn, ...intialArgs) {
    return (...nextArgs) => fn(...intialArgs, ...nextArgs);
}

/**
 * Curry a function
 * @param {Function} fn Function to curry
 * @param {Number} arity Number of function parameters
 * @returns {Function} Curried function
 */
export function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length < arity) {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }

        return fn(...args);
    };
}

/**
 * Higher order function to run an effectful function
 * and still pass along the arguments for chaining
 * @param {Function} fn Effectful function
 * @returns {Function} Pass through function
 */
export function passThrough(fn) {
    return arg => {
        const result = fn(arg);
        return typeof result === 'object' && result.then ? result.then(() => arg) : arg;
    };
}

/**
 * Chain function calls together, starting with an initial value
 * @param  {...Function} args Functions
 * @returns {Function} Function that runs initial value through all passed in functions
 */
export function pipe(...args) {
    return initialValue => args.reduce((accumulator, fn) => fn(accumulator), initialValue);
}

/**
 * Create a state object and pass back a reference and update function
 * @param {Object} initialState Initial object to store in state
 * @returns {[Object, Function]} State object reference and update function
 */
export function createState(initialState = {}) {
    const state = { ...initialState };
    return [state, partial(objectAssign, state)];
}

/**
 * One way diff that returns an object with key/values
 * that are different from original to updated
 * @param {Object} original First object
 * @param {Object} updated Second object
 * @returns {Object} Diff object
 */
export function objectDiff(original, updated) {
    return objectEntries(updated).reduce((accumulator, [key, val]) => {
        if (original[key] === undefined && updated[key] !== undefined) {
            return {
                ...accumulator,
                [key]: val
            };
        }
        if (typeof val !== 'object') {
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

    return (function deepMerge(c, d) {
        return objectEntries(d).reduce((accumulator, [key, val]) => {
            if (Array.isArray(val)) {
                return {
                    ...accumulator,
                    [key]: [...val]
                };
            }
            if (typeof val === 'object' && (!c[key] || typeof c[key] !== 'object' || Array.isArray(c[key]))) {
                return {
                    ...accumulator,
                    [key]: objectClone(val)
                };
            }
            if (typeof val === 'object') {
                return {
                    ...accumulator,
                    [key]: deepMerge(c[key], val)
                };
            }

            return {
                ...accumulator,
                [key]: val
            };
        }, c);
    })(clone, b);
}

/**
 * Flatten object to array of deep key value strings
 * @param {Object} options Object of options
 * @param {String} prefix Prefix for current option property
 * @returns {Array<String>} Array of options as string
 */
export function objectFlattenToArray(options, prefix = '') {
    return objectEntries(options).reduce((accumulator, [key, val]) => {
        switch (typeof val) {
            case 'object': {
                return [...accumulator, ...objectFlattenToArray(val, `${prefix}${key}.`)];
            }
            case 'string':
            default: {
                return [...accumulator, `${prefix}${key}:${val}`];
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
