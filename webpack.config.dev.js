const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const mockImadserv = require('./utils/proxyImadserv');
const globals = require('./globals');

const FILE_NAME = 'sdk';
const PROTOCOL = 'https';
const HOSTNAME = 'localhost.paypal.com';
const PORT = 8080;

module.exports = (env = {}) => {
    let config;
    if (env.standalone || env.analyze) {
        config = getWebpackConfig({
            entry: './src/index.js',
            filename: `messaging.js`,
            libraryTarget: 'window',
            modulename: ['paypal', 'Messages'],
            debug: true,
            minify: true,
            env: 'sandbox',
            vars: { ...globals(env), __SDK__: false }
        });
        config.output.libraryExport = 'Messages';
    } else {
        config = getWebpackConfig({
            entry: './paypal.dev.js',
            filename: `${FILE_NAME}.js`,
            debug: true,
            minify: false,
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
    }

    config.devServer = {
        contentBase: './demo',
        publicPath: '/',
        compress: true,
        host: 'localhost.paypal.com',
        port: 8080,
        open: true,
        overlay: true,
        watchContentBase: true,
        before: mockImadserv,
        https: !env.devModal && !env.devTerms
    };

    return config;
};
