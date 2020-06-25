import { Logger, LOG_LEVEL } from 'beaver-logger';

import { getGlobalUrl } from './global';

export function createLogger() {
    const logger = Logger({
        // Url to send logs to
        url: getGlobalUrl('LOGGER_2'),
        // Prefix to prepend to all events
        // prefix: 'message',
        // Log level to display in the browser console
        logLevel: LOG_LEVEL.WARN,
        // Interval to flush logs to server
        flushInterval: 10 * 1000
    });

    return logger;
}

const globalLogger = createLogger();

// TODO: Memoize and share between script instances
export const getLogger = () => globalLogger;
