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
        '^server/(.*)': '<rootDir>/src/server/$1',
        '^utils/(.*)': '<rootDir>/tests/unit/utils/$1',
        '@krakenjs/zalgo-promise/src': '@krakenjs/zalgo-promise',
        '@krakenjs/zoid/src': '@krakenjs/zoid',
        '@krakenjs/jsx-pragmatic/src': '@krakenjs/jsx-pragmatic',
        '@paypal/sdk-client/src': '@paypal/sdk-client',
        '@paypal/sdk-constants/src': '@paypal/sdk-constants',
        '@paypal/sdk-logos/src': '@paypal/sdk-logos',
        '@krakenjs/belter/src': '@krakenjs/belter',
        '@krakenjs/beaver-logger/src': '@krakenjs/beaver-logger'
    },
    collectCoverageFrom: ['./src/**'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.scss$': '<rootDir>/tests/unit/utils/sassLoader.js',
        '^.+\\.(html|css)$': '<rootDir>/tests/unit/utils/rawLoader.js'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/unit/utils/setup.js', '<rootDir>/tests/customMatchers.js'],
    // grumbler-scripts includes babel-plugin-istanbul
    coveragePathIgnorePatterns: ['<rootDir>']
};
