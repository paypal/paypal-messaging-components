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
        env,
        __DOMAIN__: {
            __LOCAL__: `${env.NODE_ENV === 'local' ? 'http' : 'https'}://localhost.paypal.com:8080`,
            __STAGE__: 'https://www.msmaster.qa.paypal.com',
            __SANDBOX__: 'https://www.sandbox.paypal.com',
            __PRODUCTION__: 'https://www.paypal.com'

            // Manual endpoint override example:
            // __MODAL__: {
            //     __STAGE__: 'https://localhost.paypal.com:8443'
            // }
        },
        __URI__: {
            __MESSAGE__: '/imadserver/upstream',
            __MODAL__: '/credit-presentment/smart/modal',
            __LOGGER__: '/ppcredit/messagingLogger'
        }
    }
});
