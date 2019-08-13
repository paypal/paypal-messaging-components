const { version } = require('./package.json');

module.exports = (env = {}) => ({
    __MESSAGES__: {
        __VERSION__: version,
        __BANNER_URL__: env.mockImadserv ? '/imadserver/upstream' : 'https://www.paypal.com/imadserver/upstream',
        __MODAL_URL__: env.devModal ? './modals' : 'https://www.paypalobjects.com/upstream/assets/messaging/modal',
        __LOGGING_URL__: env.devPPCredit
            ? 'http://localhost.paypal.com:8000/ppcredit/messagingLogger'
            : 'https://www.paypal.com/ppcredit/messagingLogger',
        __TERMS_URL__: env.devPPCredit
            ? 'http://localhost.paypal.com:8000/ppcredit/finance/terms'
            : 'https://www.paypal.com/ppcredit/finance/terms',
        __DEMO__: !!env.demo,
        __TARGET__: (() => {
            if (env.legacy) {
                return 'LEGACY';
            }
            if (env.standalone) {
                return 'STANDALONE';
            }
            return 'SDK';
        })()
    }
});
