const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const CopyOutputWebpackPlugin = require('../../utils/CopyOutputWebpackPlugin');
const globals = require('./globals');
const { version } = require('./package.json');

module.exports = (env = {}) => {
    // messaging.js
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/index.js'),
        path: path.resolve(__dirname, '../../dist/bizcomponents'),
        filename: 'messaging.js',
        // Need to explicitly disable this feature. The library has it's own
        // window bootstrap mechanism to attach multiple "exports" onto window.paypal
        libraryTarget: false,
        web: true,
        minify: true,
        debug: false,
        analyze: env.ANALYZE,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'standalone'
        })
    });
    MESSAGES_CONFIG.plugins.push(
        new CopyOutputWebpackPlugin({
            version: env.VERSION || version,
            environments: env.ENVIRONMENTS ? env.ENVIRONMENTS.split(',') : ['production', 'sandbox', 'stage']
        })
    );

    // TODO: Remove this after the ramp
    const MODAL_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/old/modal/index.js'),
        path: path.resolve(__dirname, '../../dist/bizcomponents'),
        filename: 'smart-credit-modal.js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'modal'
        })
    });
    MODAL_CONFIG.plugins.push(
        new CopyOutputWebpackPlugin({
            version: env.VERSION || version,
            environments: env.ENVIRONMENTS ? env.ENVIRONMENTS.split(',') : ['production', 'sandbox', 'stage']
        })
    );

    return [MESSAGES_CONFIG, MODAL_CONFIG];
};
