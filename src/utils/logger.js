import objectKeys from 'core-js-pure/stable/object/keys';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { Logger, LOG_LEVEL } from '@krakenjs/beaver-logger/src';

import { getGlobalUrl } from './global';
import { request } from './miscellaneous';

import { getLibraryVersion, getDisableSetCookie } from './sdk';

export const logger = Logger({
    // Url to send logs to
    url: getGlobalUrl('LOGGER'),
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
        const eventsIndexes = json.events.reduce(
            (accumulator, { payload: { index, refIndex } }) => [...accumulator, index, refIndex],
            []
        );

        const trackingIndexes = json.tracking.reduce(
            (accumulator, { index, refIndex }) => [...accumulator, index, refIndex],
            []
        );

        const activeIndexes = eventsIndexes.concat(trackingIndexes);

        const trimmedMeta = objectKeys(json.meta)
            .filter(index => arrayIncludes(activeIndexes, index) || index === 'global')
            .reduce(
                (accumulator, index) => ({
                    ...accumulator,
                    [index]: json.meta[index]
                }),
                {}
            );

        const urlWithCookieParams = getDisableSetCookie()
            ? `${url}?disable-set-cookie=true&features=disable-set-cookie`
            : url;

        return request(method, urlNew, {
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
            integration_type: __MESSAGES__.__TARGET__,
            messaging_version: getLibraryVersion()
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
    return {
        // Send a timestamp with every tracking event so they can be correctly ordered
        timestamp: new Date().getTime()
    };
});
