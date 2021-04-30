import Messages from '@library/controllers/message/adapter';
import { getGlobalState } from '@library/common';

describe('message adapter', () => {
    test('Exports the correct interface', () => {
        expect(Messages).toEqual(expect.any(Function));
        expect(Messages.render).toEqual(expect.any(Function));
        expect(Messages.setGlobalConfig).toEqual(expect.any(Function));
        expect(Messages().render).toEqual(expect.any(Function));
    });

    test('Updates global config state', () => {
        expect(getGlobalState()).toEqual(
            expect.objectContaining({
                config: {}
            })
        );

        Messages.setGlobalConfig({ account: 'DEV00000000NI' });

        expect(getGlobalState()).toEqual(
            expect.objectContaining({
                config: {
                    account: 'DEV00000000NI'
                }
            })
        );
    });
});
