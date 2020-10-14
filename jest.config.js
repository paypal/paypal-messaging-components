module.exports = {
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Unit Tests - PayPal Messaging Components',
                outputPath: './tests/__reports__/unit.html',
                // outputs detailed message for complete suite failures
                includeSuiteFailure: true,
                // outputs detailed message for test failure
                includeFailureMsg: true
            }
        ]
    ],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    testMatch: ['<rootDir>/tests/unit/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1',
        '^server/(.*)': '<rootDir>/server/$1',
        '^utils/(.*)': '<rootDir>/tests/unit/utils/$1',
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
    // grumbler-scripts includes babel-plugin-istanbul
    coveragePathIgnorePatterns: ['<rootDir>'],
    globals: {
        __ENV__: 'test',
        __MESSAGES__: {
            __VERSION__: '1.0.0',
            __DOMAIN__: {
                __TEST__: 'http://localhost.paypal.com:8080'
            },
            __URI__: {
                __RAMP_EXCLUSION_LIST__: '/upstream/assets/messaging/modal/ramp-exclusion.json',
                __MESSAGE_A__: '/imadserver/upstream',
                __MESSAGE_B__: '/credit-presentment/messages',
                __MESSAGE_B_LEGACY__: '/credit-presentment/messages/legacy',
                __MESSAGE__: '/credit-presentment/smart/message',
                __MODAL__: '/credit-presentment/smart/modal',
                __LOGGER__: '/credit-presentment/log'
            }
        }
    }
};
