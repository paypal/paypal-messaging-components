const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const mockImadserv = require('./utils/proxyImadserv');
const globals = require('./globals');

module.exports = (env = {}) => {
    const config = getWebpackConfig({
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
    config.devServer = {
        contentBase: './demo',
        publicPath: '/',
        compress: true,
        host: 'localhost.paypal.com',
        port: 8080,
        open: true,
        overlay: true,
        watchContentBase: true,
        before: mockImadserv
    };

    return config;
};
