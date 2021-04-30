const path = require('path');

const devServerProxy = require('./utils/devServerProxy');

const PORT = process.env.PORT || 8080;
const PACKAGES = ['components', 'library', 'renderer'];

module.exports = (env = {}) => {
    const configs = PACKAGES.reduce(
        // eslint-disable-next-line import/no-dynamic-require, global-require
        (acc, packageName) => acc.concat(require(`./packages/${packageName}/webpack.config.dev`)(env)),
        []
    );

    // webpack-dev-server will read settings off the first config
    configs[0].devServer = {
        contentBase: path.resolve(__dirname, 'demo'),
        publicPath: '/',
        // set and export DEV_BROWSER in Terminal config to open that specific browser
        // otherwise opens default browser if not set
        open: process.env.DEV_BROWSER || true,
        openPage: (() => {
            switch (env.TARGET) {
                case 'standalone':
                    return 'standalone.html';
                case 'sdk':
                default:
                    return '';
            }
        })(),
        compress: true,
        host: 'localhost.paypal.com',
        port: PORT,
        overlay: true,
        watchContentBase: true,
        injectClient: compiler => !!compiler.devServer,
        before: devServerProxy,
        https: true,
        disableHostCheck: true // IE11
    };

    return configs;
};
