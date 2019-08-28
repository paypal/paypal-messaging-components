module.exports = {
    testEnvironment: 'jest-environment-jsdom-fifteen',
    testMatch: ['<rootDir>/tests/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1',
        '^utils/(.*)': '<rootDir>/tests/utils/$1',
        'zalgo-promise/src': 'zalgo-promise'
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
    }
};
