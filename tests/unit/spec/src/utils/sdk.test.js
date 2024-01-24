import { getPayPalDomain, getPayPalAPIDomain, getDevTouchpoint } from '../../../../../src/utils/sdk';

describe('getPayPalDomain', () => {
    beforeEach(() => {
        // reset test variables
        window.__TEST_ENV__ = undefined;
        __ENV__ = 'stage';
        __MESSAGES__ = {
            __TEST_ENV__: undefined,
            __DOMAIN__: { __SANDBOX__: 'https://www.sandbox.com' }
        };
    });
    test('returns message test environment if window test environment is not set', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.test-env.com';
        expect(getPayPalDomain()).toBe('https://www.test-env.com');
    });
    test('returns window test environment if it is set', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.test-env.com';
        window.__TEST_ENV__ = 'https://www.window-test-env.com';
        expect(getPayPalDomain()).toBe('https://www.window-test-env.com');
    });
    test('returns sandbox domain if no test environment is set and env is sandbox', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.test-env.com';
        window.__TEST_ENV__ = 'https://www.window-test-env.com';
        __ENV__ = 'sandbox';
        expect(getPayPalDomain()).toBe('https://www.sandbox.com');
    });
    test('returns error if no test environment is set', () => {
        expect(() => getPayPalDomain()).toThrow(Error);
    });
    test('returns stage domain if set via window test env global and env is stage', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.stage.com';
        window.__TEST_ENV__ = 'https://www.stage.com';
        __ENV__ = 'stage';
        expect(getPayPalDomain()).toBe('https://www.stage.com');
    });
});

describe('getPayPalAPIDomain', () => {
    beforeEach(() => {
        // reset test variables
        window.__TEST_ENV__ = undefined;
        __ENV__ = 'stage';
        __MESSAGES__ = {
            __TEST_ENV__: undefined,
            __API_DOMAIN__: { __SANDBOX__: 'https://api.sandbox.com' }
        };
    });
    test('returns message test environment if window test environment is not set', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.test-env.com';
        expect(getPayPalAPIDomain()).toBe('https://www.test-env.com');
    });
    test('returns window test environment if it is set', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.test-env.com';
        window.__TEST_ENV__ = 'https://www.window-test-env.com';
        expect(getPayPalAPIDomain()).toBe('https://www.window-test-env.com');
    });
    test('returns sandbox domain if no test environment is set and env is sandbox', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.test-env.com';
        window.__TEST_ENV__ = 'https://www.window-test-env.com';
        __ENV__ = 'sandbox';
        expect(getPayPalAPIDomain()).toBe('https://api.sandbox.com');
    });
    test('returns error if no test environment is set', () => {
        expect(() => getPayPalAPIDomain()).toThrow(Error);
    });
    test('returns stage domain if set via window test env global and env is stage', () => {
        __MESSAGES__.__TEST_ENV__ = 'https://www.stage.com';
        window.__TEST_ENV__ = 'https://www.stage.com';
        __ENV__ = 'stage';
        expect(getPayPalAPIDomain()).toBe('https://www.stage.com');
    });
});

describe('getDevTouchpoint', () => {
    beforeEach(() => {
        // reset test variables
        window.__DEV_TOUCHPOINT__ = undefined;
        __ENV__ = 'stage';
        __MESSAGES__ = {
            __DEV_TOUCHPOINT__: undefined
        };
    });
    test('returns true if window devTouchpoint is set', () => {
        window.__DEV_TOUCHPOINT__ = true;
        expect(getDevTouchpoint()).toBe(true);
    });
    test('returns undefined if window devTouchpoint is set to false', () => {
        window.__DEV_TOUCHPOINT__ = false;
        expect(getDevTouchpoint()).toBe(undefined);
    });
    test('returns true if window devTouchpoint is not set and message devTouchpoint is true', () => {
        __MESSAGES__.__DEV_TOUCHPOINT__ = true;
        expect(getDevTouchpoint()).toBe(true);
    });
    test('returns true if window devTouchpoint is set and message devTouchpoint is false ', () => {
        window.__DEV_TOUCHPOINT__ = true;
        __MESSAGES__.__DEV_TOUCHPOINT__ = false;
        expect(getDevTouchpoint()).toBe(true);
    });
    test('returns undefined if window devTouchpoint is set to false and message devTouchpoint is true ', () => {
        window.__DEV_TOUCHPOINT__ = false;
        __MESSAGES__.__DEV_TOUCHPOINT__ = true;
        expect(getDevTouchpoint()).toBe(undefined);
    });
    test('returns undefined if env is not stage', () => {
        window.__DEV_TOUCHPOINT__ = true;
        __ENV__ = 'sandbox';
        expect(getDevTouchpoint()).toBe(undefined);
    });
});
