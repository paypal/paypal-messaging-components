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
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js'],
    testTimeout: 180000
};
