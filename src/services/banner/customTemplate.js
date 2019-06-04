import stringIncludes from 'core-js-pure/stable/string/includes';
import { ZalgoPromise } from 'zalgo-promise';

import { logger, ERRORS } from '../logger';
import publicKey from './public.key';
import { memoize, objectGet } from '../../utils';

function str2ab(str) {
    const bufView = new Uint8Array(str.length);
    for (let i = str.length; i >= 0; i -= 1) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView.buffer;
}

function logCustomValidationError(account, style, err) {
    if (err) {
        logger.warn(err);
        logger.error({
            message: err,
            account,
            customStyle: style.styles,
            sign: style.sign
        });
    } else {
        logger.warn(
            'Invalid custom styles. Please ensure the correct account number, styles, and signature have been entered. Banner has been hidden.'
        );
        logger.error({
            message: ERRORS.INVALID_STYLE_OPTIONS,
            account,
            customStyle: style.custom,
            sign: style.sign
        });
    }
}

/**
 * Will validate custom banner styling based on the pre-validated hash of the account
 * and custom styles string being passsed into the render call
 * @param {String} account The account number passed in from the render call
 * @param {Object} style Object containing the styles passed in from the render call
 */
function validateSign(sign, account, markup) {
    return new ZalgoPromise(resolve => {
        // Validate signature and styles
        try {
            // If using demo build, check if PayPal domain
            if (__DEMO__ && stringIncludes(window.location.host, 'paypal.com')) {
                return resolve(true);
            }

            const message = str2ab(`${account}${markup}`);
            const signature = str2ab(window.atob(sign));
            const binaryDer = str2ab(window.atob(publicKey));

            const rsaConfig = [
                'spki',
                binaryDer,
                {
                    name: 'RSASSA-PKCS1-v1_5',
                    hash: 'SHA-256'
                },
                true,
                ['verify']
            ];

            const rsaType = { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };

            // If IE, create mvp window.crypto polyfill
            const crypto = window.crypto || {};
            if (!window.crypto) {
                const promisify = fn => (...args) =>
                    new ZalgoPromise((res, rej) => {
                        const x = fn(...args);
                        x.oncomplete = data => (objectGet(data, 'target.result') ? res(data.target.result) : rej());
                    });

                crypto.subtle = {
                    importKey: promisify(window.msCrypto.subtle.importKey),
                    verify: promisify(window.msCrypto.subtle.verify)
                };
            }

            return crypto.subtle.importKey(...rsaConfig).then(data => {
                crypto.subtle
                    .verify(rsaType, data, signature, message)
                    .then(resolve)
                    .catch(() => resolve(false));
            });
        } catch (err) {
            return resolve(false);
        }
    });
}

function fetcher(url) {
    return new ZalgoPromise(resolve => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                switch (xhttp.status) {
                    case 200:
                        resolve(xhttp.responseText);
                        break;
                    default:
                        resolve('');
                }
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    });
}

function getCustomTemplate(sign, account, source) {
    const markupProm = ZalgoPromise.resolve(source.match(/^(?:(https?:\/\/)|\.{0,2}\/)/) ? fetcher(source) : source);
    return markupProm.then(markup =>
        validateSign(sign, account, markup).then(validated => {
            if (!validated) {
                logCustomValidationError(account, markup);
            }

            return validated ? markup : '';
        })
    );
}

export default memoize(getCustomTemplate);
