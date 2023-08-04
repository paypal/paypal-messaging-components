const { getWebpackConfig } = require('@krakenjs/webpack-config-grumbler');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');
const { localeOptions } = require('./locales');
require('dotenv').config();

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = process.env.PORT || 8080;

module.exports = (env = {}) => {
    const WEBPACK_DEV_SERVER_CONFIG = {
        contentBase: './demo',
        publicPath: '/',
        // set and export DEV_BROWSER in Terminal config to open that specific browser
        // otherwise opens default browser if not set
        open: process.env.DEV_BROWSER || false,
        openPage: (() => {
            switch (env.TARGET) {
                case 'standalone':
                    return 'standalone.html';
                case 'standalone-modal':
                    return 'standalone-modal.html';
                case 'sdk':
                default:
                    return '';
            }
        })(),
        compress: true,
        host: 'localhost.paypal.com',
        port: PORT,
        overlay: true,
        watchContentBase: true,
        injectClient: compiler => !!compiler.devServer,
        before: devServerProxy,
        https: true,
        disableHostCheck: true // IE11
    };

    const LIBRARY_DEV_CONFIG = (() => {
        switch (env.TARGET) {
            case 'ci': {
                return getWebpackConfig({
                    entry: {
                        modal: './src/library/modal.js',
                        messaging: './src/library/messaging.js'
                    },
                    filename: '[name].js',
                    libraryTarget: false,
                    debug: true,
                    minify: false,
                    sourcemaps: true,
                    env: env.NODE_ENV,
                    vars: globals(env)
                });
            }
            case 'standalone':
            case 'standalone-modal': {
                const name = env.TARGET === 'standalone-modal' ? 'modal' : 'messaging';

                return getWebpackConfig({
                    entry: {
                        [name]: `./src/library/${name}.js`
                    },
                    filename: '[name].js',
                    libraryTarget: false,
                    debug: true,
                    minify: false,
                    sourcemaps: true,
                    env: env.NODE_ENV,
                    vars: globals(env)
                });
            }
            case 'sdk':
            default:
                return getWebpackConfig({
                    entry: {
                        [FILE_NAME]: './paypal.dev.js'
                    },
                    filename: '[name].js',
                    debug: true,
                    minify: false,
                    sourcemaps: true,
                    env: env.NODE_ENV,
                    vars: {
                        ...globals(env),
                        __PROTOCOL__: PROTOCOL,
                        __HOST__: `${HOSTNAME}:${PORT}`,
                        __SDK_HOST__: `${HOSTNAME}:${PORT}`,
                        __STAGE_HOST__: `${process.env.STAGE_URL}.com`,
                        __PORT__: PORT,
                        __PATH__: `/${FILE_NAME}.js`,
                        __NAMESPACE__: 'paypal',
                        __VERSION__: '1.0.55',
                        __COMPONENTS__: ['messages'],
                        __PAYPAL_DOMAIN__: `${PROTOCOL}://${HOSTNAME}:${PORT}`,
                        __PAYPAL_API_DOMAIN__: `${PROTOCOL}://${HOSTNAME}:${PORT}`
                    }
                });
        }
    })();

    LIBRARY_DEV_CONFIG.devServer = WEBPACK_DEV_SERVER_CONFIG;

    const COMPONENTS_DEV_CONFIG = getWebpackConfig({
        entry: [...localeOptions, 'US-EZP', 'DE-GPL'].reduce(
            (accumulator, locale) => ({
                ...accumulator,
                [`smart-credit-modal-${locale}`]: `./src/components/modal/content/${locale}/index.js`
            }),
            {
                'smart-credit-message': './src/components/message/index.js',
                'smart-credit-modal-v2': './src/components/modal/v2/index.js'
            }
        ),
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        analyze: env.analyzeComponents,
        sourcemaps: true,
        filename: '[name].js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'component'
        })
    });

    const LANDER_COMPONENTS_DEV_CONFIG = getWebpackConfig({
        entry: {
            'smart-credit-modal-v2-lander': './src/components/modal/v2/index.js'
        },
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        analyze: env.analyzeComponents,
        sourcemaps: true,
        filename: '[name].js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'lander'
        })
    });

    const RENDERING_DEV_CONFIG = getWebpackConfig({
        entry: {
            renderMessage: './src/server/index.js'
        },
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        debug: true,
        minify: false,
        sourcemaps: false,
        filename: '[name].js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'render'
        })
    });

    return [LIBRARY_DEV_CONFIG, COMPONENTS_DEV_CONFIG, LANDER_COMPONENTS_DEV_CONFIG, RENDERING_DEV_CONFIG];
};
