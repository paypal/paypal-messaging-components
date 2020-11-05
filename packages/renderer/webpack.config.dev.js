const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('../library/globals');

module.exports = (env = {}) => {
    const RENDERER_DEV_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/index.js'),
        path: path.resolve(__dirname, '../../dist'),
        filename: 'renderMessage.js',
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        debug: true,
        minify: false,
        sourcemaps: false,
        env: env.NODE_ENV,
        vars: globals(env),
        alias: {
            '@common': path.resolve(__dirname, '../../utils/common')
        }
    });

    return [RENDERER_DEV_CONFIG];
};
