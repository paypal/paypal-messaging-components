import Messages from '@library/controllers/message/adapter';
import { globalState } from '@common';

describe('message adapter', () => {
    it('Exports the correct interface', () => {
        expect(Messages).toEqual(expect.any(Function));
        expect(Messages.render).toEqual(expect.any(Function));
        expect(Messages.setGlobalConfig).toEqual(expect.any(Function));
        expect(Messages().render).toEqual(expect.any(Function));
    });

    it('Updates global config state', () => {
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
