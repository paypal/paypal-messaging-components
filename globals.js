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
        __VERSION__: version,
        __DEMO__: !!env.demo,
        __TARGET__: env.TARGET.toUpperCase(),
        __DOMAIN__: {
            __LOCAL__: 'https://localhost.paypal.com:8080',
            __STAGE__: 'https://www.msmaster.qa.paypal.com',
            __SANDBOX__: 'https://www.sandbox.paypal.com',
            __PRODUCTION__: 'https://www.paypal.com',

            // Manual endpoint override example:
            __MODAL__: {
                __LOCAL__: 'https://localhost.paypal.com:8443'
            },
            __MESSAGE__: {
                __LOCAL__: 'https://localhost.paypal.com:8443'
            },
            __MESSAGE_B__: {
                __STAGE__: 'https://localhost.paypal.com:8443'
            },
            __MESSAGE_B_LEGACY__: {
                __STAGE__: 'https://localhost.paypal.com:8443'
            },
            __RAMP_WHITELIST__: {
                __LOCAL__: 'https://UIDeploy--StaticContent--51bfac9aaef3f--ghe.preview.dev.paypalinc.com',
                __STAGE__: 'https://UIDeploy--StaticContent--51bfac9aaef3f--ghe.preview.dev.paypalinc.com',
                __SANDBOX__: 'https://www.paypalobjects.com',
                __PRODUCTION__: 'https://www.paypalobjects.com'
            }
        },
        __URI__: {
            __RAMP_WHITELIST__: '/upstream/assets/messaging/modal/ramp.json',
            __MESSAGE_A__: '/imadserver/upstream',
            __MESSAGE_B__: '/credit-presentment/messages',
            __MESSAGE_B_LEGACY__: '/credit-presentment/messages/legacy',
            __MESSAGE__: '/credit-presentment/smart/message',
            __MODAL__: '/credit-presentment/smart/modal',
            __LOGGER__: '/ppcredit/messagingLogger',
            __LOGGER_2__: '/credit-presentment/log'
        }
    }
});
