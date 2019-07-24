import Banner from 'src/messages/models/Banner';
import Modal from 'src/messages/models/Modal';
import getBannerMarkup from 'src/messages/services/banner';

jest.mock('src/messages/models/Modal', () => ({
    init: jest.fn()
}));

jest.mock('src/messages/services/banner', () =>
    jest.fn(({ options }) => {
        const config = {
            options: {
                ...options
            }
        };
        config.options.style._flattened = [];

        return Promise.resolve(config);
    })
);

const mockContainerFns = {
    insertMarkup: jest.fn(config =>
        Promise.resolve({
            ...config,
            meta: {
                offerType: 'NI',
                clickUrl: '',
                impressionUrl: ''
            }
        })
    ),
    setSize: jest.fn(),
    events: {},
    runStats: jest.fn(),
    clearEvents: jest.fn()
};

jest.mock('src/messages/models/Container', () => () => [global.document.createElement('div'), mockContainerFns]);

describe('Banner model', () => {
    const selector = '[data-pp-message]';

    const validOptions = {
        id: '1',
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        style: {
            layout: 'text'
        }
    };

    it('should call all of the render methods', async () => {
        const wrapper = document.createElement('div');
        document.body.appendChild(wrapper);

        await Banner.init(wrapper, selector, validOptions);

        // Ensure all steps of render pipeline are called
        expect(getBannerMarkup).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.insertMarkup).toHaveBeenCalledTimes(1);
        expect(Modal.init).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.setSize).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.runStats).toHaveBeenCalledTimes(1);
        expect(wrapper.children.length).toBe(1);

        await Banner.init(wrapper, selector, validOptions);

        // With no options changed, re-render should be skipped
        expect(getBannerMarkup).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.insertMarkup).toHaveBeenCalledTimes(1);
        expect(Modal.init).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.setSize).toHaveBeenCalledTimes(1);
        expect(mockContainerFns.runStats).toHaveBeenCalledTimes(1);
        expect(wrapper.children.length).toBe(1);

        await Banner.init(wrapper, selector, { ...validOptions, style: { layout: 'text', color: 'white' } });

        // With new options, ensure render pipeline is called again
        expect(getBannerMarkup).toHaveBeenCalledTimes(2);
        expect(mockContainerFns.insertMarkup).toHaveBeenCalledTimes(2);
        expect(Modal.init).toHaveBeenCalledTimes(2);
        expect(mockContainerFns.setSize).toHaveBeenCalledTimes(2);
        expect(mockContainerFns.runStats).toHaveBeenCalledTimes(2);
        expect(wrapper.children.length).toBe(1);
    });
});
