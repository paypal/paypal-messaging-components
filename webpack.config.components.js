const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const MODAL_ZOID_COMPONENT = getWebpackConfig({
        entry: './src/messages/models/SmartModal/component.js',
        filename: 'modal.js',
        minify: true,
        web: true,
        vars: globals(env)
    });

    return [MODAL_ZOID_COMPONENT];
};
