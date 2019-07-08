const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const mockImadserv = require('./utils/proxyImadserv');
const globals = require('./globals');

module.exports = (env = {}) => {
    const config = getWebpackConfig({
        entry: env.legacy ? './src/legacy/index.js' : './src/index.js',
        filename: env.legacy ? 'merchant.js' : 'messaging.js',
        libraryTarget: 'window',
        modulename: env.legacy ? undefined : ['paypal', 'Messages'],
        debug: true,
        minify: true,
        env: 'sandbox',
        vars: { ...globals(env), __SDK__: false }
    });

    config.output.libraryExport = 'Messages';
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
