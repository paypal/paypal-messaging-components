const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const config = getWebpackConfig({
        entry: './src/messages/models/SmartModal/component.js',
        filename: 'modal-interface.js',
        vars: globals(env)
    });

    return config;
};
