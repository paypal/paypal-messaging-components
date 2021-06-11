/** @jsx h */
// import { h } from 'preact';
// import { render, fireEvent, waitFor, act } from '@testing-library/preact';
import {
    // getByLabelText,
    getByText
    // getByTestId,
    // queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    // waitFor
} from '@testing-library/dom';

import Message from 'src/components/message/Message';
import { request, getOrCreateStorageID } from 'src/utils';
import xPropsMock from 'utils/xPropsMock';
// import zoidComponentWrapper from 'utils/zoidComponentWrapper';

jest.mock('src/utils', () => ({
    getActiveTags: jest.fn(),
    getOrCreateStorageID: jest.fn(() => 'uid_26a2522628_mtc6mjk6nti'),
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
    ),
    // eslint-disable-next-line no-console
    ppDebug: jest.fn(() => console.log('PayPal Debug Message'))
}));

describe('Message', () => {
    // const updateProps = // commit doesn't like the variable is not being changed
    xPropsMock({
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
        resize: jest.fn()
    });

    // const wrapper = zoidComponentWrapper({
    //     markup: '<div>test</div>',
    //     meta: {
    //         messageRequestId: '12345'
    //     },
    //     parentStyles: 'body { color: black; }',
    //     warnings: []
    // });

    const serverData = {
        markup: '<div>test</div>',
        meta: {
            messageRequestId: '12345'
        },
        parentStyles: 'body { color: black; }',
        warnings: []
    };

    afterEach(() => {
        window.xprops.onClick.mockClear();
        window.xprops.onReady.mockClear();
        window.xprops.onClick.mockClear();
        window.xprops.onMarkup.mockClear();

        request.mockClear();
        getOrCreateStorageID.mockClear();
    });

    test('Renders the button', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        const button = Message(markup, meta, parentStyles, warnings);
        expect(button instanceof HTMLButtonElement).toBe(true);
    });

    test('Renders the button with styles', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        const button = Message(markup, meta, parentStyles, warnings);
        const styles = [];
        Object.keys(button.style).forEach(row => {
            if (!Number.isNaN(Number(row)) && button.style[row] !== undefined) {
                styles.push(button.style[row]);
            }
        });

        expect(JSON.stringify(styles)).toBe(
            JSON.stringify(['display', 'background', 'padding', 'outline', 'text-align', 'font-family'])
        );
    });

    test('Renders the server markup', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        expect(getByText(Message(markup, meta, parentStyles, warnings), /test/i).innerHTML).toBe('test');
    });

    // test('return true for commit', () => {
    //     expect(1).toBe(1);
    // });

    //     test('Fires onReady xProp after render', () => {
    //         render(<Message />, { wrapper });

    //         expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
    //         expect(window.xprops.onReady).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '12345'
    //             },
    //             deviceID: 'uid_26a2522628_mtc6mjk6nti'
    //         });
    //     });

    //     test('Fires onClick xProp when clicked', () => {
    //         const { container } = render(<Message />, { wrapper });
    //         const button = container.firstChild;

    //         fireEvent.click(button);

    //         expect(window.xprops.onClick).toHaveBeenCalledTimes(1);
    //         expect(window.xprops.onClick).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '12345'
    //             }
    //         });
    //     });

    //     test('Fires onHover xProp when hovered', () => {
    //         const { container } = render(<Message />, { wrapper });
    //         const button = container.firstChild;

    //         fireEvent.mouseOver(button);

    //         expect(window.xprops.onHover).toHaveBeenCalledTimes(1);
    //         expect(window.xprops.onHover).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '12345'
    //             }
    //         });
    //     });

    //     test('Fires onMarkup and onReady on complete re-render', async () => {
    //         const { getByText, queryByText } = render(<Message />, { wrapper });

    //         expect(request).not.toHaveBeenCalled();
    //         expect(getByText(/test/i)).toBeInTheDocument();
    //         expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
    //         expect(window.xprops.onReady).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '12345'
    //             },
    //             deviceID: 'uid_26a2522628_mtc6mjk6nti'
    //         });
    //         expect(window.xprops.onMarkup).toHaveBeenCalledTimes(1);
    //         expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '12345'
    //             },
    //             styles: 'body { color: black; }',
    //             warnings: []
    //         });

    //         act(() => {
    //             updateProps({ amount: 200 });
    //         });

    //         await waitFor(() => {
    //             expect(window.xprops.onReady).toHaveBeenCalledTimes(2);
    //             expect(window.xprops.onMarkup).toHaveBeenCalledTimes(2);
    //         });

    //         expect(queryByText(/test/i)).toBeNull();
    //         expect(getByText(/mock/i)).toBeInTheDocument();
    //         expect(request).toHaveBeenCalledTimes(1);
    //         expect(window.xprops.onReady).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '23456'
    //             },
    //             deviceID: 'uid_26a2522628_mtc6mjk6nti'
    //         });
    //         expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
    //             meta: {
    //                 messageRequestId: '23456'
    //             },
    //             styles: 'body { color: blue; }',
    //             warnings: []
    //         });
    //     });

    //     test('Passed deviceID from iframe storage to callback', () => {
    //         getOrCreateStorageID.mockReturnValue('uid_1111111111_11111111111');

    //         render(<Message />, { wrapper });

    //         expect(window.xprops.onReady).toBeCalledWith({
    //             meta: {
    //                 messageRequestId: '12345'
    //             },
    //             deviceID: 'uid_1111111111_11111111111'
    //         });
    //         expect(getOrCreateStorageID).toHaveBeenCalled();
    //     });
});
