const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const CopyOutputWebpackPlugin = require('../../utils/CopyOutputWebpackPlugin');
const { localeOptions } = require('../library/locales');
const globals = require('../library/globals');
const { version } = require('./package.json');

module.exports = (env = {}) => {
    const envDirectory = env.NODE_ENV === 'production' ? 'js' : env.NODE_ENV;
    const COMPONENTS_CONFIG = getWebpackConfig({
        path: path.resolve(__dirname, `../../dist/bizcomponents/${envDirectory}`),
        filename: '[name].js',
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        analyze: env.ANALYZE,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'components'
        })
    });

    COMPONENTS_CONFIG.entry = [...localeOptions, 'US-EZP'].reduce(
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

    COMPONENTS_CONFIG.plugins.push(
        new CopyOutputWebpackPlugin({
            env: env.NODE_ENV,
            version: env.VERSION || version
        })
    );

    return [COMPONENTS_CONFIG];
};
