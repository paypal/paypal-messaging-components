import { ZalgoPromise } from 'zalgo-promise/src';
import objectAssign from 'core-js-pure/stable/object/assign';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { getSDKMeta } from '@paypal/sdk-client/src';
import { base64encode } from 'belter/src';

import fonts from '../old/messages/models/Template/styles/fonts.css';
import { prependStyle } from './elements';
import { globalState, setGlobalState } from './global';
import { getEnv, getScript } from './sdk';

const loadedFonts = new Map();

export function loadPPFonts(doc) {
    if (!loadedFonts.has(doc)) {
        loadedFonts.set(
            doc,
            new ZalgoPromise(resolve => {
                prependStyle(doc.head, `${fonts} html { font-family: PayPal-Sans, Helvetica, Arial, sans-serif; }`);

                if (doc.defaultView.frameElement && !doc.defaultView.frameElement.offsetWidth) {
                    // If iframe is display none do not wait for fonts
                    resolve();
                } else if (doc.fonts) {
                    doc.fonts
                        .load('12px PayPal-Sans')
                        .then(resolve)
                        .catch(resolve);
                } else {
                    // Fallback if CSS Font Loading API not supported
                    const text = doc.createElement('span');
                    text.setAttribute('style', 'position: absolute; opacity: 0; font-family: sans-serif;');
                    text.textContent = 'The quick brown fox jumps over the lazy dog';
                    doc.body.appendChild(text);

                    const { width: preloadWidth, height: preloadHeight } = text.getBoundingClientRect();

                    text.setAttribute('style', 'position: absolute; opacity: 0;');

                    // If CSP blocks the font from loading, this leads to a 10sec render
                    // delay due to multiple frames requiring fonts for dimension calculations
                    let timeout = false;
                    setTimeout(() => {
                        timeout = true;
                    }, 5000);

                    const intervalId = setInterval(() => {
                        const { width, height } = text.getBoundingClientRect();

                        if (timeout || preloadWidth !== width || preloadHeight !== height) {
                            clearInterval(intervalId);
                            doc.body.removeChild(text);
                            resolve();
                        }
                    }, 100);
                }
            })
        );
    }

    return loadedFonts.get(doc);
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

export const nextId = () => {
    setGlobalState({ nextId: globalState.nextId + 1 });
    return globalState.nextId - 1;
};

export function getTargetMeta() {
    const metaObject = {
        target: __MESSAGES__.__TARGET__,
        componentUrl: arrayIncludes(['production', 'sandbox'], getEnv())
            ? `https://www.paypalobjects.com/upstream/bizcomponents/js/versioned/smart-credit-modal@${__MESSAGES__.__VERSION__}.js`
            : `${window.location.origin}/smart-credit-modal-old.js`
    };

    if (__MESSAGES__.__TARGET__ === 'SDK') {
        objectAssign(
            metaObject,
            JSON.parse(
                // Slightly modified from belter/src base64decode due to clash on merchant site:
                // https://www.myrobotcenter.de/de_de/yardforce-sa600h-2019
                decodeURIComponent(
                    atob(getSDKMeta())
                        .split('')
                        .map(c => {
                            return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
                        })
                        .join('')
                )
            )
        );
    } else {
        const script = getScript();

        objectAssign(metaObject, {
            url:
                script && (stringStartsWith(script.src, 'https') || getEnv() === 'local')
                    ? script.src
                    : 'https://www.paypalobjects.com/upstream/bizcomponents/js/messaging.js'
        });
    }

    return base64encode(JSON.stringify(metaObject));
}
