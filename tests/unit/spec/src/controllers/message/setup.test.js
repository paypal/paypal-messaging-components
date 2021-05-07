import setup from 'src/controllers/message/setup';

import insertMockScript from 'utils/insertMockScript';
import Messages from 'src/controllers/message/interface';
import { getGlobalState, destroyGlobalState } from 'src/utils';

// TODO: Re-enable skipped tests after ramp

jest.mock('src/controllers/message/interface', () => {
    const mockRender = jest.fn();

    return jest.fn(() => ({
        render: mockRender
    }));
});

describe('message setup', () => {
    afterEach(() => {
        Messages.mockClear();
        Messages().render.mockClear();
        destroyGlobalState();
        document.getElementsByTagName('html')[0].innerHTML = '';
    });

    test('Supports pilot window.Message', () => {
        const removeMockScript = insertMockScript({ account: 'DEV00000000NI' });

        setup();
        expect(window.paypal.Message).toEqual(expect.objectContaining({ render: expect.any(Function) }));
        expect(window.paypal.Message).toEqual(Messages);

        removeMockScript();
    });

    it.skip('Renders messages on load', () => {
        const removeMockScript = insertMockScript({ account: 'DEV00000000NI' });

        setup();

        expect(Messages().render).toHaveBeenCalledTimes(1);

        removeMockScript();
    });

    test('Does not render if account missing', () => {
        const removeMockScript = insertMockScript();

        setup();

        expect(Messages().render).not.toHaveBeenCalled();

        removeMockScript();
    });

    test('Renames the global namespace', () => {
        const removeMockScript = insertMockScript({ account: 'DEV00000000NI', namespace: 'paypal2' });

        expect(window.paypal).toEqual(expect.any(Object));

        setup();

        expect(window.paypal2).toEqual(expect.any(Object));
        expect(window.paypal).toBeUndefined();

        removeMockScript();
    });

    it.skip('Renders message with script attribute options', () => {
        const removeMockScript = insertMockScript({
            account: 'DEV00000000NI',
            currency: 'USD',
            'style-layout': 'flex'
        });

        setup();

        expect(Messages().render).toHaveBeenCalledTimes(1);
        expect(getGlobalState().config).toEqual(
            expect.objectContaining({
                account: 'DEV00000000NI',
                currency: 'USD',
                style: {
                    layout: 'flex'
                }
            })
        );

        removeMockScript();
    });

    describe('dynamic insertion', () => {
        test('Renders message on dynamic insertion', async () => {
            const removeMockScript = insertMockScript();

            const mockRender = jest.fn();
            window.paypal.Messages = jest.fn(() => ({
                render: mockRender
            }));

            setup();

            await new Promise(resolve => setTimeout(resolve, 0));

            const body1 = document.querySelector('body');
            const newMessage = document.createElement('div');
            newMessage.setAttribute('data-pp-message', '');
            body1.appendChild(newMessage);

            await new Promise(resolve => setTimeout(resolve, 0));

            expect(window.paypal.Messages).toHaveBeenCalledTimes(1);
            expect(window.paypal.Messages().render).toHaveBeenCalledTimes(1);

            removeMockScript();
        });

        test('Renders message on dynamic insertion when attribute is on a child element', async () => {
            const removeMockScript = insertMockScript();

            const mockRender = jest.fn();
            window.paypal.Messages = jest.fn(() => ({
                render: mockRender
            }));

            setup();

            await new Promise(resolve => setTimeout(resolve, 0));

            const parentDiv2 = document.createElement('div');
            const messageDiv2 = document.createElement('div');
            messageDiv2.setAttribute('data-pp-message', '');
            parentDiv2.appendChild(messageDiv2);
            document.body.appendChild(parentDiv2);

            await new Promise(resolve => setTimeout(resolve, 0));
            console.log(window.paypal.Messages.mock.calls);
            expect(window.paypal.Messages).toHaveBeenCalledTimes(1);
            expect(window.paypal.Messages().render).toHaveBeenCalledTimes(1);

            removeMockScript();
        });

        test('Renders multiple messages on dynamic insertion', async () => {
            const removeMockScript = insertMockScript();

            const mockRender = jest.fn();
            window.paypal.Messages = jest.fn(() => ({
                render: mockRender
            }));

            setup();

            await new Promise(resolve => setTimeout(resolve, 0));

            const messageDivA = document.createElement('div');
            messageDivA.setAttribute('data-pp-message', '');
            document.body.appendChild(messageDivA);
            const messageDivB = document.createElement('div');
            messageDivB.setAttribute('data-pp-message', '');
            document.body.appendChild(messageDivB);

            await new Promise(resolve => setTimeout(resolve, 0));
            expect(window.paypal.Messages).toHaveBeenCalledTimes(2);
            expect(window.paypal.Messages().render).toHaveBeenCalledTimes(2);

            removeMockScript();
        });

        test('Does not render message with misspelled attribute on dynamic insertion', async () => {
            const removeMockScript = insertMockScript();

            const mockRender = jest.fn();
            window.paypal.Messages = jest.fn(() => ({
                render: mockRender
            }));

            setup();

            await new Promise(resolve => setTimeout(resolve, 0));

            const misspelledNewMessage = document.createElement('div');
            misspelledNewMessage.setAttribute('data-pp-mesage', '');
            document.body.appendChild(misspelledNewMessage);

            await new Promise(resolve => setTimeout(resolve, 0));
            expect(window.paypal.Messages().render).not.toHaveBeenCalled();

            removeMockScript();
        });
    });
});
