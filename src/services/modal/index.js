import startsWith from 'core-js-pure/stable/string/starts-with';
import { ZalgoPromise } from 'zalgo-promise';

import { memoizeOnProps } from '../../utils';

function assembleUrl(offerType) {
    const baseUrl = __MODAL_URL__;
    const modalType = startsWith(offerType, 'NI') ? 'ni' : 'ezp';

    return `${baseUrl}/${modalType}.html`;
}

function fetcher({ offerType }) {
    return new ZalgoPromise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                switch (xhttp.status) {
                    case 200:
                        resolve({ markup: xhttp.responseText });
                        break;
                    default:
                        reject();
                }
            }
        };

        xhttp.open('GET', assembleUrl(offerType), true);
        xhttp.send();
    });
}

export default memoizeOnProps(fetcher, ['offerType']);
