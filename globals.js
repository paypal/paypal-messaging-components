const postRobotGlobals = require('post-robot/globals');
const zoidGlobals = require('zoid/globals');

const niMessage = require('./banners/US/ni_non-us.json');
const ezpMessage = require('./banners/US/ezp_any_eqz.json');
const palaSingleMessage = require('./banners/US/pala_single_eqz.json');
const palaMultiMessage = require('./banners/US/pala_multi_gtz.json');
const { version } = require('./package.json');

module.exports = (env = { TARGET: 'sdk' }) => ({
    __ZOID__: {
        ...zoidGlobals.__ZOID__,
        __DEFAULT_CONTAINER__: true,
        __DEFAULT_PRERENDER__: true,
        __FRAMEWORK_SUPPORT__: true
    },

    __POST_ROBOT__: {
        ...postRobotGlobals.__POST_ROBOT__,
        __IE_POPUP_SUPPORT__: false
    },

    __MESSAGES__: {
        __VERSION__: version,
        __DEMO__: !!env.demo,
        __TARGET__: env.TARGET.toUpperCase(),
        __DOMAIN__: {
            __LOCAL__: '//localhost.paypal.com:8080',
            __STAGE__: 'https://www.msmaster.qa.paypal.com',
            __SANDBOX__: 'https://www.sandbox.paypal.com',
            __PRODUCTION__: 'https://www.paypal.com'

            // Manual endpoint override example:
            // __MODAL__: {
            //     __STAGE__: 'http://localhost.paypal.com:8443'
            // }
        },
        __URI__: {
            __MESSAGE__: '/imadserver/upstream',
            __MODAL__: '/credit-presentment/smart/modal',
            __LOGGER__: '/ppcredit/messagingLogger'
        },
        __SANDBOX__: {
            __NI__: niMessage,
            __EZP__: ezpMessage,
            __PALA_SINGLE__: palaSingleMessage,
            __PALA_MULTI__: palaMultiMessage,
            __TERMS__: {
                type: 'pala',
                options: [
                    {
                        term: 3,
                        apr: '0.00',
                        type: 'INST',
                        minValue: '30.00'
                    },
                    {
                        term: 12,
                        apr: '12.99',
                        type: 'INST',
                        minValue: '360.00'
                    },
                    {
                        term: 24,
                        apr: '12.99',
                        type: 'INST',
                        minValue: '720.00'
                    }
                ],
                max_amount: 10000000,
                min_amount: 30,
                default_max_amount: 10000000,
                result: 'success'
            }
        }
    }
});
