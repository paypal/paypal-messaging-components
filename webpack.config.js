const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const config = getWebpackConfig({
        entry: './src/index.js',
        filename: env.legacy ? 'merchant.js' : 'messaging.js',
        libraryTarget: env.demo ? 'umd' : 'window',
        modulename: ['paypal', 'Messages'],
        web: true,
        minify: true,
        analyze: env.analyze,
        vars: { ...globals(env), __SDK__: false }
    });

    config.output.libraryExport = 'Messages';

    return config;
};
