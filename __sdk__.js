const globals = require('./globals');

module.exports = {
    messages: {
        entry: './src/interface',
        staticNamespace: '__messages__',
        globals: globals({ TARGET: 'sdk' })
    }
};
