module.exports = {
    extends: '@krakenjs/babel-config-grumbler/babelrc-browser',
    env: {
        test: {
            presets: [['@babel/env', { targets: { node: 'current' } }]]
        }
    },
    plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
    ]
};
