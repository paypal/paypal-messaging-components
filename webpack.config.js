const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');
const { localeOptions } = require('./locales');

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
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'standalone'
        })
    });
    MESSAGES_CONFIG.output.libraryExport = 'Messages';

    // zoid components
    const COMPONENTS_CONFIG = getWebpackConfig({
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyzeComponents,
        filename: '[name].js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'components'
        })
    });

    COMPONENTS_CONFIG.entry = [...localeOptions, 'US-EZP'].reduce(
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

    const RENDERING_CONFIG = getWebpackConfig({
        entry: ['./server/index.js'],
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        minify: true,
        debug: false,
        filename: 'renderMessage.js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'render'
        })
    });

    const modules = {
        library: [MESSAGES_CONFIG],
        components: [COMPONENTS_CONFIG, MODAL_CONFIG],
        render: [RENDERING_CONFIG]
    };

    return Array.prototype.concat.apply(
        [],
        (env.MODULE || 'library,components,render').split(',').map(module => modules[module])
    );
};
