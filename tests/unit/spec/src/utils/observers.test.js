import { getContainersToUpdate, processMutationList, getAttributeObserver } from 'src/utils/observers';
import * as messagingGlobal from 'src/utils/global';
import * as sdk from 'src/utils/sdk';

jest.mock('src/utils/global', () => {
    const original = jest.requireActual('src/utils/global');
    const mocks = Object.fromEntries(
        Object.entries(original).map(([k, f]) => {
            return [
                k,
                jest.fn((...args) => {
                    return f(...args);
                })
            ];
        })
    );
    return { ...mocks };
});

jest.mock('src/utils/sdk', () => {
    const original = jest.requireActual('src/utils/sdk');
    const mocks = Object.fromEntries(
        Object.entries(original).map(([k, f]) => {
            return [
                k,
                jest.fn((...args) => {
                    return f(...args);
                })
            ];
        })
    );
    return { ...mocks };
});

const mockContainer = document.createElement('div');
mockContainer.setAttribute('data-pp-message', '');

const mockMessagesMap = new Map();
mockMessagesMap.set(mockContainer, {
    render: jest.fn(),
    clone: jest.fn(),
    state: {},
    updateProps: jest.fn()
});

messagingGlobal.getGlobalState.mockReturnValue({
    messagesMap: mockMessagesMap
});

sdk.getNamespace.mockReturnValue('paypal');

const mockMessageRender = jest.fn();
const mockMessageInterface = jest.fn(() => ({
    render: mockMessageRender
}));

let observer;

beforeEach(() => {
    jest.clearAllMocks();

    // Reset the observer between tests
    Object.keys(window)
        .filter(key => key.endsWith('_observer__'))
        .forEach(key => {
            delete window[key];
        });

    window.paypal = {
        Messages: mockMessageInterface
    };

    observer = getAttributeObserver();
});

afterEach(() => {
    if (observer) {
        observer.disconnect();
    }
});

describe('utils/observers', () => {
    const styleLayoutAttributeMutation = {
        type: 'attributes',
        target: mockContainer,
        attributeName: 'data-pp-style-layout'
    };
    const amountAttributeMutation = {
        type: 'attributes',
        target: mockContainer,
        attributeName: 'data-pp-amount'
    };
    const loremAttributeMutation = {
        type: 'attributes',
        target: mockContainer,
        attributeName: 'data-lorem'
    };
    describe('getContainersToUpdate', () => {
        test('handles data-pp-* mutations', () => {
            expect(getContainersToUpdate(mockMessagesMap, [styleLayoutAttributeMutation])).toEqual([mockContainer]);
            expect(getContainersToUpdate(mockMessagesMap, [amountAttributeMutation])).toEqual([mockContainer]);
            expect(
                getContainersToUpdate(mockMessagesMap, [styleLayoutAttributeMutation, amountAttributeMutation])
            ).toEqual([mockContainer, mockContainer]);
        });

        test('ignores mutations without data-pp-* prefix', () => {
            expect(getContainersToUpdate(mockMessagesMap, [loremAttributeMutation])).toEqual([]);
            expect(getContainersToUpdate(mockMessagesMap, [amountAttributeMutation, loremAttributeMutation])).toEqual([
                mockContainer
            ]);
        });
    });
    describe('processMutationList', () => {
        test('calls render when data-pp-* attributes mutate', () => {
            expect(() => {
                processMutationList([styleLayoutAttributeMutation, amountAttributeMutation, loremAttributeMutation]);
            }).not.toThrow();

            expect(mockMessageRender).toHaveBeenCalledTimes(2);
        });
        test('does not call render if script is being destroyed', () => {
            sdk.isScriptBeingDestroyed.mockReturnValue(true);
            expect(() => {
                processMutationList([styleLayoutAttributeMutation, amountAttributeMutation, loremAttributeMutation]);
            }).not.toThrow();

            expect(mockMessageRender).toHaveBeenCalledTimes(0);
        });
    });
    describe('getAttributeObserver', () => {
        test('creates a MutationObserver', () => {
            expect(observer).toBeInstanceOf(MutationObserver);
        });
    });
});
