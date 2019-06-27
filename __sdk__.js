const globals = require('./globals');

module.exports = {
    messages: {
        entry: './src/index',
        staticNamespace: '__messages__',
        globals: globals()
    }
};
