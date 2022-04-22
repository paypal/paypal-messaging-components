/* global chrome */
import { isZoidComponent } from './sdk';
/**
 * Messaging debug log. When the query param "pp_debug" is used on a page with a message and set to "true", a series of logs will appear
 * within the browser's developer tools console.
 * @param {string} key - The name of the parameter you are logging out.
 * @param {any} value - The value of the parameter you are logging out.
 * @param {object} debugObj - Optional argument used in cases where the property you wish to log is an object. i.e.
 * an HTML element. ppDebug('Script:', { debugObj: script }).
 * @param {boolean} inZoid - Optional argument. Set inZoid to true if you wish to log inside of the iframe. i.e. ppDebug('Sample message', {inZoid: true}). Not using this
 * argument defaults inZoid to false.
 */
export function ppDebug(key, value, { inZoid, debugObj } = {}) {
    if (/(\?|&)pp_debug=true(&|$)/.test(window.location.search) && !!inZoid === isZoidComponent()) {
        // eslint-disable-next-line no-console
        console.warn('PayPal Messages Debug:', `${key}:`, `${value ? JSON.stringify(value) : ''}`, debugObj ?? '');

        const extensionId = 'pmclhmglbdkcdegbohapolgbclfmlfmb';

        chrome.runtime.sendMessage(extensionId, { key, value: value ?? debugObj ?? null }, () => {});
    }
}
