const path = require('path');

module.exports = {
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'Functional Tests, No Snapshots (v2Renderer) - PayPal Messaging Components',
                outputPath: './tests/__reports__/functional-no-snapshots-v2renderer.html',
                includeSuiteFailure: true,
                includeFailureMsg: true
            }
        ]
    ],
    testMatch: ['<rootDir>/spec/non-snapshot-tests/**/*.test.js?(x)'],
    transform: {
        '^.+\\.jsx?$': ['babel-jest', { configFile: path.resolve(__dirname, '../../babel.config.js') }]
    },
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: path.resolve(__dirname, './utils/StablePuppeteerEnvironment.js'),
    setupFiles: ['./spec/utils/jest.setupV2RendererEnv.js'],
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js', '../customMatchers.js'],
    testTimeout: 180000
};
