/** @jsx node */
import { create } from '@krakenjs/zoid/src';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { getCurrentScriptUID } from '@krakenjs/belter/src';

// Direct imports to avoid import cycle by importing from ../../../utils
import { GLOBAL_EVENT, TREATMENTS_EVENT, TAG } from '../../../utils/constants';
import {
    getMeta,
    getEnv,
    getLibraryVersion,
    getStageTag,
    getNamespace,
    writeToLocalStorage,
    getDisableSetCookie,
    getFeatures
} from '../../../utils/sdk';
import { getGlobalUrl, createGlobalVariableGetter, globalEvent } from '../../../utils/global';
import { canDebug, DEBUG_CONDITIONS, getDebugLevel, ppDebug } from '../../../utils/debug';

export default createGlobalVariableGetter('__paypal_credit_treatments__', () =>
    create({
        tag: TAG.TREATEMENTS,
        url: getGlobalUrl('TREATMENTS'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,

        containerTemplate: ({ uid, prerenderFrame, frame, doc, event }) => {
            if (canDebug(DEBUG_CONDITIONS.EVENT_EMITTERS)) {
                ppDebug(`EVENT_EMITTER.TREATMENTS`, { debugObj: event });
            }
            if (canDebug(DEBUG_CONDITIONS.ZOID_EVENTS) && typeof event?.on !== 'undefined') {
                Object.entries(TREATMENTS_EVENT).forEach(([eventId, eventName]) =>
                    event?.on(eventName, debugObj => ppDebug(`EVENT.TREATMENTS.${eventId}`, { debugObj }))
                );
            }
            const styles = `
                #${uid} {
                    position: absolute!important;
                    left: -99999px;
                    top: -99999px;
                    width: 1px;
                    height: 1px;
                }
            `;

            return (
                <span id={uid}>
                    <style>{styles}</style>
                    <node el={frame} />
                    <node el={prerenderFrame} />
                </span>
            ).render(dom({ doc }));
        },

        props: {
            disableSetCookie: {
                type: 'boolean',
                queryParam: true,
                required: false,
                value: getDisableSetCookie
            },
            features: {
                type: 'string',
                queryParam: 'features',
                required: false,
                value: getFeatures
            },
            namespace: {
                type: 'string',
                queryParam: false,
                value: getNamespace
            },

            onReady: {
                type: 'function',
                queryParam: false,
                value: () => {
                    // 15 minutes in milliseconds
                    const TREATMENTS_MAX_AGE = 1000 * 60 * 15;

                    return ({ treatmentsHash, deviceID }) => {
                        ppDebug(`EVENT.TREATMENTS.onReady`, { debugObj: { treatmentsHash, deviceID } });
                        writeToLocalStorage({
                            experiments: {
                                treatmentsHash,
                                // Experiments can only be maintained for 15 minutes
                                expiration: Date.now() + TREATMENTS_MAX_AGE
                            },
                            // Write deviceID from paypal.com localStorage to merchant domain localStorage
                            // This should be the only place that we write to the storage.id
                            // to prevent it getting out of sync with treatmentsHash
                            id: deviceID
                        });

                        globalEvent.trigger(GLOBAL_EVENT.TREATMENTS);
                    };
                }
            },

            sdkMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                required: false,
                value: getMeta,
                debug: ppDebug(`SDK Meta: ${getMeta()}`)
            },

            uid: {
                type: 'string',
                queryParam: true,
                value: getCurrentScriptUID,
                debug: ppDebug(`ScriptUID: ${getCurrentScriptUID()}`)
            },

            stageTag: {
                type: 'string',
                queryParam: true,
                required: false,
                value: getStageTag
            },
            env: {
                type: 'string',
                queryParam: true,
                value: getEnv,
                debug: ppDebug(`Environment: ${getEnv()}`)
            },
            scriptUID: {
                type: 'string',
                queryParam: true,
                value: getCurrentScriptUID,
                debug: ppDebug(`ScriptUID: ${getCurrentScriptUID()}`)
            },
            version: {
                type: 'string',
                queryParam: true,
                value: getLibraryVersion,
                debug: ppDebug(`Library Version: ${getLibraryVersion()}`)
            },
            integrationType: {
                type: 'string',
                queryParam: true,
                value: () => __MESSAGES__.__TARGET__,
                debug: ppDebug(`Library Integration: ${__MESSAGES__.__TARGET__}`)
            },
            debug: {
                type: 'number',
                queryParam: 'pp_debug',
                required: false,
                value: getDebugLevel
            }
        }
    })
);
