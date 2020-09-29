import objectEntries from 'core-js-pure/stable/object/entries';
import stringIncludes from 'core-js-pure/stable/string/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';

import { curry } from '../../../utils/index';

/**
 * Create a function that sends data to a specified url
 * @param {String} url Endpoint to send the beacon
 * @returns {Function} Function to send payload to url
 */
export default curry(({ uuid, urls, messageRequestId }, payload, bannerHidden = false) => {
    const beacon = new window.Image();

    if (typeof payload === 'object') {
        const fullPayload = {
            ...payload,
            message_request_id: messageRequestId,
            uuid: bannerHidden ? `${uuid}::banner.hidden:true` : uuid
        };
        const bdataKVPairs = objectEntries(fullPayload)
            .reduce(
                (accumulator, [key, value]) => (value === undefined ? accumulator : `${accumulator}&${key}=${value}`),
                ''
            )
            .slice(1);

        const rootUrl = urls[payload.et] || urls.DEFAULT;

        if (stringIncludes(rootUrl, 'bdata')) {
            beacon.src = rootUrl
                .split('&')
                .map(part => {
                    if (stringStartsWith(part, 'bdata')) {
                        const [key, val] = part.split('=');
                        const newVal = encodeURIComponent(`${decodeURIComponent(val)}&${bdataKVPairs}`);
                        return `${key}=${newVal}`;
                    }

                    return part;
                })
                .join('&');
        } else {
            beacon.src = `${rootUrl}&bdata=${encodeURIComponent(bdataKVPairs)}`;
        }
    } else if (typeof payload === 'string') {
        beacon.src = urls[payload] || urls.DEFAULT;
    }
}, 2);
