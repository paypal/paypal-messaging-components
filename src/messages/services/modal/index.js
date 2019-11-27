import { memoizeOnProps, getGlobalUrl, request } from '../../../utils';

import { getModalType } from '../../../locale';

function assembleUrl(offerCountry, offerType) {
    const baseUrl = getGlobalUrl('MODAL');
    const modalType = getModalType(offerCountry, offerType).toLowerCase();

    return `${baseUrl}/${offerCountry}/${modalType}.html`;
}

function fetcher({ offerType, offerCountry }) {
    return request('GET', assembleUrl(offerCountry, offerType)).then(res => {
        return { markup: res.data };
    });
}

export default memoizeOnProps(fetcher, ['offerType']);
