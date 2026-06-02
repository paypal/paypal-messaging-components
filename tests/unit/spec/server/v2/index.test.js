import * as v2Module from 'server/v2/index';

describe('renderV2Message module contract', () => {
    test('exports render function', () => {
        expect(typeof v2Module.render).toBe('function');
    });

    test('exports validateStyle function', () => {
        expect(typeof v2Module.validateStyle).toBe('function');
    });

    test('exports getParentStyles function', () => {
        expect(typeof v2Module.getParentStyles).toBe('function');
    });

    test('exports version string', () => {
        expect(typeof v2Module.version).toBe('string');
    });
});
