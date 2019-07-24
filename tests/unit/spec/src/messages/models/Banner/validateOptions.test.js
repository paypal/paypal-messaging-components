import validateOptions, { VALID_STYLE_OPTIONS } from 'src/messages/models/Banner/validateOptions';

describe('validateOptions passed in to render function', () => {
    const logger = {
        warn: jest.fn(),
        info: jest.fn()
    };

    beforeEach(() => {
        logger.warn.mockClear();
        logger.info.mockClear();
    });

    const validLogoTypes = VALID_STYLE_OPTIONS.text.logo.type[1];
    const validLogoPositions = VALID_STYLE_OPTIONS.text.logo.position[1];

    const validOptions = {
        id: '1',
        _legacy: false,
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        onRender: () => {}
    };

    it('should allow valid id, _legacy, account, amount, countryCode, style', () => {
        const type = validLogoTypes[0];
        const position = validLogoPositions[1];
        const validated = validateOptions(logger, {
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
            const validated = validateOptions(logger, {
                ...validOptions,
                account: {}
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.account).toBeUndefined();
        });

        it('should not allow an invalid account length', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                account: 'invalid'
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.account).toBeUndefined();
        });

        it('should not allow an invalid amount type', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                amount: 'invalid'
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.amount).toBeUndefined();
        });

        it('should not allow an invalid amount value', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                amount: -12
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.amount).toBeUndefined();
        });

        it('should not allow an invalid countryCode type', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                countryCode: {}
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.countryCode).toBeUndefined();
        });

        it('should not allow an invalid countryCode value', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                countryCode: 'USA'
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.countryCode).toBeUndefined();
        });

        it('should not allow an invalid onRender type', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                onRender: {}
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.onRender).toBeUndefined();
        });
    });

    describe('invalid style object values', () => {
        it('should not allow invalid style object type', () => {
            const validated = validateOptions(logger, {
                ...validOptions,
                style: 'style'
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.style).not.toBe('style');
        });

        it('should not allow invalid style.layout type', () => {
            const layout = {};
            const validated = validateOptions(logger, {
                ...validOptions,
                style: {
                    layout
                }
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.style.layout).toBe('text');
        });

        it('should not allow invalid style.layout value', () => {
            const layout = 'invalid';
            const validated = validateOptions(logger, {
                ...validOptions,
                style: {
                    layout
                }
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.style.layout).toBe('text');
        });

        it('should not allow invalid values for style config', () => {
            const logoType = 'invalid';
            const validated = validateOptions(logger, {
                ...validOptions,
                style: {
                    layout: 'text',
                    logo: {
                        type: logoType
                    }
                }
            });

            expect(logger.warn).toHaveBeenCalled();
            expect(validated.style.logo.type).toBe(validLogoTypes[0]);
            expect(validated.style.logo.position).toBe(validLogoPositions[0]);
        });
    });
});
