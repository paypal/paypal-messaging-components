import { SDK_SETTINGS } from '@paypal/sdk-constants';
import { uniqueID } from '@krakenjs/belter/src';
import objectKeys from 'core-js-pure/stable/object/keys';
import arrayIncludes from 'core-js-pure/stable/array/includes';
import { Logger, LOG_LEVEL } from '@krakenjs/beaver-logger/src';

import { getGlobalUrl } from './global';
import { request } from './miscellaneous';
import { FPTI_EVENTS } from './constants';

import { getLibraryVersion, getDisableSetCookie, getScriptAttributes, getMerchantConfig } from './sdk';

/**
 * Remove any key-value pairs that are falsey
 * @param {Object} obj - an object containing key-values
 * @returns {Object} result - a clone of the object, but without any keys that were falsey
 */
function filterAbsentData(obj) {
    return Object.entries(obj).reduce(
        (acc, [key, value]) =>
            typeof value === 'undefined' || value === null || (Array.isArray(value) && value.length === 0)
                ? acc
                : { ...acc, [key]: value },
        {}
    );
}

/**
 * Get the key-value pairs we want to report about the message component
 */
function translateMessageComponentProps(componentMeta, contentMeta, trackingDetails) {
    return {
        ACTIVE_TAGS: trackingDetails?.ACTIVE_TAGS ?? componentMeta?.activeTags,

        PLACEMENT: trackingDetails?.PLACEMENT ?? componentMeta?.placement,

        STYLE_LAYOUT: trackingDetails?.STYLE_LAYOUT ?? componentMeta?.style?.layout,
        STYLE_LOGO_TYPE: trackingDetails?.STYLE_LOGO_TYPE ?? componentMeta?.style?.logo?.type,
        STYLE_LOGO_POSITION: trackingDetails?.STYLE_LOGO_POSITION ?? componentMeta?.style?.logo?.position,
        STYLE_COLOR: trackingDetails?.STYLE_COLOR ?? componentMeta?.style?.color,
        STYLE_TEXT_COLOR: trackingDetails?.STYLE_TEXT_COLOR ?? componentMeta?.style?.text?.color,
        STYLE_TEXT_SIZE: trackingDetails?.STYLE_TEXT_SIZE ?? componentMeta?.style?.text?.size,
        STYLE_TEXT_ALIGN: trackingDetails?.STYLE_TEXT_ALIGN ?? componentMeta?.style?.text?.align
    };
}

/**
 * Get the key-value pairs we want to report about the modal component
 */
function translateModalComponentProps(componentMeta, contentMeta, trackingDetails) {
    const qualifying = trackingDetails.QUALIFYING_PRODUCT ?? trackingDetails.QUALIFYING_PRODUCTS;
    const view =
        trackingDetails.VIEWS ?? trackingDetails.VIEW ?? trackingDetails.MODAL_VIEWS ?? trackingDetails.MODAL_VIEW;

    return {
        QUALIFYING_PRODUCTS: typeof qualifying === 'undefined' || Array.isArray(qualifying) ? qualifying : [qualifying],

        VIEWS: typeof view === 'undefined' || Array.isArray(view) ? view : [view]
    };
}

/**
 * Get the key-value pairs we want to report about the component
 */
function translateComponentProps(componentMeta, contentMeta, trackingDetails) {
    const cpi = trackingDetails.CREDIT_PRODUCT_IDENTIFIER ?? trackingDetails.CREDIT_PRODUCT_IDENTIFIERS;

    const trackingProps = {
        // try to grab the following key-value pairs
        ADBLOCK: componentMeta?.adblock,
        AMOUNT: trackingDetails?.AMOUNT ?? componentMeta?.amount,

        BLOCKED: componentMeta?.blocked,
        BROWSER_WIDTH: componentMeta?.contentMeta?.pname,
        BROWSER_HEIGHT: componentMeta?.contentMeta?.pname,
        BUYER_COUNTRY_CODE:
            trackingDetails?.BUYER_COUNTRY_CODE ?? trackingDetails?.BUYER_COUNTRY ?? componentMeta?.buyerCountry,

        CREDIT_PRODUCT_IDENTIFIERS: typeof cpi === 'undefined' || Array.isArray(cpi) ? cpi : [cpi],

        DEBUG_ID: trackingDetails?.DEBUG_ID ?? componentMeta?.debugId,

        EXPERIMENTATION_EXPERIENCE: trackingDetails?.EXPERIMENTATION_EXPERIENCE,
        EXPERIMENTATION_TREATMENT: trackingDetails?.EXPERIMENTATION_TREATMENT,
        FDATA: trackingDetails?.FDATA,

        IN_VIEWPORT: componentMeta?.visible,
        INSTANCE_ID:
            trackingDetails?.INSTANCE_ID ?? trackingDetails?.MESSAGE_REQUEST_ID ?? componentMeta?.messageRequestId,

        MESSAGE_TYPE: trackingDetails?.MESSAGE_TYPE,

        OFFER_COUNTRY_CODE: trackingDetails?.OFFER_COUNTRY_CODE ?? trackingDetails?.OFFER_COUNTRY,
        OFFER_TYPE: trackingDetails?.OFFER_TYPE ?? componentMeta?.offerType,
        ORIGINATION_INSTANCE_ID: trackingDetails?.ORIGINATION_INSTANCE_ID ?? trackingDetails?.SERVER_MESSAGE_REQUEST_ID,

        PAGE_NAME: componentMeta?.contentMeta?.pname,
        POSITION_IN_PAGE_X: componentMeta?.posX,
        POSITION_IN_PAGE_Y: componentMeta?.posY,
        BROWSER_WIDTH: componentMeta?.browserWidth,
        BROWSER_HEIGHT: componentMeta?.browserHeight,
        PRESENTMENT_CHANNEL:
            trackingDetails?.PRESENTMENT_CHANNEL ?? trackingDetails?.EVENT_CHANNEL ?? trackingDetails?.sub_chn,

        REQUEST_DURATION: componentMeta?.requestDuration,
        RENDER_DURATION: componentMeta?.renderDuration,
        RENDER_DELAY: componentMeta?.renderDelay,
        DURATION: componentMeta?.duration
    };
    if (componentMeta.type === 'message') {
        return filterAbsentData({
            ...trackingProps,
            ...translateMessageComponentProps(componentMeta, contentMeta, trackingDetails)
        });
    }
    if (componentMeta.type === 'message') {
        return filterAbsentData({
            ...trackingProps,
            ...translateModalComponentProps(componentMeta, contentMeta, trackingDetails)
        });
    }

    return filterAbsentData(trackingProps);
}

/**
 * Translate the event data from beaver-logger input COMPONENT_EVENTS
 */
function translateComponentEvent({
    index,
    refIndex,
    eventType,
    timestamp,
    pageView,
    scriptLoadDelay,
    domLoadDelay,
    pageLoadDelay,
    link,
    src,
    amount,
    errorName,
    errorDescription,
    renderDelay,
    renderDuration,
    requestDuration
}) {
    const eventData = {
        EVENT_TYPE: eventType,
        TIMESTAMP: timestamp,
        REQUEST_DURATION: requestDuration
    };

    if (pageView) {
        eventData.PAGE_VIEW = pageView;
    }

    if (eventType === FPTI_EVENTS.PAGE_LOADED) {
        return {
            ...eventData,
            SCRIPT_LOAD_DELAY: scriptLoadDelay,
            DOM_LOAD_DELAY: domLoadDelay,
            PAGE_LOAD_DELAY: pageLoadDelay
        };
    } else if (eventType === FPTI_EVENTS.MESSAGE_RENDERED) {
        return {
            ...eventData,
            FIRST_RENDER_DELAY: firstRenderDelay,
            RENDER_DELAY: renderDelay,
            RENDER_DURATION: renderDuration
        };
    } else if (eventType === FPTI_EVENTS.MESSAGE_HOVERED) {
        return eventData;
    } else if (eventType === FPTI_EVENTS.MESSAGE_CLICKED) {
        return eventData;
    } else if (eventType === FPTI_EVENTS.MESSAGE_ERROR) {
        return {
            ...eventData,
            ERROR_NAME: errorName,
            ERROR_DESCRIPTION: errorDescription
        };
    } else if (eventType === FPTI_EVENTS.MODAL_RENDERED) {
        return {
            ...eventData,
            PAGE_VIEW_LINK_NAME: trackingData.link,
            PAGE_VIEW_LINK_SOURCE: trackingData.src,
            CALCULATOR_INPUT: trackingData.amount
        };
    } else if (eventType === FPTI_EVENTS.MODAL_VIEWED) {
        return eventData;
    }
    return eventData;
}

/**
 * Generate the components portion of the payload.
 * @param {number} componentIndex - index for the component
 * @param {Object} componentMeta -
 * @param {Object[]} tracking -
 */
function translateComponentData(componentIndex, componentMeta, events, tracking) {
    const { type: componentType, messageRequestId, contentMeta } = componentMeta ?? {};

    const { trackingDetails = {} } = contentMeta;

    const trackingProps = translateComponentProps(componentMeta, contentMeta, trackingDetails);

    const componentEvents = events.reduce((eventAcc, { level, event, payload }) => {
        const { description, timestamp } = payload ?? {};
        if (level === 'error' || level === 'warn') {
            const errorDescription = description ?? JSON.stringify(payload);
            return [...eventAcc, { timestamp, errorName: event, errorDescription }];
        }
        return eventAcc;
    }, []);

    const componentTracking = tracking.reduce((trackingEvents, trackingData) => {
        if (`${componentIndex}` !== `${trackingData.index}`) {
            return trackingEvents;
        }
        console.log('componentTracking', componentIndex, trackingData);
        return [...trackingEvents, filterAbsentData(translateComponentEvent(trackingData ?? {}))];
    }, []);

    // "sdkMeta": "eyJ1cmwiOiJodHRwczovL2xvY2FsaG9zdC5wYXlwYWwuY29tOjg0NDQvc2RrL2pzP2NsaWVudC1pZD1hbGNfY2xpZW50MSZjb21wb25lbnRzPW1lc3NhZ2VzIiwiYXR0cnMiOnsiZGF0YS11aWQiOiJ1aWRfaHhyb21mbGxkcmpwdHJ0aXNpeXFvanptd3FrZHBhIn19",
    // "scriptUID": "uid_hxromflldrjptrtisiyqojzmwqkdpa",
    // "disableSetCookie": true,
    // "features": "disable-set-cookie",

    console.log(
        'translateComponentData',
        JSON.stringify(
            { componentIndex, componentMeta, events, tracking, componentEvents, componentTracking },
            null,
            '    '
        )
    );
    const componentData = {
        ...trackingProps,
        COMPONENT_EVENTS: [...componentEvents, ...componentTracking]
    };

    return componentData;
}

// EXPERIMENTATION_EXPERIENCE
// EXPERIMENTATION_TREATMENT
// impressionUrl
// clickUrl
// MESSAGE_REQUEST_ID
// SERVER_MESSAGE_REQUEST_ID
// OFFER_COUNTRY
// MESSAGE_TYPE
// OFFER_TERM
// AMOUNT
// STYLE_LAYOUT
// STYLE_LOGO_TYPE
// STYLE_LOGO_POSITION
// STYLE_TEXT_COLOR
// STYLE_TEXT_SIZE
// STYLE_TEXT_ALIGN
// CREDIT_PRODUCT_IDENTIFIER
// PRODUCT_FAMILY
// MERCHANT_CONFIG_HASH
// MERCHANT_COUNTRY
// EVENT_CHANNEL
// DEBUG_ID

/**
 * Generate a log payload for a given account.
 * @param {Object} baseData - key-value pairs that should be in all cloud events
 * @param {Object} accountData - key-value pairs that should be in a cloud event
 *      for a singular account.
 */
function collateAccounts(componentMetas) {
    return Object.entries(componentMetas).reduce((acc, [componentIndex, { account }]) => {
        if (typeof account !== 'string') {
            return acc;
        }
        const existingAccountData = acc[account];
        if (typeof existingAccountData !== 'undefined') {
            return {
                ...acc,
                [account]: {
                    ...existingAccountData,
                    components: [...existingAccountData.components, componentIndex]
                }
            };
        }

        const accountData = {
            components: [componentIndex]
        };

        const [clientIdPrefix, clientId] = account.split(':');

        if (clientId) {
            accountData.CLIENT_ID = clientId;
        } else {
            accountData.MERCHANT_ID = account;
        }

        return {
            ...acc,
            [account]: accountData
        };
    }, {});
}

/**
 * Attempt to retrieve information about the account from the
 * data in the components.
 */
function retrieveFromComponents(components, meta, fnc) {
    return components.reduce((accountProp, componentIndex) => {
        if (typeof accountProp !== 'undefined') {
            return accountProp;
        }
        const componentMeta = meta[componentIndex] ?? {};
        const contentMeta = meta[componentIndex]?.contentMeta ?? {};
        const trackingDetails = contentMeta?.trackingDetails ?? {};
        return fnc({ componentMeta, contentMeta, trackingDetails });
    }, undefined);
}

/**
 * Generate a log payload for a given account.
 * @param {Object} baseData - key-value pairs that should be in all cloud events
 * @param {Object} accountData - key-value pairs that should be in a cloud event
 *      for a singular account.
 */
export function generateLogPayload(baseData, accountData, meta, events, tracking) {
    console.log('generateLogPayload', baseData, accountData, meta, events, tracking);

    const { components, ...accountPayload } = accountData;
    const componentsPayload = components.map(componentIndex => {
        return translateComponentData(componentIndex, meta[componentIndex], events, tracking);
    });

    const supplementalAccountData = filterAbsentData({
        MERCHANT_COUNTRY_CODE: retrieveFromComponents(
            components,
            meta,
            ({ trackingDetails }) => trackingDetails?.MERCHANT_COUNTRY_CODE ?? trackingDetails?.MERCHANT_COUNTRY
        ),
        MERCHANT_PROFILE_VALID: retrieveFromComponents(
            components,
            meta,
            ({ trackingDetails }) => trackingDetails?.MERCHANT_PROFILE_VALID ?? trackingDetails?.MERCHANT_CONFIG_VALID
        ),
        BUYER_PROFILE_HASH: retrieveFromComponents(
            components,
            meta,
            ({ trackingDetails }) =>
                trackingDetails?.BUYER_PROFILE_HASH ??
                trackingDetails?.BUYER_CONFIG_HASH ??
                componentMeta?.treatmentHash
        ),
        BUYER_PROFILE_VALID: retrieveFromComponents(
            components,
            meta,
            ({ trackingDetails }) => trackingDetails?.BUYER_PROFILE_VALID ?? trackingDetails?.BUYER_CONFIG_VALID
        ),
        MERCHANT_ID:
            accountData?.MERCHANT_ID ??
            retrieveFromComponents(
                components,
                meta,
                ({ componentMeta, trackingDetails }) => trackingDetails?.pubid ?? componentMeta?.payerId
            ),
        MERCHANT_PROFILE_HASH:
            accountData?.MERCHANT_PROFILE_HASH ??
            retrieveFromComponents(
                components,
                meta,
                ({ componentMeta, trackingDetails }) =>
                    trackingDetails?.MERCHANT_PROFILE_HASH ??
                    trackingDetails?.MERCHANT_CONFIG_HASH ??
                    componentMeta?.merchantConfigHash
            )
    });

    return {
        specversion: '1.0',
        id: uniqueID(),
        type: 'com.paypal.credit.upstream-presentment.v1',
        source: 'urn:paypal:event-src:js-sdk:messages',
        datacontenttype: 'application/json',
        dataschema:
            'ppaas:events.credit.FinancingPresentmentAsyncAPISpecification/v1/schema/json/credit_upstream_presentment_event.json',
        time: new Date().toISOString(),
        // "time": "2021-01-19T11:18:36.652-08:00",
        data: {
            ...baseData,
            ...accountPayload,
            ...supplementalAccountData,
            COMPONENTS: componentsPayload
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
export function translateLogData({ meta, events, tracking }) {
    const {
        global: { integration_type: integrationType, messaging_version: messagingVersion, deviceID, sessionID },
        ...componentMetas
    } = meta;

    const accounts = collateAccounts(componentMetas);

    const baseData = {
        // CLIENT_ID
        // MERCHANT_ID
        // MERCHANT_PROFILE_HASH
        // PARTNER_ATTRIBUTION_ID
        // INTEGRATION_NAME
        // INTEGRATION_VERSION
        DEVICE_ID: deviceID,
        SESSION_ID: sessionID,
        INTEGRATION_TYPE: integrationType,
        LIB_VERSION: messagingVersion
    };

    const supplementalAccountData = filterAbsentData({
        PARTNER_ATTRIBUTION_ID: getScriptAttributes()[SDK_SETTINGS.PARTNER_ATTRIBUTION_ID],
        MERCHANT_PROFILE_HASH: getMerchantConfig()
    });

    return Object.values(accounts).reduce(
        (logPayloads, accountData) => [
            ...logPayloads,
            generateLogPayload(baseData, { ...supplementalAccountData, ...accountData }, meta, events, tracking)
        ],
        []
    );
}

/**
 * Because there is no way to remove payload builders from beaver-logger
 * Filter the meta object to remove inactive banner meta commonly caused by SPAs
 */
function filterLogData({ events, tracking, meta }) {
    const eventsIndexes = events.reduce(
        (accumulator, { payload: { index, refIndex } }) => [...accumulator, index, refIndex],
        []
    );

    const trackingIndexes = tracking.reduce(
        (accumulator, { index, refIndex }) => [...accumulator, index, refIndex],
        []
    );

    const activeIndexes = eventsIndexes.concat(trackingIndexes);

    const trimmedMeta = objectKeys(meta)
        .filter(index => arrayIncludes(activeIndexes, index) || index === 'global')
        .reduce(
            (accumulator, index) => ({
                ...accumulator,
                [index]: meta[index]
            }),
            {}
        );
    return {
        meta: trimmedMeta,
        events,
        tracking
    };
}

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
        const urlWithCookieParams = getDisableSetCookie()
            ? `${url}?disableSetCookie=true&features=disable-set-cookie`
            : url;

        const trimmedData = filterLogData(json);

        let newSchema;
        try {
            newSchema = translateLogData(trimmedData);
            console.log(JSON.stringify(newSchema[0], null, '    '));
        } catch (err) {
            console.log(err);
        }

        console.log(
            // JSON.stringify(
            {
                json,
                trimmedData,
                newSchema
            }
            //     null,
            //     '    '
            // )
        );

        // return ZalgoPromise.all(
        //     translateLogData(trimmedData).map(data => {
        //         return request(method, urlWithCookieParams, {
        //             headers: {
        //                 'content-type': 'application/json',
        //                 ...headers
        //             },
        //             data,
        //             withCredentials: true
        //         });
        //     })
        // );

        return request(method, urlWithCookieParams, {
            headers: {
                'content-type': 'application/json',
                ...headers
            },
            data: trimmedData,
            withCredentials: true
        });
    }
});

// $logger.addMetaBuilder(<function>);
// Attach a method which is called and will attach general information
// to the logging payload whenever the logs are flushed
logger.addMetaBuilder(() => {
    return {
        global: {
            integration_type: __MESSAGES__.__TARGET__,
            messaging_version: getLibraryVersion()
        }
    };
});

// $logger.addPayloadBuilder(<function>);
// Attach a method which is called and will attach values to each
// individual log's payload whenever the logs are flushed
logger.addPayloadBuilder(payload => {
    // Remove properties holding DOM element references that are
    // only useful in the context of the browser console window
    delete payload.container; // eslint-disable-line no-param-reassign
    delete payload.selector; // eslint-disable-line no-param-reassign

    return {
        // Send a timestamp with every tracking event so they can be correctly ordered
        timestamp: new Date().getTime()
    };
});

// $logger.addTrackingBuilder(<function>);
// Attach a method which is called for each logger.track call. The method should return an object
// containing supplementary key-value pairs to add to the payload given to logger.track
logger.addTrackingBuilder(() => {
    return {
        // Send a timestamp with every tracking event so they can be correctly ordered
        timestamp: new Date().getTime()
    };
});
