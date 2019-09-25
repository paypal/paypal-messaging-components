module.exports = {
    testEnvironment: 'jest-environment-jsdom-fifteen',
    testMatch: ['<rootDir>/tests/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1',
        '^utils/(.*)': '<rootDir>/tests/utils/$1'
    },
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.(html|css)$': '<rootDir>/tests/utils/rawLoader.js'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/utils/setup.js'],
    globals: {
        __MESSAGES__: {
            __VERSION__: '1.0.0'
        }
    },
    globalSetup: '<rootDir>/tests/functional/utils/startWebpackDevServer.js',
    globalTeardown: '<rootDir>/tests/functional/utils/killWebpackDevServer.js'
};
