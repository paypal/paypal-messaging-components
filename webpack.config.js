const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: env.legacy ? './src/legacy/index.js' : './src/index.js',
        filename: env.legacy ? 'merchant.js' : 'messaging.js',
        libraryTarget: env.demo ? 'umd' : 'window',
        modulename: env.legacy ? undefined : ['paypal', 'Messages'],
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyze,
        vars: globals(env)
    });
    MESSAGES_CONFIG.output.libraryExport = 'Messages';

    const MODAL_CONFIG = getWebpackConfig({
        entry: './src/modal/index.js',
        filename: 'smart-credit-modal',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false
    });

    return [MESSAGES_CONFIG, MODAL_CONFIG];
};
