module.exports = {
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'V2 Renderer Banner Snapshot Tests - PayPal Messaging Components',
                outputPath: './tests/__reports__/banner-snapshots-v2renderer.html',
                includeSuiteFailure: true,
                includeFailureMsg: true,
                includeObsoleteSnapshots: true
            }
        ]
    ],
    testMatch: ['<rootDir>/spec/**/banner/**/?(*.)test.js?(x)'],
    // Re-enable these suites once renderV2Message supports flex and full text styling.
    testPathIgnorePatterns: [
        '.*/banner/flex.*\\.test\\.js$',
        '.*/US/banner/textLogoTypesAlternativeInlineNone\\.test\\.js$',
        '.*/US/banner/textColorsPrimaryAlternative\\.test\\.js$',
        '.*/US/banner/textFontSizes\\.test\\.js$'
    ],
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFiles: ['./spec/utils/jest.setupV2RendererEnv.js'],
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js', '../customMatchers.js'],
    testTimeout: 180000
};
