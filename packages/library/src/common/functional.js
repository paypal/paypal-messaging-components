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
 * Retrieve a single property from an object
 * @param {String} prop Property to retrieve
 * @param {Object} obj Object to get get property from
 * @returns {Any} Object property value
 */
export const pluck = curry((prop, obj) => obj[prop]);

/**
 * Create an object and assign the value to the property
 * @param {String} prop Property name
 * @param {Any} value Property value
 * @returns {Object} New object with property and value
 */
export const assignToProp = curry((prop, value) => ({ [prop]: value }));
