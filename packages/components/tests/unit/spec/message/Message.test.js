/** @jsx h */
import { h } from 'preact';
import { render, fireEvent, waitFor, act } from '@testing-library/preact';

import Message from '@components/message/Message';
import { XPropsProvider, ServerDataProvider } from '@components/lib';
import { request } from '@common';
import xPropsMock from '@tests/utils/xPropsMock';

jest.mock('@common', () => ({
    getActiveTags: jest.fn(),
    request: jest.fn(() =>
        Promise.resolve({
            data: {
                markup: '<div>mock</div>',
                meta: {
                    messageRequestId: '23456'
                },
                parentStyles: 'body { color: blue; }',
                warnings: []
            }
        })
    )
}));

describe('<Message />', () => {
    const updateProps = xPropsMock({
        amount: 100,
        currency: 'USD',
        style: { layout: 'text' },
        payerId: 'DEV00000000NI',
        onClick: jest.fn(),
        onReady: jest.fn(),
        onHover: jest.fn(),
        onMarkup: jest.fn(),
        resize: jest.fn()
    });
    const wrapper = ({ children }) => (
        <XPropsProvider>
            <ServerDataProvider
                data={{
                    markup: '<div>test</div>',
                    meta: {
                        messageRequestId: '12345'
                    },
                    parentStyles: 'body { color: black; }',
                    warnings: []
                }}
            >
                {children}
            </ServerDataProvider>
        </XPropsProvider>
    );

    afterEach(() => {
        window.xprops.onClick.mockClear();
        window.xprops.onReady.mockClear();
        window.xprops.onClick.mockClear();
        window.xprops.onMarkup.mockClear();
        request.mockClear();
    });

    it('Renders the server markup', () => {
        const { getByText } = render(<Message />, { wrapper });

        expect(getByText(/test/i)).toBeInTheDocument();
    });

    it('Fires onReady xProp after render', () => {
        render(<Message />, { wrapper });

        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
    });

    it('Fires onClick xProp when clicked', () => {
        const { container } = render(<Message />, { wrapper });
        const button = container.firstChild;

        fireEvent.click(button);

        expect(window.xprops.onClick).toHaveBeenCalledTimes(1);
        expect(window.xprops.onClick).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
    });

    it('Fires onHover xProp when hovered', () => {
        const { container } = render(<Message />, { wrapper });
        const button = container.firstChild;

        fireEvent.mouseOver(button);

        expect(window.xprops.onHover).toHaveBeenCalledTimes(1);
        expect(window.xprops.onHover).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
    });

    it('Fires onMarkup and onReady on complete re-render', async () => {
        const { getByText, queryByText } = render(<Message />, { wrapper });

        expect(request).not.toHaveBeenCalled();
        expect(getByText(/test/i)).toBeInTheDocument();
        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
        expect(window.xprops.onMarkup).toHaveBeenCalledTimes(1);
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            },
            styles: 'body { color: black; }',
            warnings: []
        });

        act(() => {
            updateProps({ amount: 200 });
        });

        await waitFor(() => {
            expect(window.xprops.onReady).toHaveBeenCalledTimes(2);
            expect(window.xprops.onMarkup).toHaveBeenCalledTimes(2);
        });

        expect(queryByText(/test/i)).toBeNull();
        expect(getByText(/mock/i)).toBeInTheDocument();
        expect(request).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '23456'
            }
        });
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '23456'
            },
            styles: 'body { color: blue; }',
            warnings: []
        });
    });
});
