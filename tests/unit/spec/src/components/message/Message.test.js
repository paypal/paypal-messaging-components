/** @jsx h */
import { h } from 'preact';
import { render, fireEvent, waitFor, act } from '@testing-library/preact';

import Message from 'src/components/message/Message';
import { request, getOrCreateStorageID } from 'src/utils';
import xPropsMock from 'utils/xPropsMock';
import zoidComponentWrapper from 'utils/zoidComponentWrapper';

jest.mock('src/utils', () => ({
    getActiveTags: jest.fn(),
    getOrCreateStorageID: jest.fn(() => 'uid_26a2522628_mtc6mjk6nti'),
    request: jest.fn(() =>
        Promise.resolve({
            data: {
                markup: '<div>mock</div>',
                meta: {},
                parentStyles: 'body { color: blue; }',
                warnings: []
            }
        })
    ),
    // eslint-disable-next-line no-console
    ppDebug: jest.fn(() => console.log('PayPal Debug Message'))
}));

describe('<Message />', () => {
    const updateProps = xPropsMock({
        amount: 100,
        currency: 'USD',
        style: { layout: 'text' },
        payerId: 'DEV00000000NI',
        deviceID: 'uid_26a2522628_mtc6mjk6nti',
        sessionID: 'uid_fda0b4618b_mtg6ndy6mjc',
        onClick: jest.fn(),
        onReady: jest.fn(),
        onHover: jest.fn(),
        onMarkup: jest.fn(),
        resize: jest.fn(),
        messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx'
    });

    const wrapper = zoidComponentWrapper({
        markup: '<div>test</div>',
        meta: {},
        parentStyles: 'body { color: black; }',
        warnings: []
    });

    afterEach(() => {
        window.xprops.onClick.mockClear();
        window.xprops.onReady.mockClear();
        window.xprops.onClick.mockClear();
        window.xprops.onMarkup.mockClear();

        request.mockClear();
        getOrCreateStorageID.mockClear();
    });

    test('Renders the server markup', () => {
        const { getByText } = render(<Message />, { wrapper });

        expect(getByText(/test/i)).toBeInTheDocument();
    });

    test('Fires onReady xProp after render', () => {
        render(<Message />, { wrapper });

        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {},
            messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx',
            deviceID: 'uid_26a2522628_mtc6mjk6nti'
        });
    });

    test('Fires onClick xProp when clicked', () => {
        const { container } = render(<Message />, { wrapper });
        const button = container.firstChild;

        fireEvent.click(button);

        expect(window.xprops.onClick).toHaveBeenCalledTimes(1);
        expect(window.xprops.onClick).toHaveBeenLastCalledWith({
            meta: {}
        });
    });

    test('Fires onHover xProp when hovered', () => {
        const { container } = render(<Message />, { wrapper });
        const button = container.firstChild;

        fireEvent.mouseOver(button);

        expect(window.xprops.onHover).toHaveBeenCalledTimes(1);
        expect(window.xprops.onHover).toHaveBeenLastCalledWith({
            meta: {}
        });
    });

    test('Fires onMarkup and onReady on complete re-render', async () => {
        const { getByText, queryByText } = render(<Message />, { wrapper });

        expect(request).not.toHaveBeenCalled();
        expect(getByText(/test/i)).toBeInTheDocument();
        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {},
            messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx',
            deviceID: 'uid_26a2522628_mtc6mjk6nti'
        });
        expect(window.xprops.onMarkup).toHaveBeenCalledTimes(1);
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {},
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
            meta: {},
            messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx',
            deviceID: 'uid_26a2522628_mtc6mjk6nti'
        });
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {},
            styles: 'body { color: blue; }',
            warnings: []
        });
    });

    test('Passed deviceID from iframe storage to callback', () => {
        getOrCreateStorageID.mockReturnValue('uid_1111111111_11111111111');

        render(<Message />, { wrapper });

        expect(window.xprops.onReady).toBeCalledWith({
            meta: {},
            deviceID: 'uid_1111111111_11111111111',
            messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx'
        });
        expect(getOrCreateStorageID).toHaveBeenCalled();
    });
});
