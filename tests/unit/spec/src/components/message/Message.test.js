import { getByText, fireEvent, queryByText } from '@testing-library/dom';

import Message from 'src/components/message/Message';
import { request, getDeviceID, createState } from 'src/utils';
import xPropsMock from 'utils/xPropsMock';

const ts = {
    vr: '2e1ab8701800ae7732f49876ffffffd7',
    vt: 'a96da1cd1800ab09681c2338ff7e0278'
};
jest.mock('src/utils', () => ({
    createState: jest.fn(obj => [obj, jest.fn()]),
    getActiveTags: jest.fn(),
    getDeviceID: jest.fn(() => 'uid_26a2522628_mtc6mjk6nti'),
    isStorageFresh: jest.fn().mockReturnValue(false),
    getTsCookieFromStorage: jest.fn(() => ts),
    request: jest.fn(() =>
        Promise.resolve({
            data: '<!--ewAiAG0AYQByAGsAdQBwACIAOgAiADwAZABpAHYAPgBtAG8AYwBrADwALwBkAGkAdgA+ACIALAAiAG0AZQB0AGEAIgA6AHsAIgBtAGUAcwBzAGEAZwBlAFIAZQBxAHUAZQBzAHQASQBkACIAOgAiADIAMwA0ADUANgAiAH0ALAAiAHAAYQByAGUAbgB0AFMAdAB5AGwAZQBzACIAOgAiAGIAbwBkAHkAIAB7ACAAYwBvAGwAbwByADoAIABiAGwAdQBlADsAIAB9ACIALAAiAHcAYQByAG4AaQBuAGcAcwAiADoAWwBdAH0A-->'
        })
    ),
    parseObjFromEncoding: jest.fn(() => ({
        markup: '<div>mock</div>',
        meta: {
            messageRequestId: '23456'
        },
        parentStyles: 'body { color: blue; }',
        warnings: []
    })),
    // eslint-disable-next-line no-console
    ppDebug: jest.fn(() => console.log('PayPal Debug Message')),
    getRequestDuration: jest.fn(() => 123)
}));

describe('Message', () => {
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

    const serverData = {
        markup: '<div>test</div>',
        meta: {},
        parentStyles: 'body { color: black; }',
        warnings: []
    };

    afterEach(() => {
        window.xprops.onClick.mockClear();
        window.xprops.onReady.mockClear();
        window.xprops.onClick.mockClear();
        window.xprops.onMarkup.mockClear();

        createState.mockClear();
        request.mockClear();
        getDeviceID.mockClear();
        xPropsMock.clear();
    });

    test('Renders the button with styles', () => {
        const button = Message(serverData);
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
        const messageDocument = document.body.appendChild(Message(serverData));
        expect(getByText(messageDocument, /test/i)).toBeInTheDocument();
    });

    test('Fires onReady xProp after render', () => {
        Message(serverData);

        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);
        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {},
            messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx',
            deviceID: 'uid_26a2522628_mtc6mjk6nti',
            requestDuration: 123,
            ts
        });
    });

    test('Fires onClick xProp when clicked', () => {
        const button = Message(serverData);

        fireEvent.click(button);
        expect(window.xprops.onClick).toHaveBeenCalledTimes(1);
        expect(window.xprops.onClick).toHaveBeenLastCalledWith({
            meta: {}
        });
    });

    test('Fires onHover xProp when hovered', () => {
        const button = Message(serverData);

        fireEvent.mouseOver(button);

        expect(window.xprops.onHover).toHaveBeenCalledTimes(1);
        expect(window.xprops.onHover).toHaveBeenLastCalledWith({
            meta: {}
        });
    });

    test('Fires onMarkup and onReady on complete re-render', async () => {
        const messageDocument = document.body.appendChild(Message(serverData));

        const originalMRID = 'uid_xxxxxxxxxx_xxxxxxxxxxx';

        expect(request).not.toHaveBeenCalled();
        expect(getByText(messageDocument, /test/i)).toBeInTheDocument();
        expect(window.xprops.onReady).toHaveBeenCalledTimes(1);

        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {},
            messageRequestId: originalMRID,
            deviceID: 'uid_26a2522628_mtc6mjk6nti',
            requestDuration: 123,
            ts
        });

        expect(window.xprops.onMarkup).toHaveBeenCalledTimes(1);
        expect(window.xprops.onMarkup).toHaveBeenLastCalledWith({
            meta: {},
            styles: 'body { color: black; }',
            warnings: []
        });

        updateProps({ amount: 200 });

        // has to wait for the button to re-render
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(window.xprops.onReady).toHaveBeenCalledTimes(2);
        expect(window.xprops.onMarkup).toHaveBeenCalledTimes(2);
        expect(queryByText(messageDocument, /test/i)).toBeNull();
        expect(getByText(messageDocument, /mock/i)).toBeInTheDocument();
        expect(request).toHaveBeenCalledTimes(1);

        expect(window.xprops.onReady).toHaveBeenLastCalledWith({
            meta: {
                messageRequestId: '23456'
            },
            messageRequestId: expect.not.stringMatching(originalMRID),
            deviceID: 'uid_26a2522628_mtc6mjk6nti',
            requestDuration: 123,
            ts
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
        getDeviceID.mockReturnValue('uid_1111111111_11111111111');

        Message(serverData);

        expect(window.xprops.onReady).toBeCalledWith({
            meta: {},
            deviceID: 'uid_1111111111_11111111111',
            messageRequestId: 'uid_xxxxxxxxxx_xxxxxxxxxxx',
            requestDuration: 123,
            ts
        });
        expect(getDeviceID).toHaveBeenCalled();
    });
});
