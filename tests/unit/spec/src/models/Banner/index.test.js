import Banner from 'src/models/Banner';
import Modal from 'src/models/Modal';
import getBannerMarkup from 'src/services/banner';
import { logger, EVENTS } from 'src/services/logger';

jest.mock('src/services/logger', () => {
    const originalLogger = require.requireActual('src/services/logger');

    return {
        ...originalLogger,
        logger: {
            track: () => ({}),
            info: jest.fn(),
            waitFor: jest.fn()
        }
    };
});

jest.mock('src/models/Modal', () => ({
    init: jest.fn()
}));

jest.mock('src/services/banner', () => jest.fn().mockResolvedValue());

const mockContainerFns = {
    insertMarkup: jest.fn().mockResolvedValue({
        meta: {
            offerType: 'NI',
            clickUrl: '',
            impressionUrl: ''
        }
    }),
    setSize: jest.fn(),
    events: {},
    runStats: jest.fn(),
    clearEvents: jest.fn()
};

jest.mock('src/utils/container', () => () => [global.document.createElement('div'), mockContainerFns]);

describe('Banner model', () => {
    const mockWrapper = {
        appendChild: jest.fn()
    };

    const validOptions = {
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        style: {
            layout: 'text'
        }
    };

    it('should call all of the render methods', async () => {
        const update = await new Promise(resolve => {
            const up = Banner.init(mockWrapper, {
                ...validOptions,
                onRender: () => {
                    resolve(up);
                }
            });
        });

        // Ensure all steps of render pipeline are called
        expect(getBannerMarkup).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.insertMarkup).toHaveBeenCalledTimes(1);
        expect(Modal.init).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.setSize).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.runStats).toHaveBeenCalledTimes(1);
        expect(mockWrapper.appendChild).toHaveBeenCalledTimes(1);

        const loggerCalls = logger.info.mock.calls;
        expect(loggerCalls[0][0]).toBe(EVENTS.MESSAGE_CREATE_INITIATED);
        expect(loggerCalls[1][0]).toBe(EVENTS.IFRAME_CREATED);
        expect(loggerCalls[2][0]).toBe(EVENTS.MESSAGE_RENDERED);

        update(validOptions);

        // With no options changed, re-render should be skipped
        expect(getBannerMarkup).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.insertMarkup).toHaveBeenCalledTimes(1);
        expect(Modal.init).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.setSize).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.runStats).toHaveBeenCalledTimes(1);
        expect(mockWrapper.appendChild).toHaveBeenCalledTimes(1);

        const update2 = await new Promise(resolve => {
            const up = Banner.init(mockWrapper, {
                ...validOptions,
                onRender: () => {
                    resolve(up);
                }
            });
        });

        // With new options, ensure render pipeline is called again
        expect(getBannerMarkup).toHaveBeenCalledTimes(2);
        expect(mockContainerFns.insertMarkup).toHaveBeenCalledTimes(2);
        expect(Modal.init).toHaveBeenCalledTimes(2);
        expect(mockContainerFns.setSize).toHaveBeenCalledTimes(2);
        expect(mockContainerFns.runStats).toHaveBeenCalledTimes(2);

        // Append child should not be called again
        expect(mockWrapper.appendChild).toHaveBeenCalledTimes(1);

        // Returned function from update call should be the original
        expect(update2).toBe(update);

        expect(loggerCalls[3][0]).toBe(EVENTS.MESSAGE_UPDATE_INITIATED);
        expect(loggerCalls[4][0]).toBe(EVENTS.MESSAGE_RENDERED);
    });
});
