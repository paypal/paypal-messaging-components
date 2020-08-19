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

    const COMPONENTS_DEV_CONFIG = getWebpackConfig({
        entry: './src/modal/index.js',
        filename: '[name].js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyzeComponents,
        vars: globals(env)
    });

    COMPONENTS_DEV_CONFIG.entry = ['US', 'DE', 'GB'].reduce(
        (accumulator, locale) => ({
            ...accumulator,
            [`smart-credit-modal-${locale}`]: `./src/components/modal/content/${locale}/index.js`
        }),
        {
            'smart-credit-message': './src/components/message/index.js'
        }
    );

    COMPONENTS_DEV_CONFIG.optimization.splitChunks = {
        chunks: 'all',
        name: 'smart-credit-common'
    };

    return [MESSAGES_CONFIG, COMPONENTS_DEV_CONFIG];
};
