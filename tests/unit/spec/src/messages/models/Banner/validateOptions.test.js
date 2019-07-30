import validateOptions, { VALID_STYLE_OPTIONS } from 'src/messages/models/Banner/validateOptions';

const mockLogger = {
    warn: jest.fn(),
    info: jest.fn()
};

describe('validateOptions', () => {
    beforeEach(() => {
        mockLogger.warn.mockClear();
        mockLogger.info.mockClear();
    });

    const [, validLogoTypes] = VALID_STYLE_OPTIONS.text.logo.type;
    const [, validLogoPositions] = VALID_STYLE_OPTIONS.text.logo.position;

    const validOptions = {
        id: '1',
        _legacy: false,
        account: '1234567890123',
        amount: 100,
        countryCode: 'US',
        onRender: () => {}
    };

    it('Allows valid id, _legacy, account, amount, countryCode, style', () => {
        const type = validLogoTypes[0];
        const position = validLogoPositions[1];
        const validated = validateOptions(mockLogger, {
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

    describe('Invalid top level config values', () => {
        it('Warns invalid account type', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                account: {}
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.account).toBeUndefined();
        });

        it('Warns invalid account length', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                account: 'invalid'
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.account).toBeUndefined();
        });

        it('Warns invalid amount type', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                amount: 'invalid'
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.amount).toBeUndefined();
        });

        it('Warns invalid amount value', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                amount: -12
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.amount).toBeUndefined();
        });

        it('Warns invalid countryCode type', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                countryCode: {}
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.countryCode).toBeUndefined();
        });

        it('Warns invalid countryCode value', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                countryCode: 'USA'
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.countryCode).toBeUndefined();
        });

        it('Warns invalid onRender type', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                onRender: {}
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.onRender).toBeUndefined();
        });
    });

    describe('Invalid style object values', () => {
        it('Warns invalid style object type', () => {
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                style: 'style'
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.style).not.toBe('style');
        });

        it('Warns invalid style.layout type', () => {
            const layout = {};
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                style: {
                    layout
                }
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.style.layout).toBe('text');
        });

        it('Warns invalid style.layout value', () => {
            const layout = 'invalid';
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                style: {
                    layout
                }
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.style.layout).toBe('text');
        });

        it('Warns invalid values for style config', () => {
            const logoType = 'invalid';
            const validated = validateOptions(mockLogger, {
                ...validOptions,
                style: {
                    layout: 'text',
                    logo: {
                        type: logoType
                    }
                }
            });

            expect(mockLogger.warn).toHaveBeenCalledTimes(1);
            expect(validated.style.logo.type).toBe(validLogoTypes[0]);
            expect(validated.style.logo.position).toBe(validLogoPositions[0]);
        });
    });
});
