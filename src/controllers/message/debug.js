/**
 * Messaging debug log. When the query param "pp_debug" is used on a page with a message and set to "true", a series of logs will appear
 * within the browser's developer tools console.
 * @param {string} message The name of the parameter you are logging out. Also often times includes the parameter to be logged
 * within a template string.
 * @param {object} debugObj Optional argument used in cases where the property you wish to log is an object. i.e.
 * an HTML element.
 */
export function ppDebug(message, debugObj) {
    if (/(\?|&)pp_debug=true(&|$)/.test(window.location.search)) {
        if (debugObj) {
            // eslint-disable-next-line no-console
            console.warn('PayPal Messages Debug:', message, debugObj);
        } else {
            // eslint-disable-next-line no-console
            console.warn('PayPal Messages Debug:', message);
        }
    }
}
