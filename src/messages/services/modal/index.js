import { ZalgoPromise } from 'zalgo-promise/src';

import { memoizeOnProps, getGlobalUrl } from '../../../utils';

import { getModalType } from '../../../locale';

function assembleUrl(offerCountry, offerType) {
    const baseUrl = getGlobalUrl('MODAL');
    console.log(baseUrl);
    const modalType = getModalType(offerCountry, offerType).toLowerCase();

    return `${baseUrl}/${offerCountry}/${modalType}.html`;
}

function fetcher({ offerType, offerCountry }) {
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

        xhttp.open('GET', assembleUrl(offerCountry, offerType), true);
        xhttp.send();
    });
}

export default memoizeOnProps(fetcher, ['offerType']);
