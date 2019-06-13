module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/tests/**/?(*.)test.js?(x)'],
    moduleNameMapper: {
        '^src/(.*)': '<rootDir>/src/$1'
    }
};
