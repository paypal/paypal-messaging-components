import objectAssign from 'core-js-pure/stable/object/assign';

import { partial } from './functional';

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
 * Create a new error with a special onEnd attribute that
 * will be called after the error has been handled
 * @param {String} message Error message
 * @param {Function} cb Callback function
 */
export function createCallbackError(message, cb) {
    const error = new Error(message);
    // onEnd callback will be called after completing the current logger
    error.onEnd = cb;

    return error;
}

const DOMAINS = __MESSAGES__.__DOMAIN__;
const URI = __MESSAGES__.__URI__;

/**
 * Create a URL of the requested type from Webpack global variables
 * @param {String} type URL type
 * @returns {String} URL of requested type
 */
export function getGlobalUrl(type) {
    const envField = `__${__ENV__.toUpperCase()}__`;
    const typeField = `__${type.toUpperCase()}__`;
    const domain = (DOMAINS[typeField] && DOMAINS[typeField][envField]) || DOMAINS[envField];

    return `${domain}${URI[typeField]}`;
}
