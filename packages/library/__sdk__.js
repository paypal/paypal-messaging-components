const globals = require('./globals');

module.exports = {
    messages: {
        entry: './packages/library/src/interface/messages',
        staticNamespace: '__messages__',
        globals: globals({ TARGET: 'sdk' })
    }
};
