import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringIncludes from 'core-js-pure/stable/string/includes';
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

export function getDataByTag(data, tag) {
    let selected = arrayFind(data, ([, tags]) => arrayIncludes(tags, tag));
    if (selected) {
        return selected[0];
    }

    if (stringIncludes(tag, '.')) {
        const [fallbackTag] = tag.split('.', 1);
        selected = arrayFind(data, ([, tags]) => arrayIncludes(tags, fallbackTag));
        if (selected) {
            return selected[0];
        }
    }

    return arrayFind(data, ([, tags]) => arrayIncludes(tags, 'default'))[0];
}
