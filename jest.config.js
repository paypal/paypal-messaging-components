module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/tests/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1'
    },
    globals: {
        __MESSAGES__: {
            __VERSION__: '1.0.0'
        }
    }
};
