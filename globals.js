const postRobotGlobals = require('@krakenjs/post-robot/globals');
const zoidGlobals = require('@krakenjs/zoid/globals');

const { version } = require('./package.json');

const PORT = process.env.PORT || 8080;

module.exports = (env = { TARGET: 'sdk' }) => ({
    __DISABLE_SET_COOKIE__: false,
    __PAYPAL_DOMAIN__: 'https://www.paypal.com',
    __ZOID__: {
        ...zoidGlobals.__ZOID__,
        __DEFAULT_CONTAINER__: true,
        __DEFAULT_PRERENDER__: true,
        __FRAMEWORK_SUPPORT__: true,
        __SCRIPT_NAMESPACE__: true
    },
    __POST_ROBOT__: {
        ...postRobotGlobals.__POST_ROBOT__,
        __IE_POPUP_SUPPORT__: false,
        __SCRIPT_NAMESPACE__: true
    },

    __MESSAGES__: {
        __VERSION__: env.VERSION || version,
        __FEATURES__: 'no-common',
        __DEMO__: !!env.demo,
        __TARGET__: env.TARGET.toUpperCase().replace(/-/g, '_'),
        __STAGE_TAG__: env.STAGE_TAG,
        __TEST_ENV__: env.TEST_ENV,
        __DEV_TOUCHPOINT__: env.DEV_TOUCHPOINT,
        __DOMAIN__: {
            __LOCAL__: `https://localhost.paypal.com:${PORT}`,
            __STAGE__: 'https://www.msmaster.qa.paypal.com',
            __SANDBOX__: 'https://www.sandbox.paypal.com',
            __PRODUCTION__: 'https://www.paypal.com'
        },
        __URI__: {
            __MESSAGE__: '/credit-presentment/smart/message',
            __TREATMENTS__: '/credit-presentment/experiments/local',
            __MODAL__: '/credit-presentment/smart/modal',
            __LOGGER__: '/credit-presentment/log'
        }
    }
});
