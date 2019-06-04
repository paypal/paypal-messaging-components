const globals = require('./globals');

module.exports = {
    'finance-messaging': {
        entry: './src/index',
        staticNamespace: '__finance_messaging__',
        globals: globals()
    }
};
