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
