module.exports = {
    extends: '@krakenjs/babel-config-grumbler/babelrc-browser',
    env: {
        test: {
            presets: [['@babel/env', { targets: { node: 'current' } }]],
            plugins: [['@babel/plugin-transform-private-property-in-object', { loose: true }]]
        }
    }
};
