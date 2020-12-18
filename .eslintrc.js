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
                    '/**/*.dev.js',
                    '**/tests/**/*.js',
                    '/scripts/**/*.js',
                    '/packages/library/src/old/**/*.js?(x)',
                    '/utils/devServerProxy/**/*.js'
                ]
            }
        ],
        'flowtype/require-valid-file-annotation': 'off',
        'flowtype/require-return-type': 'off',
        'unicorn/prefer-spread': 'off',
        'react/jsx-indent': 0,
        'react/jsx-indent-props': 0,
        'react/prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-filename-extension': 0,
        'react/jsx-curly-spacing': 0
    },
    settings: {
        'import/resolver': {
            'babel-module': {}
        }
    }
};
