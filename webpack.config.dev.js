const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');
const { localeOptions } = require('./locales');

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = process.env.PORT || 8080;

module.exports = (env = {}) => {
    const LIBRARY_DEV_CONFIG =
        env.TARGET !== 'sdk'
            ? getWebpackConfig({
                  entry: {
                      messaging: './src/index.js'
                  },
                  filename: '[name].js',
                  modulename: ['paypal', 'Messages'],
                  libraryTarget: 'window',
                  debug: true,
                  minify: false,
                  sourcemaps: true,
                  env: env.NODE_ENV,
                  vars: globals(env)
              })
            : getWebpackConfig({
                  entry: './paypal.dev.js',
                  filename: `${FILE_NAME}.js`,
                  debug: true,
                  minify: false,
                  sourcemaps: true,
                  env: env.NODE_ENV,
                  vars: {
                      ...globals(env),
                      __PROTOCOL__: PROTOCOL,
                      __HOST__: `${HOSTNAME}:${PORT}`,
                      __SDK_HOST__: `${HOSTNAME}:${PORT}`,
                      __STAGE_HOST__: 'msmaster.qa.paypal.com',
                      __PORT__: PORT,
                      __PATH__: `/${FILE_NAME}.js`,
                      __NAMESPACE__: 'paypal',
                      __VERSION__: '1.0.55',
                      __COMPONENTS__: ['messages']
                  }
              });

    LIBRARY_DEV_CONFIG.output.libraryExport = env.TARGET !== 'sdk' ? 'Messages' : '';
    LIBRARY_DEV_CONFIG.devServer = {
        contentBase: './demo',
        publicPath: '/',
        // set and export DEV_BROWSER in Terminal config to open that specific browser
        // otherwise opens default browser if not set
        open: process.env.DEV_BROWSER || true,
        openPage: (() => {
            switch (env.TARGET) {
                case 'standalone':
                    return 'standalone.html';
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

    const COMPONENTS_DEV_CONFIG = getWebpackConfig({
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        filename: '[name].js',
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'components'
        })
    });

    COMPONENTS_DEV_CONFIG.entry = [...localeOptions, 'US-EZP'].reduce(
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

    const RENDERING_DEV_CONFIG = getWebpackConfig({
        entry: ['./server/index.js'],
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        debug: true,
        minify: false,
        sourcemaps: false,
        filename: 'renderMessage.js',
        env: env.NODE_ENV,
        vars: globals(env)
    });

    // TODO: Remove this after the ramp
    const MODAL_DEV_CONFIG = getWebpackConfig({
        entry: './src/old/modal/index.js',
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        filename: 'smart-credit-modal.js',
        env: env.NODE_ENV,
        vars: globals(env)
    });

    return [LIBRARY_DEV_CONFIG, COMPONENTS_DEV_CONFIG, RENDERING_DEV_CONFIG, MODAL_DEV_CONFIG];
};
