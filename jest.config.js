module.exports = {
    testEnvironment: 'jest-environment-jsdom-fifteen',
    testMatch: ['<rootDir>/tests/unit/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1',
        '^server/(.*)': '<rootDir>/server/$1',
        '^utils/(.*)': '<rootDir>/utils/$1',
        '^utils': '<rootDir>/utils',
        'zalgo-promise/src': 'zalgo-promise',
        'zoid/src': 'zoid',
        'jsx-pragmatic/src': 'jsx-pragmatic',
        '@paypal/sdk-client/src': '@paypal/sdk-client',
        'belter/src': 'belter'
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.scss$': '<rootDir>/tests/unit/utils/sassLoader.js',
        '^.+\\.(html|css)$': '<rootDir>/tests/unit/utils/rawLoader.js'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/unit/utils/setup.js'],
    globals: {
        __ENV__: 'test',
        __MESSAGES__: {
            __VERSION__: '1.0.0',
            __DOMAIN__: {
                __TEST__: 'http://localhost.paypal.com:8080'
            },
            __URI__: {
                __MESSAGE__: '/imadserver/upstream',
                __MODAL__: '/credit-presentment/smart/modal',
                __LOGGER__: '/ppcredit/messagingLogger',
                __TERMS__: '/ppcredit/finance/terms'
            }
        }
    }
};
