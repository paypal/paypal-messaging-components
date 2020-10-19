module.exports = {
    testMatch: ['<rootDir>/spec/non-snapshot-tests/**/*.test.js?(x)'],
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js'],
    testTimeout: 180000
};
