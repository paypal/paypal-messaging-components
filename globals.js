const postRobotGlobals = require('post-robot/globals');
const zoidGlobals = require('zoid/globals');

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
        __VERSION__: env.VERSION || version,
        __DEMO__: !!env.demo,
        __TARGET__: env.TARGET.toUpperCase(),
        __DOMAIN__: {
            __LOCAL__: 'https://localhost.paypal.com:8080',
            __STAGE__: 'https://www.msmaster.qa.paypal.com',
            __SANDBOX__: 'https://www.sandbox.paypal.com',
            __PRODUCTION__: 'https://www.paypal.com',

            // Manual endpoint override example:
            // __MODAL__: {
            //     __LOCAL__: 'https://localhost.paypal.com:8443'
            // },
            // __LOGGER_A__: {
            //     __LOCAL__: 'https://www.msmaster.qa.paypal.com'
            // },
            __RAMP_EXPERIMENT__: {
                __LOCAL__: 'https://www.paypalobjects.com',
                __STAGE__: 'https://www.paypalobjects.com',
                __SANDBOX__: 'https://www.paypalobjects.com',
                __PRODUCTION__: 'https://www.paypalobjects.com'
            }
        },
        __URI__: {
            __RAMP_EXPERIMENT__: '/upstream/assets/messaging/modal/ramp-experiment-ssr.json',
            __MESSAGE_A__: '/credit-presentment/messages',
            __MESSAGE_B__: '/credit-presentment/smart/message',
            __MODAL__: '/credit-presentment/smart/modal',
            __LOGGER_A__: '/ppcredit/messagingLogger',
            __LOGGER_B__: '/credit-presentment/log'
        }
    }
});
