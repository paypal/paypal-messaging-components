module.exports = {
    extends: 'grumbler-scripts/config/.babelrc-browser',
    plugins: [
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@components': './packages/components/src',
                    '@library': './packages/library/src',
                    '@renderer': './packages/renderer/src',
                    '@common': './utils/common',
                    '@tests/utils': './tests/unit/utils'
                }
            }
        ]
    ],
    env: {
        test: {
            presets: [['@babel/env', { targets: { node: 'current' } }]]
        }
    }
};
