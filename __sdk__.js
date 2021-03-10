const globals = require('./globals');

module.exports = {
    messages: {
        entry: './src/interface/experiment',
        staticNamespace: '__messages__',
        globals: globals({ TARGET: 'sdk' })
    }
};
