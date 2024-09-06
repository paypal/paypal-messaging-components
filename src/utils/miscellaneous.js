/** @jsx node */
import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringIncludes from 'core-js-pure/stable/string/includes';
import objectAssign from 'core-js-pure/stable/object/assign';
import objectEntries from 'core-js-pure/stable/object/entries';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { partial, memoize } from './functional';
import { getStorage } from './sdk';
import { OFFER } from './constants';

/**
 * Create a state object and pass back a reference and update function
 * @param {Object} initialState Initial object to store in state
 * @returns {[Object, Function]} State object reference and update function
 */
export function createState(initialState = {}) {
    const state = { ...initialState };
    return [state, partial(objectAssign, state)];
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

    selected = arrayFind(data, ([, tags]) => arrayIncludes(tags, 'default'));
    if (selected) {
        return selected[0];
    }

    return '';
}

export function request(method, url, { data, headers, withCredentials } = {}) {
    return new ZalgoPromise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        if (withCredentials) {
            // Necessary to send cookies with cross-origin requests
            xhttp.withCredentials = true;
        }

        // eslint-disable-next-line unicorn/prefer-add-event-listener
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                const responseHeaders = xhttp
                    .getAllResponseHeaders()
                    .trim() // Remove trailing newline characters
                    .split('\n')
                    .reduce((accumulator, header) => {
                        const [key, val] = header.trim().split(': ');
                        return {
                            ...accumulator,
                            // IE11 uses capitalized header names
                            [key.toLowerCase()]: val
                        };
                    }, {});

                switch (xhttp.status) {
                    case 200:
                        resolve({
                            headers: responseHeaders,
                            data:
                                responseHeaders['content-type'] &&
                                stringIncludes(responseHeaders['content-type'], 'application/json')
                                    ? JSON.parse(xhttp.responseText)
                                    : xhttp.responseText
                        });
                        break;
                    case 204:
                        resolve({ headers: responseHeaders });
                        break;
                    default:
                        reject(new Error('Request failed'));
                }
            }
        };

        xhttp.open(method, url, true);

        if (headers) {
            objectEntries(headers).forEach(([header, value]) => {
                xhttp.setRequestHeader(header, value);
            });
        }

        xhttp.send(typeof data === 'object' ? JSON.stringify(data) : data);
    });
}

export function parseObjFromEncoding(encodedStr) {
    // equivalent to JSON.parse(fromBinary(atob(encodedStr))) as in initScript
    const binary = atob(encodedStr);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    // need to use .apply instead of spread operator so IE can understand
    const decodedStr = String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
    return JSON.parse(decodedStr);
}

export function createEvent(name) {
    if (typeof Event === 'function') {
        return new Event(name);
    }

    // IE11 support
    const event = document.createEvent('Event');
    event.initEvent(name, true, true);

    return event;
}

export const dynamicImport = memoize(url => {
    return new ZalgoPromise(resolve => {
        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', () => {
            document.body.removeChild(script);
            resolve();
        });

        if (document.readyState === 'loading') {
            window.addEventListener('DOMContentLoaded', () => document.body.appendChild(script));
        } else {
            document.body.appendChild(script);
        }
    });
});

// // Date.now() altered on some sites: https://www.hydropool.com
export const getCurrentTime = () => new Date().getTime();

// Memoized so that the 2 return functions can be called from different modules
export const viewportHijack = memoize(() => {
    const viewport =
        document.querySelector('meta[name="viewport"]') ||
        (<meta name="viewport" content="" />).render(dom({ doc: document }));

    // Ensure a viewport exists in the DOM
    if (!viewport.parentNode) {
        document.head.appendChild(viewport);
    }

    return [
        // We store state on the DOM elements themselves because we do not want multiple SDK scripts
        // with their own states causing an error preventing elements from being updated as needed
        () => {
            if (viewport.__pp_prev_content__) {
                // Viewport has already been hijacked - do nothing for now
                // This can happen when multiple messages are clicked before the modal loads
                return;
            }

            viewport.__pp_prev_content__ = viewport.getAttribute('content') ?? '';
            viewport.setAttribute(
                'content',
                'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no'
            );

            document.body.__pp_prev_overflow__ = document.body.style.overflow ?? '';
            document.body.__pp_prev_msOverflowStyle__ = document.body.style.msOverflowStyle ?? '';
            document.body.style.setProperty('overflow', 'hidden');
            document.body.style.setProperty('-ms-overflow-style', 'scrollbar');
        },
        () => {
            if (viewport.__pp_prev_content__) {
                viewport.setAttribute('content', viewport.__pp_prev_content__);
            }
            delete viewport.__pp_prev_content__;

            document.body.style.setProperty('overflow', document.body.__pp_prev_overflow__);
            document.body.style.setProperty('-ms-overflow-style', document.body.__pp_prev_msOverflowStyle__);
            delete document.body.__pp_prev_overflow__;
            delete document.body.__pp_prev_msOverflowStyle__;
        }
    ];
});

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners
export const getEventListenerPassiveOptionIfSupported = () => {
    let passiveIfSupported = false;

    try {
        // Create dummy event listener so that if supported, the object will be crawled
        // for the passive flag telling us that the option is supported in this browser
        window.addEventListener(
            '__test__',
            null,
            Object.defineProperty({}, 'passive', {
                // eslint-disable-next-line getter-return
                get() {
                    passiveIfSupported = { passive: true };
                }
            })
        );
    } catch (err) {} // eslint-disable-line no-empty

    return passiveIfSupported;
};

export function getStandardProductOffer(offer) {
    if (typeof offer === 'undefined') {
        return 'NONE';
    }

    switch (offer.toUpperCase()) {
        // TODO: Cleanup once content is updated
        case 'LT_NQEZ':
        case 'LT_NQGZ':
        case 'LT_MQEZ':
        case 'LT_MQEZ_RB':
        case 'LT_MQGZ':
        case 'LT_SQEZ':
        case 'LT_SQEZ_RB':
        case 'LT_SQGZ':
        case 'GPL:EQZ':
        case 'GPL:GTZ':
        case 'GPLQ:EQZ':
        case 'GPLQ:GTZ':
        case 'GPL:EQZ:NON-DE':
        case 'GPL:GTZ:NON-DE':
        case 'GPLQ:EQZ:NON-DE':
        case 'GPLQ:GTZ:NON-DE':
        // Updated values
        case 'PLLT_NQ_EZ_NON-DE':
        case 'PLLT_NQ_GZ_NON-DE':
        case 'PLLT_MQ_EZ_NON-DE':
        case 'PLLT_MQ_GZ_NON-DE':
        case 'PLLT_NQ_EZ':
        case 'PLLT_NQ_GZ':
        case 'PLLT_MQ_EZ':
        case 'PLLT_MQ_GZ':
        case 'PLLT_SQ_EZ':
        case 'PLLT_SQ_GZ':
        case OFFER.PAY_LATER_LONG_TERM:
            return OFFER.PAY_LATER_LONG_TERM;
        // TODO: Cleanup once content is updated
        case 'GPL':
        case 'GPLQ':
        case 'GPLNQ':
        case 'GPLNQ_RANGE':
        case 'PL':
        case 'PLQ':
        case 'ST_SQ':
        case 'ST_NQ':
        case 'SHORT_TERM:Q':
        case 'SHORT_TERM:NQ':
        case 'SHORT_TERM:NO_AMOUNT':
        // Updated values
        case 'PLST_NQ':
        case 'PLST_SQ':
        case OFFER.PAY_LATER_SHORT_TERM:
            return OFFER.PAY_LATER_SHORT_TERM;
        // TODO: Cleanup once content is updated
        case 'PI30':
        case 'PI30Q':
        case 'PI30NQ':
        case 'PI30:NON-DE':
        case 'PI30Q:NON-DE':
        case 'PI30NQ:NON-DE':
        // updated values
        case 'PLPI1_NA_NON-DE':
        case 'PLPI1_NA':
        case 'PLPI1_NQ_NON-DE':
        case 'PLPI1_NQ':
        case 'PLPI1_SQ_NON-DE':
        case 'PLPI1_SQ':
        case OFFER.PAY_LATER_PAY_IN_1:
            return OFFER.PAY_LATER_PAY_IN_1;
        case 'EZP':
        case 'EZP:ANY:EQZ':
        case 'EZP:ANY:GTZ':
        case 'PALA:MULTI:EQZ':
        case 'PALA:MULTI:GTZ':
        case 'PALA:SINGLE:EQZ':
        case 'PALA:SINGLE:GTZ':
        case OFFER.PAYPAL_CREDIT_INSTALLMENTS:
        case 'INST':
        case 'INST:ANY:EQZ':
        case 'INST:ANY:GTZ':
        case 'PALAQ:ANY:EQZ':
        case 'PALAQ:ANY:GTZ':
            return OFFER.PAYPAL_CREDIT_INSTALLMENTS;
        // TODO: Cleanup once content is updated
        case 'NI':
        case 'NI:NON-US':
        case 'NIQ':
        case 'NIQ:NON-US':
        case 'PPCNI_NQ':
        // updated values
        case 'PPCNI_NQ_NON-US':
        case 'PPCNI_SQ':
        case 'PPCNI_SQ_NON-US':
        case OFFER.PAYPAL_CREDIT_NO_INTEREST:
            return OFFER.PAYPAL_CREDIT_NO_INTEREST;
        case OFFER.PAY_LATER:
            return OFFER.PAY_LATER;
        case OFFER.REWARDS:
            return OFFER.REWARDS;
        default:
            return undefined;
    }
}

/**
 * Get value of cookie name
 * @param name - name of cookie
 * @returns object of cookie value(s)
 */
export function getCookieByName(name) {
    const cookieVal = decodeURIComponent(
        // decode the cookie value
        // get all cookies
        document.cookie
            .split('; ')
            // separate the string into an array of cookies
            // find the cookie by name
            .find(cookieStr => cookieStr.startsWith(`${name}=`))
            ?.slice(5) ?? ''
        // use only the value of the cookie
    );

    // use URLSearchParams to parse the value string into entries,
    // and create an object from those entries
    // disable ESLint rule since we do not support IE anymore
    // eslint-disable-next-line compat/compat
    return Object.keys(cookieVal).length === 0 ? null : Object.fromEntries(new URLSearchParams(cookieVal).entries());
    // check length of cookieVal obj to make sure keys exist.
}

// get the ts cookie from local storage
export function getTsCookieFromStorage() {
    return getStorage().getState(storage => storage?.ts) ?? getCookieByName('ts_c');
}
