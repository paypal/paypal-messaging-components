import setup from 'src/controllers/message/setup';

import insertMockScript from 'utils/insertMockScript';
import Messages from 'src/controllers/message/interface';
import { getGlobalState } from 'src/utils';

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
    });

    test('Supports pilot window.Message', () => {
        const removeMockScript = insertMockScript({ account: 'DEV00000000NI' });

        setup();

        expect(window.paypal.Message).toEqual(expect.objectContaining({ render: expect.any(Function) }));
        expect(window.paypal.Message).toEqual(Messages);

        removeMockScript();
    });

    test('Renders messages on load', () => {
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

    test('Renders message with script attribute options', () => {
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
});
