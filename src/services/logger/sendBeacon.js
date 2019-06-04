import objectEntries from 'core-js-pure/stable/object/entries';

import { curry } from '../../utils/index';

/**
 * Create a function that sends data to a specified url
 * @param {String} url Endpoint to send the beacon
 * @returns {Function} Function to send payload to url
 */
export default curry(({ uuid, urls }, payload, bannerHidden = false) => {
    const beacon = new window.Image();

    if (typeof payload === 'object') {
        const fullPayload = {
            ...payload,
            uuid: bannerHidden ? `${uuid}::banner.hidden:true` : uuid
        };
        const bdataKVPairs = objectEntries(fullPayload).reduce(
            (accumulator, [key, value]) => `${accumulator}&${key}=${value}`,
            ''
        );

        beacon.src = `${urls[payload.et] || urls.DEFAULT}&bdata=${encodeURIComponent(bdataKVPairs.slice(1))}`;
    } else if (typeof payload === 'string') {
        beacon.src = urls[payload] || urls.DEFAULT;
    }
}, 2);
