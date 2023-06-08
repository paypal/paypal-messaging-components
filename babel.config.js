module.exports = {
    extends: '@krakenjs/babel-config-grumbler/babelrc-browser',
    env: {
        test: {
            presets: [['@babel/env', { targets: { node: 'current' } }]]
        }
    }
};
