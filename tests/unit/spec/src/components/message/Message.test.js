/** @jsx h */
// import { render, fireEvent, waitFor, act } from '@testing-library/preact';
import {
    getByText,
    fireEvent,
    queryByText,
    // act,
    wait // package is outdated. this is deprecated in newer version
    // waitFor, // package is outdated. this doesn't exist in older version
} from '@testing-library/dom';

import Message from 'src/components/message/Message';
import { request, getOrCreateStorageID } from 'src/utils';
import xPropsMock from 'utils/xPropsMock';

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
    let updateProps = xPropsMock({
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
        updateProps = xPropsMock({
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

        expect(button instanceof HTMLButtonElement).toBe(true);
        expect(JSON.stringify(styles)).toBe(
            JSON.stringify(['display', 'background', 'padding', 'outline', 'text-align', 'font-family'])
        );
    });

    test('Renders the server markup', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        expect(getByText(Message(markup, meta, parentStyles, warnings, document.body), /test/i)).toBeInTheDocument();
    });

    test('Fires onReady xProp after render', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        Message(markup, meta, parentStyles, warnings, document.body);

        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            },
            deviceID: 'uid_26a2522628_mtc6mjk6nti'
        });
    });

    test('Fires onClick xProp when clicked', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        const button = Message(markup, meta, parentStyles, warnings, null);

        fireEvent.click(button);
        expect(window.xprops.onClick).toHaveBeenCalledTimes(1);
        expect(window.xprops.onClick).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
    });

    test('Fires onHover xProp when hovered', () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        const button = Message(markup, meta, parentStyles, warnings, null);

        fireEvent.mouseOver(button);

        expect(window.xprops.onHover).toHaveBeenCalledTimes(1);
        expect(window.xprops.onHover).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            }
        });
    });

    test('Fires onMarkup and onReady on complete re-render', async () => {
        const { markup, meta, parentStyles, warnings } = serverData;
        const messageDocument = Message(markup, meta, parentStyles, warnings, document.body);

        expect(request).not.toHaveBeenCalled();
        expect(getByText(messageDocument, /test/i)).toBeInTheDocument();
        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);

        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            },
            deviceID: 'uid_26a2522628_mtc6mjk6nti'
        });

        expect(window.xprops.onMarkup).toHaveBeenCalledTimes(1);
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '12345'
            },
            styles: 'body { color: black; }',
            warnings: []
        });

        // setTimeout( () => {
        updateProps({ amount: 200 });
        // }, 0)

        // has to wait for the button to re-render
        await wait(
            () => {
                expect(window.xprops.onReady).toHaveBeenCalledTimes(2);
                expect(window.xprops.onMarkup).toHaveBeenCalledTimes(2);
            },
            { container: document.body }
        );

        expect(queryByText(messageDocument, /test/i)).toBeNull();
        expect(getByText(messageDocument, /mock/i)).toBeInTheDocument();
        expect(request).toHaveBeenCalledTimes(1);

        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '23456'
            },
            deviceID: 'uid_26a2522628_mtc6mjk6nti'
        });
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '23456'
            },
            styles: 'body { color: blue; }',
            warnings: []
        });
    });

    test('Passed deviceID from iframe storage to callback', () => {
        getOrCreateStorageID.mockReturnValue('uid_1111111111_11111111111');

        const { markup, meta, parentStyles, warnings } = serverData;
        Message(markup, meta, parentStyles, warnings, document.body);

        expect(window.xprops.onReady).toBeCalledWith({
            meta: {
                messageRequestId: '12345'
            },
            deviceID: 'uid_1111111111_11111111111'
        });
        expect(getOrCreateStorageID).toHaveBeenCalled();
    });
});
