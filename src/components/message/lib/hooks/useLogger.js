import { useMemo } from 'preact/hooks';
import { noop } from 'belter/src';

import { useXProps } from '../../../lib';

export default function useLogger(meta) {
    const { logger, index } = useXProps();
    const { messageRequestId, uuid, trackingDetails } = meta;

    return useMemo(() => {
        if (
            !logger ||
            typeof logger !== 'object' ||
            ['track', 'info', 'debug', 'error'].some(property => typeof logger[property] !== 'function')
        ) {
            return {
                track: noop,
                info: noop,
                debug: noop,
                error: noop
            };
        }

        const track = payload => {
            const payloadWithMeta = {
                message_request_id: messageRequestId,
                uuid,
                index,
                ...payload
            };

            if (payload.event_type === 'MORS' && trackingDetails) {
                if (payload.et === 'CLIENT_IMPRESSION') {
                    return logger.track({
                        ...payloadWithMeta,
                        url: trackingDetails.impressionUrl
                    });
                }

                if (payload.et === 'CLICK' && trackingDetails) {
                    return logger.track({
                        ...payloadWithMeta,
                        url: trackingDetails.clickUrl
                    });
                }
            }

            logger.track(payloadWithMeta);
            return logger.flush();
        };

        const info = (event, payload) => logger.info(event, { ...payload, id: messageRequestId });
        const debug = (event, payload) => logger.debug(event, { ...payload, id: messageRequestId });
        const error = (event, payload) => logger.error(event, { ...payload, id: messageRequestId });

        return {
            track,
            info,
            debug,
            error
        };
    }, [messageRequestId]);
}
