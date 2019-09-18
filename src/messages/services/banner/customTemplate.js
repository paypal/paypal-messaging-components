import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise/src';

import { memoize } from '../../../utils';

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
    if (__MESSAGES__.__DEMO__) {
        return ZalgoPromise.resolve(
            stringStartsWith(source, 'http') || stringStartsWith(source, './') ? fetcher(source) : source
        );
    }
    return ZalgoPromise.resolve(stringStartsWith(source, 'https://www.paypalobjects.com') ? fetcher(source) : '');
}

export default memoize(getCustomTemplate);
