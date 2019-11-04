import startsWith from 'core-js-pure/stable/string/starts-with';

import { memoizeOnProps, getGlobalUrl, request } from '../../../utils';

function assembleUrl(offerType) {
    const baseUrl = getGlobalUrl('MODAL');
    const modalType = startsWith(offerType, 'NI') ? 'ni' : 'ezp';

    return `${baseUrl}/${modalType}.html`;
}

function fetcher({ offerType }) {
    return request('GET', assembleUrl(offerType)).then(res => {
        return { markup: res.data };
    });
}

export default memoizeOnProps(fetcher, ['offerType']);
