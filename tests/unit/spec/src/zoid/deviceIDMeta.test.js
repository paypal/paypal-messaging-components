import getMessageComponent from 'src/library/zoid/message/component';
import getModalComponent from 'src/library/zoid/modal/component';
import { logger, getOrCreateDeviceID } from 'src/utils';
import { destroyGlobalState } from 'src/utils/global';

jest.mock('@krakenjs/zoid/src', () => ({
    create: config => config
}));

jest.mock('src/utils', () => {
    const actual = jest.requireActual('src/utils');
    return {
        ...actual,
        logger: {
            addMetaBuilder: jest.fn(),
            track: jest.fn(),
            info: jest.fn(),
            warn: jest.fn()
        },
        runStats: jest.fn(),
        updateStorage: jest.fn(),
        getCurrentTime: jest.fn(() => 5000),
        getTsCookieFromStorage: jest.fn(() => ({ vr: 'vr-cookie', vt: 'vt-cookie' })),
        getOrCreateDeviceID: jest.fn(() => 'storage-device-id'),
        getSessionID: jest.fn(() => 'session-id'),
        getScriptAttributes: jest.fn(() => ({})),
        getPerformanceMeasure: jest.fn(() => 25)
    };
});

const buildMessageReady = ({ deviceID } = {}) => {
    const messageConfig = getMessageComponent();
    const messageProps = {
        account: 'client-id:test-client-id',
        index: '1',
        pageType: 'home',
        deviceID,
        modal: { updateProps: jest.fn() },
        getContainer: () => document.createElement('div'),
        onReady: jest.fn()
    };

    const onReady = messageConfig.props.onReady.value({ props: messageProps });
    onReady({
        meta: {
            offerType: 'PAY_LATER',
            ppDebugId: 'debug-id',
            trackingDetails: {}
        },
        activeTags: [],
        ts: { vr: 'vr', vt: 'vt' },
        requestDuration: 42,
        messageRequestId: 'message-request-id',
        globalSessionID: 'global-session-id'
    });

    return logger.addMetaBuilder.mock.calls[0][0];
};

const buildModalReady = ({ deviceID } = {}) => {
    const modalConfig = getModalComponent();
    const modalProps = {
        account: 'client-id:test-client-id',
        index: '2',
        offer: 'PAY_LATER',
        refIndex: '1',
        buttonSessionId: 'button-session-id',
        messageRequestId: 'message-request-id',
        deviceID,
        onReady: jest.fn()
    };
    const modalState = {
        renderStart: 4000,
        show: jest.fn(),
        hide: jest.fn()
    };
    const event = {
        trigger: jest.fn()
    };

    const onReady = modalConfig.props.onReady.value({ props: modalProps, state: modalState, event });
    onReady({
        products: ['PAY_LATER'],
        meta: {
            ppDebugId: 'debug-id',
            trackingDetails: {}
        },
        ts: { vr: 'vr', vt: 'vt' }
    });

    return logger.addMetaBuilder.mock.calls[0][0];
};

describe('request-scoped deviceID logger metadata', () => {
    beforeEach(() => {
        logger.addMetaBuilder.mockClear();
        logger.track.mockClear();
        logger.info.mockClear();
        logger.warn.mockClear();
        getOrCreateDeviceID.mockClear();
        destroyGlobalState();
    });

    afterAll(() => {
        destroyGlobalState();
    });

    test('message metadata uses request-scoped deviceID when present', () => {
        const buildMeta = buildMessageReady({ deviceID: 'message-request-device-id' });
        const callsBeforeMetaBuild = getOrCreateDeviceID.mock.calls.length;
        const meta = buildMeta({ global: { existing: true } });

        expect(meta.global.deviceID).toBe('message-request-device-id');
        expect(getOrCreateDeviceID.mock.calls.length).toBe(callsBeforeMetaBuild);
    });

    test('message metadata falls back to storage deviceID when request-scoped deviceID is missing', () => {
        const buildMeta = buildMessageReady();
        const callsBeforeMetaBuild = getOrCreateDeviceID.mock.calls.length;
        const meta = buildMeta({ global: {} });

        expect(meta.global.deviceID).toBe('storage-device-id');
        expect(getOrCreateDeviceID.mock.calls.length).toBe(callsBeforeMetaBuild + 1);
    });

    test('modal metadata uses request-scoped deviceID when present', () => {
        const buildMeta = buildModalReady({ deviceID: 'modal-request-device-id' });
        const meta = buildMeta({ global: { existing: true } });

        expect(meta.global.deviceID).toBe('modal-request-device-id');
        expect(getOrCreateDeviceID).not.toHaveBeenCalled();
    });

    test('modal metadata falls back to storage deviceID when request-scoped deviceID is missing', () => {
        const buildMeta = buildModalReady();
        const meta = buildMeta({ global: {} });

        expect(meta.global.deviceID).toBe('storage-device-id');
        expect(getOrCreateDeviceID).toHaveBeenCalledTimes(1);
    });
});
