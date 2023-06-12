module.exports = {
    extends: '@krakenjs/babel-config-grumbler/babelrc-browser',
    env: {
        test: {
            presets: [['@babel/env', { targets: { node: 'current' } }]],
            // Required to remove warnings caused by the kraken config above
            plugins: [['@babel/plugin-transform-private-property-in-object', { loose: true }]]
        }
    }
};
