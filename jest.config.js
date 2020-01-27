module.exports = {
    testEnvironment: 'jest-environment-jsdom-fifteen',
    testMatch: ['<rootDir>/tests/unit/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1',
        '^utils/(.*)': '<rootDir>/tests/unit/utils/$1',
        'zalgo-promise/src': 'zalgo-promise',
        '@paypal/sdk-client/src': '@paypal/sdk-client'
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
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
                __MODAL__: '/upstream/assets/messaging/modal',
                __LOGGER__: '/ppcredit/messagingLogger',
                __TERMS__: '/ppcredit/finance/terms'
            }
        }
    }
};
