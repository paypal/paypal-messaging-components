const globals = require('./globals');

module.exports = {
    messages: {
        entry: './src/interface',
        globals: globals({ TARGET: 'sdk' })
    }
};
