/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
import objectKeys from 'core-js-pure/stable/object/keys';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { Logger, LOG_LEVEL } from '@krakenjs/beaver-logger/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

import { getGlobalAPIUrl } from './global';
import { request } from './miscellaneous';

import { getLibraryVersion, getDisableSetCookie } from './sdk';

function generateLogPayload(account, { meta, events: bizEvents, tracking }) {
    const { deviceID, sessionID, integration_type, messaging_version } = meta.global ?? {};

    let clientID;
    if (account.startsWith('client-id:')) {
        clientID = account.slice(10);
    }

    let merchant_profile_hash;
    let merchant_profile_valid;
    let buyer_profile_hash;
    let buyer_profile_valid;
    let partner_attribution_id;

    const components = Object.entries(meta)
        .filter(([, component]) => component.account === account)
        .map(([index, component]) => {
            const { type, messageRequestId, stats = {}, trackingDetails } = component;

            const { clickUrl } = trackingDetails;
            delete trackingDetails.clickUrl;

            // We expect these to be the same for every event so just take one
            merchant_profile_hash = merchant_profile_hash ?? trackingDetails.MERCHANT_PROFILE_HASH;
            merchant_profile_valid = merchant_profile_valid ?? trackingDetails.MERCHANT_PROFILE_VALID;
            buyer_profile_hash = buyer_profile_hash ?? trackingDetails.BUYER_PROFILE_HASH;
            buyer_profile_valid = buyer_profile_valid ?? trackingDetails.BUYER_PROFILE_VALID;
            partner_attribution_id = partner_attribution_id ?? stats.bn_code;

            const componentEvents = tracking.filter(event => event.index === index);

            // bn_code does not live in stats for standalone modal
            partner_attribution_id =
                partner_attribution_id ?? componentEvents.find(event => event.bn_code !== undefined)?.bn_code;

            // Stats payload
            const { render_duration, request_duration } = stats;
            delete stats.render_duration;
            delete stats.request_duration;

            // disable ESLint rule since we do not support IE anymore
            // eslint-disable-next-line compat/compat
            const clickUrlParams = new URLSearchParams(clickUrl);
            const fdata = clickUrlParams.get('fdata');

            return {
                component_type: type,
                instance_id: messageRequestId,
                fdata,
                merchant_events: bizEvents.filter(event => event.payload?.index === index),
                ...trackingDetails,
                ...stats,

                component_events: componentEvents
                    .filter(({ event_type }) => event_type !== 'MORS')
                    .map(event => {
                        return {
                            render_duration,
                            request_duration,
                            ...event
                        };
                    })
            };
        });

    return {
        specversion: '1.0',
        type: 'com.paypal.credit.upstream-presentment.v1',
        source: 'urn:paypal:event-src:js-sdk:messages',
        datacontenttype: 'application/json',
        dataschema:
            'ppaas:events.credit.FinancingPresentmentAsyncAPISpecification/v1/schema/json/credit_upstream_presentment_event.json',
        data: {
            // Integration Details
            client_id: clientID,
            merchant_id: account,
            partner_attribution_id,
            merchant_profile_hash,
            merchant_profile_valid,
            buyer_profile_hash,
            buyer_profile_valid,

            // Global Details
            device_id: deviceID,
            session_id: sessionID,
            integration_type,
            integration_version: messaging_version,
            components
        }
    };
}

/**
 * Translate the meta, events, and tracking into payloads for the
 * endpoint `/v1/credit/upstream-messaging-events`
 * @param {Object} data - the data the logger wishes to send
 * @param {Object} data.meta - the data the logger wishes to send
 * @param {Object[]} data.events - the data captured by logger.{debug|info|warn|error} calls
 * @param {Object[]} data.tracking - the data captured by logger.track calls
 * @returns {Object[]} result - the data we wish to send as request bodies
 * @returns {Object} result.[] - the data we wish to report the components and events for a single merchant
 */
function translateLogData({ meta, events, tracking }) {
    const uniqueAccounts = Array.from(
        new Set(
            Object.values(meta)
                .map(({ account }) => account)
                .filter(Boolean)
        )
    );

    return uniqueAccounts.reduce(
        (payloads, uniqueAccount) => [...payloads, generateLogPayload(uniqueAccount, { meta, events, tracking })],
        []
    );
}

export const logger = Logger({
    // Url to send logs to
    url: getGlobalAPIUrl('LOGGER'),
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

        const trimmedLog = json;
        trimmedLog.meta = trimmedMeta;

        const urlWithCookieParams = getDisableSetCookie()
            ? `${url}?disableSetCookie=true&features=disable-set-cookie`
            : url;

        return ZalgoPromise.all(
            translateLogData(trimmedLog).map(data => {
                return request(method, urlWithCookieParams, {
                    headers: {
                        'content-type': 'application/json',
                        ...headers
                    },
                    data,
                    withCredentials: true
                });
            })
        );
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
