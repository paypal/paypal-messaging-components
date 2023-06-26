/** @jsx node */
import { create } from '@krakenjs/zoid/src';
import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { getCurrentScriptUID } from '@krakenjs/belter/src';

// Direct imports to avoid import cycle by importing from ../../../utils
import { getMeta, getEnv, getLibraryVersion, getStageTag, getNamespace, writeToLocalStorage } from '../../../utils/sdk';
import { getGlobalUrl, createGlobalVariableGetter, globalEvent } from '../../../utils/global';
import { ppDebug } from '../../../utils/debug';

export default createGlobalVariableGetter('__paypal_credit_treatments__', () =>
    create({
        tag: 'paypal-credit-treatments',
        url: getGlobalUrl('TREATMENTS'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,

        containerTemplate: ({ uid, prerenderFrame, frame, doc }) => {
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
                        writeToLocalStorage({
                            experiments: {
                                treatmentsHash,
                                // Experiments can only be maintained for 24 hours
                                expiration: Date.now() + TREATMENTS_MAX_AGE
                            },
                            id: deviceID
                        });

                        globalEvent.trigger('treatments');
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
            }
        }
    })
);
