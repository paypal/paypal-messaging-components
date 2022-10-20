const globals = require('./globals');

module.exports = {
    messages: {
        entry: './src/library/interface',
        staticNamespace: '__messages__',
        globals: globals({ TARGET: 'sdk' })
    }
};
