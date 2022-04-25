import {
    ensureTreatments,
    fetchTreatments,
    getGlobalUrl,
    getNamespace,
    getPayPalDomain,
    globalEvent
} from '../../../../../src/utils';

const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

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

describe('experiments utils', () => {
    const localStorageKey = `__${getNamespace()}_storage__`;
    beforeEach(() => {
        document.body.firstChild?.remove();
        globalEvent.trigger.mockReset();
        window.localStorage.setItem(localStorageKey, null);
    });

    const treatmentsHash = '1daf92517fb7620b02add6943517ae0a5ca8f0a0';
    const deviceID = 'device_id';

    describe('fetchTreatments', () => {
        test('Adds treatment fetching iframe', () => {
            fetchTreatments();

            const iframe = document.querySelector('iframe');
            expect(iframe.src).toContain(getGlobalUrl('TREATMENTS'));
            iframe.contentWindow.__paypal_namespace__ = getNamespace();

            expect(addEventListenerSpy).toHaveBeenCalledWith('message', expect.any(Function));

            const messageHandler = addEventListenerSpy.mock.calls[0][1];

            // handler should only react to the right event
            messageHandler({
                origin: 'https://www.notpaypal.com'
            });

            expect(removeEventListenerSpy).not.toHaveBeenCalled();

            messageHandler({
                origin: getPayPalDomain(),
                data: { someOtherProp: true }
            });

            expect(removeEventListenerSpy).not.toHaveBeenCalled();

            messageHandler({
                origin: getPayPalDomain(),
                data: { treatmentsHash, deviceID }
            });

            expect(removeEventListenerSpy).toHaveBeenCalledWith('message', messageHandler);

            expect(document.querySelector('iframe')).toBeNull();
            expect(globalEvent.trigger).toHaveBeenCalledWith('treatments');

            const updatedStorage = window.localStorage.getItem(localStorageKey);

            expect(JSON.parse(updatedStorage)).toMatchObject({
                experiments: {
                    treatmentsHash,
                    expiration: expect.any(Number)
                },
                id: deviceID
            });
        });
    });

    describe('ensureTreatments', () => {
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
    });
});
