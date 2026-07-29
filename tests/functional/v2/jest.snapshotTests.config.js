const path = require('path');

module.exports = {
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'All V2 Snapshot Tests - PayPal Messaging Components',
                outputPath: './tests/__reports__/all-snapshots.html',
                // outputs detailed message for complete suite failures
                includeSuiteFailure: true,
                // outputs detailed message for test failure
                includeFailureMsg: true,
                // outputs obsolete snapshot names
                includeObsoleteSnapshots: true
            }
        ]
    ],
    testMatch: ['<rootDir>/spec/snapshot-tests/**/?(*.)test.js?(x)'],
    transform: {
        '^.+\\.jsx?$': ['babel-jest', { configFile: path.resolve(__dirname, '../../../babel.config.js') }]
    },
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: path.resolve(__dirname, '../utils/StablePuppeteerEnvironment.js'),
    setupFilesAfterEnv: ['./utils/jest.setupTests.js'],
    testTimeout: 180000
};
