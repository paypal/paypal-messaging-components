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
    let markupRegex = /https:\/\/www\.paypalobjects\.com/;
    if (__DEMO__) {
        markupRegex = /^(?:(https?:\/\/)|\.{0,2}\/)/;
    }
    const source = styles.markup;
    return ZalgoPromise.resolve(source.match(markupRegex) ? fetcher(source) : null);
}

export default memoize(getCustomTemplate);
