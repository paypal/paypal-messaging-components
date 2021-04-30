const path = require('path');

module.exports = {
    extends: 'grumbler-scripts/config/.babelrc-browser',
    plugins: [
        [
            'module-resolver',
            {
                root: [path.resolve(__dirname)],
                alias: {
                    '@components': path.resolve(__dirname, 'packages/components/src'),
                    '@library': path.resolve(__dirname, 'packages/library/src'),
                    '@renderer': path.resolve(__dirname, 'packages/renderer/src'),
                    '@tests/utils': path.resolve(__dirname, 'tests/unit/utils')
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
