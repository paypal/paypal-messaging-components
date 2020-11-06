const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = process.env.PORT || 8080;

module.exports = (env = {}) => {
    const LIBRARY_DEV_CONFIG =
        env.TARGET !== 'sdk'
            ? getWebpackConfig({
                  entry: path.resolve(__dirname, 'src/index.js'),
                  path: path.resolve(__dirname, '../../dist'),
                  filename: 'messaging.js',
                  modulename: ['paypal', 'Messages'],
                  libraryTarget: 'window',
                  debug: true,
                  minify: false,
                  sourcemaps: true,
                  env: env.NODE_ENV,
                  vars: globals(env)
              })
            : getWebpackConfig({
                  entry: path.resolve(__dirname, 'paypal.dev.js'),
                  path: path.resolve(__dirname, '../../dist'),
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

    // TODO: Remove this after the ramp
    const MODAL_DEV_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/old/modal/index.js'),
        path: path.resolve(__dirname, '../../dist'),
        filename: 'smart-credit-modal.js',
        libraryTarget: 'window',
        modulename: 'crc',
        debug: true,
        minify: false,
        sourcemaps: true,
        env: env.NODE_ENV,
        vars: globals(env)
    });

    return [LIBRARY_DEV_CONFIG, MODAL_DEV_CONFIG];
};
