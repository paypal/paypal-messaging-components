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

// Creates a mock UUID. Temporary until crcpresentmentnodeserv is live.
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
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

const PAYPAL_MODAL_VIEWPORT_ID = '__paypal_modal_viewport__';

export const viewportHijack = memoize(() => {
    const [viewportState, setViewportState] = createState({});

    // Create hijack viewport
    const newViewport = (
        <meta
            id={PAYPAL_MODAL_VIEWPORT_ID}
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui, shrink-to-fit=no"
        />
    ).render(dom({ doc: document }));

    return [
        () => {
            if (document.getElementById(PAYPAL_MODAL_VIEWPORT_ID)) {
                // Viewport has already been hijacked - do nothing for now
                return;
            }

            // Save existing body style
            const bodyStyle = document.body.getAttribute('style');

            // If no viewport exists, some browsers will not respect the change of simply removing the hijack viewport
            // Add a blank viewport to replace the hijack in this case
            const oldViewport =
                document.head.querySelector('meta[name="viewport"]') ||
                (<meta name="viewport" content="" />).render(dom({ doc: document }));

            if (oldViewport.parentNode) {
                document.head.removeChild(oldViewport);
            }

            document.head.appendChild(newViewport);

            document.body.style.overflow = 'hidden';
            document.body.style.msOverflowStyle = 'scrollbar';

            setViewportState({
                bodyStyle,
                oldViewport
            });
        },
        () => {
            document.head.removeChild(newViewport);
            document.head.appendChild(viewportState.oldViewport);

            document.body.setAttribute('style', viewportState.bodyStyle || '');
        }
    ];
});

export const DOMContentLoaded = new ZalgoPromise(resolve =>
    typeof document !== 'undefined' && document.readyState === 'loading'
        ? window.addEventListener('DOMContentLoaded', resolve)
        : resolve()
);
