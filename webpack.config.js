const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: './src/legacy/index.js',
        filename: 'merchant.js',
        modulename: undefined,
        libraryTarget: env.demo ? 'umd' : 'window',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyze,
        vars: globals(env)
    });
    MESSAGES_CONFIG.output.libraryExport = 'Messages';

    const MODAL_CONFIG = getWebpackConfig({
        entry: './src/modal/index.js',
        filename: 'smart-credit-modal.js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        vars: globals(env)
    });

    return [MESSAGES_CONFIG, MODAL_CONFIG];
};
