import { Logger, LOG_LEVEL } from 'beaver-logger';

import { getGlobalUrl } from './global';

export const logger = Logger({
    // Url to send logs to
    url: getGlobalUrl('LOGGER_2'),
    // Prefix to prepend to all events
    prefix: 'paypal_messages',
    // Log level to display in the browser console
    logLevel: LOG_LEVEL.WARN,
    // Interval to flush logs to server
    flushInterval: 10 * 1000
});

logger.addPayloadBuilder(payload => {
    // Remove properties holding DOM element references that are
    // only useful in the context of the browser console window
    delete payload.container; // eslint-disable-line no-param-reassign
    delete payload.selector; // eslint-disable-line no-param-reassign

    return {};
});
