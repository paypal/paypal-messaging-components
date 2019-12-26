const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const mockImadserv = require('./utils/proxyImadserv');
const globals = require('./globals');

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = 8080;

module.exports = (env = {}) => {
    const MESSAGES_DEV_CONFIG = env.standalone
        ? getWebpackConfig({
              entry: env.legacy ? './src/legacy/index.js' : './src/index.js',
              filename: env.legacy ? 'merchant.js' : 'messaging.js',
              libraryTarget: 'window',
              modulename: env.legacy ? undefined : ['paypal', 'Messages'],
              debug: true,
              minify: false,
              sourcemaps: true,
              env: 'local',
              vars: globals(env)
          })
        : getWebpackConfig({
              entry: './paypal.dev.js',
              filename: `${FILE_NAME}.js`,
              debug: true,
              minify: false,
              sourcemaps: true,
              env: 'local',
              vars: {
                  ...globals(env),
                  __PROTOCOL__: PROTOCOL,
                  __HOST__: `${HOSTNAME}:${PORT}`,
                  __SDK_HOST__: `${HOSTNAME}:${PORT}`,
                  __PORT__: PORT,
                  __PATH__: `/${FILE_NAME}.js`,
                  __NAMESPACE__: 'paypal',
                  __VERSION__: '1.0.55',
                  __COMPONENTS__: ['messages']
              }
          });

    MESSAGES_DEV_CONFIG.output.libraryExport = env.standalone ? 'Messages' : '';
    MESSAGES_DEV_CONFIG.devServer = {
        contentBase: './demo',
        publicPath: '/',
        openPage: env.standalone ? (env.legacy && 'legacy.html') || 'standalone.html' : '',
        compress: true,
        host: 'localhost.paypal.com',
        port: 8080,
        open: true,
        overlay: true,
        watchContentBase: true,
        before: mockImadserv
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
