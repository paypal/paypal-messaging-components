const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('./globals');

module.exports = (env = {}) => {
    const config = getWebpackConfig({
        entry: env.legacy ? './src/legacy/index.js' : './src/index.js',
        filename: env.legacy ? 'merchant.js' : 'messaging.js',
        libraryTarget: env.demo ? 'umd' : 'window',
        modulename: env.legacy ? undefined : ['paypal', 'Messages'],
        web: true,
        minify: true,
        analyze: env.analyze,
        vars: globals(env)
    });

    config.output.libraryExport = 'Messages';

    return config;
};
