const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');

const PORT = 8080;

module.exports = (env = {}) => {
    const MESSAGES_DEV_CONFIG = getWebpackConfig({
        entry: './src/legacy/index.js',
        filename: 'merchant.js',
        modulename: undefined,
        libraryTarget: 'window',
        debug: true,
        minify: false,
        sourcemaps: true,
        env: env.NODE_ENV,
        vars: globals(env)
    });

    MESSAGES_DEV_CONFIG.output.libraryExport = '';
    MESSAGES_DEV_CONFIG.devServer = {
        contentBase: './demo',
        publicPath: '/',
        openPage: (() => {
            switch (env.TARGET) {
                case 'legacy':
                default:
                    return 'legacy.html';
            }
        })(),
        compress: true,
        host: 'localhost.paypal.com',
        port: PORT,
        open: true,
        overlay: true,
        watchContentBase: true,
        before: devServerProxy,
        https: env.NODE_ENV !== 'local',
        disableHostCheck: true // IE11
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

    return [MESSAGES_DEV_CONFIG, MODAL_DEV_CONFIG];
};
