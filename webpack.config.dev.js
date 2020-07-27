const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = 8080;

module.exports = (env = {}) => {
    const LIBRARY_DEV_CONFIG =
        env.TARGET !== 'sdk'
            ? getWebpackConfig({
                  entry: env.TARGET === 'legacy' ? './src/legacy/index.js' : './src/index.js',
                  filename: env.TARGET === 'legacy' ? 'merchant.js' : 'messaging.js',
                  modulename: env.TARGET === 'legacy' ? undefined : ['paypal', 'Messages'],
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
        openPage: (() => {
            switch (env.TARGET) {
                case 'standalone':
                    return 'standalone.html';
                case 'legacy':
                    return 'legacy.html';
                case 'sdk':
                default:
                    return '';
            }
        })(),
        compress: true,
        host: 'localhost.paypal.com',
        port: PORT,
        open: true,
        overlay: true,
        watchContentBase: true,
        injectClient: compiler => !!compiler.devServer,
        before: devServerProxy,
        https: true,
        disableHostCheck: true // IE11
    };

    const COMPONENTS_DEV_CONFIG = getWebpackConfig({
        entry: ['./src/components/message/index.js', './src/components/modal/index.js'],
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        filename: '[name].js',
        vars: globals(env)
    });

    COMPONENTS_DEV_CONFIG.entry = {
        'smart-credit-message': './src/components/message/index.js',
        'smart-credit-modal': './src/components/modal/index.js'
    };

    COMPONENTS_DEV_CONFIG.optimization.splitChunks = {
        chunks: 'all',
        name: 'smart-credit-common'
    };

    const RENDERING_DEV_CONFIG = getWebpackConfig({
        entry: ['./server/index.js'],
        libraryTarget: 'global',
        modulename: 'renderMessage',
        debug: true,
        minify: false,
        sourcemaps: false,
        filename: 'render.js'
    });

    return [LIBRARY_DEV_CONFIG, COMPONENTS_DEV_CONFIG, RENDERING_DEV_CONFIG];
};
