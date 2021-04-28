import objectKeys from 'core-js-pure/stable/object/keys';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { Logger, LOG_LEVEL } from 'beaver-logger/src';

import { getGlobalUrl } from './global';
import { request } from './miscellaneous';

import { getStorageID, getSessionID } from './sdk';

export const logger = Logger({
    // Url to send logs to
    url: getGlobalUrl('LOGGER_B'),
    // Prefix to prepend to all events
    prefix: 'paypal_messages',
    // Log level to display in the browser console
    logLevel: LOG_LEVEL.WARN,
    // Interval to flush logs to server
    flushInterval: 10 * 1000,
    // Override transport so we can use withCredentials
    transport: ({ url, method, json, headers }) => {
        // Because there is no way to remove payload builders from beaver-logger
        // Filter the meta object to remove inactive banner meta commonly caused by SPAs
        const activeIndexes = json.events
            .map(({ payload: { index } }) => index)
            .concat(json.tracking.map(({ index }) => index));

        const trimmedMeta = objectKeys(json.meta)
            .filter(index => arrayIncludes(activeIndexes, index) || index === 'global')
            .reduce(
                (accumulator, index) => ({
                    ...accumulator,
                    [index]: json.meta[index]
                }),
                {}
            );

        return request(method, url, {
            headers: {
                'content-type': 'application/json',
                ...headers
            },
            data: {
                meta: trimmedMeta,
                events: json.events,
                tracking: json.tracking
            },
            withCredentials: true
        });
    }
});

logger.addMetaBuilder(() => {
    return {
        global: {
            deviceID: getStorageID(),
            sessionID: getSessionID()
        }
    };
});

logger.addPayloadBuilder(payload => {
    // Remove properties holding DOM element references that are
    // only useful in the context of the browser console window
    delete payload.container; // eslint-disable-line no-param-reassign
    delete payload.selector; // eslint-disable-line no-param-reassign

    return {};
});

logger.addTrackingBuilder(() => {
    // Send a timestamp with every tracking event so they can be correctly ordered
    return {
        timestamp: new Date().getTime()
    };
});
