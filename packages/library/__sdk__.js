const globals = require('./globals');

module.exports = {
    messages: {
        entry: './src/interface/messages',
        staticNamespace: '__messages__',
        globals: globals({ TARGET: 'sdk' })
    }
};
