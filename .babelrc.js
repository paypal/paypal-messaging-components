module.exports = {
    extends: 'grumbler-scripts/config/.babelrc-browser',
    env: {
        test: {
            presets: [['@babel/env', { targets: { node: 'current' } }]]
        }
    },
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    src: './src',
                    server: './server',
                    utils: './utils'
                }
            }
        ]
    ]
};
