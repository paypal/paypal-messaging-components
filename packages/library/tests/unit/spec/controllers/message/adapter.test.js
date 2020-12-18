import Messages from '@library/controllers/message/adapter';
import { globalState } from '@library/common';

describe('message adapter', () => {
    test('Exports the correct interface', () => {
        expect(Messages).toEqual(expect.any(Function));
        expect(Messages.render).toEqual(expect.any(Function));
        expect(Messages.setGlobalConfig).toEqual(expect.any(Function));
        expect(Messages().render).toEqual(expect.any(Function));
    });

    test('Updates global config state', () => {
        expect(globalState).toEqual(
            expect.objectContaining({
                config: {}
            })
        );

        Messages.setGlobalConfig({ account: 'DEV00000000NI' });

        expect(globalState).toEqual(
            expect.objectContaining({
                config: {
                    account: 'DEV00000000NI'
                }
            })
        );
    });
});
