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
    if (__DEMO__) {
        return ZalgoPromise.resolve(source.startsWith('http') || source.startsWith('./') ? fetcher(source) : source);
    }
    return ZalgoPromise.resolve(String.prototype.startsWith('https://www.paypalobjects.com') ? fetcher(source) : null);
}

export default memoize(getCustomTemplate);
