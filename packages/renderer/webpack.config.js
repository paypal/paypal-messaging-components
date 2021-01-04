const path = require('path');
const { getWebpackConfig } = require('grumbler-scripts/config/webpack.config');

const CopyOutputWebpackPlugin = require('../../utils/CopyOutputWebpackPlugin');
const globals = require('../library/globals');
const { version } = require('./package.json');

module.exports = (env = {}) => {
    const RENDERER_CONFIG = getWebpackConfig({
        entry: path.resolve(__dirname, 'src/index.js'),
        path: path.resolve(__dirname, '../../dist/bizcomponents'),
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

    RENDERER_CONFIG.plugins.push(
        new CopyOutputWebpackPlugin({
            version: env.VERSION || version,
            environments: env.ENVIRONMENTS ? env.ENVIRONMENTS.split(',') : ['production', 'sandbox', 'stage']
        })
    );

    return [RENDERER_CONFIG];
};
