module.exports = {
    extends: ['airbnb', 'prettier'],
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    globals: {
        __MESSAGES__: true
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '/*.js',
                    '/**/webpack*.js',
                    '**/tests/**/*.js',
                    '/packages/library/src/old/**/*.js?(x)',
                    '/utils/devServerProxy/**/*.js'
                ]
            }
        ],
        'flowtype/require-valid-file-annotation': 'off',
        'flowtype/require-return-type': 'off',
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'react/prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-curly-spacing': 0
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@components', './packages/components/src'],
                    ['@library', './packages/library/src'],
                    ['@renderer', './packages/renderer/src'],
                    ['@common', './utils/common'],
                    ['@tests/utils', './tests/unit/utils']
                ],
                extensions: ['.js', '.jsx', '.json']
            }
        }
    }
};
