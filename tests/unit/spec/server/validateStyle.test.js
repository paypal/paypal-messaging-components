import validateStyle from '../../../../server/validateStyle';
import { getValidOptions } from '../../../../server/locale';

jest.mock('../../../../server/message/logos.js', () => ({
    __esModule: true,
    default: {
        PP_PAYPAL: {
            COLOR: {},
            WHITE: {},
            GRAYSCALE: {},
            MONOCHROME: {}
        },
        NO_PP_MONOGRAM: {
            COLOR: {},
            WHITE: {},
            GRAYSCALE: {},
            MONOCHROME: {}
        }
    }
}));

const mockLogger = jest.fn();

const VALID_STYLE_OPTIONS = getValidOptions('US');

describe('validateStyle', () => {
    beforeEach(() => {
        mockLogger.mockClear();
    });

    const [, validLogoTypes] = VALID_STYLE_OPTIONS.text.logo.type;
    const [, validLogoPositions] = VALID_STYLE_OPTIONS.text.logo.position;

    describe('Invalid style object values', () => {
        test('Warns invalid style.layout type', () => {
            const layout = {};
            const validated = validateStyle(mockLogger, {
                layout
            });

            expect(mockLogger).toHaveBeenCalledTimes(1);
            expect(validated.layout).toBe('text');
        });

        test('Warns invalid style.layout value', () => {
            const layout = 'invalid';
            const validated = validateStyle(mockLogger, {
                layout
            });

            expect(mockLogger).toHaveBeenCalledTimes(1);
            expect(validated.layout).toBe('text');
        });

        test('Warns invalid values for style config', () => {
            const logoType = 'invalid';
            const validated = validateStyle(mockLogger, {
                layout: 'text',
                logo: {
                    type: logoType
                }
            });

            expect(mockLogger).toHaveBeenCalledTimes(1);
            expect(validated.logo.type).toBe(validLogoTypes[0]);
            expect(validated.logo.position).toBe(validLogoPositions[0]);
        });
    });
});
