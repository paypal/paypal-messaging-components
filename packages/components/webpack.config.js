const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('../library/globals');

module.exports = (env = {}) => {
    const COMPONENTS_CONFIG = getWebpackConfig({
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyzeComponents,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'components'
        })
    });

    COMPONENTS_CONFIG.entry = ['US', 'US-EZP', 'DE', 'GB'].reduce(
        (accumulator, locale) => ({
            ...accumulator,
            [`smart-credit-modal-${locale}`]: path.resolve(__dirname, `src/modal/content/${locale}/index.js`)
        }),
        {
            'smart-credit-message': path.resolve(__dirname, 'src/message/index.js')
        }
    );

    COMPONENTS_CONFIG.optimization.splitChunks = {
        chunks: 'all',
        name: 'smart-credit-common'
    };

    return [COMPONENTS_CONFIG];
};
