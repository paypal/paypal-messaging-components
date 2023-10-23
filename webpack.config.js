const { getWebpackConfig } = require('@krakenjs/webpack-config-grumbler');

const globals = require('./globals');

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
        entry: {
            'smart-credit-message': './src/components/message/index.js',
            'smart-credit-modal-v2': './src/components/modal/v2/index.js',
            'smart-credit-modal-v1': `./src/components/modal/v1/content/US-EZP/index.js`
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
