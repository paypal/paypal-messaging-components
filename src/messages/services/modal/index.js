import { ZalgoPromise } from 'zalgo-promise/src';

import { memoizeOnProps } from '../../../utils';

import { getModalType } from '../../../locale';

function assembleUrl(offerType) {
    const baseUrl = __MESSAGES__.__MODAL_URL__;
    const modalType = getModalType(offerType).toLowerCase();

    return `${baseUrl}/${__MESSAGES__.__LOCALE__}/${modalType}.html`;
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
