module.exports = {
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Functional Tests, No Snapshots - PayPal Messaging Components',
                outputPath: './tests/__reports__/functional-no-snapshots.html',
                // outputs detailed message for complete suite failures
                includeSuiteFailure: true,
                // outputs detailed message for test failure
                includeFailureMsg: true
            }
        ]
    ],
    testMatch: ['<rootDir>/spec/non-snapshot-tests/**/*.test.js?(x)'],
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js'],
    testTimeout: 180000
};
