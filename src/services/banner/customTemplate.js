import { ZalgoPromise } from 'zalgo-promise';

import { memoize } from '../../utils';

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

function getCustomTemplate(styles) {
    const source = styles.markup;
    const markupProm = ZalgoPromise.resolve(source.match(/^(?:(https?:\/\/)|\.{0,2}\/)/) ? fetcher(source) : source);
    return markupProm.then(markup => markup);
}

export default memoize(getCustomTemplate);
