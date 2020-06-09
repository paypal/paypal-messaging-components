const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');

module.exports = (env = {}) => {
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: {
            messaging: './src/index.js',
            merchant: './src/legacy/index.js'
        },
        filename: '[name].js',
        libraryTarget: 'window',
        modulename: ['paypal', 'Messages'],
        debug: true,
        minify: true,
        env: 'local',
        vars: globals(env)
    });

    MESSAGES_CONFIG.output.libraryExport = 'Messages';
    MESSAGES_CONFIG.devServer = {
        contentBase: './tests/functional/content',
        publicPath: '/',
        compress: true,
        host: 'localhost.paypal.com',
        port: 8080,
        overlay: true,
        watchContentBase: true,
        before: devServerProxy
    };

    const MODAL_DEV_CONFIG = getWebpackConfig({
        entry: './src/modal/index.js',
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        filename: 'smart-credit-modal.js',
        vars: globals(env)
    });

    return [MESSAGES_CONFIG, MODAL_DEV_CONFIG];
};
