import setSize from 'src/utils/container/setSize';
import { logger } from 'src/services/logger';

jest.mock('src/services/logger', () => ({
    logger: {
        error: jest.fn(),
        warn: jest.fn()
    },
    ERRORS: {}
}));

const mockEventsOn = jest.fn();
jest.mock('src/utils/container/events', () => () => ({
    on: mockEventsOn
}));

jest.mock('src/controllers/render', () => jest.fn());

const originalCreateElement = document.createElement;
const mockElement = tagName => {
    const element = originalCreateElement.call(document, tagName);

    Object.defineProperty(element, 'offsetWidth', {
        value: 30
    });

    return element;
};

const mockContainer = {
    tagName: 'IFRAME',
    contentDocument: {
        querySelector: () => ({
            className: '.message__content',
            children: [{ className: '.message__logo-container' }, { className: '.message__headline' }]
        })
    },
    contentWindow: {
        document: {
            documentElement: {
                scrollHeight: 10
            }
        }
    },
    setAttribute: jest.fn()
};

const originalGetComputedStyle = window.getComputedStyle;

const mockGlobalRender = jest.fn();
window.paypal = {
    Messages: () => ({
        render: mockGlobalRender
    })
};

describe('setSize', () => {
    beforeEach(() => {
        mockEventsOn.mockClear();
        mockContainer.setAttribute.mockClear();

        Object.defineProperty(document, 'createElement', {
            value: mockElement
        });

        Object.defineProperty(window, 'getComputedStyle', {
            value: originalGetComputedStyle
        });
    });

    it('should add flex styles for flex banners', () => {
        const container = document.createElement('iframe');
        const mockRender = {
            wrapper: document.createElement('span'),
            options: {
                style: {
                    layout: 'flex',
                    ratio: '20x1'
                }
            }
        };

        setSize(container, mockRender);

        expect(mockRender.wrapper.getElementsByTagName('style')).toHaveLength(1);
        expect(container.getAttribute('style')).not.toBeNull();
    });

    it('should calculate the correct dimensions for a flex layout banner', async () => {
        const mockRender = {
            wrapper: mockElement('div'),
            options: {
                style: {
                    layout: 'text'
                }
            }
        };

        const wrapperParent = mockElement('div');
        wrapperParent.appendChild(mockRender.wrapper);

        Object.defineProperty(window, 'getComputedStyle', {
            value: () => ({
                getPropertyValue: prop => (prop === 'display' ? 'flex' : 2)
            })
        });

        setSize(mockContainer, mockRender);
        await new Promise(resolve => setTimeout(() => resolve(), 100));

        expect(mockContainer.setAttribute).toHaveBeenCalledWith('height', 10);
        expect(mockEventsOn.mock.calls[0][0]).toBe('resize');

        // Width should be set to the total width of the children
        expect(
            mockContainer.setAttribute.mock.calls.some(
                call => call[0] === 'style' && call[1].includes('min-width: 28px')
            )
        ).toBe(true);
    });

    it('should calculate the correct dimensions for a block layout banner', async () => {
        const mockRender = {
            wrapper: mockElement('div'),
            options: {
                style: {
                    layout: 'text'
                }
            }
        };

        const wrapperParent = mockElement('div');
        wrapperParent.appendChild(mockRender.wrapper);

        Object.defineProperty(window, 'getComputedStyle', {
            value: ({ className }) => ({
                getPropertyValue: prop => {
                    if (prop === 'display') return 'block';
                    if (className === '.message__logo-container') return 1;
                    if (className === '.message__headline') return 2;
                    return '';
                }
            })
        });

        setSize(mockContainer, mockRender);
        await new Promise(resolve => setTimeout(() => resolve(), 100));

        expect(mockContainer.setAttribute).toHaveBeenCalledWith('height', 10);
        expect(mockEventsOn.mock.calls[0][0]).toBe('resize');

        // Width should be set to the maximum width of the children
        expect(
            mockContainer.setAttribute.mock.calls.some(
                call => call[0] === 'style' && call[1].includes('min-width: 14px')
            )
        ).toBe(true);
    });

    it('should re-render a banner when the container is too small', async () => {
        const mockRender = {
            wrapper: mockElement('div'),
            options: {
                style: {
                    layout: 'text'
                }
            }
        };

        const wrapperParent = mockElement('div');
        wrapperParent.appendChild(mockRender.wrapper);

        Object.defineProperty(window, 'getComputedStyle', {
            value: () => ({
                getPropertyValue: prop => {
                    if (prop === 'display') return 'block';

                    return 30;
                }
            })
        });

        const setSizeCall = () => setSize(mockContainer, mockRender);
        expect(setSizeCall).toThrow();

        await new Promise(resolve => setTimeout(() => resolve(), 100));

        expect(mockGlobalRender).toHaveBeenCalledTimes(1);
    });

    it('should hide a banner where the container is too small and it has logo.type:primary and logo.position:top', async () => {
        const mockRender = {
            wrapper: mockElement('div'),
            options: {
                style: {
                    layout: 'text',
                    logo: {
                        type: 'primary',
                        position: 'top'
                    }
                }
            }
        };

        const wrapperParent = mockElement('div');
        wrapperParent.appendChild(mockRender.wrapper);

        Object.defineProperty(window, 'getComputedStyle', {
            value: () => ({
                getPropertyValue: prop => {
                    if (prop === 'display') return 'block';

                    return 30;
                }
            })
        });

        setSize(mockContainer, mockRender);
        expect(logger.error).toHaveBeenCalledTimes(1);
        expect(mockContainer.setAttribute).toHaveBeenCalledWith('data-pp-message-hidden', 'true');
    });
});
