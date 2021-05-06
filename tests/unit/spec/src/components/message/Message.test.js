/** @jsx h */
import { h } from 'preact';
import { render, fireEvent, waitFor, act } from '@testing-library/preact';

import Message from 'src/components/message/Message';
import { request, readStorageID, writeStorageID, isStorageFresh } from 'src/utils';
import xPropsMock from 'utils/xPropsMock';
import zoidComponentWrapper from 'utils/zoidComponentWrapper';

jest.mock('src/utils', () => ({
    getActiveTags: jest.fn(),
    readStorageID: jest.fn(),
    writeStorageID: jest.fn(),
    isStorageFresh: jest.fn(),
    getOrCreateStorageID: jest.fn(),
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
        deviceID: '26a2522628_mtc6mjk6nti',
        sessionID: 'fda0b4618b_mtg6ndy6mjc',
        onClick: jest.fn(),
        onReady: jest.fn(),
        onHover: jest.fn(),
        onMarkup: jest.fn(),
        resize: jest.fn()
    });

    const wrapper = zoidComponentWrapper({
        markup: '<div>test</div>',
        meta: {
            messageRequestId: '12345'
        },
        parentStyles: 'body { color: black; }',
        warnings: []
    });

    afterEach(() => {
        window.xprops.onClick.mockClear();
        window.xprops.onReady.mockClear();
        window.xprops.onClick.mockClear();
        window.xprops.onMarkup.mockClear();

        request.mockClear();
        readStorageID.mockClear();
        writeStorageID.mockClear();
        isStorageFresh.mockClear();
    });

    test('Renders the server markup', () => {
        const { getByText } = render(<Message />, { wrapper });

        expect(getByText(/test/i)).toBeInTheDocument();
    });

    test('Fires onReady xProp after render', () => {
        render(<Message />, { wrapper });

        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
    });

    test('Fires onClick xProp when clicked', () => {
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

    test('Fires onHover xProp when hovered', () => {
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

    test('Fires onMarkup and onReady on complete re-render', async () => {
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

    test('Does not write parent storage ID when present and fresh', () => {
        readStorageID.mockReturnValue('1111111111_11111111111');
        isStorageFresh.mockReturnValue(true);

        render(<Message />, { wrapper });

        expect(readStorageID).toHaveBeenCalled();
        expect(isStorageFresh).toHaveBeenCalled();

        expect(writeStorageID).not.toHaveBeenCalled();
    });

    test('Writes parent storage ID when present, but stale', () => {
        readStorageID.mockReturnValue('1111111111_11111111111');
        isStorageFresh.mockReturnValue(false);

        render(<Message />, { wrapper });

        expect(readStorageID).toHaveBeenCalled();
        expect(isStorageFresh).toHaveBeenCalled();

        expect(writeStorageID).toHaveBeenCalledWith('26a2522628_mtc6mjk6nti');
    });

    test('Writes parent storage ID when not present', () => {
        readStorageID.mockReturnValue(null);
        isStorageFresh.mockReturnValue(true);

        render(<Message />, { wrapper });

        expect(readStorageID).toHaveBeenCalled();
        expect(isStorageFresh).not.toHaveBeenCalled();

        expect(writeStorageID).toHaveBeenCalledWith('26a2522628_mtc6mjk6nti');
    });
});
