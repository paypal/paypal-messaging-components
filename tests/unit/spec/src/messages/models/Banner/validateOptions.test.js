import validateOptions, { VALID_STYLE_OPTIONS } from 'src/messages/models/Banner/validateOptions';
import { logger } from 'src/messages/services/logger';

jest.mock('src/messages/services/logger', () => ({
    logger: {
        warn: jest.fn()
    }
}));

describe('validateOptions passed in to render function', () => {
    const { warn } = logger;

    beforeEach(() => {
        warn.mockClear();
    });

    const validLogoTypes = VALID_STYLE_OPTIONS.text.logo.type[1];
    const validLogoPositions = VALID_STYLE_OPTIONS.text.logo.position[1];

    const validOptions = {
        id: 0,
        _legacy: false,
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        onRender: () => {}
    };

    it('should allow valid id, _legacy, account, amount, countryCode, style', () => {
        const type = validLogoTypes[0];
        const position = validLogoPositions[1];
        const validated = validateOptions({
            ...validOptions,
            style: {
                layout: 'text',
                logo: {
                    type,
                    position
                }
            }
        });

        Object.entries(validOptions).forEach(([key, val]) => {
            expect(validated[key]).toBe(val);
        });
    });

    describe('invalid top level config values', () => {
        it('should not allow an invalid account type', () => {
            const validated = validateOptions({
                ...validOptions,
                account: {}
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.account).toBeUndefined();
        });

        it('should not allow an invalid account length', () => {
            const validated = validateOptions({
                ...validOptions,
                account: 'invalid'
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.account).toBeUndefined();
        });

        it('should not allow an invalid amount type', () => {
            const validated = validateOptions({
                ...validOptions,
                amount: 'invalid'
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.amount).toBeUndefined();
        });

        it('should not allow an invalid amount value', () => {
            const validated = validateOptions({
                ...validOptions,
                amount: -12
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.amount).toBeUndefined();
        });

        it('should not allow an invalid countryCode type', () => {
            const validated = validateOptions({
                ...validOptions,
                countryCode: {}
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.countryCode).toBeUndefined();
        });

        it('should not allow an invalid countryCode value', () => {
            const validated = validateOptions({
                ...validOptions,
                countryCode: 'USA'
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.countryCode).toBeUndefined();
        });

        it('should not allow an invalid onRender type', () => {
            const validated = validateOptions({
                ...validOptions,
                onRender: {}
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.onRender).toBeUndefined();
        });
    });

    describe('invalid style object values', () => {
        it('should not allow invalid style object type', () => {
            const validated = validateOptions({
                ...validOptions,
                style: 'style'
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.style).not.toBe('style');
        });

        it('should not allow invalid style.layout type', () => {
            const layout = {};
            const validated = validateOptions({
                ...validOptions,
                style: {
                    layout
                }
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.style.layout).toBe('text');
        });

        it('should not allow invalid style.layout value', () => {
            const layout = 'invalid';
            const validated = validateOptions({
                ...validOptions,
                style: {
                    layout
                }
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.style.layout).toBe('text');
        });

        it('should not allow invalid values for style config', () => {
            const logoType = 'invalid';
            const validated = validateOptions({
                ...validOptions,
                style: {
                    layout: 'text',
                    logo: {
                        type: logoType
                    }
                }
            });

            expect(warn).toHaveBeenCalled();
            expect(validated.style.logo.type).toBe(validLogoTypes[0]);
            expect(validated.style.logo.position).toBe(validLogoPositions[0]);
        });
    });
});
