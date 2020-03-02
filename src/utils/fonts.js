import { ZalgoPromise } from 'zalgo-promise/src';

import fonts from '../messages/models/Template/styles/fonts.css';
import { prependStyle } from './elements';

const loadedFonts = new Map();

export default function(doc) {
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
