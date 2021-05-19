import { isZoidComponent } from './sdk';
/**
 * Messaging debug log. When the query param "pp_debug" is used on a page with a message and set to "true", a series of logs will appear
 * within the browser's developer tools console.
 * @param {string} message - The name of the parameter you are logging out. Also often times includes the parameter to be logged
 * within a template string.
 * @param {object} options - Allows for an optional debugObj and/or an optional inZoid component check argument.
 * @param {object} [options.debugObj] - Optional argument used in cases where the property you wish to log is an object. i.e.
 * an HTML element. ppDebug('Script:', { debugObj: script }).
 * @param {boolean} [options.inZoid] - Optional argument. Set inZoid to true if you wish to log inside of the iframe. i.e. ppDebug('Sample message', {inZoid: true}). Not using this
 * argument defaults inZoid to false.
 */
export function ppDebug(message, options) {
    const inZoid = options?.inZoid;
    const debugObj = options?.debugObj;
    if (/(\?|&)pp_debug=true(&|$)/.test(window.location.search) && !!inZoid === isZoidComponent()) {
        if (debugObj) {
            // eslint-disable-next-line no-console
            console.warn('PayPal Messages Debug:', message, debugObj);
        } else {
            // eslint-disable-next-line no-console
            console.warn('PayPal Messages Debug:', message);
        }
    }
}
