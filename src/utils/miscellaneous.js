/** @jsx node */
import arrayFind from 'core-js-pure/stable/array/find';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import stringIncludes from 'core-js-pure/stable/string/includes';
import objectAssign from 'core-js-pure/stable/object/assign';
import objectEntries from 'core-js-pure/stable/object/entries';
import { node, dom } from 'jsx-pragmatic/src';
import { ZalgoPromise } from 'zalgo-promise';

import { partial, memoize } from './functional';

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
        document.head.querySelector('meta[name="viewport"]') ||
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
            viewport.setAttribute('content', viewport.__pp_prev_content__);
            delete viewport.__pp_prev_content__;

            document.body.style.setProperty('overflow', document.body.__pp_prev_overflow__);
            document.body.style.setProperty('-ms-overflow-style', document.body.__pp_prev_msOverflowStyle__);
            delete document.body.__pp_prev_overflow__;
            delete document.body.__pp_prev_msOverflowStyle__;
        }
    ];
});
