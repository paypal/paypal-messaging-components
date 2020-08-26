module.exports = {
    reporters: ['jest-standard-reporter'],
    testMatch: ['<rootDir>/**/?(*.)test.js?(x)'],
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js'],
    testTimeout: 180000
};
