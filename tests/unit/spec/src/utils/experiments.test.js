import { ensureTreatments, getNamespace, globalEvent, getDisableSetCookie } from '../../../../../src/utils';

jest.mock('../../../../../src/utils/global', () => {
    const global = jest.requireActual('../../../../../src/utils/global');
    return {
        ...global,
        globalEvent: {
            trigger: jest.fn()
        }
    };
});

jest.mock('../../../../../src/utils/functional', () => {
    const functional = jest.requireActual('../../../../../src/utils/functional');
    return {
        ...functional,
        // the fetchTreatments method is memoized, which means it would only get called once in the entire test suite
        // unless we remove memoization
        memoize: fn => fn
    };
});

jest.mock('@paypal/sdk-client/src', () => ({
    getNamespace: () => 'paypal',
    getPayPalDomain: () => 'localhost.paypal.com',
    getSDKMeta: () => 'meta',
    getEnv: () => 'local',
    getDisableSetCookie: () => 'true'
}));

describe('experiments utils', () => {
    let oldTarget;
    const localStorageKey = `__${getNamespace()}_storage__`;
    beforeAll(() => {
        oldTarget = window.__MESSAGES__.__TARGET__;
        window.__MESSAGES__.__TARGET__ = 'SDK';
    });

    afterAll(() => {
        window.__MESSAGES__.__TARGET__ = oldTarget;
    });
    beforeEach(() => {
        while (document.body.firstChild) {
            document.body.firstChild?.remove();
        }

        globalEvent.trigger.mockReset();
        window.localStorage.setItem(localStorageKey, null);
    });

    const treatmentsHash = '1daf92517fb7620b02add6943517ae0a5ca8f0a0';

    test('Handles fresh treatments', () => {
        window.localStorage.setItem(
            localStorageKey,
            JSON.stringify({
                experiments: {
                    treatmentsHash,
                    expiration: new Date(9999, 0, 1).getTime()
                }
            })
        );

        ensureTreatments();

        expect(document.querySelector('iframe')).toBeNull();
        expect(globalEvent.trigger).toHaveBeenCalledWith('treatments');
    });

    test('Handles non-SDK integration', () => {
        window.__MESSAGES__.__TARGET__ = 'STANDALONE';

        ensureTreatments();

        expect(document.querySelector('iframe')).toBeNull();
        expect(globalEvent.trigger).toHaveBeenCalledWith('treatments');

        window.__MESSAGES__.__TARGET__ = 'SDK';
    });

    test('Handles expired treatments', () => {
        window.localStorage.setItem(
            localStorageKey,
            JSON.stringify({
                experiments: {
                    treatmentsHash,
                    expiration: new Date(1999, 0, 1).getTime()
                }
            })
        );

        ensureTreatments();

        expect(globalEvent.trigger).toHaveBeenCalledWith('treatments');

        // treatment refresh should be triggered in the background
        expect(document.querySelector('iframe')).not.toBeNull();
    });

    test('Handles empty treatments', () => {
        ensureTreatments();

        expect(document.querySelector('iframe')).not.toBeNull();

        // treatments should not be marked ready
        expect(globalEvent.trigger).not.toHaveBeenCalled();
    });

    test('Handles disableSetCookie to return truthy', () => {
        expect(getDisableSetCookie).toBeTruthy();

        ensureTreatments();

        expect(document.querySelector('iframe')).not.toBeNull();

        // treatments should not be marked ready
        expect(globalEvent.trigger).not.toHaveBeenCalled();
    });
});
