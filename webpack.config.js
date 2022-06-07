const { getWebpackConfig } = require('@krakenjs/grumbler-scripts/config/webpack.config');

const globals = require('./globals');
const { localeOptions } = require('./locales');

module.exports = (env = {}) => {
    // messaging.js
    const MESSAGING_JS_CONFIG = getWebpackConfig({
        entry: {
            messaging: './src/library/messaging.js'
        },
        filename: '[name].js',
        // Need to explicitly disable this feature. The library has it's own
        // window bootstrap mechanism to attach multiple "exports" onto window.paypal
        libraryTarget: false,
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

    const MODAL_JS_CONFIG = getWebpackConfig({
        entry: {
            modal: './src/library/modal.js'
        },
        filename: '[name].js',
        // Need to explicitly disable this feature. The library has it's own
        // window bootstrap mechanism to attach multiple "exports" onto window.paypal
        libraryTarget: false,
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyze,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'standalone-modal'
        })
    });

    // zoid components
    const COMPONENTS_CONFIG = getWebpackConfig({
        entry: [...localeOptions, 'US-EZP', 'DE-GPL'].reduce(
            (accumulator, locale) => ({
                ...accumulator,
                [`smart-credit-modal-${locale}`]: `././src/components/modal/content/${locale}/index.js`
            }),
            {
                'smart-credit-message': './src/components/message/index.js',
                'smart-credit-modal-v2': './src/components/modal/v2/index.js'
            }
        ),
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
            TARGET: 'component'
        })
    });

    const LANDER_COMPONENTS_CONFIG = getWebpackConfig({
        entry: {
            'smart-credit-modal-v2-lander': './src/components/modal/v2/index.js'
        },
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
            TARGET: 'lander'
        })
    });

    const MESSAGING_COMPONENTS_CONFIG = getWebpackConfig({
        libraryTarget: 'window',
        modulename: 'crc',
        web: true,
        minify: true,
        debug: false,
        analyze: env.analyzeMessageComponents,
        entry: './src/components/message/index.js',
        filename: 'smart-credit-message.js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'messagingComponent'
        })
    });

    if (process.env.BENCHMARK === 'true') {
        COMPONENTS_CONFIG.plugins.forEach((plugin, index) => {
            if (plugin.constructor.name === 'BundleAnalyzerPlugin') {
                COMPONENTS_CONFIG.plugins[index].opts.analyzerMode = 'json';
                COMPONENTS_CONFIG.plugins[index].opts.reportFilename = 'componentsReport.json';
            }
        });

        MESSAGING_JS_CONFIG.plugins.forEach((plugin, index) => {
            if (plugin.constructor.name === 'BundleAnalyzerPlugin') {
                MESSAGING_JS_CONFIG.plugins[index].opts.analyzerMode = 'json';
                MESSAGING_JS_CONFIG.plugins[index].opts.reportFilename = 'messagesReport.json';
            }
        });

        MESSAGING_COMPONENTS_CONFIG.plugins.forEach((plugin, index) => {
            if (plugin.constructor.name === 'BundleAnalyzerPlugin') {
                MESSAGING_COMPONENTS_CONFIG.plugins[index].opts.analyzerMode = 'json';
                MESSAGING_COMPONENTS_CONFIG.plugins[index].opts.reportFilename = 'messagingCompReport.json';
            }
        });
    }

    const RENDERING_CONFIG = getWebpackConfig({
        entry: {
            renderMessage: './src/server/index.js'
        },
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        minify: true,
        debug: false,
        filename: '[name].js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'render'
        })
    });

    const modules = {
        library: [MESSAGING_JS_CONFIG, MODAL_JS_CONFIG],
        components: [COMPONENTS_CONFIG, LANDER_COMPONENTS_CONFIG],
        render: [RENDERING_CONFIG]
    };

    return Array.prototype.concat.apply(
        [],
        (env.MODULE || 'library,components,render').split(',').map(module => modules[module])
    );
};
