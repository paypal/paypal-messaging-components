const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const devServerProxy = require('./utils/devServerProxy');
const globals = require('./globals');

module.exports = () => {
    const config = getWebpackConfig({
        entry: {
            messaging: './src/index.js',
            merchant: './src/legacy/index.js'
        },
        filename: '[name].js',
        libraryTarget: 'window',
        modulename: ['paypal', 'Messages'],
        debug: true,
        minify: true,
        env: 'local',
        vars: globals({
            standalone: true,
            localMessage: true
        })
    });

    config.output.libraryExport = 'Messages';
    config.devServer = {
        contentBase: './tests/functional/content',
        publicPath: '/',
        compress: true,
        host: 'localhost.paypal.com',
        port: 8080,
        overlay: true,
        watchContentBase: true,
        before: devServerProxy
    };

    return config;
};
