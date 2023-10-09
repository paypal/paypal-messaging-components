import { isZoidComponent, whichComponent } from './sdk';
import { GLOBAL_EVENT, MESSAGE_DOM_EVENT, MODAL_DOM_EVENT } from './constants';
import { globalEvent } from './global';

/**
 * A set of identifiers to keep track of what will be shown
 * with different levels of verbosity.
 * @enum
 */
export const DEBUG_CONDITIONS = {
    /** Show general information about PayPal Messaging that is useful to most interested parties */
    GENERAL: 1,
    /** the global events on the parent page */
    GLOBAL_EVENTS: 10,
    /** show the props assigned to a component */
    PROPS: 15,
    /** the events for components that merchants can hook into via props */
    PROP_EVENTS: 20,
    /** the zoid events for the components */
    ZOID_EVENTS: 30,
    /** DOM events for components, except `mouseover`, `scroll`, and `touchmove` events */
    DOM_EVENTS: 40,
    /** Provide the event emitters for components */
    EVENT_EMITTERS: 50,
    /**
     * `mouseover`, `scroll`, and `touchmove` events for components; we separate these from the rest
     * because we're expecting these to produce more spam than the other DOM events.
     */
    MOUSEOVER: 60
};

const debugCache = {};

/**
 * Determine the verbosity we should use for debugging.
 * Higher numbers result in more verbose logging, with zero
 * or less than zero corresponding to no debugging.
 *
 * We provide this function so that we can conditionally add
 * logic that only needs to execute when debugging, such as
 * adding event listeners that will call ppDebug
 *
 * @returns {number} debugLevel - an integer representing how verbose the debugging should be
 */
export function getDebugLevel() {
    const {
        // cache results to help with compute time
        isZoid: cacheIsZoid,
        href: cacheHref,
        debugLevel: cacheDebugLevel
    } = debugCache;
    // if we don't know if we're in a zoid component, find out if we are
    if (typeof cacheIsZoid === 'undefined') {
        debugCache.isZoid = isZoidComponent();
    }
    // if we are in a zoid component, then get the debug level from the xprops
    if (cacheIsZoid) {
        return window?.xprops?.debug ?? 0;
    }
    // if we're on the parent page and the href hasn't changed since we last checked,
    // then return the same debug value we initially got
    if (window.location.href === cacheHref) {
        return cacheDebugLevel;
    }

    // find `pp_debug` in the url set to `true` or an integer
    // (up to three digits to prevent trying to match an excessive number of digits)
    const debugPattern = /(?:\?|&)pp_debug=(?<debug>true|\d{1,3})(?:&|$)/;
    // determine what we were given
    const debugArg = `${window?.location?.search}`.match(debugPattern)?.groups?.debug;
    // turn it into an integer and cache the results
    const level = Number(debugArg === 'true' ? 1 : debugArg);
    debugCache.debugLevel = Number.isNaN(level) ? 0 : level;
    debugCache.href = window.location.href;
    return debugCache.debugLevel;
}

/**
 * Check whether the debug verbosity level allows for a set of debugging
 * information to be used.
 * @param {number} condition - an entry from DEBUG_CONDITIONS that we wish to check
 * @returns {boolean} result - whether we can provide debugging information for this condition
 * @example
 * if (canDebug(DEBUG_CONDITIONS.ZOID_EVENTS)){
 *      // only create event listeners if the debug verbosity is high enough
 *      Object.entries(MODAL_EVENT).forEach(([eventId, eventName]) =>
 *          event.on(eventName, debugObj => ppDebug(`EVENT.MODAL.${props.index}.${eventId}`, { debugObj }))
 *      );
 * }
 */
export function canDebug(condition) {
    return getDebugLevel() >= condition;
}

/**
 * Create a messaging debug log.
 * Adding the query parameter `pp_debug` with a value of `true` or an integer
 * greater than zero to a page with a PayPal message will enable `ppDebug` logs
 * to appear in the browser's developer tools console.
 * @param {string} message - The name of the parameter you are logging out. Also often times
 *      includes the parameter to be logged within a template string.
 * @param {object} [debugObj] - an object we wish to log to the console for further inspection
 * @param {boolean} [inZoid=false] - Set inZoid to `true` if you wish to log inside of the iframe.
 * @example
 * // log within the parent page
 * ppDebug('Sample message')
 *
 * // log within the parent page the script HTML element
 * const script = document.querySelector('script')
 * ppDebug('Sample message', { debugObj: script })
 *
 * // log within the iframe
 * ppDebug('Sample message', { inZoid: true })
 */
export function ppDebug(message, { inZoid, debugObj } = {}) {
    if (canDebug(DEBUG_CONDITIONS.GENERAL) && !!inZoid === isZoidComponent()) {
        // eslint-disable-next-line no-console
        console.warn(
            ...(typeof debugObj === 'undefined' || debugObj === ''
                ? ['PayPal Messages Debug:', message]
                : ['PayPal Messages Debug:', message, debugObj])
        );
    }
}

export function setupGlobalDebugListeners() {
    if (canDebug(DEBUG_CONDITIONS.EVENT_EMITTERS)) {
        ppDebug(`EVENT_EMITTER.GLOBAL`, { debugObj: globalEvent });
    }
    if (canDebug(DEBUG_CONDITIONS.GLOBAL_EVENTS)) {
        Object.entries(GLOBAL_EVENT).forEach(([eventId, eventName]) =>
            globalEvent.on(eventName, data => ppDebug(`EVENT.GLOBAL.${eventId}`, { debugObj: data }))
        );
    }
}

export function setupMessageDomDebugListeners() {
    if (canDebug(DEBUG_CONDITIONS.DOM_EVENTS)) {
        Object.entries(MESSAGE_DOM_EVENT)
            .filter(([, eventName]) => {
                // skip listening for ALL `keyup` and `keydown`; when we add a listener
                // for a specific set of keys, then we'll also add a ppDebug for it.
                if (MESSAGE_DOM_EVENT.KEYUP === eventName || MESSAGE_DOM_EVENT.KEYDOWN === eventName) {
                    return false;
                }
                // Also, we don't want mouseover to spam the console unless we're explicitly
                // want it to be that verbose
                if (MESSAGE_DOM_EVENT.MOUSEOVER === eventName && !canDebug(DEBUG_CONDITIONS.MOUSEOVER)) {
                    return false;
                }
                return true;
            })
            .forEach(([eventId, eventName]) => {
                window.addEventListener(eventName, event => {
                    ppDebug(`EVENT.MESSAGE.${window?.xprops?.index}.${eventId}`, { inZoid: true, debugObj: event });
                });
            });
    }
}

export function setupModalDomDebugListeners() {
    if (canDebug(DEBUG_CONDITIONS.DOM_EVENTS)) {
        Object.entries(MODAL_DOM_EVENT)
            .filter(([, eventName]) => {
                // skip listening for ALL `keyup` and `keydown`; when we add a listener
                // for a specific set of keys, then we'll also add a ppDebug for it.
                if (MODAL_DOM_EVENT.KEYUP === eventName || MODAL_DOM_EVENT.KEYDOWN === eventName) {
                    return false;
                }
                // Also, we don't want mouseover to spam the console unless we're explicitly
                // want it to be that verbose
                if (
                    [MODAL_DOM_EVENT.MOUSEOVER, MODAL_DOM_EVENT.SCROLL, MODAL_DOM_EVENT.TOUCHMOVE].includes(
                        eventName
                    ) &&
                    !canDebug(DEBUG_CONDITIONS.MOUSEOVER)
                ) {
                    return false;
                }
                return true;
            })
            .forEach(([eventId, eventName]) => {
                window.addEventListener(eventName, data =>
                    ppDebug(`EVENT.MODAL.${window?.xprops?.index}.${eventId}`, { inZoid: true, debugObj: data })
                );
            });
    }
}

function setupDomDebugListeners() {
    const component = whichComponent();
    if (component === 'MESSAGE') {
        setupMessageDomDebugListeners();
        return;
    }
    if (component === 'MODAL') {
        setupModalDomDebugListeners();
        return;
    }
    if (component === 'TREATMENTS') {
        return;
    }
    setupGlobalDebugListeners();
}
setupDomDebugListeners();
