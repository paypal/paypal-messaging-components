const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    // messaging.js
    const MESSAGES_CONFIG = getWebpackConfig({
        entry: './src/index.js',
        filename: 'messaging.js',
        modulename: ['paypal', 'Messages'],
        libraryTarget: env.demo ? 'umd' : 'window',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyze,
        vars: globals({
            ...env,
            TARGET: 'standalone'
        })
    });
    MESSAGES_CONFIG.output.libraryExport = 'Messages';

    // merchant.js
    const MERCHANT_CONFIG = getWebpackConfig({
        entry: './src/old/legacy/index.js',
        filename: 'merchant.js',
        libraryTarget: 'window',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyze,
        vars: globals({
            ...env,
            TARGET: 'legacy'
        })
    });
    MERCHANT_CONFIG.output.libraryExport = 'Messages';

    // zoid components
    const COMPONENTS_CONFIG = getWebpackConfig({
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyzeComponents,
        filename: '[name].js',
        vars: globals({
            ...env,
            TARGET: 'components'
        })
    });

    COMPONENTS_CONFIG.entry = ['US', 'DE', 'GB'].reduce(
        (accumulator, locale) => ({
            ...accumulator,
            [`smart-credit-modal-${locale}`]: `./src/components/modal/content/${locale}/index.js`
        }),
        {
            'smart-credit-message': './src/components/message/index.js'
        }
    );

    COMPONENTS_CONFIG.optimization.splitChunks = {
        chunks: 'all',
        name: 'smart-credit-common'
    };

    // TODO: Remove this after the ramp
    const MODAL_CONFIG = getWebpackConfig({
        entry: './src/old/modal/index.js',
        filename: 'smart-credit-modal-old.js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        vars: globals({
            ...env,
            TARGET: 'modal'
        })
    });

    const RENDERING_CONFIG = getWebpackConfig({
        entry: ['./server/index.js'],
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        minify: true,
        debug: false,
        filename: 'renderMessage.js',
        vars: globals({
            ...env,
            TARGET: 'render'
        })
    });

    return [MESSAGES_CONFIG, MERCHANT_CONFIG, COMPONENTS_CONFIG, RENDERING_CONFIG, MODAL_CONFIG];
};
