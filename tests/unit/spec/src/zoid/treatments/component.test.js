import '../../../../utils/mockZoidCreate';

import { getTreatmentsComponent } from '../../../../../../src/library/zoid/treatments';
import { destroyGlobalState, getNamespace, globalEvent, setGlobalState } from '../../../../../../src/utils';

jest.mock('@paypal/sdk-client/src', () => ({
    getClientID: () => 'test-client-id',
    getDefaultNamespace: () => 'paypal',
    getDisableSetCookie: () => false,
    getEnv: () => 'stage',
    getPayPalDomain: () => 'https://www.paypal.com',
    getSDKMeta: () => 'sdk-meta',
    getStorageID: () => 'test-device-id'
}));

jest.mock('../../../../../../src/utils/global', () => {
    const global = jest.requireActual('../../../../../../src/utils/global');
    return {
        ...global,
        globalEvent: {
            trigger: jest.fn()
        }
    };
});

describe('treatments component', () => {
    const treatmentsHash = '1daf92517fb7620b02add6943517ae0a5ca8f0a0';
    let target;

    beforeEach(() => {
        target = window.__MESSAGES__.__TARGET__;
        destroyGlobalState();
    });

    afterEach(() => {
        window.__MESSAGES__.__TARGET__ = target;
        destroyGlobalState();
    });

    test('sends client_id and deviceID query props for SDK treatments', () => {
        window.__MESSAGES__.__TARGET__ = 'SDK';

        const treatmentsComponent = getTreatmentsComponent();

        expect(treatmentsComponent.config.props.clientId).toMatchObject({
            type: 'string',
            queryParam: 'client_id',
            required: false
        });
        expect(treatmentsComponent.props.clientId).toBe('test-client-id');
        expect(treatmentsComponent.config.props.deviceID).toMatchObject({
            type: 'string',
            queryParam: true
        });
        expect(treatmentsComponent.props.deviceID).toBe('test-device-id');
    });

    test('sends payer_id from global config for standalone payer account treatments', () => {
        window.__MESSAGES__.__TARGET__ = 'STANDALONE';
        setGlobalState({ config: { account: 'DEV00000000NI' } });

        const treatmentsComponent = getTreatmentsComponent();

        expect(treatmentsComponent.config.props.payerId).toMatchObject({
            type: 'string',
            queryParam: 'payer_id',
            required: false
        });
        expect(treatmentsComponent.props.payerId).toBe('DEV00000000NI');
        expect(treatmentsComponent.props.clientId).toBeUndefined();
    });

    test('sends client_id from global config for standalone client-id account treatments', () => {
        window.__MESSAGES__.__TARGET__ = 'STANDALONE';
        setGlobalState({ config: { account: 'client-id:test-standalone-client-id' } });

        const treatmentsComponent = getTreatmentsComponent();

        expect(treatmentsComponent.props.clientId).toBe('test-standalone-client-id');
        expect(treatmentsComponent.props.payerId).toBeUndefined();
    });

    test('handles treatment data', () => {
        const {
            props: { onReady }
        } = getTreatmentsComponent();

        onReady({
            treatmentsHash
        });

        const localStorageKey = `__${getNamespace()}_storage__`;
        const updatedStorage = window.localStorage.getItem(localStorageKey);
        expect(JSON.parse(updatedStorage)).toMatchObject({
            experiments: {
                treatmentsHash,
                expiration: expect.any(Number)
            }
        });

        expect(globalEvent.trigger).toHaveBeenCalledWith('treatments');
    });
});
