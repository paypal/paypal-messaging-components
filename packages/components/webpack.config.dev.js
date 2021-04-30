const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const { localeOptions } = require('../library/locales');
const globals = require('../library/globals');

module.exports = (env = {}) => {
    const COMPONENTS_DEV_CONFIG = getWebpackConfig({
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js',
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'components'
        })
    });

    COMPONENTS_DEV_CONFIG.entry = [...localeOptions, 'US-EZP'].reduce(
        (accumulator, locale) => ({
            ...accumulator,
            [`smart-credit-modal-${locale}`]: path.resolve(__dirname, `src/modal/content/${locale}/index.js`)
        }),
        {
            'smart-credit-message': path.resolve(__dirname, 'src/message/index.js')
        }
    );

    COMPONENTS_DEV_CONFIG.optimization.splitChunks = {
        chunks: 'all',
        name: 'smart-credit-common'
    };

    return [COMPONENTS_DEV_CONFIG];
};
