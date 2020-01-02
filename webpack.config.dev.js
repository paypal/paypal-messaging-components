const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = 8080;

module.exports = (env = {}) => {
    const MESSAGES_DEV_CONFIG =
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

    MESSAGES_DEV_CONFIG.output.libraryExport = env.TARGET !== 'sdk' ? 'Messages' : '';
    MESSAGES_DEV_CONFIG.devServer = {
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
        port: 8080,
        open: true,
        overlay: true,
        watchContentBase: true,
        before: devServerProxy
    };

    const MODAL_DEV_CONFIG = getWebpackConfig({
        entry: './src/modal/index.js',
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        filename: 'smart-credit-modal.js'
    });

    return [MESSAGES_DEV_CONFIG, MODAL_DEV_CONFIG];
};
