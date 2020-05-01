import objectEntries from 'core-js-pure/stable/object/entries';

import { curry } from '../../../utils/index';

/**
 * Create a function that sends data to a specified url
 * @param {String} url Endpoint to send the beacon
 * @returns {Function} Function to send payload to url
 */
export default curry(({ uuid: mainUuid, urls, messageRequestId }, payload, bannerHidden = false) => {
    const beacon = new window.Image();

    if (typeof payload === 'object') {
        const { headline, subHeadline, disclaimer } = payload.renderedMessage || {};
        const renderedMessageUuidString = headline
            ? `::message.size:${headline.size},${subHeadline.size},${disclaimer.size}`
            : '';
        const uuid = `${mainUuid}${renderedMessageUuidString}`;

        const fullPayload = {
            ...payload,
            message_request_id: messageRequestId,
            uuid: bannerHidden ? `${uuid}::banner.hidden:true` : uuid
        };
        const bdataKVPairs = objectEntries(fullPayload).reduce(
            (accumulator, [key, value]) => (value === undefined ? accumulator : `${accumulator}&${key}=${value}`),
            ''
        );

        beacon.src = `${urls[payload.et] || urls.DEFAULT}&bdata=${encodeURIComponent(bdataKVPairs.slice(1))}`;
    } else if (typeof payload === 'string') {
        beacon.src = urls[payload] || urls.DEFAULT;
    }
}, 2);
