const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const globals = require('../library/globals');

module.exports = (env = {}) => {
    const RENDERER_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/index.js'),
        path: path.resolve(__dirname, '../../dist'),
        filename: 'renderMessage.js',
        libraryTarget: 'commonjs',
        modulename: 'renderMessage',
        minify: true,
        debug: false,
        env: env.NODE_ENV,
        vars: globals({
            ...env,
            TARGET: 'render'
        })
    });

    return [RENDERER_CONFIG];
};
