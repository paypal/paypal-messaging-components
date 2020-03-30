/** @jsx h */
import { h, render } from 'preact';
import { Logger, LOG_LEVEL } from 'beaver-logger';

import Message from './Message';

function createLogger({ uuid, messageRequestId, trackingDetails }) {
    const { index } = window.xprops;
    const logger = Logger({
        // Url to send logs to
        url: '/credit-presentment/log',
        // Prefix to prepend to all events
        prefix: 'message',
        // Log level to display in the browser console
        logLevel: LOG_LEVEL.WARN,
        // Interval to flush logs to server
        flushInterval: 10 * 1000
    });

    logger.addMetaBuilder(payload => ({
        uuid: payload.hidden ? `${uuid}::banner.hidden:true` : uuid,
        message_request_id: `${messageRequestId}-${index}`,
        tracking_details: {
            click_url: trackingDetails.clickUrl,
            impression_url: trackingDetails.impressionUrl
        }
    }));

    return logger;
}

export function setupMessage({ country, offerType, uuid, messageRequestId, markup, trackingDetails }) {
    const logger = createLogger({ uuid, messageRequestId, trackingDetails });

    render(
        <Message
            country={country}
            offerType={offerType}
            requestId={messageRequestId}
            innerHTML={markup}
            logger={logger}
        />,
        document.body
    );
}
