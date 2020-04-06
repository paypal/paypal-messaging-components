module.exports = {
    testMatch: ['<rootDir>/**/?(*.)test.js?(x)', '<rootDir>/spec/payload.test.js'],
    globalSetup: 'jest-environment-puppeteer/setup',
    globalTeardown: 'jest-environment-puppeteer/teardown',
    testEnvironment: 'jest-environment-puppeteer',
    setupFilesAfterEnv: ['./spec/utils/jest.setupTests.js'],
    testTimeout: 180000
};
