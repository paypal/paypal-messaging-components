const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: env.TARGET === 'legacy' ? './src/legacy/index.js' : './src/index.js',
        filename: env.TARGET === 'legacy' ? 'merchant.js' : 'messaging.js',
        modulename: env.TARGET === 'legacy' ? undefined : ['paypal', 'Messages'],
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
        debug: false
    });

    return [MESSAGES_CONFIG, MODAL_CONFIG];
};
