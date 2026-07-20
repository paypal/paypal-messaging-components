const path = require('path');

module.exports = {
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'All Functional Tests - PayPal Messaging Components',
                outputPath: './tests/__reports__/all-functional.html',
                // outputs detailed message for complete suite failures
                includeSuiteFailure: true,
                // outputs detailed message for test failure
                includeFailureMsg: true,
                // outputs obsolete snapshot names
                includeObsoleteSnapshots: true
            }
        ]
    ],
    testMatch: ['<rootDir>/**/?(*.)test.js?(x)'],
    transform: {
        '^.+\\.jsx?$': ['babel-jest', { configFile: path.resolve(__dirname, '../../babel.config.js') }]
    },
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: path.resolve(__dirname, './utils/StablePuppeteerEnvironment.js'),
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js', '../customMatchers.js'],
    testTimeout: 180000
};
